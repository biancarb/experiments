export default function forEach(array, callback, scope) {
	for (let i = 0; i < array.length; i++) {
		callback.call(scope, array[i], i)
	}
}
