export function createHeader() {
    const header = document.createElement('div');
    header.textContent = 'Spectar';
    header.style.position = 'absolute';
    header.style.top = '30px';
    header.style.left = '30px';
    header.style.letterSpacing = '-2px';
    header.style.fontFamily = "'Albert Sans', sans-serif";
    header.style.fontSize = '52px';
    header.style.fontWeight = '600';
    header.style.color = '#000000';
    header.style.zIndex = '1000';
    return header;
}

export function createDescription() {
    const description = document.createElement('div');
    description.textContent = 'Utilizing RayBans newest Meta AI glasses to reinvent accessibility standards for our seniors.';
    description.style.position = 'absolute';
    description.style.bottom = '20px';
    description.style.right = '20px';
    description.style.fontFamily = "'Albert Sans', sans-serif";
    description.style.fontSize = '16px';
    description.style.fontWeight = '400';
    description.style.color = '#000000';
    description.style.maxWidth = '400px';
    description.style.textAlign = 'right';
    description.style.lineHeight = '1.5';
    description.style.zIndex = '1000';
    return description;
} 