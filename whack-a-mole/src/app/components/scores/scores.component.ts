import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { ScoreState } from 'src/app/models/scoreState.interface';
import { getScore } from 'src/app/state/score.selcetors';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoresComponent implements OnInit {
  constructor(private store: Store<ScoreState>) { }

  // Initializing observable
  score$: Observable<any>;
  highScore:number = 0;

  gethighScore() {
    this.highScore = Number(localStorage.getItem("highScore"));
  }
  ngOnInit(): void {
    // fetching data from store
    this.score$ = this.store.select(getScore);
  }
}
