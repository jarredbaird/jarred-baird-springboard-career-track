/* Part Uno */
class Vehicle {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }
    honk() {
        return "Beep";
    }
    toString() {
        return `The vehicle is a ${this.make} ${this.model} from ${this.year}.`
    }
}

/* Part Dos */
class Car extends Vehicle {
    constructor(make, model, year) {
        super(make, model, year);
        this.numWheels = 4;
    }
}

/* Part Tres */
class Motorcycle extends Vehicle {
    constructor(make, model, year) {
        super(make, model, year);
        this.numWheels = 2;
    }
    revEngine() {
        return "VROOM!!!";
    }
}

/* Part Cuatro */
class Garage {
    constructor(capacity) {
        this.capacity = capacity;
        this.vehicles = [];
    }
    add(vehicle) {
        if (!(vehicle instanceof Vehicle)) {
            throw new Error ("Only vehicles are allowed in here!");
        }
        else if (this.vehicles.length >= this.capacity) {
            throw new Error ("Sorry, we're full");
        }
        else {
            this.vehicles.push(vehicle);
            return "Vehicle added!";
        }
    }
}