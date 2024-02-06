let loadedResponses = [];
let responseIndex = 0;
let yes_size = 1;

function yesClicked() {
    var first_page = document.getElementById('first-page');
    var second_page = document.getElementById('second-page');
    first_page.style.display="none";
    second_page.style.display="block";

    alert("I KNEW IT :3");

    playVideo();
}

function playVideo()
{
    var video = document.getElementById("chipi");
    video.currentTime = 0;
    video.play();
}

async function noClicked() 
{
    var yes_button = document.getElementById('yes-button');

    var no_button = document.getElementById('no-button');

    var screenWidth = window.innerWidth - no_button.offsetWidth;
    var screenHeight = window.innerHeight - no_button.offsetHeight;

    // Calculate new position or use predefined values
    var newPositionX = getRandomInt(0, screenWidth); /* calculate or set new X position */;
    var newPositionY = getRandomInt(0, screenHeight); /* calculate or set new Y position */;

    //Update the yes button's size
    if(yes_size < 1.8) yes_size += 0.2;
    yes_button.style.transform = 'scale('+yes_size+')';
    
    //Implemente text changes to yes button
    if(loadedResponses.length == 0) await fetchResponses();
    yes_button.innerHTML = getNextResponse();

    // Update the no button's position
    no_button.style.position = 'absolute';
    no_button.style.left = newPositionX + 'px';
    no_button.style.top = newPositionY + 'px';
}

// Function to get the next response
function getNextResponse() {
    if (loadedResponses.length === 0) {
        return 'No responses available.';
    }

    // Get the next response and update the index
    const currentResponse = loadedResponses[responseIndex];
    responseIndex = (responseIndex + 1) % loadedResponses.length; // Loop back to the beginning if needed

    return currentResponse;
}

// Function to fetch and parse the JSON file (called only once)
async function fetchResponses() {
    try {
        const response = await fetch('responses.json');
        if (!response.ok) {
            throw new Error(`Failed to fetch responses: ${response.statusText}`);
        }
        const jsonData = await response.json();
        loadedResponses = jsonData.confrontational_responses;
    } catch (error) {
        console.error('Error fetching or parsing JSON:', error.message);
    }
}

// Generates a random integer between min and max (inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.addEventListener('DOMContentLoaded', function () {
    const numberOfRoses = 7; // Adjust the number of roses as needed

    for (let i = 0; i < numberOfRoses; i++) {
        createRose();
    }
});

function createRose() {
    const rose = document.createElement('img');
    rose.src = 'img/cat_couple.png'; // Adjust the path to your rose.png image
    rose.classList.add('shape-img');
    
    const randomX = Math.random() * window.innerWidth;
    const randomY = Math.random() * window.innerHeight;
    const randomRotation = Math.random() * 360; // Static random rotation

    rose.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotation}deg)`;
    
    document.getElementById('shapes').appendChild(rose);
}