/* eslint-disable camelcase */
/* eslint-disable func-names */
/* eslint-disable no-inline-comments */
const domReady = require('domready');
import './stylesheets/main.css';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiZXJobGFuZ28iLCJhIjoiY2s3OThuZHYxMGlmejNkbXk4djNhZTdjdiJ9._774XdciUdaC6RN-6vQmSA';

domReady(() => {
  map();
});

function map() {
  var zoomThreshold = 5;
  var color_ls = ['#1A9850','#66BD63','#A6D96A','#D9EF8B','#FEE08B','#FDAE61','#F46D43','#D73027'];
  var cutoff_vals = [0, 0.9, 0.95, 1, 1.05, 1.1, 1.25, 2, 1000];
  var bounds = new mapboxgl.LngLatBounds([-127, 22.5], [-65, 51])

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [-98, 38.88],
    minZoom: 3,
    zoom: 3,
    maxBounds: bounds // Sets bounds as max
    });

    map.addControl(new mapboxgl.NavigationControl());

    map.on('load', function() {
      map.addSource('r10_to_90_2', {
      'type': 'vector',
      'url': 'mapbox://erhlango.cad2m3uh'
      });

      map.addSource('r10_to_90', {
        'type': 'vector',
        'url': 'mapbox://erhlango.6h6vbi6e'
        });

      map.addLayer(
        {
        'id': 'states-layer',
        'source': 'r10_to_90_2',
        'source-layer': 'states-61tqdo',
        'maxzoom': zoomThreshold,
        'type': 'fill',
        'paint': {
        'fill-color': [
        'interpolate',
        ['linear'],
        ['get', 'r10_to_90_2'],
        cutoff_vals[0],
        color_ls[0],
        cutoff_vals[1],
        color_ls[1],
        cutoff_vals[2],
        color_ls[2],
        cutoff_vals[3],
        color_ls[3],
        cutoff_vals[4],
        color_ls[4],
        cutoff_vals[5],
        color_ls[5],
        cutoff_vals[6],
        color_ls[6],
        cutoff_vals[7],
        color_ls[7]
        ],
        'fill-opacity': 0.75
        }
        });
      map.addLayer(
        {
        'id': 'counties-layer',
        'source': 'r10_to_90',
        'source-layer': 'counties-9eb6pv',
        'minzoom': zoomThreshold,
        'type': 'fill',
        'paint': {
        'fill-color': [
        'interpolate',
        ['linear'],
        ['get', 'r10_to_90'],
        cutoff_vals[0],
        color_ls[0],
        cutoff_vals[1],
        color_ls[1],
        cutoff_vals[2],
        color_ls[2],
        cutoff_vals[3],
        color_ls[3],
        cutoff_vals[4],
        color_ls[4],
        cutoff_vals[5],
        color_ls[5],
        cutoff_vals[6],
        color_ls[6],
        cutoff_vals[7],
        color_ls[7]
        ],
        'fill-opacity': 0.75
        }
        });

        var popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false
          });        

        map.on('mousemove', 'counties-layer', function(e) { // show county info on hover over
          map.getCanvas().style.cursor = 'pointer';
          popup
          .setLngLat(e.lngLat)
          .setHTML(e.features[0].properties.labels)
          .addTo(map);
        });

        map.on('mouseleave', 'counties-layer', function() {
          map.getCanvas().style.cursor = '';
          popup.remove();
          });


        map.on('click', 'states-layer', function(e) { // zoom to state on click
          map.flyTo({
            center: e.lngLat,
            zoom: 6
          })
          });

        map.on('click', 'counties-layer', function(e) { // link to county on click
          const html_url = e.features[0].properties.html_url
          if(html_url){
            window.open(html_url, '_blank')
          }
        });
        
        map.on('mouseenter', 'states-layer', function() {
        map.getCanvas().style.cursor = 'pointer';
        });
          
        map.on('mouseleave', 'states-layer', function() {
        map.getCanvas().style.cursor = '';
        });

        map.on('mouseenter', 'counties-layer', function() {
        map.getCanvas().style.cursor = 'pointer';
        });
          
        map.on('mouseleave', 'counties-layer', function() {
        map.getCanvas().style.cursor = '';
        });

        for (let i = 0; i < color_ls.length; i++) {
          const layer = cutoff_vals[i] + " to " + cutoff_vals[i+1];
          const color = color_ls[i];
          const item = document.createElement('div');
          const key = document.createElement('span');
          key.className = 'legend-key';
          key.style.backgroundColor = color;
        
          const value = document.createElement('span');
          value.innerHTML = layer;
          item.appendChild(key);
          item.appendChild(value);
          legend.appendChild(item);
        }
    });
}



