// Fetch za dropDown.
fetch('https://extendsclass.com/api/json-storage/bin/ecaedbf')
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
            listItem.textContent = movie.naziv;
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

    const movieApi = 'https://extendsclass.com/api/json-storage/bin/ecaedbf' // Api
    
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
            alert('Molimo unesite vise od jednog karaktera za pretragu.') // Provera duzine karaktera.
            return;
        }

        const filteredMovies = data.filter(movie => movie.naziv.toLowerCase().includes(inputValue));

        // Provera da li film postoji u api-u.
        if (filteredMovies.length === 0) {
            movieDiv.innerHTML = '<h2>No movie found</h2>'
            return;
        } 
        filteredMovies.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('movies')
            movieElement.setAttribute('data-movie-id', movie._id); // Dodao filtriran ID kao atribut.
            movieElement.innerHTML = `
            <h1>Naslov: ${movie.naziv}</h1>
            <img src="${movie.slika}" alt="${movie.naziv}" style="cursor: pointer; width: 100%; height: auto;">
            <h3>Godina: ${movie.godina}</h3>
    `;
        // Event listener na Div (movieElement) za novu stranicu.
    movieElement.querySelector('img').addEventListener('click', () => {
        window.location.href = `movie-details.html?movieId=${movie._id}`; // Putanja preko movieID.
    });

    movieDiv.appendChild(movieElement);
        })
    })
    .catch(error => {
        console.error('Error loading data:', error);
        document.getElementById('main').innerHTML = `<p>Error occurred: ${error.message}</p>`;
    });
})