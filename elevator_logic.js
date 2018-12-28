

function findSplice(val){
	for(var i = val.length -1;i > 0;i--){
		let crrnt = parseInt(val[i].floor)
		let nxt = parseInt(val[i-1].floor)
		if (crrnt < nxt){
			return i
		}
	}
}

//use case: floor is at 0 elevator is called to 6, 5 is pressed before Elevator reaches 6

function secondPressUp(val){
    let destination = val.pHeight;
    if (ePos > destination && val.floor < floorQ[0].floor){
        floorQ.unshift(val)
    }
    else{
        floorQ.push(val);
    }
}

// use case Elevator is at 6,  1 is called, elevator is moving 3 is called. 
function secondPressDown(val){
    let destination = val.pHeight;
    if (ePos < destination && val.floor > floorQ[0].floor){
        floorQ.unshift(val)
    }
    else{
        floorQ.push(val);
    }
}

