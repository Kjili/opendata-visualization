# opendata-visualization
Visualization for CERN Open Data using [D3](https://d3js.org/)

## Run Visualization

First, you need to clone or download the repository if you have not yet
done so, e.g.

```
git clone https://github.com/Kjili/opendata-visualization.git
```

To run the visualization, change directory to the project repository in
your command line and run a Python SimpleHTTPServer using the
following command for Python 3.x:

```
python -m http.server
```

or `python -m SimpleHTTPServer` if you're using Python 2.x (you can
check which version you are using by running `python --version`).
Warning: Python 2.x. is currently untested.

The visualization now runs on your local host and can be viewed in your
browser when going to
[http://localhost:8000/codpcv/example.html](http://localhost:8000/codpcv/example.html).
