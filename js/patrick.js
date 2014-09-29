$('body').scrollTop(0);
window.scrollTo(0,0);
var country = localStorage.getItem('lang');
var hash = location.hash;
var intro = ["", "Designer.", "Patrick Fieger."];
var faketimer = 3000;
var typeoptions = {
    strings: intro,
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 1000,
    startDelay: 1000,
    callback: function() {
        setTimeout(function() {
            $('.scrollabout').addClass('active');
            $('.typed-cursor').css('visibility', 'hidden');
            $('body').removeClass('hidden');
        }, 750);
    }
}

function init(lang) {
    $.getJSON('js/' + lang + '.json', function(json) {
        $('.container').refillTemplate(json);
        $('.project_item').hide()
        initAnimations();
    });
}
$(document).on('click touchstart', '.changelang', function(event) {
    event.preventDefault();
    setLang($(this).data('lang'))
});
$(document).on('click touchstart', '.scrollabout', function(event) {
    $('html,body').animate({
        scrollTop: $('.breaker.first').position().top
    }, 1000, "easeInOutExpo");
});
$(window).scroll(function() {
    var scrolltop = $(this).scrollTop();
    var height = $(this).height();
    var calc = 100 - ((scrolltop / height) * 20);
    if (scrolltop > 0 && scrolltop < height) {
        $('.welcome').css({
            'background-position-y': calc + '%'
        });
    } else if (scrolltop <= 0) {
        $('.welcome').css({
            'background-position-y': '100%'
        });
    }
});

function setLang(lang) {
    init(lang);
    localStorage.setItem('lang', lang);
}



if (country == null || country == "de") {
    setLang('de');
} else if (country == "en") {
    setLang('en');
} else {
    setLang('de');
}

$('body').waitForImages(function() {
    $('body').toggleClass('loaded');
    $("#typed").typed(typeoptions);
    if($(window).width()<600){
        $('body').removeClass('hidden');
    }
});

$(window).on('load', function() {
    if (country == "en") {
        intro[0] = "Web-Developer."
    } else {
        intro[0] = "Web-Entwickler."
    }
});


$(document).on('click', '.grid figure a', function(event) {
    event.preventDefault();
    var openProject = $(this).data('pro');
    if($('.project_item').hasClass('opened') && $('.opened').attr('id') !== openProject){
        $('.opened').slideUp(300,'easeOutExpo',function(){
            $(this).removeClass('opened');
            $('#'+openProject).slideDown(450, 'easeOutExpo',function() {
                $(this).addClass('opened');
                $('html,body').animate({scrollTop: $('.opened').offset().top}, 750,'easeInOutExpo');
            });
        });
    }else if($('.project_item').hasClass('opened') && $('.opened').attr('id') == openProject){
        $('.opened').slideUp(300,'easeOutExpo',function(){
            $(this).removeClass('opened');
            $('html,body').animate({scrollTop: $('.projekte').offset().top}, 750,'easeInOutExpo');
        });
    }
    else{
        $('#'+openProject).slideDown(450, 'easeOutExpo',function() {
            $(this).addClass('opened');
            $('html,body').animate({scrollTop: $('.opened').offset().top}, 750,'easeInOutExpo');
        });
    }
});

$(document).on('click touchstart', '.portfolio-close', function(event) {
    event.preventDefault();
    $('.project_item').slideUp(300, 'easeOutExpo');
    $('html,body').animate({scrollTop: $('.projekte').offset().top}, 750,'easeInOutExpo');

});

// ANIMATION WAYPOINTS

function initAnimations(){

    var wpOffset = 100;


    $.fn.waypoint.defaults = {
        context : window,
        continuous : true,
        enabled : true,
        horizontal : false,
        offset : 0,
        triggerOnce : false
    };
    
    $('.animated').waypoint(function() {
        var elem = $(this);
        var animation = elem.data('animation');
        if (!elem.hasClass('visible') && elem.attr('data-animation') !== undefined) {
            if (elem.attr('data-animation-delay') !== undefined) {
                var timeout = elem.data('animation-delay');
                setTimeout(function() {
                    elem.addClass(animation + " visible");
                }, timeout);
            } else {
                elem.addClass(elem.data('animation') + " visible");
            }
        }
    }, {
        offset : wpOffset + '%'
    });


    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        $('.knob').waypoint(function() {
            var $this = $(this);
            var myVal = $this.attr("rel");
            $this.knob({
            });
            $({
                value : 0
            }).animate({
                value : myVal
            }, {
                duration : 2000,
                easing : 'easeInOutExpo',
                step : function() {
                    $this.val(Math.ceil(this.value)).trigger('change');
                }
            })
        }, {
            triggerOnce : true,
            offset : function() {
                return $(window).height() - $(this).outerHeight();
            }
        });
    } else {
        $(".knob").each(function() {
            var $this = $(this);
            var myVal = $this.attr("rel");
            $(this).knob();
            $(this).val(myVal);
            $this.val(Math.ceil(myVal)).trigger('change');
        }); 
    }
}   
