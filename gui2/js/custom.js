var CA = {
	panzoom: null,
	containerX: 0,
	containerY: 0,
	stopWords: ['As','a','I','want','the','an','to'],
	construct: function(){
		CA.panZoom();
		CA.initSelect2();
		CA.scrollToSection();
		CA.initCanvas();
		CA.contractManagement();
		CA.initResetPanZoomHandler();
		CA.initTextboxFocusHandler();
	},
	panZoom: function(x,y){
		x = typeof x !== 'undefined' ? x : this.containerX;
		y = typeof y !== 'undefined' ? y : this.containerY;

		var $section = $('body');
		$panzoom = $section.find('.container-fluid').panzoom();
		
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
		this.panzoom = $panzoom;
	},
	resetPanZoom: function(){	
		CA.panzoom.panzoom("pan", this.containerX, this.containerY);  
	},
	initResetPanZoomHandler: function(){
		$(document).bind('keypress', function(event) {	
			if( event.which === 82 && event.shiftKey && $(document.activeElement).prop("tagName") == "BODY") {			
				CA.resetPanZoom();
			}
		});
	},
	highlightText: function(string){
		var tokens = string.split(" ");
		
		for(i=0;i<tokens.length;i++){
			//if(tokens[i] != "a" && tokens[i] != "an" && tokens[i] != "to" && tokens[i] != "I" && tokens[i] != "the" && tokens[i] != "As"){
			if(this.stopWords.indexOf(tokens[i]) == -1){
				//Specify the elements in which it is allowed to replace the html/text.
				$('#functional, .selectedcontainer, #technical, #implementation').each(function()
				{
					var $el = $(this);	
					var regex = new RegExp(tokens[i],"g");		
					$el.html( $el.html().replace(regex, "<span style=\"text-decoration: underline\">"+tokens[i]+"</span>") );
					var regex = new RegExp(tokens[i].capitalizeFirstLetter(),"g");	
					$el.html( $el.html().replace(regex, "<span style=\"text-decoration: underline\">"+tokens[i].capitalizeFirstLetter() +"</span>") );
				});
			}
		}
	},
	initSelect2: function(){
		var data = [
			{ id: 0, text: 'As a manager, I want to create an event'}, 
			{ id: 1, text: 'As a manager, I want to publish the line-up' }, 
			{ id: 2, text: 'As a manager, I want to change the event date' }, 
			{ id: 3, text: 'As a manager, I want to fix Legal stuff' },
			{ id: 4, text: 'As a manager, I want to indicate a price' }
			];
		
		$('#searchreqs').select2({
			placeholder: "Select a user story",
			allowClear: true,
			data: { results: data},
			multiple: true
		}).on("select2-selecting", function(e) {
			$("#selectedreqs").append("<li class="+e.choice.id+">"+e.choice.text+"</li>");
			CA.highlightText(e.choice.text);
		}).on("select2-removed", function(e) {
			$("#selectedreqs li."+e.choice.id).remove();
		});
	},

	scrollToSection: function(){
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
		
	},
	contractManagement: function() {
		
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
	},
	initCanvas: function(){
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
	},
	initTextboxFocusHandler: function(){
		$('input,textbox,select').on('click', function(e){
			CA.panzoom.panzoom("destroy");
			$(this).focus();
		}).on('blur', function(e){
			var position = $('.container-fluid').position();
			CA.panZoom(position.left, position.top);		
		});
	}
};

$(function(){
	CA.construct();
	
	String.prototype.capitalizeFirstLetter = function() {
		return this.charAt(0).toUpperCase() + this.slice(1);
	}		
});
