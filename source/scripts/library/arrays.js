export function shuffle(array) {
	const cloneArray = array.slice()
	
	for (let i = cloneArray.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1))
		let temp = cloneArray[i]
		cloneArray[i] = cloneArray[j]
		cloneArray[j] = temp
	}
	
	return cloneArray
}
