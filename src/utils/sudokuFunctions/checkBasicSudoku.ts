import { CellArray } from ".."

const testSetsForSum = (arr: number[][]): boolean => {
    let testPass = true
    arr.forEach(set => {
        if (set.reduce((a: number, b: number)=> a + b, 0) !== 45) { testPass = false }
    })
    return testPass
}

const testSetsForNineDigits = (arr: number[][]): boolean => {
    let testPass = true
    arr.forEach(set => {
        if (set.sort().toString() !== "1,2,3,4,5,6,7,8,9") { testPass = false }
    })
    return testPass
}

const checkBasicSudoku = (cellData: CellArray): boolean => {
    const rowSets: number[][] = new Array(9).fill(0).map(() => new Array(9).fill(0));
    const columnSets: number[][] = new Array(9).fill(0).map(() => new Array(9).fill(0));
    const groupSets: number[][] = new Array(9).fill(0).map(() => new Array(9).fill(0));

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (cellData[i][j]?.value === undefined) { return false }
            rowSets[i][j] = cellData[i][j].value
            columnSets[j][i] = cellData[i][j].value
            groupSets[Math.floor(i / 3) * 3 + Math.floor(j / 3)][(i % 3) * 3 + (j % 3)] = cellData[i][j].value
        }
    }

    // check if all rows/colums/group add to 45 for a fast check
    if(!testSetsForSum(rowSets) || !testSetsForSum(columnSets) || !testSetsForSum(groupSets)) {return false}

    // if previous passes, check each row/column/group contains numbers 1 to 9
    if(!testSetsForNineDigits(rowSets) || !testSetsForNineDigits(columnSets) || !testSetsForNineDigits(groupSets)) {return false}

    return true
}

export default checkBasicSudoku