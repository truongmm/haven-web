var map;

function renderDisasterInfo(map, point) {
  map.infoWindow.setTitle("TCDisrupt SF Fire");
  map.infoWindow.setContent("HELPPP");

  $("#alert .disaster").on("click", function(){
    map.infoWindow.show(point);
  });
}

function addDisasterMarker(map, graphicsLayer){
  require([
    "esri/graphic",
    "esri/symbols/PictureMarkerSymbol",
    "esri/geometry/Point"
  ],
  function(Graphic, PictureMarkerSymbol, Point) {
    // Disaster is SF Public Library: Potrero Branch
    var disasterPoint = new Point({
      "latitude": 37.7605734,
      "longitude": -122.3937939
    });

    // Initialize disaster marker
    var disasterMarker = new PictureMarkerSymbol({
      "height": 36,
      "url": "http://www2.psd100.com/ppp/2013/11/0501/Map-marker-icon-1105213652.png",
      "width": 36
    });
    var disasterGraphic = new Graphic(disasterPoint, disasterMarker);

    graphicsLayer.add(disasterGraphic);
    renderDisasterInfo(map, disasterPoint);
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

    // Add disaster marker to map
    addDisasterMarker(map, graphicsLayer);
  });
}

$(document).ready(initialize);