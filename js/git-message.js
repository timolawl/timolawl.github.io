
/*
//rate limit checking function:
jQuery.githubRateLimitStatus = function(callback) {
    jQuery.getJSON("https://api.github.com/rate_limit?callback=?", callback);
};

jQuery.fn.checkRateLimit = function() {
    $.githubRateLimitStatus(function(data) {
        var rateLimit = data.data;
        console.log(rateLimit);
    });
};
*/

jQuery.githubCommits = function(callback) {
    jQuery.getJSON("https://api.github.com/repos/timolawl/timolawl.github.io/commits?callback=?", callback);
};

var mostRecentCommit = null;

$.githubCommits(function(data) {
    var commits = data.data;
    mostRecentCommit = commits[0];
});

jQuery.fn.loadLastCommitMessage = function() {
  //  this.html("<span>Querying GitHub for last commit message...</span>");

    var target = this;
    target.empty().append($('<code>' + mostRecentCommit.commit.message + '</code>'));
};

jQuery.fn.loadTimeSince = function() {
//    this.html("<span>Querying GitHub for commit time...</span>");

    var target = this;
    var commitTime = mostRecentCommit.commit.committer.date;
    var formattedCommitTime = new Date(Date.parse(commitTime));
    var formattedTime = timeFormatter(formattedCommitTime);
    target.empty().append($('<div>' + formattedTime + '</div>'));
};

function timeFormatter(date) {
    //format into two parts: the date/day and the time:
    var now = new Date();
    var formattedDate = null;
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var dayName = days[date.getDay()];
    //if same day
    if(now.getDay() === date.getDay() && (now - date < 86400000)) {
        return "Today at " + date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute: '2-digit'});
    }
    //if same yesterday
    else if(now - date < 172800000 && (now.getDay() === date.getDay() + 1 || (now.getDay() === 0 && date.getDay() === 6))) {
        return "Yesterday at " + date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute: '2-digit'});
    }
    //if sometime this past week
    else if(now.getDay() - date.getDay() > 0 && now - date < 604800000) {
        return dateName + " at " + date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute: '2-digit'});
    }
    //if sometime last week
    else if(now.getDay() - date.getDay() < 0 && now - date < 604800000) {
        return "Last " + dayName + " at " + date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute: '2-digit'});
    }
    else return date.toLocaleDateString() + " at " + date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute: '2-digit'});
}
