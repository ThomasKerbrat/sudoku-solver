const assert = require('chai').assert

const RegionStrategy = require('../src/region-strategy.js')

describe('RegionStrategy', function () {

    describe('#RowStrategy', function () {
        it('should return correct indexes for rows', function () {
            assert.strictEqual(RegionStrategy.Row(0, 1), 1)
            assert.strictEqual(RegionStrategy.Row(1, 1), 10)
            assert.strictEqual(RegionStrategy.Row(2, 1), 19)
            assert.strictEqual(RegionStrategy.Row(8, 6), 78)
        })
    })

    describe('#ColumnStrategy', function () {
        it('should return correct indexes for columns', function () {
            assert.strictEqual(RegionStrategy.Column(0, 1), 9)
            assert.strictEqual(RegionStrategy.Column(1, 1), 10)
            assert.strictEqual(RegionStrategy.Column(2, 1), 11)
            assert.strictEqual(RegionStrategy.Column(8, 6), 62)
        })
    })

    describe('#SubgridStrategy', function () {
        it('should return correct indexes for subgrids', function () {
            assert.strictEqual(RegionStrategy.Subgrid(0, 1), 1)
            assert.strictEqual(RegionStrategy.Subgrid(0, 3), 9)
            assert.strictEqual(RegionStrategy.Subgrid(4, 1), 31)
            assert.strictEqual(RegionStrategy.Subgrid(4, 3), 39)
        })
    })

})