const BASE_URL = "http://185.72.144.247:7757"
const main = document.querySelector("main")

async function getFilmById(id) {
    const url = BASE_URL + `/films/${id}` // -20
    const data = await fetch(url)
    if (!data.ok) {
        return null
    }
    const film = await data.json()
    return film
}

window.addEventListener("load", async () => {
    const params = new URLSearchParams(window.location.search)
    const id = Number(params.get("id")) // Перевод в число
    if (!id) {
        main.innerHTML = "<h1>Фильм не найден</h1>"
        return
    }
    const film = await getFilmById(id)
    if (!film) {
        main.innerHTML = "<h1>Фильм не найден</h1>"
        return
    }
    console.log(film)
    main.innerHTML = generateCard(film)
    setTimeout(() => {
        const title = document.querySelector("title")
        title.innerHTML = film.title
    }, 10)
})

function generateCard(film) {
    const duration = `${Math.floor(film.duration / 60)}ч. ${film.duration % 60}м.`
    const genres = film.genres.map(genre => genre.name).join(" | ")
    const actors = film.actors.map(actor => {
        return `
            <a href="actors.html?actor_id=${actor.id}">
                ${actor.name} ${actor.surname}
            </a>
        `
    })
    return `
        <figure class="main__film">
            <img class="main__poster" src=${BASE_URL}/${film.poster_URL}>
            <figcaption>
                <div class="main__title">
                    <h1>${film.title}</h1>
                    <div class="main__rating">
                        <img src="./assets/images/star.svg">
                        <span>${film.rating}/10</span>
                    </div>
                </div>
                <div class="main__info">
                    <span>${film.year}</span>
                    <span>${genres}</span>
                    <span>${duration}</span>
                </div>
                <p>${film.desc}</p>
                <div class="main__actors">
                    <span>Актеры: </span>
                    <div>${actors}</div>
                </div>
                <button class="main__button">Перейти к просмотру</button>
            </figcaption>
        </figure>
    `
}


