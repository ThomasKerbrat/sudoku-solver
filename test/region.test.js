const assert = require('chai').assert

const Grid = require('../src/grid.js')
const Region = require('../src/region.js')
const Cell = require('../src/cell.js')

const sample_grid = require('./data/grid-1.js').unresolved

function createRegion() {
    let grid = new Grid(sample_grid)
    return new Region(grid.cells, 0, Grid.RowStrategy)
}

describe('Region', function () {

    describe('#cells', function () {
        let region

        beforeEach(function () {
            region = createRegion()
        })

        it('should be defined', function () {
            assert.isDefined(region.cells)
        })

        it('should be an array', function () {
            assert.isArray(region.cells)
        })

        it('should be 9 Cell long', function () {
            assert.lengthOf(region.cells, 9)
            for (let index = 0; index < region.cells.length; index++) {
                let cell = region.cells[index];
                assert.instanceOf(cell, Cell)
            }
        })
    })

})
