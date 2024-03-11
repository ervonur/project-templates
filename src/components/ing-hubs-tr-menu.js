import fontawesome from "lit-fontawesome";
import { LitElement, html, css } from "lit";

let activeIndex = -1;
let expandedIndexList = [];

export class IngHubsTrMenu extends LitElement {
    static styles = [
        fontawesome,
        css`
            i.fas {
                margin-right: 8px;
                width: 10px;
            }
            div.menu-item:first-of-type {
                margin-top: 24px;
            }
            div.menu-item {
                margin-left: 24px;
                margin-bottom: 8px;
            }
            div.menu-item > div:first-of-type {
                cursor: pointer;
                display: inline-block;
                font-weight: bold;
            }
            div.menu-item > div > span {
                display: inline-block;
                font-size: 16pt;
                margin-right: 4px;
                width: 16px;
            }
            div.menu-item > div > a {
                color: #212529;
                display: block;
                font-weight: normal;
                margin-left: 28px;
                text-decoration: none;
            }
            div.menu-item > div > a:hover {
                color: #ff6600;
            }
            div.menu-item > div > a.active {
                color: #ff6600;
                font-weight: bold;
            }
    `];

    constructor() {
        super();
        window.addEventListener("reset-active-menu-items", () => {
            activeIndex = -1;
            this.shadowRoot.querySelectorAll("a.active").forEach(element => element.classList.remove("active"));
        });
    }

    firstUpdated() {
        super.firstUpdated();
        activeIndex = parseInt(sessionStorage.getItem("menu-active-index"));
        if (!isNaN(activeIndex) && activeIndex >= 0) {
            this.shadowRoot.querySelectorAll(".menu-item > div:last-of-type > a")[activeIndex].classList.add("active");
        }
        expandedIndexList = JSON.parse(sessionStorage.getItem("menu-expanded-index-list"));
        if (Array.isArray(expandedIndexList)) {
            const elements = this.shadowRoot.querySelectorAll(".menu-item > div:first-of-type");
            expandedIndexList.forEach(i => {
                elements[i].click();
            });
        }
    }

    render() {
        return html`
            <div class="menu-item">
                <div @click=${this.parentMenuItemClick}>
                    <i class="fas fa-angle-right"></i>Benefit
                </div>
                <div hidden>
                    <a href="/benefits" @click=${this.subMenuItemClick}><i class="fas fa-file-alt"></i> List</a>
                </div>
            </div>
            <div class="menu-item">
                <div @click=${this.parentMenuItemClick}>
                    <i class="fas fa-angle-right"></i>Candidate
                </div>
                <div hidden>
                    <a href="/candidates" @click=${this.subMenuItemClick}><i class="fas fa-file-alt"></i> List</a>
                </div>
            </div>
            <div class="menu-item">
                <div @click=${this.parentMenuItemClick}>
                    <i class="fas fa-angle-right"></i>Employee
                </div>
                <div hidden>
                    <a href="/employees" @click=${this.subMenuItemClick}><i class="fas fa-file-alt"></i> List</a>
                    <a href="/employee" @click=${this.subMenuItemClick}><i class="fas fa-plus me-5"></i> New</a>
                </div>
            </div>
        `;
    }

    parentMenuItemClick(event) {
        const openCloseIndicator = event.srcElement.querySelector("i.fas");
        const subMenu = event.srcElement.parentElement.querySelector("div:last-of-type");
        if (subMenu.hasAttribute("hidden")) {
            openCloseIndicator.classList.add("fa-angle-down");
            openCloseIndicator.classList.remove("fa-angle-right");
            subMenu.removeAttribute("hidden");
        } else {
            openCloseIndicator.classList.add("fa-angle-right");
            openCloseIndicator.classList.remove("fa-angle-down");
            subMenu.setAttribute("hidden", "");
        }
        expandedIndexList = [];
        this.shadowRoot.querySelectorAll(".menu-item > div:first-of-type > i.fas").forEach((e, i) => {
            if (e.classList.contains("fa-angle-down")) {
                expandedIndexList.push(i);
            }
        });
        sessionStorage.setItem("menu-expanded-index-list", JSON.stringify(expandedIndexList));
    }

    subMenuItemClick(event) {
        const elements = this.shadowRoot.querySelectorAll("a");
        elements.forEach(element => element.classList.remove("active"));
        event.srcElement.classList.add("active");
        activeIndex = -1;
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].classList.contains("active")) {
                activeIndex = i;
                break;
            }
        }
        sessionStorage.setItem("menu-active-index", activeIndex);
    }
}

customElements.define("ing-hubs-tr-menu", IngHubsTrMenu);
