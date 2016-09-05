const assert = require('chai').assert

const Region = require('./region.js')
const RegionStrategy = require('./region-strategy.js')
const Cell = require('./cell.js')

/**
 * A 9x9 Sudoku grid.
 */
class Grid {

    /**
     * @param {number[]|string} grid An array or a string of 81 numbers representing the Sudoku grid.
     */
    constructor(grid) {
        let _grid = grid

        if (typeof grid === 'string') {
            if (grid.length !== 81) {
                throw new RangeError('grid must be 81 numbers long')
            } else {
                _grid = Grid.build_array_from_string(grid)
            }
        } else if (!(grid instanceof Array)) {
            throw new TypeError('grid must be an array')
        }

        if (grid.length !== 81) {
            throw new RangeError('grid must be 81 numbers long')
        }

        // Instanciate Cells for each number of the grid.
        this._cells = []
        for (let index = 0; index < (9 * 9); index++) {
            this._cells.push(new Cell(_grid[index]))
        }

        // Create three collections of regions for the rows, columns, and subgrids.
        this._rows = []
        this._columns = []
        this._subgrids = []

        for (let index = 0; index < 9; index++) {
            this._rows.push(new Region(this._cells, index, 'row', RegionStrategy.Row))
            this._columns.push(new Region(this._cells, index, 'column', RegionStrategy.Column))
            this._subgrids.push(new Region(this._cells, index, 'subgrid', RegionStrategy.Subgrid))
        }
    }

    /**
     * @param {string} grid_as_a_string All the numbers of the grid represented as a string of 81 characters.
     * @returns {number[]} An array of 81 numbers representing the Sudoku grid.
     */
    static build_array_from_string(grid_as_a_string) {
        return (grid_as_a_string.split('')).map(function (number) {
            let value = Number(number)
            return Number.isNaN(value) ? 0 : value
        })
    }

    get cells() {
        return this._cells
    }

    /**
     * @returns {{ solved: boolean, iterations: number, sudoku: Cell[]}} The solved grid.
     */
    solve() {
        let solved = false
        let iterations = 0

        while (!solved && iterations < 100) {
            solved = true
            iterations++

            this._cells.forEach(function (cell) {
                if (cell.has_value) { return }

                let possible_values = cell.compute_candidates()

                if (possible_values.length === 1) {
                    cell.value = possible_values[0]
                } else if (possible_values.length > 1) {
                    solved = false
                }
            })
        }

        return { solved, iterations, sudoku: this._cells }
    }

}

module.exports = Grid
