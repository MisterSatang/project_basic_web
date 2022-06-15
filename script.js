//navbar active slide
window.addEventListener("scroll", e => {
  scrollPos = window.scrollY;
  document.getElementById('navbar_active').style.backgroundColor = 'rgb( 17 , 16 , 16 )';
});

// console.log("Start anime Studio")
// console.log("search all movie")
function onload(){
    fetch('https://api.jikan.moe/v4/seasons/now')
    .then((response) => {
        return response.json()
    }).then(dataAnime => {
        console.log(dataAnime.data)
        animeList(dataAnime.data)
    })
}
function animeList(dataAnime){
    for(anime of dataAnime){
        animeTable(anime)
    }
}

//section name 
function sectionName(section,dataAnime){
    let section_name = document.getElementById('section')
    section_name.innerHTML = section+' : '+ dataAnime
}

function animeTable(dataAnime){
    console.log(dataAnime)
    const display_all_anime = document.getElementById('display_all_anime')
    let col = document.createElement('div')
    col.classList.add('col-lg-2',
    'col-md-4',
    'col-sm-6',
    'col-12',
    'my-lg-4',
    'my-md-3',
    'my-2')
    let card = document.createElement('div')
    card.classList.add('card',
    'bg-dark',
    'text-white',
    'blur')
    col.appendChild(card)
    let image = document.createElement('img')
    image.setAttribute('src',dataAnime.images.jpg.large_image_url)
    image.classList.add('card-img',
    'size-img-card')
    card.appendChild(image)
    let overlay = document.createElement('div')
    overlay.classList.add('contain',
    'overlay')
    card.appendChild(overlay)
    let flex = document.createElement('div')
    flex.classList.add('d-flex',
    'flex-column',
    'width-100')
    overlay.appendChild(flex)
    let card_body = document.createElement('div')
    card_body.classList.add('card-body')
    flex.appendChild(card_body)
    let title = document.createElement('p')
    title.classList.add('card-text',
    'text',
    'text-center')
    title.innerHTML = dataAnime.title
    card_body.appendChild(title)
    let btn_detail = document.createElement('button')
    btn_detail.classList.add('btn',
    'btn-outline-warning',
    'mx-3')
    btn_detail.innerHTML = 'Detail'
    flex.appendChild(btn_detail)
    let btn_favoite = document.createElement('button')
    btn_favoite.classList.add('btn',
    'btn-warning',
    'mx-3',
    'my-3')
    flex.appendChild(btn_favoite)
    let icon_favorite = document.createElement('i')
    icon_favorite.classList.add('bi',
    'bi-heart-fill',
    'me-1')
    
    btn_favoite.appendChild(icon_favorite)
    btn_favoite.innerHTML += 'Favorite'

    btn_detail.addEventListener('click' , function(){
        // console.log('detail')
        showDetailAnime(dataAnime);
    })

    let check_active = 0;
    btn_favoite.addEventListener('click', function () {
        if (check_active==0){
            // console.log('changebtn')
            addFavorite (dataAnime)
            btn_favoite.style.color = 'red'
            check_active =1;
            // console.log(check_active)
        }else {
            // console.log('changebtn')
            btn_favoite.style.color = 'black'
            check_active =0;
            // console.log(check_active)
        }
    })
    display_all_anime.appendChild(col)
}

//search anime
document.getElementById('searchButton').addEventListener('click', () => {
    let search = document.getElementById('inputSearch').value
    fetch(`https://api.jikan.moe/v4/anime?q=${search}`)
        .then(response => {
            return response.json()
        }).then(dataAnime => {
            let anime = dataAnime.data
            // console.log(anime)
            display_all_anime.innerHTML = ''
            sectionName('Search',search)
            animeList(anime)
        })
})

function showDetailAnime(dataAnime){
    // console.log(dataAnime)
    let imageDetail = document.getElementById('imageDetail')
    imageDetail.setAttribute('src', dataAnime.images.jpg.large_image_url)
    let ratingDetail = document.getElementById('ratingDetail')
    ratingDetail.innerHTML = dataAnime.rating
    let titleDetail = document.getElementById('titleDetail')
    titleDetail.innerHTML = dataAnime.title
    let type = document.getElementById('type')
    type.innerHTML = dataAnime.type
    let airingDetail = document.getElementById('airingDetail')
    if (dataAnime.airing == true){
        airingDetail.innerHTML = 'Currently Airing'
    }else{
        airingDetail.innerHTML = 'Finished Airing'
    }
    let synopsisDetail = document.getElementById('synopsisDetail')
    synopsisDetail.innerHTML = dataAnime.synopsis
    sectionName('Detail',dataAnime.title)
    
}

function addFavorite (dataAnime){
    console.log(dataAnime)
    
    console.log('dataPost')
    const dataPost = {
    id: 642110329,
    movie: {
        url: dataAnime.url,
        image_url: dataAnime.images.jpg.large_image_url,
        title: dataAnime.title,
        synopsis: dataAnime.synopsis,
        type: dataAnime.type,
        episodes: dataAnime.episodes,
        score: dataAnime.rating,
        rated: dataAnime.rating,
    },
    };
    console.log(dataPost)
    fetch('https://se104-project-backend.du.r.appspot.com/movies',{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(dataPost)
    }).then(response => {
        if(response.status === 200){
            return response.json()
        }else{
            throw Error(response.statusText)
        }

    }).then(data=>{
        console.log('success',data)
        animeTable(dataAnime)
    })
}