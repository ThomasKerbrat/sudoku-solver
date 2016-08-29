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
        this.possible_values
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

                this.possible_values = this.grid.getPossibleValues(index)

                if (this.possible_values.length === 1) {
                    sudoku[index] = this.possible_values[0]
                } else if (this.possible_values.length > 1) {
                    solved = false
                }
            }
        }

        return sudoku
    }

}

module.exports = Solver
