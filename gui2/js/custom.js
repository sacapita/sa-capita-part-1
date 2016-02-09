$(function(){

	
    initSelect2();
	scrollToSection();
});

function highlightText(string){
	
	var tokens = string.split(" ");
	
	for(i=0;i<tokens.length;i++){
		$("div:contains('"+tokens[i]+"'):not(.select2-result-label)").each(function()
		{
			if(tokens[i] != "a" && tokens[i] != "an" && tokens[i] != "to" && tokens[i] != "I" && tokens[i] != "the" && tokens[i] != "As"){
			    var $el = $(this);			    
			    var regex = new RegExp(tokens[i],"g");		
			    $el.html( $el.html().replace(regex, "<span style=\"text-decoration: underline\">"+tokens[i]+"</span>") );
		   	}
		});
	}
	
	return true;
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
