import * as THREE from 'three'
import Rainbow from 'color-rainbow'
import Experiment3d from '../../classes/Experiment3d'
import Bar from './Bar'
import Song from './Song'
import Player from './Player'
import songs from '../../data/spectrum/songs.json'
import forEach from '../../library/forEach'
import { get } from '../../library/ajax'

export default class SpectrumExperiment extends Experiment3d {
	
	constructor() {
		super()
		
		this.bars = []
		this.light = null
		this.song = new Song('https://soundcloud.com/never-ending-song/4-deemo-sunset')
		this.player = new Player(this.song)
		
		this.createBars()
		this.createLight()
		this.loadAudio()
		this.update()
	}
	
	createBars() {
		const numberOfBars = 60
		const colors = Rainbow.create(numberOfBars)
		
		for (let i = 0; i < numberOfBars; i++) {
			const color = colors[i].hexString()
			const bar = new Bar(color)
			
			const positionX = (i - (numberOfBars / 2)) * (bar.geometry.parameters.width * 2)
			bar.position.set(positionX, 0, 0)
			
			this.bars.push(bar)
			this.scene.add(bar)
		}
	}
	
	createLight() {
		this.light = new THREE.PointLight(0xffffff)
		this.light.position.set(0, 0, 100)
		
		this.scene.add(this.light)
	}
	
	loadAudio() {
		get(this.song.soundcloudUrl)
			.then(response => {
				this.song.init(response)
				this.player.success = true
			})
			.catch(error => console.log(error))
			.then(() => this.player.songLoaded())
	}
	
	update() {
		super.update()
		this.updateBars()
	}
	
	updateBars() {
		const frequency = this.song.getFrequency()
		
		if (frequency) {
			const step = Math.floor(frequency.length / this.bars.length)
			
			forEach(this.bars, (bar, index) => {
				let value = frequency[index * step] / 4
				value = (value < 1) ? 1 : value
				bar.scale.y = value
			})
		}
	}
	
	destroy() {
		super.destroy()
		
		this.player.html.remove()
		this.player = null
		this.song = null
	}
	
}
