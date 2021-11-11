const getUser = () => {
	return JSON.parse(<string>localStorage.getItem("user"))
}

const getToken= () => {
	return localStorage.getItem("token")
}

export {
	getUser,
	getToken,
}
