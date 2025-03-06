// Query selectors for the elements
const menuPage = document.querySelector("#menuPage");
const rulesPage = document.querySelector("#rulesPage");
const gamePage = document.querySelector("#gamePage");
const showRulesBtn = document.querySelector("#showRulesBtn");
const closeRulesBtn = document.querySelector("#closeRulesBtn");
const startGameBtn = document.querySelector("#startGameBtn");
const restartBtn = document.querySelector("#restartBtn");
const warningMessage = document.querySelector("#warningMessage");
const timerDisplay = document.querySelector("#elapsedTime")

const nameInput = document.querySelector("#nameInput");
const difficultyButtons = document.querySelectorAll(".difficulty-btn");


// Function to handle difficulty selection
difficultyButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Remove "selected" class from all buttons
        difficultyButtons.forEach(btn => btn.classList.remove("selected"));
        
        // Add "selected" class to the clicked button and update selectedDifficulty
        button.classList.add("selected");
        selectedDifficulty = button.getAttribute("data-difficulty");
    });
});

// Start Game button logic with validation
startGameBtn.addEventListener("click", () => {
    // Retrieve player name
    playerName = nameInput.value.trim();

    // Check if both player name and difficulty level are provided
    if (!playerName || !selectedDifficulty) {
        // Show warning if either name or difficulty is missing
        warningMessage.classList.remove("hidden");
        warningMessage.textContent = "Please enter your name and select a difficulty level to start the game.";
    } else {
        // Hide warning message if validation passes
        warningMessage.classList.add("hidden");

        // Set player info in the game page (ensure `playerInfo` is present in your HTML)
        document.getElementById('playerInfo').textContent = `Player: ${playerName}, Difficulty: ${selectedDifficulty}`;

        // Initialize game variables or functions here
        gameStartTime = Date.now();
        startTimer();

        // Populate board based on difficulty level
        if (selectedDifficulty === '5x5') {
            populateBoard(easyMaps[Math.floor(Math.random() * easyMaps.length)]);
        } else if (selectedDifficulty === '7x7') {
            populateBoard(hardMaps[Math.floor(Math.random() * hardMaps.length)]);
        }

        // Hide menu page, show game page
        menuPage.classList.add("hidden");
        gamePage.classList.remove("hidden");
    }
});



let gameStartTime;

let isGameOver = false;
let isRestarting = false;





// Show Rules Page
showRulesBtn.addEventListener("click", () => {
    menuPage.classList.add("hidden");
    rulesPage.classList.remove("hidden");
});

// Close Rules Page and go back to Menu
closeRulesBtn.addEventListener("click", () => {
    rulesPage.classList.add("hidden");
    menuPage.classList.remove("hidden");
});

// ELEMENTS
const ELEMENT_IMAGES = {
    empty: "tiles/empty.png",
    mountain: "tiles/mountain.png",
    bridge: "tiles/bridge.png",
    oasis: "tiles/oasis.png",
    curve_rail: "tiles/curve_rail.png",
    straight_rail: "tiles/straight_rail.png",
    bridge_rail: "tiles/bridge_rail.png",
    mountain_rail: "tiles/mountain_rail.png"
};

