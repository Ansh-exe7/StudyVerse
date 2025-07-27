// BACKGROUND
const canvas = document.getElementById("warpCanvas");
const ctx = canvas.getContext("2d");

let stars = [];
let symbols = [];
const numStars = 800;
const numSymbols = 150;

let w, h, centerX, centerY;

const symbolList = [
  "π",
  "∞",
  "∑",
  "∫",
  "∆",
  "∇",
  "√",
  "≈",
  "≠",
  "∴",
  "⊕",
  "⊗",
  "∂",
  "lim x→0",
  "log(x)",
  "f(x)=x²",
  "E=mc²",
  "F=ma",
  "V=IR",
  "P=VI",
  "λ",
  "μ",
  "ℏ",
  "θ",
  "γ",
  "c=3×10⁸ m/s",
  "W=Fd",
  "KE=½mv²",
  "U=mgH",
  "H₂O",
  "NaCl",
  "O₂",
  "CH₄",
  "CO₂",
  "pH = -log[H⁺]",
  "ΔH",
  "K_eq",
  "mol/L",
  "Avogadro’s Number",
  "Periodic Table",
  "C₆H₁₂O₆",
  'print("Hello World!")',
  'system.out.println("Hello World!");',
  "int main()",
  "while(true)",
  "if(x > y)",
  "def function():",
  "010101",
  "I = V/R",
  "τ = r × F",
  "ω = 2πf",
  "Ohm’s Law",
  "ΔP = ρgΔh",
  "AC/DC",
  "N·m",
  "kWh",
  "RPM",
  "k = ½mv²",
  "Stress = F/A",
  "Strain = ΔL/L",
  "Young’s Modulus",
  "Load = Mass × g",
  "Area = L × B",
  "Bending Moment",
  "RLC",
  "V=IR",
  "I=Q/t",
  "Capacitance C=Q/V",
  "Z = R + jX",
  "Ohm (Ω)",
  "Farad (F)",
  "μF",
  "nF",
  "Logic Gates",
];

function init() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  centerX = w / 2;
  centerY = h / 2;

  stars = [];
  symbols = [];

  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * w - centerX,
      y: Math.random() * h - centerY,
      z: Math.random() * w,
    });
  }

  for (let i = 0; i < numSymbols; i++) {
    symbols.push({
      x: Math.random() * w - centerX,
      y: Math.random() * h - centerY,
      z: Math.random() * w,
      text: symbolList[Math.floor(Math.random() * symbolList.length)],
      size: Math.random() * 10 + 10, // smaller text size overall
    });
  }
}

function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, w, h);

  // Draw stars
  for (let i = 0; i < numStars; i++) {
    let star = stars[i];
    star.z -= 5;
    if (star.z <= 0) {
      star.z = w;
      star.x = Math.random() * w - centerX;
      star.y = Math.random() * h - centerY;
    }

    const sx = (star.x / star.z) * w + centerX;
    const sy = (star.y / star.z) * h + centerY;
    const size = (1 - star.z / w) * 1.5; // smaller stars

    ctx.beginPath();
    ctx.arc(sx, sy, size, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
  }

  // Draw symbols
  for (let i = 0; i < symbols.length; i++) {
    let s = symbols[i];
    s.z -= 3;
    if (s.z <= 0) {
      s.z = w;
      s.x = Math.random() * w - centerX;
      s.y = Math.random() * h - centerY;
    }

    const sx = (s.x / s.z) * w + centerX;
    const sy = (s.y / s.z) * h + centerY;
    const size = (1 - s.z / w) * s.size;

    ctx.font = `${size}px Arial`;
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.shadowBlur = 8;
    ctx.shadowColor = "white";
    ctx.fillText(s.text, sx, sy);
  }

  requestAnimationFrame(draw);
}

window.addEventListener("resize", init);
init();
draw();

// WORKING

function toggleMenu() {
  const navbar = document.getElementById("navbar");
  const menuButton = document.querySelector(".menu-button");
  const overlay = document.getElementById("overlay");

  navbar.classList.toggle("active");
  menuButton.classList.toggle("active");
  overlay.classList.toggle("active");

  // Prevent scrolling when menu is open
  document.body.style.overflow = navbar.classList.contains("active")
    ? "hidden"
    : "";
}

// Close menu
function closeMenu() {
  const navbar = document.getElementById("navbar");
  const menuButton = document.querySelector(".menu-button");
  const overlay = document.getElementById("overlay");

  navbar.classList.remove("active");
  menuButton.classList.remove("active");
  overlay.classList.remove("active");

  // Re-enable scrolling
  document.body.style.overflow = "";
}

// Toggle search bar on mobile
function toggleSearch() {
  const searchContainer = document.querySelector(".search-container");
  searchContainer.classList.toggle("active");

  // Focus on input when search bar appears
  if (searchContainer.classList.contains("active")) {
    document.querySelector(".search-bar").focus();
  }
}

// Toggle profile menu (placeholder function)
function toggleProfile() {
  // You can implement profile menu functionality here
  alert("Profile menu clicked");
}

