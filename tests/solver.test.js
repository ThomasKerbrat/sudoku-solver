const assert = require('assert')

const Grid = require('../src/grid.js')
const Solver = require('../src/solver.js')

const sample_grid = require('./data/grid-2.js')

{ // Solver.solve
    let grid = new Grid(sample_grid.unresolved)
    let solver = new Solver(grid)

    assert.deepStrictEqual(solver.solve(), Grid.build_array_from_string(sample_grid.resolved))
}
