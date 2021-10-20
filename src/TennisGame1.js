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

const tempScoreValues = {
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
    const foundKey = Object.keys(gameStatus).find((entrie) => entrie == minusResult);

    if (foundKey) {
      return gameStatus[foundKey];
    }
    return (minusResult >= 2) ? gameStatus.overTwo : gameStatus.default;
  }

  wonPoint(playerName) {
    const isFirstPlayer = (playerName === 'player1');

    isFirstPlayer ? this.increaseScore(this.firstPlayer) : this.increaseScore(this.secondPlayer);
  }

  getScore() {
    let score = '';
    let tempScore = 0;

    const firstPlayerScore = this.firstPlayer.score;
    const secondPlayerScore = this.secondPlayer.score;

    const isDraw = firstPlayerScore === secondPlayerScore;
    const isSomeoneScoreAbove4 = firstPlayerScore >= 4 || secondPlayerScore >= 4;

    if (isDraw) {
      score = (firstPlayerScore > 2) ? scoreTable.default : scoreTable[firstPlayerScore];
    } else if (isSomeoneScoreAbove4) {

      const minusResult = firstPlayerScore - secondPlayerScore;
      score = this.getGameStatus(minusResult);

    } else {
      for (let i = 1; i < 3; i++) {
        if (i === 1) tempScore = firstPlayerScore;
        else {
          score += '-';
          tempScore = secondPlayerScore;
        }
        score += tempScoreValues[tempScore];
      }
    }
    return score;
  }

}

module.exports = TennisGame1;
