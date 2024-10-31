// Query selectors for the elements
const menuPage = document.querySelector("#menuPage");
const rulesPage = document.querySelector("#rulesPage");
const gamePage = document.querySelector("#gamePage");
const showRulesBtn = document.querySelector("#showRulesBtn");
const closeRulesBtn = document.querySelector("#closeRulesBtn");
const startGameBtn = document.querySelector("#startGameBtn");
const restartBtn = document.querySelector("#restartBtn");
const warningMessage = document.querySelector("#warningMessage");

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
];



const hardMaps = [
    [
        [{ type: 'empty' }, { type: 'mountain' }, { type: 'oasis' }, { type: 'oasis' }, { type: 'empty' }, { type: 'bridge', rotation: 0 }, { type: 'empty' }],
        [{ type: 'bridge', rotation: 0 }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }],
        [{ type: 'empty' }, { type: 'empty' }, { type: 'bridge', rotation: 0 }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }],
        [{ type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'mountain' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }],
        [{ type: 'mountain' }, { type: 'empty' }, { type: 'mountain' }, { type: 'empty' }, { type: 'bridge', rotation: 90 }, { type: 'empty' }, { type: 'oasis' }],
        [{ type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }],
        [{ type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'bridge', rotation: 90 }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }]
    ]
];

// Function to deep copy the map
function deepCopyMap(originalMap) {
    return JSON.parse(JSON.stringify(originalMap));
}


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
    // Deep copy the map to avoid modifying the original
    const gameMap = deepCopyMap(map);

    gameMap.forEach((row, rowIndex) => {
        const tableRow = document.createElement("tr"); // Create a table row for each map row

        row.forEach((cell, cellIndex) => {
            const tableCell = document.createElement("td"); // Create a table cell for each map cell
            tableCell.classList.add("board-cell");

            const img = document.createElement("img");
            img.src = ELEMENT_IMAGES[cell.type]; // Set image source based on cell type

            // Apply the initial rotation if defined
            const initialRotation = cell.rotation || 0;
            img.style.transform = `rotate(${initialRotation}deg)`;
            cell.rotation = initialRotation; // Ensure rotation property is initialized

            tableCell.appendChild(img); // Add image to table cell

            // Initialize the `isPalettePlaced` flag if not already present
            cell.isPalettePlaced = cell.type === 'empty';

            // Add event listener for placing or replacing a tile in the cell
            tableCell.addEventListener('click', () => {
                if (selectedTileType) {
                    const isEmptyTile = cell.type === 'empty';
                    const isBridgeTile = cell.type === 'bridge';
                    const isMountainTile = cell.type === 'mountain';
                    const isNormalRail = (cell.type === 'straight_rail' || cell.type === 'curve_rail');

                    // Check placement conditions based on selected tile type
                    let canPlaceTile = false;

                    // Determine the rotation of the underlying tile
                    let underlyingRotation = 0;
                    if (isBridgeTile || isMountainTile) {
                        underlyingRotation = cell.rotation; // Get rotation of the underlying tile
                    }

                    if (selectedTileType === 'straight_rail' || selectedTileType === 'curve_rail') {
                        canPlaceTile = isEmptyTile || isNormalRail; // Place on empty tiles or replace normal rails
                    } else if (selectedTileType === 'bridge_rail') {
                        canPlaceTile = isBridgeTile; // Place on bridges
                    } else if (selectedTileType === 'mountain_rail') {
                        canPlaceTile = isMountainTile; // Place on mountains
                    }

                    if (canPlaceTile) {
                        // Set the new tile's rotation to match the underlying tile's rotation
                        img.src = ELEMENT_IMAGES[selectedTileType];
                        cell.type = selectedTileType; // Update map data with the new type
                        img.style.transform = `rotate(${underlyingRotation}deg)`; // Match rotation of underlying tile
                        cell.rotation = underlyingRotation; // Update the rotation property
                        cell.isPalettePlaced = true; // Mark that this cell now has a palette tile
                        updateConnectionsBasedOnRotation(cell);

                        // Log the updated connections for debugging
                        // console.log(`Updated connections for tile at (${cell.row}, ${cell.col}):`, cell.connections);

                        // Enable rotation for placed tiles on empty locations
                        if (isEmptyTile || isNormalRail) {
                            // Add event listener for rotating the rail tile
                            tableCell.addEventListener('click', () => {
                                rotateTile(img, cell);
                            });
                        }
                        // if (checkGameEnd(easyMaps[0])) {
                        //     alert("Congratulations! You have completed the game!");
                        // }
                        // if (!areElementsConnected(easyMaps[0])) {
                        //     console.log("Some tiles are disconnected!");
                        //     // Handle the disconnection logic here (e.g., revert the last move or notify the player)
                        // }
                        console.log(areElementsConnected(gameMap))

                    } 
                    else {
                        // Optional: Handle the case where the tile cannot be placed
                        console.log("Tile cannot be placed here");
                    }
                }
            });

            // Function to rotate a tile by 90 degrees on each click
            function rotateTile(image, cell) {
                // Increment rotation by 90 degrees
                cell.rotation = (cell.rotation + 90) % 360;
                image.style.transform = `rotate(${cell.rotation}deg)`;

                console.log(`Rotated tile at (${cell.row}, ${cell.col}) to ${cell.rotation} degrees`);

                // Update connections based on the new rotation
                updateConnectionsBasedOnRotation(cell);

                // Log the updated connections for debugging
                // console.log(`Updated connections for tile at (${cell.row}, ${cell.col}):`, cell.connections);

                // Optional: Check connections after each rotation
                if (!areElementsConnected(easyMaps[0])) {
                    // console.log("Some tiles are disconnected after rotation!");
                    // Additional disconnection handling logic can go here
                } else {
                    // console.log("All tiles are still connected after rotation.");
                }
            }


            tableRow.appendChild(tableCell); // Add cell to row
        });

        gameBoard.appendChild(tableRow); // Add row to the game board
    });
}





