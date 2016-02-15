/* Window.onload to ensure the async scripts are loaded, since they are dependencies */
window.onload = function() {
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

    /* Git Message Snippet if at homepage */
  //  {% if page.title == 'Home' %}
    if(window.location.pathname === '/') {
        startCommitMsgRequest();
     /*
        $(function() {
            $('.time-since-commit').loadTimeSince();
            $('#lastCommitMessage').loadLastCommitMessage();
        });
        */
    } else if (window.location.pathname === '/note/') {

    /* Caching Note into local storage */
  //  {% elsif page.title == 'Note' %}

        !function(d){
            var n = d.getElementById('note__content');
            var k = 'c';
            if (localStorage[k] === undefined) {
                localStorage[k] = "Replace me! This is a text editor utilizing local storage. Anything typed here will be saved in the browser's local storage, which persists through browser sessions. I made this section in order that I may eventually use my site as a workspace in addition to being a portolio site for others to view.";
            }
            n.innerHTML = localStorage[k];
            n.oninput = function() {
                localStorage[k] = n.innerHTML;
            };
        }(document);
 //   {% endif %}
    }
};
