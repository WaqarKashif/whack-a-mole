import { createReducer, on } from '@ngrx/store';
import { decrement, increment, reset } from './score.actions';
import { initialState } from './score.state';

const _scoreReducer = createReducer(
    initialState,
    on(increment, (state) => {
        return {
            ...state,
            score: state.score + 1,
        };
    }),
    on(decrement, (state) => {
        return {
            ...state,
            score: state.score - 1,
        };
    }),
    on(reset, (state) => {
        return {
            ...state,
            score: 0,
        };
    })
);

export function scoreReducer(state, action) {
    return _scoreReducer(state, action);
}
