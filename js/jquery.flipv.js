/* =========================================================
// jquery.flipv.js
// Author: OpenStudio (Arnault PACHOT)
// Mail: apachot@openstudio.fr
// Web: http://www.openstudio.fr
// Copyright (c) 2008 OpenStudio http://www.openstudio.fr
========================================================= */


(function($) {

$.fn.flipv = function(angle) {
	
	this.each(function(){
        if (angle == null) {
            var classes = $(this).attr('class').split(' ');
            for (i=0; i<=classes.length; i++) {
                if (/^\d+-degrees$/.test(classes[i])) {
                    angle = parseInt(classes[i]);
                }
            }
            if (angle == null)
                angle = 90;
        }
        angle = angle % 360;
        angle *= Math.PI/180;
        var angle2 = Math.PI/2 - Math.abs(Math.PI/2 - angle);
        
		var htmlsav = $(this).html();
		var textsav = $(this).text();
		var fontsizesav = '13';
		if ($(this).css('font-size') != '') {
			fontsizesav = parseInt($(this).css('font-size'));
		}
        var h = $(this).height();
        var w = textsav.length*fontsizesav*0.60;
		//var heightsav = h*2;
        var heightsav = Math.cos(angle2)*w + Math.sin(angle)*h + h
        //alert("width is "+heightsav);
		var widthsav = w;
        widthsav += Math.tan(Math.PI/2 - angle2) * h;
        widthsav *= Math.sin(angle);
        //alert("height is "+widthsav);
		
		var colorsav = '#000000';
		if ($(this).css('color'))
			colorsav = $(this).css('color');
			
		if ($.browser.msie) {
			$(this).css('font-size', fontsizesav).css('width', heightsav+'px').css('height', widthsav+'px').css('font-family', 'Verdana').css('writing-mode', 'tb-rl').css('font-weight', 'normal');
		} else {
			var my_id = "canvas"+parseInt(Math.random()*1000);
			$(this).empty().append("<canvas id='"+my_id+"' width='"+heightsav+"' height='"+widthsav+"'>"+htmlsav+"</canvas>");
			vertical_text(textsav, fontsizesav, colorsav, my_id, angle, w, h, heightsav, widthsav);
		}
		
	});
	return $(this);
};
})(jQuery);

function vertical_text(mytext, fontsize, colorsav, my_id, angle, txt_width, txt_height, can_width, can_height){
    var angle2 = Math.PI/2 - Math.abs(Math.PI/2 - angle);
 
	var canvas = document.getElementById(my_id);
	if (canvas.getContext){
		var context = canvas.getContext('2d');
		set_textRenderContext(context);
		if(check_textRenderContext(context)) {
            //context.strokeRect(0,0,txt_width,txt_height);
            if (angle <= Math.PI/2) {
                context.translate(Math.sin(angle) * txt_height, 0);
            } else {
                context.translate(Math.cos(angle2) * txt_width, 0);
            }
			context.rotate(angle);
			if (angle > Math.PI/2)
                context.translate(0,-txt_height);
			context.strokeStyle = colorsav;
			context.strokeText(mytext, 0,                      0,                      fontsize-2); //   0 deg
			//context.strokeText(mytext, 4 + txt_height/2,         4 - txt_height,           fontsize-2); //  45 deg
			//context.strokeText(mytext, 0,                      0 - fontsize*3/2, fontsize-2);       //  90 deg
            //context.strokeText(mytext, 0 - (can_width) * Math.PI/6, 0 - fontsize*2*Math.PI, fontsize-2); // 135 deg
            //context.strokeText(mytext, 0 - can_width + txt_height, 0 - fontsize*3/2, fontsize-2);       // 180 deg
            //context.strokeRect(0,0,txt_width,txt_height);
		}
	}
}

$(document).ready(function(){
	$('.flipv').flipv();
});


