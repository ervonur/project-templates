const employeeList = [
    { id: "1001", firstName: "Employee", lastName:"01", email: "emp01@mail.com", phone: "111 111 11 01", department: "Human Resources", role: "Recruiter" },
    { id: "1002", firstName: "Employee", lastName:"02", email: "emp02@mail.com", phone: "111 111 11 02", department: "Human Resources", role: "Recruiter" },
    { id: "1003", firstName: "Employee", lastName:"03", email: "emp03@mail.com", phone: "111 111 11 03", department: "Data Analytics", role: "Chapter Lead" },
    { id: "1004", firstName: "Employee", lastName:"04", email: "emp04@mail.com", phone: "111 111 11 04", department: "Data Analytics", role: "Chapter Lead" },
    { id: "1005", firstName: "Employee", lastName:"05", email: "emp05@mail.com", phone: "111 111 11 05", department: "Data Analytics", role: "Data Scientist" },
    { id: "1006", firstName: "Employee", lastName:"06", email: "emp06@mail.com", phone: "111 111 11 06", department: "Data Analytics", role: "Data Scientist" },
    { id: "1007", firstName: "Employee", lastName:"07", email: "emp07@mail.com", phone: "111 111 11 07", department: "Data Analytics", role: "Data Scientist" },
    { id: "1008", firstName: "Employee", lastName:"08", email: "emp08@mail.com", phone: "111 111 11 08", department: "Data Analytics", role: "Data Scientist" },
    { id: "1009", firstName: "Employee", lastName:"09", email: "emp09@mail.com", phone: "111 111 11 09", department: "Data Analytics", role: "Data Scientist" },
    { id: "1010", firstName: "Employee", lastName:"10", email: "emp10@mail.com", phone: "111 111 11 10", department: "Data Analytics", role: "Data Scientist" },
    { id: "1011", firstName: "Employee", lastName:"11", email: "emp11@mail.com", phone: "111 111 11 11", department: "Data Analytics", role: "Data Scientist" },
    { id: "1012", firstName: "Employee", lastName:"12", email: "emp12@mail.com", phone: "111 111 11 12", department: "Data Analytics", role: "Data Scientist" },
    { id: "1013", firstName: "Employee", lastName:"13", email: "emp13@mail.com", phone: "111 111 11 13", department: "Data Analytics", role: "Data Scientist" },
    { id: "1014", firstName: "Employee", lastName:"14", email: "emp14@mail.com", phone: "111 111 11 14", department: "Technology", role: "Chapter Lead" },
    { id: "1015", firstName: "Employee", lastName:"15", email: "emp15@mail.com", phone: "111 111 11 15", department: "Technology", role: "Chapter Lead" },
    { id: "1016", firstName: "Employee", lastName:"16", email: "emp16@mail.com", phone: "111 111 11 16", department: "Technology", role: "Product Owner" },
    { id: "1017", firstName: "Employee", lastName:"17", email: "emp17@mail.com", phone: "111 111 11 17", department: "Technology", role: "Product Owner" },
    { id: "1018", firstName: "Employee", lastName:"18", email: "emp18@mail.com", phone: "111 111 11 18", department: "Technology", role: "Feature Engineer" },
    { id: "1019", firstName: "Employee", lastName:"19", email: "emp19@mail.com", phone: "111 111 11 19", department: "Technology", role: "Feature Engineer" },
    { id: "1020", firstName: "Employee", lastName:"20", email: "emp20@mail.com", phone: "111 111 11 20", department: "Technology", role: "Software Developer" },
    { id: "1021", firstName: "Employee", lastName:"21", email: "emp21@mail.com", phone: "111 111 11 21", department: "Technology", role: "Software Developer" },
    { id: "1022", firstName: "Employee", lastName:"22", email: "emp22@mail.com", phone: "111 111 11 22", department: "Technology", role: "Software Developer" },
    { id: "1023", firstName: "Employee", lastName:"23", email: "emp23@mail.com", phone: "111 111 11 23", department: "Technology", role: "Software Developer" },
    { id: "1024", firstName: "Employee", lastName:"24", email: "emp24@mail.com", phone: "111 111 11 24", department: "Technology", role: "Software Developer" },
    { id: "1025", firstName: "Employee", lastName:"25", email: "emp25@mail.com", phone: "111 111 11 25", department: "Technology", role: "Software Developer" }
];

