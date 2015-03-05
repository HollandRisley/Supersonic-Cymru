var IE = (!! window.ActiveXObject && +(/msie\s(\d+)/i.exec(navigator.userAgent)[1])) || NaN;

;(function () {

window.bloodhoundChart = function bloodhoundChart (controller) {

    var paper = Raphael(controller.id + '-panel');
    var txtattr = {
        font: '16px "Lucida Grande", "Lucida Sans Unicode",\
            "Lucida Sans", Geneva, Verdana, sans-serif',
        fill: '#666',
        opacity: 0
    };
    var txtanim = {opacity: 1};
    var txtanimDuration = 250;

    // Labels.
    var bottomAxisLabel = paper
        .text(474, 320, controller.xAxisText)
        .attr(txtattr)
        .animate(txtanim, txtanimDuration);
    var leftAxisLabel = paper
        .text(24, 147, controller.yAxisText)
        .rotate(-90)
        .attr(txtattr)
        .animate(txtanim, txtanimDuration);

    var linechart = paper.linechart(50, 38, 854, 260, [controller.x], [controller.y], {
            nostroke: false,
            symbol: "circle",
            smooth: true,
            colors: ['transparent'],
            axis: "0 0 1 1",
            axisxstep: Math.max.apply({}, controller.x),
            axisystep: Math.max.apply({}, controller.y)
        });

    var currentIndex = 0;

    // If there's a point at 0,0 assume it's superficial and remove it.
    if (controller.x[0] === 0 && controller.y[0] === 0) {
        linechart.symbols[currentIndex][0].remove();
        linechart.symbols[currentIndex].splice(0, 1);
    }

    // AXIS styling.
    linechart.axis.attr({
        'stroke': 'none'
    });


    // Symbol styling and hover events.
    linechart.symbols[currentIndex]
        .attr({
            r: 12,
            fill: '#713171',
            "fill-opacity": 1
        })
        .hover(
            function () {
                this._clone = this._clone || this.clone().toBack();
                this._clone.attr({
                    stroke: "black",
                    "stroke-width": 18,
                    "stroke-opacity": .15
                }).show();
                this._glow && this._glow.hide();

            }, function () {

                this._clone.hide()
                this._glow && this._glow.show();
            }
        ).hide();


    // Hover actions on symbols.
    linechart.symbols[currentIndex].forEach(function (symbol) {

        var $symbol = $(symbol[0]);
        var $render = $('#bh-telemetry-render');
        $symbol.css('cursor', 'pointer');
        var $zigzag = $('<span class="bh-zigzag"><span><span></span></span></span>');

        $symbol.click(function () {
            alert('You clicked me!');
            // $render.attr('src', '');
        });

        symbol.hover(function () {

            // START Zigzag pointer.
            $zigzag.appendTo('body');
            var symbolCoords = $symbol.offset();
            $zigzag.css({
                left: symbolCoords.left + 12 - 3,
                top: symbolCoords.top
            });

            var pictureCoords = $render.offset();
            $zigzag.find('> span').css({
                height: symbolCoords.top - pictureCoords.top - $render.height() - 25
            });

            $zigzag.find('> span > span').css({
                width: Math.abs(symbolCoords.left - pictureCoords.left - $render.width() / 2)
            });

            var pictureBottomEdgeOffset = pictureCoords.left + $render.width() / 2;
            if (pictureBottomEdgeOffset > symbolCoords.left) {
                $zigzag.addClass('-left');
            }
            // END Zigzag pointer.

            // Ajax API interactions...


        }, function () {

            $zigzag.remove();
        });
    });


    // Adding glow to symbols.
    $.each(linechart.symbols[currentIndex], function (index, element) {
        if (! IE) {
            element._glow = element.glow({
                color: '#000',
                opacity: .2,
                width: 3,
                fill: true
            }).hide();
        }
    });

    var line = linechart.lines[currentIndex];
    var pathData = line.attr('path');
    line.remove();

    var showForces = function (controller, xAxis) {
        var src = controller.src;
        var topForceIndex = src.drag.length-1;
        var forceIndex = Math.min(topForceIndex, Math.round(topForceIndex * xAxis));

        var $forces = $('.bh-telemetry-forces');
        $forces.find('.bh-force.-weight > div')[0].style.height = src.weight[forceIndex] + '%';
        $forces.find('.bh-force.-drag > div')[0].style.width = src.drag[forceIndex] + '%';
        $forces.find('.bh-force.-thrust > div')[0].style.width = src.thrust[forceIndex] + '%';
        $forces.find('.bh-force.-lift-front > div')[0].style.height = src.liftF[forceIndex] + '%';
        $forces.find('.bh-force.-lift-rear > div')[0].style.height = src.liftR[forceIndex] + '%';
    };

    $('.bh-telemetry__chart').mouseleave(function () {
        showForces(controller, 0);
    });

    var newPath = drawpath(paper, pathData, 500, {
            stroke: "#777",
            "stroke-width": 2,
            "stroke-linecap": "round"
        }, function () {

            var line = this;
            var elementAnim = Raphael.animation({
                    transform: "s1"
                }, 250, "easeInOut");
            var elementGlowAnim = Raphael.animation({
                    transform: "s1 t.5,1"
                }, 250, "easeInOut");
            var inititalTransformString = "s.05 t0,0";

            $.each(linechart.symbols[currentIndex], function () {
                this.transform(inititalTransformString).show().animate(elementAnim);
                this._glow && this._glow.transform(inititalTransformString).show().animate(elementGlowAnim);
            });

            /*
                Generating a covering element to capture mousemove events over
                the area of the graph.
            */
            var coveringCoords = {
                top: 59,
                left: 48,
                width: 834,
                height: 240
            };
            var coveringRect = paper.rect(
                    coveringCoords.top,
                    coveringCoords.left,
                    coveringCoords.width,
                    coveringCoords.height).attr({
                "fill": "white",
                "fill-opacity": .01,
                "stroke": "none"
            }).toBack();

            /*
                Draw start/end lines
            */
            var xDimensions = controller.src[controller.xDimension];
            $.each(controller.verticals, function (i, vertical) {
                $.each(xDimensions, function (i, point) {
                    if (vertical === point) {
                        var last = xDimensions[xDimensions.length-1];
                        var left = (point / last * coveringCoords.width) + coveringCoords.left;
                        var top = coveringCoords.top;
                        var path = 'M' + [left + 12, top - 12].join(',') + 'v' + coveringCoords.height;
                        paper.path(path).attr({
                            "stroke": "black",
                            "stroke-width": .4,
                            "stroke-opacity": .7
                        }).toBack();
                    }
                });
            });

            line.toBack();

            var $followLine = $('<div class="bh-followline"/>').hide();
            $followLine.insertBefore(line.paper.canvas);
            var followLineLeft = parseInt($followLine.css('left'), 10);
            $followLine.data('left', followLineLeft);

            var rectBounds = coveringRect.node.getBoundingClientRect();
            coveringRect.mouseover(function (e) {
                rectBounds = coveringRect.node.getBoundingClientRect();
            });
            coveringRect.mousemove(function (e) {
                var width = rectBounds.right - rectBounds.left;
                var height = rectBounds.bottom - rectBounds.top;
                var leftOffset = e.clientX - rectBounds.left;
                var topOffset = e.clientY - rectBounds.top;
                var yAxis = 1 - (topOffset/height);
                var xAxis = leftOffset/width;

                $followLine.css({
                    left: $followLine.data('left') + leftOffset,
                    height: height
                });

                // Forces.
                showForces(controller, xAxis);
            });
            coveringRect.mouseout(function () {
                $followLine.hide();
            });
            coveringRect.mouseover(function () {
                $followLine.show();
            });
        });

    return paper;
}


function drawpath (paper, pathstr, duration, attr, callback) {

    var guide_path = paper.path( pathstr ).attr({ stroke: "none", fill: "none" } );
    var path = paper.path( guide_path.getSubpath( 0, 1 ) ).attr( attr );
    var total_length = guide_path.getTotalLength( guide_path );
    var last_point = guide_path.getPointAtLength( 0 );
    var start_time = new Date().getTime();
    var interval_length = 50;
    var result = path;

    paper.busyAnimating = true;
    var interval_id = setInterval(function () {

        var elapsed_time = new Date().getTime() - start_time;
        var this_length = elapsed_time / duration * total_length;
        var subpathstr = guide_path.getSubpath( 0, this_length );
        attr.path = subpathstr;

        path.animate( attr, interval_length );

        if ( elapsed_time >= duration ) {
            clearInterval( interval_id );
            guide_path.remove();
            paper.busyAnimating = false;

            if (callback) {
                setTimeout(function () {
                    callback.call(path);
                }, 0);
            }
        }
    }, interval_length);

    return result;
}


// Custom method for fading out all elements on the paper before removing.
Raphael.fn.fadeRemove = function (fadeSpeed, complete) {

    var paper = this;

    var elementCount = 0;
    paper.forEach(function () {elementCount++;});

    var completedAnimations = 0;
    paper.forEach(function (el) {
        el.animate(
            { opacity: 0 },
            fadeSpeed,
            "linear",
            function () {
                completedAnimations++;
                if (completedAnimations === elementCount) {
                    paper.remove();
                    complete && complete();
                }
            });
    });
};


})(); // End outer closure.



