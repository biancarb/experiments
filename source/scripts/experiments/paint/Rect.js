export default class Rect {
	
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
			const height = this.y - this.startY
			
			this.context.strokeRect(this.startX, this.startY, width, height)
		}
	}
	
	mouseup() {
		this.paint = false
	}
	
}
