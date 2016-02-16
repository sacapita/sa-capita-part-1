$(function(){
	
	//Global variables
	$panzoom = null;
	
	//Functions
    initSelect2();
	scrollToSection();
	panZoom();
	contractManagement();
	
	//Handlers
	initResetPanZoomHandler();
	
	$('input').on('click', function(e){
		$panzoom.panzoom("destroy");
		$(this).focus();
	}).on('blur', function(e){
		var position = $('.container-fluid').position();
		panZoom(position.left, position.top);		
	});
	
	//Canvas
	var canvas = document.getElementById("myCanvas");
	var canvasContext = canvas.getContext('2d');

	canvasContext.beginPath();
	canvasContext.strokeStyle = '#000';
	canvasContext.moveTo(-90, -100);
	canvasContext.lineTo(80, 120);
	canvasContext.stroke();

	canvasContext.beginPath();
	canvasContext.moveTo(200, 0);
	canvasContext.strokeStyle = '#000';
	canvasContext.lineTo(410, 120);
	canvasContext.stroke();

});

function getCanvasCoords(x,y){

    var matrix = $panzoom.panzoom("getMatrix");
        
    var calc_x = x * (1 / matrix[0]);
    var calc_y = y * (1 / matrix[3]);

    return {x:calc_x,y:calc_y};   
}

function initResetPanZoomHandler(){
	$(document).bind('keypress', function(event) {	
		if( event.which === 82 && event.shiftKey && $(document.activeElement).prop("tagName") == "BODY") {			
			resetPanZoom();
		}
	});
}

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

function resetPanZoom(){	
	$panzoom.panzoom("reset");	  
}

function panZoom(x,y){
	x = typeof x !== 'undefined' ? x : 0;
	y = typeof y !== 'undefined' ? y : 280;

	var $section = $('body');
    $panzoom = $section.find('.container-fluid').panzoom();
	
	$elem = $("#requirements");
	$elem.panzoom("disable");
	
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
	
	

	$panzoom.panzoom("pan", x, y);
	$panzoom.panzoom("zoom", 1.0);
	
}

function contractManagement() {
	
		$( "#FAMmodule3" ).click(function() {
			$("#FAMproductScope").animate({ 'zoom': 0.7 }, 400);
			$("#myCanvas").show('fast').promise().done(function () {
				$( "#FAMmodule1Submodule" ).show('fast');
				$( "#FAMmodule1Submodule" ).animate({
					zoom: 2.0,
					"top": "300px",
				}, 400 );

			});

		});

		$( "#FAMmodule1Submodule .close" ).click(function() {
			$( "#FAMmodule1Submodule" ).hide('fast');
			$("#myCanvas").hide('fast');
			$("#FAMproductScope").animate({ 'zoom': 1.0 }, 400);
		});
}
