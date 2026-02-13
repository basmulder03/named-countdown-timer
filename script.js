// Timer state
let timerInterval = null;
let targetDate = null;
let isViewOnlyMode = false;

// DOM Elements
const elements = {
    timerName: document.getElementById('timerName'),
    timerNameInput: document.getElementById('timerNameInput'),
    targetDateTime: document.getElementById('targetDateTime'),
    startButton: document.getElementById('startButton'),
    resetButton: document.getElementById('resetButton'),
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
    milliseconds: document.getElementById('milliseconds'),
    timerStatus: document.getElementById('timerStatus'),
    shareSection: document.getElementById('shareSection'),
    shareUrl: document.getElementById('shareUrl'),
    viewOnlyUrl: document.getElementById('viewOnlyUrl'),
    copyUrlButton: document.getElementById('copyUrlButton'),
    copyViewOnlyUrlButton: document.getElementById('copyViewOnlyUrlButton'),
    generateTinyUrlButton: document.getElementById('generateTinyUrlButton'),
    generateQrCodeButton: document.getElementById('generateQrCodeButton'),
    tinyUrlSection: document.getElementById('tinyUrlSection'),
    tinyUrl: document.getElementById('tinyUrl'),
    copyTinyUrlButton: document.getElementById('copyTinyUrlButton'),
    qrCodeSection: document.getElementById('qrCodeSection'),
    qrCodeImage: document.getElementById('qrCodeImage'),
    downloadQrButton: document.getElementById('downloadQrButton'),
    controls: document.querySelector('.controls'),
    toggleViewModeButton: document.getElementById('toggleViewModeButton'),
    toggleViewModeIcon: document.getElementById('toggleViewModeIcon'),
    toggleViewModeText: document.getElementById('toggleViewModeText')
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeFromUrl();
    setupEventListeners();
    setMinDateTime();
});

// Set minimum datetime to current time
function setMinDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const minDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
    elements.targetDateTime.min = minDateTime;
}

// Initialize from URL parameters
function initializeFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const target = urlParams.get('target');
    const viewOnly = urlParams.get('viewOnly');

    // Check if view-only mode is enabled
    if (viewOnly === 'true') {
        isViewOnlyMode = true;
        enableViewOnlyMode();
    }

    if (name && target) {
        try {
            const targetTimestamp = parseInt(target);
            targetDate = new Date(targetTimestamp);
            
            if (isNaN(targetDate.getTime())) {
                throw new Error('Invalid date');
            }

            elements.timerName.textContent = decodeURIComponent(name);
            elements.timerNameInput.value = decodeURIComponent(name);
            
            // Set the datetime input
            const dateStr = targetDate.toISOString().slice(0, 16);
            elements.targetDateTime.value = dateStr;
            
            // Start the timer automatically
            startTimer();
            
            // Show toggle button when timer is loaded from URL (unless in view-only mode from URL)
            if (!isViewOnlyMode) {
                elements.toggleViewModeButton.style.display = 'flex';
            }
        } catch (error) {
            console.error('Error parsing URL parameters:', error);
            elements.timerStatus.textContent = 'Invalid URL parameters';
            elements.timerStatus.style.color = 'var(--danger)';
        }
    }
}

// Setup event listeners
function setupEventListeners() {
    elements.startButton.addEventListener('click', handleStartTimer);
    elements.resetButton.addEventListener('click', handleReset);
    elements.copyUrlButton.addEventListener('click', () => copyToClipboard(elements.shareUrl.value));
    elements.copyViewOnlyUrlButton.addEventListener('click', () => copyToClipboard(elements.viewOnlyUrl.value));
    elements.copyTinyUrlButton.addEventListener('click', () => copyToClipboard(elements.tinyUrl.value));
    elements.generateTinyUrlButton.addEventListener('click', generateTinyUrl);
    elements.generateQrCodeButton.addEventListener('click', generateQrCode);
    elements.downloadQrButton.addEventListener('click', downloadQrCode);
    elements.toggleViewModeButton.addEventListener('click', toggleViewMode);
}

