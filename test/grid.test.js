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
            let cell = grid.cells[0]
            assert.isArray(cell.row)
            assert.lengthOf(cell.row, 8)
            assert.strictEqual(cell.row[0].value, 0)
            assert.strictEqual(cell.row[1].value, 0)
            assert.strictEqual(cell.row[2].value, 0)
            assert.strictEqual(cell.row[3].value, 4)
            assert.strictEqual(cell.row[4].value, 0)
            assert.strictEqual(cell.row[5].value, 9)
            assert.strictEqual(cell.row[6].value, 0)
            assert.strictEqual(cell.row[7].value, 0)
        })

        it('should attach same column cells to a cell', function () {
            let cell = grid.cells[40]
            assert.isArray(cell.column)
            assert.lengthOf(cell.column, 8)
            assert.strictEqual(cell.column[0].value, 4)
            assert.strictEqual(cell.column[1].value, 2)
            assert.strictEqual(cell.column[2].value, 0)
            assert.strictEqual(cell.column[3].value, 0)
            assert.strictEqual(cell.column[4].value, 0)
            assert.strictEqual(cell.column[5].value, 0)
            assert.strictEqual(cell.column[6].value, 1)
            assert.strictEqual(cell.column[7].value, 3)
        })

        it('should attach same subgrid cells to a cell', function () {
            let cell = grid.cells[80]
            assert.isArray(cell.subgrid)
            assert.lengthOf(cell.subgrid, 8)
            assert.strictEqual(cell.subgrid[0].value, 0)
            assert.strictEqual(cell.subgrid[1].value, 0)
            assert.strictEqual(cell.subgrid[2].value, 0)
            assert.strictEqual(cell.subgrid[3].value, 0)
            assert.strictEqual(cell.subgrid[4].value, 6)
            assert.strictEqual(cell.subgrid[5].value, 0)
            assert.strictEqual(cell.subgrid[6].value, 0)
            assert.strictEqual(cell.subgrid[7].value, 0)
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
    })

    describe('#solve()', function () {
        xit('should solve Grid 1', function () {
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

        xit('should solve Grid 3', function () {
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