export class EmployeeServiceMock {
    seed() {
        this.getAll().then(data => {
            if (!Array.isArray(data)) {
                data = employeeList;
                sessionStorage.setItem("employeeList", JSON.stringify(data));
            }
        });
    }

    getAll() {
        return new Promise(success => {
            const timeoutId = setTimeout(() => {
                clearTimeout(timeoutId);
                success(JSON.parse(sessionStorage.getItem("employeeList")));
            }, 1000);
        });
    }

    get(id) {
        return new Promise(success => {
            const timeoutId = setTimeout(() => {
                clearTimeout(timeoutId);
                const result = { data: null, message: "", success: true };
                const data = JSON.parse(sessionStorage.getItem("employeeList"));
                if (Array.isArray(data)) {
                    const employee = data.find(x => x.id === id);
                    if (employee) {
                        result.data = employee;
                    } else {
                        result.message = "Employee information is not found.";
                        result.success = false;
                    }
                } else {
                    result.message = "Employee information is not found.";
                    result.success = false;
                }
                success(result);
            }, 1000);
        });
    }

    add(employee) {
        return new Promise(success => {
            const timeoutId = setTimeout(() => {
                clearTimeout(timeoutId);
                const result = { message: "Operation completed successfully!", success: true };
                employee["id"] = (parseInt(employeeList[employeeList.length - 1]["id"]) + 1).toString();
                const data = JSON.parse(sessionStorage.getItem("employeeList"));
                if (Array.isArray(data)) {
                    let index = data.map(x => x.email).indexOf(employee["email"]);
                    if (index >= 0) {
                        result.success = false;
                        result.message = "This email address belongs to another employee.";
                    } else {
                        index = data.map(x => x["phone"]).indexOf(employee["phone"]);
                        if (index >= 0) {
                            result.success = false;
                            result.message = "This phone number belongs to another employee.";
                        } else {
                            data.push(employee);
                            employeeList.push(employee);
                        }
                    }
                } else {
                    data = [employee];
                    employeeList.push(employee);
                }
                sessionStorage.setItem("employeeList", JSON.stringify(data));
                success(result);
            }, 1000);
        });
    }

    update(employee) {
        return new Promise(success => {
            const timeoutId = setTimeout(() => {
                clearTimeout(timeoutId);
                const result = { data: null, message: "Operation completed successfully.", success: true };
                const employeeListInSession = JSON.parse(sessionStorage.getItem("employeeList"));
                if (Array.isArray(employeeListInSession)) {
                    const index = employeeListInSession.map(x => x.id).indexOf(employee.id);
                    if (index >= 0) {
                        employeeList[index] = employee;
                        employeeListInSession[index] = employee;
                        sessionStorage.setItem("employeeList", JSON.stringify(employeeListInSession));
                    } else {
                        result.message = "Employee information is not found."
                        result.success = false;
                    }
                } else {
                    result.message = "Employee list could not be read."
                    result.success = false;
                }
                success(result);
            }, 1000);
        });
    }

    remove(id) {
        return new Promise(success => {
            const timeoutId = setTimeout(() => {
                clearTimeout(timeoutId);
                const data = JSON.parse(sessionStorage.getItem("employeeList"));
                const index = data.map(employee => employee.id).indexOf(id);
                if (index >= 0) {
                    data.splice(index, 1);
                    sessionStorage.setItem("employeeList", JSON.stringify(data));
                }
                success(index);
            }, 1000);
        });
    }
}
