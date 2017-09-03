export default class Song {
	
	constructor(url) {
		this.url = url
		this.clientId = 'd764995c8ec4e9f30f85b3bd8396312c'
		this.soundcloudUrl = `//api.soundcloud.com/resolve.json?url=${this.url}&client_id=${this.clientId}`
		
		this.name = null
		this.author = null
		this.audio = new Audio()
		
		this.audioContext = null
		this.analyser = null
		this.source = null
		this.frequency = null
	}
	
	init(json) {
		this.getSongInfo(JSON.parse(json))
		this.createAttributes()
	}
	
	getSongInfo(audio) {
		this.name = audio.title
		this.author = audio.user.username
		
		if (audio.stream_url) this.audio.src = `${audio.stream_url}?client_id=${this.clientId}`
	}
	
	createAttributes() {
		this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
		
		this.audio.loop = true
		this.audio.crossOrigin = 'anonymous'
		
		this.analyser = this.audioContext.createAnalyser()
		this.analyser.fftSize = 512
		this.analyser.connect(this.audioContext.destination)
		
		this.source = this.audioContext.createMediaElementSource(this.audio)
		this.source.connect(this.analyser)
		
		this.frequency = new Uint8Array(this.analyser.frequencyBinCount)
	}
	
	getFrequency () {
		if (this.analyser) this.analyser.getByteTimeDomainData(this.frequency)
		return this.frequency
	}
	
	play() {
		this.audio.play()
	}
	
	pause() {
		this.audio.pause()
	}
	
	isPlaying () {
		return !this.audio.paused
	}
	
}
