const Region = require('./region.js')

/**
 * A cell representing the unit of a Sudoku grid.
 */
class Cell {

    constructor(value) {
        if (typeof value !== 'number') { throw new TypeError('value must be a number') }
        if (value < 0 || value > 9) { throw new RangeError() }

        this._value = value

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
     * @returns {number} Gets whether the cell has a value or not.
     */
    get has_value() {
        return this._value !== 0
    }

    /**
     *@returns {number[]} Gets the cell's possible values.
     */
    compute_candidates() {
        return this._candidates
    }

}

module.exports = Cell
