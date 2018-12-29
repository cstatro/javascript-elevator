function secondPressUp(val){
    let destination = val.pHeight;
    if (ePos > destination && val.floor < floorQ[0].floor){
        floorQ.unshift(val)
    }
    else{
        floorQ.push(val);
    }
}
function secondPressDown(val){
    let destination = val.pHeight;
    if (ePos < destination && val.floor > floorQ[0].floor){
        floorQ.unshift(val)
    }
    else{
        floorQ.push(val);
    }
}
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
    else if(floorQ[endOfQ].floor < val.floor && floorQ[0].floor > val.floor){
        return prepDown(val)
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
    else if(floorQ[endOfQ].floor > val.floor && floorQ[0].floor < val.floor){
        return prepUp(val)
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
function prepDown(val){
    let floorNum = val.floor
    for (var i = floorQ.length-1; i > 0;i--){
        if (floorQ[i].floor > val.floor){
            return floorQ.splice(i+1, 0, val)
        }
    }
}
function prepUp(val){
    let floorNum = val.floor
    for (var i = floorQ.length-1; i > 0;i--){
        if (floorQ[i].floor < val.floor){
            return floorQ.splice(i+1, 0, val)
        }
    }
}