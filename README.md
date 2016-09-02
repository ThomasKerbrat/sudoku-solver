# Sudoku Solver

This is a small NodeJS library for solving Sudoku grids.

## Run the sample

Run the following commands.

``` bash
git clone https://github.com/ThomasKerbrat/sudoku-solver
cd sudoku-solver
node showcase.js
```

Outputs:

```
Unsolved :
. . 2  9 . 8  . 1 .
7 . .  . 6 .  5 . .
. . 9  5 . .  . . 7

. 4 1  . 2 6  . 5 .
. 8 7  . . .  3 4 .
. 6 .  4 8 .  1 9 .

1 . .  . . 5  2 . .
. . 8  . 4 .  . . 5
. 7 .  6 . 2  8 . .

Solved :
6 5 2  9 7 8  4 1 3
7 1 4  2 6 3  5 8 9
8 3 9  5 1 4  6 2 7

9 4 1  3 2 6  7 5 8
2 8 7  1 5 9  3 4 6
5 6 3  4 8 7  1 9 2

1 9 6  8 3 5  2 7 4
3 2 8  7 4 1  9 6 5
4 7 5  6 9 2  8 3 1
```



# Algorithm

- For each cell:
    - Initialize possible value to the 1..9 range

- While the flag to re-run is set to true:
    - Set the flag to re-run to false.
    - For each cell:
        - If the cell has a value, go to the next cell.
        - Compute the possibles values by looking for already set values in the 3x3 subgrid, row and column.
        - If a cell contains only one possible value, set that value for the cell.
        - If a cell still contains possible values, set a flag to re-run to true.

## To do

1. If a possible number is present in only one cell of a row, a subgrid or a column, set that number in the cell.
2. If two or three identical possible values in the same square are aligned, remove possible values of the same number in the row or column they are aligned.
3. Among the possible remaining values in a square, if they are aligned, do TODO #2 (above).



# The object model

Here are TypeScript class definitions to show the object model underlying this solver.
It is actually implemented as plain ES6 classes.

``` typescript
class Grid {
    cells: Cell[];
    rows: Region[];
    columns: Region[];
    subgrids: Region[];
    solve: () => {
        solved: boolean;
        iterations: number;
        sudoku: Cell[];
    }
}

class Cell {
    value: number;
    has_value: boolean;
    compute_candidates: () => number[];
    row: Region;
    column: Region;
    subgrid: Region;
}

class Region {
    constructor: (
        // All the cells in the grid.
        grid_cells: Cell[],
        // Index of the region relative to the grid. Ranging from 0 to 8.
        region_index: number,
        // Type of the region (e.g. row, column or subgrid).
        region_type: string,
        // A function to compute the index of a cell, inside a region, relative to the grid.
        strategy: function
    ) => void;
    cells: Cell[];
}

class RegionStrategy {
    static Row: (
        // Current index in the grid. Ranging from 0 to 80.
        grid_index: number,
        // Index relative to the region. Ranging from 0 to 8.
        region_index: number
    ) => number;
    static Column: (grid_cells, region_index) => number;
    static Subgrid: (grid_cells, region_index) => number;
}
```
