var parallelcoordinates = (function() {
	
	// svg container, width is updated later!
	var width = 500;
	var height = 200;
	
	//plot
	var padding = 10;
	
	// axes
	var axisSize = 100;
	var space = 100;

	return {
		createParallelCoordinates: function (data, keys, range) {
			
			// update size of the svg container relative to number of keys
			width = space * keys.length + 2*padding;
			
			// create the svg container
			var svg = d3.select("#vis-container")
				.append("svg")
				.attr("width", width)
				.attr("height", height)
				.style("background-color", "#DDDDDD");
			
			// group the plot, to be able to move it around
			var parallelcoordinates = svg.append("g")
				.attr("transform", "translate(" + padding + "," + padding + ")");
			
			// add an axis for every key
			for (var i = 0; i < keys.length; ++i) {
				var axis = parallelcoordinates.append("line")
					.attr("x1", i * space)
					.attr("y1", 0)
					.attr("x2", i * space)
					.attr("y2", axisSize)
					.attr("stroke-width", 2)
					.attr("stroke", "blue");
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
				console.log(loop + " range: " + range[keys[loop]] + " mapped on: " + [0, axisSize] + " value: " + d + " scaled: " + yscale(d))
				return yscale(d);
			});
			
			// draw paths for all lines of data
			for (var i = 0; i < data.length; ++i) {
				
				loop = -1; // reinititialize loop counter
				var lineGraph = parallelcoordinates.append("path")
					.attr("d", line(Object.values(data[i])))
					.attr("stroke", "blue")
					.attr("stroke-width", 2)
					.attr("fill", "none");
					
			}
		}

	}
})();
