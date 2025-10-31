// Global variables
let currentTheme = "light";
let animationCount = 0;

// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
  console.log("🚀 Application initialized successfully");
});

/**
 * Initialize all application features and event listeners
 */
function initializeApp() {
  initializeTheme();
  initializeEventListeners();
  initializeAnimations();

  // Demonstrate global vs local scope
  demonstrateScope();
}

/**
 * THEME MANAGEMENT - Demonstrates function with parameters and local scope
 */

/**
 * Initialize theme from localStorage or system preference
 */
function initializeTheme() {
  const savedTheme = localStorage.getItem("theme") || getSystemTheme();
  setTheme(savedTheme);
}

/**
 * Get system theme preference
 * @returns {string} - 'light' or 'dark'
 */
function getSystemTheme() {
  // Local variable demonstrating function scope
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return isDark ? "dark" : "light";
}

/**
 * Set application theme
 * @param {string} theme - The theme to set ('light' or 'dark')
 */
function setTheme(theme) {
  // Local variables within function scope
  const body = document.body;
  const themeToggle = document.getElementById("theme-toggle");

  // Update global variable
  currentTheme = theme;

  // Set data attribute for CSS
  body.setAttribute("data-theme", theme);

  // Save to localStorage
  localStorage.setItem("theme", theme);

  // Update toggle button text
  themeToggle.textContent =
    theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode";

  console.log(`Theme changed to: ${theme}`);
}

/**
 * Toggle between light and dark themes
 * Demonstrates function without parameters that modifies global state
 */
function toggleTheme() {
  const newTheme = currentTheme === "light" ? "dark" : "light";
  setTheme(newTheme);

  // Add animation feedback
  const button = document.getElementById("theme-toggle");
  button.classList.add("animate-pulse");
  setTimeout(() => button.classList.remove("animate-pulse"), 1000);
}

/**
 * EVENT LISTENERS - Demonstrates event handling and callback functions
 */

/**
 * Initialize all event listeners for interactive features
 */
function initializeEventListeners() {
  // Theme toggle
  document
    .getElementById("theme-toggle")
    .addEventListener("click", toggleTheme);

  // CTA button
  document.getElementById("cta-btn").addEventListener("click", handleCtaClick);

  // Animation controls
  initializeAnimationControls();

  // Flip card
  document
    .getElementById("flip-card")
    .addEventListener("click", toggleFlipCard);

  // Modal functionality
  initializeModal();

  // Calculator functionality
  initializeCalculator();

  // Card interactions
  initializeCardInteractions();
}

/**
 * Handle CTA button click with animation
 */
function handleCtaClick() {
  const button = document.getElementById("cta-btn");

  // Add bounce animation
  button.classList.add("animate-bounce");
  setTimeout(() => {
    button.classList.remove("animate-bounce");

    // Scroll to showcase section
    document.querySelector(".showcase").scrollIntoView({
      behavior: "smooth",
    });
  }, 1000);

  console.log("CTA button clicked - scrolling to showcase");
}

/**
 * ANIMATION CONTROLS - Demonstrates reusable functions with parameters
 */

/**
 * Initialize animation control buttons
 */
function initializeAnimationControls() {
  const controls = document.querySelectorAll(".control-btn");

  controls.forEach((control) => {
    control.addEventListener("click", function () {
      const animationType = this.getAttribute("data-animation");
      triggerAnimation(animationType);
    });
  });

  // Reset button
  document
    .getElementById("reset-btn")
    .addEventListener("click", resetAnimations);
}

/**
 * Trigger specific animation on the animation box
 * @param {string} animationType - The type of animation to trigger
 */
function triggerAnimation(animationType) {
  const animationBox = document.getElementById("animation-box");

  // Remove previous animation classes
  animationBox.className = "animation-box";

  // Add new animation class
  animationBox.classList.add(`animate-${animationType}`);

  // Update global animation counter
  animationCount++;
  console.log(`Animation #${animationCount}: ${animationType}`);

  // Remove animation class after completion
  const animationDuration = getAnimationDuration(animationType);
  setTimeout(() => {
    animationBox.classList.remove(`animate-${animationType}`);
  }, animationDuration);
}

