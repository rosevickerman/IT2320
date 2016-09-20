//Prints message when photo is clicked
document.getElementById("photo").onclick = function () {
    alert("My name is Rose!\nIt's very nice to meet you!");
}

//Replaces year with current date in footer element
document.getElementById("date").innerHTML = new Date().toDateString();
