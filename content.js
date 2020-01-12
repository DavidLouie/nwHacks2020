//alert("wakanda");

let cont = document.getElementsByTagName('p');
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

function setColor(p) {
    var red = p<50 ? 255 : Math.round(256 - (p-50)*5.12);
    var green = p>50 ? 255 : Math.round((p)*5.12);
    return "#" + red.toString(16) + green.toString(16) + "00";
}