// Easy Map
const easyMaps = [
    [
        // Row 0
        [
            { x: 0, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 0, y: 1, type: 'mountain', rotation: 90, connections: { up: 0, down: 1, left: 1, right: 0 }},
            { x: 0, y: 2, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 0, y: 3, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 0, y: 4, type: 'oasis', connections: { up: 0, down: 0, left: 0, right: 0 }},
        ],
        // Row 1
        [
            { x: 1, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 1, y: 1, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 1, y: 2, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 1, y: 3, type: 'bridge', rotation: 0, connections: { up: 1, down: 1, left: 0, right: 0 }},
            { x: 1, y: 4, type: 'oasis', connections: { up: 0, down: 0, left: 0, right: 0 }},
        ],
        // Row 2
        [
            { x: 2, y: 0, type: 'bridge', rotation: 0, connections: { up: 1, down: 1, left: 0, right: 0 }},
            { x: 2, y: 1, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 2, y: 2, type: 'mountain', rotation: 180, connections: { up: 1, down: 0, left: 1, right: 0 }},
            { x: 2, y: 3, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 2, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
        ],
        // Row 3
        [
            { x: 3, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 3, y: 1, type: 'empty',  connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 3, y: 2, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 3, y: 3, type: 'oasis', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 3, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
        ],
        // Row 4
        [
            { x: 4, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 4, y: 1, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 4, y: 2, type: 'mountain', rotation: 270, connections: { up: 1, down: 0, left: 0, right: 1 }},
            { x: 4, y: 3, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 4, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
        ],
    ]
    ,
    [
        // Row 0
        [
            { x: 0, y: 0, type: 'oasis', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 0, y: 1, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 0, y: 2, type: 'bridge', rotation: 90, connections: { up: 0, down: 0, left: 1, right: 1 }},
            { x: 0, y: 3, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 0, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
        ],
        // Row 1
        [
            { x: 1, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 1, y: 1, type: 'mountain', rotation: 180 ,connections: { up: 1, down: 0, left: 1, right: 0 }},
            { x: 1, y: 2, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 1, y: 3, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 1, y: 4, type: 'mountain', rotation: 180 , connections: { up: 1, down: 0, left: 1, right: 0 }},
        ],
        // Row 2
        [
            { x: 2, y: 0, type: 'bridge', rotation: 0, connections: { up: 1, down: 1, left: 0, right: 0 }},
            { x: 2, y: 1, type: 'oasis', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 2, y: 2, type: 'mountain', rotation: 270, connections: { up: 1, down: 0, left: 0, right: 1 }},
            { x: 2, y: 3, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 2, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
        ],
        // Row 3
        [
            { x: 3, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 3, y: 1, type: 'empty',  connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 3, y: 2, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 3, y: 3, type: 'oasis', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 3, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
        ],
        // Row 4
        [
            { x: 4, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 4, y: 1, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 4, y: 2, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 4, y: 3, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 4, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
        ],
    ]
    ,
    [
        // Row 0
        [
            { x: 0, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 0, y: 1, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 0, y: 2, type: 'bridge', rotation: 90, connections: { up: 0, down: 0, left: 1, right: 1 }},
            { x: 0, y: 3, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 0, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
        ],
        // Row 1
        [
            { x: 1, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 1, y: 1, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 1, y: 2, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 1, y: 3, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 1, y: 4, type: 'bridge', rotation: 0 , connections: { up: 1, down: 1, left: 0, right: 0 }},
        ],
        // Row 2
        [
            { x: 2, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 2, y: 1, type: 'mountain', rotation: 180 ,connections: { up: 1, down: 0, left: 1, right: 0 }},
            { x: 2, y: 2, type: 'bridge', rotation: 0, connections: { up: 1, down: 1, left: 0, right: 0 }},
            { x: 2, y: 3, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 2, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
        ],
        // Row 3
        [
            { x: 3, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 3, y: 1, type: 'oasis',  connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 3, y: 2, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 3, y: 3, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 3, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
        ],
        // Row 4
        [
            { x: 4, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 4, y: 1, type: 'bridge', rotation: 90,  connections: { up: 0, down: 0, left: 1, right: 1 }},
            { x: 4, y: 2, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 4, y: 3, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 4, y: 4, type: 'mountain', rotation: 180, connections: { up: 1, down: 0, left: 1, right: 0 }},
        ],
    ]
    ,
    [
        // Row 0
        [
            { x: 0, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 0, y: 1, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 0, y: 2, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 0, y: 3, type: 'bridge', rotation: 90 ,connections: { up: 0, down: 0, left: 1, right: 1}},
            { x: 0, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
        ],
        // Row 1
        [
            { x: 1, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 1, y: 1, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 1, y: 2, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 1, y: 3, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 1, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
        ],
        // Row 2
        [
            { x: 2, y: 0, type: 'bridge', rotation: 0, connections: { up: 1, down: 1, left: 0, right: 0 }},
            { x: 2, y: 1, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 2, y: 2, type: 'mountain', rotation: 90, connections: { up: 0, down: 1, left: 1, right: 0 }},
            { x: 2, y: 3, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 2, y: 4, type: 'mountain', rotation: 90, connections: { up: 0, down: 1, left: 1, right: 0 }},
        ],
        // Row 3
        [
            { x: 3, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 3, y: 1, type: 'empty',  connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 3, y: 2, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 3, y: 3, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 3, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
        ],
        // Row 4
        [
            { x: 4, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 4, y: 1, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 4, y: 2, type: 'oasis', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 4, y: 3, type: 'mountain', rotation: 270, connections: { up: 1, down: 0, left: 0, right: 1 }},
            { x: 4, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
        ],
    ]
    ,
    [
        // Row 0
        [
            { x: 0, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 0, y: 1, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 0, y: 2, type: 'bridge', rotation: 90, connections: { up: 0, down: 0, left: 1, right: 1 }},
            { x: 0, y: 3, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0}},
            { x: 0, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
        ],
        // Row 1
        [
            { x: 1, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 1, y: 1, type: 'mountain', rotation: 0 , connections: { up: 0, down: 1, left: 0, right: 1 }},
            { x: 1, y: 2, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 1, y: 3, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 1, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
        ],
        // Row 2
        [
            { x: 2, y: 0, type: 'bridge', rotation: 0, connections: { up: 1, down: 1, left: 0, right: 0 }},
            { x: 2, y: 1, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 2, y: 2, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 2, y: 3, type: 'mountain', rotation: 270 ,connections: { up: 1, down: 0, left: 0, right: 1 }},
            { x: 2, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
        ],
        // Row 3
        [
            { x: 3, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 3, y: 1, type: 'empty',  connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 3, y: 2, type: 'bridge', rotation: 0, connections: { up: 1, down: 1, left: 0, right: 0 }},
            { x: 3, y: 3, type: 'oasis', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 3, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
        ],
        // Row 4
        [
            { x: 4, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 4, y: 1, type: 'mountain', rotation: 180,  connections: { up: 1, down: 0, left: 1, right: 0 }},
            { x: 4, y: 2, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 4, y: 3, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 4, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
        ],
    ]
    
];

const hardMaps = [
    
    [
        [
            { x: 0, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 0, y: 1, type: 'mountain', rotation: 90, connections: { up: 0, down: 1, left: 1, right: 0 }},
            { x: 0, y: 2, type: 'oasis', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 0, y: 3, type: 'oasis', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 0, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 0, y: 5, type: 'bridge', rotation: 90, connections: { up: 0, down: 0, left: 1, right: 1 }},
            { x: 0, y: 6, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }}
        ],
        // Row 1
        [
            { x: 1, y: 0, type: 'bridge',  rotation: 0, connections: { up: 1, down: 1, left: 0, right: 0 }},
            { x: 1, y: 1, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 1, y: 2, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 1, y: 3, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 1, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 1, y: 5, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 1, y: 6, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }}
        ],
        // Row 2
        [
            { x: 2, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 2, y: 1, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 2, y: 2, type: 'bridge',  rotation: 0, connections: { up: 1, down: 1, left: 0, right: 0 }},
            { x: 2, y: 3, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 2, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 2, y: 5, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 2, y: 6, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }}
        ],
        // Row 3
        [
            { x: 3, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 3, y: 1, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 3, y: 2, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 3, y: 3, type: 'mountain', rotation: 270, connections: { up: 1, down: 0, left: 0, right: 1 }},
            { x: 3, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 3, y: 5, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 3, y: 6, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }}
        ],
        // Row 4
        [
            { x: 4, y: 0, type: 'mountain', rotation: 270, connections: { up: 1, down: 0, left: 0, right: 1 }},
            { x: 4, y: 1, type: 'empty', connections: { up: 0, down: 1, left: 1, right: 0 }},
            { x: 4, y: 2, type: 'mountain', rotation: 90, connections: { up: 0, down: 1, left: 1, right: 0 }},
            { x: 4, y: 3, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 4, y: 4, type: 'bridge', rotation: 90, connections: { up: 0, down: 0, left: 1, right: 1 }},
            { x: 4, y: 5, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 4, y: 6, type: 'oasis', connections: { up: 0, down: 0, left: 0, right: 0 }}
        ],
        [
            { x: 5, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 5, y: 1, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 5, y: 2, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 5, y: 3, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 5, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 5, y: 5, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 5, y: 6, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }}
        ],
        [
            { x: 6, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 6, y: 1, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 6, y: 2, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 6, y: 3, type: 'bridge',rotation: 90, connections: { up: 0, down: 0, left: 1, right: 1}},
            { x: 6, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 6, y: 5, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 6, y: 6, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }}
        ]
    ]
    ,
    [
        [
            { x: 0, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 0, y: 1, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 0, y: 2, type: 'oasis', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 0, y: 3, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 0, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 0, y: 5, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 0, y: 6, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }}
        ],
        // Row 1
        [
            { x: 1, y: 0, type: 'bridge',  rotation: 0, connections: { up: 1, down: 1, left: 0, right: 0 }},
            { x: 1, y: 1, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 1, y: 2, type: 'bridge', rotation: 90,  connections: { up: 0, down: 0, left: 1, right: 1 }},
            { x: 1, y: 3, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 1, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 1, y: 5, type: 'mountain', rotation: 180 ,connections: { up: 1, down: 0, left: 1, right: 0 }},
            { x: 1, y: 6, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }}
        ],
        // Row 2
        [
            { x: 2, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 2, y: 1, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 2, y: 2, type: 'bridge',  rotation: 90, connections: { up: 0, down: 0, left: 1, right: 1 }},
            { x: 2, y: 3, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 2, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 2, y: 5, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 2, y: 6, type: 'bridge', rotation: 0, connections: { up: 1, down: 1, left: 0, right: 0 }}
        ],
        // Row 3
        [
            { x: 3, y: 0, type: 'mountain', rotation: 0,  connections: { up: 0, down: 1, left: 0, right: 1 }},
            { x: 3, y: 1, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 3, y: 2, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 3, y: 3, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 3, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 3, y: 5, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 3, y: 6, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }}
        ],
        // Row 4
        [
            { x: 4, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 4, y: 1, type: 'oasis', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 4, y: 2, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 4, y: 3, type: 'mountain', rotation: 90 , connections: { up: 0, down: 1, left: 1, right: 0 }},
            { x: 4, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 4, y: 5, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 4, y: 6, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }}
        ],
        [
            { x: 5, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 5, y: 1, type: 'mountain', rotation: 0 , connections: { up: 0, down: 1, left: 0, right: 1 }},
            { x: 5, y: 2, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 5, y: 3, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 5, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 5, y: 5, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 5, y: 6, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }}
        ],
        [
            { x: 6, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 6, y: 1, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 6, y: 2, type: 'oasis', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 6, y: 3, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0}},
            { x: 6, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 6, y: 5, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 6, y: 6, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }}
        ]
    ]
    ,
    [
        [
            { x: 0, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 0, y: 1, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 0, y: 2, type: 'bridge', rotation: 90, connections: { up: 0, down: 0, left: 1, right: 1 }},
            { x: 0, y: 3, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 0, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 0, y: 5, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 0, y: 6, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }}
        ],
        // Row 1
        [
            { x: 1, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 1, y: 1, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 1, y: 2, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 1, y: 3, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 1, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 1, y: 5, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 1, y: 6, type: 'bridge', rotation: 0, connections: { up: 1, down: 1, left: 0, right: 0 }}
        ],
        // Row 2
        [
            { x: 2, y: 0, type: 'oasis', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 2, y: 1, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 2, y: 2, type: 'mountain',  rotation: 270, connections: { up: 1, down: 0, left: 0, right: 1 }},
            { x: 2, y: 3, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 2, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 2, y: 5, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 2, y: 6, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }}
        ],
        // Row 3
        [
            { x: 3, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 3, y: 1, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 3, y: 2, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 3, y: 3, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 3, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 3, y: 5, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 3, y: 6, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }}
        ],
        // Row 4
        [
            { x: 4, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 4, y: 1, type: 'oasis', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 4, y: 2, type: 'mountain', rotation: 270 ,connections: { up: 1, down: 0, left: 0, right: 1 }},
            { x: 4, y: 3, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 4, y: 4, type: 'bridge', rotation: 90,  connections: { up: 0, down: 0, left:1 , right: 1 }},
            { x: 4, y: 5, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 4, y: 6, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }}
        ],
        [
            { x: 5, y: 0, type: 'bridge', rotation: 0,  connections: { up: 1, down: 1, left: 0, right: 0 }},
            { x: 5, y: 1, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 5, y: 2, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 5, y: 3, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 5, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 5, y: 5, type: 'mountain', rotation: 90  ,connections: { up: 0, down: 1, left: 1, right: 0 }},
            { x: 5, y: 6, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }}
        ],
        [
            { x: 6, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 6, y: 1, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 6, y: 2, type: 'oasis', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 6, y: 3, type: 'mountain', rotation: 270 , connections: { up: 1, down: 0, left: 0, right: 1}},
            { x: 6, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 6, y: 5, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 6, y: 6, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }}
        ]
    ]
    ,
    [
        [
            { x: 0, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 0, y: 1, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 0, y: 2, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 0, y: 3, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 0, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 0, y: 5, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 0, y: 6, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }}
        ],
        // Row 1
        [
            { x: 1, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 1, y: 1, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 1, y: 2, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 1, y: 3, type: 'bridge', rotation: 0, connections: { up: 1, down: 1, left: 0, right: 0 }},
            { x: 1, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 1, y: 5, type: 'mountain', rotation: 180 ,connections: { up: 1, down: 0, left: 1, right: 0 }},
            { x: 1, y: 6, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }}
        ],
        // Row 2
        [
            { x: 2, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 2, y: 1, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 2, y: 2, type: 'mountain', rotation: 270 , connections: { up: 1, down: 0, left: 0, right: 1 }},
            { x: 2, y: 3, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 2, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 2, y: 5, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 2, y: 6, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }}
        ],
        // Row 3
        [
            { x: 3, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 3, y: 1, type: 'bridge', rotation: 90 , connections: { up: 0, down: 0, left: 1, right: 1 }},
            { x: 3, y: 2, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 3, y: 3, type: 'oasis', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 3, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 3, y: 5, type: 'bridge', rotation: 90 , connections: { up: 0, down: 0, left: 1, right: 1 }},
            { x: 3, y: 6, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }}
        ],
        // Row 4
        [
            { x: 4, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 4, y: 1, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 4, y: 2, type: 'mountain', rotation: 180 , connections: { up: 1, down: 0, left: 1, right: 0 }},
            { x: 4, y: 3, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 4, y: 4, type: 'mountain', rotation: 90 , connections: { up: 0, down: 1, left: 1, right: 0 }},
            { x: 4, y: 5, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 4, y: 6, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }}
        ],
        [
            { x: 5, y: 0, type: 'bridge', rotation: 0,  connections: { up: 1, down: 1, left: 0, right: 0 }},
            { x: 5, y: 1, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 5, y: 2, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 5, y: 3, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 5, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 5, y: 5, type: 'mountain', rotation: 270  ,connections: { up: 1, down: 0, left: 0, right: 1 }},
            { x: 5, y: 6, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }}
        ],
        [
            { x: 6, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 6, y: 1, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 6, y: 2, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 6, y: 3, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0}},
            { x: 6, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 6, y: 5, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 6, y: 6, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }}
        ]
    ]
    ,
    [
        [
            { x: 0, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 0, y: 1, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 0, y: 2, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 0, y: 3, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 0, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 0, y: 5, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 0, y: 6, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }}
        ],
        // Row 1
        [
            { x: 1, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 1, y: 1, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 1, y: 2, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 1, y: 3, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 1, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 1, y: 5, type: 'mountain', rotation: 0 ,connections: { up: 0, down: 1, left: 0, right: 1 }},
            { x: 1, y: 6, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }}
        ],
        // Row 2
        [
            { x: 2, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 2, y: 1, type: 'bridge', rotation: 90 , connections: { up: 0, down: 0, left: 1, right: 1 }},
            { x: 2, y: 2, type: 'bridge', rotation: 90 , connections: { up: 0, down: 0, left: 1, right: 1 }},
            { x: 2, y: 3, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 2, y: 4, type: 'mountain', rotation: 90 , connections: { up: 0, down: 1, left: 1, right: 0 }},
            { x: 2, y: 5, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 2, y: 6, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }}
        ],
        // Row 3
        [
            { x: 3, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 3, y: 1, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 3, y: 2, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 3, y: 3, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 3, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 3, y: 5, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 3, y: 6, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }}
        ],
        // Row 4
        [
            { x: 4, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 4, y: 1, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 4, y: 2, type: 'mountain', rotation: 0 , connections: { up: 0, down: 1, left: 0, right: 1 }},
            { x: 4, y: 3, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 4, y: 4, type: 'oasis', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 4, y: 5, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 4, y: 6, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }}
        ],
        [
            { x: 5, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 5, y: 1, type: 'mountain', rotation: 180 ,connections: { up: 1, down: 0, left: 1, right: 0 }},
            { x: 5, y: 2, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 5, y: 3, type: 'bridge', rotation: 0 , connections: { up: 1, down: 1, left: 0, right: 0 }},
            { x: 5, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 5, y: 5, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 5, y: 6, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }}
        ],
        [
            { x: 6, y: 0, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 6, y: 1, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 6, y: 2, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 6, y: 3, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0}},
            { x: 6, y: 4, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 6, y: 5, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }},
            { x: 6, y: 6, type: 'empty', connections: { up: 0, down: 0, left: 0, right: 0 }}
        ]
    ]
];


