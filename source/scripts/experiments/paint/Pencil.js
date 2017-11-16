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
	
	mousedown(color, size) {
		this.context.strokeStyle = color
		this.context.lineWidth = size
		this.context.lineJoin = 'round'
		
		this.context.beginPath()
		this.context.moveTo(this.x, this.y)
		
		this.paint = true
	}
	
}
