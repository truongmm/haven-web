var map;
var API_BASE_URL = "http://haven-api.herokuapp.com/api/"

function renderInfo(map, graphicsLayer, data, addClickEvent) {
  require([
    "esri/graphic",
    "esri/symbols/PictureMarkerSymbol",
    "esri/geometry/Point"
  ],
  function(Graphic, PictureMarkerSymbol, Point) {
    // Coordinates for marker
    var point = new Point({
      "latitude": parseFloat(data.lat),
      "longitude": parseFloat(data.long)
    });

    // Initialize marker
    var marker = new PictureMarkerSymbol({
      "height": 36,
      "url": "http://www2.psd100.com/ppp/2013/11/0501/Map-marker-icon-1105213652.png",
      "width": 36
    });

    var graphic = new Graphic(point, marker);
    graphicsLayer.add(graphic);

    map.infoWindow.setTitle(data.name);

    if (addClickEvent) {
      $("#alert .disaster").on("click", function(){
        map.infoWindow.show(point);
        map.centerAndZoom(point, 13)
      });
    }
  });
}

function addMarker(map, graphicsLayer, markerType){
  $.ajax({
    "crossOrigin": true,
    "dataType": "json",
    "url": API_BASE_URL + markerType,
    "success": function(data) {
      data = data[markerType][0];
      var addClickEvent = markerType == "disasters";
      renderInfo(map, graphicsLayer, data, addClickEvent);
    }
  });
}

function initialize(){
  require([
    "esri/Color",
    "esri/layers/GraphicsLayer",
    "esri/dijit/InfoWindow",
    "esri/map",
    "esri/dijit/Popup",
    "esri/symbols/SimpleFillSymbol",
    "dojo/dom-construct",
    "dojo/domReady!"
    ], function(Color, GraphicsLayer, InfoWindow, Map, Popup, SimpleFillSymbol, domConstruct) {

    // Initialize info window
    var fill = new SimpleFillSymbol("solid", null, new Color("#A4CE67"));
    var infoWindow = new Popup({
        fillSymbol: fill
    }, domConstruct.create("div"));

    // Map is centered on the city of San Francisco
    map = new Map("map", {
      basemap: "topo",
      center: [-122.45, 37.75], // longitude, latitude
      infoWindow: infoWindow,
      zoom: 12
    });

    // Initialize graphics layer
    var graphicsLayer = new GraphicsLayer();
    map.addLayer(graphicsLayer);

    // Add markers to map
    addMarker(map, graphicsLayer, "disasters");
    addMarker(map, graphicsLayer, "shelters");
  });
}

$(document).ready(initialize);