import Experiment from '../../classes/Experiment'
import Walker from './Walker'
import colors from '../../data/colors/walkers.json'
import forEach from '../../library/forEach'
import { randomInt } from '../../library/random'

export default class WalkersExperiment extends Experiment {
	
	constructor() {
		super('#030303')
		
		this.walkers = []
		this.number = 3000
		this.colors = null
		
		this.createWalkers()
		this.update()
	}
	
	createWalkers() {
		this.walkers = []
		this.colors = colors[randomInt(0, colors.length - 1)]
		
		for (let i = 0; i < this.number; i++) {
			this.createWalker()
		}
	}
	
	createWalker() {
		const x = randomInt(0, this.canvas.clientWidth)
		const y = randomInt(0, this.canvas.clientHeight)
		const color = this.colors[randomInt(0, this.colors.length - 1)]
		
		const walker = new Walker(x, y, color)
		this.walkers.push(walker)
	}
	
	update() {
		super.update()
		
		this.context.globalAlpha = 0.1
		this.context.globalCompositeOperation = 'lighter'
		
		forEach(this.walkers, walker => walker.draw(this.context))
	}
	
	dblclick() {
		super.dblclick()
		this.createWalkers()
	}
	
	resize() {
		super.resize()
		this.createWalkers()
	}
	
}
