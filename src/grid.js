const assert = require('assert')

/**
 * A 9x9 Sudoku grid.
 */
class Grid {

  /**
   * @param {number[]|string} grid An array or a string of 81 numbers representing the Sudoku grid.
   */
  constructor (grid) {
    let _grid = grid

    if (typeof grid === 'string') {
      if (grid.length !== 81) {
        throw new RangeError('grid must be 81 numbers long')
      }

      _grid = Grid.buildArrayFromString(grid)
    } else if (!(grid instanceof Array)) {
      throw new TypeError('grid must be an array')
    }

    if (grid.length !== 81) {
      throw new RangeError('grid must be 81 numbers long')
    }

    this.grid = _grid
  }

  /**
   * @param {string} gridAsAString All the numbers of the grid represented as a string of 81 characters.
   * @returns {number[]} An array of 81 numbers representing the Sudoku grid.
   */
  static buildArrayFromString (gridAsAString) {
    return (gridAsAString.split('')).map(function (number) {
      let value = Number(number)
      return Number.isNaN(value) ? 0 : value
    })
  }

  /**
   * @param {number} row A number between 0 and 8 included.
   * @param {number} column A number between 0 and 8 included.
   * @returns {number} A number representing the start index for a 3x3 square grid.
   */
  static getStartIndex (row, column) {
    return (row * 27) + (column * 3)
  }

  /**
   * @param {number} gridIndex The index of a cell in the grid, from 0 up to 80 included.
   * @returns {number} The square index for the given grid index.
   */
  static getSquareIndexForGridIndex (gridIndex) {
    return Math.floor(Grid.getRowIndexForGridIndex(gridIndex) / 3) * 3 +
      Math.floor(Grid.getColumnIndexForGridIndex(gridIndex) / 3)
  }

  /**
   * @param {number} gridIndex The index of a cell in the grid, from 0 to 80 included.
   * @returns {number} The row index, from 0 to 8, for the given grid index.
   */
  static getRowIndexForGridIndex (gridIndex) {
    return Math.floor(gridIndex / 9)
  }

  /**
   * @param {number} gridIndex The index of a cell in the grid, from 0 to 80 included.
   * @returns {number} The column index, from 0 to 8, for the given grid index.
   */
  static getColumnIndexForGridIndex (gridIndex) {
    return gridIndex % 9
  }

  /**
   * @param {number} index A number between 0 and 8 included.
   * @returns {number[]} The square at index.
   */
  getSquare (index) {
    if (typeof index !== 'number') {
      throw new TypeError('index must be a number')
    }

    if (index < 0 || index >= 9) {
      throw new RangeError('index must be >= 0 and < 9')
    }

    let gridRow = Math.floor(index / 3)
    let gridColumn = index % 3
    let gridStartIndex = Grid.getStartIndex(gridRow, gridColumn)

    let subgrid = []

    for (let i = 0, gridIndex = gridStartIndex; i < 9; i++, gridIndex++) {
      if (i !== 0 && i % 3 === 0) {
        gridIndex += 6
      }

      subgrid.push(this.grid[gridIndex])
    }

    return subgrid
  }

  /**
   * @param {number} index A number between 0 and 8 included.
   * @returns {number[]} The row at index.
   */
  getRow (index) {
    if (typeof index !== 'number') {
      throw new TypeError('index must be a number')
    }

    if (index < 0 || index >= 9) {
      throw new RangeError('index must be >= 0 and < 9')
    }

    let gridStartIndex = index * 9
    let row = []

    for (let gridIndex = gridStartIndex; gridIndex < gridStartIndex + 9; gridIndex++) {
      row.push(this.grid[gridIndex])
    }

    return row
  }

  /**
   * @param {number} index A number between 0 and 8 included.
   * @returns {number[]} The row at index.
   */
  getColumn (index) {
    if (typeof index !== 'number') {
      throw new TypeError('index must be a number')
    }

    if (index < 0 || index >= 9) {
      throw new RangeError('index must be >= 0 and < 9')
    }

    let column = []

    for (let gridIndex = index; gridIndex < 81; gridIndex += 9) {
      column.push(this.grid[gridIndex])
    }

    return column
  }

  /**
   * @description Reads all numbers in the square, row and column to compute the possible values of a cell.
   * @param {number} index The index of a cell in the grid, from 0 up to 80 included.
   * @returns {number[]} An array of all possible value for the requested cell.
   */
  getPossibleValues (index) {
    let values = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    // Removes all values in the { from: values } array that are present in the { present_in: array } array.
    function removeValues ({ from: values, present_in: array }) {
      for (var index = 0; index < array.length && values.length > 0; index++) {
        let _number = array[index]
        if (_number === 0) { continue }

        let valueIndex
        if ((valueIndex = values.indexOf(_number)) !== -1) {
          values.splice(valueIndex, 1)
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
