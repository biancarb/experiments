export default class Experiment {
	
	constructor(backgroundColor) {
		this.backgroundColor = backgroundColor || '#030303'
		this.canvas = null
		this.context = null
		
		this.dblclickEvent = this.dblclick.bind(this)
		this.mousemoveEvent = this.mousemove.bind(this)
		this.resizeEvent = this.resize.bind(this)
		
		this.animationFrame = null
		
		this.createCanvas()
		this.createContext()
		this.bindEvents()
	}
	
	createCanvas() {
		this.canvas = document.createElement('canvas')
		this.canvas.classList.add('canvas')
		
		this.canvas.width = window.innerWidth
		this.canvas.height = window.innerHeight
		
		document.body.appendChild(this.canvas)
	}
	
	createContext() {
		this.context = this.canvas.getContext('2d')
		
		this.context.fillStyle = this.backgroundColor
		this.context.fillRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight)
	}
	
	bindEvents() {
		this.canvas.addEventListener('dblclick', this.dblclickEvent)
		this.canvas.addEventListener('mousemove', this.mousemoveEvent)
		window.addEventListener('resize', this.resizeEvent)
	}
	
	dblclick() {
		this.context.globalAlpha = 1
		this.context.globalCompositeOperation = 'source-over'
		
		this.createContext()
	}
	
	mousemove(event) {
	}
	
	resize() {
		this.canvas.width = window.innerWidth
		this.canvas.height = window.innerHeight
		
		this.createContext()
	}
	
	update() {
		this.animationFrame = window.requestAnimationFrame(this.update.bind(this))
	}
	
	destroy() {
		window.cancelAnimationFrame(this.animationFrame)
		this.destroyEvents()
		
		this.canvas.parentNode.removeChild(this.canvas)
		this.context = null
	}
	
	destroyEvents() {
		this.canvas.removeEventListener('dblclick', this.dblclickEvent)
		this.canvas.removeEventListener('mousemove', this.mousemoveEvent)
		window.removeEventListener('resize', this.resizeEvent)
	}
	
}
