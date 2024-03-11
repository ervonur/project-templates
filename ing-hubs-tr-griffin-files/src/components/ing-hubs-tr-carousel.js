import { Bootstrap } from "../styles/bootstrap";
import { Fontawesome } from "../styles/fontawesome";
import { LitElement, html, css } from "lit";

export class IngHubsTrCarousel extends LitElement {
    static styles = [
        Bootstrap,
        Fontawesome,
        css`
            .carousel-item {
                width: 100%;
                height: 500px;
            }
            .carousel-control-prev,
            .carousel-control-next {
                font-size: 32pt;
            }
        `
    ];

    render() {
        return html`
            <div id="carousel" class="carousel slide">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carousel" class="bg-dark active"></button>
                    <button type="button" data-bs-target="#carousel" class="bg-dark"></button>
                    <button type="button" data-bs-target="#carousel" class="bg-dark"></button>
                </div>
                <div class="carousel-inner text-dark">
                    <div class="carousel-item bg-warning active">
                        <div class="carousel-caption d-none d-md-block text-dark">
                            <h5>First slide label</h5>
                            <p>Some representative placeholder content for the first slide.</p>
                        </div>
                    </div>
                    <div class="carousel-item bg-success">
                        <div class="carousel-caption d-none d-md-block text-light">
                            <h5>Second slide label</h5>
                            <p>Some representative placeholder content for the second slide.</p>
                        </div>
                    </div>
                    <div class="carousel-item bg-primary">
                        <div class="carousel-caption d-none d-md-block text-light">
                            <h5>Third slide label</h5>
                            <p>Some representative placeholder content for the third slide.</p>
                        </div>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" @click=${this.prev}>
                    <span class="fas fa-angle-left text-dark" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" @click=${this.next}>
                    <span class="fas fa-angle-right text-dark" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        `;
    }

    prev() {
        let index = -1;
        
        const carouselItemList = this.shadowRoot.querySelectorAll(".carousel-item");
        const carouselIndicatorButtonList = this.shadowRoot.querySelectorAll(".carousel-indicators button");

        for (let i = 0; i < carouselItemList.length; i++) {
            if (carouselItemList[i].classList.contains("active")) {
                index = i;
                break;
            }
        }

        carouselItemList[index].classList.remove("active");
        carouselIndicatorButtonList[index].classList.remove("active");

        index--;
        if (index < 0) {
            index = carouselItemList.length - 1;
        }

        carouselItemList[index].classList.add("active");
        carouselIndicatorButtonList[index].classList.add("active");

        this._syncButtons(index);
    }

    next() {
        let index = -1;
        
        const carouselItemList = this.shadowRoot.querySelectorAll(".carousel-item");
        const carouselIndicatorButtonList = this.shadowRoot.querySelectorAll(".carousel-indicators button");

        for (let i = 0; i < carouselItemList.length; i++) {
            if (carouselItemList[i].classList.contains("active")) {
                index = i;
                break;
            }
        }

        carouselItemList[index].classList.remove("active");
        carouselIndicatorButtonList[index].classList.remove("active");

        index++;
        if (index == carouselItemList.length) {
            index = 0;
        }

        carouselItemList[index].classList.add("active");
        carouselIndicatorButtonList[index].classList.add("active");

        this._syncButtons(index);
    }

    _syncButtons(index) {
        const indicators = this.shadowRoot.querySelectorAll(".carousel-indicators > button");
        const prevButton = this.shadowRoot.querySelector(".carousel-control-prev > span:first-of-type");
        const nextButton = this.shadowRoot.querySelector(".carousel-control-next > span:first-of-type");

        indicators.forEach(indicator => {
            indicator.classList.remove("bg-dark");
            indicator.classList.remove("bg-light");
        });

        prevButton.classList.remove("text-dark");
        prevButton.classList.remove("text-white");
        
        nextButton.classList.remove("text-dark");
        nextButton.classList.remove("text-white");
        
        switch (index) {
            case 0:
                indicators.forEach(indicator => {
                    indicator.classList.add("bg-dark");
                });
                prevButton.classList.add("text-dark");
                nextButton.classList.add("text-dark");
                break;
            case 1:
            case 2:
                indicators.forEach(indicator => {
                    indicator.classList.add("bg-light");
                });
                prevButton.classList.add("text-white");
                nextButton.classList.add("text-white");
                break;
        }
    }
}

customElements.define("ing-hubs-tr-carousel", IngHubsTrCarousel);
