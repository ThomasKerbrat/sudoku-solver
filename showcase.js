const os = require('os')

const Grid = require('./src/grid.js')
const Solver = require('./src/solver.js')

const sampleGrid = require('./test/data/grid-2.js')

let grid = new Grid(sampleGrid.unresolved)
let solver = new Solver(grid)

let unsolvedGrid = Grid.buildArrayFromString(sampleGrid.unresolved)
unsolvedGrid = unsolvedGrid.map(function (value) {
  if (value === 0) {
    return '.'
  } else {
    return value
  }
})
console.log('Unsolved :')
console.log(render(unsolvedGrid, os.EOL), os.EOL)

let result = solver.solve()
console.log('Solved :')
console.log(render(result.sudoku, os.EOL))

function render (grid, endOfLine) {
  let output = []

  for (let index = 0; index < grid.length; index++) {
    if (index > 0 && index % 3 === 0) { output.push(' ') }
    if (index > 0 && index % 9 === 0) { output.push(endOfLine) }
    if (index > 0 && index % 27 === 0) { output.push(endOfLine) }
    output.push(grid[index], ' ')
  }

  return output.join('')
}
