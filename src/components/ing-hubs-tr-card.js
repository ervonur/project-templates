import { Bootstrap } from "../styles/bootstrap";
import { LitElement, html, css } from "lit";

export class IngHubsTrCard extends LitElement {
    static styles = [
        Bootstrap
    ];

    static properties = {
        header: String,
        title: String,
        text: String
    }

    render() {
        return html`
            <div class="card text-bg-light mb-3">
                <div class="card-header">${this.header}</div>
                <div class="card-body">
                    <h5 class="card-title">${this.title}</h5>
                    <p class="card-text">${this.text}</p>
                </div>
            </div>
        `;
    }
}

customElements.define("ing-hubs-tr-card", IngHubsTrCard);
