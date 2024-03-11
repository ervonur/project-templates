import { Bootstrap } from "../styles/bootstrap";
import { Fontawesome } from "../styles/fontawesome";
import { LitElement, html, css } from "lit";
import { Router } from "@vaadin/router";
import { AuthServiceMock } from "../mock/authService";
import { EmployeeServiceMock } from "../mock/employeeService";

const authService = new AuthServiceMock();
const employeeService = new EmployeeServiceMock();

export class IngHubsTrEmployeeList extends LitElement {
    static styles = [
        Bootstrap,
        Fontawesome,
        css`
            table > thead > tr > th {
                background-color: #e9ecef !important;
            }
            table > thead > tr > th:last-of-type {
                width: 312px;
            }
            .btn-details, 
            .btn-edit, 
            .btn-remove {
                width: 90px;
            }
        `
    ];

    static properties = {
        employeeList: {},
        detailsVisible: {},
        selectedEmployee: {}
    }

    constructor() {
        super();
        this.employeeList = this.employeeList || [];
        this.detailsVisible = false;
        this.selectedEmployee = {};
    }

    connectedCallback() {
        super.connectedCallback();
        if (authService.isAuthenticated()) {
            window.dispatchEvent(new Event("loader-show"));
            employeeService.getAll().then(employeeList => {
                this.employeeList = employeeList;
                window.dispatchEvent(new Event("loader-hide"));
            });
        }
    }

    render() {
        return html`
            <div id="wrapper">
                <h3 class="border-bottom mt-3 mb-3 pb-3">Employee List</h3>
                ${
                    authService.isAuthenticated()
                        ? html`
                            <table class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Employee ID</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Department</th>
                                        <th>Title</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${this.employeeList.map(employee => html`
                                        <tr>
                                            <td>${employee.id}</td>
                                            <td>${employee.firstName}</td>
                                            <td>${employee.lastName}</td>
                                            <td>${employee.department}</td>
                                            <td>${employee.title}</td>
                                            <td>
                                                <button 
                                                    class="btn btn-outline-primary btn-sm btn-details me-2" 
                                                    data-id=${employee.id} 
                                                    @click=${this.details}>
                                                    <i class="fas fa-file-alt me-2" data-id=${employee.id} ></i>Details
                                                </button>
                                                <button 
                                                    class="btn btn-outline-success btn-sm btn-edit me-2" 
                                                    data-id=${employee.id} 
                                                    @click=${this.edit}>
                                                    <i class="fas fa-edit me-2" data-id=${employee.id} ></i>Edit
                                                </button>
                                                <button 
                                                    class="btn btn-outline-danger btn-sm btn-remove" 
                                                    data-id=${employee.id} 
                                                    @click=${this.remove}>
                                                    <i class="fas fa-trash-alt me-2" data-id=${employee.id} ></i>Remove
                                                </button>
                                            </td>
                                        </tr>
                                    `)}
                                </tbody>
                            </table>
                            <ing-hubs-tr-modal header="Employee Details" visible=${this.detailsVisible} @close=${() => this.detailsVisible = false}>
                                <ing-hubs-tr-employee-details slot="body" employee=${JSON.stringify(this.selectedEmployee)}></ing-hubs-tr-employee-details>
                            </ing-hubs-tr-modal>
                        `
                        : html`
                            <ing-hubs-tr-unauthorized></ing-hubs-tr-unauthorized>
                        `
                }
            </div>
        `;
    }

    details(event) {
        this.selectedEmployee = this.employeeList.find(x => x.id === event.target.getAttribute("data-id"));
        this.detailsVisible = true;
    }

    edit(event) {
        dispatchEvent(new Event("reset-active-menu-items"));
        const id = event.target.getAttribute("data-id");
        Router.go("/employee/" + id);
    }

    remove(event) {
        const id = event.target.getAttribute("data-id");
        Swal.fire({
            icon: "warning",
            text: "You're about to remove this record. Do you want to continue?",
            showConfirmButton: true,
            showCancelButton: true,
            focusCancel: true
        }).then(result => {
            if (result.isConfirmed) {
                if (id) {
                    dispatchEvent(new Event("loader-show"));
                    employeeService.remove(id).then(index => {
                        if (index >= 0) {
                            this.employeeList = this.employeeList.toSpliced(index, 1);
                            dispatchEvent(new Event("loader-hide"));
                            Swal.fire({
                                icon: "success",
                                text: "Operation completed successfully!"
                            });
                        }
                    });
                }
            }
        });
    }
}

customElements.define("ing-hubs-tr-employee-list", IngHubsTrEmployeeList);
