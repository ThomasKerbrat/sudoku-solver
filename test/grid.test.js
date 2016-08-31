const assert = require('chai').assert

const Cell = require('../src/cell.js')
const Grid = require('../src/grid.js')

const sample_grid = require('./data/grid-1.js').unresolved

describe('Grid', function () {

    describe('#constructor()', function () {
        it('should instanciate Cells', function () {
            let grid = new Grid(sample_grid)
            assert.lengthOf(grid.cells, 81)
        })

        it('should instanciate Cells from the passed grid representation', function () {
            let grid = new Grid(sample_grid)
            assert.strictEqual(grid.cells[38].value, 7)
        })
    })

    describe('#cells', function () {
        let grid

        beforeEach(function () {
            grid = new Grid(sample_grid)
        })

        it('should be defined', function () {
            assert.isDefined(grid.cells)
        })

        it('should be readonly', function () {
            delete grid.cells
            assert.isDefined(grid.cells)
        })
    })

    describe('#RowStrategy', function () {
        it('should return correct indexes for rows', function () {
            assert.strictEqual(Grid.RowStrategy(0, 0), 1)
            assert.strictEqual(Grid.RowStrategy(1, 0), 10)
            assert.strictEqual(Grid.RowStrategy(2, 0), 19)
            assert.strictEqual(Grid.RowStrategy(8, 5), 78)
        })
    })

    describe('#ColumnStrategy', function () {
        it('should return correct indexes for columns', function () {
            assert.strictEqual(Grid.ColumnStrategy(0, 0), 9)
            assert.strictEqual(Grid.ColumnStrategy(1, 0), 10)
            assert.strictEqual(Grid.ColumnStrategy(2, 0), 11)
            assert.strictEqual(Grid.ColumnStrategy(8, 5), 62)
        })
    })

    describe('#SubgridStrategy', function () {
        it('should return correct indexes for subgrids', function () {
            assert.strictEqual(Grid.SubgridStrategy(0, 0), 1)
            assert.strictEqual(Grid.SubgridStrategy(0, 2), 9)
            assert.strictEqual(Grid.SubgridStrategy(4, 0), 31)
            assert.strictEqual(Grid.SubgridStrategy(4, 2), 39)
        })
    })

})
