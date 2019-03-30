/*///////////////////////////// WHAT I LEARNED /////////////////////////////////
This application is created for the purpose of learning:
-linear scales
-hsl colors
-data joins
-transitions

/////////////////////////////// TO DO //////////////////////////////////////////
-display hsl color
-display hex code
- check old data to avoid weird first nodes
- try rectangle
- allow copying the hex code

////////////////////////////// GLOBAL VARIABLES /////////////////////////////*/
var data = []

for (i = 0; i <= 40; i++) {
	 data.push(0);
}
for (i = 0; i <= 360; i++) {
	 data.push(i);
};

var width = window.innerWidth - 60;
var height = window.innerHeight - 20;
var margin = { top: 50, right: 50, bottom: 50, left: 50} ;
var interval = 10;
var axisMove = (height /2) + 160;

// scale for determing node size
var nodeScale = d3.scale.linear()
	.domain([0, d3.max(data)])
	.range([0, 70]);
// scale for determining node color
var hslScale = d3.scale.linear()
	.domain([0, d3.max(data)])
	.range([0, 360]);
// scale for the x Axis
var xScale = d3.scale.linear()
	.domain([0,data.length])
	.range([0, width - margin.right]);

// set the width and height for the svg canvas
var canvas = d3.select(".canvas")
	.attr("width", width + margin.right + margin.left)
	.attr("height", height + margin.top + margin.bottom);

// enter and bind all circle (nodes) to data
var nodes = canvas.selectAll("circle")
	.data(data)
	.enter().append("circle")
	.transition()
	.delay(function(i) { return i * interval;});

// set node attributes
nodes.attr("r", function(d) { return nodeScale(d * Math.random());})
	.attr("cx", width / 3)
	.attr("cy", 0)
	.transition()
	.attr("cx", function(d) { return xScale(d); })
	.attr("cy", "50%")
	.style("fill", function(i) { return d3.hsl(i,.5,.52)});

// node mouseover effect
d3.selectAll("circle")
	.on("mouseover", function() {
    d3.select(this).attr("r", 80)
    // grab the color of the circle being hovered over
    var currentCircleFill = d3.select(this)[0][0].style.fill
    d3.select('#current-hsl')
    .text(function() {return currentCircleFill })
    .style("color", function() { return currentCircleFill })

    d3.select('#current-hex')
    .text(function() {return currentCircleFill })
    .style("color", function() { return currentCircleFill })

    d3.select('#current-rgb')
    .text(function() {return currentCircleFill })
    .style("color", function() { return currentCircleFill })
   })
	.on("mouseout", function(d) { d3.select(this).attr("r", nodeScale(d * Math.random()));});

// x axis function
var xAxis = d3.svg.axis()
	.scale(xScale)
	.orient("bottom");

// svg group that holds x axis
var axisGroup = canvas.append("g")
	.attr("class", "axis")
	.attr("transform", "translate("+ margin.left + "," + axisMove + ")")
	.attr("width", width)
	.call(xAxis);
