import DetailOption from "./classes/detail-option.js";

document.addEventListener("DOMContentLoaded", () => {
    const detailOptions = [
        new DetailOption(
            "Airline Miles",
            "Get ready to see the world, when you convert your points into air miles. Get 1 mile for each point, with top airlines like KLM, British Airways, Air France, Iberia, and many more.",
            "../../assets/images/feature-3/details/miles.png"
        ),
        new DetailOption(
            "Stays",
            "Time for a dream getaway. With 5,000 RevPoints you get up to €100 off a Stay — just choose anything from a chateau to a chalet, and use your points to save on your suite.",
            "../../assets/images/feature-3/details/stays.png"
        ),
        new DetailOption(
            "Experiences",
            "Whether you're near or far, wherever you are you can find unique tours and exciting activities with Experiences.",
            "../../assets/images/feature-3/details/experiences.png"
        ),
        new DetailOption(
            "Revolut Pay",
            "With Revolut Pay, there's no need to wait for Black Friday to enjoy amazing savings. Swap your RevPoints for discounts on top brands, using our fast, fuss-free checkout option.",
            "../../assets/images/feature-3/details/revpay.webp"
        ),
    ]

    const detailsDiv = document.getElementsByClassName("interactive-details")[0];
    const detailsSelector = document.createElement("div");
    detailsSelector.classList.add("details-selector");
    const detailsContent = document.createElement("div");
    detailsContent.classList.add("details-content");

    for (const detailOption of detailOptions) {
        const detailOptionButton = document.createElement("button")
        detailOptionButton.classList.add("outlined-button-light");
        detailOptionButton.textContent = detailOption.name;
        detailsSelector.appendChild(detailOptionButton);

        detailOptionButton.onclick = () => {
            const detailOptionButtons = detailsSelector.children;
            for (const button of detailOptionButtons) {
                button.classList.remove("filled-button-light");
                button.classList.add("outlined-button-light");
            }
            detailOptionButton.classList.remove("outlined-button-light");
            detailOptionButton.classList.add("filled-button-light");
            detailOption.showDetails(document, detailsContent);
        };
    }

    detailsDiv.appendChild(detailsSelector);
    detailsDiv.appendChild(detailsContent);
    detailsSelector.children[0].click();
});