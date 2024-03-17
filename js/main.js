// Fetch za dropDown.
fetch('https://mocki.io/v1/d8539341-4585-4504-a64a-0bf55cfe684b')
    .then(response => {
        if (!response.ok) {
            throw new Error (`Error: Api call failed with status ${response.status} and status text ${response.statusText}`)
        }
        return response.json()
    })
    .then(data => {
        const dropDownMenu = document.querySelector('.dropdown-menu');

        data.forEach(movie => {
            const listItem = document.createElement('li');
            listItem.textContent = movie.movie;
            dropDownMenu.appendChild(listItem);
        })
    })
    .catch(error => {
        console.error('Error loading data:', error);
        document.getElementById('main').innerHTML = `<p>Error occurred: ${error.message}</p>`;
    });

    // Sprecavanje automatskog zatvaranja dropDown menija :) .
    const dropDownMenu = document.querySelector('.dropdown-menu');
    dropDownMenu.addEventListener('click', event => {
        event.stopPropagation();
    })

// Event listener
document.getElementById('formx').addEventListener('submit', (e) => {
    e.preventDefault();
    const inputValue = document.getElementById('inputField').value.toLowerCase();
    // Provera da li je input prazno.
    if (!inputValue) {
        alert ("Input polje je prazno!")
        return
    }
    document.getElementById('inputField').value = '';

    const movieDiv = document.getElementById('searchResult');
    movieDiv.innerHTML = '<h2>Loading . . . </h2>' // Mini loader.

    const movieApi = 'https://mocki.io/v1/d8539341-4585-4504-a64a-0bf55cfe684b' // Api
    
    fetch(movieApi)
    .then(response => {
        if (!response.ok) {
            throw new Error (`Error: Api call failed with status ${response.status} and status text ${response.statusText}`)
        }
        return response.json()
    })
    .then(data => {
        movieDiv.innerHTML = ''
        if (inputValue.length <= 1) {
            alert('Please enter more than one character for search.') // Provera duzine karaktera.
            return;
        }

        const filteredMovies = data.filter(movie => movie.movie.toLowerCase().includes(inputValue));

        // Provera da li film postoji u api-u.
        if (filteredMovies.length === 0) {
            movieDiv.innerHTML = '<h2>No movie found</h2>'
            return;
        } 
        filteredMovies.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.innerHTML = `
            <h1>Naslov: ${movie.movie}</h1>
            <img src="${movie.image}" alt="${movie.movie}">
            <h3>IMDB ocena: ${movie.rating}</h3>
            <a href="${movie.imdb_url}" target="_blank">IMDb link</a>
    `;
    movieDiv.appendChild(movieElement);
        })
    })
    .catch(error => {
        console.error('Error loading data:', error);
        document.getElementById('main').innerHTML = `<p>Error occurred: ${error.message}</p>`;
    });
})