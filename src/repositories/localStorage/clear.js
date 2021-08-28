const clearToken = () => {
	localStorage.removeItem('token')
}

const clearUser= () => {
	localStorage.removeItem('user')
}

export {
	clearToken,
	clearUser,
}
