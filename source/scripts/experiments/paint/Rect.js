export default class Rect {
	
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
			const width = this.x - this.startX
			const height = this.y - this.startY
			
			this.context.clearRect(0, 0, window.innerWidth, window.innerHeight)
			
			this.context.strokeStyle = '#000'
			this.context.lineWidth = 10
			
			this.context.strokeRect(this.startX, this.startY, width, height)
		}
	}
	
	mouseup() {
		this.paint = false
	}
	
	mousedown() {
		this.startX = this.x
		this.startY = this.y
		
		this.paint = true
	}
	
}
