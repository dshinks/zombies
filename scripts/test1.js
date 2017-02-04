function Weapon(displayname, damage, rounds) {
    "use strict";
    this.displayname = displayname;
    this.damage = damage;
    if (!rounds) {
        this.rounds = "non-firing";
    } else {
        this.rounds = rounds;
    }
    this.useWeapon = function () {
        if (this.rounds === 0) {
            return "out of ammo";
        } else if (this.rounds === "non-firing") {
            return 1;
        } else {
            this.rounds--;
            return this.damage;
        }
    };
}

var shotgun = new Weapon("shotgun", 10, 5);
var axe = new Weapon("axe", 5);
var golfclub = new Weapon("golf club", 2);
var waterpistol = new Weapon("water pistol", 0.5, 20);
var fists = new Weapon("fists", 1);


function Participant(type, maxHealth, strength, skill) {
    "use strict";
    this.type = type;
    this.initialHealth = maxHealth;
    this.health = maxHealth;
    this.strength = strength;
    this.skill = skill;
    this.currentWeapon = fists;
}

var player = new Participant("Human", 500, 5, 5);
var zombie = new Participant("Zombie", 2000, 10, 1);