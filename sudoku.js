let currentDigit = null;

let errors = 0;

let emptySlots = 0;

class Block {
	constructor() {
		this.row0 = [];
		this.row1 = [];
		this.row2 = [];
	}
}

let block0 = new Block;
let block1 = new Block;
let block2 = new Block;
let block3 = new Block;
let block4 = new Block;
let block5 = new Block;
let block6 = new Block;
let block7 = new Block;
let block8 = new Block;

function randomNumber(arr){
	let num = arr[Math.floor(Math.random() * arr.length)];
	return num;
}

function fillBlockRows() {
	let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++){
			let num = randomNumber(arr);
			arr.splice(arr.indexOf(num), 1);
			block0['row' + i].push(num);			
		}
	}	
	block1.row0 = block2.row2 = block0.row1;
	block1.row1 = block2.row0 = block0.row2;
	block1.row2 = block2.row1 = block0.row0;
	block3.row0 = block4.row2 = block5.row1 = [block0.row0[1], block0.row0[2], block0.row0[0]];
	block3.row1 = block4.row0 = block5.row2 = [block0.row1[1], block0.row1[2], block0.row1[0]];
	block3.row2 = block4.row1 = block5.row0 = [block0.row2[1], block0.row2[2], block0.row2[0]];
	block6.row0 = block7.row2 = block8.row1 = [block0.row0[2], block0.row0[0], block0.row0[1]];
	block6.row1 = block7.row0 = block8.row2 = [block0.row1[2], block0.row1[0], block0.row1[1]];
	block6.row2 = block7.row1 = block8.row0 = [block0.row2[2], block0.row2[0], block0.row2[1]];
}

fillBlockRows();

function fillRow(rowNumber, object1, object2, object3) {
	let row = object1['row' + rowNumber].concat(object2['row' + rowNumber]
		.concat(object3['row' + rowNumber]));
	return row;
}

let row0 = fillRow(0, block0, block1, block2);
let row1 = fillRow(1, block0, block1, block2);
let row2 = fillRow(2, block0, block1, block2);
let row3 = fillRow(0, block3, block4, block5);
let row4 = fillRow(1, block3, block4, block5);
let row5 = fillRow(2, block3, block4, block5);
let row6 = fillRow(0, block6, block7, block8);
let row7 = fillRow(1, block6, block7, block8);
let row8 = fillRow(2, block6, block7, block8);

let rows = [row0, row1, row2, row3, row4, row5, row6, row7, row8];

function shuffle() {
	let i = randomNumber([0, 1, 2]);
	let j = randomNumber([3, 4, 5]);
	let l = randomNumber([6, 7, 8]);
	[rows[0], rows[i]] = [rows[i], rows[0]]; 
	[rows[4], rows[j]] = [rows[j], rows[4]]; 
	[rows[8], rows[l]] = [rows[l], rows[8]];
	for (let t = 0; t < rows.length; t++) {
		[rows[t][0], rows[t][i]] = [rows[t][i], rows[t][0]]; 
		[rows[t][4], rows[t][j]] = [rows[t][j], rows[t][4]]; 
		[rows[t][8], rows[t][l]] = [rows[t][l], rows[t][8]];
	}
	return rows; 
}

shuffle();
console.log(rows);

function fillField() {
	let loc;
	for (let i = 0; i < rows.length; i++) {
		for (let j = 0; j < rows[i].length; j++) {
			loc = i + '' + j;
			document.getElementById(loc).innerHTML = rows[i][j];
			document.getElementById(loc).classList.add(rows[i][j]);
		}
	}
}

fillField();

function removeParts(num) {
	let loc;
	for (let i = 0; i < rows.length; i++) {
		let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];		
		for (let l = 0; l < num; l++) {
			let j = randomNumber(arr);
			arr.splice(arr.indexOf(j), 1);
			loc = i + '' + j;
			document.getElementById(loc).innerHTML = '';
			document.getElementById(loc).classList.add('playable');
			emptySlots++;		
		}		
	}

}

removeParts(1);

function init() {
	let loc;
	for (let i = 0; i < rows.length; i++) {
		for (let j = 0; j < rows[i].length; j++) {
			loc = i + '' + j;
			document.getElementById(loc).addEventListener('click', setDigit, false);
		}
	}
	for (let i = 0; i <= 9; i++) {
		document.getElementById(i).addEventListener('click', chooseDigit, false);
	}
}

function chooseDigit(e) {
	document.querySelector('.choosen')
	? document.querySelector('.choosen').classList.remove('choosen')
	: false;
	e.target.classList.add('choosen');
	currentDigit = e.target.innerHTML;
}


function setDigit(e) {
	if (currentDigit && e.target.classList.contains('playable')) {
		if (!e.target.innerHTML) {
			emptySlots--;
		}
		e.target.innerHTML = currentDigit;
		if (e.target.classList.contains(currentDigit)) {
			if (e.target.classList.contains('error')) {
				errors--; console.log(errors);			
			}
			e.target.classList.add('ok');
			e.target.classList.remove('error');
		} else {
			if (e.target.classList.contains('ok') || !e.target.classList.contains('error')) {
				errors++; console.log(errors);
			}
			e.target.classList.add('error');
			e.target.classList.remove('ok');
		}
	}
	if (emptySlots <=0 && errors <= 0) {
		alert('win');
	}
}

window.onload = init;