const assert = require('chai').assert

const Region = require('./region.js')
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
        for (let index = 0; index < _grid.length; index++) {
            this._cells.push(new Cell(_grid[index]))
        }

        // Create three collections of regions for the rows, columns, and subgrids.
        this._rows = []
        this._columns = []
        this._subgrids = []

        for (let index = 0; index < 9; index++) {
            this._rows.push(new Region(this._cells, index, Grid.RowStrategy))
            this._columns.push(new Region(this._cells, index, Grid.ColumnStrategy))
            this._subgrids.push(new Region(this._cells, index, Grid.SubgridStrategy))
        }

        this.grid = _grid
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

    // region Strategies

        /**
         * @returns {number} The next grid index for a row.
         */
        static RowStrategy(region_index, cell_index) {
            return (region_index * 9) + cell_index + 1
        }

        /**
         * @returns {number} The next grid index for a column.
         */
        static ColumnStrategy(region_index, cell_index) {
            return region_index + ((cell_index + 1) * 9)
        }

        /**
         * @returns {number} The next grid index for a row.
         */
        static SubgridStrategy(region_index, cell_index) { // 4, 2
            let index = Math.floor(region_index / 3) * 27
            index += region_index % 3 * 3
            index += Math.floor((cell_index + 1) / 3) * 9
            index += (cell_index + 1) % 3
            return index
        }

    // endregion

    /**
     * @return {Cell[]} Gets the grid's cells.
     */
    get cells() {
        return this._cells
    }

    /**
     * @description Reads all numbers in the square, row and column to compute the possible values of a cell.
     * @param {number} index The index of a cell in the grid, from 0 up to 80 included.
     * @returns {number[]} An array of all possible value for the requested cell.
     */
    getPossibleValues(index) {
        let values = [1, 2, 3, 4, 5, 6, 7, 8, 9]

        // Removes all values in the { from: values } array that are present in the { present_in: array } array.
        function removeValues({ from: values, present_in: array }) {
            for (let index = 0; index < array.length && values.length > 0; index++) {
                let _number = array[index]
                if (_number === 0) { continue }

                let value_index
                if ((value_index = values.indexOf(_number)) !== -1) {
                    values.splice(value_index, 1)
                }
            }
        }

        removeValues({
            from: values,
            present_in: this.getSquare(Grid.getSquareIndexForGridIndex(index))
        })

        if (values.length === 1) { return values }

        removeValues({
            from: values,
            present_in: this.getRow(Grid.getRowIndexForGridIndex(index))
        })

        if (values.length === 1) { return values }

        removeValues({
            from: values,
            present_in: this.getColumn(Grid.getColumnIndexForGridIndex(index))
        })

        assert.notStrictEqual(values.length, 0, '0 possible values')
        return values
    }

}

module.exports = Grid
