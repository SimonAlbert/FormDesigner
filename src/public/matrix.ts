// 在指定位置插入一行
function insertRow(matrix: Array<Array<any>>, index: number, row: Array<any>) {
  matrix.splice(index, 0, row);
}

// 在指定位置插入一列
function insertColumn(matrix: Array<Array<any>>, index: number, column: any) {
  matrix.forEach((row, rowIndex) => {
    matrix[rowIndex] = [...row.slice(0, index), column, ...row.slice(index)];
  });
}

// 删除指定行
function deleteRow(matrix: Array<Array<any>>, index: number) {
  matrix.splice(index, 1);
}

// 删除指定列
function deleteColumn(matrix: Array<Array<any>>, index: number) {
  matrix.forEach(row => {
    row.splice(index, 1);
  });
}
// 删除最后n列
function deleteLastColumn(matrix: Array<Array<any>>, num: number) {
  matrix.forEach(row => {
    row.splice(row.length - num, num);
  });
}
// 删除最后n行
function deleteLastRow(matrix: Array<Array<any>>, num: number) {
  matrix.splice(matrix.length - num, num);
}
// 新增n列
function addEmptyColumn(matrix: Array<Array<any>>, num: number, func: any) {
  matrix.forEach(row => {
    row.push(...Array(num).fill(func()));
  });
}
//新增n行
function addEmptyRow(matrix: Array<Array<any>>, num: number, func: any) {
  // matrix是一个二维度数组, 为他添加num行, 且每行的内容都是func()的返回值
  matrix.push(...Array(num).fill(Array(matrix[0].length).fill(func())))
}

export {
  insertRow,
  insertColumn,
  deleteRow,
  deleteColumn,
  deleteLastColumn,
  deleteLastRow,
  addEmptyColumn,
  addEmptyRow
}
