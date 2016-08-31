/* global describe, it */

const assert = require('assert')

const Grid = require('../src/grid.js')
const Solver = require('../src/solver.js')

const sampleGrid = require('./data/grid-2.js')

describe('Solver', function () {
  describe('#solve()', function () {
    it('should solve the given Grid', function () {
      let grid = new Grid(sampleGrid.unresolved)
      let solver = new Solver(grid)

      let result = solver.solve()

      assert.deepStrictEqual(
        result.sudoku,
        Grid.buildArrayFromString(sampleGrid.resolved)
      )
    })
  })
})
