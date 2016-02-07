
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

//main

jQuery.githubCommits = function(callback) {
    jQuery.getJSON("https://api.github.com/repos/timolawl/timolawl.github.io/commits?callback=?", callback);
};

jQuery.fn.loadLastCommitMessage = function() {
    this.html("<span>Querying GitHub for last commit message...</span>");

    var target = this;
    $.githubCommits(function(data) {
        var commits = data.data;
        var mostRecentCommit = commits[0];

         target.empty().append($('<pre><code>' + mostRecentCommit.commit.message + '</code></pre>'));
    });
};

jQuery.fn.loadTimeSince = function() {
    this.html("<span>Querying GitHub for commit time...</span>");

    var target = this;
    $.githubCommits(function(data) {
        var commits = data.data;
        var mostRecentCommit = commits[0];
        var commitTime = mostRecentCommit.commit.committer.date;
        var formattedCommitTime = Date.parse(commitTime).add({ hours: -8 });

        var formattedTime = timeFormatter(formattedCommitTime);

        console.log(formattedTime);

        target.empty().append($('<div>' + formattedTime + '</div>'));

   //     this.html("<span>

   //     console.log(Date.parse(commitTime).add({hours: -8 }).getDay());

//        console.log(now);

  //      console.log(now - Date.parse(commitTime).add({hours: -8}));

    //    console.log(Date.parse(commitTime).add({hours:-8}).toLocaleTimeString(navigator.language, {hour: '2-digit', minute: '2-digit'}));

      //  var parsedTimeInSeconds = Date.parse(commitTime);
      //  var timeSinceCommit = timeSince(Date.parse(commitTime));
      //  console.log(timeSinceCommit);
       // var theDate = parsedTimeInSeconds.getDate();
      //  console.log(theDate);
      //
    });
};


function timeFormatter(date) {
    //format into two parts: the date/day and the time:
    var now = new Date();
    var formattedDate = null;
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
        return date.getDayName() + " at " + date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute: '2-digit'});
    }
    //if sometime last week
    else if(now.getDay() - date.getDay() < 0 && now - date < 604800000) {
        return "Last " + date.getDayName() + " at " + date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute: '2-digit'});
    }
    else return date.toLocaleDateString() + " at " + date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute: '2-digit'});
}

/*
// time since calculator:

function timeSince(date) {
//can adjust the function here for the time difference.
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}
*/
