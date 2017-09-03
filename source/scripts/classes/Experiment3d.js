import * as THREE from 'three'
import Stats from 'stats.js'

export default class Experiment3d {
	
	constructor() {
		this.scene = null
		this.camera = null
		this.renderer = null
		
		this.width = window.innerWidth
		this.height = window.innerHeight
		
		this.resizeEvent = this.resize.bind(this)
		this.keydownEvent = this.keydown.bind(this)
		
		this.stats = null
		
		this.animationFrame = null
		
		this.init()
		this.createStats()
		this.bindEvents()
	}
	
	init() {
		this.scene = new THREE.Scene()
		
		const fov = 45
		const aspect = this.width / this.height
		const near = 0.1
		const far = 1000
		
		this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
		this.camera.position.z = 100
		
		this.renderer = new THREE.WebGLRenderer({ antialias: true })
		this.renderer.setSize(this.width, this.height)
		this.renderer.setPixelRatio(window.devicePixelRatio)
		
		document.body.appendChild(this.renderer.domElement)
	}
	
	createStats() {
		this.stats = new Stats()
		
		this.stats.domElement.style.display = 'none'
		this.stats.domElement.style.position = 'absolute'
		this.stats.domElement.style.top = 0
		this.stats.domElement.style.left = 0
		this.stats.domElement.style.zIndex = 100
		
		document.body.appendChild(this.stats.domElement)
	}
	
	bindEvents() {
		window.addEventListener('resize', this.resizeEvent)
		window.addEventListener('keydown', this.keydownEvent)
	}
	
	resize() {
		this.width = window.innerWidth
		this.height = window.innerHeight
		
		this.camera.aspect = this.width / this.height
		this.camera.updateProjectionMatrix()
		
		this.renderer.setSize(this.width, this.height)
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
		
		this.renderer.render(this.scene, this.camera)
		
		this.animationFrame = window.requestAnimationFrame(this.update.bind(this))
	}
	
	destroy() {
		window.cancelAnimationFrame(this.animationFrame)
		
		this.destroyEvents()
		this.destroyAttributes()
		
		this.stats.domElement.remove()
		document.querySelector('canvas').remove()
	}
	
	destroyAttributes() {
		this.scene = null
		this.camera = null
		this.renderer = null
	}
	
	destroyEvents() {
		window.removeEventListener('resize', this.resizeEvent)
		window.removeEventListener('keydown', this.keydownEvent)
	}
	
}