// Close search bar when clicking outside
document.addEventListener("click", function (event) {
  const searchContainer = document.querySelector(".search-container");
  const searchIcon = document.querySelector(".search-icon");

  if (
    searchContainer.classList.contains("active") &&
    !searchContainer.contains(event.target) &&
    !searchIcon.contains(event.target)
  ) {
    searchContainer.classList.remove("active");
  }
});

// Optional: Close menu when window is resized to desktop size
window.addEventListener("resize", function () {
  if (window.innerWidth > 768) {
    closeMenu();
    // Also make sure search is visible in desktop mode
    document.querySelector(".search-container").classList.remove("active");
  }
});

//login

const loginBtn = document.querySelector(".login-btn");
const btnCursor = document.querySelector(".btn-cursor");

if (loginBtn && btnCursor) {
  loginBtn.addEventListener("mousemove", function (e) {
    const rect = loginBtn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    btnCursor.style.left = x + "px";
    btnCursor.style.top = y + "px";
  });

  // Add focus animation to input fields
  const inputs = document.querySelectorAll(
    'input[type="text"], input[type="password"]'
  );
  inputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.classList.add("active");
    });

    input.addEventListener("blur", function () {
      this.parentElement.classList.remove("active");
    });
  });
}

// Handle form submission (placeholder)
// const form = document.querySelector('.login-form');
// if (form) {
//     form.addEventListener('submit', function(e) {
//         e.preventDefault();
//         // Add your login logic here
//         console.log('Login submitted');
//     });
// }


const form = document.querySelector(".register-form");
if (form) {
  // Add error message elements to all form groups
  const formGroups = document.querySelectorAll(".form-group");
  formGroups.forEach((group) => {
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    group.appendChild(errorDiv);
  });

  // Add focus animation to input fields
  const inputs = document.querySelectorAll(
    'input[type="text"], input[type="password"], input[type="email"]'
  );
  inputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.classList.add("active");
    });

    input.addEventListener("blur", function () {
      this.parentElement.classList.remove("active");
      // Validate on blur
      validateField(this);
    });
  });

  // Validation function for individual fields
  function validateField(field) {
    const fieldId = field.id;
    const value = field.value.trim();
    const formGroup = field.parentElement;
    const errorMessage = formGroup.querySelector(".error-message");

    // Reset classes
    formGroup.classList.remove("error", "success");

    // Validate based on field type
    switch (fieldId) {
      case "fullname":
        if (value === "") {
          showError(formGroup, errorMessage, "Name cannot be empty");
        } else if (value.length < 3) {
          showError(
            formGroup,
            errorMessage,
            "Name must be at least 3 characters"
          );
        } else {
          showSuccess(formGroup);
        }
        break;

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value === "") {
          showError(formGroup, errorMessage, "Email cannot be empty");
        } else if (!emailRegex.test(value)) {
          showError(formGroup, errorMessage, "Please enter a valid email");
        } else {
          showSuccess(formGroup);
        }
        break;

      case "username":
        const usernameRegex = /^[a-zA-Z0-9_]{4,20}$/;
        if (value === "") {
          showError(formGroup, errorMessage, "Username cannot be empty");
        } else if (!usernameRegex.test(value)) {
          showError(
            formGroup,
            errorMessage,
            "Username must be 4-20 characters (letters, numbers, underscores)"
          );
        } else {
          showSuccess(formGroup);
        }
        break;

      case "password":
        if (value === "") {
          showError(formGroup, errorMessage, "Password cannot be empty");
        } else if (value.length < 8) {
          showError(
            formGroup,
            errorMessage,
            "Password must be at least 8 characters"
          );
        } else {
          showSuccess(formGroup);
        }
        break;

      case "confirm-password":
        const password = document.getElementById("password").value;
        if (value === "") {
          showError(formGroup, errorMessage, "Please confirm your password");
        } else if (value !== password) {
          showError(formGroup, errorMessage, "Passwords do not match");
        } else {
          showSuccess(formGroup);
        }
        break;
    }
  }

  // Helper functions for validation visual feedback
  function showError(formGroup, errorElement, message) {
    formGroup.classList.add("error");
    formGroup.classList.remove("success");
    errorElement.textContent = message;
  }

  function showSuccess(formGroup) {
    formGroup.classList.remove("error");
    formGroup.classList.add("success");
  }

  // Handle form submission
  form.addEventListener("submit", function (e) {
   

    // Validate all fields
    const inputs = form.querySelectorAll('input:not([type="checkbox"])');
    let isValid = true;

    inputs.forEach((input) => {
      validateField(input);
      if (input.parentElement.classList.contains("error")) {
        isValid = false;
      }
    });

    // Check terms checkbox
    const termsCheckbox = document.getElementById("terms");
    const termsContainer = termsCheckbox.parentElement;

    if (!termsCheckbox.checked) {
      termsContainer.classList.add("shake");
      setTimeout(() => {
        termsContainer.classList.remove("shake");
      }, 600);
      isValid = false;
    }

    // If all valid, submit form
    if (!isValid) {
      form.classList.add("shake");
      setTimeout(() => {
        form.classList.remove("shake");
      }, 600);
      e.preventDefault(); 
    }
  });
}
