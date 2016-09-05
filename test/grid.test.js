const assert = require('chai').assert

const Cell = require('../src/cell.js')
const Grid = require('../src/grid.js')

const sample_grid_1 = require('./data/grid-1.js')
const sample_grid_2 = require('./data/grid-2.js')
const sample_grid_3 = require('./data/grid-3.js')

describe('Grid', function () {

    describe('#constructor()', function () {
        let grid

        beforeEach(function () {
            grid = new Grid(sample_grid_1.unresolved)
        })

        it('should instanciate Cells', function () {
            assert.lengthOf(grid.cells, 81)
        })

        it('should instanciate Cells from the passed grid representation', function () {
            assert.strictEqual(grid.cells[38].value, 7)
        })

        it('should attach same row cells to a cell', function () {
            assert.isArray(grid.cells[0].row)
            assert.lengthOf(grid.cells[0].row, 8)
            grid.cells[0].row.forEach(function (cell, index) {
                assert.strictEqual(grid.cells[index + 1], cell)
            })
        })

        it('should attach same column cells to a cell', function () {
            assert.isArray(grid.cells[0].column)
            assert.lengthOf(grid.cells[0].column, 8)
            grid.cells[0].column.forEach(function (cell, index) {
                assert.strictEqual(grid.cells[index + 1], cell)
            })
        })

        it('should attach same subgrid cells to a cell', function () {
            assert.isArray(grid.cells[0].subgrid)
            assert.lengthOf(grid.cells[0].subgrid, 8)
            grid.cells[0].subgrid.forEach(function (cell, index) {
                assert.strictEqual(grid.cells[index + 1], cell)
            })
        })
    })

    describe('#cells', function () {
        let grid

        beforeEach(function () {
            grid = new Grid(sample_grid_1.unresolved)
        })

        it('should be defined', function () {
            assert.isDefined(grid.cells)
        })

        it('should be readonly', function () {
            delete grid.cells
            assert.isDefined(grid.cells)
        })
    })

    describe('#solve()', function () {
        it('should solve Grid 1', function () {
            let grid = new Grid(sample_grid_1.unresolved)
            let solved_grid = Grid.build_array_from_string(sample_grid_1.resolved)

            let result = grid.solve()

            assert.strictEqual(result.solved, true)
            for (var index = 0; index < solved_grid.length; index++) {
                assert.strictEqual(result.sudoku[index].value, solved_grid[index])
            }
        })

        it('should solve Grid 2', function () {
            let grid = new Grid(sample_grid_2.unresolved)
            let solved_grid = Grid.build_array_from_string(sample_grid_2.resolved)

            let result = grid.solve()

            assert.strictEqual(result.solved, true)
            for (var index = 0; index < solved_grid.length; index++) {
                assert.strictEqual(result.sudoku[index].value, solved_grid[index])
            }
        })

        it('should solve Grid 3', function () {
            let grid = new Grid(sample_grid_3.unresolved)
            let solved_grid = Grid.build_array_from_string(sample_grid_3.resolved)

            let result = grid.solve()

            assert.strictEqual(result.solved, true)
            for (var index = 0; index < solved_grid.length; index++) {
                assert.strictEqual(result.sudoku[index].value, solved_grid[index])
            }
        })
    })

})
