export function get(url) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest()
		const done = 4
		const success = 200
		
		xhr.onreadystatechange = () => {
			if (xhr.readyState === done) {
				if (xhr.status === success) resolve(xhr.responseText)
				else reject(xhr.responseText)
			}
		}
		
		xhr.open('GET', url, true)
		xhr.send()
	})
}

export function post(url, data) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest()
		const done = 4
		const success = 200
		
		xhr.onreadystatechange = () => {
			if (xhr.readyState === done) {
				if (xhr.status === success) resolve(xhr.responseText)
				else reject(xhr.responseText)
			}
		}
		
		xhr.open('POST', url, true)
		xhr.setRequestHeader('Content-type', 'application/json')
		xhr.send(data)
	})
}
