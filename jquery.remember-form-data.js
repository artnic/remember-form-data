 /*
 * Remember form data; This uses jquery.deserialize.js found at https://github.com/kflorence/jquery-deserialize and included here
 * @author Rafael Cintra - http://artnic.io
 * @website https://github.com/artnic/jquery-remember-form-data/
 * Licensed under the MIT License
 */

(function ( $ ) {

	var cookies = {
	    get: function (sKey) {
	        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
	    },
	    set: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
	        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
	        var sExpires = "";
	        if (vEnd) {
	            switch (vEnd.constructor) {
	                case Number:
	                    sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
	                    break;
	                case String:
	                    sExpires = "; expires=" + vEnd;
	                    break;
	                case Date:
	                    sExpires = "; expires=" + vEnd.toUTCString();
	                    break;
	            }
	        }
	        document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
	        return true;
	    },
	    remove: function (sKey, sPath, sDomain) {
	        if (!sKey || !this.hasItem(sKey)) { return false; }
	        document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
	        return true;
	    },
	    hasItem: function (sKey) {
	        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
	    },
	    keys: /* optional method: you can safely remove it! */ function () {
	        var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
	        for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
	        return aKeys;
	    }
	};

    $.fn.rememberdata = function( options ) {
        var settings = $.extend({
            name: "datatoremember",
        }, options );

        cdata = cookies.get(settings.name);
        if(cdata) {
        	$(this).deserialize(cdata);
        }

        var workingform = $(this);

        $(this).find(':input').each(function(index, el) {
        	$(this).on('change', el, function(event) {
        		cookies.set(settings.name, workingform.serialize());
        	});
        });

        return this;
    };
}( jQuery ));