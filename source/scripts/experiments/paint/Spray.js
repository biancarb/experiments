export default class Spray {
	
	constructor(context) {
		this.context = context
		
		this.x = null
		this.y = null
		
		this.size = null
		
		this.animationFrame = null
	}
	
	mousedown(color, size) {
		this.context.fillStyle = color
		this.context.lineWidth = this.size = size
		this.context.lineJoin = 'round'
		
		this.sprayParticles()
	}
	
	mousemove(event) {
		this.x = event.clientX
		this.y = event.clientY
	}
	
	mouseup() {
		window.cancelAnimationFrame(this.animationFrame)
	}
	
	sprayParticles() {
		const density = this.size * 3
		
		for (let i = 0; i < density; i++) {
			const offset = this.getOffset()
			
			const positionX = this.x + offset.x
			const positionY = this.y + offset.y
			
			this.context.fillRect(positionX, positionY, 1, 1)
		}
		
		this.animationFrame = window.requestAnimationFrame(this.sprayParticles.bind(this))
	}
	
	getOffset() {
		const radius = Math.round(this.size / 2)
		const randomRadius = Math.random() * radius
		const angle = Math.random() * (2 * Math.PI)
		
		return {
			x: Math.cos(angle) * randomRadius,
			y: Math.sin(angle) * randomRadius
		}
	}
	
}
