export default class Rect {
	
	constructor(context) {
		this.context = context
		
		this.x = null
		this.y = null
		
		this.startX = null
		this.startY = null
		
		this.paint = false
	}
	
	mousedown(color, size) {
		this.startX = this.x
		this.startY = this.y
		
		this.context.strokeStyle = color
		this.context.lineWidth = size
		this.context.lineJoin = 'miter'
		
		this.paint = true
	}
	
	mousemove(event) {
		this.x = event.clientX
		this.y = event.clientY
		
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
