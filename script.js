console.log("Start anime Studio")
console.log("search all movie")
function onload(){
    fetch('https://api.jikan.moe/v4/top/anime')
    .then((response) => {
        return response.json()
    }).then(dataAnime => {
        console.log(dataAnime.data)
        animeList(dataAnime.data)
        // countSlidebar(dataAnime)
    })
}
function animeList(dataAnime){
    for(anime of dataAnime){
        animeTable(anime)
    }
}
function animeTable(dataAnime){
    const display_all_anime = document.getElementById('display_all_anime')
    let col = document.createElement('div')
    col.classList.add('col-lg-2')
    col.classList.add('col-md-4')
    col.classList.add('col-sm-6')
    col.classList.add('col-12')
    col.classList.add('my-lg-4')
    col.classList.add('my-md-3')
    col.classList.add('my-2')
    let card = document.createElement('div')
    card.classList.add('card')
    card.classList.add('bg-dark')
    card.classList.add('text-white')
    card.classList.add('blur')
    col.appendChild(card)
    let image = document.createElement('img')
    image.setAttribute('src',dataAnime.images.jpg.large_image_url)
    image.classList.add('card-img')
    image.classList.add('size-img-card')
    card.appendChild(image)
    let overlay = document.createElement('div')
    overlay.classList.add('contain')
    overlay.classList.add('overlay')
    card.appendChild(overlay)
    let flex = document.createElement('div')
    flex.classList.add('d-flex')
    flex.classList.add('flex-column')
    flex.classList.add('width-100')
    overlay.appendChild(flex)
    let card_body = document.createElement('div')
    card_body.classList.add('card-body')
    flex.appendChild(card_body)
    let title = document.createElement('p')
    title.classList.add('card-text')
    title.classList.add('text')
    title.classList.add('text-center')
    title.innerHTML = dataAnime.title
    card_body.appendChild(title)
    let btn_detail = document.createElement('button')
    btn_detail.classList.add('btn')
    btn_detail.classList.add('btn-outline-warning')
    btn_detail.classList.add('mx-3')
    btn_detail.innerHTML = 'Detail'
    flex.appendChild(btn_detail)
    let btn_favoite = document.createElement('button')
    btn_favoite.classList.add('btn')
    btn_favoite.classList.add('btn-warning')
    btn_favoite.classList.add('mx-3')
    btn_favoite.classList.add('my-3')
    flex.appendChild(btn_favoite)
    let icon_favorite = document.createElement('i')
    icon_favorite.classList.add('bi')
    icon_favorite.classList.add('bi-heart-fill')
    icon_favorite.classList.add('me-1')
    
    btn_favoite.appendChild(icon_favorite)
    btn_favoite.innerHTML += 'Favorite'

    // let check_active = 0;
    // btn_favoite.addEventListener('click', function () {
    //     if (check_active==0){
    //         console.log('changebtn')
    //         btn_favoite.style.color = 'red'
    //         check_active =1;
    //         console.log(check_active)
    //     }else {
    //         console.log('changebtn')
    //         btn_favoite.style.color = 'black'
    //         check_active =0;
    //         console.log(check_active)
    //     }
    // })

    display_all_anime.appendChild(col)
}
document.getElementById('searchButton').addEventListener('click', () => {
    let search = document.getElementById('inputSearch').value
    fetch(`https://api.jikan.moe/v4/anime?q=${search}`)
        .then(response => {
            return response.json()
        }).then(dataAnime => {
            let anime = dataAnime.data
            console.log(anime)
            display_all_anime.innerHTML = ''
            animeList(anime)
        })
})


