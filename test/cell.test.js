const assert = require('chai').assert

const Cell = require('../src/cell.js')
const Region = require('../src/region.js')

const _region = new Region()

describe('Cell', function () {

    describe('#constructor()', function () {

        it('should take a number ranging from 0 to 9 included', function () {
            assert.doesNotThrow(function () {
                cell = new Cell(0, _region, _region, _region)
            })
            assert.strictEqual(cell.value, 0)

            assert.doesNotThrow(function () {
                cell = new Cell(5, _region, _region, _region)
            })
            assert.strictEqual(cell.value, 5)

            assert.doesNotThrow(function () {
                cell = new Cell(9, _region, _region, _region)
            })
            assert.strictEqual(cell.value, 9)
        })

        it('should throw a TypeError if the value is not a number', function () {
            assert.throws(function () {
                let cell = new Cell(undefined)
            }, TypeError, /value must be a number/)
            assert.throws(function () {
                let cell = new Cell(null)
            }, TypeError, /value must be a number/)
            assert.throws(function () {
                let cell = new Cell({})
            }, TypeError, /value must be a number/)
            assert.throws(function () {
                let cell = new Cell([])
            }, TypeError, /value must be a number/)
        })

        it('should thow a RangeError if the given value is < 0 or > 9', function () {
            assert.throws(function () {
                let cell = new Cell(-1)
            }, RangeError)
            assert.throws(function () {
                let cell = new Cell(10)
            }, RangeError)
        })

    })

    describe('#value', function () {

        let cell

        beforeEach(function () {
            cell = new Cell(4, _region, _region, _region)
        })

        it('should be defined', function () {
            assert.isDefined(cell.value)
        })

        it('should return a number', function () {
            let result = cell.value
            assert.strictEqual(result, 4)
        })

        it('should be readonly', function () {
            cell.value = 8
            assert.strictEqual(cell.value, 4)
        })
    })

    describe('#has_value', function () {

        let cell

        beforeEach(function () {
            cell = new Cell(4, _region, _region, _region)
        })

        it('should be defined', function () {
            assert.isDefined(cell.has_value)
        })

        it('should be false when value is 0', function () {
            cell = new Cell(0, _region, _region, _region)
            assert.strictEqual(cell.has_value, false)
        })

        it('should be true when value is between 1 and 9', function () {
            cell = new Cell(5, _region, _region, _region)
            assert.strictEqual(cell.has_value, true)
        })

    })

    describe('#candidates', function () {

        let cell

        beforeEach(function () {
            cell = new Cell(4, _region, _region, _region)
        })

        it('should be defined', function () {
            assert.isDefined(cell.candidates)
        })

        it('should have an empty value when instanciated', function () {
            assert.strictEqual(cell.candidates instanceof Array, true)
            assert.strictEqual(cell.candidates.length, 0)
        })
    })

    describe('#row', function () {

        let cell

        beforeEach(function () {
            cell = new Cell(1, _region, _region, _region)
        })

        it('should be defined', function () {
            assert.isDefined(cell.row)
        })

    })

    describe('#column', function () {

        let cell

        beforeEach(function () {
            cell = new Cell(1, _region, _region, _region)
        })

        it('should be defined', function () {
            assert.isDefined(cell.column)
        })

    })

    describe('#subgrid', function () {

        let cell

        beforeEach(function () {
            cell = new Cell(1, _region, _region, _region)
        })

        it('should be defined', function () {
            assert.isDefined(cell.subgrid)
        })

    })

})
