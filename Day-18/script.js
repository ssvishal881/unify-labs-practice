// Digital Pet Class
class DigitalPet {

    constructor(name) {
        this.name = name;
        this.hunger = 50;
        this.energy = 50;
    }

    // Method: eat
    eat() {
        this.hunger -= 10;
        this.energy += 5;

        if (this.hunger < 0) this.hunger = 0;
        if (this.energy > 100) this.energy = 100;
    }

    // Method: play
    play() {
        this.hunger += 10;
        this.energy -= 10;

        if (this.hunger > 100) this.hunger = 100;
        if (this.energy < 0) this.energy = 0;
    }

    // Method: sleep
    sleep() {
        this.energy += 20;

        if (this.energy > 100) this.energy = 100;
    }

    // Method: get status
    getStatus() {

        if (this.hunger > 70) {
            return "Hungry 😟";
        }
        else if (this.energy < 30) {
            return "Tired 😴";
        }
        else {
            return "Happy 😊";
        }
    }
}


// Create pet object
const myPet = new DigitalPet("Buddy");


// DOM elements
const hungerText = document.getElementById("hunger");
const energyText = document.getElementById("energy");
const statusText = document.getElementById("status");

const eatBtn = document.getElementById("eatBtn");
const playBtn = document.getElementById("playBtn");
const sleepBtn = document.getElementById("sleepBtn");


// Update UI
function updateUI() {

    hungerText.innerText = "Hunger: " + myPet.hunger;
    energyText.innerText = "Energy: " + myPet.energy;
    statusText.innerText = "Status: " + myPet.getStatus();
}


// Button events
eatBtn.addEventListener("click", function() {
    myPet.eat();
    updateUI();
});

playBtn.addEventListener("click", function() {
    myPet.play();
    updateUI();
});

sleepBtn.addEventListener("click", function() {
    myPet.sleep();
    updateUI();
});


// Initial load
updateUI();
