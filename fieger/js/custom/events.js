$(window).scroll(function(event) {
    var scroll = $(this).scrollTop();
    if (scroll >= 72) {
        $('.nav_wrapper').addClass('sticky')
    } else {
        $('.nav_wrapper').removeClass('sticky')
    }
});
$(document).on('click', '.faq a', function(event) {
    event.preventDefault();
    $(this).toggleClass('active');
    $(this).next('.inner_info').toggle()
});
$.expr[":"].contains = $.expr.createPseudo(function(arg) {
    return function(elem) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});
$(document).on('keyup', '.faq input', function(event) {
    var filter = $(this).val();
    $('.faq li,.faq li a').hide();
    $('.faq .inner_info p:contains("' + filter + '"),.faq .inner_info a:contains("' + filter + '")').closest('li').show();
    $('.faq .inner_info p:contains("' + filter + '")').closest('li').find('a').show();
    $('.faq .inner_info a:contains("' + filter + '")').show();
    $('.faq li p,.faq li a').unhighlight();
    $('.faq li p,.faq li a').highlight(filter);
});
$(document).on('click', '.breadcrumb a', function(event) {
    $('.breadcrumb a').removeClass('active');
    $(this).addClass('active');
});
$(document).on('click', '.nav_wrapper a', function(event) {
    $('.nav_wrapper a').removeClass('active');
    $(this).addClass('active');
    if($(this).text()=="Systeme"){
        $('.breadcrumb').addClass('active');
    }else{
        $('.breadcrumb').removeClass('active');
    }
});
$(document).on('click', '.region_choose li', function(event) {
    event.preventDefault();
    $('.region_choose li').removeClass('active');
    $(this).addClass('active');
    $('body').showCards($(this).text())
});
$(document).on('click', '.system_choose .selectorClass', function(event) {
    var whichshow = $(this).data('type');
    $('.headings_l div[data-type="'+whichshow+'"]').show();

    $('body,html').animate({
        scrollTop: $('.system_choose').offset().top - 100
    }, 800, 'easeInOutExpo', function() {
        $('.system_choose').slideUp(300, function() {
            $('.system_choose .selectorClass').hide();
            $('.info_l_section').addClass('active');
            setTimeout(function() {
                $('.system_choose').slideDown(300, function() {
                    $('.headings_l a').each(function(index, el) {
                        if (!$(this).hasClass('todown')) {
                            var that = $(this);
                            setTimeout(function() {
                                that.addClass('active')
                            }, 50 * index);
                        }
                    });
                })
            }, 400)
        })
    })
});
$(document).on('mouseenter', '.headings_l a', function() {
    if (!$('.info_l_section').hasClass('left')) {
        $('.description p').removeClass('active');
        $('.description').find('p').eq($(this).index()).addClass('active');
    }
});
$(document).on('click', '.headings_l a', function() {
    event.preventDefault();
    if (!$(this).hasClass('active_')) {
        $('.headings_l ul').hide();
        $(this).next('ul').show();
        $('.description p').removeClass('active');
        $('.product_info').addClass('active')
        $('.headings_l a').removeClass('active_');
        $('.description').hide();
        $(this).addClass('active_')
        $('.info_l_section').addClass('left');
        $('.system_choose .selectorClass').addClass('inactive');
    }
});
$.fn.showCards = function(cards) {
    $('div[land],#contact_box').removeClass('active')
    $('div[land="' + cards + '"]').addClass('active');
    $('div[land="' + cards + '"] #contact_box').each(function(index) {
        var that = $(this);
        setTimeout(function() {
            that.addClass('active');
        }, 150 * index)
    });
}
$.fn.copyDownload = function() {
    $('.element-item.FLW_40').each(function(index, el) {
        var clone1 = $(this).clone();
        var clone2 = $(this).clone();
        var clone3 = $(this).clone();
        var clone4 = $(this).clone();
        var clone5 = $(this).clone();
        var clone6 = $(this).clone();
        $(clone1).removeClass('FLW_40').addClass('FLW_40');
        $(clone2).removeClass('FLW_40').addClass('FLW40V');
        $(clone3).removeClass('FLW_40').addClass('FLW2428');
        $(clone4).removeClass('FLW_40').addClass('FLW28V');
        $(clone5).removeClass('FLW_40').addClass('FGL');
        $(clone6).removeClass('FLW_40').addClass('FLL');

        $(this).after(clone1)
        .after(clone2)
        .after(clone3)
        .after(clone4)
        .after(clone5)
        .after(clone6);
    }).promise().done(function() {
        var $container = $('.main').isotope({
            itemSelector: '.element-item',
            layoutMode: 'fitRows'
        });
        var filters = {};
        $(document).on('change', '.select_filter select', function() {
            var filterGroup = $(this).attr('data-filter-group');
            filters[filterGroup] = $(this).find(':selected').data('filter');
            var filterValue = '';
            for (var prop in filters) {
                filterValue += filters[prop];
            }
            $container.isotope({
                filter: filterValue
            });
        });

        $(document).on('click', '.resetfilter', function() {
            $('.select_filter select').each(function(index, el) {
                $(this).val($(this).find('option').eq(0).val())
                $('.select_filter select').trigger('change');
            });
        });
    });
}
$.fn.selectRegions = function() {
    var mapObj = $('#vmap').vectorMap('get', 'mapObject');
    mapObj.clearSelectedRegions();
    mapObj.setSelectedRegions(["AU", "DE", "GB", "AT", "FR", "PT", "CH"]);
}
var wrld = {
    map: 'world_mill_en',
    backgroundColor: 'transparent',
    zoomOnScroll: false,
    regionStyle: {
        initial: {
            fill: '#ccc',
        },
        hover: {
            "fill": '#ccc',
            "fill-opacity": "1"
        },
        selected: {
            fill: '#f70014'
        },
        selectedHover: {
            fill: '#f70014'
        }
    }
};