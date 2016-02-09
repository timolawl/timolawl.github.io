---
---

// the YAML front matter ensures that the liquid tags are parsed.

//
// main JS file
//

// conditional loading of JS files:

// make array to keep all the js file extensions to load:

var scripts = [];

// if on mobile, load this: (not using agent sniffing because it's unreliable. best practice is to use css media query specific tags/classes specific to certain widths
//
// window.matchMedia is better because it has built in event listener for window resize. (it also matches the media to the media query of CSS.
if (document.documentElement.clientWidth < 900) {
    scripts.push("{{ '/js/vendor/fastclick.js' | prepend: site.baseurl }}");
}

// if at homepage, load these:
if (window.location.pathname === '/') {
    scripts.push("//cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-beta1/jquery.min.js");
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
