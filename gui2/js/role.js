var role = {
	construct: function(){
		role.collapse();
		role.addToUrl();
	},

	collapse: function(){
		$( ".developer, .architect, .manager" ).click(function() {
			 $("#" +  $(this).attr("class") + "box").toggle();
		});
	},

	addToUrl: function(){

		$('#submit_developer').click(function(){

		    var counter = 0, // counter for checked checkboxes
		        i = 0,       // loop variable
		        url = 'index.html#developer',    // final url string
		        // get a collection of objects with the specified 'input' TAGNAME
		        input_obj = document.getElementsByName('viewpoint1');
		    // loop through all collected objects
		    for (i = 0; i < input_obj.length; i++) {
		        // if input object is checkbox and checkbox is checked then ...
		        if (input_obj[i].type === 'checkbox' && input_obj[i].checked === true) {
		            // ... increase counter and concatenate checkbox value to the url string
		            counter++;
		            url = url + '&vp=' + input_obj[i].value;
		        }
		    }
		    // display url string or message if there is no checked checkboxes
		    if (counter > 0) {
		        // remove first "&" from the generated url string

		        // display final url string
		        window.location = url;
		        // or you can send checkbox values
		        // window.location.href = 'my_page.php?' + url;
		    } else {

		    	window.location = 'index.html#developer';

		    }
		});

		$('#submit_architect').click(function(){

		    var counter = 0, // counter for checked checkboxes
		        i = 0,       // loop variable
		        url = 'index.html#architect',    // final url string
		        // get a collection of objects with the specified 'input' TAGNAME
		        input_obj = document.getElementsByName('viewpoint2');
		    // loop through all collected objects
		    for (i = 0; i < input_obj.length; i++) {
		        // if input object is checkbox and checkbox is checked then ...
		        if (input_obj[i].type === 'checkbox' && input_obj[i].checked === true) {
		            // ... increase counter and concatenate checkbox value to the url string
		            counter++;
		            url = url + '&vp=' + input_obj[i].value;
		        }
		    }
		    // display url string or message if there is no checked checkboxes
		    if (counter > 0) {
		        // remove first "&" from the generated url string

		        // display final url string
		        window.location = url;
		        // or you can send checkbox values
		        // window.location.href = 'my_page.php?' + url;
		    } else {

		    	window.location = 'index.html#architect';

		    }

		});

		$('#submit_manager').click(function(){

		    var counter = 0, // counter for checked checkboxes
		        i = 0,       // loop variable
		        url = 'index.html#manager',    // final url string
		        // get a collection of objects with the specified 'input' TAGNAME
		        input_obj = document.getElementsByName('viewpoint3');
		    // loop through all collected objects
		    for (i = 0; i < input_obj.length; i++) {
		        // if input object is checkbox and checkbox is checked then ...
		        if (input_obj[i].type === 'checkbox' && input_obj[i].checked === true) {
		            // ... increase counter and concatenate checkbox value to the url string
		            counter++;
		            url = url + '&vp=' + input_obj[i].value;
		        }
		    }
		    // display url string or message if there is no checked checkboxes
		    if (counter > 0) {
		        // remove first "&" from the generated url string

		        // display final url string
		        window.location = url;
		        // or you can send checkbox values
		        // window.location.href = 'my_page.php?' + url;
		    } else {

		    	window.location = 'index.html#manager';

		    }

		});

	}

};



$(function(){
	role.construct();
});
