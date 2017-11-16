import Pug from 'pug'
import Experiment from '../../classes/Experiment'
import Pencil from './Pencil'
import Line from './Line'
import Rect from './Rect'

export default class PaintExperiment extends Experiment {
	
	constructor() {
		super('#fff')
		
		this.canvas.style.cursor = 'crosshair'
		
		this.activeTool = new Pencil(this.context)
		
		this.mainCanvas = null
		this.mainContext = null
		
		this.tools = null
		
		this.clear = null
		this.pencil = null
		this.line = null
		this.circle = null
		this.rect = null
		this.triangle = null
		this.color = null
		this.size = null
		this.sizeValue = null
		
		this.configureCanvas()
		this.createMainCanvas()
		this.createMainContext()
		
		this.createTools()
		this.findTools()
		this.bindToolEvents()
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
		this.activeTool.mousedown(this.color.value, this.size.value)
	}
	
	updateMainCanvas() {
		this.mainContext.drawImage(this.canvas, 0, 0)
		this.context.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight)
	}
	
	createTools() {
		const pug = `
.tools_section
	button(type="button").tools_button.js-clear Clear

.tools_section
	h2.tools_title Brushes

	button.tools_button.js-pencil.-active-tool Pencil

.tools_section
	h2.tools_title Shapes

	button.tools_line.js-line Line
	button.tools_circle.js-circle Circle
	button.tools_rect.js-rect Rect
	button.tools_triangle.js-triangle Triangle

.tools_section
	h2.tools_title Color

	input.tools_color.js-color(type="color")

.tools_section
	h2.tools_title Size

	input.tools_size.js-size(type="range" min="1" max="100" value="10")
	span.tools_size-value.js-size-value 10
		`
		
		this.tools = document.createElement('div')
		this.tools.classList.add('tools')
		this.tools.innerHTML = Pug.render(pug)
		
		document.body.appendChild(this.tools)
	}
	
	findTools() {
		this.clear = document.querySelector('.js-clear')
		this.pencil = document.querySelector('.js-pencil')
		this.line = document.querySelector('.js-line')
		this.circle = document.querySelector('.js-circle')
		this.rect = document.querySelector('.js-rect')
		this.triangle = document.querySelector('.js-triangle')
		this.color = document.querySelector('.js-color')
		this.size = document.querySelector('.js-size')
		this.sizeValue = document.querySelector('.js-size-value')
	}
	
	bindToolEvents() {
		this.clear.addEventListener('click', this.clearScreen.bind(this))
		this.pencil.addEventListener('click', event => this.selectTool(event, new Pencil(this.context)))
		this.line.addEventListener('click', event => this.selectTool(event, new Line(this.context)))
		// this.circle.addEventListener('click', event => this.selectTool(event, new Circle(this.context)))
		this.rect.addEventListener('click', event => this.selectTool(event, new Rect(this.context)))
		// this.triangle.addEventListener('click', event => this.selectTool(event, new Triangle(this.context)))
		this.size.addEventListener('mousemove', this.updateSize.bind(this))
	}
	
	clearScreen() {
		this.context.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight)
		this.mainContext.clearRect(0, 0, this.mainCanvas.clientWidth, this.mainCanvas.clientHeight)
	}
	
	selectTool(event, tool) {
		this.activeTool = tool
		
		document.querySelector('.-active-tool').classList.remove('-active-tool')
		event.target.classList.add('-active-tool')
	}
	
	updateSize() {
		this.sizeValue.innerText = this.size.value
	}
	
	destroy() {
		super.destroy()
		
		this.mainContext = null
		this.mainCanvas.parentNode.removeChild(this.mainCanvas)
		
		this.tools.parentNode.removeChild(this.tools)
	}
	
}
