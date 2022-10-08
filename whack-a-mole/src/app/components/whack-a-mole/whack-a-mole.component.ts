import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Mole } from 'src/app/models/mole.interface';
import { ScoreState } from '../../models/scoreState.interface';
import { decrement, increment, reset } from '../../state/score.actions';
import { getScore } from 'src/app/state/score.selcetors';


@Component({
  selector: 'app-whack-a-mole',
  templateUrl: './whack-a-mole.component.html',
  styleUrls: ['./whack-a-mole.component.scss'],
})
export class WhackAMoleComponent implements OnInit {
  constructor(private store: Store<{ score: ScoreState }>) { 
  }

  ngOnInit() { 
    this.setHighScore();
  }

  // Initializing

  isStart: boolean = false;
  lastHole: any;
  timeUp: boolean = false;
  currentTime: number = 30;
  timer;
  highScore:number = 0;
  currentScore:number = 0;

  moleList: Mole[] = [
    { id: 1, showing: false, whacked: false },
    { id: 2, showing: false, whacked: false },
    { id: 3, showing: false, whacked: false },
    { id: 4, showing: false, whacked: false },
    { id: 5, showing: false, whacked: false },
    { id: 6, showing: false, whacked: false },
  ];

  // Starting Function

  startGame() {
    this.isStart = true;
    this.currentTime = 30;
    this.timeLeft();
    this.peep();
    this.onReset();
    this.lastHole = 0;
    this.timeUp = false;
  }

  // Supporting functions
  randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === this.lastHole) {
      return this.randomHole(holes);
    }
    this.lastHole = hole;

    return hole;
  }

  // main functionality

  // Showing the mole

  peep() {
    const time = this.randomTime(1000, 3000);
    const hole = this.randomHole(this.moleList);
    hole.showing = true;

    setTimeout(() => {
      if (hole.showing == true) {
        if (hole.whacked == false) {
          this.onDecrement();
        } else {
          hole.whacked = false;
        }
      }
      hole.showing = false;

      if (!this.timeUp) this.peep();
    }, time);
  }

  // Countdown timer function
  timeLeft() {
    this.timer = setInterval(() => {
      this.currentTime--;

      if (this.currentTime == 0) {
        this.gameEnd();
      }
    }, 1000);
  }


  gameEnd() {
    this.isStart = false;
    this.timeUp = true;
    clearInterval(this.timer);
    this.store.select(getScore).subscribe((data)=> {
      this.currentScore = data;
    })

    if(this.currentScore >= this.highScore ) {
      this.highScore = this.currentScore;
      this.setHighScore();
      this.gethighScore();
    }
  }

  // Whacking function

  whack(mole) {
    if (mole.showing) {
      this.onIncrement();
      mole.showing = false;
      mole.whacked = true;
    }
  }

  //Ngrx Function for state managment

  onIncrement() {
    this.store.dispatch(increment());
  }

  onDecrement() {
    this.store.dispatch(decrement());
  }

  onReset() {
    this.store.dispatch(reset());
  }


   setHighScore() {
    localStorage.setItem("highScore",this.highScore.toString());
  }

  gethighScore() {
    this.highScore = Number(localStorage.getItem("highScore"));
  }
}
