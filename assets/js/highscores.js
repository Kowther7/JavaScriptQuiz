// Isolating elements that I will need to manipulate throughout my program
var highscoreList = document.getElementById("highscore-list");
var goBackButton = document.getElementById("go-back-btn");
var clearHighscoresButton = document.getElementById("clear-highscores-btn");

// Retrieve highscores from localStorage
function getHighscores() {
    var highscores = localStorage.getItem("highscores");
    return highscores ? JSON.parse(highscores) : [];
}

// Display highscores in the list
function displayHighscores() {
    // Clear the existing list
    highscoreList.innerHTML = "";
    // Retrieve high scores
    var highscores = getHighscores();
    // Using a forEach loop that creates a new list item element through each iteration
    highscores.forEach(function (entry) {
        var listItem = document.createElement("li");
        // Using .textConent to set the string representation of the user's initials and score
        listItem.textContent = `${entry.initials}: ${entry.score}`;
        // Appending the newely created list element to the highscore list
        highscoreList.appendChild(listItem);
    });
}

// Add event listener to go back button
goBackButton.addEventListener("click", function () {
    // Redirect user back to the main page (index.html)
    window.location.href = "index.html";
});

// Add event listener to clear highscores button
clearHighscoresButton.addEventListener("click", function () {
    // Clear highscores from localStorage
    localStorage.removeItem("highscores");
    // Refresh the highscores list
    displayHighscores();
});

// Display highscores on page load
displayHighscores();