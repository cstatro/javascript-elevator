const ANIMATION_HEIGHT = 500;
const levelOne = new Object({floor:1, pHeight:417});
const levelTwo = new Object({floor:2, pHeight:334});
const levelThree = new Object ({floor:3, pHeight:249});
const levelFour = new Object ({floor:4, pHeight:166})
const levelFive = new Object ({floor:5, pHeight:83})
const levelSix = new Object ({floor:6, pHeight:0})
let ELEVATOR = document.querySelector('#elevator');
ELEVATOR.direction = 'stop'
ELEVATOR.style.top = getComputedStyle(ELEVATOR).top
let ePos = parseInt(ELEVATOR.style.top);
const allFloors = [levelOne,levelTwo,levelThree,levelFour,levelFive,levelSix]
let floorQ = [];
let lastStop = ''


function moveElevatorUp(){
	function animateElevator(){
		if (ePos != floorQ[0].pHeight){
		ELEVATOR.style.top = `${ePos-1}px`
		ePos = ePos-1;
		window.requestAnimationFrame(animateElevator);
		}
		else{
			turnButtonWhite()
			lastStop = floorQ[0].floor
			//console.log(lastStop)
			floorQValues()
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
			turnButtonWhite()
			lastStop = floorQ[0].floor
			//console.log(lastStop + ' is the last stop') 
			floorQValues()
			ting()
			floorQ.shift()
			return setTimeout(processQ,1000)
		}
	}
	window.requestAnimationFrame(animateElevator);
}



//these functions facilitate inserting floor requests into the middle of the floorQ array
//use case ascending
function findSplice(val){
	for(var i = val.length -1;i > 0;i--){
		let crrnt = parseInt(val[i].floor)
		let nxt = parseInt(val[i-1].floor)
		if (crrnt < nxt){
			return i
		}
	}
}




//calling it early because stack limit was exceeding 6 4 3


function findPlace(val){
	let lastFloor = floorQ[floorQ.length-1].floor;
	let firstFloor = floorQ[0].floor;
	let newFloor = val.floor;
	let ascendingSplice = findSplice(floorQ)

	if (lastFloor < firstFloor && newFloor > firstFloor || newFloor > lastFloor && newFloor < firstFloor){
		 console.log(`Ascending splice in ${val.floor} at ${ascendingSplice}`)
		 return floorQ.splice(ascendingSplice, 0, val)
		//console.log(floorQ +' Splicing for '+val.floor)
	}
	
	else {
		return floorQ.push(val)
		//console.log('case 3 '+ val.floor)
	}	
}


function addToQ(val){
	if(floorQ.length === 0){
		floorQ.push(val)
		return	processQ()
	}
	else if(floorQ.length === 1){
		//console.log('simple push no process')
		 return floorQ.push(val)
	}
	else
		console.log('inserting with a find plc')
		return findPlace(val)	
}
function processQ(){
	if(floorQ.length === 0){
		
		return console.log('EMPTY')
	}
	else if (ePos > floorQ[0].pHeight){
		//console.log('processing case up')
		moveElevatorUp();
	}
	else if(ePos < floorQ[0].pHeight){
		//console.log('processing case down')
		moveElevatorDown();
	}
}

function attachListeners(){
	let allButtons = document.querySelectorAll('input')
	for (var i = 0; i < allButtons.length;i++){
		let target = allButtons[i]
		
		
		target.addEventListener('click', function push(){
			let selectedFL = allFloors[target.value-1]
			console.log('floor sent '+ target.value)
			var checkArray = floorQ.filter(obj =>{
				return obj === selectedFL;
			})
			if (checkArray.length != 0){
				return console.log('Error: Floor has been called')
			}
			else{
				target.style.backgroundColor = 'yellow'
				addToQ(selectedFL)
			}	
		})
		
	} 
}
attachListeners();

function turnButtonWhite(){
	let allButtons = document.querySelectorAll('input')
	let floorNum = (floorQ[0].floor)
	let targetButton = document.getElementById(`${floorNum}`)
	console.log(targetButton.value+' floor processed')
	targetButton.style.backgroundColor ='white'
}

