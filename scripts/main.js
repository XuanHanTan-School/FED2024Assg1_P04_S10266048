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
        card.onclick = () => this.openOverlay();

        const coverImageContainer = card.appendChild(document.createElement("div"));
        coverImageContainer.classList.add("image-container");
        coverImageContainer.style.backgroundImage = `url(${this.coverSrc})`;

        const cardShortTitle = card.appendChild(document.createElement("h5"));
        cardShortTitle.textContent = this.shortTitle;

        htmlElement.appendChild(card);
    }

    openOverlay() {
        console.log("Opening overlay");
        const bgOverlay = document.createElement("div");
        bgOverlay.classList.add("bg-overlay");
        const overlay = document.createElement("div");
        overlay.classList.add("overlay");

        const closeButton = document.createElement("button");
        closeButton.classList.add("icon-button-light");
        closeButton.classList.add("close-button");
        const closeIcon = document.createElement("i");
        closeIcon.setAttribute("data-feather", "x");
        closeButton.appendChild(closeIcon);
        closeButton.onclick = () => {
            console.log("closing")
            bgOverlay.remove();
            overlay.remove();
        };
        overlay.appendChild(closeButton);

        const overlayContentInformation = overlay.appendChild(document.createElement("div"));
        overlayContentInformation.classList.add("overlay-content-information");

        const mainTitle = overlayContentInformation.appendChild(document.createElement("h2"));
        mainTitle.textContent = this.mainTitle;
        const description = overlayContentInformation.appendChild(document.createElement("p"));
        description.textContent = this.description;
        const interactiveHtml = overlayContentInformation.appendChild(document.createElement("iframe"));
        interactiveHtml.src = this.interactiveHtmlSrc;

        const spacer = overlayContentInformation.appendChild(document.createElement("div"));
        spacer.classList.add("spacer");

        const ctaButtonAnchor = overlayContentInformation.appendChild(document.createElement("a"));
        ctaButtonAnchor.href = "https://get.revolut.com/E528/?af_channel=website_direct&af_dp=revolut%3A%2F%2Fapp&af_sub1=%7B%22conversion_page_url%22%3A%22https%3A%2F%2Fwww.revolut.com%2Fen-SG%2F%22%2C%22cookie_consent%22%3A%5B%5D%2C%22landing_page_url%22%3A%22https%3A%2F%2Fwww.revolut.com%2F%22%2C%22qr_code%22%3Afalse%2C%22website_client_id%22%3A%221a3e65d6-7c4a-465c-857d-46cc9c94e095%22%7D&deep_link_sub1=DEEPLINK&deep_link_value=revolut%3A%2F%2Fapp&pid=website";
        ctaButtonAnchor.classList.add("centered-button");
        const ctaButton = ctaButtonAnchor.appendChild(document.createElement("button"))
        ctaButton.classList.add("button-light")
        ctaButton.textContent = this.ctaButtonTitle;
        
        if (this.mediaSrc.endsWith(".mp4")) {
            const video = overlay.appendChild(document.createElement("video"));
            video.classList.add("overlay-content-media");
            video.src = this.mediaSrc;
            video.width = "40%";
            video.autoplay = true;
            video.loop = true;
            video.controls = false;
        } else {
            const image = overlay.appendChild(document.createElement("img"));
            image.classList.add("overlay-content-media");
            image.src = this.mediaSrc;
        }

        document.body.appendChild(bgOverlay);
        document.body.appendChild(overlay);

        feather.replace();
    }
}

const features = [
    new Feature(
        "Fee-free multi-currency spending with the best exchange rates",
        "assets/images/feature-1/cover.png",
        "#EFEFEF",
        "Stretch your money\nGreat exchange rates\nFrom Mexico to Morocco",
        "Spend in 150+ countries and stash in 33+ currencies. Join 30+ million others using Revolut to convert money and spend internationally.",
        "components/feature-1/interactive.html",
        "assets/videos/feature-1/video.mp4",
        "Try it out"
    ),
    new Feature(
        "Earn up to 4.75% interest on savings, paid every day",
        "assets/images/feature-2/cover.png",
        "#E5ECFF",
        "Make your money\nMake money",
        "Waiting's overrated. Grow your savings faster with interest paid daily at excellent rates, with instant access.",
        "components/feature-2/interactive.html",
        "assets/videos/feature-2/video.mp4",
        "Start saving"
    ),
    new Feature(
        "Get miles and savings with RevPoints for daily expenses",
        "assets/images/feature-3/cover.png",
        "#E7E5FF",
        "Go places with RevPoints",
        "Discover RevPoints — our free points programme offering up to 1 point per £1 spent on your Revolut card depending on your plan. Use your points on rewards including air miles, Stays discounts, and more. RevPoints T&Cs apply.",
        "components/feature-3/interactive.html",
        "assets/images/feature-3/media.png",
        "Download the app"
    ),
    new Feature(
        "Customise your card to the one that matches your vibe",
        "assets/images/feature-4/cover.png",
        "#FCE7FF",
        "Make your card memorable",
        "Customise it. Personalise it. Make it yours. Fees apply. It can be as simple as a few taps in the app, or your most intricate drawings.",
        "components/feature-4/interactive.html",
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