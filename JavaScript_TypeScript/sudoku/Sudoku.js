function solveSudoku(input) {
    solver(input, 0, 0);
    return input;
}
function solver(input, row, col) {
    if (row > 8) {
        return true;
    }
    var nextRow = row, nextCol = col + 1;
    if (nextCol > 8) {
        nextRow++;
        nextCol = 0;
    }
    if (input[row][col] === '.') {
        for (var i = 1; i <= 9; i++) {
            if (validRow(input, row, i) && validCol(input, col, i) && validBox(input, row, col, i)) {
                input[row][col] = i.toString();
                if (solver(input, nextRow, nextCol)) {
                    return true;
                }
            }
        }
        input[row][col] = '.';
        return false;
    }
    return solver(input, nextRow, nextCol);
}
function validRow(input, row, num) {
    for (var col = 0; col < 9; col++) {
        if (input[row][col] == num.toString()) {
            return false;
        }
    }
    return true;
}
function validCol(input, col, num) {
    for (var row = 0; row < 9; row++) {
        if (input[row][col] == num.toString()) {
            return false;
        }
    }
    return true;
}
function validBox(input, row, col, num) {
    var boxRow = Math.floor(row / 3) * 3;
    var boxCol = Math.floor(col / 3) * 3;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (input[boxRow + i][boxCol + j] == num.toString()) {
                return false;
            }
        }
    }
    return true;
}
