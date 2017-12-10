export default class Circle {
	
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
		
		this.paint = true
	}
	
	mousemove(x, y) {
		this.x = x
		this.y = y
		
		if (this.paint) {
			this.context.clearRect(0, 0, window.innerWidth, window.innerHeight)
			
			this.context.save()
			this.context.beginPath()
			
			const scaleX = (this.x - this.startX) / 2
			const scaleY = (this.y - this.startY) / 2
			
			this.context.scale(scaleX, scaleY)
			
			const centerX = (this.startX / scaleX) + 1
			const centerY = (this.startY / scaleY) + 1
			
			this.context.arc(centerX, centerY, 1, 0, Math.PI * 2)
			
			this.context.restore()
			this.context.stroke()
		}
	}
	
	mouseup() {
		this.paint = false
	}
	
}
