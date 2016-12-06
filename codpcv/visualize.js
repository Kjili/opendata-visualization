var corrvis = (function() {

	var getRange = function(data, keys) {
		
		var min = {};
		var max = {};
		for (var i = 0; i < data.length; ++i) {
			min[keys[i]] = Number.POSITIVE_INFINITY;
			max[keys[i]] = Number.NEGATIVE_INFINITY;
		}
		console.log(min);
		
		for (var i = 0; i < data.length; ++i) {
			for (v in data[i]) {
				min[v] = Math.min(min[v], data[i][v]);
				max[v] = Math.max(max[v], data[i][v]);
			}
		}
		
		return {min: min, max: max};
	};

	return {
		createFromCSV: function(csvfile) {

			d3.csv(csvfile, function(data) {
				
				// TODO check out nest for improved readout
				var keys = Object.keys(data[0]);
				
				var range = getRange(data, keys);
				
				scatterplotmatrix.createScatterplotMatrix(data, keys, range);
				
				// just for testing, really inefficient code
				d3.select('#vis-container').selectAll('p')
					.data(data)
					.enter()
					.append('p')
					.text(function(d) {
						return "x : " + d.px1 + " | y: " + d.py1;
					});
					
				d3.select('#vis-container')
					.append('p')
					.text(function(d) {
						return "min(x) : " + range.min["px1"] + " | min(y): " + range.min["py1"];
					});
				
				d3.select('#vis-container')
					.append('p')
					.text(function(d) {
						return "max(x) : " + range.max["px1"] + " | max(y): " + range.max["py1"];
					});
			});
			
		}
	}

})();
