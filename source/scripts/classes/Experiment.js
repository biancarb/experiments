export default class Experiment {
	
	constructor() {
		this.canvas = null
		this.context = null
		
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
		
		this.context.fillStyle = '#030303'
		this.context.fillRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight)
	}
	
	bindEvents() {
		this.canvas.addEventListener('dblclick', this.dblclick.bind(this))
		window.addEventListener('resize', this.resize.bind(this))
	}
	
	dblclick() {
		this.context.globalAlpha = 1
		this.context.globalCompositeOperation = 'source-over'
		
		this.createContext()
	}
	
	resize() {
		this.canvas.width = window.innerWidth
		this.canvas.height = window.innerHeight
		
		this.createContext()
	}
	
	init() {
		window.requestAnimationFrame(this.init.bind(this))
	}
	
}
