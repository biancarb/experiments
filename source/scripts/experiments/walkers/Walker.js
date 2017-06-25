import randomInt from '../../library/randomInt'

export default class Walker {
	
	constructor(x, y, color) {
		this.x = x
		this.y = y
		this.color = color
	}
	
	draw(context) {
		context.lineWidth = 1
		context.strokeStyle = this.color
		
		context.beginPath()
		context.moveTo(this.x, this.y)
		
		this.step()
		
		context.lineTo(this.x, this.y)
		context.stroke()
	}
	
	step() {
		this.x += randomInt(-1, 1)
		this.y += randomInt(-1, 1)
	}
	
}
