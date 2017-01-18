var scatterplotmatrix = (function() {

	// svg container, updated later!
	var width = 400;
	var height = 400;

	// subcharts
	var scatterplotwidth = 100;
	var scatterplotheight = 100;
	
	// matrix cell
	var padding = 10;
	var cellWidth = scatterplotwidth + padding;
	var cellHeight = scatterplotheight + padding;
	
	// plot
	var xOffset = 100;
	var yOffset = 30;

	// dots
	var radius = 5;

	return {
		createScatterplotMatrix: function (data, keys, range, nested_data, stringkeys) {
			
			//TODO separate css instead of attributes to clean up the code
			//TODO balance container size for different numbers of keys
			// pandas can show correlation values, kick out non-interesting features
			// show positiv, negativ etc Correlations with values (Correlation Matrix)
			// show mean and standard deviation in parallel coordinates -> Boxplot
			// sort by strings/particles
			
			// update size of the svg container relative to number of keys
			width = cellWidth * keys.length + xOffset + padding*4;
			height = cellHeight * keys.length + 2*yOffset;
			
			// create the svg container
			var svg = d3.select("#vis-container")
				.append("svg")
				.attr("width", width)
				.attr("height", height)
				.style("background-color", "#DDDDDD");
			
			// group the matrix, to be able to move it around
			var scatterplotmatrix = svg.append("g")
				.attr("transform", "translate(" + xOffset + "," + yOffset + ")");
			
			// create the matrix
			for (var i = 0; i < keys.length; ++i) {
				
				// hotfix to show integer values if there's only one value for an axis
				if (range[keys[i]][0] == range[keys[i]][1]) {
					range[keys[i]][1] += 10;
				}
				
				// set the scale for the dots along the x axis
				var xscale = d3.scaleLinear().domain(range[keys[i]]).range([0, scatterplotwidth]);
				
				for (var j = 0; j < keys.length; ++j) {
					
					// set the scale for the dots along the y axis
					var yscale = d3.scaleLinear().domain(range[keys[j]]).range([scatterplotheight, 0]);
					
					// calculate the position for the matrix cell
					posXcell = i * cellWidth;
					posYcell = j * cellHeight;
					
					// group a single scatterplot
					var scatterplot = scatterplotmatrix.append("g")
						.attr("transform", "translate(" + posXcell + "," + posYcell + ")");
					
					// indicate scatterplot borders
					var scatterplotrect = scatterplot.append("rect")
						.attr("width", scatterplotwidth)
						.attr("height", scatterplotheight)
						.attr("x", 0)
						.attr("y", 0)
						.style("stroke", "blue")
						.style("fill", "none");
					
					// draw circles
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
				
				var yscale = d3.scaleLinear().domain(range[keys[i]]).range([scatterplotheight, 0]);
				
				// draw axes
				var xaxis = d3.axisBottom(xscale.nice());
				var yaxis = d3.axisLeft(yscale.nice());
				xaxis.ticks(4);
				yaxis.ticks(4);
				
				var xaxisg = scatterplotmatrix
					.append("g")
					.attr("transform", "translate(" + i * cellWidth + "," + keys.length * cellHeight + ")")
					.call(xaxis);
					
				var yaxisg = scatterplotmatrix
					.append("g")
					.attr("transform", "translate(" + -padding + "," + i * cellHeight + ")")
					.call(yaxis);
				
				var yLabels = scatterplotmatrix.append("text")
					.attr("x", i * cellWidth + cellWidth/5)
					.attr("y", i * cellHeight + cellHeight/4)
					.text( function (d) { return keys[i]; })
					.attr("font-family", "sans-serif")
					.attr("font-size", "30px");
				
			}
		}
	}

})();
