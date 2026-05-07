const BASE_URL = "http://185.72.144.247:7757"

let films = []


async function getFilms() {
    const url = BASE_URL + "/films"
    const data = await fetch(url)
    const films = await data.json()
    return films
}

function generateCards(films, page) {
    const main = document.querySelector(".main__films")
    main.innerHTML = ""
    const start = (page - 1) * 12
    const end = start + 12
    films.slice(start, end).forEach(film => {
        main.innerHTML += card(film)
    })

    const cards = main.querySelectorAll(".main__card")
    cards.forEach(card => {
        card.addEventListener("click", () => {
            const id = card.id.split("_")[1] // id="film_1" => ["film", "1"]
            // `film.html?id=${id}`
            window.location = `film.html?id=${id}`
        })
    })
}


function card(film) {
    return `
        <figure id="film_${film.id}" class="main__card">
            <img src=${BASE_URL}/${film.poster_URL}>
            <figcaption>
                <h3>${film.title}</h3>
                <p>${film.year} | ${film.age_rating}+</p>
            </figcaption>
        </figure>
    `
}

function generatePagination(films) {
    const pagination = document.querySelector(".main__pagination")
    const length = films.length
    const pages = Math.ceil(length / 12)
    for (let n = 0; n < pages; n++) {
        pagination.innerHTML += `<button>${n + 1}</button>`
    }
    const buttons = pagination.querySelectorAll("button")
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            generateCards(films, btn.innerHTML)
        })
    })
}



window.addEventListener("load", async () => {
    films = await getFilms()
    generatePagination(films)
    generateCards(films, 1)
    setTimeout(() => {
        const title = document.querySelector("title")
        title.innerHTML = "Главная"
    }, 10)
})


