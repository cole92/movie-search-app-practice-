// Dohvatanje MovieID-a.
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('movieId');
const mainDiv = document.getElementById('movieDetailsDiv');

fetch('https://extendsclass.com/api/json-storage/bin/ecaedbf')
    .then(response => {
        if (!response.ok) {
            throw new Error (`Error: Api call failed with status ${response.status} and status text ${response.statusText}`)
        }
        return response.json()
    })
    .then(data => {
        // Filtriram filmove po ID-u.
        const movie = data.find(m => m._id === movieId);

        if (movie) {
            console.log(movie);
            const movieDetails = `
                <div>
                    <h1>${movie.naziv}</h1>
                    <h3>Godina: ${movie.godina}</h3>
                    <img src="${movie.slika}" alt="${movie.naziv}" style="max-width: 100%; height: auto;">
                    <p>Komentari:</p>
                    <ul>${movie.komentari ? movie.komentari.map(komentar => `<li>${komentar.user}: ${komentar.comment}</li>`).join('') : 'Nema komentara'}</ul>
                </div>
            `;
            mainDiv.innerHTML = movieDetails;
        } else {
            mainDiv.innerHTML = '<p>Film nije pronadjen.</p>'
        }
    })