import Experiment from '../../classes/Experiment'
import Bubble from './Bubble'
import colors from '../../data/bubbles/colors.json'
import forEach from '../../library/forEach'
import { random, randomInt } from '../../library/random'

export default class BubblesExperiment extends Experiment {
	
	constructor() {
		super('#1b1b1b')
		
		this.x = this.canvas.clientWidth / 2
		this.y = this.canvas.clientHeight / 2
		this.colors = colors[randomInt(0, colors.length - 1)]
		this.bubbles = []
		
		this.update()
	}
	
	update() {
		super.update()
		super.createContext()
		
		this.createBubble()
		this.draw()
	}
	
	createBubble() {
		const radius = 40
		const color = this.colors[randomInt(0, this.colors.length - 1)]
		const velocityX = random(-2, 2)
		const velocityY = random(-2, 2)
		const duration = 10
		
		const bubble = new Bubble(this.canvas, this.context, this.x, this.y, velocityX, velocityY, radius, color, duration)
		this.bubbles.push(bubble)
	}
	
	draw() {
		forEach(this.bubbles, (bubble, index) => {
			bubble.update()
			if (bubble.isExpired()) this.bubbles.splice(index, 1)
		})
	}
	
	mousemove(event) {
		super.mousemove(event)
		
		this.x = event.type.startsWith('mouse') ? event.clientX : event.touches[0].clientX
		this.y = event.type.startsWith('mouse') ? event.clientY : event.touches[0].clientY
	}
	
	dblclick() {
		super.dblclick()
		this.colors = colors[randomInt(0, colors.length - 1)]
	}
	
}
