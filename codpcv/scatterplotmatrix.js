var scatterplotmatrix = (function() {

	// svg container
	var width = 400;
	var height = 400;

	// subcharts
	var scatterplotwidth = 100;
	var scatterplotheight = 100;
	
	// matrix cell
	var padding = 3;
	var cellWidth = scatterplotwidth + 30 + padding;
	var cellHeight = scatterplotheight + 21 + padding;

	// dots
	var radius = 5;

	return {
		createScatterplotMatrix: function (data, keys, range) {
			
			//TODO separate css instead of attributes to clean up the code
			//TODO balance container size for different numbers of keys
			
			// update size of the svg container relative to number of keys
			width = cellWidth * keys.length;
			height = cellHeight * keys.length;
			
			// prepare loop
			var i = 4;
			var j = 5;
			
			// prepare translate
			posXcell = i * cellWidth;
			posYcell = j * cellHeight;
			
			var svg = d3.select("#vis-container")
				.append("svg")
				.attr("width", width)
				.attr("height", height)
				.style("background-color", "green");
			
			var scatterplot = svg.append("g")
				.attr("transform", "translate(" + posXcell + "," + posYcell + ")");
			
			// just for testing, this is not needed
			var scatterplotrect = scatterplot.append("rect")
				.attr("width", cellWidth)
				.attr("height", cellHeight)
				.attr("x", -25)
				.attr("y", -5)
				.style("fill", "white");
			
			// just for testing, this is not needed
			var scatterplotrect = scatterplot.append("rect")
				.attr("width", scatterplotwidth)
				.attr("height", scatterplotheight)
				.attr("x", 0)
				.attr("y", 0)
				.style("fill", "blue");
			
			var xscale = d3.scaleLinear().domain([range.min[keys[i]], range.max[keys[i]]]).range([0, scatterplotwidth]);;
			var yscale = d3.scaleLinear().domain([range.min[keys[j]], range.max[keys[j]]]).range([scatterplotheight, 0]);
			
			var xaxis = d3.axisBottom(xscale);
			
			var yaxis = d3.axisLeft(yscale);
			
			var xaxisg = scatterplot
				.append("g")
				.attr("transform", "translate(0," + scatterplotheight + ")")
				.call(xaxis);
				
			var yaxisg = scatterplot
				.append("g")
				.call(yaxis);
			
			var circles = scatterplot.selectAll("circle")
				.data(data)
				.enter()
				.append("circle")
				.attr("cx", function(d) {
					return xscale(d[keys[i]]);
				})
				.attr("cy", function(d) {
					return yscale(d[keys[j]]);
				})
				.attr("r", radius)
				.attr("fill", "red");
			
		}
	}

})();
