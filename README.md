# Focus Timer App ☕

A beautiful, minimalist Pomodoro-style focus timer for macOS with a coffee theme.

## Features

- **Beautiful Pixel Art Coffee Cup**: Detailed coffee cup with realistic shading, highlights, visible coffee liquid, and smooth animated steam effects
- **Custom Time Input**: Enter any time between 1-180 minutes for your focus sessions
- **Flexible Timer Presets**: Quick access to 15, 25, 45, and 60-minute focus sessions
- **Session Tracking**: Automatically tracks your daily sessions and total focus time
- **Desktop Notifications**: Get notified when your focus session completes
- **Progress Indicator**: Visual progress bar shows how far you've come
- **Persistent Stats**: Your daily statistics are saved in local storage
- **Responsive Design**: Works on different screen sizes
- **Dark/Light Mode**: Automatically adapts to your system preferences

## How to Use

1. **Open the App**: Simply open `index.html` in your web browser
2. **Choose Duration**:
   - Click one of the preset buttons (15, 25, 45, or 60 minutes), OR
   - Enter a custom time in the input field and click "Set"
3. **Start Timer**: Click the "Start" button to begin your focus session
4. **Focus**: The pixel art coffee cup will show animated steam while you're in an active session
5. **Pause/Reset**: Use the Pause or Reset buttons as needed
6. **Complete**: When the timer finishes, you'll get a notification and your stats will update

## Installation

### For macOS (Native App Experience)

1. Open Safari and navigate to the `index.html` file
2. Click on the Share button in Safari
3. Select "Add to Dock"
4. The app will now behave like a native macOS application

### Alternative: Use as Web App

Simply double-click `index.html` to open it in your default browser.

## Keyboard Shortcuts

- **Space**: Start/Pause timer (when focused on buttons)
- **R**: Reset timer (when focused on reset button)

## Technical Details

- Pure HTML, CSS, and JavaScript (no dependencies)
- Uses localStorage for persisting daily stats
- Web Notifications API for completion alerts
- Responsive design with CSS Grid and Flexbox
- Smooth animations using CSS transitions

## Browser Compatibility

- Safari (recommended for macOS)
- Chrome
- Firefox
- Edge

## Privacy

All data is stored locally in your browser. No information is sent to any server.

## Customization

You can easily customize the timer by editing:
- `styles.css`: Change colors, fonts, and layout
- `script.js`: Modify timer durations or add new features
- `index.html`: Adjust the structure or add new elements

Enjoy your focused work sessions! ☕
