import * as THREE from 'three'

export default class Bar extends THREE.Mesh {
	
	constructor(color) {
		const geometry = new THREE.BoxGeometry(1, 1, 1)
		const material = new THREE.MeshPhongMaterial({ color: new THREE.Color(color) })
		
		super(geometry, material)
	}
	
}
