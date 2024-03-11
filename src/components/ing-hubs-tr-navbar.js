import { LitElement, html, css } from "lit";
import { Bootstrap } from "../styles/bootstrap";
import { Fontawesome } from "../styles/fontawesome";
import { AuthServiceMock } from "../mock/authService";

const authService = new AuthServiceMock();

export class IngHubsTrNavbar extends LitElement {
    static styles = [
        Bootstrap,
        Fontawesome,
        css`
            .navbar {
                background-color: #ff6600 !important;
            }
            .navbar-brand {
                display: flex;
                align-items: center;
            }
        `
    ];

    render() {
        return html`
            <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/" @click=${() => window.dispatchEvent(new CustomEvent("reset-active-menu-items"))}>
                        <img class="me-3" src="./src/images/logo.png" height="40">
                        <span>ING Hubs Türkiye</span>
                    </a>
                    <div>
                        ${
                            authService.isAuthenticated() 
                                ? html`
                                    <span class="text-light me-3">Welcome, ${authService.getUser().userName}!</span>
                                    <button class="btn btn-outline-light" @click=${this.signOut}>
                                        <i class="fas fa-sign-out-alt"></i>
                                        <span>Sign Out</span>
                                    </button>
                                `
                                : html`
                                    <a class="btn btn-outline-light" href="/sign-in">
                                        <i class="fas fa-sign-in-alt me-1"></i>
                                        <span>Sign In</span>
                                    </a>
                                `
                        }
                    </div>
                </div>
            </nav>
        `;
    }

    signOut() {
        dispatchEvent(new Event("loader-show"));
        authService.signOut().then(() => {
            dispatchEvent(new Event("loader-hide"));
            location.href = "/";
        });
    }
}

customElements.define("ing-hubs-tr-navbar", IngHubsTrNavbar);
