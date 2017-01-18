var parallelcoordinates = (function() {
	
	// svg container, width is updated later!
	var width = 500;
	var height = 200;
	
	//plot
	var padding = 10;
	var xOffset = 100;
	
	// axes
	var axisSize = 100;
	var space = 100;

	return {
		createParallelCoordinates: function (data, keys, range, nested_data, stringkeys) {
			
			// update size of the svg container relative to number of keys
			width = space * keys.length + padding + xOffset;
			
			// create the svg container
			var svg = d3.select("#vis-container")
				.append("svg")
				.attr("width", width)
				.attr("height", height)
				.style("background-color", "#DDDDDD");
			
			// group the plot, to be able to move it around
			var parallelcoordinates = svg.append("g")
				.attr("transform", "translate(" + xOffset + "," + padding + ")");
			
			// add an axis for every key
			for (var i = 0; i < keys.length; ++i) {
				var axis = parallelcoordinates.append("line")
					.attr("x1", i * space)
					.attr("y1", 0)
					.attr("x2", i * space)
					.attr("y2", axisSize)
					.attr("stroke-width", 2)
					.attr("stroke", "blue");
					
				var axisLabels = parallelcoordinates.append("text")
					.attr("x", i * space - (padding / 2))
					.attr("y", axisSize + padding*2)
					.text( function (d) { return keys[i]; })
					.attr("font-family", "sans-serif");
				
				var yscale = d3.scaleLinear().domain(range[keys[i]]).range([0, axisSize]);
				var yaxis = d3.axisLeft(yscale.nice());
				
				yaxis.ticks(4);
				
				var yaxisg = parallelcoordinates
					.append("g")
					.attr("transform", "translate(" + i * space + "," + 0 + ")")
					.call(yaxis);
			}
			
			// use closure to store iteration
			var loop = -1;
			// add a path for a line of data
			var line = d3.line()
			.x(function(d) {
				++loop;
				return loop * space;
			})
			.y(function(d) {
				if (isNaN(d)) {
					return 0;
				}
				var yscale = d3.scaleLinear().domain(range[keys[loop]]).range([0, axisSize]);
				//console.log(loop + " range: " + range[keys[loop]] + " mapped on: " + [0, axisSize] + " value: " + d + " scaled: " + yscale(d))
				return yscale(d);
			});
			
			// draw paths for all lines of data in different colors depending on their nesting
			var colormap = ["red", "green", "yellow", "orange", "violet", "cyan", "magenta", "blue"];
			var index = 0;
			for (var category = 0; category < nested_data.length; ++category) {
				var current_data = d3.values(nested_data[category])[1];
				for (var i = 0; i < current_data.length; ++i) {
					loop = -1; // reinititialize loop counter
					var lineGraph = parallelcoordinates.append("path")
						.attr("d", line(Object.values(data[index])))
						.attr("stroke", colormap[category % colormap.length])
						.attr("stroke-width", 2)
						.attr("fill", "none");
					++ index;
				}
			}
		}

	}
})();
