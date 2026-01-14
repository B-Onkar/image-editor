let filters = {
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%",
    },
    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%",
    },
    saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%",
    },
    hueRotation: {
        value: 0,
        min: 0,
        max: 360,
        unit: "deg",
    },
    blur: {
        value: 0,
        min: 0,
        max: 20,
        unit: "px",
    },
    grayscale: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%",
    },
    sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%",
    },
    opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%",
    },
    invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%",
    },
}

const presets = {
    normal: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },

    drama: {
        brightness: 95,
        contrast: 140,
        saturation: 130,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 10,
        opacity: 100,
        invert: 0,
    },

    vintage: {
        brightness: 110,
        contrast: 90,
        saturation: 80,
        hueRotation: 10,
        blur: 1,
        grayscale: 0,
        sepia: 40,
        opacity: 100,
        invert: 0,
    },

    oldSchool: {
        brightness: 105,
        contrast: 110,
        saturation: 70,
        hueRotation: 0,
        blur: 1,
        grayscale: 20,
        sepia: 60,
        opacity: 100,
        invert: 0,
    },

    blackAndWhite: {
        brightness: 100,
        contrast: 120,
        saturation: 0,
        hueRotation: 0,
        blur: 0,
        grayscale: 100,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },

    cinematic: {
        brightness: 90,
        contrast: 130,
        saturation: 110,
        hueRotation: 350,
        blur: 0,
        grayscale: 0,
        sepia: 5,
        opacity: 100,
        invert: 0,
    },

    faded: {
        brightness: 115,
        contrast: 80,
        saturation: 70,
        hueRotation: 0,
        blur: 0,
        grayscale: 10,
        sepia: 15,
        opacity: 100,
        invert: 0,
    },

    warm: {
        brightness: 105,
        contrast: 100,
        saturation: 120,
        hueRotation: 15,
        blur: 0,
        grayscale: 0,
        sepia: 20,
        opacity: 100,
        invert: 0,
    },

    cool: {
        brightness: 100,
        contrast: 110,
        saturation: 110,
        hueRotation: 200,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },

    horror: {
        brightness: 85,
        contrast: 150,
        saturation: 60,
        hueRotation: 120,
        blur: 0,
        grayscale: 20,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },

    dreamy: {
        brightness: 110,
        contrast: 90,
        saturation: 120,
        hueRotation: 330,
        blur: 3,
        grayscale: 0,
        sepia: 10,
        opacity: 100,
        invert: 0,
    },
};

const filtersContainer = document.querySelector(".filters");
const imageCanvas = document.querySelector("#image-canvas");
const imageInput = document.querySelector("#image-input");
const canvasCtx = imageCanvas.getContext("2d");
const resetButton = document.querySelector("#reset-btn");
const downloadButton = document.querySelector("#download-btn");
const presetsContainer = document.querySelector(".presets");

let file = null;
let image = null;

function createFilterElement(name, unit = "%", value, min, max) {
    const div = document.createElement("div");
    div.classList.add("filter");
    const input = document.createElement("input");
    input.type = "range";
    input.min = min;
    input.max = max;
    input.value = value;
    input.id = name;

    const p = document.createElement("p");
    p.innerText = name;

    div.appendChild(p);
    div.appendChild(input);

    input.addEventListener("input", () => {
        filters[name].value = input.value;
        applyFilters();
    });
    return div;
}

function createFilters() {
    Object.keys(filters).forEach(key => {
        const filterElement = createFilterElement(key, filters[key].unit, filters[key].value, filters[key].min, filters[key].max);
        filtersContainer.appendChild(filterElement);
    });
}

createFilters();

imageInput.addEventListener("change", (e) => {
    file = e.target.files[0];
    const imgPlaceholder = document.querySelector(".placeholder");
    imageCanvas.style.display = "block";
    imgPlaceholder.style.display = "none";

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
        image = img;
        imageCanvas.width = img.width;
        imageCanvas.height = img.height;
        canvasCtx.drawImage(img, 0, 0);
    }
})

function applyFilters() {
    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
    canvasCtx.filter = `
    brightness(${filters.brightness.value}${filters.brightness.unit})
    contrast(${filters.contrast.value}${filters.contrast.unit})
    saturate(${filters.saturation.value}${filters.saturation.unit})
    hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
    blur(${filters.blur.value}${filters.blur.unit})
    grayscale(${filters.grayscale.value}${filters.grayscale.unit})
    sepia(${filters.sepia.value}${filters.sepia.unit})
    opacity(${filters.opacity.value}${filters.opacity.unit})
    invert(${filters.invert.value}${filters.invert.unit})
    `.trim();
    canvasCtx.drawImage(image, 0, 0);
}

resetButton.addEventListener("click", () => {
    filters = {
        brightness: {
            value: 100,
            min: 0,
            max: 200,
            unit: "%",
        },
        contrast: {
            value: 100,
            min: 0,
            max: 200,
            unit: "%",
        },
        saturation: {
            value: 100,
            min: 0,
            max: 200,
            unit: "%",
        },
        hueRotation: {
            value: 0,
            min: 0,
            max: 360,
            unit: "deg",
        },
        blur: {
            value: 0,
            min: 0,
            max: 20,
            unit: "px",
        },
        grayscale: {
            value: 0,
            min: 0,
            max: 100,
            unit: "%",
        },
        sepia: {
            value: 0,
            min: 0,
            max: 100,
            unit: "%",
        },
        opacity: {
            value: 100,
            min: 0,
            max: 100,
            unit: "%",
        },
        invert: {
            value: 0,
            min: 0,
            max: 100,
            unit: "%",
        },
    }
    applyFilters();

    filtersContainer.innerHTML = "";
    createFilters();
})

downloadButton.addEventListener("click", () => {
    const link = document.createElement("a");
    const baseName = file.name.replace(/\.[^/.]+$/, "");
    link.download = `${baseName}-edited.jpg`;
    link.href = imageCanvas.toDataURL();
    link.click();
})

Object.keys(presets).forEach(key => {
    const presetButton = document.createElement("button");
    presetButton.classList.add("btn");
    presetButton.innerText = key;
    presetsContainer.appendChild(presetButton);

    presetButton.addEventListener("click", () => {
        const preset = presets[key];

        Object.keys(preset).forEach(key => {
            filters[key].value = preset[key];
        });
        applyFilters();
        filtersContainer.innerHTML = "";
        createFilters();
    });
});