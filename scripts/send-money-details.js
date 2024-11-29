import DetailOption from "./classes/detail-option.js";

document.addEventListener("DOMContentLoaded", () => {
    const detailOptions = [
        new DetailOption(
            "Send",
            "Sending and receiving money is just as easy as texting a friend.",
        ),
        new DetailOption(
            "Split",
            "Be the group dinner hero — grab the bill and settle up faster than it takes to down your drink.",
        ),
        new DetailOption(
            "Gift",
            "Send them something they'll actually use — a fun gift card or good old cash. And it only takes a few seconds.",
        ),
    ]

    // Render the detail options
    DetailOption.renderDetailOptions(detailOptions, document);
});