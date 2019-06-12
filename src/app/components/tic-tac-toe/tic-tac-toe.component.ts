import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { Game } from '../../utilities/game';
import { Ai } from '../../utilities/ai';
import { State } from '../../utilities/state';
import { AiService } from '../../services/ai.service';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent implements OnInit {
  game: Game;
  ai: Ai;
  public tableIsVisible = false;
  public aiSymbol = 'O';
  public playerSymbol = 'X';  

  constructor(private utils: UtilService, private action: AiService) { }

  ngOnInit() {
  }

  setPlayerSymbol(symbol: string): void {
    const turn = this._getTurn(symbol);
    this._setSymbols(symbol);

    this.tableIsVisible = true;
    let ai = new Ai(this.utils, this.action);
    this.game = new Game(ai, turn, this.playerSymbol, this.aiSymbol, this.utils);
    ai.plays(this.game);

    this.game.start();
  }

  makeAMove(event: any, index: number) {
    const element = event.target;
    if (
      this.game.status === 'running' &&
      this.game.currentState.turn === 'player' &&
      !element.innerHTML
    ) {
      const next = new State(this.game.currentState);
      next.board[index] = 'player';
      this.utils.insertAt(index, this.game.playerSymbol);
      next.nextTurn();
      this.game.advanceTo(next);
    }
  }

  restart() {
    this.tableIsVisible = false;
    this.utils.clearTheTable();
  }

  _getTurn(symbol: string) {
    return symbol === 'X' ? 'player' : 'ai';
  }

  _setSymbols(symbol: string) {
    if (symbol === 'X') {
      this.playerSymbol = 'X';
      this.aiSymbol = 'O';
    } else {
      this.playerSymbol = 'O';
      this.aiSymbol = 'X';
    }
  }

}
