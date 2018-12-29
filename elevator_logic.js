
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
// solve for elevator at 1 call 3,6,5,4, resolve 3,4,5,6   press 1423
function calledUp(val,Q){
    let destination = val.pHeight;
    let endOfQ = Q.length-1
    if (ePos > destination && val.floor < floorQ[0].floor){ 
        return floorQ.unshift(val)
    }
    else if(ePos > destination && val.floor > floorQ[0].floor &&  val.floor < floorQ[endOfQ].floor){
        console.log('splicingup')
        return splicingUp(val)
    }
    
    else {
        console.log('called up push')
        return floorQ.push(val)
    }
}

function calledDown(val,Q){
    let destination = val.pHeight;
    let endOfQ = Q.length-1
    if (ePos < destination && val.floor > floorQ[0].floor){ 
        return floorQ.unshift(val)
    }
    else if(ePos < destination && val.floor < floorQ[0].floor &&  val.floor > floorQ[endOfQ].floor){
        console.log('splicingdown')
        return splicingDown(val)
    }
    else{
        return floorQ.push(val)
    }
}


function splicingUp(val){
    let lastFloor = floorQ[floorQ.length-1].floor;
    let floorNum = val.floor
    console.log(floorNum)
    console.log('floornum above')
    for (var i = 0; i < floorQ.length;i++){
        if (floorQ[i].floor > floorNum){
        return floorQ.splice(i, 0, val)
        }
    }
}

function splicingDown(val){
    let lastFloor = floorQ[floorQ.length-1].floor;
    let floorNum = val.floor
    console.log(floorNum)
    console.log('splicedown')
    for (var i = 0; i < floorQ.length;i++){
        if (floorQ[i].floor < floorNum){
        return floorQ.splice(i, 0, val)
        }
    }
}