import Experiment from '../../classes/Experiment'
import Pencil from './Pencil'

export default class PaintExperiment extends Experiment {
	
	constructor() {
		super('#fff')
		
		this.canvas.style.cursor = 'crosshair'
		
		this.activeTool = new Pencil(this.context)
		
		this.mainCanvas = null
		this.mainContext = null
		
		this.configureCanvas()
		this.createMainCanvas()
		this.createMainContext()
	}
	
	configureCanvas() {
		this.canvas.style.position = 'absolute'
		this.canvas.style.zIndex = '2'
	}
	
	createMainCanvas() {
		this.mainCanvas = document.createElement('canvas')
		
		this.mainCanvas.width = this.canvas.clientWidth
		this.mainCanvas.height = this.canvas.clientHeight
		
		this.mainCanvas.style.position = 'absolute'
		this.mainCanvas.style.zIndex = '1'
		
		document.body.appendChild(this.mainCanvas)
	}
	
	createMainContext() {
		this.mainContext = this.mainCanvas.getContext('2d')
	}
	
	mousemove(event) {
		super.mousemove(event)
		
		this.activeTool.mousemove(event)
	}
	
	mouseup() {
		this.activeTool.mouseup()
		
		this.updateMainCanvas()
	}
	
	mousedown() {
		this.activeTool.mousedown()
	}
	
	updateMainCanvas() {
		this.mainContext.drawImage(this.canvas, 0, 0)
		this.context.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight)
	}
	
	destroy() {
		super.destroy()
		
		this.mainContext = null
		this.mainCanvas.parentNode.removeChild(this.mainCanvas)
	}
	
}
