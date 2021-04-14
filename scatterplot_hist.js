/**
 * Welcome to the Looker Visualization Builder! Please refer to the following resources 
 * to help you write your visualization:
 *  - API Documentation - https://github.com/looker/custom_visualizations_v2/blob/master/docs/api_reference.md
 *  - Example Visualizations - https://github.com/looker/custom_visualizations_v2/tree/master/src/examples
 **/

 const visObject = {
  /**
   * Configuration options for your visualization. In Looker, these show up in the vis editor
   * panel but here, you can just manually set your default values in the code.
   **/
   options: {
     first_option: {
       type: "string",
       label: "My First Option",
       default: "Default Value"
     },
     second_option: {
       type: "number",
       label: "My Second Option",
       default: 42
     }
   },
  
  /**
   * The create function gets called when the visualization is mounted but before any
   * data is passed to it.
   **/
   create: function(element, config){
     element.innerHTML = "<div id='myDiv'></h1>";
   },
 
  /**
   * UpdateAsync is the function that gets called (potentially) multiple times. It receives
   * the data and should update the visualization with the new data.
   **/
   updateAsync: function(data, element, config, queryResponse, details, doneRendering){
     // set the dimensions and margins of the graph

		// loop through the data with the first dimension's label used as key to find all the x and y values
     var dataArray = []    
     data.forEach((d) => {
     dataArray.push(d[queryResponse.fields.dimensions[0].name].value)});
     var objectArray = [] 
     dataArray.forEach((line) => { objectArray.push(JSON.parse(line)) } );
    
     // assign the X and Y values to an array to parse through for the coordinates of the density graph
     var xAndY = []
     objectArray.forEach((obj) => { 
       var tempObj = {}; 
       tempObj['x'] = obj[0]; 
       tempObj['y'] = obj[1]; 
       xAndY.push(tempObj)
     });
     const x = []
     const y = []
     xAndY.forEach((coord) => {
      x.push(coord['x'])
      y.push(coord['y'])})
     
 
 var N = 2000,
   a = -1,
   b = 1.2;
 
 var step = (b - a) / (N - 1);
 var t = new Array(N)
 
 for(var i = 0; i < N; i++){
   t[i] = a + step * i;
 }

// pass X and Y into standard Plotly objects and API
 var trace1 = {
   x: x,
   y: y,
   mode: 'markers',
   name: 'points',
   marker: {
     color: 'rgb(102,0,0)',
     size: 2,
     opacity: 0.4
   },
   type: 'scatter'
 };
 var trace2 = {
   x: x,
   y: y,
   name: 'density',
   ncontours: 20,
   colorscale: 'Hot',
   reversescale: true,
   showscale: false,
   type: 'histogram2dcontour'
 };
 var trace3 = {
   x: x,
   name: 'x density',
   marker: {color: 'rgb(102,0,0)'},
   yaxis: 'y2',
   type: 'histogram'
 };
 var trace4 = {
   y: y,
   name: 'y density',
   marker: {color: 'rgb(102,0,0)'},
   xaxis: 'x2',
   type: 'histogram'
 };
 var data = [trace1, trace2, trace3, trace4];
 var layout = {
   showlegend: false,
   autosize: true,
   width: 600,
   height: 550,
   margin: {t: 50},
   hovermode: 'closest',
   bargap: 0,
   xaxis: {
     domain: [0, 0.85],
     showgrid: false,
     zeroline: true
   },
   yaxis: {
     domain: [0, 0.85],
     showgrid: false,
     zeroline: true
   },
   xaxis2: {
     domain: [0.85, 1],
     showgrid: false,
     zeroline: true
   },
   yaxis2: {
     domain: [0.85, 1],
     showgrid: false,
     zeroline: true
   }
 };
 Plotly.newPlot('myDiv', data, layout);
 
     doneRendering()
   }
 };
 
 looker.plugins.visualizations.add(visObject);
 