/**
 * Get duration for different animation types
 * @param {string} animationType - The animation type
 * @returns {number} - Duration in milliseconds
 */
function getAnimationDuration(animationType) {
  // Local variable with switch statement
  let duration;

  switch (animationType) {
    case "slide":
      duration = 800;
      break;
    case "rotate":
      duration = 1500;
      break;
    case "pulse":
      duration = 1000;
      break;
    case "colorChange":
      duration = 3000;
      break;
    default:
      duration = 1000;
  }

  return duration;
}

/**
 * Reset all animations
 */
function resetAnimations() {
  const animationBox = document.getElementById("animation-box");
  animationBox.className = "animation-box";
  console.log("Animations reset");
}

/**
 * FLIP CARD FUNCTIONALITY
 */

/**
 * Toggle flip card state
 */
function toggleFlipCard() {
  const flipCard = document.getElementById("flip-card");
  flipCard.classList.toggle("flipped");

  // Add click animation
  flipCard.classList.add("animate-pulse");
  setTimeout(() => flipCard.classList.remove("animate-pulse"), 600);
}

/**
 * MODAL FUNCTIONALITY - Demonstrates complex DOM manipulation
 */

/**
 * Initialize modal functionality
 */
function initializeModal() {
  const modal = document.getElementById("modal");
  const openBtn = document.getElementById("modal-open");
  const closeBtn = document.querySelector(".close-btn");
  const modalAnimateBtn = document.getElementById("modal-animate");

  // Open modal
  openBtn.addEventListener("click", () => openModal(modal));

  // Close modal
  closeBtn.addEventListener("click", () => closeModal(modal));

  // Close modal when clicking outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });

  // Modal animation button
  modalAnimateBtn.addEventListener("click", animateModalContent);
}

/**
 * Open modal with animation
 * @param {HTMLElement} modal - The modal element
 */
function openModal(modal) {
  modal.style.display = "block";

  // Trigger CSS animation
  setTimeout(() => {
    modal.classList.add("show");
  }, 10);

  console.log("Modal opened");
}

/**
 * Close modal with animation
 * @param {HTMLElement} modal - The modal element
 */
function closeModal(modal) {
  modal.classList.remove("show");

  setTimeout(() => {
    modal.style.display = "none";
  }, 400);

  console.log("Modal closed");
}

/**
 * Animate modal content
 */
function animateModalContent() {
  const modalBox = document.querySelector(".modal-animation-box");

  // Toggle multiple animations
  modalBox.classList.toggle("animate-rotate");
  modalBox.classList.toggle("animate-pulse");

  // Random color change
  const randomColor = getRandomColor();
  modalBox.style.background = randomColor;
}

/**
 * CALCULATOR FUNCTIONALITY - Demonstrates functions with return values
 */

/**
 * Initialize calculator functionality
 */
function initializeCalculator() {
  document
    .getElementById("calculate-btn")
    .addEventListener("click", calculateArea);
}

/**
 * Calculate area of rectangle
 * Demonstrates function with parameters and return value
 * @param {number} width - The width of the rectangle
 * @param {number} height - The height of the rectangle
 * @returns {number} - The calculated area
 */
function calculateArea(width, height) {
  // If no parameters provided, get from inputs
  if (width === undefined || height === undefined) {
    width = parseFloat(document.getElementById("width").value) || 0;
    height = parseFloat(document.getElementById("height").value) || 0;
  }

  // Calculate area
  const area = width * height;

  // Display result with animation
  displayResult(area, width, height);

  return area;
}

/**
 * Display calculation result with animation
 * @param {number} area - The calculated area
 * @param {number} width - The width used
 * @param {number} height - The height used
 */
