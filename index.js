import { html, render } from "lit";
import { Router } from "@vaadin/router";
import { EmployeeServiceMock } from "./src/mock/employeeService";

const routes = [
    { path: "/", component: "ing-hubs-tr-home" },
    { path: "/employee", component: "ing-hubs-tr-employee-new" },
    { path: "/employee/:id", component: "ing-hubs-tr-employee-edit" },
    { path: "/employees", component: "ing-hubs-tr-employee-list" },
    { path: "/sign-in", component: "ing-hubs-tr-sign-in" },
    { path: "(.*)", component: "ing-hubs-tr-home" }
];

window.addEventListener("load", () => {
    new EmployeeServiceMock().seed();
    new Router(document.querySelector("#outlet")).setRoutes(routes);
});

let modal = null;

window.showModal = () => {
    if (!modal) {
        modal = new bootstrap.Modal(document.querySelector("#modal"));
    }
    modal.show();
}

window.hideModal = () => {
    if (!modal) {
        modal = new bootstrap.Modal(document.querySelector("#modal"));
    }
    modal.hide();
}
