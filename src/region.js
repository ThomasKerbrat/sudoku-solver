class Region {

    constructor(grid_cells, region_index, strategy) {
        if (!(grid_cells instanceof Array)) { throw new TypeError('grid_cells must be an Array') }
        if (grid_cells.length !== 81) { console.log( grid_cells.length ); throw new RangeError('grid_cells must have a length of 81') }
        if (typeof region_index !== 'number') { throw new TypeError('region_index must be a number') }
        if (typeof strategy !== 'function') { throw new TypeError('strategy must be a function') }

        this._getNextIndex = strategy

        this._cells = []
        for (let index = 0; index < 9; index++) {
            this._cells.push(grid_cells[this._getNextIndex(region_index, index)])
        }
    }

    /**
     * @returns {Cell[]} Gets the cells associated with this region.
     */
    get cells() {
        return this._cells
    }

}

module.exports = Region
