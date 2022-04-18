

let School = [
    {
        'id': 0,
        'title':'<b> Portland, Oregon </b> &#x1F332',
        'lat': '45.523064',
        'lon': '-122.676483',
        'image': '<img src= images/Portland.png width="200px">',
        'description': "Where I was able to watch UCLA Men's Basketball @ March Madness with the UCLA Marching Band"


    },
    {
        'id': 1,
        'title':'<b> Washington D.C. </b> &#x1F3DB',
        'lat': '38.89511',
        'lon': '-77.03637',
        'image': '<img src= images/WashingtonDC.png width="200px">',
        'description':"Where I was able to lobby with my U.S. House Represenative in support of Renewable Energy + visit many museums",
    }
]

let Home = [
    {

        'id': 2,
        'title':' <b>Holtville, CA </b>&#x1F955;',
        'lat': '32.811161',
        'lon': '-115.380264',
        'image':'<img src= images/Holtville.png width="200px">',
        'description':"Home <3 The small town I call my homebase + the formerly known carrot capital of the world"
        
    }
    ,
    {

        'id': 3,
        'title':' <b>Westwood, LA </b>&#128059;',
        'lat': '34.056111',
        'lon': '-118.42972',
        'image':'<img src= images/Westwood.png width="200px">',
        'description':"Home away from Home, or now after 4 years, my 2nd Home <3. The city that has welcomed me since the day I began attending UCLA."
        
    }

]

let Fun=[
    {
        'id': 4,
        'title':'<b> Ensenada, BC</b> &#9728;&#65039;',
        'lat': '31.865858',
        'lon': '-116.607681',
        'image': '<img src= images/Ensenada.png width="200px">',
        'description':"Summer Family Vacation <3 + lots of water slides, wave pools, and ziplining",
    },
    {
        'id': 5,
        'title':'<b> Sacramento, CA </b> &#128188;',
        'lat': '38.575764',
        'lon': '-121.478851',
        'image':'<img src= images/Sacramento.png width="200px">',
        'description':"Visited during summer vacation and got to tour state capitol + visited family nearby",
    },
    {
        'id': 6,
        'title':'<b> Santa Barbara, CA </b> &#x1F30A;',
        'lat': '34.420830',
        'lon': '-119.698189',
        'image':'<img src= images/SantaBarbara.png width="200px">',
        'description':"My best friend's home away from home! where I was able to visit Isla Vista & tour UCSB + where the beach is only a 5 minute walk away"
    }
]
// make loop for homes , places visited, school trips 
// make layer for each
// maybe add picture 

//capital L reference 

//zoom level

let map = L.map('map').setView([0,0], 3);

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }).addTo(map);

/// loop through data
// before looping the data, create an empty FeatureGroup
let myMarkers = L.featureGroup();
let SchoolMarkers = L.featureGroup();
let FunMarkers = L.featureGroup();
let HomeMarkers = L.featureGroup();

var HomeIcon = L.icon ({
    iconUrl:'images/house.png',
    iconSize: [40, 40]
})

var FunIcon = L.icon ({
    iconUrl:'images/Fun.png',
    iconSize: [40, 40]
})

var SchoolIcon = L.icon ({
    iconUrl:'images/School.png',
    iconSize: [40, 40]
})

// loop through data

School.forEach(function(item){
	// create marker
	let marker = L.marker([item.lat,item.lon], {
    title: item.title,
    //icon: SchoolIcon
    })
    .bindPopup(`<h3><b>${item.title}</b></h3>${item.image}<br>${item.description}`)

	// add marker to featuregroup
	myMarkers.addLayer(marker)
    SchoolMarkers.addLayer(marker)

	// add data to sidebar with onclick event
	$('.sidebar').append(`<div class="sidebar-item" onclick="flyToIndex(${item.id})">${item.title}</div>`)
})

Fun.forEach(function(item){
	// create marker
	let marker = L.marker([item.lat,item.lon], {
    title: item.title,
    //icon: FunIcon
    })
    .bindPopup(`<h3><b>${item.title}</b></h3>${item.image}<br>${item.description}`)

	// add marker to featuregroup
	myMarkers.addLayer(marker)
    FunMarkers.addLayer(marker)

	// add data to sidebar with onclick event
	$('.sidebar').append(`<div class="sidebar-item" onclick="flyToIndex(${item.id})">${item.title}</div>`)
})


Home.forEach(function(item){
	// create marker
	let marker = L.marker([item.lat,item.lon], {
    title: item.title,
   // icon: HomeIcon
    })
    .bindPopup(`<h3><b>${item.title}</b></h3>${item.image}<br>${item.description}`)

	// add marker to featuregroup
	myMarkers.addLayer(marker)
    HomeMarkers.addLayer(marker)

	// add data to sidebar with onclick event
	$('.sidebar').append(`<div class="sidebar-item" onclick="flyToIndexHome(${Home},${item.id})">${item.title}</div>`)
})



// after loop, add the FeatureGroup to map
myMarkers.addTo(map)
SchoolMarkers.addTo(map)
FunMarkers.addTo(map)
HomeMarkers.addTo(map)

// define layers
let layers = {
	"My Markers": myMarkers,
    "School" : SchoolMarkers,
    "Fun":FunMarkers,
    "Home": HomeMarkers
}

// add layer control box
L.control.layers(null,layers).addTo(map)

// make the map zoom to the extent of markers
map.fitBounds(myMarkers.getBounds());

// function to fly to a location by a given id number

function flyToIndex(data,index){
	map.flyTo([data[index].lat,data[index].lon],12)
}


