# Named Countdown Timer ⏰

A beautifully designed countdown timer with millisecond precision that can be shared via URL or QR code.

## Features

✨ **Millisecond Precision** - Displays countdown with days, hours, minutes, seconds, and milliseconds

🎨 **Modern Design** - Clean, responsive interface with gradient colors and smooth animations

🔗 **URL Sharing** - Automatically start timers from URL parameters

📱 **QR Code Generation** - Generate QR codes for easy mobile sharing

🔗 **Short URLs** - Generate TinyURL short links for easy sharing

🌐 **Responsive** - Works perfectly on desktop, tablet, and mobile devices

## Live Demo

Visit the live application: [Named Countdown Timer](https://basmulder03.github.io/named-countdown-timer/)

## Usage

### Creating a Timer

1. Enter a name for your timer (e.g., "New Year 2027")
2. Select the target date and time
3. Click "Start Timer" to begin the countdown
4. The timer will update every 10 milliseconds for smooth animation

### Sharing a Timer

Once a timer is started, you can share it in multiple ways:

1. **Copy URL** - Click "Copy" to copy the full URL with parameters
2. **Generate Short URL** - Click "Generate Short URL" to create a TinyURL
3. **Generate QR Code** - Click "Generate QR Code" to create a scannable QR code

### URL Parameters

The timer automatically starts when accessed with the following URL parameters:

- `name` - The name of the timer (URL encoded)
- `target` - The target timestamp in milliseconds

Example:
```
https://basmulder03.github.io/named-countdown-timer/?name=New%20Year%202027&target=1798761600000
```

## Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients, animations, and responsive design
- **JavaScript (ES6+)** - Timer logic and API integrations
- **TinyURL API** - For generating short URLs
- **QR Server API** - For generating QR codes

## Local Development

To run the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/basmulder03/named-countdown-timer.git
   cd named-countdown-timer
   ```

2. Start a local web server:
   ```bash
   python3 -m http.server 8000
   # or
   npx serve
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

## Browser Support

The application works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
