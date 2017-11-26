export default class Line {
	
	constructor(context) {
		this.context = context
		
		this.x = null
		this.y = null
		
		this.startX = null
		this.startY = null
		
		this.color = null
		this.size = null
		
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
			
			this.circle()
		}
	}
	
	mouseup() {
		this.paint = false
	}
	
	mousedown(color, size) {
		this.startX = this.x
		this.startY = this.y
		
		this.context.strokeStyle = this.color = color
		this.context.lineWidth = this.size = size
		this.context.lineJoin = 'round'
		
		this.paint = true
	}
	
	circle() {
		const radius = Math.round(this.size / 2)
		
		this.context.fillStyle = this.color
		
		this.context.beginPath()
		this.context.arc(this.startX, this.startY, radius, 0, Math.PI * 2)
		this.context.arc(this.x, this.y, radius, 0, Math.PI * 2)
		this.context.fill()
	}
	
}