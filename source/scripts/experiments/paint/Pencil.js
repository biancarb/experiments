export default class Pencil {
	
	constructor(context) {
		this.context = context
		
		this.x = null
		this.y = null
		
		this.paint = false
	}
	
	mousemove(event) {
		this.x = event.clientX
		this.y = event.clientY
		
		if (this.paint) {
			this.context.lineTo(this.x, this.y)
			this.context.stroke()
		}
	}
	
	mouseup() {
		this.paint = false
	}
	
	mousedown() {
		this.context.fillStyle = '#000'
		this.context.lineWidth = 10
		this.context.lineJoin = 'round'
		
		this.context.beginPath()
		this.context.moveTo(this.x, this.y)
		
		this.paint = true
	}
	
}
