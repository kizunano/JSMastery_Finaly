const BASE_URL = "http://185.72.144.247:7757"

let actors


async function getActors() {
    const url = BASE_URL + "/actors"
    const data = await fetch(url)
    const actors = await data.json()
    return actors
}

async function getActorById(id) {
    const url = BASE_URL + `/actors/${id}`
    const data = await fetch(url)
    const actor = await data.json()
    return actor
}

const modalView = document.querySelector(".modal-view")
const modalViewCloseBtn = document.querySelector(".modal-view__close")
const modalViewInfo = document.querySelector(".modal-view__info")

modalViewCloseBtn.addEventListener("click", () => {
    closeModal()
})

function showModal(actor) {
    modalView.classList.remove("modal-view--hidden")
    const films = actor.films.map(film => `<span>${film.title}</span>`)
    modalViewInfo.innerHTML = `
        <img src="${BASE_URL}/${actor.image_URL}">
        <div>
            <h2>${actor.name} ${actor.surname}</h2>
            <p>${actor.Biography}</p>
            <p>Фильмы: ${films.join("")}</p>
        </div>
    `
    setTimeout(() => {
        const title = document.querySelector("title")
        title.innerHTML = `${actor.name} ${actor.surname}`
    }, 10)
}

function closeModal() {
    modalView.classList.add("modal-view--hidden")
}

const search = document.querySelector(".search")

search.addEventListener("input", () => {
    const text = search.value.toLowerCase()
    const filterActors = actors.filter(actor => {
        const fullname = `${actor.name} ${actor.surname}`.toLowerCase()
        return fullname.includes(text)
    })
    generateCards(filterActors)
})


function generateCards(actors) {
    const main = document.querySelector(".actors")
    main.innerHTML = ""
    actors.forEach(actor => main.innerHTML += card(actor))
    const cards = main.querySelectorAll(".main__card")
    cards.forEach(card => {
        card.addEventListener("click", async () => {
            const id = card.id.split("_")[1]
            const actor = await getActorById(id)
            showModal(actor)
        })
    })
}

function card(actor) {
    return `
        <figure id="actor_${actor.id}" class="main__card">
            <img src=${BASE_URL}/${actor.image_URL}>
            <figcaption>
                <h3>${actor.name} ${actor.surname}</h3>
            </figcaption>
        </figure>
    `
}


window.addEventListener("load", async () => {
    actors = await getActors()

    const params = new URLSearchParams(window.location.search)
    const actor_id = params.get("actor_id")

    setTimeout(() => {
        const title = document.querySelector("title")
        title.innerHTML = `Актёры`
    }, 10)

    if (Number(actor_id)) {
        const actor = await getActorById(actor_id)
        if (actor) {
            showModal(actor)
        }
    }
    generateCards(actors)
    
})