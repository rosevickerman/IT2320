function displayPets(pets)
{
    var s = "<br />";
	for (var i=0; i < pets.dogs.length; i++)
	{
		var pet = pets.dogs[i];
		s += "Dog " + (i + 1) + ": " + pet.name + ", nicknamed " + pet.nickname + ", is a " + pet.breed + 
            " that is " + pet.age + " years old.<br />";
	}
    s += "<br />";
    for (var i=0; i < pets.cats.length; i++)
	{
		var pet = pets.cats[i];
		s += "Cat " + (i + 1) + ": " + pet.name + ", nicknamed " + pet.nickname + ", is a " + pet.breed + 
            " that is " + pet.age + " years old.<br />";
	}
    s += "<br />";
    for (var i=0; i < pets.chinchillas.length; i++)
	{
		var pet = pets.chinchillas[i];
		s += "Chinchilla " + (i + 1) + ": " + pet.name + ", is a " + pet.breed + " that is " + 
            pet.age + " years old.<br />";
	}
    s += "<br />";
    for (var i=0; i < pets.turtles.length; i++)
	{
		var pet = pets.turtles[i];
		s += "Turtle " + (i + 1) + ": " + pet.name + ", is a " + pet.breed + " that is " + 
            pet.age + " years old.<br />";
	}
    $("#pets").append(s);
}

function createPets()
{
	return {
		"dogs" : [
			{
				"name" : "Eevee",
				"nickname" : "Eevee-boo",
				"breed" : "Chihuahua",
                "age" : 2,
			},
			{
				"name" : "Poco",
				"nickname" : "Poco-pollo",
				"breed" : "Chihuahua",
                "age" : 5,
			},
			{
				"name" : "Gizmo",
				"nickname" : "Giz-pup",
				"breed" : "Papillion",
                "age" : 14,
			}

		],
        "cats" : [
            {
                "name" : "Fitzchivalry",
				"nickname" : "Fitz",
				"breed" : "Mix",
                "age" : 4,
            }
        ],
        "chinchillas" : [
            {
                "name" : "Button",
				"breed" : "Beige",
                "age" : 3,
            },
            {
                "name" : "Latte",
				"breed" : "Standard",
                "age" : 4,
            },
            {
                "name" : "Hector",
				"breed" : "Standard",
                "age" : 5,
            }
        ],
        "turtles" : [
            {
                "name" : "TimTim",
				"breed" : "Reeves",
                "age" : 3,
            },
            {
                "name" : "Minga",
				"breed" : "Reeves",
                "age" : 3,
            }
        ]
	};
}


$("#click").click(function()
{
    var pets = createPets();
    displayPets(pets);
});