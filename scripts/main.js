class Feature {
    constructor(shortTitle, coverSrc, backgroundColor, mainTitle, description, interactiveHtmlSrc, mediaSrc, ctaButtonTitle) {
        this.shortTitle = shortTitle;
        this.coverSrc = coverSrc;
        this.backgroundColor = backgroundColor;
        this.mainTitle = mainTitle;
        this.description = description;
        this.interactiveHtmlSrc = interactiveHtmlSrc;
        this.mediaSrc = mediaSrc;
        this.ctaButtonTitle = ctaButtonTitle;
    }

    appendCard(htmlElement) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.style.backgroundColor = this.backgroundColor;

        const coverImageContainer = card.appendChild(document.createElement("div"));
        coverImageContainer.classList.add("image-container");
        coverImageContainer.style.backgroundImage = `url(${this.coverSrc})`;

        const cardShortTitle = card.appendChild(document.createElement("h5"));
        cardShortTitle.textContent = this.shortTitle;

        htmlElement.appendChild(card);
    }
}

const features = [
    new Feature(
        "Fee-free multi-currency spending with the best exchange rates",
        "assets/images/feature-1/cover.png",
        "#EFEFEF",
        "Stretch your money\nGreat exchange rates\nFrom Mexico to Morocco",
        "Spend in 150+ countries and stash in 33+ currencies. Join 30+ million others using Revolut to convert money and spend internationally.",
        "assets/components/feature-1/interactive.html",
        "assets/videos/feature-1/video.mp4",
        "Try it out"
    ),
    new Feature(
        "Earn up to 4.75% interest on savings, paid every day",
        "assets/images/feature-2/cover.png",
        "#E5ECFF",
        "Make your money\nMake money",
        "Waiting's overrated. Grow your savings faster with interest paid daily at excellent rates, with instant access.",
        "assets/components/feature-2/interactive.html",
        "assets/videos/feature-2/video.mp4",
        "Start saving"
    ),
    new Feature(
        "Get miles and savings with RevPoints for daily expenses",
        "assets/images/feature-3/cover.png",
        "#E7E5FF",
        "Go places with RevPoints",
        "Discover RevPoints — our free points programme offering up to 1 point per £1 spent on your Revolut card depending on your plan. Use your points on rewards including air miles, Stays discounts, and more. RevPoints T&Cs apply.",
        "assets/components/feature-3/interactive.html",
        "assets/images/feature-3/media.png",
        "Download the app"
    ),
    new Feature(
        "Customise your card to the one that matches your vibe",
        "assets/images/feature-4/cover.png",
        "#FCE7FF",
        "Make your card memorable",
        "Customise it. Personalise it. Make it yours. Fees apply. It can be as simple as a few taps in the app, or your most intricate drawings.",
        "assets/components/feature-4/interactive.html",
        "assets/videos/feature-4/video.mp4",
        "Get my card"
    )
]


document.addEventListener("DOMContentLoaded", () => {  
    const cardsDiv = document.getElementById("cards");
    for (const feature of features) {
        feature.appendCard(cardsDiv);
    }
})