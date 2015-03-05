$(function () {

var data = {
    slides: [{
        ytid: '3CQOWYkJSzI',
        title: "Bloodhound Project",
        description: "Introduction to the Bloodhound Engineering Adventure"
    },
    {
        ytid: 'aqOVRMHI2vo',
        title: "Bloodhound SSC hybrid rocket test",
        description: "Rocket test."
    },
    {
        ytid: 'K_ImAm1WhcY',
        title: 'Bloodhound Wheels',
        description: "Manufacturing the fastest wheels in history."
    },
    {
        ytid: 'UJ4f0bt2QyM',
        title: '1000mph',
        description: "Why is it so hard to reach 1,000 mph."
    },
    {
        ytid: 'GzZhJWw_zjU',
        title: 'School record',
        description: "School sets 204 mph model rocket car Guinness World Record."
    },  
   {
        ytid: 'xsEbrIo6Xxg',
        title: "Bloodhound Rocket Animation.",
        description: "Rocket animation."
    },
    {
        ytid: 'QZDh03mb5aU',
        title: "Ejector Seat",
        description: "Does Bloodhound have an ejector seat?"
    },/*
    {
        ytid: '3CQOWYkJSzI',
        title: "Foo Bar!",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed."
    },
    {
        ytid: '3CQOWYkJSzI',
        title: "Foo Bar!",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed."
    },
    {
        ytid: '3CQOWYkJSzI',
        title: "Foo Bar!",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed."
    },
    {
        ytid: '3CQOWYkJSzI',
        title: "Foo Bar!",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed."
    },
    {
        ytid: '3CQOWYkJSzI',
        title: "Foo Bar!",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed."
    },
    {
        ytid: '3CQOWYkJSzI',
        title: "Something else!",
        preview: "http://placekitten.com/128/96",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    }*/
    ]
};

/*
    Automating some additional properties on the slide data.
*/
$.each(data.slides, function (index, it) {
    it.index = index;

    // See: https://developers.google.com/youtube/player_parameters
    var params = {
        showinfo: 0,
        theme: 'light',
        autohide: 1,
        autoplay: 0
    };

    it.embed_url = 'http://www.youtube.com/embed/' + it.ytid + '?' + $.param(params);
    params.autoplay = 1;
    it.autoplay_url = 'http://www.youtube.com/embed/' + it.ytid + '?' + $.param(params);
});

/*
    Insert flexslider html.
*/
$('.bh-gallery__flexslider')
    .html(
        Mustache.render($('#tpl-bh-gallery-flexslider').html(), data)
    )
    .flexslider({
        animation: "slide",
        animationLoop: false,
        controlNav: false,
        itemWidth: 128,
        itemMargin: 10
    });

/*
    Slide loading events
*/
var $triggers = $('.bh-gallery__flexslider [data-index]');
$triggers.on('click', function () {
    var trigger = this;
    var slideData = data.slides[this.getAttribute('data-index')];
    if (slideData) {
        loadSlide(slideData, trigger);
    }
    return false;
});


function loadSlide (slideData, trigger) {
    $triggers.removeClass('active');
    $(trigger).addClass('active');

    $('.bh-gallery__stage')
        .html(
            Mustache.render($('#tpl-bh-gallery-stage').html(), slideData)
        );
}

/*
    Display first video.
*/
loadSlide(data.slides[0], $triggers[0]);

// After first video is displayed videos loaded by user action should play automatically.
$.each(data.slides, function (index, it) {
    it.embed_url = it.autoplay_url;
});

function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}

function mycountdown()
{
countdown(4.0 * 60,
    function (minutes, seconds) {
        var mins = (minutes < 10 ? '0' : '') + minutes;
        var secs = (seconds < 10 ? '0' : '') + seconds;
        $('.bh-eta-countdown').html(
            '<span>' + mins + '<small>mins</small></span> ' +
            '<span>' + secs + '<small>secs</small></span>');
    },
    function () {
        // Check if the results are in
                var params={}
                var pk = GetURLParameter('pk');
                params['pk'] = pk;
                $.ajax({
                        url: 'https://zs.zenotech.com/speed/runstatus',
                        type: 'GET',
                        data: params,
                        dataType: 'jsonp',
                        success: function (response) {
                                if(response.status=='true'){
                                   if(response.pending == 'true')
                                     {
                                          mycountdown();
                                     }
                                   else
                                     {
                                          var $resultLink = $('<a/>')
                                                  .addClass('bh-telemetry-btn')
                                                  .attr({ href: 'telemetry.html?pk='+pk })
                                                  .html('See your results! \u00a0\u2192');
                                          $('.bh-eta')
                                             .addClass('-done')
                                             .html($resultLink);
                                     }
                                }
                                else
                                  self.location="bloodhound-iframed.htm";
                        },
                        error : function (response) {
                                self.location="bloodhound-iframed.htm";
                        }
                       
                });        
/*
        var $resultLink = $('<a/>')
            .addClass('bh-telemetry-btn')
            .attr({ href: 'telemetry.html?pk='+$(document).getUrlParam("pk") })
            .html('See your results! \u00a0\u2192');
        $('.bh-eta')
            .addClass('-done')
            .html($resultLink);
*/
        //alert('Your results are in!');
    });
}

mycountdown();

}); // END dom ready closure.