// Global variable to hold the selected tile type
let selectedTileType = null;

// Add event listeners to palette tiles
document.querySelectorAll('.palette-tile').forEach(tile => {
    tile.addEventListener('click', (event) => {
        // Get the type of the selected tile
        selectedTileType = event.target.dataset.type;

        // Highlight the selected tile
        document.querySelectorAll('.palette-tile').forEach(t => t.classList.remove('selected'));
        event.target.classList.add('selected');
    });
});

// Populate the game board and enable rotation on placed tiles
function populateBoard(map) {
    const gameBoard = document.querySelector("#gameBoard");
    gameBoard.innerHTML = '';  // Clear the board before populating
    const gameMap = deepCopyMap(map);  // Deep copy the map to avoid modifying the original

    gameMap.forEach((row, rowIndex) => {
        const tableRow = document.createElement("tr");  // Create a table row for each map row

        row.forEach((cell, cellIndex) => {
            const tableCell = document.createElement("td");  // Create a table cell for each map cell
            tableCell.classList.add("board-cell");

            const img = document.createElement("img");
            img.src = ELEMENT_IMAGES[cell.type];  // Set image source based on cell type

            // Apply the initial rotation if defined
            const initialRotation = cell.rotation || 0;
            img.style.transform = `rotate(${initialRotation}deg)`;
            cell.rotation = initialRotation;  // Ensure rotation property is initialized

            tableCell.appendChild(img);  // Add image to table cell
            cell.isPalettePlaced = cell.type === 'empty';  // Initialize the `isPalettePlaced` flag if not already present

            // Function to rotate a tile by 90 degrees, only for rails
            function rotateTile(image, cell) {
                if (cell.type === 'straight_rail' || cell.type === 'curve_rail') {
                    // Increment rotation by 90 degrees
                    cell.rotation = (cell.rotation + 90) % 360;
                    image.style.transform = `rotate(${cell.rotation}deg)`;
                    updateConnectionsBasedOnRotation(cell);

                    console.log(`Rotated tile at (${cell.x}, ${cell.y}) to ${cell.rotation} degrees with type ${cell.type}`);
                    console.log(`Updated connections for tile at (${cell.x}, ${cell.y}):`, cell.connections);
                    areElementsConnected(gameMap);
                }
            }

            // Main function for handling tile placement and rotation
            function placeOrRotateTile() {
                if (selectedTileType) {
                    const isEmptyTile = cell.type === 'empty';
                    const isBridgeTile = cell.type === 'bridge';
                    const isMountainTile = cell.type === 'mountain';
                    const isNormalRail = (cell.type === 'straight_rail' || cell.type === 'curve_rail');

                    let canPlaceTile = false;
                    let underlyingRotation = cell.rotation;

                    // Determine if the selected tile type can be placed based on cell type
                    if (selectedTileType === 'straight_rail' || selectedTileType === 'curve_rail') {
                        canPlaceTile = isEmptyTile || isNormalRail;
                    } else if (selectedTileType === 'bridge_rail') {
                        canPlaceTile = isBridgeTile;
                    } else if (selectedTileType === 'mountain_rail') {
                        canPlaceTile = isMountainTile;
                    }

                    if (canPlaceTile) {
                        img.src = ELEMENT_IMAGES[selectedTileType];
                        cell.type = selectedTileType;
                        img.style.transform = `rotate(${underlyingRotation}deg)`;  // Retain initial rotation
                        cell.rotation = underlyingRotation;
                        cell.isPalettePlaced = true;
                        updateConnectionsBasedOnRotation(cell);

                        // Ensure only one rotation event listener is active for this cell
                        tableCell.onclick = () => rotateTile(img, cell);

                        // Check if the game ends after each tile placement
                        if (checkGameEnd(gameMap)) {
                            endGame();
                        }
                    } else {
                        console.log("Tile cannot be placed here");
                    }

                    // Save the game state after each placement or rotation
                    const currentMap = deepCopyMap(gameMap);
                    const playerName = document.querySelector("#nameInput").value.trim();
                    const selectedDifficulty = document.querySelector(".difficulty-btn.active")?.getAttribute("data-difficulty");
                    const currentElapsedTime = Math.floor((Date.now() - gameStartTime) / 1000);
                    saveGameStateAfterMove(currentMap, playerName, selectedDifficulty, currentElapsedTime);
                }
            }

            // Single click for placement or rotation
            tableCell.addEventListener('click', placeOrRotateTile);

            tableRow.appendChild(tableCell);  // Add cell to row
        });

        gameBoard.appendChild(tableRow);  // Add row to the game board
    });
}

