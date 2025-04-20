export function createControlsGuide() {
    // container for the entire component
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.bottom = '20px';
    container.style.left = '20px';
    container.style.zIndex = '1000';
    
    
    // toggle button
    const toggleButton = document.createElement('div');
    toggleButton.innerHTML = 'Controls &#x2191;'; // Controls text with up arrow
    toggleButton.style.padding = '8px 12px';
    toggleButton.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
    toggleButton.style.borderRadius = '4px';
    toggleButton.style.display = 'flex';
    toggleButton.style.alignItems = 'center';
    toggleButton.style.gap = '6px';
    toggleButton.style.cursor = 'pointer';
    toggleButton.style.fontSize = '14px';
    toggleButton.style.fontFamily = "'Albert Sans', sans-serif";
    toggleButton.style.transition = 'all 0.3s ease';
    toggleButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    
    // guide panel
    const guidePanel = document.createElement('div');
    guidePanel.style.position = 'absolute';
    guidePanel.style.bottom = '100%'; // position above the toggle button
    guidePanel.style.left = '0';
    guidePanel.style.marginBottom = '8px';
    guidePanel.style.fontFamily = "'Albert Sans', sans-serif";
    guidePanel.style.fontSize = '14px';
    guidePanel.style.color = '#000000';
    guidePanel.style.opacity = '0';
    guidePanel.style.visibility = 'hidden';
    guidePanel.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
    guidePanel.style.padding = '10px';
    guidePanel.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
    guidePanel.style.borderRadius = '4px';
    guidePanel.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    
    // controls list
    const controlsList = document.createElement('div');
    controlsList.style.display = 'flex';
    controlsList.style.flexDirection = 'column';
    controlsList.style.gap = '6px';
    controlsList.style.width = '200px';
    
    // cute control items!
    const controls = [
        { icon: '🔄', text: 'Left click + drag to rotate' },
        { icon: '✋', text: 'Right click + drag to pan' },
        { icon: '🔍', text: 'Scroll to zoom' }
    ];
    
    controls.forEach(control => {
        const item = document.createElement('div');
        item.style.display = 'flex';
        item.style.alignItems = 'center';
        item.style.gap = '8px';
        
        const icon = document.createElement('span');
        icon.textContent = control.icon;
        icon.style.fontSize = '16px';
        
        const text = document.createElement('span');
        text.textContent = control.text;
        
        item.appendChild(icon);
        item.appendChild(text);
        controlsList.appendChild(item);
    });
    
    guidePanel.appendChild(controlsList);
    
    // toggle functionality
    let isVisible = false;
    
    toggleButton.addEventListener('click', () => {
        isVisible = !isVisible;
        
        if (isVisible) {
            guidePanel.style.visibility = 'visible';
            setTimeout(() => {
                guidePanel.style.opacity = '1';
            }, 10);
            toggleButton.innerHTML = 'Controls &#x2193;'; // down arrow when open
        } else {
            guidePanel.style.opacity = '0';
            setTimeout(() => {
                guidePanel.style.visibility = 'hidden';
            }, 300);
            toggleButton.innerHTML = 'Controls &#x2191;'; // up arrow when closed
        }
    });
    
    // hover effects
    toggleButton.addEventListener('mouseenter', () => {
        toggleButton.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    });
    
    toggleButton.addEventListener('mouseleave', () => {
        toggleButton.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
    });
    
    // elements to the container
    container.appendChild(toggleButton);
    container.appendChild(guidePanel);
    
    return container;
} 