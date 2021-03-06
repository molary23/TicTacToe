let cells = document.querySelectorAll(".cell"),
  toss = document.querySelector(".start-toss"),
  turn = document.querySelector(".turn"),
  gameBody = document.querySelector(".game-body"),
  player1 = "",
  player2 = "",
  playing = 0,
  p1 = 0,
  p2 = 0,
  checkArray = [],
  one = document.querySelector("#cell-one"),
  two = document.querySelector("#cell-two"),
  three = document.querySelector("#cell-three"),
  four = document.querySelector("#cell-four"),
  five = document.querySelector("#cell-five"),
  six = document.querySelector("#cell-six"),
  seven = document.querySelector("#cell-seven"),
  eight = document.querySelector("#cell-eight"),
  nine = document.querySelector("#cell-nine"),
  selectTileP1 = document.querySelector(".selectTileP1"),
  selectedTileP1 = document.querySelector(".selectedTileP1"),
  selectTileP2 = document.querySelector(".selectTileP2"),
  selectedTileP2 = document.querySelector(".selectedTileP2"),
  selectXO = document.querySelectorAll(".selectXO"),
  restart = document.querySelector(".restart"),
  p1_score = document.querySelector(".p1-score"),
  p2_score = document.querySelector(".p2-score"),
  gameArray = [
    [one, two, three],
    [one, five, nine],
    [one, four, seven],
    [two, five, eight],
    [four, five, six],
    [seven, eight, nine],
    [three, five, seven],
    [three, six, nine],
  ],
  oneIn = one.innerHTML,
  twoIn = two.innerHTML,
  threeIn = three.innerHTML,
  fourIn = four.innerHTML,
  fiveIn = five.innerHTML,
  sixIn = six.innerHTML,
  sevenIn = seven.innerHTML,
  eightIn = eight.innerHTML,
  nineIn = nine.innerHTML,
  tileArray = [
    [oneIn, twoIn, threeIn],
    [oneIn, fiveIn, nineIn],
    [oneIn, fourIn, sevenIn],
    [twoIn, fiveIn, eightIn],
    [fourIn, fiveIn, sixIn],
    [sevenIn, eightIn, nineIn],
    [threeIn, fiveIn, sevenIn],
    [threeIn, sixIn, nineIn],
  ];

toss.addEventListener("click", function () {
  let check = Math.floor(Math.random() * 10 + 1);
  if (check % 2 === 0) {
    playing = 1;
    selectTileP1.classList.remove("hidden");
    alert("Player One starts");
  } else {
    playing = 2;
    selectTileP2.classList.remove("hidden");
    alert("Player two starts");
  }
});
p2_score.innerHTML = p2;
p1_score.innerHTML = p1;

cells.forEach((cell) => {
  cell.addEventListener("click", function (e) {
    let item = cell.getAttribute("id");
    if (playing === 0) {
      alert("Toss first");
    } else if (player1 === "" || player2 === "") {
      alert("Choose a Tile between X or O");
    } else if (cell.innerHTML !== "") {
      alert("Choose another Cell please");
    } else {
      if (playing === 1) {
        cell.innerHTML = player1;
        turn.innerHTML = `Player 2's turn`;
        elm = placeItem(item, player1);
        playing = 2;
      } else {
        cell.innerHTML = player2;
        turn.innerHTML = `Player 1's turn`;
        elm = placeItem(item, player2);
        playing = 1;
      }
      let win = false;
      if (elm === player1) {
        win = true;
        alert(`Player 1 wins`);
        gameBody.classList.add("game-over");
        p1 += 1;
        p1_score.innerHTML = p1;
      } else if (elm === player2) {
        win = true;
        alert(`Player 2 wins`);
        gameBody.classList.add("game-over");
        p2 += 1;
        p2_score.innerHTML = p2;
      }
    }
    let boardArray = [
      one.innerHTML,
      two.innerHTML,
      three.innerHTML,
      four.innerHTML,
      five.innerHTML,
      six.innerHTML,
      seven.innerHTML,
      eight.innerHTML,
      nine.innerHTML,
    ];

    if (boardArray.every((elm) => elm !== "") && !win) {
      alert("Game Over! No winner! Please Restart");
      gameBody.classList.add("game-over");
    }
  });
});

const allEqual = (arr) => arr.every((elm) => elm === arr[0]);
const checkEmpty = (array) => array.every((elm) => elm !== "");
const check_board = (arrays) => {
  let winner = null;
  if (checkEmpty(arrays)) {
    if (allEqual(arrays)) {
      winner = arrays[0];
    }
  }
  return winner;
};

const placeItem = (item, play) => {
  let element = null;
  for (let i = 0; i < gameArray.length; i++) {
    for (let j = 0; j < gameArray[i].length; j++) {
      if (gameArray[i][j].getAttribute("id") == item) {
        tileArray[i][j] = play;
      }
    }
    element = check_board(tileArray[i]);
    if (element !== null) {
      return element;
      break;
    }
  }
};

const resetBoard = () => {
  one.innerHTML = "";
  two.innerHTML = "";
  three.innerHTML = "";
  four.innerHTML = "";
  five.innerHTML = "";
  six.innerHTML = "";
  seven.innerHTML = "";
  eight.innerHTML = "";
  nine.innerHTML = "";

  tileArray = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  selectedTileP1.innerHTML = "";
  selectedTileP2.innerHTML = "";
};

restart.addEventListener("click", function () {
  resetBoard();
});

if (selectXO) {
  selectXO.forEach((sXO) => {
    sXO.addEventListener("click", function () {
      let playerParent = this.parentElement,
        parentClass = playerParent.getAttribute("class"),
        playerTile = this.innerHTML,
        arrayTile = ["X", "O"],
        leftOver = arrayTile.filter((e) => {
          return e !== playerTile;
        });
      playerParent.classList.add("hidden");
      if (parentClass === "selectTileP1") {
        player1 = playerTile;
        player2 = leftOver[0];
      } else if (parentClass === "selectTileP2") {
        player2 = playerTile;
        player1 = leftOver[0];
      }
      selectedTileP1.innerHTML = player1;
      selectedTileP2.innerHTML = player2;
    });
  });
}
