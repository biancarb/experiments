export function hexToRgbObject(hex) {
	hex = hex.replace('#', '')
	const shorthand = hex.length === 3
	
	let r = parseInt(shorthand ? hex.charAt(0).repeat(2) : hex.substr(0, 2), 16)
	let g = parseInt(shorthand ? hex.charAt(1).repeat(2) : hex.substr(2, 2), 16)
	let b = parseInt(shorthand ? hex.charAt(2).repeat(2) : hex.substr(4, 2), 16)
	
	return { r, g, b }
}

export function hexToRgbaObject(hex, alpha) {
	const color = hexToRgbObject(hex)
	color.a = alpha
	
	return color
}

export function hexToRgb(hex) {
	const color = hexToRgbObject(hex)
	return `rgb(${color.r}, ${color.g}, ${color.b})`
}

export function hexToRgba(hex, alpha) {
	const color = hexToRgbaObject(hex, alpha)
	return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
}
