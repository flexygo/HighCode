class FlxImgElement extends HTMLImageElement {
    length = 2;
    initials = this.alt.substring(0, this.length);

    constructor() {
        super();
        this.addEventListener('error', () => {
            this.generateBackgroundImage();
        });
    }

    /**
   * Set if element has been connected to DOM
   * @property connected {boolean}
   */
    connected = false;

    /**
    * Fires when element is attached to DOM
    * @method connectedCallback
    */
    connectedCallback() {
        this.connected = true;
        if (!($(this).attr('src'))) {
            this.generateBackgroundImage();
        } else if ($(this).attr('src').toString().toLowerCase().endsWith('.json')) {
            let html = this.outerHTML.toString().toLowerCase();
            html=html.replace('<img', '<flx-animation');
            $(this).replaceWith(html);
        }
    }

    generateBackgroundImage() {

        let background_color = this.getAttribute("backgroundcolor") || this.getAttribute("background_color");
        if (!background_color) 
            background_color = this.getRandomColor(this.initials);

        let text_color = this.getAttribute("color");
        if (!text_color)
            text_color = "#ffffff";

        // Create a rectangular canvas which will become th image.
        let canvas = document.createElement("canvas");
        let context = canvas.getContext("2d");
        canvas.width = canvas.height = 100;

        // Draw the circle in the background using the randomColor.
        context.fillStyle = background_color;
        context.beginPath();
        context.rect(0, 0, canvas.width, canvas.height);
        context.fill();
        context.font = (canvas.height / 2) + "px Arial";
        context.fillStyle = text_color;
        // Make the text's center overlap the image's center.
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(this.initials, canvas.width / 2, canvas.height / 2);

        // Show the image to the world.
        this.src = canvas.toDataURL();

    }

    colors = ['#EF9A9A','#F48FB1','#CE93D9','#694c9f','#4e5a9a','#32638a','#244b5d','#4a9ba7','#30635e','#2ea879','#679238','#a5b22e','#59819d','#bca047','#FFCC80','#FFAB91',
    '#BDAAA4','#B1BEC5','#D32E2E','#C2175B','#7B1FA2','#5D35B1','#3948AB','#1D88E5','#009BE5','#00ACC1','#00897B','#43A046','#7CB342','#C0CA33','#FED935','#FFB300','#FB8C00',
    '#F4501D','#6D4C41','#757575','#546E7A'];

    getRandomColor(seed) { 
        let value = seed;
        while (isNaN(value) || (this.colors.length <= value)) {
            let currentIndex = 0;
            value = value.toString().split('');
            for (let i = 0; i < value.length; i++) {
                if (!isNaN(value[i])) {
                    currentIndex += parseInt(value[i]);
                } else {
                    currentIndex += value[i].charCodeAt();
                }
            }
            value = currentIndex;
        }

        return this.colors[value];

    }

    /**
    * Array of observed attributes. 
    * @property observedAttributes {Array}
    */
    static observedAttributes = ["backgroundcolor", "background_color", "color"];


    /**
    * Fires when the attribute value of the element is changed.
    * @method attributeChangedCallback
    */
    attributeChangedCallback(attrName, oldVal, newVal) {
        this.generateBackgroundImage();
    }
}

customElements.define('flx-img', FlxImgElement, { extends: 'img' });
