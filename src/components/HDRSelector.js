// HDR environment options
export const hdrOptions = [
    { name: 'Studio', path: '/src/assets/brown_photostudio_01_4k.hdr' },
    { name: 'Sunset', path: '/src/assets/belfast.hdr' },
    { name: 'Night', path: '/src/assets/lilienstein_4k.hdr' },
    { name: 'Beach', path: '/src/assets/beach_1k.hdr' }
];

// function to create and return the HDR selector element
export function createHDRSelector(onChange) {
    // create HDR environment selector
    const hdrContainer = document.createElement('div');
    hdrContainer.style.position = 'absolute';
    hdrContainer.style.bottom = '80px';
    hdrContainer.style.right = '20px';
    hdrContainer.style.zIndex = '1000';
    hdrContainer.style.fontFamily = "'Albert Sans', sans-serif";

    const hdrLabel = document.createElement('label');
    hdrLabel.textContent = 'Environment: ';
    hdrLabel.style.color = '#000000';
    hdrLabel.style.fontSize = '14px';
    hdrLabel.style.marginRight = '10px';
    hdrContainer.appendChild(hdrLabel);

    const hdrSelect = document.createElement('select');
    hdrSelect.style.padding = '8px 12px';
    hdrSelect.style.backgroundColor = '#ffffff';
    hdrSelect.style.color = '#000000';
    hdrSelect.style.border = '1px solid #cccccc';
    hdrSelect.style.borderRadius = '4px';
    hdrSelect.style.fontFamily = "'Albert Sans', sans-serif";
    hdrSelect.style.fontSize = '14px';
    hdrSelect.style.cursor = 'pointer';
    hdrContainer.appendChild(hdrSelect);

    // Populate dropdown with HDR options
    hdrOptions.forEach((option, index) => {
        const optionElement = document.createElement('option');
        optionElement.value = index;
        optionElement.textContent = option.name;
        hdrSelect.appendChild(optionElement);
    });

    // add change event to switch HDR maps
    hdrSelect.addEventListener('change', function() {
        const selectedIndex = parseInt(this.value);
        if (onChange) {
            onChange(selectedIndex);
        }
    });

    return hdrContainer;
} 