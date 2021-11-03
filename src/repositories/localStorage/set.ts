const setUser = (user: any) => {
	localStorage.setItem("user", JSON.stringify(user));
}

const setToken = (token: any) => {
	localStorage.setItem("token", token);
}

export {
	setUser,
	setToken,
}
