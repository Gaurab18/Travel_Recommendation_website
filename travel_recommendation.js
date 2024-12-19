// Fetch the JSON data
fetch('travel_recommendation_api.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Check the data in the console
        displayRecommendations(data); // Function to display the recommendations
    })
    .catch(error => {
        console.error('Error fetching the JSON file:', error);
    });

// Function to display recommendations
function displayRecommendations(data) {
    const recommendationsContainer = document.getElementById('recommendations');
    recommendationsContainer.innerHTML = ''; // Clear existing content

    // Loop through the categories
    Object.keys(data).forEach(category => {
        const categorySection = document.createElement('div');
        categorySection.classList.add('category-section');

        // Add category title
        const categoryTitle = document.createElement('h2');
        categoryTitle.textContent = capitalizeFirstLetter(category);
        categorySection.appendChild(categoryTitle);

        // Loop through items in the category
        data[category].forEach(item => {
            const card = document.createElement('div');
            card.classList.add('recommendation-card');

            // Card content
            card.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}" class="recommendation-image">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            `;

            categorySection.appendChild(card);
        });

        recommendationsContainer.appendChild(categorySection);
    });
}

// Utility function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


document.getElementById('search').addEventListener('click', handleSearch);

function handleSearch() {
    // Get the search input value and convert it to lowercase
    const searchInput = document.getElementById('search-input').value.toLowerCase();

    // Fetch JSON data
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            const results = searchResults(data, searchInput); // Get search results
            displaySearchResults(results); // Display the results
        })
        .catch(error => console.error('Error fetching JSON data:', error));
}

// Function to search for matches
function searchResults(data, keyword) {
    const results = [];

    // Search through categories: countries, temples, and beaches
    Object.keys(data).forEach(category => {
        data[category].forEach(item => {
            const name = item.name.toLowerCase();
            const description = item.description.toLowerCase();

            // Check if the keyword matches the name or description
            if (name.includes(keyword) || description.includes(keyword)) {
                results.push(item);
            }
        });
    });

    return results;
}

// Function to display search results
function displaySearchResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found for your search.</p>';
        return;
    }

    // Create a card for each result
    results.forEach(result => {
        const card = document.createElement('div');
        card.classList.add('result-card');

        card.innerHTML = `
            <img src="${result.imageUrl}" alt="${result.name}" class="result-image">
            <h3>${result.name}</h3>
            <p>${result.description}</p>
        `;

        resultsContainer.appendChild(card);
    });
}


document.getElementById('search').addEventListener('click', handleSearch);

function handleSearch() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            const recommendations = getRecommendations(data, searchInput); // Fetch recommendations
            displayRecommendations(recommendations); // Display recommendations
        })
        .catch(error => console.error('Error fetching JSON data:', error));
}

// Function to get recommendations based on the keyword
function getRecommendations(data, keyword) {
    const results = [];

    if (keyword.includes("beach")) {
        results.push(...data.beaches.slice(0, 2)); // Get two beach recommendations
    } else if (keyword.includes("temple")) {
        results.push(...data.temples.slice(0, 2)); // Get two temple recommendations
    } else {
        // Assume the keyword relates to a country name
        data.countries.forEach(country => {
            if (country.name.toLowerCase().includes(keyword)) {
                results.push(...country.cities.slice(0, 2)); // Get two city recommendations from the country
            }
        });
    }

    return results;
}

// Function to display recommendations
function displayRecommendations(recommendations) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results

    if (recommendations.length === 0) {
        resultsContainer.innerHTML = '<p>No recommendations found for your search.</p>';
        return;
    }

    recommendations.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('recommendation-card');

        card.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}" class="recommendation-image">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
        `;

        resultsContainer.appendChild(card);
    });
}


// Select elements
const clearButton = document.getElementById('clear');
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('results');

// Add an event listener to the clear button
clearButton.addEventListener('click', () => {
    // Clear the search input field
    searchInput.value = '';

    // Clear the results container
    resultsContainer.innerHTML = '';

    // Optionally, reset any other styles or states
    resultsContainer.style.display = 'none';
    console.log('Search input and results cleared.');
});






// document.getElementById('search').addEventListener('click', handleSearch);

// function handleSearch() {
//     const searchInput = document.getElementById('search-input').value.trim().toLowerCase();

//     // Check for empty input
//     if (!searchInput) {
//         alert("Please enter a keyword to search!");
//         return;
//     }

//     fetch('travel_recommendation_api.json')
//         .then(response => {
//             if (!response.ok) throw new Error('Network response was not ok');
//             return response.json();
//         })
//         .then(data => {
//             const recommendations = getRecommendations(data, searchInput); // Fetch recommendations
//             displayRecommendations(recommendations); // Display recommendations
//         })
//         .catch(error => {
//             console.error('Error fetching JSON data:', error);
//             alert("Failed to fetch recommendations. Please try again later.");
//         });
// }

// // Function to get recommendations based on the keyword
// function getRecommendations(data, keyword) {
//     const results = [];

//     // Flexible matching for categories and country names
//     if (keyword.includes("beach")) {
//         results.push(...data.beaches.slice(0, 2)); // Get two beach recommendations
//     } else if (keyword.includes("temple")) {
//         results.push(...data.temples.slice(0, 2)); // Get two temple recommendations
//     } else {
//         data.countries.forEach(country => {
//             if (country.name.toLowerCase().includes(keyword)) {
//                 results.push(...country.cities.slice(0, 2)); // Get two city recommendations from the country
//             }
//         });
//     }

//     return results;
// }

// // Function to display recommendations
// function displayRecommendations(recommendations) {
//     const resultsContainer = document.getElementById('results');
//     resultsContainer.innerHTML = ''; // Clear previous results

//     if (recommendations.length === 0) {
//         resultsContainer.innerHTML = '<p>No recommendations found for your search.</p>';
//         return;
//     }

//     recommendations.forEach(item => {
//         const card = document.createElement('div');
//         card.classList.add('recommendation-card');

//         card.innerHTML = `
//             <img src="${item.imageUrl}" alt="${item.name}" class="recommendation-image">
//             <h3>${item.name}</h3>
//             <p>${item.description}</p>
//         `;

//         resultsContainer.appendChild(card);
//     });
// }

clearButton.addEventListener('click', () => {
    console.log("Clear button clicked");
    // Clear the search input field
    searchInput.value = '';
    // Clear the results container
    resultsContainer.innerHTML = '';
});

// .fetch('travel_recommendation_api.json')
// .then(response => {
//     if (!response.ok) throw new Error('Network response was not ok');
//     return response.json();
// })

