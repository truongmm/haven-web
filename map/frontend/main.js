var map, view;

function addShelterMarker(graphicsLayer){
  require([
    "esri/Graphic",
    "esri/symbols/PictureMarkerSymbol",
    "esri/geometry/Point",
    "esri/widgets/PopupTemplate"
  ],
  function(Graphic, PictureMarkerSymbol, Point, PopupTemplate) {
    // Shelter is SF Public Library: Potrero Branch
    var shelterPoint = new Point({
      "latitude": 37.7605734,
      "longitude": -122.3937939
    });

    var shelterInfo = new PopupTemplate({
      "title": "Shelter"
    });

    var shelterMarker = new PictureMarkerSymbol({
      "height": 48,
      "url": "http://www2.psd100.com/ppp/2013/11/0501/Map-marker-icon-1105213652.png",
      "width": 48
    });

    var shelterGraphic = new Graphic({
      "geometry": shelterPoint,
      "popupTemplate": shelterInfo,
      "symbol": shelterMarker
    });

    graphicsLayer.add(shelterGraphic);
  });
}

function initialize(){
  require([
    "esri/layers/GraphicsLayer",
    "esri/Map",
    "esri/views/MapView",
    "dojo/domReady!"
  ],
  function(GraphicsLayer, Map, MapView) {
    map = new Map({
      basemap: "topo"
    });

    // View is centered on the city of San Francisco
    view = new MapView({
      center: [-122.45, 37.75], //lat, long
      container: "viewDiv",
      map: map,
      zoom: 12
    });

    // Initialize graphics layer
    var graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);

    // Add shelter marker to map
    addShelterMarker(graphicsLayer);
  });
}

$(document).ready(initialize);