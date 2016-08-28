const Grid = require('./grid.js')

/**
 * A solver for a 9x9 Sudoku grid.
 */
class Solver {

    /**
     * @param {Grid} grid A Grid object.
     */
    constructor(grid) {
        if (!(grid instanceof Grid)) {
            throw new TypeError('grid must be an instance of Grid')
        }

        this.grid = grid
        this.possible_values = this.initializePossibleValues()
    }

    initializePossibleValues() {
        let possible_values = []

        for (let row = 0; row < 9; row++) {
            for (let column = 0; column < 9; column++) {
                possible_values[(row * 9) + column] = this.grid.getPossibleValues((row * 9) + column)
            }
        }

        return possible_values
    }

    /**
     * @returns {number[]} The solved grid.
     */
    solve() {
        let sudoku = this.grid.grid
        let solved = false
        let iteration = 0

        while (!solved) {
            solved = true
            iteration++

            for (let index = 0; index < 81; index++) {
                if (sudoku[index] !== 0) { continue }

                let possible_values = this.grid.getPossibleValues(index)

                if (possible_values.length === 1) {
                    sudoku[index] = possible_values[0]
                } else if (possible_values.length > 1) {
                    solved = false
                }
            }
        }

        return sudoku
    }

}

module.exports = Solver
