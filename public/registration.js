// This script handles both the warp canvas animation and registration form interactions
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('warpCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas to full window size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Initialize stars array
    let stars = [];
    const numStars = 800;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    let speed = 3;
    
    // Create stars
    function createStars() {
        stars = [];
        for (let i = 0; i < numStars; i++) {
            // Random position, but ensure some stars start near center
            let x, y, z;
            
            if (Math.random() < 0.2) {
                // 20% of stars start closer to center for immediate effect
                x = (Math.random() - 0.5) * canvas.width * 0.5;
                y = (Math.random() - 0.5) * canvas.height * 0.5;
                z = Math.random() * 1000;
            } else {
                // Rest are more spread out
                x = (Math.random() - 0.5) * canvas.width * 2;
                y = (Math.random() - 0.5) * canvas.height * 2;
                z = Math.random() * 2000;
            }
            
            // Random color (purples, blues, and occasional white)
            let hue;
            const colorRand = Math.random();
            if (colorRand < 0.6) {
                // 60% purples
                hue = 260 + Math.random() * 30;
            } else if (colorRand < 0.9) {
                // 30% blues
                hue = 200 + Math.random() * 40;
            } else {
                // 10% whites (high lightness)
                hue = Math.random() * 360;
            }
            
            const sat = colorRand > 0.9 ? 0 : 70 + Math.random() * 30;
            const light = colorRand > 0.9 ? 90 : 70 + Math.random() * 20;
            
            stars.push({
                x: x,
                y: y,
                z: z,
                color: `hsla(${hue}, ${sat}%, ${light}%, 1)`
            });
        }
    }
    
    // Move and draw stars
    function drawStars() {
        // Clear canvas with semi-transparent background for trail effect
        ctx.fillStyle = 'rgba(30, 0, 60, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw each star
        stars.forEach(star => {
            // Move star closer (decrease z)
            star.z -= speed;
            
            // Reset star if it goes past screen
            if (star.z <= 0) {
                star.x = (Math.random() - 0.5) * canvas.width * 2;
                star.y = (Math.random() - 0.5) * canvas.height * 2;
                star.z = 2000;
            }
            
            // Calculate screen position
            const screenX = centerX + star.x / (star.z * 0.001);
            const screenY = centerY + star.y / (star.z * 0.001);
            
            // Calculate size based on z position
            const size = Math.max(0.5, (1000 - star.z) / 1000 * 5);
            
            // Draw star
            ctx.beginPath();
            ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
            ctx.fillStyle = star.color;
            ctx.fill();
            
            // Optional: add glow effect to brighter stars
            if (size > 2) {
                ctx.beginPath();
                ctx.arc(screenX, screenY, size * 2, 0, Math.PI * 2);
                ctx.fillStyle = star.color.replace('1)', '0.3)');
                ctx.fill();
            }
        });
        
        // Request next frame
        requestAnimationFrame(drawStars);
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        resizeCanvas();
        createStars();
    });
    
    // Initialize canvas and stars
    resizeCanvas();
    createStars();
    drawStars();
    
    // Button hover effect
    const registerBtn = document.querySelector('.register-btn');
    const btnCursor = document.querySelector('.btn-cursor');
    
    if (registerBtn && btnCursor) {
        registerBtn.addEventListener('mousemove', function(e) {
            const rect = registerBtn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            btnCursor.style.left = x + 'px';
            btnCursor.style.top = y + 'px';
        });
    }
    
    // Form validation functions
    const form = document.querySelector('.register-form');
    if (form) {
        // Add error message elements to all form groups
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            group.appendChild(errorDiv);
        });
        
        // Add focus animation to input fields
        const inputs = document.querySelectorAll('input[type="text"], input[type="password"], input[type="email"]');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('active');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('active');
                // Validate on blur
                validateField(this);
            });
        });
        
        // Validation function for individual fields
        function validateField(field) {
            const fieldId = field.id;
            const value = field.value.trim();
            const formGroup = field.parentElement;
            const errorMessage = formGroup.querySelector('.error-message');
            
            // Reset classes
            formGroup.classList.remove('error', 'success');
            
            // Validate based on field type
            switch(fieldId) {
                case 'fullname':
                    if (value === '') {
                        showError(formGroup, errorMessage, 'Name cannot be empty');
                    } else if (value.length < 3) {
                        showError(formGroup, errorMessage, 'Name must be at least 3 characters');
                    } else {
                        showSuccess(formGroup);
                    }
                    break;
                    
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (value === '') {
                        showError(formGroup, errorMessage, 'Email cannot be empty');
                    } else if (!emailRegex.test(value)) {
                        showError(formGroup, errorMessage, 'Please enter a valid email');
                    } else {
                        showSuccess(formGroup);
                    }
                    break;
                    
                case 'username':
                    const usernameRegex = /^[a-zA-Z0-9_]{4,20}$/;
                    if (value === '') {
                        showError(formGroup, errorMessage, 'Username cannot be empty');
                    } else if (!usernameRegex.test(value)) {
                        showError(formGroup, errorMessage, 'Username must be 4-20 characters (letters, numbers, underscores)');
                    } else {
                        showSuccess(formGroup);
                    }
                    break;
                    
                case 'password':
                    if (value === '') {
                        showError(formGroup, errorMessage, 'Password cannot be empty');
                    } else if (value.length < 8) {
                        showError(formGroup, errorMessage, 'Password must be at least 8 characters');
                    } else {
                        showSuccess(formGroup);
                    }
                    break;
                    
                case 'confirm-password':
                    const password = document.getElementById('password').value;
                    if (value === '') {
                        showError(formGroup, errorMessage, 'Please confirm your password');
                    } else if (value !== password) {
                        showError(formGroup, errorMessage, 'Passwords do not match');
                    } else {
                        showSuccess(formGroup);
                    }
                    break;
            }
        }
        
        // Helper functions for validation visual feedback
        function showError(formGroup, errorElement, message) {
            formGroup.classList.add('error');
            formGroup.classList.remove('success');
            errorElement.textContent = message;
        }
        
        function showSuccess(formGroup) {
            formGroup.classList.remove('error');
            formGroup.classList.add('success');
        }
        
        // Handle form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all fields
            const inputs = form.querySelectorAll('input:not([type="checkbox"])');
            let isValid = true;
            
            inputs.forEach(input => {
                validateField(input);
                if (input.parentElement.classList.contains('error')) {
                    isValid = false;
                }
            });
            
            // Check terms checkbox
            const termsCheckbox = document.getElementById('terms');
            const termsContainer = termsCheckbox.parentElement;
            
            if (!termsCheckbox.checked) {
                termsContainer.classList.add('shake');
                setTimeout(() => {
                    termsContainer.classList.remove('shake');
                }, 600);
                isValid = false;
            }
            
            // If all valid, submit form
            if (isValid) {
                // Add your registration logic here
                console.log('Registration submitted successfully');
                // For demo purposes, redirect to login page after 1 second
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1000);
            } else {
                // Shake the form for visual feedback
                form.classList.add('shake');
                setTimeout(() => {
                    form.classList.remove('shake');
                }, 600);
            }
        });
    }
});