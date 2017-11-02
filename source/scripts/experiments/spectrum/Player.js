import Pug from 'pug'
import Song from './Song'
import { shuffle } from '../../library/arrays'
import { get } from '../../library/ajax'

export default class Player {
	
	constructor(songs) {
		this.songs = shuffle(songs)
		
		this.index = 0
		this.currentSong = null
		this.html = null
		
		this.title = null
		this.playPauseButton = null
		this.prevButton = null
		this.nextButton = null
		
		this.init()
		this.createAttributes()
		this.loadSong()
		this.bindEvents()
	}
	
	init() {
		const player = `
div.player_buttons
	button.player_prev Prev
	button.player_play-pause-button.-play(disabled) Play/Pause
	button.player_next Next
h1.player_song-title Loading...
		`
		
		this.html = document.createElement('div')
		this.html.classList.add('player')
		this.html.innerHTML = Pug.render(player)
		
		document.body.appendChild(this.html)
	}
	
	createAttributes() {
		this.title = document.querySelector('.player_song-title')
		this.playPauseButton = document.querySelector('.player_play-pause-button')
		this.prevButton = document.querySelector('.player_prev')
		this.nextButton = document.querySelector('.player_next')
	}
	
	loadSong(callback) {
		if (this.currentSong) this.destroySong()
		this.currentSong = new Song(this.songs[this.index])
		
		get(this.currentSong.soundcloudUrl)
			.then(response => this.currentSong.init(response))
			.catch(() => this.currentSong = null)
			.then(() => {
				this.updateSong()
				if (callback) callback()
			})
	}
	
	destroySong() {
		this.currentSong.audioContext.close()
		this.currentSong.audio.src = null
		this.currentSong = null
	}
	
	updateSong() {
		if (this.currentSong) {
			const link = `a(href="${this.currentSong.url}" target="_blank" class="player_song-link") ${this.currentSong.name} by ${this.currentSong.author}`
			
			this.title.innerHTML = Pug.render(link)
			this.playPauseButton.removeAttribute('disabled')
		}
		else {
			this.title.innerHTML = 'This song can\'t be played'
			this.playPauseButton.setAttribute('disabled', '')
		}
	}
	
	bindEvents() {
		this.playPauseButton.addEventListener('click', this.togglePlayPause.bind(this))
		this.prevButton.addEventListener('click', this.prev.bind(this))
		this.nextButton.addEventListener('click', this.next.bind(this))
		
		this.currentSong.audio.addEventListener('ended', this.next.bind(this))
	}
	
	togglePlayPause() {
		this.currentSong.isPlaying() ? this.currentSong.pause() : this.currentSong.play()
		this.playPauseButton.classList.toggle('-play')
		this.playPauseButton.classList.toggle('-pause')
	}
	
	next() {
		this.index = (this.index === this.songs.length - 1) ? 0 : this.index + 1
		this.callLoadSong()
	}
	
	prev() {
		this.index = (this.index === 0) ? this.songs.length - 1 : this.index - 1
		this.callLoadSong()
	}
	
	callLoadSong() {
		this.title.innerHTML = 'Loading...'
		
		this.loadSong(() => {
			if (this.currentSong && !this.isPlayButton()) this.currentSong.play()
		})
	}
	
	isPlayButton() {
		return this.playPauseButton.classList.contains('-play')
	}
	
	destroy() {
		this.html.remove()
		this.destroySong()
	}
	
}
