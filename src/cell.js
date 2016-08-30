const Region = require('./region.js')

/**
 * A cell representing the unit of a Sudoku grid.
 */
class Cell {

    constructor(value, row, column, subgrid) {
        if (typeof value !== 'number') { throw new TypeError('value must be a number') }
        if (value < 0 || value > 9) { throw new RangeError() }

        this._value = value
        this._candidates = []

        if (typeof row === 'undefined') { throw new Error('row parameter is required') }
        if (typeof column === 'undefined') { throw new Error('column parameter is required') }
        if (typeof subgrid === 'undefined') { throw new Error('subgrid parameter is required') }

        if (!(row instanceof Region)) { throw new TypeError('row must be an instance of Region') }
        if (!(column instanceof Region)) { throw new TypeError('column must be an instance of Region') }
        if (!(subgrid instanceof Region)) { throw new TypeError('subgrid must be an instance of Region') }

        this._row = row
        this._column = column
        this._subgrid = subgrid
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
    get candidates() {
        return this._candidates
    }

    /**
     * @returns {Region} Gets the region representing the cell's row.
     */
    get row() {
        return this._row
    }

    /**
     * @returns {Region} Gets the region representing the cell's column.
     */
    get column() {
        return this._column
    }

    /**
     * @returns {Region} Gets the region representing the cell's subgrid.
     */
    get subgrid() {
        return this._subgrid
    }

}

module.exports = Cell
