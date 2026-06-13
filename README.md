# Japan Travel Guide 🇯🇵

A comprehensive, mobile-friendly travel companion website for visiting Japan. Built with PHP, CSS, JavaScript, and JSON - no frameworks required!

## Features

### 🍜 Restaurants & Food
- Browse curated list of restaurants (sushi, ramen, kaiseki, yakiniku, tempura)
- Filter by cuisine type
- Search functionality
- View ratings, prices, and descriptions
- Find nearest places using geolocation

### ⛩️ Attractions & Sights
- Discover temples, shrines, castles, and natural wonders
- Includes famous spots like Senso-ji, Fushimi Inari, Mount Fuji
- Filter by attraction type
- Get directions via Google Maps

### 🏨 Hotels & Accommodation
- Options from luxury hotels to capsule hotels and traditional ryokans
- Price range indicators
- Ratings and descriptions
- Location-based sorting

### 🗣️ Essential Japanese Phrases
- Common phrases with Japanese characters, romaji, and English translations
- Searchable phrase list
- Perfect for tourists who don't speak Japanese

### 🚨 Emergency Information
- Police: 110
- Ambulance/Fire: 119
- Tourist hotline
- Embassy contacts
- Important safety tips

### 💡 Travel Tips
- Cultural etiquette advice
- Transportation tips (JR Pass, Suica cards)
- Dining customs
- Onsen etiquette
- Money-saving tips

## Technical Features

- **Responsive Design**: Works perfectly on phones, tablets, and desktops
- **Geolocation**: Find nearest places to your current location
- **Search & Filter**: Quickly find what you're looking for
- **Modern UI**: Beautiful gradient backgrounds, card layouts, smooth animations
- **Fast Loading**: No heavy frameworks, pure PHP/JS/CSS
- **Offline Ready**: Data stored in JSON file

## Installation

1. Ensure you have PHP installed (PHP 7.4+ recommended)
2. Place all files in your web server directory
3. Start the PHP built-in server:
   ```bash
   php -S localhost:8080 -t /workspace
   ```
4. Open http://localhost:8080 in your browser

## File Structure

```
/workspace/
├── index.php          # Main HTML page
├── api.php            # PHP API endpoint
├── css/
│   └── style.css      # All styles
├── js/
│   └── app.js         # Application logic
└── data/
    └── japan_data.json # All travel data
```

## Usage

1. **Navigate** using the tab buttons at the top
2. **Search** for specific places or phrases
3. **Filter** by category (e.g., Sushi, Ramen, Temple)
4. **Click "Find Nearest Places"** to enable location services
5. **Click "Show on Map"** to open Google Maps with directions

## Customization

- Add more places by editing `data/japan_data.json`
- Modify colors in `css/style.css` (CSS variables at the top)
- Extend functionality in `js/app.js`

## Browser Support

Works on all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers

## License

Free to use for personal and commercial projects.
