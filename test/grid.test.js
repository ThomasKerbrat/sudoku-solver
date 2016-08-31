const assert = require('chai').assert

const Cell = require('../src/cell.js')
const Grid = require('../src/grid.js')

const sample_grid = require('./data/grid-1.js').unresolved

describe('Grid', function () {

    describe('#constructor()', function () {
        let grid

        beforeEach(function () {
            grid = new Grid(sample_grid)
        })

        it('should instanciate Cells', function () {
            assert.lengthOf(grid.cells, 81)
        })

        it('should instanciate Cells from the passed grid representation', function () {
            assert.strictEqual(grid.cells[38].value, 7)
        })

        it('should attach rows, columns and subgrids', function () {
            assert.strictEqual(grid.cells[0].row, grid.rows[0])
            assert.strictEqual(grid.cells[30].row, grid.rows[3])
            assert.strictEqual(grid.cells[60].row, grid.rows[6])

            assert.strictEqual(grid.cells[10].column, grid.columns[1])
            assert.strictEqual(grid.cells[40].column, grid.columns[4])
            assert.strictEqual(grid.cells[70].column, grid.columns[7])

            assert.strictEqual(grid.cells[16].subgrid, grid.subgrids[2])
            assert.strictEqual(grid.cells[40].subgrid, grid.subgrids[4])
            assert.strictEqual(grid.cells[64].subgrid, grid.subgrids[6])
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

    describe('#rows', function () {
        let grid

        beforeEach(function () {
            grid = new Grid(sample_grid)
        })

        it('should be defined', function () {
            assert.isDefined(grid.rows)
        })

        it('should be readonly', function () {
            delete grid.rows
            assert.isDefined(grid.rows)
        })
    })

    describe('#columns', function () {
        let grid

        beforeEach(function () {
            grid = new Grid(sample_grid)
        })

        it('should be defined', function () {
            assert.isDefined(grid.columns)
        })

        it('should be readonly', function () {
            delete grid.columns
            assert.isDefined(grid.columns)
        })
    })

    describe('#subgrids', function () {
        let grid

        beforeEach(function () {
            grid = new Grid(sample_grid)
        })

        it('should be defined', function () {
            assert.isDefined(grid.subgrids)
        })

        it('should be readonly', function () {
            delete grid.subgrids
            assert.isDefined(grid.subgrids)
        })
    })

    describe('#RowStrategy', function () {
        it('should return correct indexes for rows', function () {
            assert.strictEqual(Grid.RowStrategy(0, 1), 1)
            assert.strictEqual(Grid.RowStrategy(1, 1), 10)
            assert.strictEqual(Grid.RowStrategy(2, 1), 19)
            assert.strictEqual(Grid.RowStrategy(8, 6), 78)
        })
    })

    describe('#ColumnStrategy', function () {
        it('should return correct indexes for columns', function () {
            assert.strictEqual(Grid.ColumnStrategy(0, 1), 9)
            assert.strictEqual(Grid.ColumnStrategy(1, 1), 10)
            assert.strictEqual(Grid.ColumnStrategy(2, 1), 11)
            assert.strictEqual(Grid.ColumnStrategy(8, 6), 62)
        })
    })

    describe('#SubgridStrategy', function () {
        it('should return correct indexes for subgrids', function () {
            assert.strictEqual(Grid.SubgridStrategy(0, 1), 1)
            assert.strictEqual(Grid.SubgridStrategy(0, 3), 9)
            assert.strictEqual(Grid.SubgridStrategy(4, 1), 31)
            assert.strictEqual(Grid.SubgridStrategy(4, 3), 39)
        })
    })

})
