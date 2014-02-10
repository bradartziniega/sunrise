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
});


function initializeGrid(){

  $.getJSON( "http://localhost/~bsimpson/sunrise/cam_layout_lon/cam_to_use.json", function( data ) {
    
    var sort_array = [];

    $.each( data, function( key, val ) {
      if(val['to_use']=='good'){
        sort_array.push({key:key,lon:val['data']['lon'],to_use:val['to_use']})
      }
    });

    sort_array.sort(function(x,y){return x.lon - y.lon})
    
    var numCams = 0;
    var lonSum = 100;
    for( var i=1;i<sort_array.length;i++){

      if(i>0){
        
        var diff = Math.abs(data[sort_array[i].key]['data']['lon'] - data[sort_array[i-1].key]['data']['lon']);
        lonSum+=diff;

        if(lonSum>=3){
          console.log(lonSum);
          lonSum=0;
          
          $('.container').append($('<div>').load(data[sort_array[i].key]['data']['htmlfile']));
          $('.name_container').append($('<div class="cam_name">').html(data[sort_array[i].key]['data']['htmlfile']));

          console.log(data[sort_array[i].key]['data']['htmlfile']);
          numCams++;

        } 
      }  
    }

    $('.container').css({ width: numCams*960});
    $('.name_container').css({ width: numCams*960});

  });



}
