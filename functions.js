const ANIMATION_HEIGHT = 500;
const levelOne = new Object({floor:1, pHeight:417});
const levelTwo = new Object({floor:2, pHeight:334});
const levelThree = new Object ({floor:3, pHeight:249});
const levelFour = new Object ({floor:4, pHeight:166})
const levelFive = new Object ({floor:5, pHeight:83})
const levelSix = new Object ({floor:6, pHeight:0})
let ELEVATOR = document.querySelector('#elevator');
ELEVATOR.style.top = getComputedStyle(ELEVATOR).top
let ePos = parseInt(ELEVATOR.style.top);
const allFloors = [levelOne,levelTwo,levelThree,levelFour,levelFive,levelSix]
let floorQ = [];


function moveElevatorUp(){
	function animateElevator(){
		if (ePos != floorQ[0].pHeight){
		ELEVATOR.style.top = `${ePos-1}px`
		ePos = ePos-1;
		window.requestAnimationFrame(animateElevator);
		}
		else{
			ting();
			floorQ.shift()
			return setTimeout(processQ,1000)
		}
	}
	window.requestAnimationFrame(animateElevator);
}
function moveElevatorDown(){
	function animateElevator(){
		if (ePos != floorQ[0].pHeight){
		ELEVATOR.style.top = `${ePos+1}px`
		ePos = ePos+1;
		window.requestAnimationFrame(animateElevator);
		}
		else{
			ting()
			floorQ.shift()
			return setTimeout(processQ,1000)
		}
	}
	window.requestAnimationFrame(animateElevator);
}



//this function is to help insert floor requests into the middle of the floorQ array
function findSplice(val){
	for(var i = val.length -1;i > 0;i--){
		let crrnt = parseInt(val[i].floor)
		let nxt = parseInt(val[i-1].floor)
		if (crrnt < nxt){
			return i
		}
	}
}
//calling it early because stack limit was exceeding 
let edgeCase = findSplice(floorQ)

function findPlace(val){
	let lastFloor = floorQ[floorQ.length-1].floor;
	let firstFloor = floorQ[0].floor;
	let newFloor = val.floor;

	
	if (lastFloor > firstFloor && newFloor < lastFloor){
		floorQ.push(val);
		console.log('case 1 '+ val.floor)
	}
	else if (lastFloor < firstFloor && newFloor > firstFloor ){
		
		floorQ.splice(edgeCase, 0, val)
		console.log(floorQ +' Splicing for '+val.floor)
	}
	else if (lastFloor < newFloor){
		floorQ.push(val)
		console.log('case 3 '+ val.floor)
	}	
}


function addToQ(val){
	if(floorQ.length === 0){
		floorQ.push(val)
		console.log('pushing w/process')
		return	processQ()
	}
	else if(floorQ.length === 1){
		console.log('simple push no process')
		floorQ.push(val)
	}
	
	
	else
		console.log('inserting with a find plc')
		return findPlace(val)	
}
function processQ(){
	if(floorQ.length === 0){
		return 
	}
	else if (ePos > floorQ[0].pHeight){
		console.log('processing case up')
		moveElevatorUp();
	}
	else if(ePos < floorQ[0].pHeight){
		console.log('processing case down')
		moveElevatorDown();
	}
}

function attachListeners(){
	let allButtons = document.querySelectorAll('input')
	for (var i = 0; i < allButtons.length;i++){
		let target = allButtons[i]
		
		
		target.addEventListener('click', function push(){
			let selectedFL = allFloors[target.value-1]
			var checkArray = floorQ.filter(obj =>{
				return obj === selectedFL;
			})
			if (checkArray.length != 0){
				return console.log('Error: Floor has been called')
			}
			else{
				addToQ(selectedFL)
			}	
		})
		


	} 
}
attachListeners();

