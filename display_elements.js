let MAIN = document.querySelector('#main')

function drawLines(){
	let floorMeasurements = []
	for (var i = 0;i < allFloors.length; i++){
		floorMeasurements.push(allFloors[i].pHeight)
}
	for (var i = 0; i < floorMeasurements.length; i++){
		let floorLine = document.createElement('div')
			floorLine.style.position = 'absolute'
			floorLine.style.width = '255px'
			floorLine.style.left = '245px'
			floorLine.style.height = '1px'
			floorLine.style.backgroundColor = 'brown'
			floorLine.style.top = `${floorMeasurements[i]}px`
			floorLine.id = i
			MAIN.append(floorLine)
	}
}
drawLines();

function ting(){
	var ding = new Audio('ding.mp3')
	ding.play();
}