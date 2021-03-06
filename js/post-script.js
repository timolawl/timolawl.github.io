/* Window.onload to ensure the async scripts are loaded, since they are dependencies */

// Logo transition
//
//
var logo = document.getElementById('site__logo');
var nav = document.getElementById('nav-wrapper');
var main = document.querySelector('main');
var footer = document.querySelector('footer');
var hamburger = document.getElementById('hamburger-wrapper');

// Need a function to check the status of the logo to apply the appropriate transitions
// Don't need this function outside of homepage.
if (window.location.pathname === '/') {

    if (!window.location.hash) {
        logo.classList.toggle('is-preloading');
        logo.classList.toggle('site__logo--hero');

    //    logo.className = "site__logo site__logo--hero logo--status";
     //   logo.classList.toggle('site__logo');
  //      logo.classList.toggle('site__logo--hero');
    }

    // Initial setup
    if (logo.classList.contains('site__logo--hero')) {
        //set up the appropriate initial background styling
        nav.classList.toggle('is-hidden');
        main.classList.toggle('is-hidden');
        footer.classList.toggle('is-hidden');
        hamburger.classList.toggle('is-hidden');
    }

    // Click handling
    logo.onclick = clickHideUnhide;

}

logo.setAttribute('href', '/#home');

function clickHideUnhide () {
        // Actual behavior
        if (logo.classList.contains('site__logo--hero')) {

            nav.classList.remove('is-fadedout');
            main.classList.remove('is-fadedout');
            footer.classList.remove('is-fadedout');
            hamburger.classList.remove('is-fadedout');

            nav.classList.toggle('is-fadedin');
            main.classList.toggle('is-fadedin');
            footer.classList.toggle('is-fadedin');
            hamburger.classList.toggle('is-fadedin');

            nav.classList.remove('is-hidden');
            main.classList.remove('is-hidden');
            footer.classList.remove('is-hidden');
            hamburger.classList.remove('is-hidden');
        }
        else {
            nav.classList.remove('is-fadedin');
            main.classList.remove('is-fadedin');
            footer.classList.remove('is-fadedin');
            hamburger.classList.remove('is-fadedin');

            nav.classList.toggle('is-fadedout');
            main.classList.toggle('is-fadedout');
            footer.classList.toggle('is-fadedout');
            hamburger.classList.toggle('is-fadedout');

            // No adding of is-hidden because it hides the elements immediately.
        }
        logo.classList.toggle('site__logo--hero');
}

window.onload = function () {
    // Segment for ensuring there's no content flashes or transitions on homepage.
    if ((window.location.pathname === '/') && !window.location.hash) {
        document.querySelector('html').classList.toggle('is-invisible');
        logo.classList.toggle('is-preloading');
        // Add additional animation to bring the logo into view.

    }

    /* FastClick Snippet for mobile */
    if (document.documentElement.clientWidth < 900) {
        if ('addEventListener' in document) {
            document.addEventListener('DOMContentLoaded', function() {
                FastClick.attach(document.body);
            }, false);
        }
    }

    /* Hamburger Menu Snippet */
    document.getElementById('hamburger-wrapper').onclick = function() {
        this.classList.toggle('open');
        var openclose = this.classList.contains('open') ? 'Close' : 'Open';
        this.setAttribute("title", openclose + ' Menu');
    };

    // now that the git script is used for the last update time, this goes in every page:
    startCommitMsgRequest();

    /* Git Message Snippet if at homepage */
  //  {% if page.title == 'Home' %}
    if (window.location.pathname === '/') {
        // startCommitMsgRequest();
    }
    else if (window.location.pathname === '/note/') {

    /* Caching Note into local storage */
  //  {% elsif page.title == 'Note' %}

        !function(d){
            var n = d.getElementById('notepad__content');
            var k = 'c';
            if (localStorage[k] === undefined) {
                localStorage[k] = "Replace me! This is a text editor utilizing local storage. Anything typed here will be saved in the browser's local storage, which persists through browser sessions. I made this section in order that I may eventually use my site as a work space in addition to being a portfolio site for others to view.";
            }
            n.innerHTML = localStorage[k];
            n.oninput = function() {
                localStorage[k] = n.innerHTML;
            };
        }(document);
 //   {% endif %}
    }
    else if (window.location.pathname === '/portfolio/') {
        var projectImages = document.querySelectorAll('.portfolio__project'), i = 0;
        Array.prototype.forEach.call(projectImages, function(projectImage) {
            setTimeout(function() { projectImage.classList.remove('is-opacity-invisible'); }, 100 * i);
            i++;
        });
    }
    /*
    else if (window.location.pathname === '/blog/') {

    }
    */
};
