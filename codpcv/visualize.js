var corrvis = (function() {

	return {
		createFromCSV: function(csvfile) {

			d3.csv(csvfile, function(data) {
				
				// TODO check out nest for improved readout
				var keys = Object.keys(data[0]);
				
				var range = {};
				for (var i = 0; i < keys.length; ++i) {
					range[keys[i]] = d3.extent(data, function(d) {
						var values = +d[keys[i]];
						if (isNaN(values)) {
							return d[keys[i]];
						}
						return values;
					});
				}
				
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
				returnstring += "min(" +  keys[i] + "): " + range[keys[i]][0];
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
				returnstring += "max(" +  keys[i] + "): " + range[keys[i]][1];
				if (i < keys.length - 1) {
					returnstring += " | ";
				}
			}
			return returnstring;
		});
}