function updateConnectionsBasedOnRotation(cell) {
    const { type, rotation } = cell;
    
    if (type === 'straight_rail') {
        // Straight rail alternates between two configurations
        if (rotation % 180 === 0) {
            cell.connections = { up: 1, down: 1, left: 0, right: 0 }; // Connects vertically
        } else {
            cell.connections = { up: 0, down: 0, left: 1, right: 1 }; // Connects horizontally
        }
    } else if (type === 'curve_rail') {
        // Curve rail has four distinct rotations
        switch (rotation % 360) {
            case 0:
                cell.connections = { up: 0, down: 1, left: 0, right: 1 }; // Down and right
                break;
            case 90:
                cell.connections = { up: 0, down: 1, left: 1, right: 0 }; // Down and left
                break;
            case 180:
                cell.connections = { up: 1, down: 0, left: 1, right: 0 }; // Up and left
                break;
            case 270:
                cell.connections = { up: 1, down: 0, left: 0, right: 1 }; // Up and right
                break;
        }
    }
}


let playerName;
let selectedDifficulty;

loadGameState()


// Difficulty button logic
document.querySelectorAll(".difficulty-btn").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".difficulty-btn").forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
    });
});

// Restart Game button logic
restartBtn.addEventListener("click", () => {
    // Hide game page and show menu
    isRestarting = true;
    localStorage.removeItem("gameState");
    isGameOver = false;
    resetTimer();
    gamePage.classList.add("hidden");
    menuPage.classList.remove("hidden");
    isRestarting = false;
});


