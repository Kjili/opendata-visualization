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
				
				showValues(data, range, [keys[4],keys[5]]);
				
			});
			
		}
	}

})();

// just for testing, really inefficient code
function showValues(data, range, keys) {
	
	if (keys == null) {
		return;
	}
	
	d3.select('#vis-container').selectAll('p')
		.data(data)
		.enter()
		.append('p')
		.text(function(d) {
			var returnstring = "";
			for (var i = 0; i < keys.length; ++i) {
				returnstring += keys[i] + ": " + d[keys[i]];
				if (i < keys.length - 1) {
					returnstring += " | ";
				}
			}
			return returnstring;
		});
		
	d3.select('#vis-container')
		.append('p')
		.text(function(d) {
			var returnstring = "";
			for (var i = 0; i < keys.length; ++i) {
				returnstring += "min(" +  keys[i] + "): " + range.min[keys[i]];
				if (i < keys.length - 1) {
					returnstring += " | ";
				}
			}
			return returnstring;
		});
	
	d3.select('#vis-container')
		.append('p')
		.text(function(d) {
			var returnstring = "";
			for (var i = 0; i < keys.length; ++i) {
				returnstring += "max(" +  keys[i] + "): " + range.max[keys[i]];
				if (i < keys.length - 1) {
					returnstring += " | ";
				}
			}
			return returnstring;
		});
}
