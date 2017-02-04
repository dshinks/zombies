var clicky = document.getElementById("clicky");
var writey = document.getElementById("writey");
var currentContext, mainStory, firstWeapon, foundWeapon, fight, updateScore, choices, choiceMade, doSomething, movesTilNextWeapon, nextWeapon, youWin, youLose;

function appendToBox(box, newText) {
    "use strict";
    var existingText = box.innerHTML;
	if (!box.innerHTML) {
		box.innerHTML = newText;
	} else {
		box.innerHTML = existingText + "<br>" + newText;
	}
    box.scrollTop = box.scrollHeight;

}

function activateButton(elementID, label, clickFunction) {
	"use strict";
	var button = document.getElementById(elementID);
	button.innerHTML = label;
	button.style = "display:inline-block";
	button.addEventListener("click", clickFunction);
}

function deactivateButton(elementID) {
	"use strict";
	var button = document.getElementById(elementID),
		newButton = button.cloneNode(true);
	button.parentNode.replaceChild(newButton, button);
	newButton.innerHTML = "";
	newButton.style = "display:none";
}

function randomNumber(startNumber, endNumber) {
/*Basic integer RNG, generates a number between startNumber and endNumber*/
    "use strict";
    var tempStartNumber, range;
    if (startNumber > endNumber) {
        tempStartNumber = startNumber;
        startNumber = endNumber;
        endNumber = tempStartNumber;
    }
    range = endNumber - startNumber;
    return Math.round(Math.random() * range) + startNumber;
}

function updateScore(scoreName, value, possibleMaxValue) {
    "use strict";
    var outputvalue, colourRed, colourGreen;
    if (value < 0) {
        value = 0;
    }
    if (possibleMaxValue === undefined) {
        outputvalue = value.toFixed(1);
    } else {
        outputvalue = ((value / possibleMaxValue) * 100).toFixed(1) + "%";
        
        if (value / possibleMaxValue > 0.5) {
            colourGreen = 255;
            colourRed = ((1 - (value / possibleMaxValue)) * 2 * 255).toFixed(0);
        } else {
            colourRed = 255;
            colourGreen = (((value * 2) / possibleMaxValue) * 255).toFixed(0);
        }
        
        console.log(scoreName + ": (" + colourRed + ", " + colourGreen + ", 0)");
        document.getElementById(scoreName).style.backgroundColor = "rgb(" + colourRed + "," + colourGreen + ",0)";
                    
    }
        
    document.getElementById(scoreName).innerHTML = outputvalue;
    
}

function selectFromArray(sourceArray, destinationArray, elements) {
/*fills the destination array with items from the source array at random, to a specified number of elements (or until all elements are taken from source array)*/
    "use strict";
    var returnArray, randomElement, i;
    if (sourceArray.length < elements) {
        elements = sourceArray.length;
    }
        
    for (i = 0; i < elements; i++) {
        randomElement = sourceArray[randomNumber(0, sourceArray.length - 1)];

        if (destinationArray.indexOf(randomElement) >= 0) {
            i--;
        } else {
            destinationArray[i] = randomElement;
        }
    }
}

function StoryContext(steps) {
	"use strict";
	this.currentStep = 0;
	this.steps = steps;
	this.doStep = function () {
        if (this.currentStep < this.steps.length) {
            this.steps[this.currentStep].apply();
            this.currentStep++;
        }
    };
}

function Weapon(name, damage, rounds, secondaryDamage) {
	"use strict";
	this.name = name;
	this.damage = damage;
	this.currentRounds = rounds;
	this.totalRounds = rounds;
	this.secondaryDamage = secondaryDamage;
	this.use = function () {
		if (this.currentRounds === undefined) {
			return this.damage * Math.random();
		} else if (this.currentRounds === 0) {
			appendToBox(writey, "Your " + this.name + " is out of ammo, so you hit the zombie as hard as you can with it.");
			return this.secondaryDamage * Math.random();
		} else {
			this.currentRounds--;
			switch (this.currentRounds) {
			case 0:
				appendToBox(writey, "You are now out of ammo!");
				break;
			case 1:
				appendToBox(writey, "Last round");
				break;
			default:
				appendToBox(writey, "You have " + this.currentRounds + " rounds remaining.");
				break;
			}
			return this.damage * Math.random();
		}
	};
	this.reload = function () {
		this.currentRounds = this.totalRounds;
	};
}

/*Weapons*/

var revolver = new Weapon("revolver", 250, 6, 30);
var shotgun = new Weapon("shotgun", 500, 1, 60);
var axe = new Weapon("axe", 180);
var knife = new Weapon("steak knife", 130);
var golfclub = new Weapon("golf club", 100);
var trout = new Weapon("giant trout", 60);
var magazine = new Weapon("rolled up copy of Hello magazine", 40);
var rubberchicken = new Weapon("rubber chicken", 30);
var waterpistol = new Weapon("water pistol", 20, 20, 5);
var fists = new Weapon("fists", 50);


var possibleWeapons = [
	revolver,
	shotgun,
	axe,
	knife,
	golfclub,
	trout,
	magazine,
	rubberchicken,
	waterpistol
];

function Participant(health) {
	"use strict";
	this.health = health;
	this.maxHealth = health;
	this.currentWeapon = fists;
}

var player = new Participant(500);
var zombie;

