// Global variables
let map;
let lat = 0;
let lon = 0;
let zl = 3;

// path to csv data
let path = "data/BTSTours.csv";

let markers = L.featureGroup();

//initalize
$( document ).ready(function() {
    createMap(lat,lon,zl);
	readCSV(path);
});



// create the map
function createMap(lat,lon,zl){
	map = L.map('map').setView([lat,lon], zl);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
}



// function to read csv data
function readCSV(path){
	Papa.parse(path, {
		header: true,
		download: true,
		complete: function(data) {
			console.log(data);
			
			// map the data
			mapCSV(data);

		}
	});
}

function mapCSV(data){

	// circle options
	let circleOptions = {
		radius: 6,
		weight: 0.5,
		color: 'white',
		fillColor: 'red',
		fillOpacity: 0.4
	}

	
	// loop through each entry
	data.data.forEach(function(item,index){
		if(item.latitude != undefined){
			// create marker
			let marker = L.circleMarker([item.latitude,item.longitude],circleOptions)
			.on('mouseover',function(){
				this.bindPopup(`${item.ZipCode}<br>${item.AverageCost}</br>`).openPopup()
			})
			$('.sidebar').append(`<div class="sidebar-item" onmouseover="panTo(${index})"> ${item.ZipCode}</div>`)
			// add marker to featuregroup
			markers.addLayer(marker)
		}
	})

	// add featuregroup to map
	markers.addTo(map)
	map.fitBounds(markers.getBounds())
}

function panTo(index){
	map.setZoom(14);
	map.panTo(markers.getLayers()[index]._latlng);
}