const BASE_URL = "http://185.72.144.247:7757"

async function getTop25() {
    const url = BASE_URL + "/top25"
    const data = await fetch(url)
    const top25 = await data.json()
    return top25
}

window.addEventListener("load", async () => {
    let top25
    if (localStorage.hasOwnProperty("top25")) {
        top25 = JSON.parse(localStorage.getItem("top25"))
    } else {
        top25 = await getTop25()
        localStorage.setItem("top25", JSON.stringify(top25))
    } })
    genereateTop25(top25)
    setTimeout(() => {
        const title = document.querySelector("title")
        title.innerHTML = "TOP-25"
    }, 10)

    function genereateTop25(top25) {
        const main = document.querySelector("main")
        main.innerHTML = ""
        top25.forEach((film, index) => {
            main.innerHTML += top25card(film, index)
        })
        const cards = main.querySelectorAll(".main__top25card")
        cards.forEach(card => {
            card.addEventListener("click", () => {
                const id = card.id.split("_")[1]
                window.location = `film.html?id=${id}`
            })
        })
    }
    function top25card(film, index) {
        const duration = `${Math.floor(film.duration / 60)}ч. ${film.duration % 60}м.`
        let ratingClass = "main__top25card__rating "
        if (index + 1 <= 3) {
            ratingClass += "main__top25card__rating--top3"
        } else if (index + 1 <= 10) {
            ratingClass += "main__top25card__rating--top10"
        }
        return `
        <div id=top25_${film.id} class="main__top25card">
            <span class="main__top25card__index">${index + 1}</span>
            <img src=${BASE_URL}/${film.poster_URL}>
            <div class="main__top25card__info">
                <h2>${film.title}</h2>
                <p>${film.year} | ${duration}</p>
            </div>
            <p class="${ratingClass}">${film.rating}</p>
        </div>
    `
    }

