function openingCeremony(race) {
  let counter = 3;
  const intervalId = setInterval(() => {
    console.log(`The event is going to start in ${counter}`);
    counter--;
    if (counter === 0) {
      clearInterval(intervalId);
      const scoreBoard = {
        red: 0,
        green: 0,
        blue: 0,
        yellow: 0,
      };
      console.log("The first event is 100m race!");
      race(scoreBoard, longJump);
    }
  }, 1000);
}
function race100m(score, longJump) {
  setTimeout(() => {
    const raceScores = {
      red: Math.floor(Math.random() * 10 + 1),
      green: Math.floor(Math.random() * 10 + 1),
      blue: Math.floor(Math.random() * 10 + 1),
      yellow: Math.floor(Math.random() * 10 + 1),
    };
    const results = Object.entries(raceScores).sort((a, b) => a[1] - b[1]);
    score[results[0][0]] += 100;
    score[results[1][0]] += 50;
    score[results[2][0]] += 25;
    console.log("winner of 100m race: ", results[0][0]);
    console.log("1st runnerup of 100m race: ", results[1][0]);
    console.log("Score Board: ", score);
    longJump(score, highJump);
  }, 3000);
}
function longJump(score, highJump) {
  const candidates = ["red", "green", "blue", "yellow"];
  console.log("The long jump event!");
  setTimeout(() => {
    const winner = Math.floor(Math.random() * 4);
    console.log("winner of long jump event: ", candidates[winner]);
    score[candidates[winner]] += 50;
    console.log("Score Board: ", score);
    highJump(score, awardCeremony);
  }, 2000);
}
function highJump(score, awardCeremony) {
  console.log("This is high jump event!");
  const valid = ["red", "green", "blue", "yellow"];
  const winner = window.prompt("who is the winner of High Jump!");
  if (winner && valid.includes(winner.toLowerCase())) {
    score[winner.toLowerCase()] += 25;
    console.log("Winner of high jump: ", winner.toUpperCase());
    console.log("score board: ", score);
  } else {
    console.log("Invalid input or event cancelled; no points awarded.");
  }
  awardCeremony(score);
}
function awardCeremony(score) {
  console.log("Award Ceremony!");
  setTimeout(() => {
    const positionBoard = Object.entries(score).sort((a, b) => b[1] - a[1]);
    console.log("Winner: ", positionBoard[0][0]);
    console.log("2nd position: ", positionBoard[1][0]);
    console.log("3rd position: ", positionBoard[2][0]);
    console.log("Score Board: ", score);
  }, 2000);
}
openingCeremony(race100m);
