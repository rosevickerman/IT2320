var Pet = {};

Pet.Animal = function (species, breed, name, age) {
    this.petSpecies = species;
    this.petBreed = breed;
    this.petName = name;
    this.petAge = age;


    this.GetInfo = function () {
        var s = this.petName + ", also known as " + this.petNickname + ", is a " + 
            this.petBreed + " " + this.petSpecies + " and is " + this.petAge + " years old. <br />";
        return s;
    }
    this.GetInfoNoNickname = function () {
        var s = this.petName + " is a " + this.petBreed + " " + this.petSpecies +
            " and is " + this.petAge + " years old. <br />";
        return s;
    }
}

Pet.Animal.prototype.SetNickname = function (nickname) {
    this.petNickname = nickname;
}

Pet.Pet1 = new Pet.Animal("Dog", "Chihuahua", "Eevee", 2);
Pet.Pet2 = new Pet.Animal("Dog", "Chihuahua", "Poco", 4);
Pet.Pet3 = new Pet.Animal("Dog", "Papillion", "Gizmo", 14);
Pet.Pet4 = new Pet.Animal("Cat", "Mix", "Fitzchivalry", 3);
Pet.Pet5 = new Pet.Animal("Chinchilla", "Standard", "Latte", 5);
Pet.Pet6 = new Pet.Animal("Chinchilla", "Beige", "Button", 4);
Pet.Pet7 = new Pet.Animal("Chinchilla", "Standard", "Hector", 6);
Pet.Pet8 = new Pet.Animal("Turtle", "Reeves", "TimTim", 3);
Pet.Pet9 = new Pet.Animal("Turtle", "Reeves", "Minga", 3);

Pet.Pet1.SetNickname("Eevee-boo");
Pet.Pet2.SetNickname("Poco-pollo");
Pet.Pet3.SetNickname("Giz-pup");
Pet.Pet4.SetNickname("Fitz");

document.getElementById("pets").innerHTML = Pet.Pet1.GetInfo();
document.getElementById("pets").innerHTML += Pet.Pet2.GetInfo();
document.getElementById("pets").innerHTML += Pet.Pet3.GetInfo();
document.getElementById("pets").innerHTML += Pet.Pet4.GetInfo();
document.getElementById("pets").innerHTML += Pet.Pet5.GetInfoNoNickname();
document.getElementById("pets").innerHTML += Pet.Pet6.GetInfoNoNickname();
document.getElementById("pets").innerHTML += Pet.Pet7.GetInfoNoNickname();
document.getElementById("pets").innerHTML += Pet.Pet8.GetInfoNoNickname();
document.getElementById("pets").innerHTML += Pet.Pet9.GetInfoNoNickname();