function displayResult(area, width, height) {
  const resultElement = document.getElementById("result");

  if (width > 0 && height > 0) {
    resultElement.textContent = `Area: ${width} × ${height} = ${area}`;
    resultElement.classList.add("animate-pulse");

    setTimeout(() => {
      resultElement.classList.remove("animate-pulse");
    }, 1000);
  } else {
    resultElement.textContent = "Please enter valid numbers";
    resultElement.classList.add("animate-shake");

    setTimeout(() => {
      resultElement.classList.remove("animate-shake");
    }, 500);
  }
}

/**
 * CARD INTERACTIONS
 */

/**
 * Initialize card interactions and animations
 */
function initializeCardInteractions() {
  const cards = document.querySelectorAll(".card");
  const jsTriggers = document.querySelectorAll(".js-trigger");
  const animateTriggers = document.querySelectorAll(".animate-trigger");

  // Card hover effects
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // JavaScript-triggered animations
  jsTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function () {
      const action = this.getAttribute("data-action");
      const card = this.closest(".card");

      triggerCardAnimation(card, action);
    });
  });

  // CSS animation triggers
  animateTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");
      const targetCard = document.getElementById(targetId);

      targetCard.classList.add("animate-bounce");
      setTimeout(() => {
        targetCard.classList.remove("animate-bounce");
      }, 1000);
    });
  });
}

/**
 * Trigger specific animation on card
 * @param {HTMLElement} card - The card element
 * @param {string} action - The animation action
 */
function triggerCardAnimation(card, action) {
  // Remove previous animations
  card.classList.remove("animate-bounce", "animate-pulse", "animate-shake");

  // Add new animation based on action
  switch (action) {
    case "bounce":
      card.classList.add("animate-bounce");
      setTimeout(() => card.classList.remove("animate-bounce"), 1000);
      break;
    case "pulse":
      card.classList.add("animate-pulse");
      setTimeout(() => card.classList.remove("animate-pulse"), 1000);
      break;
    case "shake":
      card.classList.add("animate-shake");
      setTimeout(() => card.classList.remove("animate-shake"), 500);
      break;
  }
}

/**
 * INITIAL ANIMATIONS - Demonstrates automatic animations on load
 */

/**
 * Initialize automatic animations
 */
function initializeAnimations() {
  // Animate cards on load
  setTimeout(() => {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("fade-in");
      }, index * 200);
    });
  }, 1000);
}

/**
 * UTILITY FUNCTIONS - Demonstrates helper functions with return values
 */

/**
 * Generate random color
 * @returns {string} - Random CSS color
 */
function getRandomColor() {
  const colors = [
    "linear-gradient(135deg, #ff6b6b, #ffa726)",
    "linear-gradient(135deg, #4ecdc4, #44a08d)",
    "linear-gradient(135deg, #fd746c, #ff9068)",
    "linear-gradient(135deg, #a8ff78, #78ffd6)",
    "linear-gradient(135deg, #ff9a9e, #fad0c4)",
  ];

  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

/**
 * SCOPE DEMONSTRATION - Shows global vs local scope
 */

/**
 * Demonstrate variable scope concepts
 */
function demonstrateScope() {
  // Global variable
  console.log("Global animationCount:", animationCount);

  // Local variable with same name (shadowing)
  const animationCount = 999;
  console.log("Local animationCount:", animationCount);

  // Function demonstrating closure
  function createCounter() {
    let count = 0; // Local to createCounter

    return function () {
      count++; // Closure maintains access to count
      return count;
    };
  }

  const counter = createCounter();
  console.log("Counter (closure):", counter()); // 1
  console.log("Counter (closure):", counter()); // 2

  // Block scope with let/const
  if (true) {
    const blockScoped = "I am block scoped";
    console.log("Block scoped variable:", blockScoped);
  }

  // This would cause an error - blockScoped is not accessible here
  // console.log(blockScoped);
}

/**
 * EXPORT FUNCTIONS FOR TESTING
 */
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    calculateArea,
    setTheme,
    toggleTheme,
    triggerAnimation,
    demonstrateScope,
  };
}
