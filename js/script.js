---
---

// the YAML front matter ensures that the liquid tags are parsed.

//
// main JS file
//

// hamburger behavior:
// non-jQuery method adopted from: codepen.io/CreativeJuiz/pen/oCBxz
// who also adopted it from http://toddmotto.com/labs/reusable-js/
/*
var theToggle = document.getElementById('hamburger-wrapper');

// based on Todd Motto functions
// http://toddmotto.com/labs/reusable-js/

// hasClass
function hasClass(elem, className) {
	return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
}
// addClass
function addClass(elem, className) {
    if (!hasClass(elem, className)) {
    	elem.className += ' ' + className;
    }
}
// removeClass
function removeClass(elem, className) {
	var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ') + ' ';
	if (hasClass(elem, className)) {
        while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
            newClass = newClass.replace(' ' + className + ' ', ' ');
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
}
// toggleClass
function toggleClass(elem, className) {
	var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, " " ) + ' ';
    if (hasClass(elem, className)) {
        while (newClass.indexOf(" " + className + " ") >= 0 ) {
            newClass = newClass.replace( " " + className + " " , " " );
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    } else {
        elem.className += ' ' + className;
    }
}

theToggle.onclick = function() {
   toggleClass(this, 'on');
   return false;
}
*/

// conditional loading of JS files:

// make array to keep all the js file extensions to load:

// I give up...load jQuery always.
var scripts = ["//cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-beta1/jquery.min.js"];

// if on mobile, load this: (not using agent sniffing because it's unreliable. best practice is to use css media query specific tags/classes specific to certain widths
//
// window.matchMedia is better because it has built in event listener for window resize. (it also matches the media to the media query of CSS.
if (document.documentElement.clientWidth < 900) {
    scripts.push("{{ '/js/vendor/fastclick.js' | prepend: site.baseurl }}");
}

// if at homepage, load these:
if (window.location.pathname === '/') {
    scripts.push("{{ '/js/vendor/date.js' | prepend: site.baseurl }}");
    scripts.push("{{ '/js/git-message.js' | prepend: site.baseurl }}");
}

function loadScripts(scripts) {
    var script = scripts.shift();
    var el = document.createElement('script');
    el.src = script;
    el.async = false;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(el, s);
// inserting the element before the starting script does not matter because the .onload event will still wait for the current script to execute before processing another.
    el.onload = function(script) {
    //    console.log(script + ' loaded!');
        if (scripts.length) {
            loadScripts(scripts);
        } else {
            loadEverythingElse();
        }
    };
}

function loadEverythingElse() {
    // if mobile
    if (document.documentElement.clientWidth < 900) {
        if ('addEventListener' in document) {
            document.addEventListener('DOMContentLoaded', function() {
                FastClick.attach(document.body);
            }, false);
        }
    }

    $('.hamburger-wrapper').on('click', function () {
        $(this).toggleClass('open');
        var openclose = $(this).hasClass('open') ? 'Close' : 'Open';
        $(this).attr("title", openclose + ' Menu');
    });

    // if at homepage:
    if (window.location.pathname === '/') {
        $(function() {
            $('.time-since-commit').loadTimeSince();
        });

        $(function() {
            $('#lastCommitMessage').loadLastCommitMessage();
        });
    }
}

if(scripts.length) {
    loadScripts(scripts);
}
