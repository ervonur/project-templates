import { Bootstrap } from "../styles/bootstrap";
import { Fontawesome } from "../styles/fontawesome";
import { LitElement, html, css } from "lit";
import { AuthServiceMock } from "../mock/authService";
import { EmployeeServiceMock } from "../mock/employeeService";

const authService = new AuthServiceMock();
const employeeService = new EmployeeServiceMock();

export class IngHubsTrEmployeeNew extends LitElement {
    static styles = [
        Bootstrap,
        Fontawesome,
        css`
            .form-control {
                width: 25%;
            }
        `
    ];

    static properties = {
        firstName: String,
        firstNameFeedback: String,
        lastName: String,
        lastNameFeedback: String,
        email: String,
        emailFeedback: String,
        phone: String,
        phoneFeedback: String
    };

    constructor() {
        super();
        this.firstName = "";
        this.firstNameFeedback = "";
        this.lastName = "";
        this.lastNameFeedback = "";
        this.email = "";
        this.emailFeedback = "";
        this.phone = "";
        this.phoneFeedback = "";
    }

    render() {
        return html`
            <div id="wrapper">
                <h3 class="border-bottom mt-3 mb-3 pb-3">Employee</h3>
                ${
                    authService.isAuthenticated()
                        ? html`
                            <form id="employeeForm">
                                <div class="mb-3">
                                    <label for="firstNameInput" class="form-label">First Name</label>
                                    <input type="text" class="form-control ${this.firstNameFeedback ? 'is-invalid' : ''}" id="firstNameInput" maxlength="100" autocomplete="off" spellcheck="false" @change=${this.firstNameChange}>
                                    <div class="invalid-feedback" id="firstNameFeedback">${this.firstNameFeedback}</div>
                                </div>
                                <div class="mb-3">
                                    <label for="lastNameInput" class="form-label">Last Name</label>
                                    <input type="text" class="form-control ${this.lastNameFeedback ? 'is-invalid' : ''}" id="lastNameInput" maxlength="100" autocomplete="off" spellcheck="false" @change=${this.lastNameChange}>
                                    <div class="invalid-feedback" id="lastNameFeedback">${this.lastNameFeedback}</div>
                                </div>
                                <div class="mb-3">
                                    <label for="emailInput" class="form-label">Email Address</label>
                                    <input type="email" class="form-control ${this.emailFeedback ? 'is-invalid' : ''}" id="emailInput" maxlength="100" autocomplete="off" spellcheck="false" @change=${this.emailChange}>
                                    <div class="invalid-feedback" id="emailFeedback">${this.emailFeedback}</div>
                                </div>
                                <div class="mb-3">
                                    <label for="phoneInput" class="form-label">Phone Number</label>
                                    <input type="text" class="form-control ${this.phoneFeedback ? 'is-invalid' : ''}" id="phoneInput" maxlength="13" autocomplete="off" spellcheck="false" @change=${this.phoneChange}>
                                    <div class="invalid-feedback" id="phoneFeedback">${this.phoneFeedback}</div>
                                </div>
                                <button type="submit" class="btn btn-primary" id="saveButton" @click=${this.save}><i class="fas fa-save me-2"></i>Save</button>
                            </form>
                        `
                        : html`
                            <ing-hubs-tr-unauthorized></ing-hubs-tr-unauthorized>
                        `
                }
            </div>
        `;
    }

    firstNameChange(event) {
        this.firstName = event.target.value.trim();
        this.validateFirstName();
    }

    lastNameChange(event) {
        this.lastName = event.target.value.trim();
        this.validateLastName();
    }

    emailChange(event) {
        this.email = event.target.value.trim();
        this.validateEmail();
    }

    phoneChange(event) {
        this.phone = event.target.value.trim();
        this.validatePhone();
    }

    save(event) {
        event.preventDefault();
        this.validateFirstName();
        this.validateLastName();
        this.validateEmail();
        this.validatePhone();
        this.updateComplete.then(() => {
            if (this.isValidForm()) {
                window.dispatchEvent(new Event("loader-show"));
                employeeService.add({
                    id: this.id,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    phone: this.phone
                }).then(response => {
                    window.dispatchEvent(new Event("loader-hide"));
                    Swal.fire({
                        icon: response["success"] ? "success" : "error",
                        text: response["message"]
                    });
                    if (response["success"]) {
                        this._clearInputValues();
                        this._clearProperties();
                    }
                });
            } else {
                this.focusOnInvalidInput();
            }
        });
    }

    _clearInputValues() {
        this.shadowRoot.querySelector("#firstNameInput").value = "";
        this.shadowRoot.querySelector("#lastNameInput").value = "";
        this.shadowRoot.querySelector("#emailInput").value = "";
        this.shadowRoot.querySelector("#phoneInput").value = "";
    }

    _clearProperties() {
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.phone = "";
    }

    validateFirstName() {
        this.firstNameFeedback = "";
        if (!this.firstName.length) {
            this.firstNameFeedback = "Please enter the first name.";
        }
    }

    validateLastName() {
        this.lastNameFeedback = "";
        if (!this.lastName.length) {
            this.lastNameFeedback = "Please enter the last name.";
        }
    }

    validateEmail() {
        this.emailFeedback = "";
        if (!this.email.length) {
            this.emailFeedback = "Please enter the email address.";
        }
    }

    validatePhone() {
        this.phoneFeedback = "";
        if (!this.phone.length) {
            this.phoneFeedback = "Please enter the phone number.";
        }
    }

    isValidForm() {
        return this.shadowRoot.querySelectorAll("#employeeForm .is-invalid").length === 0;
    }

    focusOnInvalidInput() {
        const element = this.shadowRoot.querySelector("#employeeForm .is-invalid");
        if (element) {
            element.focus();
        }
    }
}

customElements.define("ing-hubs-tr-employee-new", IngHubsTrEmployeeNew);
