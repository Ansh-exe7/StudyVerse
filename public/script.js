  // anim bg
  const canvas = document.getElementById("warpCanvas");
  const ctx = canvas.getContext("2d");

  let stars = [],
    symbols = [];
  const numStars = 800,
    numSymbols = 150;
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
        size: Math.random() * 10 + 10,
      });
    }
  }

  function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, w, h);

    stars.forEach((star) => {
      star.z -= 5;
      if (star.z <= 0) {
        star.z = w;
        star.x = Math.random() * w - centerX;
        star.y = Math.random() * h - centerY;
      }
      const sx = (star.x / star.z) * w + centerX;
      const sy = (star.y / star.z) * h + centerY;
      const size = (1 - star.z / w) * 1.5;

      ctx.beginPath();
      ctx.arc(sx, sy, size, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
    });

    symbols.forEach((s) => {
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
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", init);
  init();
  draw();

  //ui anim

  function toggleMenu() {
    const navbar = document.getElementById("navbar");
    const menuButton = document.querySelector(".menu-button");
    const overlay = document.getElementById("overlay");

    navbar.classList.toggle("active");
    menuButton.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.style.overflow = navbar.classList.contains("active")
      ? "hidden"
      : "";
  }

  function closeMenu() {
    const navbar = document.getElementById("navbar");
    const menuButton = document.querySelector(".menu-button");
    const overlay = document.getElementById("overlay");

    navbar.classList.remove("active");
    menuButton.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  function toggleSearch() {
    const searchContainer = document.querySelector(".search-container");
    searchContainer.classList.toggle("active");
    if (searchContainer.classList.contains("active")) {
      document.querySelector(".search-bar").focus();
    }
  }

  function toggleProfile() {
    window.location.replace("Login.html")
  }

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

  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      closeMenu();
      document.querySelector(".search-container").classList.remove("active");
    }
  });

  //valid
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

  //register valid

  const form = document.querySelector(".register-form");

  if (form) {
    const formGroups = document.querySelectorAll(".form-group");
    formGroups.forEach((group) => {
      let existingError = group.querySelector(".error-message");
      if (!existingError) {
        const errorDiv = document.createElement("div");
        errorDiv.className = "error-message";
        group.appendChild(errorDiv);
      }
    });

    const inputs = document.querySelectorAll(
      'input[type="text"], input[type="password"], input[type="email"]'
    );

    inputs.forEach((input) => {
      input.addEventListener("focus", function () {
        this.parentElement.classList.add("active");
      });

      input.addEventListener("blur", function () {
        this.parentElement.classList.remove("active");
        validateField(this);
      });
    });
    function showError(formGroup, errorElement, message) {
      formGroup.classList.add("error");
      formGroup.classList.remove("success");
      errorElement.textContent = message;
    }

    function showSuccess(formGroup) {
      formGroup.classList.remove("error");
      formGroup.classList.add("success");
    }


    form.addEventListener("submit", function (e) {
      

      const inputs = form.querySelectorAll('input:not([type="checkbox"])');
      let isValid = true;

      inputs.forEach((input) => {
        validateField(input);
        if (input.parentElement.classList.contains("error")) {
          isValid = false;
        }
      });

      
      const termsCheckbox = document.getElementById("terms");
      const termsContainer = termsCheckbox.parentElement;

      if (!termsCheckbox.checked) {
        termsContainer.classList.add("shake");
        setTimeout(() => {
          termsContainer.classList.remove("shake");
        }, 600);
        isValid = false;
      }

      
      if (!isValid) {
        form.classList.add("shake");
        setTimeout(() => {
          form.classList.remove("shake");
        }, 600);
        e.preventDefault();
      }
    });

    function validateField(field) {
      const fieldId = field.id;
      const value = field.value.trim();
      const formGroup = field.parentElement;
      const errorMessage = formGroup.querySelector(".error-message");

      formGroup.classList.remove("error", "success");

      switch (fieldId) {
        case "fullname":
          if (value === "") showError("Name cannot be empty");
          else if (value.length < 3)
            showError("Name must be at least 3 characters");
          else showSuccess();
          break;

        case "email":
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (value === "") showError("Email cannot be empty");
          else if (!emailRegex.test(value))
            showError("Please enter a valid email");
          else showSuccess();
          break;

        case "username":
          const usernameRegex = /^[a-zA-Z0-9_]{4,20}$/;
          if (value === "") showError("Username cannot be empty");
          else if (!usernameRegex.test(value))
            showError(
              "Username must be 4-20 characters (letters, numbers, underscores)"
            );
          else showSuccess();
          break;

        case "password":
          if (value === "") showError("Password cannot be empty");
          else if (value.length < 8)
            showError("Password must be at least 8 characters");
          else showSuccess();
          break;

        case "confirm-password":
          const password = document.getElementById("password").value;
          if (value === "") showError("Please confirm your password");
          else if (value !== password) showError("Passwords do not match");
          else showSuccess();
          break;
      }

      function showError(msg) {
        formGroup.classList.add("error");
        formGroup.classList.remove("success");
        errorMessage.textContent = msg;
      }

      function showSuccess() {
        formGroup.classList.remove("error");
        formGroup.classList.add("success");
        errorMessage.textContent = "";
      }
    }
  }


  //dash

  fetch('/api/user')
      .then((res) => res.json())
      .then((data) => {
        if (data.username) {
          document.getElementById("username-display").textContent = data.username;
        } else {
          document.getElementById("username-display").textContent = "Guest";
        }
      })
      .catch(() => {
        document.getElementById("username-display").textContent = "Guest";
      });


      