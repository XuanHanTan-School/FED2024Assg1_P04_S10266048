export default class DetailOption {
    constructor(name, description, image) {
        this.name = name;
        this.description = description;
        this.image = image;
    }
    
    showDetails(document, parent) {
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
}