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
        this.cells = []
        for (let index = 0; index < (9 * 9); index++) {
            this.cells.push(new Cell(_grid[index]))
        }

        for (let index = 0; index < 9; index++) {
            let row = Region.computeSiblings(this.cells, index, RegionStrategy.Row)
            let column = Region.computeSiblings(this.cells, index, RegionStrategy.Column)
            let subgrid = Region.computeSiblings(this.cells, index, RegionStrategy.Subgrid)

            row.forEach(cell => {
                cell.row = row.reduce((siblings, sibling) => {
                    if (cell !== sibling) { siblings.push(sibling) }
                    return siblings
                }, [])
            })
            column.forEach(cell => {
                cell.column = column.reduce((siblings, sibling) => {
                    if (cell !== sibling) { siblings.push(sibling) }
                    return siblings
                }, [])
            })
            subgrid.forEach(cell => {
                cell.subgrid = subgrid.reduce((siblings, sibling) => {
                    if (cell !== sibling) { siblings.push(sibling) }
                    return siblings
                }, [])
            })
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

    /**
     * @returns {{ solved: boolean, iterations: number, sudoku: Cell[]}} The solved grid.
     */
    solve() {
        let solved = false
        let iterations = []

        while (!solved && iterations.length < 100) {
            solved = true
            iterations.push(this.cells.map(cell => new Cell(cell.value)))

            for (let index = 0; index < this.cells.length; index++) {
                let cell = this.cells[index]
                if (cell.has_value) { continue }

                cell.compute_candidates()

                if (cell.possible_values.length === 1) {
                    cell.value = cell.possible_values[0]
                    continue
                }

                solved = false
            }
        }

        return {
            solved,
            iterations: iterations.length,
            steps: iterations,
            sudoku: this.cells
        }
    }

}

module.exports = Grid
