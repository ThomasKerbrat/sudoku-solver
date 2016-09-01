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

        it('should be assignable', function () {
            cell.value = 8
            assert.strictEqual(cell.value, 8)
        })

        it('should thow if invalid value is passed', function () {
            assert.throws(function () {
                cell.value = null
            }, TypeError, /value must be a number/)
            assert.throws(function () {
                cell.value = 10
            }, RangeError, /value must be within the 1 to 9 range/)
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
        it('should thow and error if the call has already a value', function () {
            let cell = grid.cells[4]
            assert.throws(function () {
                cell.compute_candidates()
            }, Error, /This cell has already a value/)
        })

        it('should return all possible values for cell at given index', function () {
            assert.deepEqual(grid.cells[0].compute_candidates(), [1, 3, 6, 7, 8])
            assert.deepEqual(grid.cells[40].compute_candidates(), [5, 8])
            assert.deepEqual(grid.cells[80].compute_candidates(), [1, 2, 5, 7, 8, 9])
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
