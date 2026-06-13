// Japan Travel Guide - JavaScript

let japanData = {};
let userLocation = null;
let currentSection = 'restaurants';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    setupNavigation();
    setupSearch();
});

// Load JSON data from PHP endpoint
async function loadData() {
    try {
        const response = await fetch('api.php?action=getData');
        if (!response.ok) throw new Error('Failed to load data');
        japanData = await response.json();
        renderSection(currentSection);
    } catch (error) {
        console.error('Error loading data:', error);
        showLoadingError();
    }
}

// Setup navigation tabs
function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSection = btn.dataset.section;
            renderSection(currentSection);
        });
    });
}

// Render section based on type
function renderSection(sectionType) {
    const container = document.getElementById('content-area');
    container.innerHTML = '<div class="loading"><div class="spinner"></div>Loading...</div>';

    setTimeout(() => {
        switch(sectionType) {
            case 'restaurants':
                renderPlaces(japanData.restaurants, 'restaurant', container);
                break;
            case 'attractions':
                renderPlaces(japanData.attractions, 'attraction', container);
                break;
            case 'hotels':
                renderPlaces(japanData.hotels, 'hotel', container);
                break;
            case 'phrases':
                renderPhrases(container);
                break;
            case 'emergency':
                renderEmergency(container);
                break;
            case 'tips':
                renderTips(container);
                break;
            default:
                container.innerHTML = '<p>Section not found</p>';
        }
    }, 300);
}

// Render places (restaurants, attractions, hotels)
function renderPlaces(places, type, container) {
    let html = `
        <h2 class="section-title">${getSectionTitle(type)}</h2>
        <div class="search-container">
            <input type="text" class="search-input" placeholder="Search ${type}..." data-type="${type}">
            <div class="filter-buttons" id="filter-${type}"></div>
        </div>
        <button class="location-btn" onclick="getUserLocation()">
            📍 Find Nearest Places
        </button>
        <div class="card-grid" id="places-grid">
            ${generatePlaceCards(places, type)}
        </div>
    `;
    container.innerHTML = html;
    setupFilters(type, places);
    setupSearch();
}

// Generate HTML cards for places
function generatePlaceCards(places, type) {
    return places.map(place => {
        const icon = getIconForType(type);
        const distanceInfo = place.distance ? `<span class="distance-badge">📏 ${place.distance.toFixed(1)} km away</span>` : '';
        
        return `
            <div class="card" data-lat="${place.lat}" data-lng="${place.lng}">
                <div class="card-header">
                    <div class="card-icon">${icon}</div>
                </div>
                <div class="card-body">
                    <h3 class="card-title">${place.name}</h3>
                    <div class="card-info">
                        <span class="rating">⭐ ${place.rating}/5.0</span>
                        ${place.price ? `<span class="price">${place.price}</span>` : ''}
                    </div>
                    <p class="card-description">${place.description}</p>
                    <div class="card-address">
                        <span>📍</span>
                        <span>${place.address}</span>
                    </div>
                    ${distanceInfo}
                    <button class="btn" onclick="showOnMap(${place.lat}, ${place.lng}, '${place.name}')">
                        🗺️ Show on Map
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Render language phrases
function renderPhrases(container) {
    let html = `
        <h2 class="section-title">🗣️ Essential Japanese Phrases</h2>
        <div class="search-container">
            <input type="text" class="search-input" placeholder="Search phrases..." data-type="phrase">
        </div>
        <div class="card-grid">
    `;
    
    japanData.phrases.forEach(phrase => {
        html += `
            <div class="phrase-card">
                <div class="phrase-japanese">${phrase.japanese}</div>
                <div class="phrase-romaji">${phrase.romaji}</div>
                <div class="phrase-english">${phrase.english}</div>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
    setupSearch();
}

// Render emergency information
function renderEmergency(container) {
    const emergency = japanData.emergency;
    let html = `
        <h2 class="section-title">🚨 Emergency Contacts</h2>
        <div class="emergency-grid">
            <div class="emergency-card">
                <div class="emergency-icon">👮</div>
                <h3>Police</h3>
                <div class="emergency-number">${emergency.police}</div>
                <p>For criminal emergencies</p>
            </div>
            <div class="emergency-card">
                <div class="emergency-icon">🚑</div>
                <h3>Ambulance & Fire</h3>
                <div class="emergency-number">${emergency.ambulance}</div>
                <p>Medical and fire emergencies</p>
            </div>
            <div class="emergency-card">
                <div class="emergency-icon">📞</div>
                <h3>Tourist Hotline</h3>
                <div class="emergency-number">${emergency.tourist_hotline}</div>
                <p>24/7 tourist assistance</p>
            </div>
            <div class="emergency-card">
                <div class="emergency-icon">🏛️</div>
                <h3>Embassy</h3>
                <div class="emergency-number">${emergency.embassy}</div>
                <p>Consular assistance</p>
            </div>
        </div>
        <div style="margin-top: 30px; background: white; border-radius: 15px; padding: 25px; box-shadow: var(--card-shadow);">
            <h3 style="color: var(--primary-color); margin-bottom: 15px;">💡 Important Tips</h3>
            <ul style="list-style: none;">
                <li style="padding: 10px 0; border-bottom: 1px solid #eee;">🇯🇵 Most Japanese people don't speak English fluently</li>
                <li style="padding: 10px 0; border-bottom: 1px solid #eee;">📱 Download translation apps before traveling</li>
                <li style="padding: 10px 0; border-bottom: 1px solid #eee;">🏥 Many hospitals have international departments in major cities</li>
                <li style="padding: 10px 0; border-bottom: 1px solid #eee;">💊 Bring necessary medications with prescription</li>
                <li style="padding: 10px 0;">🆎 Look for "AED" signs for defibrillators in public places</li>
            </ul>
        </div>
    `;
    container.innerHTML = html;
}

// Render travel tips
function renderTips(container) {
    const icons = ['💡', '🎌', '🚃', '🍜', '⛩️', '💰', '📱', '🎒'];
    let html = `
        <h2 class="section-title">💡 Travel Tips & Tricks</h2>
        <ul class="tips-list">
    `;
    
    japanData.tips.forEach((tip, index) => {
        const icon = icons[index % icons.length];
        html += `
            <li>
                <span class="tip-icon">${icon}</span>
                <span>${tip}</span>
            </li>
        `;
    });
    
    html += `
        </ul>
        <div style="margin-top: 30px; background: white; border-radius: 15px; padding: 25px; box-shadow: var(--card-shadow);">
            <h3 style="color: var(--primary-color); margin-bottom: 15px;">🎯 Bonus Tips</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                <div style="background: #f8f9fa; padding: 15px; border-radius: 10px;">
                    <strong>🚄 Transportation:</strong> Get a Suica or Pasmo card for easy train travel
                </div>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 10px;">
                    <strong>🏛️ Culture:</strong> Bow slightly when greeting someone
                </div>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 10px;">
                    <strong>🍽️ Dining:</strong> Say "Itadakimasu" before eating
                </div>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 10px;">
                    <strong>♨️ Onsen:</strong> Wash thoroughly before entering hot springs
                </div>
            </div>
        </div>
    `;
    container.innerHTML = html;
}

// Get user's location
function getUserLocation() {
    if (navigator.geolocation) {
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = '<div class="loading"><div class="spinner"></div>Getting your location...</div>';
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                calculateDistances();
            },
            (error) => {
                alert('Unable to get your location. Please enable location services.');
                renderSection(currentSection);
            }
        );
    } else {
        alert('Geolocation is not supported by your browser');
    }
}

