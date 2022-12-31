type SudokuValues = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '.';

function solveSudoku(input: SudokuValues[][]): SudokuValues[][] {
    solver(input, 0, 0);
    return input;
}

function solver(input: SudokuValues[][], row: number, col: number): boolean {
    if (row > 8) {
        return true;
    }

    let nextRow: number = row, nextCol: number = col + 1;
    if (nextCol > 8) {
        nextRow++;
        nextCol = 0;
    }

    if (input[row][col] === '.') {
        for (let i: number = 1; i <= 9; i++) {
            if (validRow(input, row, i) && validCol(input, col, i) && validBox(input, row, col, i)) {
                input[row][col] = i.toString() as SudokuValues;
                if (solver(input, nextRow, nextCol)) {
                    return true;
                }
            }
        }
        input[row][col] = '.' as SudokuValues;
        return false;
    }
        
    return solver(input, nextRow, nextCol);
}

function validRow(input: SudokuValues[][], row: number, num: number): boolean {
    for (let col: number = 0; col < 9; col++) {
        if (input[row][col] == num.toString()) {
            return false;
        }
    }
    return true;
}

function validCol(input: SudokuValues[][], col: number, num: number): boolean {
    for (let row: number = 0; row < 9; row++) {
        if (input[row][col] == num.toString()) {
            return false;
        }
    }
    return true;
}

function validBox(input: SudokuValues[][], row: number, col: number, num: number): boolean {
    let boxRow: number = Math.floor(row / 3) * 3;
    let boxCol: number = Math.floor(col / 3) * 3;
    for (let i: number = 0; i < 3; i++) {
        for (let j: number = 0; j < 3; j++) {
            if (input[boxRow + i][boxCol + j] == num.toString()) {
                return false;
            }
        }
    }
    return true;
}