// Handle start timer button click
function handleStartTimer() {
    const name = elements.timerNameInput.value.trim();
    const dateTimeValue = elements.targetDateTime.value;

    if (!name) {
        alert('Please enter a timer name');
        return;
    }

    if (!dateTimeValue) {
        alert('Please select a target date and time');
        return;
    }

    targetDate = new Date(dateTimeValue);
    
    if (targetDate <= new Date()) {
        alert('Please select a future date and time');
        return;
    }

    elements.timerName.textContent = name;
    startTimer();
    generateShareUrl();
    
    // Show the toggle button once timer is started
    elements.toggleViewModeButton.style.display = 'flex';
}

// Start the countdown timer
function startTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    updateCountdown();
    timerInterval = setInterval(updateCountdown, 10); // Update every 10ms for smooth milliseconds
}

// Update countdown display
function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance < 0) {
        clearInterval(timerInterval);
        elements.days.textContent = '00';
        elements.hours.textContent = '00';
        elements.minutes.textContent = '00';
        elements.seconds.textContent = '00';
        elements.milliseconds.textContent = '000';
        elements.timerStatus.textContent = '🎉 Time\'s up!';
        elements.timerStatus.classList.add('expired');
        showCrackEffect();
        return;
    }

    elements.timerStatus.textContent = '';
    elements.timerStatus.classList.remove('expired');

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((distance % 1000));

    elements.days.textContent = String(days).padStart(2, '0');
    elements.hours.textContent = String(hours).padStart(2, '0');
    elements.minutes.textContent = String(minutes).padStart(2, '0');
    elements.seconds.textContent = String(seconds).padStart(2, '0');
    elements.milliseconds.textContent = String(milliseconds).padStart(3, '0');
}

// Show crack effect
function showCrackEffect() {
    const crackOverlay = document.getElementById('crackOverlay');
    if (crackOverlay && !crackOverlay.classList.contains('active')) {
        crackOverlay.classList.add('active');
    }
}

// Hide crack effect
function hideCrackEffect() {
    const crackOverlay = document.getElementById('crackOverlay');
    if (crackOverlay) {
        crackOverlay.classList.remove('active');
    }
}

// Handle reset
function handleReset() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    // Hide crack effect when resetting
    hideCrackEffect();}

    
    targetDate = null;
    isViewOnlyMode = false;
    elements.timerName.textContent = 'Set a timer to begin';
    elements.timerNameInput.value = '';
    elements.targetDateTime.value = '';
    elements.days.textContent = '00';
    elements.hours.textContent = '00';
    elements.minutes.textContent = '00';
    elements.seconds.textContent = '00';
    elements.milliseconds.textContent = '000';
    elements.timerStatus.textContent = '';
    elements.timerStatus.classList.remove('expired');
    elements.shareSection.style.display = 'none';
    elements.tinyUrlSection.style.display = 'none';
    elements.qrCodeSection.style.display = 'none';
    elements.toggleViewModeButton.style.display = 'none';
    
    // Ensure controls are visible after reset
    if (elements.controls) {
        elements.controls.style.display = 'block';
    }
    
    // Reset toggle button state
    elements.toggleViewModeButton.classList.remove('active');
    elements.toggleViewModeIcon.textContent = '👁️';
    elements.toggleViewModeText.textContent = 'View Only';
    
    // Clear URL parameters
    window.history.replaceState({}, document.title, window.location.pathname);
}

// Generate shareable URL
function generateShareUrl() {
    const name = encodeURIComponent(elements.timerNameInput.value.trim());
    const target = targetDate.getTime();
    const baseUrl = window.location.origin + window.location.pathname;
    const shareableUrl = `${baseUrl}?name=${name}&target=${target}`;
    const viewOnlyUrl = `${baseUrl}?name=${name}&target=${target}&viewOnly=true`;
    
    elements.shareUrl.value = shareableUrl;
    elements.viewOnlyUrl.value = viewOnlyUrl;
    elements.shareSection.style.display = 'block';
    elements.tinyUrlSection.style.display = 'none';
    elements.qrCodeSection.style.display = 'none';
    
    // Update browser URL without reloading
    window.history.replaceState({}, '', shareableUrl);
}

// Copy text to clipboard
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showTemporaryMessage('Copied to clipboard!');
    } catch (error) {
        console.error('Failed to copy:', error);
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            showTemporaryMessage('Copied to clipboard!');
        } catch (err) {
            showTemporaryMessage('Failed to copy', true);
        }
        document.body.removeChild(textarea);
    }
}

