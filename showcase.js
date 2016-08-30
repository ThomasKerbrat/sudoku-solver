const os = require('os')

const Grid = require('./src/grid.js')
const Solver = require('./src/solver.js')

const sample_grid = require('./tests/data/grid-2.js')

let grid = new Grid(sample_grid.unresolved)
let solver = new Solver(grid)

let unsolved_grid = Grid.build_array_from_string(sample_grid.unresolved)
unsolved_grid = unsolved_grid.map(function (value) {
    if (value === 0) {
        return '.'
    } else {
        return value
    }
})
console.log('Unsolved :')
console.log(render(unsolved_grid, os.EOL), os.EOL)

let result = solver.solve()
console.log('Solved :')
console.log(render(result.sudoku, os.EOL))

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
