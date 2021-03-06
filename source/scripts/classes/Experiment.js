import Stats from 'stats.js'

export default class Experiment {
	
	constructor(backgroundColor) {
		this.backgroundColor = backgroundColor || '#000'
		this.canvas = null
		this.context = null
		
		this.dblclickEvent = this.dblclick.bind(this)
		this.mousedownEvent = this.mousedown.bind(this)
		this.mousemoveEvent = this.mousemove.bind(this)
		this.mouseupEvent = this.mouseup.bind(this)
		this.resizeEvent = this.resize.bind(this)
		this.keydownEvent = this.keydown.bind(this)
		
		this.stats = null
		
		this.animationFrame = null
		
		this.createCanvas()
		this.createContext()
		this.createStats()
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
	
	createStats() {
		this.stats = new Stats()
		
		this.stats.domElement.style.display = 'none'
		this.stats.domElement.style.position = 'absolute'
		this.stats.domElement.style.top = 0
		this.stats.domElement.style.left = 0
		this.stats.domElement.style.zIndex = 99999
		
		document.body.appendChild(this.stats.domElement)
	}
	
	bindEvents() {
		this.canvas.addEventListener('dblclick', this.dblclickEvent)
		this.canvas.addEventListener('mousedown', this.mousedownEvent)
		this.canvas.addEventListener('mousemove', this.mousemoveEvent)
		this.canvas.addEventListener('mouseup', this.mouseupEvent)
		this.canvas.addEventListener('touchstart', this.mousedownEvent)
		this.canvas.addEventListener('touchmove', this.mousemoveEvent)
		this.canvas.addEventListener('touchend', this.mouseupEvent)
		
		window.addEventListener('resize', this.resizeEvent)
		window.addEventListener('keydown', this.keydownEvent)
	}
	
	dblclick(event) {
		this.context.globalAlpha = 1
		this.context.globalCompositeOperation = 'source-over'
		
		this.createContext()
	}
	
	mousedown(event) {
	}
	
	mousemove(event) {
	}
	
	mouseup(event) {
	}
	
	resize() {
		this.canvas.width = window.innerWidth
		this.canvas.height = window.innerHeight
		
		this.createContext()
	}
	
	keydown(event) {
		this.toggleDebug(event)
	}
	
	toggleDebug(event) {
		if (event.key === 'd') {
			this.stats.domElement.style.display = (this.stats.domElement.style.display === 'block') ? 'none' : 'block'
		}
	}
	
	update() {
		this.stats.update()
		this.animationFrame = window.requestAnimationFrame(this.update.bind(this))
	}
	
	destroy() {
		window.cancelAnimationFrame(this.animationFrame)
		this.destroyEvents()
		
		this.context = null
		this.canvas.parentNode.removeChild(this.canvas)
		this.stats.domElement.remove()
	}
	
	destroyEvents() {
		this.canvas.removeEventListener('dblclick', this.dblclickEvent)
		this.canvas.removeEventListener('mousedown', this.mousedownEvent)
		this.canvas.removeEventListener('mousemove', this.mousemoveEvent)
		this.canvas.removeEventListener('mouseup', this.mouseupEvent)
		this.canvas.removeEventListener('touchstart', this.mousedownEvent)
		this.canvas.removeEventListener('touchmove', this.mousemoveEvent)
		this.canvas.removeEventListener('touchend', this.mouseupEvent)
		
		window.removeEventListener('resize', this.resizeEvent)
		window.removeEventListener('keydown', this.keydownEvent)
	}
	
}
