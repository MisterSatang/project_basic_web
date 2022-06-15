//navbar active slide
window.addEventListener("scroll", e => {
  scrollPos = window.scrollY;
  document.getElementById('navbar_active').style.backgroundColor = 'rgb( 17 , 16 , 16 )';
});

// console.log("Start anime Studio")
// console.log("search all movie")

//section name 
function sectionName(section,dataAnime){
    let section_name = document.getElementById('section')
    if(section == 'Search'){ 
        section_name.innerHTML = section+' : '+ dataAnime
    }else if(section == 'Favorite'){
        section_name.innerHTML = 'my '+section
        let heart_favor_icon = document.createElement('div')
        heart_favor_icon.classList.add('bi',
        'bi-heart-fill',
        'ms-2')
        section_name.appendChild(heart_favor_icon)
    }
    else{
        section_name.innerHTML = section
    }
}

function onload(){
    sectionName('ANIME ON SEASONS','none')
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
        animeTable(anime,"animeTable")
    }
}

function dataOutputTable(dataAnime,output){
    let dataOutput = {};
    dataOutput.image
    dataOutput.title = dataAnime.title

    if(output == "animeTable"){
        dataOutput.image = dataAnime.images.jpg.large_image_url
        console.log(dataOutput.image)
    }else if(output == "favorite"){
        dataOutput.image = dataAnime.image_url
    }
    return dataOutput
}

function animeTable(dataAnime,output){
    let dataOutput = dataOutputTable(dataAnime,output)
    // console.log(dataAnime)
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
    image.classList.add('card-img',
    'size-img-card')
    image.setAttribute('src',dataOutput.image)
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
    title.innerHTML = dataOutput.title
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
    
    let check_active = 0;
    if(output == 'animeTable'){
        btn_favoite.innerHTML += 'Add avorite'
        check_active = 0;
    }
    else if(output == 'favorite'){
        btn_favoite.style.color = 'red'
        btn_favoite.innerHTML += 'Favorite'
        check_active = 1;
    }

    btn_detail.addEventListener('click' , function(){
        showDetailAnime(dataAnime);
    })

    btn_favoite.addEventListener('click', function () {
        if (check_active==0){
            addFavorite (dataAnime)
            btn_favoite.style.color = 'red'
            btn_favoite.innerHTML = ''
            btn_favoite.appendChild(icon_favorite)
            btn_favoite.innerHTML += 'Favorite'
            check_active = 1;
        }else {
            btn_favoite.style.color = 'black'
            btn_favoite.innerHTML = ''
            btn_favoite.appendChild(icon_favorite)
            btn_favoite.innerHTML += 'Add Favorite'
            check_active = 0;
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
    })
}

function animefavorite(dataAnime){
    for(anime of dataAnime){
        animeTable(anime,"favorite")
    }
}

//display favorite anime
document.getElementById('btn_favorite').addEventListener('click', () => {
    fetch('https://se104-project-backend.du.r.appspot.com/movies/642110329')
    .then((response)=>{
        return response.json()
    }).then(data => {
        console.log(data)
        sectionName('Favorite',data.title)
        animefavorite(data)
    })
})

//display home
document.getElementById('btn_home').addEventListener('click', () => {
    onload()
})

