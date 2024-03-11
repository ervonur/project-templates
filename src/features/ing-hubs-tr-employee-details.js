import { Bootstrap } from "../styles/bootstrap";
import { LitElement, html } from "lit";

let employee = {};

export class IngHubsTrEmployeeDetails extends LitElement {
    static styles = [
        Bootstrap
    ];

    static properties = {
        employee: { type: String }
    };

    constructor() {
        super();
        this.employee = "{}";
    }
    
    willUpdate() {
        super.willUpdate();
        employee = JSON.parse(this.employee);
    }

    render() {
        return html`
            <table class="table table-bordered mb-0">
                <tbody>
                    <tr>
                        <th>Employee ID</th>
                        <td>${employee.id}</td>
                    </tr>
                    <tr>
                        <th>First Name</th>
                        <td>${employee.firstName}</td>
                    </tr>
                    <tr>
                        <th>Last Name</th>
                        <td>${employee.lastName}</td>
                    </tr>
                    <tr>
                        <th>Department</th>
                        <td>${employee.department}</td>
                    </tr>
                    <tr>
                        <th>Title</th>
                        <td>${employee.title}</td>
                    </tr>
                    <tr>
                        <th>Email Address</th>
                        <td>${employee.email}</td>
                    </tr>
                    <tr>
                        <th>Phone Number</th>
                        <td>${employee.phone}</td>
                    </tr>
                </tbody>
            </table>
        `;
    }
}

customElements.define("ing-hubs-tr-employee-details", IngHubsTrEmployeeDetails);