// Calculate distances from user location
function calculateDistances() {
    const places = japanData[currentSection];
    places.forEach(place => {
        place.distance = calculateDistance(
            userLocation.lat, userLocation.lng,
            place.lat, place.lng
        );
    });
    
    // Sort by distance
    places.sort((a, b) => a.distance - b.distance);
    
    // Re-render with distances
    const container = document.getElementById('content-area');
    renderPlaces(places, currentSection.slice(0, -1), container);
}

// Haversine formula to calculate distance between two points
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

function deg2rad(deg) {
    return deg * (Math.PI/180);
}

// Show location on map (opens Google Maps)
function showOnMap(lat, lng, name) {
    const url = `https://www.google.com/maps?q=${lat},${lng} (${encodeURIComponent(name)})`;
    window.open(url, '_blank');
}

// Setup search functionality
function setupSearch() {
    const searchInputs = document.querySelectorAll('.search-input');
    searchInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const type = e.target.dataset.type;
            filterContent(searchTerm, type);
        });
    });
}

// Filter content based on search
function filterContent(searchTerm, type) {
    if (type === 'phrase') {
        const phraseCards = document.querySelectorAll('.phrase-card');
        phraseCards.forEach(card => {
            const text = card.textContent.toLowerCase();
            card.style.display = text.includes(searchTerm) ? 'block' : 'none';
        });
    } else {
        const cards = document.querySelectorAll('#places-grid .card');
        cards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const desc = card.querySelector('.card-description').textContent.toLowerCase();
            const address = card.querySelector('.card-address').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || desc.includes(searchTerm) || address.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
}

// Setup filters for different types
function setupFilters(type, items) {
    const filterContainer = document.getElementById(`filter-${type}`);
    if (!filterContainer) return;
    
    const uniqueTypes = [...new Set(items.map(item => item.type || item.category))].filter(Boolean);
    
    if (uniqueTypes.length > 0) {
        let html = '<button class="filter-btn active" data-filter="all">All</button>';
        uniqueTypes.forEach(filterType => {
            html += `<button class="filter-btn" data-filter="${filterType}">${filterType}</button>`;
        });
        filterContainer.innerHTML = html;
        
        // Add filter event listeners
        filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                filterByType(btn.dataset.filter, type);
            });
        });
    }
}

// Filter places by type
function filterByType(filterType, sectionType) {
    const places = japanData[sectionType + 's'];
    const filtered = filterType === 'all' 
        ? places 
        : places.filter(place => (place.type || place.category) === filterType);
    
    const container = document.getElementById('content-area');
    const grid = document.getElementById('places-grid');
    grid.innerHTML = generatePlaceCards(filtered, sectionType);
}

// Get section title
function getSectionTitle(type) {
    const titles = {
        restaurant: '🍜 Restaurants & Food',
        attraction: '⛩️ Attractions & Sights',
        hotel: '🏨 Hotels & Accommodation'
    };
    return titles[type] || type;
}

// Get icon for place type
function getIconForType(type) {
    const icons = {
        restaurant: '🍜',
        attraction: '⛩️',
        hotel: '🏨'
    };
    return icons[type] || '📍';
}

// Show loading error
function showLoadingError() {
    const container = document.getElementById('content-area');
    container.innerHTML = `
        <div style="text-align: center; color: white; padding: 40px;">
            <h2>⚠️ Error Loading Data</h2>
            <p>Please refresh the page or check your connection.</p>
            <button class="btn" onclick="location.reload()" style="margin-top: 20px; width: auto;">
                🔄 Refresh Page
            </button>
        </div>
    `;
}
