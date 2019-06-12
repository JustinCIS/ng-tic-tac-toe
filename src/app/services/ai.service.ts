import { Injectable } from '@angular/core';
import { State } from '../utilities/state';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  public movePosition: number;
  public minimaxVal: number;

  constructor() { }

  ascending(firstAction, secondAction): number {
    if (firstAction.minimaxVal < secondAction.minimaxVal) {
      return -1;
    } else if (firstAction.minimaxVal > secondAction.minimaxVal) {
        return 1;
    } else {
      return 0;
    }
  }

  descending(firstAction, secondAction): number {
    if (firstAction.minimaxVal > secondAction.minimaxVal) {
      return -1;
    } else if (firstAction.minimaxVal < secondAction.minimaxVal) {
      return 1;
    } else {
      return 0;
    }
  }

  applyTo(state: State) {
    const next = new State(state);
    next.board[this.movePosition] = state.turn;

    if (state.turn === 'ai') {
      next.oMovesCount++;
    }

    next.nextTurn();
    return next;
  }
}