function areElementsConnected(map) {
    const rows = map.length;
    const cols = map[0].length;

    // Loop through each cell in the map
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = map[i][j];

            // Skip oasis cells
            if (cell.type === 'oasis') {
                continue;
            }

            console.log(`\nChecking cell at (${i}, ${j}) with type: ${cell.type}, connections:`, cell.connections);
            let connected = false; // Initialize as false for each cell

            // Check left connection
            if (cell.connections['left'] === 1) {
                if (j > 0 && map[i][j - 1].connections['right'] === 1) {
                    connected = true;
                    console.log(`  Valid left connection to (${i}, ${j - 1}) with type: ${map[i][j - 1].type}`);
                } else {
                    console.log(`  Invalid left connection at (${i}, ${j - 1}) or boundary reached.`);
                    return false; // Immediately return false if a connection is invalid
                }
            }

            // Check right connection
            if (cell.connections['right'] === 1) {
                if (j < cols - 1 && map[i][j + 1].connections['left'] === 1) {
                    connected = true;
                    console.log(`  Valid right connection to (${i}, ${j + 1}) with type: ${map[i][j + 1].type}`);
                } else {
                    console.log(`  Invalid right connection at (${i}, ${j + 1}) or boundary reached.`);
                    return false; // Immediately return false if a connection is invalid
                }
            }

            // Check up connection
            if (cell.connections['up'] === 1) {
                if (i > 0 && map[i - 1][j].connections['down'] === 1) {
                    connected = true;
                    console.log(`  Valid up connection to (${i - 1}, ${j}) with type: ${map[i - 1][j].type}`);
                } else {
                    console.log(`  Invalid up connection at (${i - 1}, ${j}) or boundary reached.`);
                    return false; // Immediately return false if a connection is invalid
                }
            }

            // Check down connection
            if (cell.connections['down'] === 1) {
                if (i < rows - 1 && map[i + 1][j].connections['up'] === 1) {
                    connected = true;
                    console.log(`  Valid down connection to (${i + 1}, ${j}) with type: ${map[i + 1][j].type}`);
                } else {
                    console.log(`  Invalid down connection at (${i + 1}, ${j}) or boundary reached.`);
                    return false; // Immediately return false if a connection is invalid
                }
            }

            // Check if the cell is connected
            if (!connected) {
                console.log(`  Disconnected rail tile found at (${i}, ${j}) with type: ${cell.type}`);
                return false; // Return false if the current cell is not connected
            } else {
                console.log(`  Cell at (${i}, ${j}) with type: ${cell.type} is connected`);
            }
        }
    }

    console.log("All rail tiles are connected.");
    endGame()
    return true; // Return true if all tiles are connected
}


