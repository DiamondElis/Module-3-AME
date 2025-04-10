// Animation Effects
document.addEventListener('DOMContentLoaded', function() {
    // Hero section parallax effect
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        if (hero) {
            const scrollPosition = window.scrollY;
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
    });
    
    // Glitch effect on hover for headings
    const glitchElements = document.querySelectorAll('.glitch-text');
    
    glitchElements.forEach(element => {
        element.addEventListener('mouseover', function() {
            this.classList.add('glitching');
        });
        
        element.addEventListener('mouseout', function() {
            this.classList.remove('glitching');
        });
    });
    
    // Random glitch animation for UI elements
    function randomGlitch() {
        const elements = document.querySelectorAll('h3, .tip-number, .cta-button');
        const randomElement = elements[Math.floor(Math.random() * elements.length)];
        
        randomElement.classList.add('glitch-effect');
        
        setTimeout(() => {
            randomElement.classList.remove('glitch-effect');
        }, 500);
        
        // Set next random glitch
        setTimeout(randomGlitch, Math.random() * 10000 + 5000);
    }
    
    // Start random glitches after 3 seconds
    setTimeout(randomGlitch, 3000);
    
    // Add scan line effect to interactive elements
    const interactiveElements = document.querySelectorAll('.tip-card, .cta-button, .terminal-window');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const scanline = document.createElement('div');
            scanline.classList.add('element-scanline');
            this.appendChild(scanline);
            
            setTimeout(() => {
                scanline.remove();
            }, 1000);
        });
    });
    
    // Add hover glow effect to icons
    const icons = document.querySelectorAll('.tip-icon');
    
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.classList.add('icon-glow');
        });
        
        icon.addEventListener('mouseleave', function() {
            this.classList.remove('icon-glow');
        });
    });
    
    // Add matrix rain effect to background on scroll
    let matrixRainActive = false;
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.body.scrollHeight;
        const scrollPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100;
        
        // Activate matrix rain when scrolled past 75% of the page
        if (scrollPercentage > 75 && !matrixRainActive) {
            createMatrixRain();
            matrixRainActive = true;
            
            // Remove matrix rain after 5 seconds
            setTimeout(() => {
                removeMatrixRain();
                matrixRainActive = false;
            }, 5000);
        }
    });
    
    function createMatrixRain() {
        const matrixContainer = document.createElement('div');
        matrixContainer.classList.add('matrix-rain-container');
        document.body.appendChild(matrixContainer);
        
        // Create matrix rain animation
        const canvas = document.createElement('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        matrixContainer.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = [];
        
        // Initialize drops
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
        
        // Matrix rain characters
        const chars = '01';
        
        function draw() {
            // Semi-transparent black background
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Set text color and font
            ctx.fillStyle = '#5AFF5A';
            ctx.font = fontSize + 'px monospace';
            
            // Draw characters
            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                // Reset drop to top when it reaches bottom
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                
                drops[i]++;
            }
        }
        
        // Start animation
        const interval = setInterval(draw, 33);
        
        // Store interval ID for cleanup
        matrixContainer.dataset.interval = interval;
    }
    
    function removeMatrixRain() {
        const matrixContainer = document.querySelector('.matrix-rain-container');
        if (matrixContainer) {
            // Clear the animation interval
            clearInterval(parseInt(matrixContainer.dataset.interval));
            
            matrixContainer.classList.add('fade-out');
            setTimeout(() => {
                matrixContainer.remove();
            }, 1000);
        }
    }
    
    // Add CSS for new animation classes
    const style = document.createElement('style');
    style.textContent = `
        .glitching {
            animation: glitch 0.3s infinite;
        }
        
        .glitch-effect {
            position: relative;
            animation: glitch 0.5s infinite;
        }
        
        .element-scanline {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(to right, transparent, #5AFF5A, transparent);
            animation: scanline 1s linear;
        }
        
        .icon-glow {
            filter: drop-shadow(0 0 10px #5AFF5A);
        }
        
        .matrix-rain-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.3;
        }
        
        .matrix-rain-container.fade-out {
            animation: fadeOut 1s forwards;
        }
        
        @keyframes scanline {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
        }
        
        @keyframes fadeOut {
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}); 