var storyPoint = 0;
var clicky = document.getElementById("clicky");
var writey = document.getElementById("writey");


function appendToBox(box, newText) {
    "use strict";
    var existingText = box.innerHTML;
    box.innerHTML = existingText + newText;
    box.scrollTop = box.scrollHeight;

}

var f1 = function () {
        "use strict";
        appendToBox(writey, "Look out! The zombies are coming!!<br>");
    };
var f2 = function () {
        "use strict";
        appendToBox(writey, "No, seriously, they really are...!<br>");
    };
var f3 = function () {
    "use strict";
    appendToBox(writey, "Come on! Shift yourself!!");
};

var story = [f1, f2, f3];

function doSomething() {
    "use strict";
    if (storyPoint < story.length) {
        story[storyPoint].apply();
        storyPoint++;
    } else {
        clicky.className = "disabledClicker";
    }
}

doSomething();
clicky.addEventListener("click", doSomething);
