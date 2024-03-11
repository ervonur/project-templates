import { Bootstrap } from "../styles/bootstrap";
import { Fontawesome } from "../styles/fontawesome";
import { LitElement, html, css } from "lit";

export class IngHubsTrModal extends LitElement {
    static styles = [
        Bootstrap,
        Fontawesome,
        css`
            .backdrop {
                position: fixed; 
                top: 0px; 
                left: 0px; 
                width: 100%; 
                height: 100%; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                background: rgba(0,0,0,.4);
                opacity: 0.5;
            }
            .outer {
                position: fixed; 
                top: 0px; 
                left: 0px; 
                width: 100%; 
                height: 100%; 
                display: flex; 
                align-items: center; 
                justify-content: center;
            }
            .inner {
                background-color: white; 
                width: 800px; 
                border-radius: 8px;
                display: flex;
                flex-direction: column;
            }
            .header {
                height: 56px;
                display: flex;
                align-items: center;
                padding: 16px;
                border-radius: 8px;
            }
            .header > h3 {
                flex-grow: 1;
                margin-bottom: 0px;
            }
            .header > i {
                color: #6c757d;
                font-size: 20pt;
            }
            .header > i:hover {
                color: #5c636a;
                cursor: pointer;
            }
            .body {
                flex-grow: 1;
                padding: 16px;
            }
            .footer {
                height: 56px;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                padding: 16px;
                border-radius: 8px;
            }
        `
    ];

    static properties = {
        header: String,
        visible: Boolean
    };

    constructor() {
        super();
        this.header = "";
        this.visible = false;
    }

    render() {
        return html`
            ${
                this.visible === true || this.visible === "true"
                ? html`
                    <div class="backdrop"></div>
                    <div class="outer">
                        <div class="inner">
                            <div class="header bg-light">
                                <h3>${this.header}</h3>
                                <i class="fas fa-times" @click=${this.close}></i>
                            </div>
                            <div class="body border-top border-bottom">
                                <slot name="body"></slot>
                            </div>
                            <div class="footer bg-light">
                                <slot name="footer">
                                    <button class="btn btn-secondary" @click=${this.close}>Close</button>
                                </slot>
                            </div>
                        </div>
                    </div>
                ` : html``
            }
        `;
    }

    close() {
        this.visible = false;
        this.dispatchEvent(new Event("close"));
    }
}

customElements.define("ing-hubs-tr-modal", IngHubsTrModal)
