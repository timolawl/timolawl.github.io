---
---
// the YAML front matter ensures that the liquid tags are parsed.

//
// main JS file
//

if(window.location.pathname === '/' && !window.location.hash) {
    document.querySelector('html').classList.toggle('is-invisible');
}


// conditional loading of JS files (async):

// make array to keep all the js file extensions to load:

var hasTouch = 'ontouchstart' in window;

if(!hasTouch) {
    var root = document.documentElement;
    root.classList.add('no-touch');
}

var scripts = [];

// if on mobile, load this: (not using agent sniffing because it's unreliable. best practice is to use css media query specific tags/classes specific to certain widths
//
// window.matchMedia is better because it has built in event listener for window resize. (it also matches the media to the media query of CSS.
if (document.documentElement.clientWidth < 900) {
    scripts.push("//cdnjs.cloudflare.com/ajax/libs/fastclick/1.0.6/fastclick.min.js");
}

// if at homepage, load these:
if (window.location.pathname === '/') {
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
        } /* else {
            loadEverythingElse();
        } */
    };
}
/*
function loadEverythingElse() {
    // if mobile
    if (document.documentElement.clientWidth < 900) {
        if ('addEventListener' in document) {
            document.addEventListener('DOMContentLoaded', function() {
                FastClick.attach(document.body);
            }, false);
        }
    }

    document.getElementById('hamburger-wrapper').onclick = function() {
        this.classList.toggle('open');
        var openclose = this.classList.contains('open') ? 'Close' : 'Open';
        this.setAttribute("title", openclose + ' Menu');
    };

    // if at homepage:

    if(window.location.pathname === '/') {
        $(function() {
            $('.time-since-commit').loadTimeSince();
            $('#lastCommitMessage').loadLastCommitMessage();
        });
    }

}
*/

if(scripts.length) {
    loadScripts(scripts);
}
