export default class Triangle {
	
	constructor(context) {
		this.context = context
		
		this.x = null
		this.y = null
		
		this.startX = null
		this.startY = null
		
		this.paint = false
	}
	
	mousedown(x, y, color, size) {
		this.startX = x
		this.startY = y
		
		this.context.strokeStyle = color
		this.context.lineWidth = size
		this.context.lineJoin = 'miter'
		
		this.paint = true
	}
	
	mousemove(x, y) {
		this.x = x
		this.y = y
		
		if (this.paint) {
			this.context.clearRect(0, 0, window.innerWidth, window.innerHeight)
			
			const width = this.x - this.startX
			const middle = this.x - Math.round(width / 2)
			
			this.context.beginPath()
			this.context.moveTo(middle, this.startY)
			this.context.lineTo(this.startX, this.y)
			this.context.lineTo(this.x, this.y)
			this.context.closePath()
			this.context.stroke()
		}
	}
	
	mouseup() {
		this.paint = false
	}
	
}
