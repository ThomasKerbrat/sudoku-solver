const assert = require('chai').assert

const Cell = require('../src/cell.js')
const Grid = require('../src/grid.js')

const sample_grid = require('./data/grid-1.js')
const sample_grid_2 = require('./data/grid-2.js')
const sample_grid_3 = require('./data/grid-3.js')

describe('Grid', function () {

    describe('#constructor()', function () {
        let grid

        beforeEach(function () {
            grid = new Grid(sample_grid.unresolved)
        })

        it('should instanciate Cells', function () {
            assert.lengthOf(grid.cells, 81)
        })

        it('should instanciate Cells from the passed grid representation', function () {
            assert.strictEqual(grid.cells[38].value, 7)
        })
    })

    describe('#cells', function () {
        let grid

        beforeEach(function () {
            grid = new Grid(sample_grid.unresolved)
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
            let grid = new Grid(sample_grid.unresolved)
            let solved_grid = Grid.build_array_from_string(sample_grid.resolved)

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