function areAllValidRailPositionsFilled(map) {
    for (let row of map) {
        for (let cell of row) {
            const isValidRailPosition = (cell.type === 'mountain' || cell.type === 'bridge' || cell.type === 'empty');
            // Check if the valid rail position is not filled
            if (isValidRailPosition && (cell.type !== 'straight_rail' && cell.type !== 'curve_rail')) {
                // console.log("Game is still ongoing: A valid rail position is not filled."); // Debugging log
                return false; // Game is still ongoing
            }
        }
    }

    console.log("All valid rail positions are filled."); // Debugging log
    return true; // All valid rail positions are filled
}

function checkGameEnd(map) {

    if ( areAllValidRailPositionsFilled(map))
    {
        console.log("position are fileed")
        if ( areElementsConnected(map))
        {
            console.log("Game has ended successfully!"); 
            
            return true;
        }
        console.log("still not connected")
    }    
    return false; 

   
}



// Select the Reset button
const resetButton = document.querySelector(".reest");

// Add click event listener to the Reset button
resetButton.addEventListener("click", () => {
    // Clear the entire local storage
    clearLeaderboard();
    document.getElementById("leaderboardPage").classList.add("hidden");
    menuPage.classList.remove("hidden");
    

    console.log("Local storage has been reset.");
});


