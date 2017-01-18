import pandas as pd
import numpy as np

# read data
filename = "test"
data = pd.read_csv("~/projekte/opvis/testdata/" + filename + ".csv")

# filter out one-value data
for d in data:
	if data[d].min() == data[d].max():
		del data[d]

# filter out strings
types = data.dtypes
types = types[types == object]
string_data = data.copy()
for i in types.index:
	del data[i]

# get correlations
cm = data.corr()
#cm[cm.abs() > 0.4] # lots of NaNs

# get mean and standard deviation
m = data.mean() # return an array of means for each header
m = pd.DataFrame(m).T # transposes this array
sd = data.std() # return an array of standard deviations for each header
sd = pd.DataFrame(sd).T # transposes this array

# store all data to csv's for d3 to use it
string_data.to_csv("../testdata/gen/" + filename + "_strings.csv", index=False)
data.to_csv("../testdata/gen/" + filename + "_prep.csv", index=False)
cm.to_csv("../testdata/gen/" + filename + "_correlation.csv", index=False)
m.to_csv("../testdata/gen/" + filename + "_mean.csv", index=False)
sd.to_csv("../testdata/gen/" + filename + "_standard_deviation.csv", index=False)
