//
// javascript conditional loading with dependencies
//

// if mobile
if (document.documentElement.clientWidth < 900) {
    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function() {
            FastClick.attach(document.body);
        }, false);
    }
}

// if at homepage:
$(function() {
    $('.time-since-commit').loadTimeSince();
});

$(function() {
    $('#lastCommitMessage').loadLastCommitMessage();
});