// Function to deep copy the map
function deepCopyMap(originalMap) {
    return JSON.parse(JSON.stringify(originalMap));
}

// Function to start the timer
function startTimer() {
    timerDisplay.innerText = "Time: 0:00"; // Reset display
    let elapsedTime = 0; // Time in seconds

    timerInterval = setInterval(() => {
        elapsedTime++;
        
        // Calculate minutes and seconds
        const minutes = Math.floor(elapsedTime / 60);
        const seconds = elapsedTime % 60;

        // Format time as MM:SS
        timerDisplay.innerText = `Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // Add leading zero for seconds
    }, 1000); // Update every second
}

// Function to stop the timer
function stopTimer() {
    clearInterval(timerInterval); // Stop the timer
}

// Function to format time from seconds to MM:SS
function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // Format to MM:SS
}

// Function to reset the timer display
function resetTimer() {
    stopTimer(); // Ensure any running timer is stopped
    elapsedTime = 0; // Reset elapsed time
    timerDisplay.innerText = "Time: 0:00"; // Reset display to initial state
}

// Global variable to hold leaderboard data
let leaderboardData = {};

// Function to load leaderboard data from localStorage
function loadLeaderboard() {
    const storedData = localStorage.getItem('leaderboardData');
    if (storedData) {
        leaderboardData = JSON.parse(storedData);
    } else {
        // Initialize leaderboardData if not found in storage
        leaderboardData = {
            "5x5": [],
            "7x7": []
        };
    }
}

// Function to display the leaderboard
function showLeaderboard(difficulty) {
    loadLeaderboard(); // Ensure data is up-to-date

    const leaderboardBody = document.getElementById("leaderboardBody");
    leaderboardBody.innerHTML = ''; // Clear existing entries

    // Check if leaderboard data exists for the selected difficulty
    if (!leaderboardData[difficulty]) {
        leaderboardData[difficulty] = []; // Initialize as empty array if it doesn't exist
    }

    // Sort by time (ascending)
    leaderboardData[difficulty].sort((a, b) => a.time - b.time);

    leaderboardData[difficulty].forEach((entry, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${entry.name}</td>
            <td>${formatTime(entry.time)}</td>
        `;
        leaderboardBody.appendChild(row);
    });

    // Update leaderboard title and show it
    const leaderboardTitle = document.getElementById("leaderboardTitle");
    leaderboardTitle.innerText = `${difficulty} Leaderboard`;
    document.getElementById("leaderboardPage").classList.remove("hidden");
    gamePage.classList.add("hidden");

    // Reset the timer if applicable
    resetTimer();
}


