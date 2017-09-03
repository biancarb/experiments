import Pug from 'pug'

export default class Player {
	
	constructor(song) {
		this.player = null
		this.song = song
		this.success = false
		
		this.title = null
		this.playPauseButton = null
		
		this.init()
		this.createAttributes()
		this.bindEvents()
	}
	
	init() {
		const player = `
div.player
	button.player_play-pause-button.-play(disabled) Play/Pause
	h1.player_song-title Loading...
		`
		
		this.player = document.createElement('div')
		this.player.innerHTML = Pug.render(player)
		
		document.body.appendChild(this.player)
	}
	
	createAttributes() {
		this.title = document.querySelector('.player_song-title')
		this.playPauseButton = document.querySelector('.player_play-pause-button')
	}
	
	songLoaded() {
		const link = `a(href="${this.song.url}" target="_blank" class="player_song-link") ${this.song.name} by ${this.song.author}`
		
		if (this.success) {
			this.title.innerHTML = Pug.render(link)
			this.playPauseButton.removeAttribute('disabled')
		} 
		else this.title.innerHTML = 'This song can\'t be played'
	}
	
	bindEvents() {
		this.playPauseButton.addEventListener('click', this.togglePlayPause.bind(this))
	}
	
	togglePlayPause() {
		this.song.isPlaying() ? this.song.pause() : this.song.play()
		this.playPauseButton.classList.toggle('-play')
		this.playPauseButton.classList.toggle('-pause')
	}
	
}
