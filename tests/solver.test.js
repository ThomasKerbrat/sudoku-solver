const assert = require('assert')

const Grid = require('../src/grid.js')
const Solver = require('../src/solver.js')

const sample_grid = require('./data/grid-1.js')

{ // Solver.solve
    let grid = new Grid(sample_grid.unresolved)
    let solver = new Solver(grid)

    assert.strictEqual(solver.possible_values.length, 81)

    assert.deepStrictEqual(solver.solve(), sample_grid.resolved)
}
