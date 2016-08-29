const os = require('os')

const Grid = require('./src/grid.js')
const Solver = require('./src/solver.js')

const sample_grid = require('./tests/data/grid-2.js')

let grid = new Grid(sample_grid.unresolved)
let solver = new Solver(grid)

console.log('Unsolved :')
console.log(render(
    Grid.build_array_from_string(sample_grid.unresolved).map(function (value) {
        if (value === 0) { return '.' } else { return value }
    })
), os.EOL)

let solved_grid = solver.solve()
console.log('Solved :')
console.log(render(solved_grid))

function render(grid) {
    let output = []

    for (let index = 0; index < grid.length; index++) {
        if (index > 0 && index % 3 === 0) { output.push(' ') }
        if (index > 0 && index % 9 === 0) { output.push(os.EOL) }
        if (index > 0 && index % 27 === 0) { output.push(os.EOL) }
        output.push(grid[index], ' ')
    }

    return output.join('')
}
