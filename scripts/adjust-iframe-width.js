document.addEventListener("DOMContentLoaded", () => {
    const interactiveHtml = document.getElementById("iframe");
    
    if (interactiveHtml) {
        interactiveHtml.width = interactiveHtml.contentWindow.document.body.scrollWidth
        interactiveHtml.height = interactiveHtml.contentWindow.document.body.scrollHeight
    }
});