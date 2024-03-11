import { Bootstrap } from "../styles/bootstrap";
import { Fontawesome } from "../styles/fontawesome";
import { LitElement, html, css } from "lit";

export class IngHubsTrUnauthorized extends LitElement {
    static styles = [
        Bootstrap,
        Fontawesome,
        css`
            div {
                display: flex;
                align-items: center;
            }
            i {
                font-size: 48px;
            }
            span {
                font-size: 24px;
            }
        `
    ];

    render() {
        return html`
            <div>
                <i class="fas fa-exclamation-triangle me-2 text-danger"></i>
                <span>You are not authorized to see this page.</span>
            </div>
        `;
    }
}

customElements.define("ing-hubs-tr-unauthorized", IngHubsTrUnauthorized);
