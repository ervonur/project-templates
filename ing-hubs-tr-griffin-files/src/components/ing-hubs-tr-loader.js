import { Bootstrap } from "../styles/bootstrap";
import { Fontawesome } from "../styles/fontawesome";
import { LitElement, css, html } from "lit";

export class IngHubsTrLoader extends LitElement {
    static styles = [
        Bootstrap,
        Fontawesome,
        css`
            #loader {
                background: rgba(0,0,0,.4);
                cursor: wait;
                display: flex;
                align-items: center;
                justify-content: center;
                position: fixed; 
                top: 0px; 
                left: 0px; 
                width: 100%;
                height: 100%;
                z-index: 1;
            }
        `
    ];

    static get properties() {
        return {
            isVisible: Boolean
        };
    }

    constructor() {
        super();
        this.isVisible = false;
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener("loader-show", () => this.isVisible = true );
        window.addEventListener("loader-hide", () => this.isVisible = false );
    }

    render() {
        return html`
            <div id="loader" class="text-warning" ?hidden=${!this.isVisible}></div>
        `;
    }
}

customElements.define("ing-hubs-tr-loader", IngHubsTrLoader);
