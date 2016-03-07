var CA = {
	pz: null,
	containerX: 0,
	containerY: 0,
	colorIndex: 0,
	stopWords: ['As','a','I','want','the','an','to'],
	construct: function(){
		CA.initSelect2();
		CA.scrollToSection();
		CA.FAMsubModuleTrigger();
		CA.dragWindows();

		$("#FAMproductScope").toggle();
		$("#functional h3").toggle();
		$("#techcont").toggle();
		$("#technical h3").toggle();
	//	CA.showLine($("#FAMmodule4"), $("#contractmodule"));
	//	CA.showLine($("#FAMmodule5"), $("#paymentmodule"));

		$( "#drawlinebutton" ).click(function() {
			var div1 = document.getElementById('FAMmodule3');
		    var div2 = document.getElementById('contractmodule');
			var div3 = document.getElementById('FAMmodule5');
		    var div4 = document.getElementById('legalmodule');
		  	connect(div3, div4, "#000", 5);
		    connect(div1, div2, "#000", 5);
	   });

		function connect(div1, div2, color, thickness) {
		    var off1 = getOffset(div1);
		    var off2 = getOffset(div2);
		    // bottom right
		    var x1 = off1.left + off1.width;
		    var y1 = off1.top + off1.height;
		    // top right
		    var x2 = off2.left + off2.width;
		    var y2 = off2.top;
		    // distance
		    var length = Math.sqrt(((x2-x1) * (x2-x1)) + ((y2-y1) * (y2-y1)));
		    // center
		    var cx = ((x1 + x2) / 2) - (length / 2);
		    var cy = ((y1 + y2) / 2) - (thickness / 2);
		    // angle
		    var angle = Math.atan2((y1-y2),(x1-x2))*(180/Math.PI);
		    // make hr
		    var htmlLine = "<div style='padding:0px; margin:0px; height:" + thickness + "px; background-color:" + color + "; line-height:1px; position:absolute; left:" + cx + "px; top:" + cy + "px; width:" + length + "px; -moz-transform:rotate(" + angle + "deg); -webkit-transform:rotate(" + angle + "deg); -o-transform:rotate(" + angle + "deg); -ms-transform:rotate(" + angle + "deg); transform:rotate(" + angle + "deg);' />";
		    //
		    alert(htmlLine);
		    document.body.innerHTML += htmlLine; 
		}

		function getOffset( el ) {
		    var rect = el.getBoundingClientRect();
		    return {
		        left: rect.left + window.pageXOffset,
		        top: rect.top + window.pageYOffset,
		        width: rect.width || el.offsetWidth,
		        height: rect.height || el.offsetHeight
		    };
		}


		$(".panel-body a").on('click', function(e){
			e.preventDefault();
			if($(this).data('name') == "fam"){
				$("#FAMproductScope").toggle();
				$("#functional h3").toggle();
			}else if($(this).data('name') == "classdiagram"){
				$("#techcont").toggle();
				$("#technical h3").toggle();
				CA.showLines();
			}
			$(this).find("img").toggleClass("active");
		})
	},
<<<<<<< HEAD
	showLine: function(elem1, elem2){
		var f = elem1;
=======
	/*showLine: function(elem1, elem2){
		var f = elem1.offset();
>>>>>>> f95e4c0f3777d4228f50c6048e69e1f7bfdfda1e
		var fw = elem1.width();
		var t = elem2;
		var fx = parseInt(f.css("left").replace('px','')) + fw;
		var fy = parseInt(f.css("top").replace('px',''));
		var tx = parseInt(t.css("left").replace('px',''));
		var ty = parseInt(t.css("top").replace('px',''));
		var a = Math.abs(fy - ty);
		var b = Math.abs(fx - tx);
		var c = CA.pythagoras(a, b);
		var hoek = CA.degrees(Math.asin(a/c));
		if(ty-fy < 0){
			hoek = hoek * -1;
		}
		console.log(fx, fy, tx, ty, a, b, c, hoek);
		$("body").after("<span class=\"connectionline\" style=\"border: 2px dashed #333; position: absolute; width: "+ c +"px; top: "+ (fy) +"px; left: "+ fx +"px; transform-origin: 0% 0%; transform: rotate("+hoek+"deg);\"></span>");
	},*/
	degrees: function(radians){
		return radians * (180 / Math.PI);
	},
	pythagoras: function(a, b){
		return Math.sqrt(a * a + b * b);
	},
	dragWindows: function(){
		var currentDraggedElement;
		$(".draggable").draggable({
			start: function(e){
			    currentDraggedElement = e.target;
			    $(currentDraggedElement).addClass("dragging");
			},
			stop: function(e){
			    $(currentDraggedElement).removeClass("dragging");
			},
			helper: "clone",
		    revert: "invalid"
		}).droppable();

		$(".draggable").on("dropover", function(e) {
		    $(this).addClass("highlight");
		});
		$(".draggable").on("dropout", function (e){
		    $(this).removeClass("highlight");
		});
		$(".draggable").on("drop", function (e){
		    CA.swapElements($(this)[0], currentDraggedElement);
				$(this).removeClass("highlight");
				$(currentDraggedElement).removeClass("dragging");
		    currentDraggedElement = null;
		});
	},
	swapElements: function(elm1, elm2) {
	    var parent1, next1,
	        parent2, next2;

	    parent1 = elm1.parentNode;
	    next1   = elm1.nextSibling;
	    parent2 = elm2.parentNode;
	    next2   = elm2.nextSibling;

	    parent1.insertBefore(elm2, next1);
	    parent2.insertBefore(elm1, next2);
	},
	highlightText: function(string, id){
		var tokens = string.split(" ");
		var colors = ['red','blue','green','orange'];

		for(i=0;i<tokens.length;i++){
			if(this.stopWords.indexOf(tokens[i]) == -1){
				//Specify the elements in which it is allowed to replace the html/text.
				$('#functional, .selectedcontainer, #technical, #implementation').each(function()
				{
					var $el = $(this);
					var regex = new RegExp(tokens[i],"g");
					$el.html( $el.html().replace(regex, "<span style=\"text-decoration: underline\" data-id=\""+ id +"\">"+tokens[i]+"</span>") );
					var regex = new RegExp(tokens[i].capitalizeFirstLetter(),"g");
					$el.html( $el.html().replace(regex, "<span style=\"text-decoration: underline\" data-id=\""+ id +"\">"+tokens[i].capitalizeFirstLetter() +"</span>") );
					console.log(colors[CA.colorIndex]);
					$("[data-id="+ id +"]").css({ "color": colors[CA.colorIndex] });

				});
			}
		}
		CA.colorIndex++;
	},
	initSelect2: function(){
		var data = [
			{ id: 0, text: 'As a manager, I want to create an event'},
			{ id: 1, text: 'As a manager, I want to publish the line-up' },
			{ id: 2, text: 'As a manager, I want to change the event date' },
			{ id: 3, text: 'As a manager, I want to fix Legal stuff' },
			{ id: 4, text: 'As a manager, I want to indicate a price' }
			];


			$("#epics").select2();
			$('#select2-requirements-database').select2({
				placeholder: "Select a user story",
				allowClear: true,
				data: { results: data},
				multiple: true
			}).on("select2-selecting", function(e) {
				console.log(CA.pz.panzoom('instance'));
				$("#selectedreqs").append("<li class="+e.choice.id+">"+e.choice.text+"</li>");
				CA.highlightText(e.choice.text, e.choice.id);
			}).on("select2-removed", function(e) {
				$("#selectedreqs li."+e.choice.id).remove();
				$("[data-id="+e.choice.id+ "]").contents().unwrap();
			});
	},
	scrollToSection: function(){
		var section = window.location.hash;
		console.log(section);
		if(section.startsWith("#developer")){
			$("html").scrollTo($("#implementation"), {duration: 500});
		}else if(section.startsWith("#architect")){
				$(".content").scrollTo("#functional", 300);
		}else if(section.startsWith("#manager")){
				$(".content").scrollTo("#requirements", 300);
		}else{
			console.log("hash klopt niet");
		}
	},
	FAMsubModuleTrigger: function() {

			$( "#FAMmodule3" ).click(function() {
				$(".connectionline").remove();
				$("#line3").show();
				$("#line4").show();
				$("#FAMproductScope").animate({ 'zoom': 0.7 }, 400, function(){
					setTimeout(function(){
						CA.showLine($("#FAMmodule4"), $("#contractmodule"));
						CA.showLine($("#FAMmodule5"), $("#paymentmodule"));
					}, 500);
				});
				$("#contractManagementCanvas").show('fast').promise().done(function () {
					$( "#FAMmodule1Submodule" ).show('fast');
					$( "#FAMmodule1Submodule" ).animate({
						zoom: 2.0,
						"top": "300px",
					}, 400 );

				});

			});

			$( "#FAMmodule1Submodule .close" ).click(function() {
				$( "#FAMmodule1Submodule" ).hide('fast');
				$("#contractManagementCanvas").hide('fast');
				$("#line3").hide();
				$("#line4").hide();
				$("#FAMproductScope").animate({ 'zoom': 1.0 }, 400);
			});

			$( "#FAMmodule2" ).click(function() {
				$("#line1").show();
				$("#line2").show();
				$("#FAMproductScope").animate({ 'zoom': 0.7 }, 400);
				$("#ticketSalesCanvas").show('fast').promise().done(function () {
					$( "#FAMmodule2Submodule" ).show('fast');
					$( "#FAMmodule2Submodule" ).animate({
						zoom: 1.5,
						"top": "400px",
					}, 400 );

				});

			});

			$( "#FAMmodule2Submodule .close" ).click(function() {
				$( "#FAMmodule2Submodule" ).hide('fast');
				$("#ticketSalesCanvas").hide('fast');
				$("#line1").hide();
				$("#line2").hide();
				$("#FAMproductScope").animate({ 'zoom': 1.0 }, 400);
			});
	}
};

$(function(){
	CA.construct();

	String.prototype.capitalizeFirstLetter = function() {
		return this.charAt(0).toUpperCase() + this.slice(1);
	}
});
