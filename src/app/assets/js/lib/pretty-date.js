/*
 * JavaScript Pretty Date
 * Modified 2013 by Alfred Xing (alfredxing.com)
 * Copyright (c) 2011 John Resig (ejohn.org)
 * Licensed under the MIT and GPL licenses.
 */

function prettyDate(time){
  var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
	diff = (((new Date()).getTime() - date.getTime()) / 1000),
	day_diff = Math.floor(diff / 86400),
	out = "Some time ago";

	switch(true) {
		case diff < 60:
			out = "Just now";
		break;
		case diff < 120:
			out = "1 minute ago";
		break;
		case diff < 3600:
			out = Math.floor( diff / 60 ) + " minutes ago";
		break;
		case diff < 7200:
			out = "1 hour ago";
		break;
		case diff < 86400:
			out = Math.floor( diff / 3600 ) + " hours ago";
		break;
		case day_diff == 1:
			out = "Yesterday";
		break;
		case day_diff < 7:
			if (day_diff === 1) {
				out = day_diff + " day ago";
			} else {
				out = day_diff + " days ago";
			}
		break;
		case day_diff < 31:
			out = Math.ceil( day_diff / 7 );
			if (out === 1) {
				out += " week ago";
			} else {
		 		out += " weeks ago";
			}
		break;
		case day_diff < 366:
			out = Math.floor( day_diff / 30 );
			if (out === 1) {
				out += " month ago";
			} else {
				out += " months ago";
			}
		break;
		case day_diff > 365:
			out = Math.floor( day_diff / 365 );
			if (out === 1) {
				out += " year ago";
			} else {
				out += " years ago";
			}
		break;
	};

	return out;

}

if ( typeof jQuery != "undefined" ) {
	jQuery.fn.prettyDate = function(){
		return this.each(function(){
			var date = prettyDate(this.text);
			if ( date ) { jQuery(this).text( date ); }
		});
	};
}
