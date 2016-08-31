const Grid = require('./grid.js')

class Region {

  constructor (grid, strategy) {
    if (!(grid instanceof Grid)) { throw new TypeError('grid must be a Grid') }
    if (typeof strategy !== 'function') { throw new TypeError('strategy must be a function') }

    this._grid = grid
    this._getNextIndex = strategy
  }

  /**
   * @returns {Grid} Gets the grid associated with this region.
   */
  get grid () {
    return this._grid
  }

  get cells () {
    return []
  }

}

module.exports = Region
