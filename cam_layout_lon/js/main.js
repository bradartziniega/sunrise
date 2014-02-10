$(document).ready(function() {
	
  initializeGrid();

	var cur_item = 0;
  var output_object = [];

});

function initializeGrid(){

  $.getJSON( "http://localhost/~bsimpson/sunrise/cam_layout_lon/cam_to_use.json", function( data ) {
    var sort_array = [];

    $.each( data, function( key, val ) {
      sort_array.push({key:key,lon:val['data']['lon'],to_use:val['to_use']})
    });

    sort_array.sort(function(x,y){return x.lon - y.lon})

    for( var i=0;i<sort_array.length;i++){
      console.log(data[sort_array[i].key]);
    }

  });


}
