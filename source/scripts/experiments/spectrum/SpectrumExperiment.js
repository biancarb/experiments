import * as THREE from 'three'
import Rainbow from 'color-rainbow'
import Experiment3d from '../../classes/Experiment3d'
import Bar from './Bar'
import Player from './Player'
import songs from '../../data/spectrum/songs.json'
import forEach from '../../library/forEach'

export default class SpectrumExperiment extends Experiment3d {
	
	constructor() {
		super()
		
		this.bars = []
		this.light = null
		this.player = new Player(songs)
		
		this.createBars()
		this.createLight()
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
	
	update() {
		super.update()
		this.updateBars()
	}
	
	updateBars() {
		if (this.player.currentSong && this.player.currentSong.getFrequency()) {
			const frequency = this.player.currentSong.getFrequency()
			const step = Math.floor(frequency.length / this.bars.length)
			
			forEach(this.bars, (bar, index) => {
				let value = frequency[index * step] / 4
				value = (value < 1) ? 1 : value
				bar.scale.y = value
			})
		}
		else forEach(this.bars, bar => bar.scale.y = 1)
	}
	
	destroy() {
		super.destroy()
		this.player.destroy()
	}
	
}
