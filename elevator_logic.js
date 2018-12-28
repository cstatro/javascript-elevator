

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

// solving elevator is at 3  , Q is [5,6] 4 is called, then one quickly after. So Q should be [4,5,6]. if 2 [5,6,2]
function calledUp(val){
    let destination = val.pHeight;
    if (ePos > destination && val.floor < floorQ[0].floor){ 
        return floorQ.unshift(val)
    }
    else{
        return floorQ.push(val)
    }
}

function calledDown(val){
    let destination = val.pHeight;
    if (ePos < destination && val.floor > floorQ[0].floor){ 
        return floorQ.unshift(val)
    }
    else{
        return floorQ.push(val)
    }
}