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
    
    // Create a span for each letter to animate individually
    const text = 'SpectAR';
    const letters = text.split('');
    
    // Use requestAnimationFrame for smoother animations
    requestAnimationFrame(() => {
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
            }, 300 + (index * 100)); // Stagger the animation for each letter
        });
    });
    
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