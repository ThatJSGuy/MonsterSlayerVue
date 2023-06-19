function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      battleLog: [],
      currentRound: 0,
      winner: null,
      restartButton: false,
    };
  },

  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        //A draw
        this.winner = 'draw'
        this.restartButton = true;
      }else if (value <= 0) {
        // Player lost
        this.winner = 'monster';
        this.playerHealth = 0;
        this.restartButton = true;
      }

    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        //a draw
        this.winner = 'draw'
        this.restartButton = true;
      }else if (value <= 0) {
        //Monster lost
        this.winner = 'player'
        this.monsterHealth = 0;
        this.restartButton = true;
      }


    }
  },
  
  computed: {
    monsterHPStyle() {
      return {width: this.monsterHealth + '%'}
    },
    playerHPStyle() {
      return {width: this.playerHealth + '%'}
    }
  },
    methods: {
    restartGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.winner = null;
      this. currentRound = 0;
      this.restartButton = false;
      this.battleLog = [];
    },
      surrender() {
      this.winner = 'monster';
      this.restartButton = true;
        this.battleLog.push('You surrender..')
      },
      attackMonster()
      {
        const attackValue = getRandomValue(5, 12);
        this.monsterHealth -= attackValue;
        this.attackPlayer()
        this.currentRound++;
        this.battleLog.push('You attack the Monster for ' + attackValue + ' damage!')
      },

      attackPlayer()
      {
        const attackValue = getRandomValue(8, 15);
        this.playerHealth -= attackValue;
        this.battleLog.push('The Monster attacks you for ' + attackValue + ' damage!')
      },
      specialAttack(){
        const attackValue = getRandomValue(10, 25);
        this.monsterHealth -= attackValue;
        this.attackPlayer();
        this.currentRound++;
        this.battleLog.push('You use your special  attack for ' + attackValue + ' damage!')
      },

      healPlayer() {
        const healValue = getRandomValue(5, 20);
        if (this.playerHealth + healValue > 100) {
          this.playerHealth = 100;
        }else{
          this.playerHealth += healValue;
        };
        this.battleLog.push('You heal yourself for ' + healValue + ' HP!');
        this.currentRound++;
      }
    },
});

app.mount("#game");