// Save the score to the leaderboard, avoiding duplicates
function saveScore(playerName, completionTime) {
    loadLeaderboard(); // Ensure leaderboardData is loaded

    if (!selectedDifficulty) {
        console.log("Error: Difficulty level not selected.");
        return;
    }

    // Initialize leaderboard data for the difficulty level if it doesn't exist
    if (!leaderboardData[selectedDifficulty]) {
        leaderboardData[selectedDifficulty] = [];
    }

    // Check for an existing entry with the same player name and completion time
    const existingEntry = leaderboardData[selectedDifficulty].some(entry => 
        entry.name === playerName && entry.time === completionTime
    );

    // Only add the score if it's not already present
    if (!existingEntry) {
        leaderboardData[selectedDifficulty].push({ name: playerName, time: completionTime });
        // Save the updated leaderboard data to localStorage
        localStorage.setItem('leaderboardData', JSON.stringify(leaderboardData));
        console.log("Leaderboard data saved:", leaderboardData);
    } else {
        console.log("Duplicate entry detected. Score not added.");
    }
}

// Function to load leaderboard data from local storage
function loadLeaderboard() {
    const storedData = localStorage.getItem('leaderboardData');
    if (storedData) {
        leaderboardData = JSON.parse(storedData);
    }
}

// Function to clear the leaderboard data
function clearLeaderboard() {
    localStorage.removeItem('leaderboardData');
    leaderboardData = { '5x5': [], '7x7': [] }; // Reset the leaderboard data in memory
    
}

// Modify endGame function to show the appropriate leaderboard
function endGame() {
    isGameOver = true;
    const completionTime = Math.floor((Date.now() - gameStartTime) / 1000); // Time in seconds
    //playerName = document.querySelector("#nameInput").value.trim();
    //const selectedDifficulty = document.querySelector(".difficulty-btn.active")?.getAttribute("data-difficulty");

    console.log("Game has ended");
    localStorage.removeItem('gameState');

    // Save the score
    saveScore(playerName, completionTime);

    // Show completion time on the congratulations screen
    document.querySelector("#playerNameDisplay").textContent = playerName;
    document.querySelector("#completionTime").textContent = formatTime(completionTime);

    // Hide game page and show the congratulations page
    gamePage.classList.add("hidden");
    document.querySelector("#congratulationsPage").classList.remove("hidden");

    
}



// Event listener for returning to the menu from the leaderboard
document.querySelector("#backToMenuBtn").addEventListener("click", () => {
    resetTimer();
    document.getElementById("leaderboardPage").classList.add("hidden");
    menuPage.classList.remove("hidden");
});




// Saving the current game state to localStorage
function saveGameStateAfterMove(currentMap, playerName, selectedDifficulty, currentElapsedTime) {
    if (!isGameOver && !isRestarting) {
        // Proceed with saving the game state
        console.log("Saving game state...");
        const gameState = {
            map: currentMap,
            playerName: playerName,
            difficulty: selectedDifficulty,
            elapsedTime: currentElapsedTime,
        };
        localStorage.setItem("gameState", JSON.stringify(gameState));
    } else {
        console.log("Game state not saved due to game over or restart state.");
    }
}


// Load game state from localStorage
function loadGameState() {
    const savedState = localStorage.getItem('gameState');
    if (savedState) {
        const { map, playerName: savedPlayerName, difficulty, elapsedTime } = JSON.parse(savedState);

        // Update the player info in the header
        document.querySelector("#playerInfo").textContent = `Player: ${savedPlayerName}, Difficulty: ${difficulty}`;
        console.log(difficulty)
        selectedDifficulty = difficulty
        playerName = savedPlayerName
        console.log(savedPlayerName)
        // Populate the game board directly
        populateBoard(map); // Restore the board with the saved map

        // Adjust the game start time based on saved elapsed time
        gameStartTime = Date.now() - (elapsedTime * 1000); // Adjust the game start time
        startTimer(); // Restart the timer with the restored time

        // Show the game page directly without going back to the menu
        menuPage.classList.add("hidden");
        rulesPage.classList.add("hidden");
        gamePage.classList.remove("hidden");

        // alert("Game loaded successfully!");
    } else {
        console.log("No saved game state found.");
    }
}


// Show Leaderboard button logic
document.querySelector("#showLeaderboardBtn").addEventListener("click", () => {
    //const selectedDifficulty = document.querySelector(".difficulty-btn.active")?.getAttribute("data-difficulty");
    showLeaderboard(selectedDifficulty); // Show the correct leaderboard
    document.getElementById("congratulationsPage").classList.add("hidden"); // Hide congratulations page
});



