import { Game } from './game';
import { UtilService } from '../services/util.service';
import { State } from './state';
import { AiService } from '../services/ai.service';

export class Ai {
  game: Game;

  constructor(private utils: UtilService, private action: AiService) { }

  _minimaxValue(state: State) {
    if (state.isVictory()) {
      return Game.score(state);
    } else {
      let stateScore: number;

      if (state.turn === 'player') {
        stateScore = -1000;
      } else {
        stateScore = 1000;
      }

      let availablePositions = state.emptyCells();
      let availableNextStates = availablePositions.map((position: number) => {
        this.action.movePosition = position;
        const nextState = this.action.applyTo(state);
        return nextState;
      });

      availableNextStates.forEach((nextState: State) => {
        const nextScore = this._minimaxValue(nextState);
        if (state.turn === 'player') {
          if (nextScore > stateScore) {
            stateScore = nextScore;
          }
        } else {
          if (nextScore < stateScore) {
            stateScore = nextScore;
          }
        }
      });

      return stateScore;
    }
  }

  plays(_game: Game) {
    this.game = _game;
  };

  notify(turn: string): void {
    this.makeAMove(turn);
  };

  makeAMove(turn: string): void {
    let available = this.game.currentState.emptyCells();
    let availableActions = this._getAvailableActions(available);

    if (turn === 'player') {
      availableActions.sort(this.action.descending);
    } else {
      availableActions.sort(this.action.ascending);
    }

    let chosenAction = availableActions[0];
    let next = chosenAction.applyTo(this.game.currentState);
    this.utils.insertAt(chosenAction.movePosition, this.game.aiSymbol);
    this.game.advanceTo(next);
  }

  _getAvailableActions(available) {
    return available.map((position: number) => {
      this.action.movePosition = position;
      let next = this.action.applyTo(this.game.currentState);
      this.action.minimaxVal = this._minimaxValue(next);
      return this.action;
    });
  }
}
