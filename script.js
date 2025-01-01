const events1 = [
    {
        id: 1,
        title: "Music Concert",
        description: "Join us for an unforgettable night of live music and performances.",
        category: "Music",
        image: "https://c0.wallpaperflare.com/preview/364/666/467/music-event-crowd-entertainment.jpg",
        link: "./index1.html" // Update with the actual path to your HTML file
    },
    {
        id: 2,
        title: "Tech Conference",
        description: "Explore the latest in technology and innovation with top industry experts.",
        category: "Technology",
        image: "https://thumbs.dreamstime.com/b/innovative-tech-conference-backdrop-made-generative-ai-ai-generated-stunning-image-showcases-innovative-tech-273477608.jpg",
        link: "https://example.com/tech-conference"
    },
    {
        id: 3,
        title: "Art Exhibition",
        description: "Discover amazing art pieces by local and international artists.",
        category: "Art",
        image: "https://images.hindustantimes.com/img/2021/03/06/1600x900/pjimage_-_2021-03-06T192427.069_1615038899966_1615038907778.jpg",
        link: "https://example.com/art-exhibition"
    }
];


// Function to render events dynamically
function renderEvents(eventList) {
    const container = document.getElementById('eventContainer');
    container.innerHTML = ''; // Clear existing cards
    eventList.forEach(event => {
        const card = document.createElement('div');
        card.className = 'event-card';
        card.innerHTML = `
            <img src="${event.image}" alt="${event.title}" style="width:100%; height:200px; object-fit:cover;">
            <div style="padding:16px;">
                <h3>${event.title}</h3>
                <p>${event.description}</p>
                <button 
                    style="background-color:#007BFF; color:white; padding:10px 16px; border:none; border-radius:4px; cursor:pointer;"
                    onclick="redirectTo('${event.url}')">
                    View Details
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Function to handle search functionality
function searchEvents() {
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchQuery) ||
        event.description.toLowerCase().includes(searchQuery)
    );
    renderEvents(filteredEvents);
}

// Function to redirect to an external link
function redirectTo(url) {
    window.open(url, '_blank');
}

// Initialize page with all events
document.addEventListener('DOMContentLoaded', () => {
    renderEvents(events);
});
// Sample event data
const events = [
    {
        id: 1,
        title: "Music Concert",
        description: "Join us for an unforgettable night of live music and performances.",
        image: "https://c0.wallpaperflare.com/preview/364/666/467/music-event-crowd-entertainment.jpg",
        url: "https://www.iator.com/Cairo/d782-ttd/p-122536P17"
    },
    {
        id: 2,
        title: "Tech Conference",
        description: "Explore the latest in technology and innovation with top industry experts.",
        image: "https://thumbs.dreamstime.com/b/innovative-tech-conference-backdrop-made-generative-ai-ai-generated-stunning-image-showcases-innovative-tech-273477608.jpg",
        url: "https://www.knowafest.com/explore/events"
    },
    {
        id: 3,
        title: "Art Exhibition",
        description: "Discover amazing art pieces by local and international artists.",
        image: "https://images.hindustantimes.com/img/2021/03/06/1600x900/pjimage_-_2021-03-06T192427.069_1615038899966_1615038907778.jpg",
        url: "https://www.artnet.com/events/all/"
    }
];

// Function to render events dynamically
function renderEvents(eventList) {
    const container = document.getElementById('eventContainer');
    container.innerHTML = ''; // Clear existing cards
    eventList.forEach(event => {
        const card = document.createElement('div');
        card.className = 'event-card';
        card.innerHTML = `
            <img src="${event.image}" alt="${event.title}" style="width:100%; height:200px; object-fit:cover;">
            <div style="padding:16px;">
                <h3>${event.title}</h3>
                <p>${event.description}</p>
                <button 
                    style="background-color:#007BFF; color:white; padding:10px 16px; border:none; border-radius:4px; cursor:pointer;"
                    onclick="redirectTo('${event.url}')">
                    View Details
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Function to handle search functionality
function searchEvents() {
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchQuery) ||
        event.description.toLowerCase().includes(searchQuery)
    );
    renderEvents(filteredEvents);
}

// Function to redirect to an external link
function redirectTo(url) {
    if (url) {
        window.open(url, '_blank'); // Opens the URL in a new tab
    } else {
        alert("No URL provided for this event.");
    }
}

// Initialize page with all events
document.addEventListener('DOMContentLoaded', () => {
    renderEvents(events);
});
