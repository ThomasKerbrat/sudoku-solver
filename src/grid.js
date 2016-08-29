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
            }

            _grid = Grid.build_array_from_string(grid)
        } else if (!(grid instanceof Array)) {
            throw new TypeError('grid must be an array')
        }

        if (grid.length !== 81) {
            throw new RangeError('grid must be 81 numbers long')
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

    /**
     * @param {number} row A number between 0 and 8 included.
     * @param {number} column A number between 0 and 8 included.
     * @returns {number} A number representing the start index for a 3x3 sub-grid grid.
     */
    static getStartIndex(row, column) {
        return (row * 27) + (column * 3)
    }

    /**
     * @param {number} grid_index The index of a cell in the grid, from 0 up to 80 included.
     * @returns {number} The sub-grid index for the given grid index.
     */
    static getSubGridIndexForGridIndex(grid_index) {
        return Math.floor(Grid.getRowIndexForGridIndex(grid_index) / 3) * 3 +
            Math.floor(Grid.getColumnIndexForGridIndex(grid_index) / 3)
    }

    /**
     * @param {number} grid_index The index of a cell in the grid, from 0 to 80 included.
     * @returns {number} The row index, from 0 to 8, for the given grid index.
     */
    static getRowIndexForGridIndex(grid_index) {
        return Math.floor(grid_index / 9)
    }

    /**
     * @param {number} grid_index The index of a cell in the grid, from 0 to 80 included.
     * @returns {number} The column index, from 0 to 8, for the given grid index.
     */
    static getColumnIndexForGridIndex(grid_index) {
        return grid_index % 9
    }

    /**
     * @param {number} index A number between 0 and 8 included.
     * @returns {number[]} The sub-grid at index.
     */
    getSubGrid(index) {
        if (typeof index !== 'number') {
            throw new TypeError('index must be a number')
        }

        if (index < 0 || index >= 9) {
            throw new RangeError('index must be >= 0 and < 9')
        }

        let grid_row = Math.floor(index / 3)
        let grid_column = index % 3
        let grid_start_index = Grid.getStartIndex(grid_row, grid_column)

        let sub_grid = []

        for (let i = 0, grid_index = grid_start_index; i < 9; i++ , grid_index++) {
            if (i !== 0 && i % 3 === 0) {
                grid_index += 6
            }

            sub_grid.push(this.grid[grid_index])
        }

        return sub_grid
    }

    /**
     * @param {number} index A number between 0 and 8 included.
     * @returns {number[]} The row at index.
     */
    getRow(index) {
        if (typeof index !== 'number') {
            throw new TypeError('index must be a number')
        }

        if (index < 0 || index >= 9) {
            throw new RangeError('index must be >= 0 and < 9')
        }

        let grid_start_index = index * 9
        let row = []

        for (let grid_index = grid_start_index; grid_index < grid_start_index + 9; grid_index++) {
            row.push(this.grid[grid_index])
        }

        return row
    }

    /**
     * @param {number} index A number between 0 and 8 included.
     * @returns {number[]} The row at index.
     */
    getColumn(index) {
        if (typeof index !== 'number') {
            throw new TypeError('index must be a number')
        }

        if (index < 0 || index >= 9) {
            throw new RangeError('index must be >= 0 and < 9')
        }

        let column = []

        for (let grid_index = index; grid_index < 81; grid_index += 9) {
            column.push(this.grid[grid_index])
        }

        return column
    }

    /**
     * @description Reads all numbers in the sub-grid, row and column to compute the possible values of a cell.
     * @param {number} index The index of a cell in the grid, from 0 up to 80 included.
     * @returns {number[]} An array of all possible value for the requested cell.
     */
    getPossibleValues(index) {
        let values = [1, 2, 3, 4, 5, 6, 7, 8, 9]

        // Removes all values in the { from: values } array that are present in the { present_in: array } array.
        function removeValues({ from: values, present_in: array }) {
            for (var index = 0; index < array.length && values.length > 0; index++) {
                let _number = array[index]
                if (_number === 0) { continue }

                let value_index
                if ((value_index = values.indexOf(_number)) !== -1) {
                    values.splice(value_index, 1)
                }
            }
        }

        let sub_grid = this.getSubGrid(Grid.getSubGridIndexForGridIndex(index))
        removeValues({ from: values, present_in: sub_grid })

        if (values.length === 0) {
            return values
        }

        let grid_row = this.getRow(Grid.getRowIndexForGridIndex(index))
        removeValues({ from: values, present_in: grid_row })

        if (values.length === 0) {
            return values
        }

        let grid_column = this.getColumn(Grid.getColumnIndexForGridIndex(index))
        removeValues({ from: values, present_in: grid_column })

        return values
    }

}

module.exports = Grid
