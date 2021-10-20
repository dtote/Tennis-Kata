// HELPERS
// No estoy seguro de si deberia poner estos objetos como atributos o sacarlos de la clase
const scoreTable = {
  0: 'Love-All',
  1: 'Fifteen-All',
  2: 'Thirty-All',
  default: 'Deuce'
};

const gameStatus = {
  '-1': 'Advantage player2',
  1: 'Advantage player1',
  overTwo: 'Win for player1',
  default: 'Win for player2'
};

const scoreTypes = {
  0: 'Love',
  1: 'Fifteen',
  2: 'Thirty',
  3: 'Forty'
};

// TennisGame1 Class
class TennisGame1 {
  constructor(firstPlayer, secondPlayer) {
    this.firstPlayer = {
      name: firstPlayer,
      score: 0
    };

    this.secondPlayer = {
      name: secondPlayer,
      score: 0
    };

  }

  increaseScore(player) {
    player.score++;
  }

  getGameStatus(minusResult) {
    const foundKey = Object.keys(gameStatus).find((key) => key == minusResult);

    if (foundKey) {
      return gameStatus[foundKey];
    }
    return (minusResult >= 2) ? gameStatus.overTwo : gameStatus.default;
  }

  getOtherwiseCaseScore() {
    let score = '';
    let tempScore = 0;

    for (let pos = 1; pos < 3; pos++) {
      if (pos === 1) tempScore = this.firstPlayer.score;
      else {
        score += '-';
        tempScore = this.secondPlayer.score;
      }
      score += scoreTypes[tempScore];
    }
    return score;
  }

  wonPoint(playerName) {
    const isFirstPlayer = (playerName === 'player1');
    this.getOtherwiseCaseScore();
    isFirstPlayer ? this.increaseScore(this.firstPlayer) : this.increaseScore(this.secondPlayer);
  }

  computeScore() {
    const firstPlayerScore = this.firstPlayer.score;
    const secondPlayerScore = this.secondPlayer.score;

    const isDraw = firstPlayerScore === secondPlayerScore;
    const isSomeoneScoreAbove4 = firstPlayerScore >= 4 || secondPlayerScore >= 4;
    const drawCaseScore = (firstPlayerScore > 2) ? scoreTable.default : scoreTable[firstPlayerScore];

    return (isDraw) ? drawCaseScore
      : (isSomeoneScoreAbove4) ? this.getGameStatus(firstPlayerScore - secondPlayerScore)
        : this.getOtherwiseCaseScore();
  }

  getScore() {
    const score = this.computeScore();

    return score;
  }

}

module.exports = TennisGame1;
