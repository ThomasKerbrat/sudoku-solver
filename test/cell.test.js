const assert = require('chai').assert

const Cell = require('../src/cell.js')
const Region = require('../src/region.js')
const Grid = require('../src/grid.js')

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
            cell = new Cell(4)
        })

        it('should return all possible values for a cell', function () {
            assert.deepEqual(cell.compute_candidates(), [1, 3, 6, 7, 8])
            assert.deepEqual(cell.compute_candidates(), [3, 8])
            assert.deepEqual(cell.compute_candidates(), [2, 3, 5, 7])

            assert.deepEqual(cell.compute_candidates(), [1, 3, 8, 9])
            assert.deepEqual(cell.compute_candidates(), [1, 3, 8])
            assert.deepEqual(cell.compute_candidates(), [3, 7, 9])

            assert.deepEqual(cell.compute_candidates(), [1, 3, 8, 9])
            assert.deepEqual(cell.compute_candidates(), [4, 8])
            assert.deepEqual(cell.compute_candidates(), [1, 3, 8])
        })
    })

    describe('#row', function () {
        let cell

        beforeEach(function () {
            cell = new Cell(1)
        })

        it('should be defined', function () {
            assert.isDefined(cell.row)
        })
    })

    describe('#column', function () {
        let cell

        beforeEach(function () {
            cell = new Cell(1)
        })

        it('should be defined', function () {
            assert.isDefined(cell.column)
        })
    })

    describe('#subgrid', function () {
        let cell

        beforeEach(function () {
            cell = new Cell(1)
        })

        it('should be defined', function () {
            assert.isDefined(cell.subgrid)
        })
    })

})