// Start Game button logic
startGameBtn.addEventListener("click", () => {
    const playerName = document.querySelector("#nameInput").value.trim();
    const selectedDifficulty = document.querySelector(".difficulty-btn.active")?.getAttribute("data-difficulty");

    // Set player info in the game page
    document.getElementById('playerInfo').textContent = `Player: ${playerName}, Difficulty: ${selectedDifficulty}`;

    populateBoard(easyMaps[0])
    
    // Hide menu and rules pages, show game page
    menuPage.classList.add("hidden");
    rulesPage.classList.add("hidden");
    gamePage.classList.remove("hidden");

    // Hide the warning message if both fields are filled
    //warningMessage.classList.add("hidden");
});

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
    gamePage.classList.add("hidden");
    menuPage.classList.remove("hidden");
});


function areElementsConnected(map) {
    const visited = new Set();
    let foundValidTile = false; // Track if we found any valid rail tile

    // Check if a tile is a valid rail tile
    const isValidRailTile = (cell) => {
        return (
            cell.type === 'straight_rail' ||
            cell.type === 'curve_rail' ||
            cell.type === 'bridge_rail' ||
            cell.type === 'mountain_rail'
        );
    };

    function dfs(x, y) {
        const key = `${x},${y}`;
        if (visited.has(key)) return; // Already visited
        if (x < 0 || y < 0 || x >= map.length || y >= map[0].length) return; // Out of bounds
        
        const cell = map[x][y];
        // Only consider valid rail tiles
        if (!isValidRailTile(cell)) return;

        visited.add(key);
        foundValidTile = true; // Found at least one valid rail tile

        // Continue DFS on adjacent cells
        dfs(x - 1, y); // up
        dfs(x + 1, y); // down
        dfs(x, y - 1); // left
        dfs(x, y + 1); // right
    }

    // Loop through the entire map to find all valid rail tiles
    for (let x = 0; x < map.length; x++) {
        for (let y = 0; y < map[0].length; y++) {
            const cell = map[x][y];
            if (isValidRailTile(cell)) {
                // Start DFS from the first valid rail tile found
                if (!visited.has(`${x},${y}`)) {
                    dfs(x, y); // Start DFS
                }
            }
        }
    }

    // If no valid tiles were found, treat it as not connected
    if (!foundValidTile) {
        console.log("No valid rail tiles found.");
        return false; // No elements to check connectivity
    }

    // Check if all valid rail tiles were visited
    for (let x = 0; x < map.length; x++) {
        for (let y = 0; y < map[0].length; y++) {
            const cell = map[x][y];
            // Check for unvisited valid rail tiles
            if (isValidRailTile(cell) && !visited.has(`${x},${y}`)) {
                console.log(`Unvisited valid rail tile found: (${x}, ${y})`);
                return false; // Found an unvisited valid rail tile
            }
        }
    }

    console.log("All valid rail tiles are connected.");
    return true; // All valid rail tiles are connected
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
    // First condition: Check if all valid rail positions are filled
    // if (!areAllValidRailPositionsFilled(map)) {
    //     return false; // Game is still ongoing
    // }

    if ( areAllValidRailPositionsFilled(map))
    {
        console.log("position are fileed")
        if ( areElementsConnected(map))
        {
            console.log("Game has ended successfully!"); // Debugging log
            return true;
        }
        console.log("still not connected")
    }
    
    // Second condition: Check if all rails are connected
    // if (!areElementsConnected(map)) {
    //     console.log("Rails are not connected."); // Debugging log
    //     return false; // Rails are not connected
    // }

    
    return false; // All conditions are met
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
