import { hexToRgba } from '../../library/colors'

export default class Bubble {
	
	constructor(canvas, context, x, y, velocityX, velocityY, radius, color, duration) {
		this.canvas = canvas
		this.context = context
		this.x = x
		this.y = y
		this.velocityX = velocityX
		this.velocityY = velocityY
		this.radius = radius
		this.color = color
		this.duration = duration
		this.opacity = 1
	}
	
	update() {
		this.x += this.velocityX
		this.y += this.velocityY
		this.checkBounds()
		
		this.draw()
		
		this.radius -= this.radius / (this.duration / 0.1)
		this.opacity -= this.opacity / (this.duration / 0.1)
		this.duration -= 0.1
	}
	
	checkBounds() {
		this.x = this.minAxis(this.x, this.canvas.clientWidth)
		this.y = this.minAxis(this.y, this.canvas.clientHeight)
		
		if (this.isOutOfBounds(this.x, this.canvas.clientWidth)) this.velocityX = -this.velocityX
		if (this.isOutOfBounds(this.y, this.canvas.clientHeight)) this.velocityY = -this.velocityY
	}
	
	minAxis(axis, bound) {
		return Math.min(Math.max(axis, this.radius), bound - this.radius)
	}
	
	isOutOfBounds(axis, bound) {
		return axis - this.radius <= 0 || axis + this.radius >= bound
	}
	
	draw() {
		this.context.beginPath()
		this.context.strokeStyle = hexToRgba(this.color, this.opacity)
		this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		this.context.stroke()
	}
	
	isExpired() {
		return this.duration <= 0
	}
	
}
