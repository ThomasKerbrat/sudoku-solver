const assert = require('chai').assert

const Grid = require('../src/grid.js')
const Region = require('../src/region.js')
const RegionStrategy = require('../src/region-strategy.js')
const Cell = require('../src/cell.js')

const sample_grid = require('./data/grid-1.js').unresolved
const grid = new Grid(sample_grid)

describe('Region', function () {

    describe('#computeSiblings()', function () {
        it('should be defined', function () {
            assert.isDefined(Region.computeSiblings)
        })

        it('should accept valid parameters', function () {
            assert.doesNotThrow(function () {
                Region.computeSiblings(grid.cells, 0, RegionStrategy.Row)
            })
        })

        it('should throw on invalid cells value', function () {
            assert.throws(function () {
                Region.computeSiblings()
            }, TypeError, /cells must be an array/)
            assert.throws(function () {
                Region.computeSiblings([])
            }, RangeError, /cells must have a lenght of 81/)
        })

        it('should throw on invalid region_index value', function () {
            assert.throws(function () {
                Region.computeSiblings(grid.cells)
            }, TypeError, /region_index must be a number/)
            assert.throws(function () {
                Region.computeSiblings(grid.cells, -1)
            }, RangeError, /region_index must be a number between 0 and 8 included/)
            assert.throws(function () {
                Region.computeSiblings(grid.cells, 9)
            }, RangeError, /region_index must be a number between 0 and 8 included/)
        })

        it('should throw on invalid strategy value', function () {
            assert.throws(function () {
                Region.computeSiblings(grid.cells, 0)
            }, TypeError, /strategy must be a function/)
        })

        it('should return an array of 9 Cell', function () {
            let result = Region.computeSiblings(grid.cells, 0, RegionStrategy.Row)
            assert.instanceOf(result, Array)
            assert.lengthOf(result, 9)
            result.forEach(function (cell) {
                assert.instanceOf(cell, Cell)
            })
        })
    })

})
