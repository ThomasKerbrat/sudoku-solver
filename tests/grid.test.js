const assert = require('assert')
const Grid = require('../src/grid.js')

const sample_grid = require('./data/grid-1.js').unresolved

{ // Grid.getStartIndex
    assert.strictEqual(Grid.getStartIndex(0, 0), 0);
    assert.strictEqual(Grid.getStartIndex(0, 1), 3);
    assert.strictEqual(Grid.getStartIndex(0, 2), 6);

    assert.strictEqual(Grid.getStartIndex(1, 0), 27);
    assert.strictEqual(Grid.getStartIndex(1, 1), 30);
    assert.strictEqual(Grid.getStartIndex(1, 2), 33);

    assert.strictEqual(Grid.getStartIndex(2, 0), 54);
    assert.strictEqual(Grid.getStartIndex(2, 1), 57);
    assert.strictEqual(Grid.getStartIndex(2, 2), 60);
}

{ // Grid.getSubGridIndexForGridIndex
    assert.strictEqual(Grid.getSubGridIndexForGridIndex(10), 0)
    assert.strictEqual(Grid.getSubGridIndexForGridIndex(13), 1)
    assert.strictEqual(Grid.getSubGridIndexForGridIndex(16), 2)

    assert.strictEqual(Grid.getSubGridIndexForGridIndex(37), 3)
    assert.strictEqual(Grid.getSubGridIndexForGridIndex(40), 4)
    assert.strictEqual(Grid.getSubGridIndexForGridIndex(43), 5)

    assert.strictEqual(Grid.getSubGridIndexForGridIndex(64), 6)
    assert.strictEqual(Grid.getSubGridIndexForGridIndex(67), 7)
    assert.strictEqual(Grid.getSubGridIndexForGridIndex(70), 8)
}

{ // Grid.getRowIndexForGridIndex
    assert.strictEqual(Grid.getRowIndexForGridIndex(0), 0)
    assert.strictEqual(Grid.getRowIndexForGridIndex(10), 1)
    assert.strictEqual(Grid.getRowIndexForGridIndex(20), 2)

    assert.strictEqual(Grid.getRowIndexForGridIndex(30), 3)
    assert.strictEqual(Grid.getRowIndexForGridIndex(40), 4)
    assert.strictEqual(Grid.getRowIndexForGridIndex(50), 5)

    assert.strictEqual(Grid.getRowIndexForGridIndex(60), 6)
    assert.strictEqual(Grid.getRowIndexForGridIndex(70), 7)
    assert.strictEqual(Grid.getRowIndexForGridIndex(80), 8)
}

{ // Grid.getColumnIndexForGridIndex
    assert.strictEqual(Grid.getColumnIndexForGridIndex(0), 0)
    assert.strictEqual(Grid.getColumnIndexForGridIndex(10), 1)
    assert.strictEqual(Grid.getColumnIndexForGridIndex(20), 2)

    assert.strictEqual(Grid.getColumnIndexForGridIndex(30), 3)
    assert.strictEqual(Grid.getColumnIndexForGridIndex(40), 4)
    assert.strictEqual(Grid.getColumnIndexForGridIndex(50), 5)

    assert.strictEqual(Grid.getColumnIndexForGridIndex(60), 6)
    assert.strictEqual(Grid.getColumnIndexForGridIndex(70), 7)
    assert.strictEqual(Grid.getColumnIndexForGridIndex(80), 8)
}

{ // Grid.getSubGrid
    let grid = new Grid(sample_grid)

    assert.deepStrictEqual(grid.getSubGrid(0), [
        0, 0, 0,
        0, 5, 0,
        0, 0, 0
    ])

    assert.deepStrictEqual(grid.getSubGrid(4), [
        0, 0, 2,
        9, 0, 4,
        6, 0, 0
    ])

    assert.deepStrictEqual(grid.getSubGrid(8), [
        0, 0, 0,
        0, 6, 0,
        0, 0, 0
    ])
}

{ // Grid.getRow
    let grid = new Grid(sample_grid)

    assert.deepStrictEqual(grid.getRow(0), [
        0, 0, 0, 0, 4, 0, 9, 0, 0
    ])

    assert.deepStrictEqual(grid.getRow(4), [
        0, 0, 7, 9, 0, 4, 6, 0, 0
    ])

    assert.deepStrictEqual(grid.getRow(8), [
        0, 0, 6, 0, 3, 0, 0, 0, 0
    ])
}

{ // Grid.getColumn
    let grid = new Grid(sample_grid)

    assert.deepStrictEqual(grid.getColumn(0), [
        0, 0, 0, 0, 0, 0, 2, 4, 0
    ])

    assert.deepStrictEqual(grid.getColumn(4), [
        4, 2, 0, 0, 0, 0, 0, 1, 3
    ])

    assert.deepStrictEqual(grid.getColumn(8), [
        0, 4, 6, 0, 0, 0, 0, 0, 0
    ])
}

{ // Grid.getPossibleValues
    let grid = new Grid(sample_grid)

    assert.deepStrictEqual(grid.getPossibleValues(0), [1, 3, 6, 7, 8])
    assert.deepStrictEqual(grid.getPossibleValues(3), [3, 8])
    assert.deepStrictEqual(grid.getPossibleValues(7), [2, 3, 5, 7])

    assert.deepStrictEqual(grid.getPossibleValues(27), [1, 3, 8, 9])
    assert.deepStrictEqual(grid.getPossibleValues(30), [1, 3, 8])
    assert.deepStrictEqual(grid.getPossibleValues(34), [3, 7, 9])

    assert.deepStrictEqual(grid.getPossibleValues(56), [1, 3, 8, 9])
    assert.deepStrictEqual(grid.getPossibleValues(57), [4, 8])
    assert.deepStrictEqual(grid.getPossibleValues(60), [1, 3, 8])
}
