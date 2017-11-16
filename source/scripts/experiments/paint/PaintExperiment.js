import Pug from 'pug'
import Experiment from '../../classes/Experiment'
import Pencil from './Pencil'
import Rect from './Rect'

export default class PaintExperiment extends Experiment {
	
	constructor() {
		super('#fff')
		
		this.canvas.style.cursor = 'crosshair'
		
		this.activeTool = new Pencil(this.context)
		
		this.mainCanvas = null
		this.mainContext = null
		
		this.tools = null
		
		this.configureCanvas()
		this.createMainCanvas()
		this.createMainContext()
		
		this.createTools()
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
	
	destroy() {
		super.destroy()
		
		this.mainContext = null
		this.mainCanvas.parentNode.removeChild(this.mainCanvas)
		
		this.tools.parentNode.removeChild(this.tools)
	}
	
}
