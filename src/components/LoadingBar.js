export function createLoadingBar() {
    // Create container
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.backgroundColor = '#f5f5f5';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';
    container.style.zIndex = '9999';
    container.style.transition = 'opacity 0.5s ease-out';
    
    // Create loading text
    const loadingText = document.createElement('div');
    loadingText.textContent = 'Loading SpectAR...';
    loadingText.style.fontFamily = "'Albert Sans', sans-serif";
    loadingText.style.fontSize = '24px';
    loadingText.style.fontWeight = '600';
    loadingText.style.color = '#000000';
    loadingText.style.marginBottom = '20px';
    container.appendChild(loadingText);
    
    // Create progress bar container
    const progressContainer = document.createElement('div');
    progressContainer.style.width = '300px';
    progressContainer.style.height = '4px';
    progressContainer.style.backgroundColor = '#e0e0e0';
    progressContainer.style.borderRadius = '2px';
    progressContainer.style.overflow = 'hidden';
    container.appendChild(progressContainer);
    
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.style.width = '0%';
    progressBar.style.height = '100%';
    progressBar.style.backgroundColor = '#000000';
    progressBar.style.transition = 'width 0.3s ease-out';
    progressContainer.appendChild(progressBar);
    
    // Create progress percentage
    const progressText = document.createElement('div');
    progressText.textContent = '0%';
    progressText.style.fontFamily = "'Albert Sans', sans-serif";
    progressText.style.fontSize = '14px';
    progressText.style.fontWeight = '400';
    progressText.style.color = '#000000';
    progressText.style.marginTop = '10px';
    container.appendChild(progressText);
    
    // Function to update progress
    function updateProgress(percent) {
        progressBar.style.width = `${percent}%`;
        progressText.textContent = `${Math.round(percent)}%`;
    }
    
    // Function to hide loading screen
    function hide() {
        container.style.opacity = '0';
        setTimeout(() => {
            container.remove();
        }, 500);
    }
    
    return {
        element: container,
        updateProgress,
        hide
    };
} 