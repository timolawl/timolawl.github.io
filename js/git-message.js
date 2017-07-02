
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


/*
jQuery.githubCommits = function(callback) {
    jQuery.getJSON("https://api.github.com/repos/timolawl/timolawl.github.io/commits?callback=?", callback);
};

var mostRecentCommit = null;

$.githubCommits(function(data) {
    var commits = data.data;
    mostRecentCommit = commits[0];
});
*/
/*
jQuery.fn.loadLastCommitMessage = function() {
  //  this.html("<span>Querying GitHub for last commit message...</span>");

    var target = this;
  //  target.empty().append($('<code>' + mostRecentCommit.commit.message + '</code>'));
    target.empty().appendChild('<code>' + mostRecentCommit.commit.message + '</code>');
};

jQuery.fn.loadTimeSince = function() {
//    this.html("<span>Querying GitHub for commit time...</span>");

    var target = this;
    var commitTime = mostRecentCommit.commit.committer.date;
    var formattedCommitTime = new Date(Date.parse(commitTime));
    var formattedTime = timeFormatter(formattedCommitTime);
   // target.empty().append($('<div>' + formattedTime + '</div>'));
    target.empty().appendChild('<div>' + formattedTime + '</div>');
};
*/
/*
function getCommit(url) {
    //Return a new promise.
    return new Promise(function(resolve, reject) {
        // do the usual XHR stuff
        var req = new XMLHttpRequest();
        req.open('GET', url);
        
        req.onload = function() {
            if(req.status == 200) {
                resolve(req.response);
            }
            else {
                reject(Error(req.statusText));
            }
        };

        //handle network errors
        req.onerror = function() {
            reject(Error("Network Error"));
        };

        //make the request
        req.send();
    });
}
*/

function startCommitMsgRequest() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            var commits = JSON.parse(xhr.responseText);
            loadCommitInfo(commits);
        }
    };
    xhr.open("GET", "https://api.github.com/repos/timolawl/timolawl.github.io/commits");
    xhr.send();
}




var loadCommitInfo = function(json) {
   /*
    getCommit('https://api.github.com/repos/timolawl/timolawl.github.io/commits').then(function(response) {
        console.log("Success!", response);
}, function(error) {
    console.error("Failed!", error);
});
*/

    var mostRecentCommit = json[0];

    var commitTime = mostRecentCommit.commit.committer.date;
    var formattedCommitTime = new Date(Date.parse(commitTime));
    var formattedTime = timeFormatter(formattedCommitTime);

    /*
    var newDiv = document.createElement("div");
    var newTime = document.createTextNode(formattedTime);
    newDiv.appendChild(newTime);
    document.getElementById('time-since-commit').appendChild(newDiv);
   */

    var newTime = document.createTextNode(formattedTime);
    document.querySelector('.last-updated').appendChild(newTime);

    /*
    var newCode = document.createElement("code");
    var commitMessage = document.createTextNode(mostRecentCommit.commit.message);
    newCode.appendChild(commitMessage);
    document.getElementById('last-commit-message').appendChild(newCode);
   */
};

function timeFormatter(date) {
    //format into two parts: the date/day and the time:
    var now = new Date();
    var formattedDate = null;
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var dayName = days[date.getDay()];
    //if same day
    if(now.getDay() === date.getDay() && (now - date < 86400000)) {
        return "today at " + date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute: '2-digit'}) + ".";
    }
    //if same yesterday
    else if(now - date < 172800000 && (now.getDay() === date.getDay() + 1 || (now.getDay() === 0 && date.getDay() === 6))) {
        return "yesterday at " + date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute: '2-digit'}) + ".";
    }
    //if sometime this past week
    else if(now.getDay() - date.getDay() > 0 && now - date < 604800000) {
        return dayName + " at " + date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute: '2-digit'}) + ".";
    }
    //if sometime last week
    else if(now.getDay() - date.getDay() < 0 && now - date < 604800000) {
        return "last " + dayName + " at " + date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute: '2-digit'}) + ".";
    }
    else return date.toLocaleDateString() + " at " + date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute: '2-digit'}) + ".";
}
