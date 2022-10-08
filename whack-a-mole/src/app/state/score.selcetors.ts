import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ScoreState } from '../models/scoreState.interface';

export const SCORE_STATE_NAME = 'score';

const getScoreState = createFeatureSelector<ScoreState>(SCORE_STATE_NAME);

export const getScore = createSelector(getScoreState, (state) => {
    return state.score;
});
