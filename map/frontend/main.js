var map, view;

function initialize(){
  require([
    "esri/Map",
    "esri/views/SceneView",
    "dojo/domReady!"
  ],
  function(Map, SceneView) {
    map = new Map({
      basemap: "topo"
    });


    // Centered on the city of San Francisco
    view = new SceneView({
      center: [-122.45, 37.75],
      container: "viewDiv",
      map: map,
      zoom: 12
    });
  });

}

$(document).ready(initialize);