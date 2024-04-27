import React, { Component } from 'react';
import { Text, View, Button, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default class TicTacToe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: Array(9).fill(''),
            currentPlayer: 'X',
            winner: null,
            scoreX: 0,
            scoreO: 0
        };
    }

    checkWinner = () => {
        const board = this.state.board;
        const winningLines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (let i = 0; i < winningLines.length; i++) {
            const [a, b, c] = winningLines[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                this.setState({ winner: board[a] }, () => {
                    if (board[a] === 'X') {
                        this.setState(prevState => ({ scoreX: prevState.scoreX + 1 }));
                    } else {
                        this.setState(prevState => ({ scoreO: prevState.scoreO + 1 }));
                    }
                });
                return;
            }
        }
        if (!board.includes('')) {
            this.setState({ winner: 'draw' });
        }
    }

    handlePress = (index) => {
        if (this.state.board[index] === '' && !this.state.winner) {
            let newBoard = this.state.board.slice();
            newBoard[index] = this.state.currentPlayer;
            this.setState({ board: newBoard, currentPlayer: this.state.currentPlayer === 'X' ? 'O' : 'X' }, () => {
                this.checkWinner();
            });
        }
    }

    renderSquare = (index) => {
        return (
            <TouchableOpacity style={styles.square} onPress={() => this.handlePress(index)}>
                <Text style={styles.squareText}>{this.state.board[index]}</Text>
            </TouchableOpacity>
        );
    }

    resetGame = () => {

        this.setState({ board: Array(9).fill(''), winner: null });


        const nextPlayer = this.state.currentPlayer === 'X' ? 'O' : 'X';
        this.setState({ currentPlayer: nextPlayer });
    }

    render() {
        return (

            <View style={styles.container}>
                <Image style={styles.bg} source={require('../assets/bg.png')} />
                <Text style={styles.title}>Крестики-Нолики</Text>

                <View style={styles.board}>
                    <View style={styles.row}>
                        {this.renderSquare(0)}
                        {this.renderSquare(1)}
                        {this.renderSquare(2)}
                    </View>
                    <View style={styles.row}>
                        {this.renderSquare(3)}
                        {this.renderSquare(4)}
                        {this.renderSquare(5)}
                    </View>
                    <View style={styles.row}>
                        {this.renderSquare(6)}
                        {this.renderSquare(7)}
                        {this.renderSquare(8)}
                    </View>
                </View>
                {
                    this.state.winner && (
                        <Text style={styles.result}>
                            {this.state.winner === 'draw' ? 'Ничья' : `${this.state.winner} победил!`}
                        </Text>
                    )
                }
                {!this.state.winner && <Text style={styles.turn}>{`Сейчас ходит: ${this.state.currentPlayer}`}</Text>}
                <Text style={styles.turn}>{`Счет: X - ${this.state.scoreX}, O - ${this.state.scoreO}`}</Text>
                <Button
                    title="Перезапустить"
                    onPress={this.resetGame}
                />

            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bg: {
        zIndex: -10,
        width: '100%',
        height: '50%',
        position: "absolute",
        marginBottom: 50
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    board: {

        borderColor: 'red',
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
    },
    square: {
        width: 80,
        height: 80,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    squareText: {
        fontSize: 24,
    },
    result: {
        fontSize: 20,
        marginBottom: 10,
    },
    turn: {
        fontSize: 16,
        marginBottom: 10,
    },
});
