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
				
				var keys = Object.keys(data[0]);
				
				var range = getRange(data, keys);
				
				//now visualize this
			});
			
		}
	}

})();
