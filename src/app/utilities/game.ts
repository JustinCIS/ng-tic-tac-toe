import { State } from './state';
import { UtilService } from '../services/util.service';

export class Game {
  public ai: any;
  public currentState: State;
  public status: string;
  public playerSymbol: string;
  public aiSymbol: string;

  static score(_state: State): number {
    if (_state.status === 'player is the winner!') {
      return 10 - _state.oMovesCount;
    } else if (_state.status === 'player is the winner!') {
      return - 10 + _state.oMovesCount;
    } else {
      return 0;
    }
  }

  constructor(
    autoPlayer: any,
    turn: string,
    playerSymbol: string,
    aiSymbol: string,
    private utils: UtilService
  ) {
    this.ai = autoPlayer;
    this.currentState = new State();
    this.currentState.board = [
      '', '', '',
      '', '', '',
      '', '', ''
    ];
    this.playerSymbol = playerSymbol;
    this.aiSymbol = aiSymbol;
    this.currentState.turn = turn;
    this.status = 'begining';
  }

  advanceTo(_state: State): void {
    this.currentState = _state;
    if (_state.isVictory()) {
      this.status = 'ended';
      this.utils.displayMessage(_state.status);
    } else {
      if (this.currentState.turn === 'ai') {
        this.ai.notify('ai');
      }
    }
  }

  start() {
    if (this.status = 'beginning') {
      this.advanceTo(this.currentState);
      this.status = 'running';
    }
  }
}
