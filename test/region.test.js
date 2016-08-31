/* global describe, it, beforeEach */

const assert = require('chai').assert

const Grid = require('../src/grid.js')
const Region = require('../src/region.js')
const Cell = require('../src/cell.js')

const sampleGrid = require('./data/grid-2.js')
let grid = new Grid(sampleGrid.unresolved)
let strategy = function strategy (a, b) { }

describe('Region', function () {
  describe('#constructor()', function () {
    it('should take a Grid and a strategy when instanciating', function () {
      assert.doesNotThrow(function () {
        new Region(grid, strategy)
      }, Error)
    })

    it('should throw a TypeError if the grid is not a Grid', function () {
      assert.throws(function () {
        new Region(undefined)
      }, TypeError, /grid must be a Grid/)
      assert.throws(function () {
        new Region(null)
      }, TypeError, /grid must be a Grid/)
      assert.throws(function () {
        new Region(0)
      }, TypeError, /grid must be a Grid/)
      assert.throws(function () {
        new Region('0')
      }, TypeError, /grid must be a Grid/)
      assert.throws(function () {
        new Region({})
      }, TypeError, /grid must be a Grid/)
      assert.throws(function () {
        new Region([])
      }, TypeError, /grid must be a Grid/)
    })

    it('should throw a TypeError if the strategy is not a function', function () {
      assert.throws(function () {
        new Region(grid, undefined)
      }, TypeError, /strategy must be a function/)
      assert.throws(function () {
        new Region(grid, null)
      }, TypeError, /strategy must be a function/)
      assert.throws(function () {
        new Region(grid, 0)
      }, TypeError, /strategy must be a function/)
      assert.throws(function () {
        new Region(grid, '0')
      }, TypeError, /strategy must be a function/)
      assert.throws(function () {
        new Region(grid, {})
      }, TypeError, /strategy must be a function/)
      assert.throws(function () {
        new Region(grid, [])
      }, TypeError, /strategy must be a function/)
    })
  })

  describe('#grid', function () {
    let region

    beforeEach(function () {
      region = new Region(grid, strategy)
    })

    it('should be defined', function () {
      assert.isDefined(region.grid)
    })

    it('should be the grid passed during instanciation', function () {
      assert.strictEqual(region.grid, grid)
    })
  })

  describe('#cells', function () {
    let region

    beforeEach(function () {
      region = new Region(grid, strategy)
    })

    it('should be defined', function () {
      assert.isDefined(region.cells)
    })

    it('should be an array', function () {
      assert.isArray(region.cells)
    })

    it('should be 9 Cell long', function () {
      assert.lengthOf(region.cells, 9)
      for (var index = 0; index < region.cells.length; index++) {
        var cell = region.cells[index]
        assert.strictEqual(cell instanceof Cell, true)
      }
    })
  })
})
