import { Bootstrap } from "../styles/bootstrap";
import { LitElement, html, css } from "lit";

export class IngHubsTrHome extends LitElement {
    static styles = [
        Bootstrap
    ];

    constructor() {
        super();
        dispatchEvent(new Event("reset-active-menu-items"));
    }

    render() {
        return html`
            <div id="wrapper">
                <div class="mb-2"></div>
                <ing-hubs-tr-carousel></ing-hubs-tr-carousel>
                <div class="mb-2"></div>
                <div class="row">
                    <div class="col-4">
                        <ing-hubs-tr-card
                            header="Header"
                            title="Light card title"
                            text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                        ></ing-hubs-tr-card>
                    </div>
                    <div class="col-4">
                        <ing-hubs-tr-card
                            header="Header"
                            title="Light card title"
                            text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                        ></ing-hubs-tr-card>
                    </div>
                    <div class="col-4">
                        <ing-hubs-tr-card
                            header="Header"
                            title="Light card title"
                            text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                        ></ing-hubs-tr-card>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define("ing-hubs-tr-home", IngHubsTrHome);
