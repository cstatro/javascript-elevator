

function findSplice(val){
	for(var i = val.length -1;i > 0;i--){
		let crrnt = parseInt(val[i].floor)
		let nxt = parseInt(val[i-1].floor)
		if (crrnt < nxt){
			return i
		}
	}
}