let totalStages = 0;
let currentStage = 0;
let playerTotalScore = 0;
let computerTotalScore = 0;
let gameMode = ''; // Untuk menentukan mode permainan: 'computer' atau 'player2'
const choices = ["rock", "paper", "scissors"];

// Fungsi untuk memulai game setelah user memasukkan total stage
function startGame() {
    totalStages = parseInt(document.getElementById("stage-input").value);
    
    if (isNaN(totalStages) || totalStages <= 0) {
        alert("Please enter a valid number of stages!");
        return;
    }

    // Reset stage dan skor
    currentStage = 0;
    playerTotalScore = 0;
    computerTotalScore = 0;

    // Menampilkan elemen-elemen yang disembunyikan
    document.getElementById("rival-option").style.display = "flex";
    document.getElementById("game-option").style.display = "none"; // Menyembunyikan game options dulu
    playStage();
}

// Fungsi aturan permainan
function rules(player1, player2) {
    if (player1 === player2) {
        return { player1Score: 0, player2Score: 0 };
    }

    const winningCombos = {
        rock: "scissors",
        paper: "rock",
        scissors: "paper"
    };

    if (winningCombos[player1] === player2) {
        return { player1Score: 1, player2Score: 0 };
    } else {
        return { player1Score: 0, player2Score: 1 };
    }
}

// Fungsi untuk memulai stage baru
function playStage() {
    if (currentStage >= totalStages) {
        // Menampilkan hasil akhir setelah permainan selesai
        let winner = playerTotalScore > computerTotalScore ? 'You' : (playerTotalScore < computerTotalScore ? 'Computer' : 'No one');
        let message = `Game Over! \nFinal Score: \nYou: ${playerTotalScore} - Computer: ${computerTotalScore}\nWinner: ${winner}`;
        
        alert(message);
        
        // Menampilkan tombol untuk mulai permainan baru
        if (confirm("Do you want to play again?")) {
            location.reload(); // Restart game
        }
        return;
    }
    currentStage++;
    alert(`Stage ${currentStage} of ${totalStages}`);
}

// Fungsi untuk memulai permainan melawan komputer atau pemain 2
function chooseRival(rival) {
    gameMode = rival;
    document.getElementById("rival-option").style.display = "none"; // Sembunyikan pilihan rival
    document.getElementById("game-option").style.display = "flex"; // Tampilkan pilihan game
}

// Event listener untuk tombol "Enter"
document.getElementById("start-button").addEventListener("click", startGame);

// Event listener untuk memilih antara komputer atau player 2
document.getElementById("play-computer").addEventListener("click", function() {
    chooseRival('computer');
});
document.getElementById("play-player2").addEventListener("click", function() {
    chooseRival('player2');
});

// Event listener untuk tombol pilihan
document.querySelectorAll("#game-option button").forEach(button => {
    button.addEventListener("click", function () {
        if (currentStage >= totalStages) {
            alert("Game is over! Restart to play again.");
            return;
        }

        let playerChoice = this.querySelector("img").alt;
        let opponentChoice = '';

        if (gameMode === 'computer') {
            opponentChoice = choices[Math.floor(Math.random() * choices.length)];
        } else {
            // Untuk Player 2, asumsi ada input dari pemain 2
            opponentChoice = prompt("Player 2, please choose (rock, paper, scissors):");
            if (!choices.includes(opponentChoice)) {
                alert("Invalid choice! Please choose rock, paper, or scissors.");
                return;
            }
        }

        let result = rules(playerChoice, opponentChoice);

        // Update skor total
        playerTotalScore += result.player1Score;
        computerTotalScore += result.player2Score;

        alert(`You chose ${playerChoice}, Your opponent chose ${opponentChoice}.\nScore - You: ${playerTotalScore}, Opponent: ${computerTotalScore}`);

        playStage();
    });
});
