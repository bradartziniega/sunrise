$(document).ready(function() {
	

	var cur_item = 0;
  var output_object = [];
  
  initializeGrid();

 

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
          console.log(data[sort_array[i].key]['data']['htmlfile']);
          numCams++;
        } 
      }  
    }

    $('.container').css({ width: numCams*960});

  });



}
