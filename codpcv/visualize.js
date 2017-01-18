var corrvis = (function() {

	return {
		run: function(path, rootcsv) {

			// file names according to the pandas naming scheme and the root data file name
			var data_csvfile = path + "/gen/" + rootcsv + "_prep.csv";
			var string_csvfile = path + "/gen/" + rootcsv + "_strings.csv";

			// load files
			var test = d3.queue()
				.defer(d3.csv, data_csvfile)
				.defer(d3.csv, string_csvfile)
				.await(runData);

			function runData(error, data, stringdata) {
				if(error) {
					console.err(error);
				}

				// process data
				var keys = Object.keys(data[0]);
				var stringkeys = Object.keys(stringdata[0]);
				for (var i = 0; i < stringkeys.length; ++i) { // only keep keys that have columns containing strings
					if (keys.includes(stringkeys[i])) {
						stringkeys.splice(i, 1);
						--i;
					}
				}

				var range = {};
				for (var i = 0; i < keys.length; ++i) {
					range[keys[i]] = d3.extent(data, function(d) {
						var values = +d[keys[i]];
						if (isNaN(values)) {
							console.log("WARNING: Found non-numerical values, processing them as string. They will not appear in the visualization.")
							return d[keys[i]];
						}
						return values;
					});
				}

				// nest data by string value for coloring
				var nested_data = d3.nest()
					.key(function(d) { return d[stringkeys[0]]; })
					.entries(stringdata);
				//console.log(JSON.stringify(nested_data, null, " "))
				
				// call visualizations
				scatterplotmatrix.createScatterplotMatrix(data, keys, range, nested_data);
				parallelcoordinates.createParallelCoordinates(data, keys, range, nested_data);
				
				showValues(data, range, keys);
			}
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
