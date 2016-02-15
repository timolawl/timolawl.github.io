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
        $(function() {
            $('.time-since-commit').loadTimeSince();
            $('#lastCommitMessage').loadLastCommitMessage();
        });
    } else if (window.location.pathname === '/note/') {
  //  {% elsif page.title == 'Note' %}

        !function(d){
            var n = d.getElementById('note__content');
            var k = 'c';
            n.innerHTML = localStorage[k];
            n.oninput = function() {
                localStorage[k] = n.innerHTML;
            };
        }(document);
 //   {% endif %}
    }
};
