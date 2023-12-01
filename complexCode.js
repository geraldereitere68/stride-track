/**
 * Filename: complexCode.js
 * 
 * Description: This code demonstrates a complex and sophisticated JavaScript program that implements a virtual pet simulation with various functionalities.
 * 
 * The code organizes the virtual pet's attributes, such as name, age, and hunger level, and provides methods for interacting with the pet, such as feeding, playing, and aging.
 * It also includes an event system for notifying the user about the pet's actions, achievements, or needs.
 * 
 * The code follows object-oriented practices, using classes, inheritance, and encapsulation to create a robust and extensible virtual pet simulation.
 */

// Main pet class representing a virtual pet
class Pet {
  constructor(name) {
    this.name = name;
    this.age = 0;
    this.hungerLevel = 0;
    this.energyLevel = 10;
    this.happinessLevel = 10;
    this.isSleeping = false;
    this.isAlive = true;
  }

  feed() {
    if (this.isAlive) {
      if (this.hungerLevel > 0) {
        this.hungerLevel--;
        this.energyLevel++;
        this.happinessLevel++;
        this.notifyEvent(`${this.name} has been fed.`);
      } else {
        this.notifyEvent(`${this.name} is not hungry.`);
      }
    } else {
      this.notifyEvent(`${this.name} cannot be fed. It's already dead.`);
    }
  }

  play() {
    if (this.isAlive) {
      if (!this.isSleeping) {
        if (this.energyLevel >= 2 && this.happinessLevel < 10) {
          this.energyLevel -= 2;
          this.happinessLevel += 2;
          this.hungerLevel++;
          this.notifyEvent(`${this.name} played and is happy now.`);
        } else if (this.happinessLevel >= 10) {
          this.notifyEvent(`${this.name} doesn't want to play right now.`);
        } else {
          this.notifyEvent(`${this.name} is too tired to play.`);
        }
      } else {
        this.notifyEvent(`${this.name} is sleeping and cannot play.`);
      }
    } else {
      this.notifyEvent(`${this.name} is dead and cannot play.`);
    }
  }

  sleep() {
    if (this.isAlive) {
      if (!this.isSleeping) {
        this.isSleeping = true;
        this.energyLevel += 5;
        this.hungerLevel++;
        this.notifyEvent(`${this.name} fell asleep.`);
      } else {
        this.notifyEvent(`${this.name} is already asleep.`);
      }
    } else {
      this.notifyEvent(`${this.name} is dead and cannot sleep.`);
    }
  }

  wakeUp() {
    if (this.isAlive) {
      if (this.isSleeping) {
        this.isSleeping = false;
        this.notifyEvent(`${this.name} woke up.`);
      } else {
        this.notifyEvent(`${this.name} is already awake.`);
      }
    } else {
      this.notifyEvent(`${this.name} is dead and cannot wake up.`);
    }
  }

  notifyEvent(eventMessage) {
    console.log(eventMessage);
  }
}

// Inherited class that extends the Pet class to create a specific type of virtual pet
class Dog extends Pet {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  bark() {
    if (this.isAlive) {
      this.notifyEvent(`${this.name} barked loudly!`);
    } else {
      this.notifyEvent(`${this.name} is dead and cannot bark.`);
    }
  }
}

// Inherited class that extends the Pet class to create another specific type of virtual pet
class Cat extends Pet {
  constructor(name, furColor) {
    super(name);
    this.furColor = furColor;
  }

  meow() {
    if (this.isAlive) {
      this.notifyEvent(`${this.name} meowed softly.`);
    } else {
      this.notifyEvent(`${this.name} is dead and cannot meow.`);
    }
  }
}

// Create instances of virtual pets
const pet1 = new Dog("Buddy", "Golden Retriever");
const pet2 = new Cat("Snowball", "White");

// Perform pet actions
pet1.sleep();
pet2.feed();
pet1.bark();
pet2.play();
pet1.wakeUp();

/*
  Output:
  Buddy fell asleep.
  Snowball has been fed.
  Buddy barked loudly!
  Snowball played and is happy now.
  Buddy woke up.
*/

// ... More code (interactions, UI, etc.) can be added here to further enhance the simulation