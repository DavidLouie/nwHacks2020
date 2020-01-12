//alert("wakanda");

document.addEventListener("DOMSubtreeModified", function () {
    colorized();
});

colorized();

function colorized() {
    let cont = document.querySelectorAll('p');
// Put the user name here; Something to keep in mind if a user is politically biased in one comment highlight all the comments from the user
    let userNameElements = document.querySelectorAll("a[href='/user/user_name/']");
    for (userNameElement of userNameElements) {
        userNameElement.style['background-color'] = "red";
    }

    for (elt of cont) {
        //if (elt.toString() === "k") {
        elt.style['background-color'] = setColor(90);
//}
    }
}

function setColor(p) {
    var red = p<50 ? 255 : Math.round(256 - (p-50)*5.12);
    var green = p>50 ? 255 : Math.round((p)*5.12);
    return "#" + red.toString(16) + green.toString(16) + "00";
}

let currentUrl = window.location.href;
let userAndComments = [];
var app = {
    init: function() {
        if (document.readyState != 'loading') {
            this.startApp();
        } else {
            document.addEventListener('DOMContentLoaded', this.startApp);
        }
    },

    //fetch helpers
    status: function (response) {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(new Error(response.statusText))
        }
    },
    json: function (response) {
        return response.json()
    },

    //Main
    startApp: function() {
        //Get Feed
        fetch(currentUrl + '.json')
            .then(app.status)
            .then(app.json)
            .then(app.getCommentsFromJSON)
            .catch(function(error) {
                console.log('request failed', error.message)
            });
    },

    getCommentsFromJSON: function(json) {
        var text = app.getUserAndCommentsFromArray(json[1].data.children);

        return text;
    },

    //Recursively go through the object tree and compile all the comments
    getUserAndCommentsFromArray: function(arr) {

        arr.forEach(function(item) {
            if (item !== undefined && item.data.author !== "[deleted]") {
                userAndComments.push({username: item.data.author, comment: item.data.body});

                if (item.data.replies !== undefined && item.data.replies !== '') {
                    app.getUserAndCommentsFromArray(item.data.replies.data.children);

                }
            }
        });

    }
};

app.init();
console.log(userAndComments);