mainStory = new StoryContext([
	function () {
		"use strict";
		appendToBox(writey, "It is a dark time. The war between humanity and the undead is raging.<br>");
		appendToBox(writey, "You're out in the forest, and you think you've found the humans' command centre. If you can just make it there, you'll be safe. Unfortunately, there is still quite a way to go to get there, and the place is crawling with zombies.<br>");
		appendToBox(writey, "You grit your teeth and step forward...<br>");
	},
	function () {
		"use strict";
		appendToBox(writey, "A zombie has just stepped into your path! You've been spotted!");
		zombie = new Participant(1000);
		console.log("firstWeapon:");
		currentContext = firstWeapon;
	},
	function () {
		"use strict";
		appendToBox(writey, "The zombie stares at you with his cold, dead eyes.");
		appendToBox(writey, "He looks hungry. Let's put him down!");
		console.log("fight:");
		currentContext = fight;
		doSomething();
	}
]);

firstWeapon = new StoryContext([
	function () {
		"use strict";
		appendToBox(writey, "You scramble round frantically, looking for something to use as a weapon.");
	},
	function () {
		"use strict";
		/*declare array to hold possible weapons*/
		choices = [];
		selectFromArray(possibleWeapons, choices, 3);
		/*push three weapons at random into array*/
		appendToBox(writey, "Nearby, you can see:<ul>");
		appendToBox(writey, "<li>" + choices[0].name + "</li>");
		appendToBox(writey, "<li>" + choices[1].name + "</li>");
		appendToBox(writey, "<li>" + choices[2].name + "</li>");
		appendToBox(writey, "</ul>Better grab one quick!");
		
			
		activateButton("option0", choices[0].name, function () { choiceMade = choices[0]; doSomething(); });
		activateButton("option1", choices[1].name, function () { choiceMade = choices[1]; doSomething(); });
		activateButton("option2", choices[2].name, function () { choiceMade = choices[2]; doSomething(); });

		
	},
	function () {
		"use strict";
		deactivateButton("option0");
		deactivateButton("option1");
		deactivateButton("option2");
		
		if (!choiceMade) {
			appendToBox(writey, "You didn't pick a weapon!");
			appendToBox(writey, "You're going to have to fight this guy with your bare hands now.");
			appendToBox(writey, "Rather you than me...");
		} else {
			appendToBox(writey, "You chose the " + choiceMade.name);
			player.currentWeapon = choiceMade;
		}
		
		choices = null;
		choiceMade = null;
		console.log("mainStory:");
		currentContext = mainStory;
	}

]);

fight = new StoryContext([
	function () {
		"use strict";
		document.getElementById("clicky").innerHTML = "Fight!";
		if (movesTilNextWeapon === undefined) {
			movesTilNextWeapon = randomNumber(3, 6);
		}
	},
	function () {
		"use strict";
		appendToBox(writey, "You attack the zombie with your " + player.currentWeapon.name + ".");
		zombie.health = zombie.health - player.currentWeapon.use();
		updateScore("zombieHealth", zombie.health, zombie.maxHealth);
		if (zombie.health <= 0) {
			currentContext = youWin;
			doSomething();
		}
	},
	function () {
		"use strict";
		appendToBox(writey, "Look out! the zombie is attacking!");
		player.health = player.health - zombie.currentWeapon.use();
		updateScore("playerHealth", player.health, player.maxHealth);
		if (player.health <= 0) {
			currentContext = youLose;
			doSomething();
		} else {
			fight.currentStep = 0;
			if (movesTilNextWeapon === 0) {
				nextWeapon.currentStep = 0;
				currentContext = nextWeapon;
			} else {
				movesTilNextWeapon--;
			}
		}
	}
]);

nextWeapon = new StoryContext([
	function () {
		"use strict";
		foundWeapon = possibleWeapons[randomNumber(0, possibleWeapons.length - 1)];
		appendToBox(writey, "You've found another weapon!");
		appendToBox(writey, "<br>***" + foundWeapon.name + "***");
		appendToBox(writey, "<br>Would you like to switch to this weapon?");
		choices = ["Yes", "No"];
		document.getElementById("clicky").innerHTML = "Skip";
		activateButton("option0", choices[0], function () { choiceMade = choices[0]; doSomething(); });
		activateButton("option1", choices[1], function () { choiceMade = choices[1]; doSomething(); });
	},
	function () {
		"use strict";
		if (choiceMade === "Yes") {
			player.currentWeapon = foundWeapon;
			player.currentWeapon.reload();
			appendToBox(writey, "You picked up the " + player.currentWeapon.name + ".");
		}
		movesTilNextWeapon = undefined;
		deactivateButton("option0");
		deactivateButton("option1");
		choiceMade = null;
		choiceMade = null;
		movesTilNextWeapon = undefined;
		fight.currentStep = 0;
		currentContext = fight;
		doSomething();
	}
]);

youWin = new StoryContext([
	function () {
		"use strict";
		appendToBox(writey, "You have killed the zombie!");
		appendToBox(writey, "Humanity lives to fight another day!");
	}
]);

youLose = new StoryContext([
	function () {
		"use strict";
		appendToBox(writey, "The zombie knocked you out, then he ate your brains.");
		appendToBox(writey, "Ouch. Tough luck.");
	}
]);

function doSomething() {
    "use strict";
	console.log(currentContext.currentStep);
    currentContext.doStep();
}

currentContext = mainStory;
console.log("Main Story:");
doSomething();
clicky.addEventListener("click", doSomething);
