$(function(){

	
    initSelect2();
	scrollToSection();
	
	
  
      var $section = $('body');
      var $panzoom = $section.find('.container-fluid').panzoom();
      $panzoom.parent().on('mousewheel.focal', function( e ) {
        e.preventDefault();
        var delta = e.delta || e.originalEvent.wheelDelta;
        var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
        $panzoom.panzoom('zoom', zoomOut, {
          increment: 0.1,
          animate: false,
          focal: e
        });
      });
      
      $section.find('.container-fluid').panzoom("pan", -200, -500, "zoom", 0.8);
        
      $("a.reset").on('click', function (){
      	$panzoom.panzoom("resetPan");
      	$panzoom.panzoom("resetZoom");
      });
	
});

function highlightText(string){
	
	var tokens = string.split(" ");
	
	for(i=0;i<tokens.length;i++){
		$("div:not(div.select2-result-label):contains('"+tokens[i]+"')").each(function()
		{
			if(tokens[i] != "a" && tokens[i] != "an" && tokens[i] != "to" && tokens[i] != "I" && tokens[i] != "the" && tokens[i] != "As" && tokens[i] != "event"){
			    var $el = $(this);			    
			    var regex = new RegExp(tokens[i],"g");		
			    $el.html( $el.html().replace(regex, "<span style=\"text-decoration: underline\">"+tokens[i]+"</span>") );
		   	}
		});
	}
}

function initSelect2(){
	var data = [
		{ id: 0, text: 'As a manager, I want to create an event'}, 
		{ id: 1, text: 'As a manager, I want to publish the line-up' }, 
		{ id: 2, text: 'As a manager, I want to change the event date' }, 
		{ id: 3, text: 'As a manager, I want to fix Legal stuff' }, 
		{ id: 4, text: 'As a manager, I want to indicate a price' }];
	
	$('#searchreqs').select2({
		placeholder: "Select a user story",
    	allowClear: true,
    	data: { results: data},
    	multiple: true
    }).on("select2-selecting", function(e) {
    	$("#selectedreqs").append("<li class="+e.choice.id+">"+e.choice.text+"</li>");
    	highlightText(e.choice.text);
    }).on("select2-removed", function(e) {
    	$("#selectedreqs li."+e.choice.id).remove();
   	});
}

function scrollToSection(){
	var section = window.location.hash;
	switch(section){
		case "#developer":
			$("html").scrollTo($("#implementation"), {duration: 500});
			console.log("dev");
			break;
		case "#architect":
			$(".content").scrollTo("#functional", 300);
			console.log("archi");
			break;
		case "#manager":
			$(".content").scrollTo("#requirements", 300);
			console.log("manager");
			break;
		default:
			break;
	}
	
}