// Generate TinyURL using TinyURL API
async function generateTinyUrl() {
    const longUrl = elements.shareUrl.value;
    
    if (!longUrl) {
        showTemporaryMessage('Please start a timer first', true);
        return;
    }

    elements.generateTinyUrlButton.disabled = true;
    elements.generateTinyUrlButton.textContent = 'Generating...';

    try {
        // Using TinyURL API
        const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
        
        if (!response.ok) {
            throw new Error('Failed to generate TinyURL');
        }

        const shortUrl = await response.text();
        elements.tinyUrl.value = shortUrl;
        elements.tinyUrlSection.style.display = 'block';
        showTemporaryMessage('Short URL generated!');
    } catch (error) {
        console.error('Error generating TinyURL:', error);
        showTemporaryMessage('Failed to generate short URL', true);
    } finally {
        elements.generateTinyUrlButton.disabled = false;
        elements.generateTinyUrlButton.innerHTML = '<span class="icon">🔗</span> Generate Short URL';
    }
}

// Generate QR Code using QR Server API
function generateQrCode() {
    const url = elements.tinyUrl.value || elements.shareUrl.value;
    
    if (!url) {
        showTemporaryMessage('Please start a timer first', true);
        return;
    }

    // Using QR Server API (free, no API key required)
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}`;
    
    elements.qrCodeImage.src = qrApiUrl;
    elements.qrCodeSection.style.display = 'block';
    showTemporaryMessage('QR code generated!');
}

// Download QR Code
function downloadQrCode() {
    const url = elements.qrCodeImage.src;
    
    if (!url) {
        showTemporaryMessage('Please generate a QR code first', true);
        return;
    }

    const link = document.createElement('a');
    link.href = url;
    link.download = `countdown-timer-qr-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showTemporaryMessage('QR code downloaded!');
}

// Show temporary message
function showTemporaryMessage(message, isError = false) {
    elements.timerStatus.textContent = message;
    elements.timerStatus.style.color = isError ? 'var(--danger)' : 'var(--success)';
    
    setTimeout(() => {
        if (!elements.timerStatus.classList.contains('expired')) {
            elements.timerStatus.textContent = '';
        }
    }, 3000);
}

// Enable view-only mode
function enableViewOnlyMode() {
    // Hide controls section (input fields and buttons)
    if (elements.controls) {
        elements.controls.style.display = 'none';
    }
    
    // Hide share section
    if (elements.shareSection) {
        elements.shareSection.style.display = 'none';
    }
}

// Disable view-only mode
function disableViewOnlyMode() {
    // Show controls section
    if (elements.controls) {
        elements.controls.style.display = 'block';
    }
    
    // Show share section if timer is running
    if (targetDate && elements.shareUrl.value) {
        elements.shareSection.style.display = 'block';
    }
}

// Toggle view mode
function toggleViewMode() {
    isViewOnlyMode = !isViewOnlyMode;
    
    if (isViewOnlyMode) {
        enableViewOnlyMode();
        elements.toggleViewModeButton.classList.add('active');
        elements.toggleViewModeIcon.textContent = '✏️';
        elements.toggleViewModeText.textContent = 'Edit Mode';
        
        // Update URL to include viewOnly parameter
        if (targetDate) {
            const name = encodeURIComponent(elements.timerNameInput.value.trim());
            const target = targetDate.getTime();
            const baseUrl = window.location.origin + window.location.pathname;
            const viewOnlyUrl = `${baseUrl}?name=${name}&target=${target}&viewOnly=true`;
            window.history.replaceState({}, '', viewOnlyUrl);
        }
    } else {
        disableViewOnlyMode();
        elements.toggleViewModeButton.classList.remove('active');
        elements.toggleViewModeIcon.textContent = '👁️';
        elements.toggleViewModeText.textContent = 'View Only';
        
        // Update URL to remove viewOnly parameter
        if (targetDate) {
            const name = encodeURIComponent(elements.timerNameInput.value.trim());
            const target = targetDate.getTime();
            const baseUrl = window.location.origin + window.location.pathname;
            const normalUrl = `${baseUrl}?name=${name}&target=${target}`;
            window.history.replaceState({}, '', normalUrl);
        }
    }
}
