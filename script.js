const board = document.getElementById("board");
const statusText = document.getElementById("status");
const xScore = document.getElementById("xScore");
const oScore = document.getElementById("oScore");
const clickSound = document.getElementById("clickSound");
const winSound = document.getElementById("winSound");
const toggleBtn = document.getElementById("toggleTheme");

let turn = "X";
let gameOver = false;
let score = { X: 0, O: 0 };

toggleBtn.onclick = () => {
  document.body.classList.toggle("dark");
};

function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => handleClick(cell));
    board.appendChild(cell);
  }
}

function handleClick(cell) {
  if (cell.textContent || gameOver) return;
  clickSound.play();
  cell.textContent = turn;
  cell.classList.add(turn.toLowerCase());
  checkWin();
  turn = turn === "X" ? "O" : "X";
  if (!gameOver) statusText.textContent = `Turn: ${turn}`;
}

function checkWin() {
  const cells = document.querySelectorAll(".cell");
  const winCond = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (let [a, b, c] of winCond) {
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      gameOver = true;
      const clickClone = clickSound.cloneNode();
      clickClone.play();
      cells[a].style.background = cells[b].style.background = cells[c].style.background = "#a2f2a2";
      statusText.textContent = `${cells[a].textContent} Wins!`;
      score[cells[a].textContent]++;
      updateScore();
      return;
    }
  }

  if ([...cells].every(cell => cell.textContent)) {
    statusText.textContent = "Draw!";
    gameOver = true;
  }
}

function updateScore() {
  xScore.textContent = score.X;
  oScore.textContent = score.O;
}

function resetGame() {
  turn = "X";
  gameOver = false;
  statusText.textContent = "Turn: X";
  createBoard();
}

createBoard();
