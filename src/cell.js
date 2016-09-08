const assert = require('assert')

const Region = require('./region.js')

/**
 * A cell representing the unit of a Sudoku grid.
 */
class Cell {

    constructor(value) {
        if (typeof value !== 'number') { throw new TypeError('value must be a number') }
        if (value < 0 || value > 9) { throw new RangeError() }

        this._value = value

        this.possible_values = null
        if (value === 0) {
            this.possible_values = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        }

        this.row = null
        this.column = null
        this.subgrid = null
    }

    /**
     * @returns {number} Gets the cell's value.
     */
    get value() {
        return this._value
    }

    /**
     * @description Sets the cell's value.
     */
    set value(value) {
        if (typeof value !== 'number') { throw new TypeError('value must be a number') }
        if (value < 1 || value > 9) { throw new RangeError('value must be within the 1 to 9 range') }
        this._value = value
    }

    /**
     * @returns {number} Gets whether the cell has a value or not.
     */
    get has_value() {
        return this._value !== 0
    }

    /**
     * @description Reads all numbers in the row, column and subgrid to compute the possible values of a cell.
     * @returns {number[]} Gets the cell's possible values.
     */
    compute_candidates() {
        if (this.has_value) { throw new Error('This cell has already a value') }

        let self = this

        function eliminate(cell) {
            if (cell === self) { return }
            if (self.possible_values.length === 0) { return }

            let cell_index = self.possible_values.indexOf(cell.value)
            if (cell.has_value && cell_index !== -1) {
                self.possible_values.splice(cell_index, 1)
            }
        }

        this.row.forEach(eliminate)
        this.column.forEach(eliminate)
        this.subgrid.forEach(eliminate)

        assert.strictEqual(this.possible_values.length > 0, true)

        return this.possible_values
    }

}

module.exports = Cell
