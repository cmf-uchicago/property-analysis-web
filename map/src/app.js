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
  var color_ls = ['#D73027', '#F46D43', '#FDAE61', '#FEE08B', '#D9EF8B', '#A6D96A', '#66BD63', '#1A9850'];
  var cutoff_r95_vals = [0, 0.5, 0.75, 0.85, 0.95, 1, 1.05, 1.1, Infinity];
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
      map.addSource('weighted_mean', {
      'type': 'vector',
      'url': 'mapbox://erhlango.cad2m3uh'
      });

      map.addSource('r95_to_r5', {
        'type': 'vector',
        'url': 'mapbox://erhlango.6h6vbi6e'
        });

      map.addLayer(
        {
        'id': 'states-layer',
        'source': 'weighted_mean',
        'source-layer': 'states-61tqdo',
        'maxzoom': zoomThreshold,
        'type': 'fill',
        'paint': {
        'fill-color': [
        'interpolate',
        ['linear'],
        ['get', 'weighted_mean'],
        cutoff_r95_vals[0],
        color_ls[0],
        cutoff_r95_vals[1],
        color_ls[1],
        cutoff_r95_vals[2],
        color_ls[2],
        cutoff_r95_vals[3],
        color_ls[3],
        cutoff_r95_vals[4],
        color_ls[4],
        cutoff_r95_vals[5],
        color_ls[5],
        cutoff_r95_vals[6],
        color_ls[6],
        cutoff_r95_vals[7],
        color_ls[7]
        ],
        'fill-opacity': 0.75
        }
        });
      map.addLayer(
        {
        'id': 'counties-layer',
        'source': 'r95_to_r5',
        'source-layer': 'counties-9eb6pv',
        'minzoom': zoomThreshold,
        'type': 'fill',
        'paint': {
        'fill-color': [
        'interpolate',
        ['linear'],
        ['get', 'r95_to_r5'],
        cutoff_r95_vals[0],
        color_ls[0],
        cutoff_r95_vals[1],
        color_ls[1],
        cutoff_r95_vals[2],
        color_ls[2],
        cutoff_r95_vals[3],
        color_ls[3],
        cutoff_r95_vals[4],
        color_ls[4],
        cutoff_r95_vals[5],
        color_ls[5],
        cutoff_r95_vals[6],
        color_ls[6],
        cutoff_r95_vals[7],
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
          const layer = cutoff_r95_vals[i] + " to " + cutoff_r95_vals[i+1];
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



