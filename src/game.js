import React from 'react';
import Board from './board';
import calculateWinner from './helpers/calculateWinner';



/*
var player = prompt('Выбери игрока Х или О \n(цифра 0 - Х, цифра 1 = О)', '');

var k = 0;
var j = 1;

function players (k,j) {
    if (player == k){
        alert('Вы выбрали Х')
    }else {
        alert('Вы не выбрали фигурку')
    }
    if(player == j) {
        alert('Вы выбрали О')
    }else {
        return;
    }
}
*/




export default class Game extends React.Component {
    constructor() {
        super();

        this.state = {
            xIsNext: true,
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0
        };
    }

    handleClick(i) {
        const {xIsNext, history} = this.state;
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = xIsNext ? 'X' : 'O';

        this.setState({
            history: history.concat([{ squares }]),
            xIsNext: !xIsNext,
            stepNumber: ++this.state.stepNumber
        });
    }

    paintMoves() {
        return this.state.history.map((step, move) => {
            const desc = move ? ('Ход #' + move) : 'Начало игры';

            return(
              <li key = {move}>
                  <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
              </li>
            );
        });
    }

    jumpTo(step) {
        this.setState({
           stepNumber: step,
            xIsNext: (step % 2) ? false : true
        });
    }


    render() {
        const {xIsNext, stepNumber, history} = this.state;
        const current = history[stepNumber];
        const winner = calculateWinner(current.squares);

        let status;

        if (winner) {
            status = 'Победили: ' + winner;
            alert('Победили ' + winner);
        } else {

            status = 'Следующий ход: ' + (xIsNext ? 'X' : 'O');

        }




        return(
          <div className="game">
                <div className="game-board">
                   <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                   />
                </div>
              <div className="game-info">
                  <div>{status}</div>
                  <ul>{this.paintMoves()}</ul>
              </div>
          </div>
        );
    }
}

