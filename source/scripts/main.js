import WalkersExperiment from './experiments/walkers/WalkersExperiment'
import BubblesExperiment from './experiments/bubbles/BubblesExperiment'
import PaintExperiment from './experiments/paint/PaintExperiment'
import SpectrumExperiment from './experiments/spectrum/SpectrumExperiment'

const experiments = {
	'walkers': WalkersExperiment,
	'bubbles': BubblesExperiment,
	'paint': PaintExperiment,
	'spectrum': SpectrumExperiment
}

const defaultExperiment = Object.keys(experiments)[0]
let activeExperiment

chooseExperiment()
window.addEventListener('hashchange', chooseExperiment)

function chooseExperiment() {
	const selectedExperiment = window.location.hash.replace('#', '')
	
	if (experiments[selectedExperiment]) updateActiveExperiment(selectedExperiment)
	else updateActiveExperiment(defaultExperiment)
}

function updateActiveExperiment(experiment) {
	if (activeExperiment) activeExperiment.destroy()
	activeExperiment = new experiments[experiment]()
	
	document.querySelector('.-active').classList.remove('-active')
	document.querySelector(`.js-link[href="#${experiment}"]`).classList.add('-active')
}
