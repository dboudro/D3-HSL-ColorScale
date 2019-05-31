/* ///////////////////////////// WHAT I LEARNED /////////////////////////////////
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

////////////////////////////// GLOBAL VARIABLES ///////////////////////////// */
var data = []

for (let i = 0; i <= 40; i++) {
  data.push(0)
}
for (let i = 0; i <= 360; i++) {
  data.push(i)
};

let width = window.innerWidth - 60
let height = window.innerHeight - 20
let margin = { top: 50, right: 50, bottom: 50, left: 50 }
let interval = 10
let axisMove = (height / 2) + 160

// scale for determing node size
let nodeScale = d3.scale.linear()
  .domain([0, d3.max(data)])
  .range([0, 70])
// scale for determining node color
let hslScale = d3.scale.linear()
  .domain([0, d3.max(data)])
  .range([0, 360])
// scale for the x Axis
let xScale = d3.scale.linear()
  .domain([0, data.length])
  .range([0, width - margin.right])

// set the width and height for the svg canvas
let canvas = d3.select('.canvas')
  .attr('width', width + margin.right + margin.left)
  .attr('height', height + margin.top + margin.bottom)

// enter and bind all circle (nodes) to data
let nodes = canvas.selectAll('circle')
  .data(data)
  .enter().append('circle')
  .transition()
  .delay(function (i) { return i * interval })

// set node attributes
nodes.attr('r', function (d) { return nodeScale(d * Math.random()) })
  .attr('cx', width / 3)
  .attr('cy', 0)
  .transition()
  .attr('cx', function (d) { return xScale(d) })
  .attr('cy', '50%')
  .style('fill', function (i) { return d3.hsl(i, 0.5, 0.52) })

// node mouseover effect
d3.selectAll('circle')
  .on('mouseover', function () {
    d3.select(this).attr('r', 80)
    // grab the color of the circle being hovered over
    let currentCircleFill = d3.select(this)[0][0].style.fill
    d3.select('#current-hsl')
      .text(function () { return 'hex: ' + d3.hsl(currentCircleFill) })
      .style('color', function () { return currentCircleFill })

    d3.select('#current-rgb')
      .text(function () { return currentCircleFill })
      .style('color', function () { return currentCircleFill })

    d3.select('#current-hex')
      .text(function () { return 'hsl: ' + Math.round(d3.hsl(currentCircleFill).h) + ' ' + Math.round(d3.hsl(currentCircleFill).s) + ' ' + Math.round(d3.hsl(currentCircleFill).l) })
      .style('color', function () { return currentCircleFill })
  })
  .on('mouseout', function (d) { d3.select(this).attr('r', nodeScale(d * Math.random())) })

// x axis function
let xAxis = d3.svg.axis()
  .scale(xScale)
  .orient('bottom')

// svg group that holds x axis
let axisGroup = canvas.append('g')
  .attr('class', 'axis')
  .attr('transform', 'translate(' + margin.left + ',' + axisMove + ')')
  .attr('width', width)
  .call(xAxis)
