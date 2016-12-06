var scatterplotmatrix = (function() {

	// svg container
	var width = 400;
	var height = 400;

	// subcharts
	var scatterplotwidth = 200;
	var scatterplotheight = 200;

	// dots
	var radius = 5;

	return {
		createScatterplotMatrix: function (data, keys, range) {
			
			//TODO separate css instead of attributes to clean up the code
			var svg = d3.select("#vis-container")
				.append("svg")
				.attr("width", width)
				.attr("height", height)
				.style("background-color", "green");
			
			var scatterplot = svg.append("g")
				.attr("transform", "translate(50,50)");
			
			// just for testing, this is not needed
			var scatterplotrect = scatterplot.append("rect")
				.attr("width", scatterplotwidth)
				.attr("height", scatterplotheight)
				.attr("x", 0)
				.attr("y", 0)
				.style("fill", "blue");
			
			var xscale = d3.scaleLinear().domain([range.min["px1"], range.max["px1"]]).range([0, scatterplotwidth]);;
			var yscale = d3.scaleLinear().domain([range.min["py1"], range.max["py1"]]).range([scatterplotheight, 0]);
			
			var xaxis = d3.axisBottom(xscale);
			
			var yaxis = d3.axisLeft(yscale);
			
			var circles = scatterplot.selectAll("circle")
				.data(data)
				.enter()
				.append("circle")
				.attr("cx", function(d) {
					return xscale(d.px1);
				})
				.attr("cy", function(d) {
					return yscale(d.py1);
				})
				.attr("r", radius)
				.attr("fill", "red");
			
			var xaxisg = scatterplot
				.append("g")
				.attr("transform", "translate(0," + scatterplotheight + ")")
				.call(xaxis);
				
			var yaxisg = scatterplot
				.append("g")
				.attr("transform", "translate(0,0)")
				.call(yaxis);
			
		}
	}

})();
