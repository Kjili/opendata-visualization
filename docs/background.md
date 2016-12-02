# Background Information

## Tables, Scatterplot Matrices and Parallel Coordinates

The basic visualization techniques considered for now are scatterplot matrices and parallel coordinates. First thing we need to know is, what these actually are, so here's a brief description:

<dl>
  <dt>Scatterplot Matrices</dt>
  <dd>A scatterplot is a standard 2D coordinate system with two variables, one for each axis. The values of these variables form the coordinates for simple, unconnected dots that make up the plot. Now, if we have more variables, we can't put them into one plot. However, we can put them into several plots, one for every possible combination of these variables. If we build a matrix out of these, we have a scatterplot matrix.</dd>
  <dt>Parallel Coordinates</dt>
  <dd>What if instead we wanted to put all the variables in one plot? We would need more axes to represent them. So we list these axes in parallel (because why not?) and mark the coordinates of the data values on the axes themselves. Then we connect those that belong to one row of data, so we store the information how these variables are connected by the data and we have parallel coordinates.</dd>
</dl>

![Transformation of Scatterplot to Parallel Coordinates](https://kjili.github.io/opendata-visualization/docs/img/scatterplot-parallelcoordinates.svg "Sketched Transformation of Scatterplot to Parallel Coordinates")

Next, we will need to find out how to create the visualization. We start with a quick sketch of what we have: data. This data is multivariate, meaning that there's more than one variable to which a data point is given, or - if we imagine tables because data usually comes in a shape that's somehow a table - multivariate means we have more than one column.
Usually there is also more than one data point per variable or more than one row in the table.
  
So that's our data, it's basically a table labeled with the variables (e.g. A, B, C and D) and filled with some values (e.g. x for an arbitrary value) like this little guy:

![Data Table](https://kjili.github.io/opendata-visualization/docs/img/table.svg "Sketched Data Table")

If instead of all these **x**'s we would draw lines, we would have parallel axes. Now all we need is coordinates on these axes and some connecting lines and we have: parallel coordinates.
So we take one row of **x**'s, map their data values onto their axis and connect them with a line. There we go:

![Parallel Coordinates](https://kjili.github.io/opendata-visualization/docs/img/parallelcoordinates.svg "Sketched Parallel Coordinates")

For the scatterplot matrix we start from scratch with the table from above. What's easiest to remember about scatterplot matrices is that the variable's identity (the plots with A over A, B over B etc.) form the diagonal of the matrix. And they are not really interesting, as their little scatter dots always form a diagonal. So for illustration we can order the variables not as a table head but as a matrix diagonal. Now, all we need to do to create our scatterplot matrix is copy the coordinate axes of all variables along the rows and colums they are on:

![Scatterplot Matrix](https://kjili.github.io/opendata-visualization/docs/img/scatterplotmatrix.svg "Sketched Scatterplot Matrix")

Each coordinate system will then be filled as a normal scatterplot of it's respective variables.
