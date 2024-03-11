import { Bootstrap } from "../styles/bootstrap";
import { LitElement, html, css } from "lit";

export class IngHubsTrModal extends LitElement {
    static styles = [
        Bootstrap
    ];

    render() {
        return html`
            <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="modal" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header bg-light">
                            <h1 class="modal-title fs-5" id="modal">Title</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <slot></slot>
                        </div>
                        <div class="modal-footer bg-light">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define("ing-hubs-tr-modal", IngHubsTrModal)
