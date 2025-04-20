export function createHamburgerMenu(backgroundToggleCallback, hdrSelectorCallback) {
    // hamburger menu container
    const menuContainer = document.createElement('div');
    menuContainer.style.position = 'absolute';
    menuContainer.style.top = '30px';
    menuContainer.style.right = '30px';
    menuContainer.style.zIndex = '1000';
    menuContainer.style.fontFamily = "'Albert Sans', sans-serif";
    
    // hamburger button
    const hamburgerButton = document.createElement('div');
    hamburgerButton.style.width = '30px';
    hamburgerButton.style.height = '30px';
    hamburgerButton.style.display = 'flex';
    hamburgerButton.style.flexDirection = 'column';
    hamburgerButton.style.justifyContent = 'space-between';
    hamburgerButton.style.cursor = 'pointer';
    hamburgerButton.style.padding = '5px';
    hamburgerButton.style.borderRadius = '5px';
    hamburgerButton.style.transition = 'background-color 0.3s ease';
    
    // Create the hamburger lines
    for (let i = 0; i < 3; i++) {
        const line = document.createElement('div');
        line.style.width = '100%';
        line.style.height = '3px';
        line.style.backgroundColor = '#000000';
        line.style.borderRadius = '3px';
        hamburgerButton.appendChild(line);
    }
    
    // Create the menu panel
    const menuPanel = document.createElement('div');
    menuPanel.style.position = 'absolute';
    menuPanel.style.top = '40px';
    menuPanel.style.right = '0';
    menuPanel.style.width = '250px';
    menuPanel.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    menuPanel.style.borderRadius = '8px';
    menuPanel.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    menuPanel.style.padding = '20px';
    menuPanel.style.display = 'none'; // Hidden by default
    menuPanel.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    menuPanel.style.opacity = '0';
    menuPanel.style.transform = 'translateY(-20px)';
    
    // Create the background toggle section
    const backgroundSection = document.createElement('div');
    backgroundSection.style.marginBottom = '20px';
    
    const backgroundLabel = document.createElement('div');
    backgroundLabel.textContent = 'Background';
    backgroundLabel.style.fontSize = '16px';
    backgroundLabel.style.fontWeight = '600';
    backgroundLabel.style.marginBottom = '10px';
    backgroundLabel.style.color = '#000000';
    backgroundSection.appendChild(backgroundLabel);
    
    const backgroundToggle = document.createElement('div');
    backgroundToggle.style.display = 'flex';
    backgroundToggle.style.alignItems = 'center';
    backgroundToggle.style.justifyContent = 'space-between';
    
    const backgroundText = document.createElement('span');
    backgroundText.textContent = 'Show Background';
    backgroundText.style.color = '#000000';
    backgroundText.style.fontSize = '14px';
    backgroundToggle.appendChild(backgroundText);
    
    const toggle = document.createElement('div');
    toggle.style.width = '40px';
    toggle.style.height = '20px';
    toggle.style.backgroundColor = '#cccccc';
    toggle.style.borderRadius = '10px';
    toggle.style.position = 'relative';
    toggle.style.cursor = 'pointer';
    toggle.style.transition = 'background-color 0.3s ease';
    
    const slider = document.createElement('div');
    slider.style.position = 'absolute';
    slider.style.width = '16px';
    slider.style.height = '16px';
    slider.style.backgroundColor = '#ffffff';
    slider.style.borderRadius = '50%';
    slider.style.top = '2px';
    slider.style.left = '2px';
    slider.style.transition = 'transform 0.3s ease';
    toggle.appendChild(slider);
    
    backgroundToggle.appendChild(toggle);
    backgroundSection.appendChild(backgroundToggle);
    menuPanel.appendChild(backgroundSection);
    
    // Create the HDR selector section
    const hdrSection = document.createElement('div');
    hdrSection.style.marginBottom = '20px';
    
    const hdrLabel = document.createElement('div');
    hdrLabel.textContent = 'Environment';
    hdrLabel.style.fontSize = '16px';
    hdrLabel.style.fontWeight = '600';
    hdrLabel.style.marginBottom = '10px';
    hdrLabel.style.color = '#000000';
    hdrSection.appendChild(hdrLabel);
    
    const hdrSelect = document.createElement('select');
    hdrSelect.style.width = '100%';
    hdrSelect.style.padding = '8px 12px';
    hdrSelect.style.backgroundColor = '#ffffff';
    hdrSelect.style.color = '#000000';
    hdrSelect.style.border = '1px solid #cccccc';
    hdrSelect.style.borderRadius = '4px';
    hdrSelect.style.fontFamily = "'Albert Sans', sans-serif";
    hdrSelect.style.fontSize = '14px';
    hdrSelect.style.cursor = 'pointer';
    hdrSection.appendChild(hdrSelect);
    
    menuPanel.appendChild(hdrSection);
    
    // Create the Resources section
    const resourcesSection = document.createElement('div');
    
    const resourcesLabel = document.createElement('div');
    resourcesLabel.textContent = 'Resources';
    resourcesLabel.style.fontSize = '16px';
    resourcesLabel.style.fontWeight = '600';
    resourcesLabel.style.marginBottom = '10px';
    resourcesLabel.style.marginTop = '10px';
    resourcesLabel.style.color = '#000000';
    resourcesSection.appendChild(resourcesLabel);
    
    const createStyledLink = (text, url) => {
        const link = document.createElement('a');
        link.textContent = text;
        link.href = url;
        link.target = '_blank'; // Open in a new tab
        link.style.display = 'block';
        link.style.padding = '8px 12px';
        link.style.backgroundColor = '#ffffff';
        link.style.color = '#000000';
        link.style.fontFamily = "'Albert Sans', sans-serif";
        link.style.fontSize = '14px';
        link.style.cursor = 'pointer';
        link.style.fontWeight = '500';
        link.style.textDecoration = 'underline';
        link.style.transition = 'background-color 0.2s ease';
        link.style.marginBottom = '8px';
        
        link.addEventListener('mouseover', () => {
            link.style.backgroundColor = '#f5f5f5';
        });
        
        link.addEventListener('mouseout', () => {
            link.style.backgroundColor = '#ffffff';
        });
        
        return link;
    };
    
    const figmaLink = createStyledLink('Figma Design', 'https://www.figma.com/file/example');
    resourcesSection.appendChild(figmaLink);
    
    const sunglassModel = createStyledLink('Sunglass 3D Model Process', 'https://youtu.be/-NCdYy38jkY');
    resourcesSection.appendChild(sunglassModel);

            
    const githubLink = createStyledLink('GitHub Repository', 'https://github.com/riachx/spectar-glasses');
    resourcesSection.appendChild(githubLink);    
    
    menuPanel.appendChild(resourcesSection);
    
    menuContainer.appendChild(hamburgerButton);
    menuContainer.appendChild(menuPanel);
    
   
    let isMenuOpen = false;
    
    hamburgerButton.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            menuPanel.style.display = 'block';

            setTimeout(() => {
                menuPanel.style.opacity = '1';
                menuPanel.style.transform = 'translateY(0)';
            }, 10);
        } else {
            menuPanel.style.opacity = '0';
            menuPanel.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                menuPanel.style.display = 'none';
            }, 300);
        }
    });
    
    // background toggle functionality
    let isBackgroundOn = true;
    
    toggle.addEventListener('click', () => {
        isBackgroundOn = !isBackgroundOn;
        toggle.style.backgroundColor = isBackgroundOn ? '#4CAF50' : '#cccccc';
        slider.style.transform = isBackgroundOn ? 'translateX(20px)' : 'translateX(0)';
        backgroundText.textContent = isBackgroundOn ? 'Show Background' : 'Hide Background';
        
        if (backgroundToggleCallback) {
            backgroundToggleCallback(isBackgroundOn);
        }
    });
    
   
    toggle.style.backgroundColor = isBackgroundOn ? '#4CAF50' : '#cccccc';
    slider.style.transform = isBackgroundOn ? 'translateX(20px)' : 'translateX(0)';
    
    // HDR selector functionality
    hdrSelect.addEventListener('change', function() {
        const selectedIndex = parseInt(this.value);
        if (hdrSelectorCallback) {
            hdrSelectorCallback(selectedIndex);
        }
    });
    
    // return an object with the container and methods to update the HDR options and add new links
    return {
        element: menuContainer,
        setHdrOptions: (options) => {

            hdrSelect.innerHTML = '';
            
            options.forEach((option, index) => {
                const optionElement = document.createElement('option');
                optionElement.value = index;
                optionElement.textContent = option.name;
                hdrSelect.appendChild(optionElement);
            });
        },
        setFigmaLink: (url) => {

            figmaLink.href = url;
        },
        addResourceLink: (text, url) => {
            const newLink = createStyledLink(text, url);
            resourcesSection.appendChild(newLink);
            return newLink; 
        }
    };
} 