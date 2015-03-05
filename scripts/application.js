// EXECUTE BEFORE ALL HAS LOADED
$(document).ready(function () {
    
    $("a#download-csv-gif").fancybox({
        'hideOnContentClick': true
    });


    /* SLIDER ============================================================================================ */
    $(".mainSlider .flexslider").flexslider({
        animation: "slide", slideshowSpeed: 8000, animationSpeed: 700, controlNav: false,
        directionNav: true, slideshow: true, pauseOnAction: false, pauseOnHover: true
    });
    /* =================================================================================================== */

    /* AUTO-HEIGHT BLOCKS ================================================================================ */
    // Function to reset the block loop
    var listArray = [];
    var oldHeight = 0;
    var newHeight = 0;

    function resetArray(f, e) {
        var currentLoop = f % e;
        if (currentLoop == (e - 1)) { oldHeight = 0; newHeight = 0; listArray = []; }
    }

    function autoHeightFunction(containerDiv, targetElement, numElements, callBack) {
        listArray = [];
        oldHeight = 0;
        newHeight = 0;

        var targetDiv = containerDiv + " " + targetElement;
        $(targetDiv).each(function (index) {
            pushThis = containerDiv + ":eq(" + index + ") " + targetElement;
            listArray.push(pushThis);
            newHeight = $(this).height();

            if (newHeight > oldHeight) {
                oldHeight = newHeight;
                $("" + listArray + "").css({ "height": newHeight, "min-height": newHeight });
            } else {
                $("" + listArray + "").css({ "height": oldHeight, "min-height": oldHeight });
            }
            resetArray(index, numElements);
        }).promise().done(callBack);
    }

    //autoHeightFunction works by sending the content block size, the target area and the number of elements on each row.
    //Example autoHeightFunction(".grid_4", ".zBox.products .prodText",3);
    autoHeightFunction(".grid_4", ".zBox.products .prodText", 3);

    /* -------------------------------------------- */
    // APPLY SUBNAV HEIGHT TO MATCH CONTENT HEIGHT FOR LINE BORDER

    $(".container_12").each(function (index, element) {
        if ($(this).children("div:first-child").hasClass("contentBlock_3")) {
            var colSmall = $(this).children("div:first-child");
            var colLarge = $(this).children("div:first-child + div");
            var subNavTitleHeight = colSmall.find(".sub_nav > div:first-child").height() + 16;

            if (colLarge.height() > colSmall.height()) {
                colSmall.find(".sub_nav > ul").css("height", colLarge.height() - subNavTitleHeight);
            }
        }
    });
    /* -------------------------------------------- */
    /* =================================================================================================== */

    /* ACCORDIAN JAVASCRIPT ============================================================================== */
    $(".accordian_content").hide().removeClass("accordian_visible");
    $(".accordian").click(hideShowAccordian);

    function hideShowAccordian() {
        if ($(this).hasClass("openAccordian")) {
            $(".accordian").parent().parent().find(".accordian_content").slideUp({ duration: 700, easing: "easeOutQuint" }, function () { resizeWindow(); });
            $(".accordian").removeClass("openAccordian");
        } else {
            $(".accordian").parent().parent().find(".accordian_content").slideUp({ duration: 700, easing: "easeOutQuint" }, function () { resizeWindow(); });
            $(".accordian").removeClass("openAccordian");
            $(this).parent().parent().find(".accordian_content").slideDown({ duration: 700, easing: "easeOutQuint" }, function () { resizeWindow(); });
            $(this).addClass("openAccordian");
        }

        return false;
    }
    /* =================================================================================================== */

    /* WYSIWYG IMAGE AUTO MARGINS ======================================================================== */
    if ($.browser.msie && parseInt($.browser.version, 10) === 8 || $.browser.msie && parseInt($.browser.version, 10) === 7) {
        $("div.bodyText img[style]").each(function () {
            if ($(this).css("float") == 'left') {
                $(this).css("margin", "10px 15px 10px 0px");
            } else if ($(this).css("float") == 'right') {
                $(this).css("margin", "10px 0px 10px 15px");
            }
        });
    }
    /* =================================================================================================== */

    /* JAVASCRIPT OVERRIDE FOR TARGET BLANK ============================================================== */
    $('a[rel="new-window"]').click(function (e) {
        e.preventDefault();
        window.open(this.href);
    });
    /* =================================================================================================== */

    /* INPUT FOCUS FUNCTIONALITY ========================================================================= */
    $("input[type='text'], textarea").focus(function () {
        var $this = $(this);
        if (typeof ($this.data("originalVal")) == "undefined") { $this.data("originalVal", $this.val()); }
        if ($this.val() == '') { $this.val($this.data("originalVal")); }
        else { $this.val(''); }
    }).blur(function () {
        var $this = $(this);
        if ($this.val() == '') { $this.val($this.data("originalVal")); }
    });
    /* =================================================================================================== */

    /* FANCYBOX ========================================================================================== */
    /*$(".fancyBoxShow").fancybox({
    'width': '90%',
    'height': '90%',
    'autoScale': true,
    'autoDimensions': true,
    'centerOnScroll': true,
    'transitionIn': 'elastic',
    'transitionOut': 'elastic',
    'easingIn': 'easeInOutQuad',
    'easingOut': 'easeInOutQuad',
    'type': 'iframe'
    });*/

    $(".mVideoPopup").fancybox({
        'width': 735,
        'height': 443,
        'autoScale': true,
        'autoDimensions': true,
        'centerOnScroll': true,
        'transitionIn': 'elastic',
        'transitionOut': 'elastic',
        'easingIn': 'easeInOutQuad',
        'easingOut': 'easeInOutQuad',
        'type': 'iframe'
    });
    /* =================================================================================================== */
});


/* FOOTER HEIGHT CHANGE ================================================================================== */

var body = $("body").height();
var content = $(".siteHeader").height() + $(".siteContent").height() + $(".partnersRibbon").height() + $(".siteFooter").height();

function resizeWindow() {
    body = $("body").height();
    content = $(".siteHeader").height() + $(".siteContent").height() + $(".partnersRibbon").height() + $(".siteFooter").height();


}

// EXECUTE AFTER ALL HAS LOADED

$(window).load(function () {

    resizeWindow();

    $(window).resize(function () {
        resizeWindow();
    });

});

/* ===================================================================================================== */


/* TWITTER LINK REPLACE == DO NO REMOVE ================================================================ */
function replaceURLWithHTMLLinks(text) {
    var exp = /(?:^|[^"'])((ftp|http|https|file):\/\/[\S]+(\b|$))/gi
    text = text.replace(exp, " <a href='$1' target='_blank'>$1</a>");
    exp = /@([A-Za-z0-9_]+)/gi;
    text = text.replace(exp, " <a href='http://www.twitter.com/$1' target='_blank'>@$1</a>");
    exp = /#([A-Za-z0-9_]+)/gi;
    text = text.replace(exp, " <a href='http://www.twitter.com/search?q=$1' target='_blank'>#$1</a>");
    return text;
}
/* ===================================================================================================== */
