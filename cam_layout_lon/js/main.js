var map;

$(document).ready(function() {
	

	var cur_item = 0;
  var output_object = [];
  
  var mapOptions = {
    center: new google.maps.LatLng(-34.397, 150.644),
    zoom: 8
  };

  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

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
    var cameras_added = [];

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
          cameras_added.push({lon:data[sort_array[i].key]['data']['lat'],lat:data[sort_array[i].key]['data']['lon']});
          numCams++;

        } 
      }  
    }

    $('.container').css({ width: numCams*960});
    $('.name_container').css({ width: numCams*960});

    for (var i=0;i<cameras_added.length;i++){
        var marker = new google.maps.Marker({
             position: new google.maps.LatLng(cameras_added[i]['lon'],cameras_added[i]['lat']),
             map: map,
             zIndex: i+1
         });
         console.log(cameras_added[i]['lat']);


    }

  });



}


function initialize() {

 
}

