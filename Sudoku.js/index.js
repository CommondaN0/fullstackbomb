function checkRow(num, area, row) {
    const rowCheck = area[row];
    for(let i = 0; i < 9; ++i) {
        if(rowCheck[i] === num) {
            return false;
        }
    }
    return true;
};


function checkColumn(num, area, column) {
    for(let i = 0; i < area.length; ++i) {
        const checked = area[i][column];
        if(checked === num) {
            return false;
        }
    }
    return true;
};


function checkCube(num, area, row, column) {
    // const beginsOfCubes = [[0,0], [0,3], [0,6],
    //                        [3,0], [3,3], [3,6],
    //                        [6,0], [6,3], [6,6]];
    // let cube;
    // for(let i = 0; i < beginsOfCubes.length; ++i) {
    //     if((beginsOfCubes[i][0] + 3 > column) && (beginsOfCubes[i][0] <= column) &&
    //        (beginsOfCubes[i][1] + 3 > row) && (beginsOfCubes[i][1] <= row)) {
    //             cube = beginsOfCubes[i];
    //             break;
    //     }
    // }
    const cube = [Math.floor(row / 3)* 3, Math.floor(column / 3)* 3];

    for(let i = cube[0]; i < cube[0] + 3; i++) {
        for(let j = cube[1]; j < cube[1] + 3; j++) {
            if(area[i][j] === num) {
                return false;
            }          
        }
    }
    return true;
};


// function checkLastNum(num, area, row, column) {
//     const buffer = new Set();
//     while(!(checkRow(num, area, row) && checkColumn(num, area, column) && checkCube(num, area, row, column) && !(buffer.length === 9))) {
//         num = getRandomInt(1, 9);
//         buffer.add(num);
//         if(buffer.length === 9) {
//             return false;
//         }
//     }
//     return true;
// }


function checkLastNum(num, area, row, column) {
    const used = new Set();
   
    for(let candidate = 1; candidate <= 9; candidate++) {
        if(checkRow(candidate, area, row) &&
           checkColumn(candidate, area, column) &&
           checkCube(candidate, area, row, column)) {
            num = candidate;
            return true;
        }
        used.add(candidate);
    }
   
    return false;
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function generateArea() {
    const area = new Array(9);


    for(let i = 0; i < area.length; ++i) {
        area[i] = new Array(9).fill(0);
    }

    let i = 0;
    while(i < 9) {
        let column = area[i];
        let j = 0;
        let attempt = 0
        let flagI = 0;
        while(j < 9) {
            let num = 0;
            let flagJ = 0;
            while(!(checkRow(num, area, i) && checkColumn(num, area, j) && checkCube(num, area, i, j))) {
                num = getRandomInt(1, 9);
                if(j === 8 && !checkLastNum(num, area, i, j)) {
                    ++attempt;
                    j = 0;
                    flagJ = 1;
                    column.fill(0);
                    break;
                }                
            }
            if(attempt === 100) {
                flagI = 1;
                i = 0;
                break;
            }
            if(!flagJ) {
                column[j] = num;
                ++j;
            }
        }
        if(flagI) {
            area = new Array(9);
            for(let i = 0; i < area.length; ++i) {
                area[i] = new Array(9).fill(0);
            }
            continue;
        }
        ++i;
        console.log(column);
        // console.log(area);
    }
    // console.log(area);
    return area;
};


const area = generateArea();
// .reduce((acc, val, i) => {
//     acc += val.join(" ") + "\n";
//     return acc;
// }, "");
console.log(area)

// const area = new Array(9);


// for(let i = 0; i < area.length; ++i) {
//     area[i] = new Array(9).fill(0);
// }

// console.log(area);

// checkCube(3, area, 6, 2);