import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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
  @Input() highScore:number


  ngOnInit(): void {
    // fetching data from store
    this.score$ = this.store.select(getScore);
  }
}
