var clicky = document.getElementById("clicky");
var writey = document.getElementById("writey");
var currentContext, insertStory;

function appendToBox(box, newText) {
    "use strict";
    var existingText = box.innerHTML;
    box.innerHTML = existingText + newText;
    box.scrollTop = box.scrollHeight;

}

var mainStory = {
    currentStep: 0,
    steps: [
        function () {
            "use strict";
            appendToBox(writey, "Start with this");
        },
        function () {
            "use strict";
            appendToBox(writey, "<br>Then do this");
            currentContext = insertStory;
        },
        function () {
            "use strict";
            appendToBox(writey, "<br>Do this next");
        },
        function () {
            "use strict";
            appendToBox(writey, "<br>Finally, this.");
        }
    ],
    
    doStep: function () {
        "use strict";
        if (mainStory.currentStep < mainStory.steps.length) {
            mainStory.steps[mainStory.currentStep].apply();
            mainStory.currentStep++;
        }
    }
    
};

var insertStory = {
    currentStep: 0,
    steps: [
        function () {
            "use strict";
            appendToBox(writey, "<br>iiiStart with this");
        },
        function () {
            "use strict";
            appendToBox(writey, "<br>iiiThen do this");
  
        },
        function () {
            "use strict";
            appendToBox(writey, "<br>iiiDo this next");
        },
        function () {
            "use strict";
            appendToBox(writey, "<br>iiiFinally, this.");
            currentContext = mainStory;
        }
    ],
    
    doStep: function () {
        "use strict";
        if (this.currentStep < this.steps.length) {
            this.steps[this.currentStep].apply();
            this.currentStep++;
        }
    }
    
};

function doSomething() {
    "use strict";
    currentContext.doStep();
}

currentContext = mainStory;
doSomething();
clicky.addEventListener("click", doSomething);
