let blockRow = {
	0: [],
	1: [],
	2: []
}
let blockCol = {
	0: [],
	1: [],
	2: []
}
let row0 = [];
let row1 = [];
let row2 = [];
let col0 = [];
let col1 = [];
let col2 = [];
function randomNumber(arr){
	let num = arr[Math.floor(Math.random() * arr.length)];
	return num;
}
function fillBlockRow(object) {
	let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++){
			let num = randomNumber(arr);
			arr.splice(arr.indexOf(num), 1);
			object[i].push(num);			
		}
	}
}
function fillBlockCol(object) {
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			object[i].push(blockRow[j][i]);

		}
	}
}
fillBlockRow(blockRow);
fillBlockCol(blockCol);
function fillRow(index) {
	let row;
	if (index === 0) {
		row = blockRow[0].concat(blockRow[1].concat(blockRow[2])); 
	} else if (index === 1) {
		row = blockRow[1].concat(blockRow[2].concat(blockRow[0]));
	} else {
		row = blockRow[2].concat(blockRow[0].concat(blockRow[1])); 
	}
	return row;
}
function fillCol(index) {
	let col;
	if (index === 0) {
		col = blockCol[0].concat(blockCol[1].concat(blockCol[2])); 
	} else if (index === 1) {
		col = blockCol[1].concat(blockCol[2].concat(blockCol[0]));
	} else {
		col = blockCol[2].concat(blockCol[0].concat(blockCol[1])); 
	}
	return col;
}

row0 = fillRow(0);
row1 = fillRow(1);
row2 = fillRow(2);
col0 = fillCol(0);
col1 = fillCol(1);
col2 = fillCol(2);

console.log(row0, row1, row2, col0, col1, col2);