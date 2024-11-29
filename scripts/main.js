class Feature {
    /**
     * @param {string} shortTitle - The home page 2-line description of the feature
     * @param {string} coverSrc - The image source of the feature card cover
     * @param {string} backgroundColor - The background color of the feature card
     * @param {string} mainTitle - The overlay headline title of the feature
     * @param {string} description - The overlay description of the feature
     * @param {string} interactiveHtmlSrc - The source of the interactive HTML content in the overlay, if any
     * @param {string} mediaSrc - The source of the media content in the overlay (image or video) 
     * @param {string} ctaButtonTitle - The title of the call-to-action button in the overlay
     * @param {boolean} options.needResizeIframeWidth - Whether the iframe in the overlay needs to be resized to the width of the content inside it
     * @returns {Feature} The feature object
     */
    constructor(shortTitle, coverSrc, backgroundColor, mainTitle, description, interactiveHtmlSrc, mediaSrc, ctaButtonTitle, options) {
        this.shortTitle = shortTitle;
        this.coverSrc = coverSrc;
        this.backgroundColor = backgroundColor;
        this.mainTitle = mainTitle;
        this.description = description;
        this.interactiveHtmlSrc = interactiveHtmlSrc;
        this.mediaSrc = mediaSrc;
        this.ctaButtonTitle = ctaButtonTitle;
        this.options = options;
    }

    /**
     * This method appends the feature card to the given HTML element.
     * 
     * @param {HTMLElement} htmlElement - The HTML element to append the feature card to
     */
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

    /**
     * This method opens the overlay of the feature.
     */
    openOverlay() {
        const resizeIframe = (iframe) => {
            if (this.options?.needResizeIframeWidth) {
                iframe.style.width = iframe.contentWindow.document.body.scrollWidth + 'px';
            }
            iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
        }

        const closeOverlay = () => {
            bgOverlay.remove();
            overlay.remove();
        }

        // Create the overlay
        const bgOverlay = document.createElement("div");
        bgOverlay.classList.add("bg-overlay");
        bgOverlay.onclick = closeOverlay;
        const overlay = document.createElement("div");
        overlay.classList.add("overlay");

        // Create the close button
        const closeButton = document.createElement("button");
        closeButton.classList.add("icon-filled-button-light");
        closeButton.classList.add("close-button");
        const closeIcon = document.createElement("i");
        closeIcon.setAttribute("data-feather", "x");
        closeButton.appendChild(closeIcon);
        closeButton.onclick = closeOverlay;
        overlay.appendChild(closeButton);

        // Create the overlay content
        const overlayContentInformation = overlay.appendChild(document.createElement("article"));
        overlayContentInformation.classList.add("overlay-content-information");

        const mainTitle = overlayContentInformation.appendChild(document.createElement("h2"));
        mainTitle.textContent = this.mainTitle;
        
        if (this.description) {
            const description = overlayContentInformation.appendChild(document.createElement("p"));
            description.textContent = this.description;
        }
        
        if (this.interactiveHtmlSrc) {
            const interactiveHtml = overlayContentInformation.appendChild(document.createElement("iframe"));
            interactiveHtml.src = this.interactiveHtmlSrc;
            interactiveHtml.onload = () => resizeIframe(interactiveHtml);
            if (this.options?.needResizeIframeWidth) {
                interactiveHtml.classList.add("centered");
            }
        } else {
            const spacer = overlayContentInformation.appendChild(document.createElement("div"));
            spacer.classList.add("spacer");
        }

        // Create the call-to-action button
        const ctaButtonAnchor = overlayContentInformation.appendChild(document.createElement("a"));
        ctaButtonAnchor.href = "https://get.revolut.com/E528/?af_channel=website_direct&af_dp=revolut%3A%2F%2Fapp&af_sub1=%7B%22conversion_page_url%22%3A%22https%3A%2F%2Fwww.revolut.com%2Fen-SG%2F%22%2C%22cookie_consent%22%3A%5B%5D%2C%22landing_page_url%22%3A%22https%3A%2F%2Fwww.revolut.com%2F%22%2C%22qr_code%22%3Afalse%2C%22website_client_id%22%3A%221a3e65d6-7c4a-465c-857d-46cc9c94e095%22%7D&deep_link_sub1=DEEPLINK&deep_link_value=revolut%3A%2F%2Fapp&pid=website";
        ctaButtonAnchor.classList.add("centered");
        const ctaButton = ctaButtonAnchor.appendChild(document.createElement("button"))
        ctaButton.classList.add("filled-button-light")
        ctaButton.textContent = this.ctaButtonTitle;
        
        // Create the overlay media content
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

        // Render the overlay
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
        "Try it out",
        {
            needResizeIframeWidth: true
        }
    ),
    new Feature(
        "Earn up to 4.75% interest on savings, paid every day",
        "assets/images/feature-2/cover.png",
        "#E5ECFF",
        "Make your money\nMake money",
        "Waiting's overrated. Grow your savings faster with interest paid daily at excellent rates, with instant access. Get up to 4.75% p.a. on your British Pound savings.",
        "components/feature-2/interactive.html",
        "assets/videos/feature-2/video.mp4",
        "Start saving",
        {
            needResizeIframeWidth: true
        }
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
    ),
    new Feature(
        "Create virtual and disposable cards for the sites you don't trust",
        "assets/images/feature-5/cover.png",
        "#FCE7FF",
        "Don't trust?\nNo problem",
        "Virtual and disposable cards allow you to create cards for each seller and freeze them after use, or set strict spending limits every month. This ensures a malicious seller will not set you back.\n\nDon't limit yourself to just one card — get two, three, or 13.",
        undefined,
        "assets/videos/feature-5/video.mp4",
        "Get my card"
    ),
    new Feature(
        "Split bills and send money just like sending a text message",
        "assets/images/feature-6/cover.png",
        "#E5ECFF",
        "Simply hit send",
        undefined,
        "components/feature-6/interactive.html",
        "assets/videos/feature-6/video.mp4",
        "Try it out"
    ),
    new Feature(
        "Invest in your future and make your money do more",
        "assets/images/feature-7/cover.png",
        "#EFEFEF",
        "Time to trade up",
        "Invest in your future and make your money do more for you.\nThousands of stocks at your fingertips, starting at just $1.",
        "components/feature-7/interactive.html",
        "assets/videos/feature-7/video.mp4",
        "Start trading"
    ),
    new Feature(
        "Protect your money with no-compromise data security",
        "assets/images/feature-8/cover.png",
        "#E7E5FF",
        "Your money's safe space",
        "45+ million trust us to look after more than $30.3 billion of their money. Protect yours with state-of-the-smart defences, then personalise your settings to stay in complete control.\n\nRevolut Secure means keeping your money safe — and you in control. The shield is a reminder that our always-on monitoring system and 4,000-strong, 24/7 financial crime team are on the lookout with you. Keep an eye out for anything unusual — and if there's a warning, take note, take action, then breathe easy.",
        undefined,
        "assets/images/feature-8/media.png",
        "Get started"
    ),
]


document.addEventListener("DOMContentLoaded", () => {  
    const cardsDiv = document.getElementById("cards");

    // Append each feature card to the cards div
    for (const feature of features) {
        feature.appendCard(cardsDiv);
    }
})