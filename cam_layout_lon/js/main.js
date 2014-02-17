$(document).ready(function() {
	

	var cur_item = 0;
  var output_object = [];
  
  initializeGrid();


});

$(window).scroll(function() {
  var left = window.pageXOffset || document.documentElement.scrollLeft
  if((left-$('.container').width()+$(window).width())==0){
    //$(window).scrollLeft(0);
  }

  //
  $('#map-canvas').css({'margin-left':left});
  $('#map-canvas').css({'margin-right':left/-1});

});


function initializeGrid(){

  $.getJSON( "http://localhost/~bsimpson/sunrise/cam_layout_lon/cam_to_use.json", function( data ) {
  //$.getJSON( "cam_to_use.json", function( data ) {
  
    var sort_array = [];

    $.each( data, function( key, val ) {
      if(val['to_use']=='good'){
        sort_array.push({key:key,lon:val['data']['lon'],to_use:val['to_use']})
      }
    });

    sort_array.sort(function(x,y){return x.lon - y.lon})
    
    var numCams = 0;
    var lonSum = 100;
    //3 is good
    var lonDiff = 3;
    for( var i=1;i<sort_array.length;i++){

      if(i>0){
        
        var diff = Math.abs(data[sort_array[i].key]['data']['lon'] - data[sort_array[i-1].key]['data']['lon']);
        lonSum+=diff;

        if(lonSum>=lonDiff){
          lonSum=0;
          
          $('.container').append($('<div>').load(data[sort_array[i].key]['data']['htmlfile']));
          $('.name_container').append($('<div class="cam_name">').html(data[sort_array[i].key]['data']['lat'] + ', ' + data[sort_array[i].key]['data']['lon']));
          numCams++;

        } 
      }  
    }

    $('.container').css({ width: numCams*960});
    $('.name_container').css({ width: numCams*960});

  });



}


function initialize() {

  var mapOptions = {
    center: new google.maps.LatLng(-34.397, 150.644),
    zoom: 8
  };

  var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);


    var hotels = [
        ['ibis Birmingham Airport', 52.452656, -1.730548, 4],
        ['ETAP Birmingham Airport', 52.452527, -1.731644, 3],
        ['ibis Birmingham City Centre', 52.475162, -1.897208, 2]
        ];

     for (var i = 0; i < hotels.length; i++) {
         var marker = new google.maps.Marker({
             position: new google.maps.LatLng(hotels[i][1], hotels[i][2]),
             map: map,
           //  icon: image,
             title: hotels[i][0],
             zIndex: hotels[i][3]
         });
         console.log(hotels[i][0]);
     }

}

