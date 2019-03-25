import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {

  processSquare() {
    this.props.updateSquare(this.props.number);
    this.props.changeSymbol();
  }
  
  render() {
    return (
      <button className="square" onClick={() => this.processSquare()}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null)
    };
    this.updateSquare = this.updateSquare.bind(this);
  }

  renderSquare(i) {
    return (
      <Square
        number={i}
        value={this.state.squares[i]}
        current={this.props.current}
        changeSymbol={this.props.changeSymbol}
        updateSquare={this.updateSquare}
      />
    );
  }

  updateSquare(i) {
    let squares = this.state.squares.slice();

    if (this.checkGameStatus() || squares[i]) return;

    squares[i] = this.props.current;

    this.setState({ squares: squares });
    this.props.history.push({ squares });    
  }

  checkGameStatus() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      if (this.state.squares[a] && this.state.squares[a] === this.state.squares[b] && this.state.squares[a] === this.state.squares[c]) {
        return this.state.squares[a];
      }
    }
    return null;
  }

  render() {
    let next = (this.props.current === "X") ? "O" : "X";

    let status = `Next player: ${next}`;

    const winner = this.checkGameStatus();

    if (winner) {
      status = `Congrats! The winner is ${winner}!`;
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      current: "X",
      history: [{
        squares: Array(9).fill(null)
      }]
    }
    this.changeSymbol = this.changeSymbol.bind(this);
  }

  changeSymbol() {
    if (this.state.current === "X") {
      this.setState({ current: "O" });
    } else {
      this.setState({ current: "X" });
    }
  }

  render() {
    let player = (this.state.current !== "X") ? 2 : 1;

    let historyButtons = this.state.history.map((board) => {
      
    })

    return (
      <div className="game">
        <div className="game-board">
          <Board
            current={this.state.current}
            changeSymbol={this.changeSymbol}
            history={this.state.history}
          />
        </div>
        <div className="game-info">
          <div>{`It is Player ${player}'s turn. (You are ${
            this.state.current
          })`}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
