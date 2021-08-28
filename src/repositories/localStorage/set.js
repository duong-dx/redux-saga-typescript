const setUser = (user) => {
	localStorage.setItem("user", JSON.stringify(user));
}

const setToken = (token) => {
	localStorage.setItem("token", token);
}

export {
	setUser,
	setToken,
}
