import { Bootstrap } from "../styles/bootstrap";
import { Fontawesome } from "../styles/fontawesome";
import { LitElement, html, css } from "lit";
import { Router } from "@vaadin/router";
import { AuthServiceMock } from "../mock/authService";

const authService = new AuthServiceMock();

export class IngHubsTrSignIn extends LitElement {
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
        email: String,
        emailFeedback: String,
        password: String,
        passwordFeedback: String
    };

    constructor() {
        super();
        this.email = "";
        this.emailFeedback = "";
        this.password = "";
        this.passwordFeedback = "";
        dispatchEvent(new Event("reset-active-menu-items"));
    }

    render() {
        return html`
            <div id="wrapper">
                <h3 class="border-bottom mt-3 mb-3 pb-3">Sign In</h3>
                <form>
                    <div class="mb-3">
                        <label for="emailInput" class="form-label">Email Address</label>
                        <input type="email" class="form-control ${this.emailFeedback.length ? 'is-invalid' : ''}" id="emailInput" maxlength="100" autocomplete="off" spellcheck="false" @change=${this.emailChange}>
                        <div class="invalid-feedback" id="emailFeedback">${this.emailFeedback}</div>
                    </div>
                    <div class="mb-3">
                        <label for="passwordInput" class="form-label">Password</label>
                        <input type="password" class="form-control ${this.passwordFeedback.length ? 'is-invalid' : ''}" id="passwordInput" maxlength="13" autocomplete="off" spellcheck="false" @change=${this.passwordChange}>
                        <div class="invalid-feedback" id="phoneFeedback">${this.passwordFeedback}</div>
                    </div>
                    <button type="submit" class="btn btn-primary" id="saveButton" @click=${this.signIn}>
                        <i class="fas fa-sign-in-alt me-2"></i>Sign In
                    </button>
                </form>
            </div>
        `;
    }

    emailChange(event) {
        this.email = event.target.value.trim();
        this.validateEmail();
    }

    passwordChange(event) {
        this.password = event.target.value.trim();
        this.validatePassword();
    }

    signIn(event) {
        event.preventDefault();
        this.validateEmail();
        this.validatePassword();
        this.updateComplete.then(() => {
            if (this.isValidForm()) {
                dispatchEvent(new Event("loader-show"));
                authService.signIn(this.email, this.password).then(result => {
                    dispatchEvent(new Event("loader-hide"));
                    if (result.success) {
                        location.href = "/";
                    } else {
                        Swal.fire({
                            icon: "error",
                            text: result.message
                        });
                    }
                });
            } else {
                this.focusOnInvalidInput();
            }
        });
    }

    validateEmail() {
        if (this.email.length) {
            this.emailFeedback = "";
        } else {
            this.emailFeedback = "Please enter your email address.";
        }
    }

    validatePassword() {
        if (this.password.length) {
            this.passwordFeedback = "";
        } else {
            this.passwordFeedback = "Please enter your password.";
        }
    }

    isValidForm() {
        return this.shadowRoot.querySelectorAll(".is-invalid").length === 0;
    }

    focusOnInvalidInput() {
        const element = this.shadowRoot.querySelector(".is-invalid");
        if (element) {
            element.focus();
        }
    }
}

customElements.define("ing-hubs-tr-sign-in", IngHubsTrSignIn);
