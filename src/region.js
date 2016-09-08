class Region {

    static computeSiblings(grid_cells, region_index, strategy) {
        if (!(grid_cells instanceof Array)) { throw new TypeError('cells must be an array') }
        if (grid_cells.length !== 81) { throw new RangeError('cells must have a lenght of 81') }
        if (typeof region_index !== 'number') { throw new TypeError('region_index must be a number') }
        if (region_index < 0 || region_index > 8) { throw new RangeError('region_index must be a number between 0 and 8 included') }
        if (typeof strategy !== 'function') { throw new TypeError('strategy must be a function') }

        let getIndex = strategy
        let region_cells = []

        for (let index = 0; index < 9; index++) {
            region_cells.push(grid_cells[getIndex(region_index, index)])
        }

        return region_cells
    }

}

module.exports = Region
