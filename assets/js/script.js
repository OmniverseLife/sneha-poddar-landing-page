document.addEventListener('DOMContentLoaded', () => {
    // -------------------------
    // Set Current Year in Footer
    // -------------------------
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // -------------------------
    // Custom Cursor Logic
    // -------------------------
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const linksAndButtons = document.querySelectorAll('a, button, .magnetic-btn');

    // Only apply custom cursor on non-touch devices
    if (window.matchMedia('(pointer: fine)').matches) {
        
        // Track mouse movement
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Move the small dot instantly
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Animate the outline slightly slower for a trailing effect
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Add hover effects to interactable elements
        linksAndButtons.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });

        // Magnetic Effect on Contact Button
        const magneticElements = document.querySelectorAll('.magnetic-btn');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', function(e) {
                const position = element.getBoundingClientRect();
                const x = e.clientX - position.left - position.width / 2;
                const y = e.clientY - position.top - position.height / 2;
                
                // Subtle magnetic pull
                element.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
                
                // Move text a bit more than the container for parallax
                const text = element.querySelector('.btn-text');
                if(text) {
                    text.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
                }
            });

            element.addEventListener('mouseleave', function() {
                element.style.transform = 'translate(0px, 0px)';
                
                const text = element.querySelector('.btn-text');
                if(text) {
                    text.style.transform = 'translate(0px, 0px)';
                }
            });
        });
    }
});
