const getUser = () => {
	return JSON.parse(localStorage.getItem("user"))
}

const getToken= () => {
	return localStorage.getItem("token")
}

export {
	getUser,
	getToken,
}