$(function () {
$.getJSON('data.js', function (data) {

var controllers = {};

/*
    Creating controllers with the source data.
*/
var controllerData = data['velocity-time'];
var x = [0];
var y = [0];
$.each(controllerData.keypoints, function (i, item) {
    x.push(controllerData.time[item]);
    y.push(controllerData.velocity[item]);
});
controllers["bh-velocity"] = {
    x: x,
    y: y,
    src: data['velocity-time'],
    xDimension: 'time',
    yDimension: 'velocity',
    verticals: data['velocity-time'].time_measured_mile,
    xAxisText: 'Time',
    yAxisText: 'Velocity'
};

var controllerData = data['acceleration-time'];
var x = [0];
var y = [0];
$.each(controllerData.keypoints, function (i, item) {
    x.push(controllerData.time[item]);
    y.push(controllerData.velocity[item]);
});
controllers["bh-acceleration"] = {
    x: x,
    y: y,
    src: data['acceleration-time'],
    xDimension: 'time',
    yDimension: 'velocity',
    verticals: data['acceleration-time'].time_measured_mile,
    xAxisText: 'Time',
    yAxisText: 'Acceleration'
};

var controllerData = data['speed-distance'];
var x = [0];
var y = [0];
$.each(controllerData.keypoints, function (i, item) {
    x.push(controllerData.distance[item]);
    y.push(controllerData.velocity[item]);
});
controllers["bh-other"] = {
    x: x,
    y: y,
    src: data['speed-distance'],
    xDimension: 'distance',
    yDimension: 'velocity',
    verticals: data['speed-distance'].distance_measured_mile,
    xAxisText: 'Distance',
    yAxisText: 'Speed'
};


$.each(controllers, function (key, controller) {
    controller.id = key;
});

var activeControllerId = "bh-velocity";
var activeController = controllers[activeControllerId];
var activeChart = bloodhoundChart(activeController);

var $tabs = $('.bh-telemetry__tabs [role="tab"]');
$tabs.attr('aria-selected', function () {
    return this.id === activeControllerId ? 'true' : 'false';
});

$tabs.on('click', function (e) {
    e.preventDefault();

    var targetController = controllers[e.target.id];
    if (activeChart.busyAnimating || targetController === activeController) {
        return;
    }
    $tabs.attr('aria-selected', function () {
        return this === e.target ? 'true' : 'false';
    });
    activeController = targetController;
    activeChart.fadeRemove(300, function () {
        activeChart = bloodhoundChart(activeController);
        $('<div class="bh-followline"/>').remove();
    });
});

if (IE < 9) {
    $('.bh-force img[src$="svg"]').each(function (index, img) {
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
        img.src = newSrc;
    });
}

});
});
