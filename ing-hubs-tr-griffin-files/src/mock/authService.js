const userList = [
    { userName: "Admin", email: "admin@mail.com", password: "192837" }
];

export class AuthServiceMock {
    signIn(email, password) {
        return new Promise(success => {
            const timeoutId = setTimeout(() => {
                clearTimeout(timeoutId);
                const result = { 
                    message: "", 
                    success: true 
                };
                const user = userList.find(x => 
                    x.email === email && 
                    x.password === password
                );
                if (user) {
                    sessionStorage.setItem("user", JSON.stringify(user));
                    sessionStorage.setItem("isAuthenticated", true);
                } else {
                    sessionStorage.removeItem("user");
                    sessionStorage.removeItem("isAuthenticated");
                    result.message = "Your credentials are invalid. Please try again.";
                    result.success = false;
                }
                success(result);
            }, 1000);
        });
    }

    signOut() {
        return new Promise(success => {
            const timeoutId = setTimeout(() => {
                clearTimeout(timeoutId);
                sessionStorage.removeItem("user");
                sessionStorage.removeItem("isAuthenticated");
                success();
            }, 1000);
        });
    }

    getUser() {
        return JSON.parse(sessionStorage.getItem("user"));
    }

    isAuthenticated() {
        return sessionStorage.getItem("isAuthenticated") === "true";
    }
}
