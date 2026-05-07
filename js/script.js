async function loadComponent(selector, path) {
    const response = await fetch(path)
    document.querySelector(selector).innerHTML = await response.text()
}

function setBurgerBtn() {
    const burger = document.querySelector("#burger")
    burger.addEventListener("click", (event) => {
        const links = document.querySelectorAll(".header__link")
        Array.from(links).forEach(link => {
            link.classList.add("header__link--show")
        })
    })
}

window.addEventListener("load", async () => {
    await loadComponent("head", "./components/head.html")
    await loadComponent("header", "./components/header.html")
    await loadComponent("footer", "./components/footer.html")
    setBurgerBtn()
})

window.addEventListener("click", (event) => {
    const header = document.querySelector("header")
    const aside = document.querySelector("aside")
    const burger = document.querySelector("#burger")
    if (event.target != header && event.target != aside && event.target != burger) {
        const links = document.querySelectorAll(".header__link")
        Array.from(links).forEach(link => {
            link.classList.remove("header__link--show")
        })
    }
})

