$(function () {

var IE = (!! window.ActiveXObject && +(/msie\s(\d+)/i.exec(navigator.userAgent)[1])) || NaN;


// Store original positions for offset calculations.
$('.bh-calculator__parts').find('svg, img, [data-part]').each(function () {
    this.setAttribute('data-original-left', parseInt(this.style.left, 10) || 0);
    this.setAttribute('data-original-top', parseInt(this.style.top, 10) || 0);
    this.setAttribute('data-original-height', this.offsetHeight);
});

// Used to protect against infinite loop while checking slider ranges
var checking = false;

function checkSliderRanges($slider,id)
{
    checking = true;
    //console.log("Checking");
    if(id == "bh-nose")
    {
       //console.log("Found Nose");
       var $bodyAngle = $('#bh-angle-body');
       var $bodyHeight = $('#bh-height-body');

       var currentNoseHeight = parseFloat($slider.attr('aria-valuenow')); 

       var noseHeightDelta = 132.0 - currentNoseHeight;
  
       var bodyHeightMin = 82.0;

       // Is the nose below baseline
       if(noseHeightDelta > 0)
       {
           var nodeHeightInc = parseFloat($bodyHeight.attr('data-inc'));
           $bodyHeight.attr('aria-valuemin',bodyHeightMin+Math.ceil(noseHeightDelta/nodeHeightInc)*nodeHeightInc);
           // Add check for value now
           var valueNow = parseFloat($bodyHeight.attr('aria-valuenow'));
           $bodyHeight.attr('aria-valuenow',Math.max(valueNow,parseFloat($bodyHeight.attr('aria-valuemin'))));
       }
       else
       {
           $bodyHeight.attr('aria-valuemin',bodyHeightMin);
       }


       var bodyAngleMin = -0.5;
       var bodyAngleMinNoseHeight = 132.0 +  1000.0 * (-137.69 - (-150.0))*Math.tan(-0.5*Math.PI/180.0)
       //console.log("Body angle min nose height "+bodyAngleMinNoseHeight);
       if(noseHeightDelta > 0)
       {
           var bodyAngleMinNew = 180.0/Math.PI * Math.atan((bodyAngleMinNoseHeight+noseHeightDelta - 132.0)/(1000.0*(-137.69 - (-150.0))));
           //console.log(bodyAngleMinNew); 
           var bodyAngleInc = parseFloat($bodyAngle.attr('data-inc'));
           $bodyAngle.attr('aria-valuemin',Math.ceil(bodyAngleMinNew/bodyAngleInc)*bodyAngleInc);
           // Add check for value now
           var valueNow = parseFloat($bodyAngle.attr('aria-valuenow'));
           $bodyAngle.attr('aria-valuenow',Math.max(valueNow,parseFloat($bodyAngle.attr('aria-valuemin'))));
       }
       else
       {
           $bodyAngle.attr('aria-valuemin',bodyAngleMin);
       }

       //console.log($bodyAngle.attr('aria-valuemin'));
       //console.log($bodyHeight.attr('aria-valuemin'));
    }

    if(id == "bh-angle-body")
    {
       //console.log("Found body angle");
       var $noseHeight = $('#bh-nose');
       var $bodyHeight = $('#bh-height-body');

       var currentBodyAngle = parseFloat($slider.attr('aria-valuenow'));
       var noseHeightDelta  = -1000.0 * (-137.69 - (-150.0))*Math.tan(currentBodyAngle*Math.PI/180.0);
       
       var bodyHeightMin = 82.0;

       // Is the nose below baseline
       if(noseHeightDelta > 0)
       {
           var bodyHeightInc = parseFloat($bodyHeight.attr('data-inc'));
           $bodyHeight.attr('aria-valuemin',bodyHeightMin+Math.ceil(noseHeightDelta/bodyHeightInc)*bodyHeightInc);
           // Add check for value now
           var valueNow = parseFloat($bodyHeight.attr('aria-valuenow'));
           $bodyHeight.attr('aria-valuenow',Math.max(valueNow,parseFloat($bodyHeight.attr('aria-valuemin'))));
       }
       else
       {
           $bodyHeight.attr('aria-valuemin',bodyHeightMin);
       }

       if(noseHeightDelta > 0)
       {
           var noseHeightInc = parseFloat($noseHeight.attr('data-inc'));
           $noseHeight.attr('aria-valuemin',bodyHeightMin+Math.ceil(noseHeightDelta/noseHeightInc)*noseHeightInc);
           // Add check for value now
           var valueNow = parseFloat($noseHeight.attr('aria-valuenow'));
           $noseHeight.attr('aria-valuenow',Math.max(valueNow,parseFloat($noseHeight.attr('aria-valuemin'))));
       }
       else
       {
           $noseHeight.attr('aria-valuemin',bodyHeightMin);
       }

       //console.log($noseHeight.attr('aria-valuemin'));
       //console.log($bodyHeight.attr('aria-valuemin'));
    }

    if(id == "bh-height-body")
    {
       //console.log("Found body height");
       var $noseHeight = $('#bh-nose');
       var $bodyAngle = $('#bh-angle-body');

       var currentBodyHeight = parseFloat($slider.attr('aria-valuenow'));
       var noseHeightDelta = 132.0 - currentNoseHeight;

       var bodyHeightMin = 82.0;

       var bodyAngleMin = -0.5;
       var bodyAngleMinNoseHeight = 132.0 +  1000.0 * (-137.69 - (-150.0))*Math.tan(-0.5*Math.PI/180.0)
       //console.log("Body angle min nose height "+bodyAngleMinNoseHeight);
       if(noseHeightDelta > 0)
       {
           var bodyAngleMinNew = 180.0/Math.PI * Math.atan((bodyAngleMinNoseHeight+noseHeightDelta - 132.0)/(1000.0*(-137.69 - (-150.0))));
           //console.log(bodyAngleMinNew); 
           var bodyAngleInc = parseFloat($bodyAngle.attr('data-inc'));
           $bodyAngle.attr('aria-valuemin',Math.ceil(bodyAngleMinNew/bodyAngleInc)*bodyAngleInc);
           // Add check for value now
           var valueNow = parseFloat($bodyAngle.attr('aria-valuenow'));
           $bodyAngle.attr('aria-valuenow',Math.max(valueNow,parseFloat($bodyAngle.attr('aria-valuemin'))));
       }
       else
       {
           $bodyAngle.attr('aria-valuemin',bodyAngleMin);
       }

       if(noseHeightDelta > 0)
       {
           var noseHeightInc = parseFloat($noseHeight.attr('data-inc'));
           $noseHeight.attr('aria-valuemin',bodyHeightMin+Math.ceil(noseHeightDelta/noseHeightInc)*noseHeightInc);
           // Add check for value now
           var valueNow = parseFloat($noseHeight.attr('aria-valuenow'));
           $noseHeight.attr('aria-valuenow',Math.max(valueNow,parseFloat($noseHeight.attr('aria-valuemin'))));
       }
       else
       {
           $noseHeight.attr('aria-valuemin',bodyHeightMin);
       }

       //console.log($noseHeight.attr('aria-valuemin'));
       //console.log($bodyAngle.attr('aria-valuemin'));
    }

  updateSliders();
  checking = false;
}

function update (e, ui, setup) {

    var $slider = $(this);
    var pixelRange = $slider.parent().width() - $slider.width();
    var pixelLeft = parseFloat($slider.css('left'), 10);
    var valueMin = parseFloat(this.getAttribute('aria-valuemin'), 10) || 0;
    var valueMax = parseFloat(this.getAttribute('aria-valuemax'), 10) || 0;
    var valueNow = parseFloat(this.getAttribute('aria-valuenow'), 10) || 0;
    var valueRange = valueMax - valueMin;

    var valueInc = parseFloat(this.getAttribute('data-inc')) || 0;

    var point;
    if (setup) {
        point = (valueNow - valueMin) / valueRange;
        $slider.css('left', point * pixelRange);
    }
    else {
        point = pixelLeft / pixelRange;
    }

    // Calculate updated value.
    var valueUpdated = Math.floor(point * valueRange) + valueMin;
    
    var precision = this.getAttribute('data-precision') || 0;
    if (precision) {
        valueUpdated = +(point * valueRange + valueMin).toFixed(precision);
    }

    if(valueInc)
        valueUpdated = Math.floor((valueUpdated-valueMin)/valueInc)*valueInc + valueMin;

    var valueRaw = point * valueRange + valueMin;

    if(valueInc)
        valueRaw = Math.floor((valueRaw-valueMin)/valueInc)*valueInc + valueMin;

    var outputText = valueUpdated + ' ' + this.getAttribute('data-unit');

    // Update ARIA attributes.
    this.setAttribute('aria-valuenow', valueUpdated);
    this.setAttribute('aria-valuetext', outputText);
    this.setAttribute('data-point', point);

    if(!checking)
        checkSliderRanges($slider,this.id);

    // Update label.
    var $output = $slider.closest('.bh-calculator__slider').find('.bh-calculator__slider-output');
    $output.html(outputText);

    // Controller.
    if (controllers[this.id]) {
        controllers[this.id].call(this, {
            point: point,
            value: valueUpdated,
            valueRaw: valueRaw,
            valueMin: valueMin,
            valueMax: valueMax,
            valueRange: valueRange,
            outputText: outputText
        });
    }

}


/*
    Controllers.
*/
var controllers = {

    "bh-nose": function (data) {
        var $nose = $('#bh-nose-nose');

        var rotateAngleDeg = Math.atan((data.valueRaw-132.0)/2500.0)*180/Math.PI;
        if (BloodhoundModernizr.csstransforms) {
            $nose.css(BloodhoundModernizr.prefixed('transform'), 'rotate(' + rotateAngleDeg + 'deg)');
            $nose.css(BloodhoundModernizr.prefixed('transformOrigin'), '100% 50%');
        }
        else if (IE) {
            //$nose[0].style.rotation = data.value;
            //offsetRotatedVMLElement($nose, data.value);
            $nose[0].style.rotation = rotateAngleDeg;
            offsetRotatedVMLElement($nose, rotateAngleDeg);

        }

        $('#' + this.id + '-slide').find('.bh-calculator__label').html((rotateAngleDeg).toFixed(2) + ' degrees');
    },

    "bh-height-body": function (data) {
        var $body = $('#bh-height-body-body');
        //var delta = 30 * data.point;
        var delta = 30*(data.valueRaw-data.valueMin)/(data.valueMax-data.valueMin);
        $body.css('top', $body.attr('data-original-top') - delta);

        $('#' + this.id + '-slide').find('.bh-calculator__label').html(data.outputText);
    },

    "bh-width-wheels": function (data) {

        function scale ($wheel, scaleUpwards) {
            var originalHeight = +$wheel.attr('height');
            //var delta = 30 * data.point;
            var delta = 30*(data.valueRaw-data.valueMin)/(data.valueMax-data.valueMin);
            var newHeight = originalHeight + delta;
            $wheel.css('height', newHeight);

            if (scaleUpwards) {
                var originalTop = $wheel.attr('data-original-top');
                $wheel.css('top', originalTop - (newHeight - originalHeight));
            }
        }

        scale($('#bh-width-wheels-first'), true);
        scale($('#bh-width-wheels-second'));

        $('#' + this.id + '-slide').find('.bh-calculator__label').html(data.outputText);
    },

    "bh-rear-axle": function (data) {
        var $axle = $('[data-part="axle"]');
        var originalHeight = parseFloat($axle.attr('data-original-height'), 10);
        var originalTop = parseFloat($axle.attr('data-original-top'), 10);
        //var delta = 50 * data.point;
        var delta = 50*(data.valueRaw-data.valueMin)/(data.valueMax-data.valueMin);
        $axle.css('height', originalHeight + delta);
        $axle.css('top', originalTop - (delta/2));

        $('#' + this.id + '-slide').find('.bh-calculator__label').html(data.outputText);
    },

    "bh-fire-rocket": function (data) {
        var $hand = $('#bh-fire-rocket-hand');
        var rotate = 360 / 60 * data.value;
        if (BloodhoundModernizr.csstransforms) {
            $hand.css(BloodhoundModernizr.prefixed('transform'), 'rotate(' + rotate + 'deg)');
        }
        else if (IE) {
            $hand[0].style.rotation = rotate;
        }

        $('#' + this.id + '-slide').find('.bh-calculator__label').html(data.outputText);
    },

    "bh-angle-body": function (data) {
        var $body = $("#bh-angle-body-body");
        if (BloodhoundModernizr.csstransforms) {
            $body.css(BloodhoundModernizr.prefixed('transform'),
                'rotate(' + data.valueRaw + 'deg)');
            $body.css(BloodhoundModernizr.prefixed('transformOrigin'),
                '729px 192px');
        }
        else if (IE) {
            $body[0].style.rotation = data.value;
            offsetRotatedVMLElement($body, data.value);
        }

        $('#' + this.id + '-slide').find('.bh-calculator__label').html(data.value + ' degrees');
    }
};


/*
    References.
*/
var $slides = $('.bh-calculator__slide');
var $buttons = $( ".bh-calculator__slider-button" );


/*
    IE/VML only.
*/
if (IE < 9) {

    $(document).on('bh-legacy-ie-ready', initialze);

    document.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
    var createVMLNode = (function () {
        try {
            ! document.namespaces.rvml && document.namespaces.add("rvml", "urn:schemas-microsoft-com:vml");
            return function (tagName) {
                return document.createElement('<rvml:' + tagName + ' class="rvml">');
            };
        } catch (e) {
            return function (tagName) {
                return document.createElement('<' + tagName + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
            };
        }
    })();

    var offsetRotatedVMLElement = function ($element, angle) {

        // VML only rotates around the center point so the
        // following is for calculating top and left offsets to simulate
        // rotation around a right middle origin.
        var halfWidth = parseInt($element.css('width'), 10) / 2;
        var radians = (Math.PI/180) * Math.abs(angle);

        // Left offset.
        var adjacentLength = Math.cos(radians) * halfWidth;
        var xOffset = halfWidth - adjacentLength;
        if (angle > 0) {
            xOffset = xOffset * -1;
        }
        var originalLeft = parseInt($element.attr('data-original-left'), 10);
        $element[0].style.left = originalLeft + xOffset;

        // Top offset.
        var oppositeLength = Math.sin(radians) * halfWidth;
        var yOffset = oppositeLength;
        if (angle > 0) {
            yOffset = yOffset * -1;
        }
        var originalTop = parseInt($element.attr('data-original-top'), 10);
        $element[0].style.top = originalTop + yOffset;
    }

    var $images = $('.bh-calculator__stage img[src$="svg"]');
    var loadedImageCount = 0;
    $images.each(function (index, img) {
        var $img = $(img);
        var src = img.src;
        var pos = src.lastIndexOf("/");
        var filename = src.substring(pos + 1);
        var dir = src.substring(0, pos);
        var imageWidth = parseInt($(this).css('width'), 10);
        var newSrc = dir +
            '/png/' +
            imageWidth +
            'x/' +
            filename.substring(0, filename.lastIndexOf(".")) +
            '.png';

        img.onload =
        img.onerror = function (e) {

            var e = e || window.event;
            if (e.type === 'load' && img.getAttribute('data-rotate')) {

                var vmlImage = createVMLNode('image');
                vmlImage.src = img.src;

                vmlImage.id = img.id;
                vmlImage.style.position = 'absolute';

                var width = parseInt($img.css('width'), 10);
                vmlImage.style.width = width + 'px';
                vmlImage.style.height = img.offsetHeight + 'px';

                var left = parseInt($img.css('left'), 10);
                var top = parseInt($img.css('top'), 10);
                vmlImage.style.left = left;
                vmlImage.style.top = top;
                vmlImage.setAttribute('data-original-left', left);
                vmlImage.setAttribute('data-original-top', top);

                // Swap out the old image for the vml image.
                img.parentNode.insertBefore(vmlImage, img);
                img.parentNode.removeChild(img);
            }

            loadedImageCount++;
            if (loadedImageCount === $images.length) {
                $(document).trigger('bh-legacy-ie-ready');
            }
        }
        img.src = newSrc;
    });
}
else {

    initialze();
}


function updateSliders() {
       $buttons.each(function () {
            update.call(this, null, null, true);
        });

}

function initialze () {

    // Recalculations on window resize.
    $(window).on('resize', function () {
        $buttons.each(function () {
            update.call(this, null, null, true);
        });
    });

    // Responding to clicks inside the track.
    $('.bh-calculator__slider-track').on('mousedown', function (e) {
        var $track = $(this);
        var $button = $track.find('> .bh-calculator__slider-button');
        var buttonWidth = $button.outerWidth();
        var borderWidth = parseInt($track.css('border-left-width'), 10);

        var left = e.clientX - $track.offset().left - borderWidth - (buttonWidth / 2);
        left = Math.min(left, $track.width() - buttonWidth);
        left = Math.max(left, borderWidth);

        $button.css('left', left).focus();

        update.call($button[0]);
    });

    var homeSlideTimer;
    var dragging;

    // Slider events.
    $('.bh-calculator__control').each(function () {

        var $controlArea = $(this);
        var $button = $controlArea.find('button');

        var showSlide = function (e, slideId) {
            if (dragging) {
                return false;
            }
            e && e.stopPropagation();
            clearTimeout(homeSlideTimer);

            var $assocSlide = $('#' +
                (slideId || $button[0].id + '-slide')
            );
            var $currentVisible = $slides.filter(':visible');
            if ($assocSlide[0] === $currentVisible[0]) {
                return;
            }
            if ($assocSlide.length) {
                var transitionSpeed = IE && IE < 9 ? 0 : 250;
                $currentVisible.fadeOut(transitionSpeed);
                $assocSlide.fadeIn(transitionSpeed);
            }
        };

        $controlArea.mouseenter(showSlide);
        
        $controlArea.mouseleave(function () {
            homeSlideTimer = setTimeout(function () {
                showSlide(null, 'bh-home');
            }, 600);
        });


        update.call($button[0], null, null, true);

        $button.draggable({
            cancel: "input,textarea,select,option",
            axis: "x",
            cursor: "move",
            start: function () {
                dragging = true;
            },
            stop: function () {
                dragging = false;
            },
            containment: "parent",
            drag: update
        });
    });


    /*
        Sending the data and redirecting.
    */
    $('.bh-calculator__btn').click(function () {

        var params = {};
        $('button[name][aria-valuenow]').each(function () {
/*            params[this.getAttribute('name')] =
                Math.min(100, parseFloat(this.getAttribute('data-point')) * 100).toFixed(2);
*/
             params[this.getAttribute('name')] = parseFloat(this.getAttribute('aria-valuenow')).toFixed(2);  
          //console.log("");
        });

        // Post the parameters using an ajax call
/*                $.ajax({
                        url: 'https://zs.zenotech.com/speed/startrun',
                        type: 'GET',
                        data: params,
                        dataType: 'jsonp',
                        success: function (response) {
                                if(response.status=='true')
                                  self.location="wait.html?pk="+response.pk;
                                else
                                  {
                                  console.log(response.error);
                                  alert("Virtual race failed. Please try againi "+response.error);
                                  }
                        },
                        error : function (response) {
                               alert("Virtual race failed. Please try again2"); 
                        }
                       
                });
*/
        //location.href = this.getAttribute('data-posturl') + '?' + $.param(params);
    });

    $('.bh-calculator img').on('dragstart', function (e) {e.preventDefault();});


    /*
        Show first slide.
    */
    $slides.hide();
    $slides.eq(0).show();
}


}); // End outer closure.

