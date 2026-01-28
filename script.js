/* ==========================================================================
   🚨 LAUNCH CONFIGURATION (EDIT THIS SECTION ONLY) 🚨
   ========================================================================== */

// 1. YOUR CONTRACT ADDRESS (Paste here when you create the token)
const LAUNCH_CA = "0x00000000000000000000000000000000"; 

// 2. LAUNCH DATE (Set to Cow Milked While Flying Day - Feb 18, 2026)
// Format: YYYY-MM-DDTHH:MM:SSZ (The 'Z' means UTC time)
// Currently set to: Feb 18, 2026 at 4:20 PM UTC
const LAUNCH_DATE = new Date("2026-02-18T16:20:00Z");


/* ==========================================================================
   ⚙️ SYSTEM CODE (DO NOT TOUCH BELOW)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initLaunchSystem();
    setupMobileMenu();
});

function initLaunchSystem() {
    // Check time every second
    const timerInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = LAUNCH_DATE.getTime() - now;

        // If countdown is active (launch is in future)
        if (distance > 0) {
            // Calculate time parts
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Update timer text
            document.getElementById("timer").innerHTML = 
                `${days}d ${hours}h ${minutes}m ${seconds}s`;
            
            // Ensure controls are hidden
            document.getElementById("launch-controls").style.display = "none";
            document.getElementById("nav-buy-btn").style.display = "none";
            document.getElementById("ca-container-box").style.display = "none";
            document.getElementById("countdown-box").style.display = "flex";
        
        } else {
            // If launch time has passed: GO LIVE
            clearInterval(timerInterval);
            goLive();
        }
    }, 1000);
}

function goLive() {
    // 1. Hide Countdown, Show Buttons
    document.getElementById("countdown-box").style.display = "none";
    document.getElementById("launch-controls").style.display = "flex";
    document.getElementById("nav-buy-btn").style.display = "block"; // Show nav button
    document.getElementById("ca-container-box").style.display = "flex";

    // 2. Update all links to Pump.fun
    const pumpUrl = `https://pump.fun/${LAUNCH_CA}`;
    
    // Update CA Display Text
    const caDisplay = document.getElementById('ca-text');
    if (caDisplay) caDisplay.innerText = `CA: ${LAUNCH_CA}`;

    // Update Buttons
    const elementsToUpdate = ['nav-buy-btn', 'hero-buy-btn', 'hero-chart-btn', 'footer-chart-btn'];
    elementsToUpdate.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.href = pumpUrl;
            el.target = "_blank";
        }
    });
}

// Mobile Menu Toggle
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
}

// Copy to Clipboard
function copyToClipboard() {
    navigator.clipboard.writeText(LAUNCH_CA).then(() => {
        const toast = document.getElementById("copy-toast");
        toast.className = "show";
        setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
    });
}

// Close mobile menu on click
function setupMobileMenu() {
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', () => {
            const navLinks = document.querySelector('.nav-links');
            const hamburger = document.querySelector('.hamburger');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.innerHTML = '☰';
            }
        });
    });
}