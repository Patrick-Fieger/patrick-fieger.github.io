NProgress.configure({
    showSpinner: false
});
$(document).ready(function() {
    var hash = location.hash
    var slider;

    function clearsite() {
        NProgress.start();
        $('.breadcrumb').removeClass('active');
        $('html,body').scrollTop(0)
        $('.container').removeClass('active').empty();
        $('footer').removeClass('active');
    }

    function ready() {
        $('header,.container,footer').addClass('active');
        highlightMenu();
        NProgress.done()
    }

    // function resize() {
    // }
    // $(window).bind('resize', resize);

    function highlightMenu() {
        $('.top-bar-section a,footer a').removeClass('active');
        $('.top-bar-section a,footer a').each(function(index, el) {
            if ($(this).text().toLowerCase() == hash) {
                $(this).addClass('active')
            }
        });
    }

    function loadHeaderFooter() {
        $('footer,header').empty();
        $.get('js/templates/navi/footer.html', function(data) {
            $('footer').append(data)
        });
        $.get('js/templates/navi/header.html', function(data) {
            $('header').append(data);
        });
    }

    function showStart() {
        $.get('js/templates/index.html', function(data) {
                $('.container').append(data);
                addMenu();
                // resize();
                ready();
        });
    }

    function addMenu(){
        $('.headings_l div[data-type="waerme"] a,.headings_l div[data-type="unged"] a').each(function(index, el) {
            $(this).after('<ul>'
                +'<li>Prospekte</li>'
                +'<li>Zeichnungen</li>'
                +'<li>Bilder</li>'
                +'<li>Antriebe</li>'
                +'<li>Prüfberichte</li>'
                +'<li>Ausschreibungstexte</li>'
                +'<li>Zubehör</li>'
            +'</ul>')       
        });
    }

    function showNews() {
        $.get('js/templates/news.html', function(data) {
            $('.container').append(data);
            ready();
        });
    }

    function showDownload() {
        $.get('js/templates/downloads.html', function(data) {
            $('.container').append(data);
            basket.require({
                url: 'js/core/isotope.js'
            }).then(function() {
                $('body').copyDownload();
                ready();
            });
        });
    }

    function showSysteme(){
        var url = document.URL;
        url = $.url(url);
        var segment = url.segment(2);

    



        $.get('js/templates/systeme/'+segment+'.html', function(data) {
            $('.breadcrumb a').removeClass('active');
            $('.breadcrumb a').each(function(index, el) {
                var isurl = $(this).attr('data-url');
                if (isurl.indexOf(segment) > -1) {
                    $(this).addClass('active');
                    return false
                };
            });
            $('.container').append(data);
            $('.breadcrumb').addClass('active');
            ready();
        });
    }

    function showFensterberechnung() {
        $.get('js/templates/fensterberechnung.html', function(data) {
            $('.container').append(data);
            ready();
        });
    }

    function showKontakt() {
        $.get('js/templates/kontakt.html', function(data) {
            $('.container').append(data);
            basket.require({
                url: 'js/core/jquery.vmap.packed.js'
            }, {
                url: 'js/core/jquery.vmap.world.js'
            }).then(function() {
                $('#vmap').vectorMap(wrld);
                $('body').selectRegions();
                ready();
                var insert = ["Australien", "Großbritanien", "Österreich", "Frankreich", "Portugal", "Schweiz"];
                $.each(insert, function(index, val) {
                    var toinsert = $('div[land="Deutschland"]').clone();
                    var toinsert_ = toinsert.attr('land', insert[index]).removeClass('active');
                    $(toinsert_).insertAfter('div[land]:last-child');
                });
                setTimeout(function() {
                    $('body').showCards('Deutschland');
                }, 100)
            });
        });
    }

    function showFooterSites(url) {
        $.get('js/templates/' + url + '.html', function(data) {
            $('.container').append(data);
            ready();
        });
    }


    var History = window.History; // Note: We are using a capital H instead of a lower h
    History.options.debug = true

    // Bind to StateChange Event
    History.Adapter.bind(window,'statechange',function() { // Note: We are using statechange instead of popstate
        var State = History.getState();

        var hash_ = State.hash;
        hash = hash_.substring(0, hash_.indexOf('?'));
        hash = hash.slice(1);

        //alert(hash)

        clearsite();

        if (hash == 'Start'||hash == '') {
            showStart();
        } else if (hash == 'themen') {
            showNews();
        } else if (hash == 'downloads') {
            showDownload();
        } else if (hash.indexOf('systeme') > -1) {
            $('.breadcrumb').addClass('active');
            showSysteme();
        } else if (hash == 'kontakt') {
            showKontakt();
        } else if (hash == 'fensterberechnung') {
            showFensterberechnung();
        } else if (hash == 'impressum') {
            showFooterSites('impressum');
        } else if (hash == 'agb') {
            showFooterSites('agb');
        } else if (hash == 'faq') {
            showFooterSites('faq');
        }

    });


    $(document).on('click', '[data-url]', function(event) {
        event.preventDefault();
        var title;
        if($(this).attr('data-title')==undefined){
            title = $(this).text();
        }else{
            title = $(this).attr('data-title')
        }
        History.pushState(null,title,$(this).attr('data-url'));
    });

    loadHeaderFooter();



    if (History.getCurrentIndex() == 0)
    {
         History.Adapter.trigger(window, 'statechange');
    }


});