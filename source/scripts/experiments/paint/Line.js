export default class Line {
	
	constructor(context) {
		this.context = context
		
		this.x = null
		this.y = null
		
		this.startX = null
		this.startY = null
		
		this.paint = false
	}
	
	mousemove(event) {
		this.x = event.clientX
		this.y = event.clientY
		
		if (this.paint) {
			this.context.clearRect(0, 0, window.innerWidth, window.innerHeight)
			
			this.context.beginPath()
			this.context.moveTo(this.startX, this.startY)
			this.context.lineTo(this.x, this.y)
			this.context.stroke()
		}
	}
	
	mouseup() {
		this.paint = false
	}
	
	mousedown(color, size) {
		this.startX = this.x
		this.startY = this.y
		
		this.context.strokeStyle = color
		this.context.lineWidth = size
		this.context.lineJoin = 'round'
		
		this.paint = true
	}
	
}
