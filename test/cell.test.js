const assert = require('chai').assert

const Grid = require('../src/grid.js')
const Region = require('../src/region.js')
const Cell = require('../src/cell.js')

const sample_grid = require('./data/grid-1.js').unresolved
let grid = new Grid(sample_grid)

describe('Cell', function () {

    describe('#value', function () {
        let cell

        beforeEach(function () {
            cell = new Cell(4)
        })

        it('should be defined', function () {
            assert.isDefined(cell.value)
        })

        it('should return a number', function () {
            let result = cell.value
            assert.strictEqual(result, 4)
        })

        it('should be readonly', function () {
            cell.value = 8
            assert.strictEqual(cell.value, 4)
        })
    })

    describe('#has_value', function () {
        let cell

        beforeEach(function () {
            cell = new Cell(4)
        })

        it('should be defined', function () {
            assert.isDefined(cell.has_value)
        })

        it('should be false when value is 0', function () {
            cell = new Cell(0)
            assert.strictEqual(cell.has_value, false)
        })

        it('should be true when value is between 1 and 9', function () {
            cell = new Cell(5)
            assert.strictEqual(cell.has_value, true)
        })
    })

    describe('#compute_candidates()', function () {
        let cell

        beforeEach(function () {
            cell = grid.cells[4]
        })

        xit('should return all possible values for cell at index 20', function () {
            assert.deepEqual(cell.compute_candidates(), [1, 3, 6, 7, 8])
            assert.deepEqual(cell.compute_candidates(), [3, 8])
            assert.deepEqual(cell.compute_candidates(), [2, 3, 5, 7])
        })

        xit('should return all possible values for cell at index 40', function () {
            assert.deepEqual(cell.compute_candidates(), [1, 3, 6, 7, 8])
            assert.deepEqual(cell.compute_candidates(), [3, 8])
            assert.deepEqual(cell.compute_candidates(), [2, 3, 5, 7])
        })

        xit('should return all possible values for cell at index 60', function () {
            assert.deepEqual(cell.compute_candidates(), [1, 3, 6, 7, 8])
            assert.deepEqual(cell.compute_candidates(), [3, 8])
            assert.deepEqual(cell.compute_candidates(), [2, 3, 5, 7])
        })
    })

    describe('#row', function () {
        it('should be defined', function () {
            let cell = new Cell(0)
            assert.isDefined(cell.row)
        })
    })

    describe('#column', function () {
        it('should be defined', function () {
            let cell = new Cell(0)
            assert.isDefined(cell.column)
        })
    })

    describe('#subgrid', function () {
        it('should be defined', function () {
            let cell = new Cell(0)
            assert.isDefined(cell.subgrid)
        })
    })

})
