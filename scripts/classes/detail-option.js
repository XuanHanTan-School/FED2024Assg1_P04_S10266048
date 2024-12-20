/**
 * This class represents a detail option (used for showing tabs with more information).
 */
export default class DetailOption {
    /**
     * @param {string} name The header of the detail option
     * @param {string} description The description of the detail option
     * @param {string} image The image source of the detail option
     * @returns {DetailOption} The detail option object
     */
    constructor(name, description, image) {
        this.name = name;
        this.description = description;
        this.image = image;
    }
    
    /**
     * This method renders the UI of a single detail option.
     * 
     * @param {Document} document 
     * @param {HTMLElement} parent 
     */
    _showDetails(document, parent) {
        // Clear the parent element
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }

        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = this.description;
        parent.appendChild(descriptionElement);

        if (this.image) {
            const imageElement = document.createElement("img");
            imageElement.src = this.image;
            imageElement.alt = this.name;
            parent.appendChild(imageElement);
        }
    }

    /**
     * This method renders the UI for viewing multiple detail options.
     * 
     * @param {DetailOption[]} detailOptions 
     * @param {Document} document 
     */
    static renderDetailOptions(detailOptions, document) {
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
                detailOption._showDetails(document, detailsContent);
            };
        }
    
        detailsDiv.appendChild(detailsSelector);
        detailsDiv.appendChild(detailsContent);
        detailsSelector.children[0].click();
    }
}