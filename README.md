# Sudoku Solver

This is a small NodeJS library for solving Sudoku grids.

# Algorithm

- For each cell:
    - Initialize possible value to the 1..9 range

- While the gris is not solved:
    - Set the flag to re-run to false.
    - For each cell:
        - Eliminate the possibles values by looking for them in the 3x3 grid, row and column.
        - If a cell contains only one possible value, set that value for the cell.
        - If a cell still contains possible values, set a flag to re-run to true.
    - If the flag to re-run is set to true, re-run.

- Print the result in the console.

## To do

1. If a possible number is present in only one cell of a sub-grid, set that number in the cell.
2. If two or three possible identical possible values in the same sub-grid are aligned, they remove possible values of the same number in the row or column they are aligned.
3. Among the possible remaining values in a sub-grid, if they are aligned, do TODO #2 (above).

# Vocabulary

Ranges are inclusive.

## Grid:
A 9x9 Cell grid representing a Sudoku grid.


## Cell: number
A number in the grid, range 1 to 9.

## CellIndex: number
The index of a Cell in the Grid, range 0 to 80.

## CellRowIndex: number
The index of the Row of a Cell in the Grid, range 0 to 8.

## CellColumnIndex: number
The index of the Column of a Cell in the Grid, range 0 to 8.

## CellSubGridIndex: number
The index of a Cell in the SubGrid, range 0 to 8.


## Row: number[]
An array of Cell representing all the cells in a row in the Grid, length 9.

## RowIndex: number
The index of the Row in the Grid, range 0 to 8.


## Column: number[]
An array of Cell representing all the cells in a column in the Grid, length 9.

## ColumnIndex: number
The index of the Column in the Grid, range 0 to 8.


## SubGrid: number[]
A 3x3 Cell grid representing one of the nine sub-grids in a Sudoku grid.

## SubGridIndex: number
The index of the SubGrid in the Grid, range 0 to 8.
