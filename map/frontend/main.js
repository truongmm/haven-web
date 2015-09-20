var map;
var API_BASE_URL = "http://haven-api.herokuapp.com/api/"

function renderInfo(map, graphicsLayer, data, markerType) {
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

    var markerIcons = {
      "disasters": "map/frontend/images/map_marker_disaster.png",
      "shelters": "map/frontend/images/map_marker_shelter.png"
    }

    // Initialize marker
    var marker = new PictureMarkerSymbol({
      "height": 36,
      "url": markerIcons[markerType],
      "width": 36
    });

    var graphic = new Graphic(point, marker);
    graphicsLayer.add(graphic);

    if (markerType == "disasters") {
      map.infoWindow.setContent(formatContent(data));
      map.centerAt(point);

      $(".alert .disaster").on("click", function(){
        map.infoWindow.show(point);
      });
      $("#graphicsLayer1_layer").on("click", function(){
        if (map.infoWindow.isShowing) {
          map.infoWindow.hide();
        }
        else {
          map.infoWindow.show(point);
        }
      });

    }
  });
}

function formatContent(data){
  return "<div class='content'>" + 
    "<div class='info'>" +
      "<div class='title'>" + data.name + "</div>" +
      "<div class='desc'>Building Fire</div>" +
      "<div class='count'><img src='map/frontend/images/person_gray.png' /><div class='count-info'>" + data.totalCheckIns + " Checked In</div></div>" +
      "<div class='count'><img src='map/frontend/images/side_medical.png' /><div class='count-info'>" + data.totalInjured + " Injured</div></div>" +
      "<div style='clear: both;'></div><div class='user'>Kathy Nguyen</div>" +
    "</div>" +
    "<div class='image'>" +
      "<img class='thumbnail' src='http://www.imagesource.com/Doc/IS0/Media/TR5/e/2/b/a/IS099ZP7C.jpg' />" +
      "<div class='actions'>" +
        "<img class='share' src='map/frontend/images/share_red.png' />" +
        "<img class='volunteer' src='map/frontend/images/volunteer_red.png' />" +
        "<div class='share button'>Share</div><div class='button'>Volunteer</div>"
      "</div>" +
    "</div>" +
  "</div>";
}

function addMarker(map, graphicsLayer, markerType){
  $.ajax({
    "crossOrigin": true,
    "dataType": "json",
    "url": API_BASE_URL + markerType,
    "success": function(data) {
      data = data[markerType][0];
      renderInfo(map, graphicsLayer, data, markerType);
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
        "fillSymbol": fill
    }, domConstruct.create("div"));

    // Map is centered on the city of San Francisco
    map = new Map("map", {
      basemap: "topo",
      center: [-122.409031,37.7621001],
      infoWindow: infoWindow,
      zoom: 13
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