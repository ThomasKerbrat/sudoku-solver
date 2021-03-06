const os = require('os')

const Grid = require('./src/grid.js')

const sample_grid = require('./test/data/grid-2.js')

let grid = new Grid(sample_grid.unresolved)

let unsolved_grid = Grid.build_array_from_string(sample_grid.unresolved)
unsolved_grid = unsolved_grid.map(function (value) { return value === 0 ? '.' : value })
console.log('Unsolved:')
console.log(render(unsolved_grid, os.EOL), os.EOL)

let start = process.hrtime()
let result = grid.solve()
let end = process.hrtime(start)

result.sudoku = result.sudoku.map(function (cell) { return cell.value })
console.log('Solved (' + Number((end[0] + end[1] / 1e9) * 1e3).toLocaleString('en') + 'ms):')
console.log(render(result.sudoku, os.EOL), os.EOL)

function render(grid, end_of_line) {
    let output = []

    for (let index = 0; index < grid.length; index++) {
        if (index > 0 && index % 3 === 0) { output.push(' ') }
        if (index > 0 && index % 9 === 0) { output.push(end_of_line) }
        if (index > 0 && index % 27 === 0) { output.push(end_of_line) }
        output.push(grid[index], ' ')
    }

    return output.join('')
}
