export default class Experiment {
	
	constructor(backgroundColor) {
		this.backgroundColor = backgroundColor || '#030303'
		this.canvas = null
		this.context = null
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
		this.canvas.addEventListener('dblclick', this.dblclick.bind(this))
		this.canvas.addEventListener('mousemove', this.mousemove.bind(this))
		window.addEventListener('resize', this.resize.bind(this))
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
		this.canvas.parentNode.removeChild(this.canvas)
		this.context = null
	}
	
}
