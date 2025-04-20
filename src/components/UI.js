export function createHeader() {
    const header = document.createElement('div');
    header.style.position = 'absolute';
    header.style.top = '30px';
    header.style.left = '30px';
    header.style.fontFamily = "'Albert Sans', sans-serif";
    header.style.fontSize = '52px';
    header.style.fontWeight = '600';
    header.style.color = '#000000';
    header.style.zIndex = '1000';
    
    // Create logo image
    const logo = document.createElement('img');
    logo.src = '/logo.png';
    logo.style.height = '50px';
    logo.style.width = 'auto';
    logo.style.marginRight = '10px';
    logo.style.opacity = '0';
    logo.style.transform = 'translate(-50px, -20px)';
    logo.style.transition = 'opacity 0.5s ease-out, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    logo.style.willChange = 'transform, opacity';
    header.appendChild(logo);
    
    // Create a span for each letter to animate individually
    const text = 'SpectAR';
    const letters = text.split('');
    
    // Use requestAnimationFrame for smoother animations
    requestAnimationFrame(() => {
        // Animate logo first
        setTimeout(() => {
            logo.style.opacity = '1';
            logo.style.transform = 'translate(0, 0)';
        }, 300);
        
        // Then animate letters
        letters.forEach((letter, index) => {
            const span = document.createElement('span');
            span.textContent = letter;
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translate(-100px, -20px)'; // Start from left and above
            span.style.transition = 'opacity 0.5s ease-out, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), letter-spacing 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
            span.style.letterSpacing = '100px'; // Start with huge letter spacing
            span.style.willChange = 'transform, opacity, letter-spacing'; // Optimize for animations
            
            header.appendChild(span);
            
            // Trigger animation after a small delay, staggered for each letter
            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'translate(0, 0)'; // Move to final position
                span.style.letterSpacing = '-2px'; // End with the desired letter spacing
            }, 300 + (index * 100)); // Stagger the animation for each letter, starting after logo animation
        });
    });
    
    return header;
}

export function createDescription() {
    const description = document.createElement('div');
    description.textContent = 'Empowering seniors with Augmented Reality Glasses to detect scams and stay safe online.';
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
    
    // Add initial state for animation
    description.style.opacity = '0';
    description.style.transform = 'translate(50px, 20px)'; // Start from right and below
    description.style.transition = 'opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    description.style.willChange = 'transform, opacity'; // Optimize for animations
    
    // Trigger animation after a small delay
    setTimeout(() => {
        description.style.opacity = '1';
        description.style.transform = 'translate(0, 0)'; // Move to final position
    }, 1200); // Delay until after the header animation completes
    
    return description;
}

export function createBackgroundToggle(onToggle) {
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.bottom = '80px';
    container.style.left = '20px';
    container.style.zIndex = '1000';
    container.style.fontFamily = "'Albert Sans', sans-serif";
    
    const label = document.createElement('label');
    label.textContent = 'Background: ';
    label.style.color = '#000000';
    label.style.fontSize = '14px';
    label.style.marginRight = '10px';
    container.appendChild(label);
    
    const toggle = document.createElement('div');
    toggle.style.display = 'inline-block';
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
    
    container.appendChild(toggle);
    
    let isOn = true;
    
    toggle.addEventListener('click', () => {
        isOn = !isOn;
        toggle.style.backgroundColor = isOn ? '#4CAF50' : '#cccccc';
        slider.style.transform = isOn ? 'translateX(20px)' : 'translateX(0)';
        
        if (onToggle) {
            onToggle(isOn);
        }
    });
    
    // Initialize toggle state
    toggle.style.backgroundColor = isOn ? '#4CAF50' : '#cccccc';
    slider.style.transform = isOn ? 'translateX(20px)' : 'translateX(0)';
    
    return container;
} 