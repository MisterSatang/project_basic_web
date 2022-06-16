//navbar active slide
window.addEventListener("scroll", e => {
  scrollPos = window.scrollY;
  document.getElementById('navbar_active').style.backgroundColor = 'rgb( 17 , 16 , 16 )';
});
document.getElementById('navbar-toggler-click').addEventListener('click', (event) => {
    document.getElementById('navbar_active').style.backgroundColor = 'rgb( 17 , 16 , 16 )';
})

// console.log("Start anime Studio")
// console.log("search all movie")

function countFavorite(){
    fetch('https://se104-project-backend.du.r.appspot.com/movies/642110329')
    .then((response)=>{
        return response.json()
    }).then(dataFavorite => {
        document.getElementById('count_favorite').innerHTML=dataFavorite.length;
    })
}


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
    hideAll()
    fetchData()
    countFavorite()
}
function fetchData(){
    fetch('https://api.jikan.moe/v4/seasons/now')
    .then((response) => {
        return response.json()
    }).then(dataAnime => {
        // console.log(dataAnime.data)
        sectionName()
        animeList(dataAnime.data,'animeTable')
    })
}

function animeList(dataAnime,output){
    show_display_anime()
    for(anime of dataAnime){
        if(output == 'search'){
            animeTable(anime,'search')
        }else{
            sectionName('ANIME ON SEASONS','none')
            animeTable(anime,'animeTable')
        }
    }
}

function dataOutputTable(dataAnime,output){
    let dataOutput = {};
    dataOutput.image
    dataOutput.title = dataAnime.title

    if(output == 'animeTable' || output == 'search'){
        dataOutput.image = dataAnime.images.jpg.large_image_url
    }else if(output == 'favorite'){
        dataOutput.image = dataAnime.image_url
    }
    return dataOutput
}


var displayAnimeCol = document.getElementById('displayAnimeCol')
var displayAnimeFavorite = document.getElementById('displayAnimeFavorite')

function animeTable(dataAnime,output){
    let dataOutput = dataOutputTable(dataAnime,output)
    // console.log(dataAnime)
    
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
    'overlay',)
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

    btn_detail.addEventListener('click' , function(){
        showDetailAnime(dataAnime,output);
    })

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


    
    let check_active = 0
    if(output == 'animeTable' || output == 'search'){
        fetch('https://se104-project-backend.du.r.appspot.com/movies/642110329')
        .then(response => {
        return response.json()
        .then(dataFavorite => {
                for (favorite of dataFavorite) {
                    if (favorite.title == dataAnime.title) {
                        
                        // console.log(favorite)
                        btn_favoite.style.color = 'red'
                        btn_favoite.innerHTML = ''
                        btn_favoite.appendChild(icon_favorite)
                        btn_favoite.innerHTML += 'Favorite'
                        check_active = 1;
                        // console.log('red')
                        // console.log(favorite.title)
                        // console.log(favorite.id)
                        break;         
                    }else{
                        check_active = 0;
                    }
                }
                if(check_active == 0){
                    btn_favoite.appendChild(icon_favorite)
                    btn_favoite.innerHTML += 'Add Favorite'
                }
            })
        })
        btn_favoite.addEventListener('click', function () {
        if (check_active==0){
            let confirmButton = confirm(`Confirm Add \n- ${dataAnime.title} form your favorites`)
            if (confirmButton) {
                addFavorite (dataAnime,output)
                alert(`Add anime : ${dataAnime.title} is success`)
                check_active = 1;
            }
        }else {
        }
    })
    }
    else if(output == 'favorite'){
        btn_favoite.appendChild(icon_favorite)
        btn_favoite.style.color = 'red'
        btn_favoite.innerHTML += 'Favorite'
        check_active = 1;
        btn_favoite.addEventListener('click' , function(){
            // console.log(dataAnime.id)
            let confirmButton = confirm(`Confirm Delete \n- ${dataAnime.title} form your favorites`)
            if (confirmButton) {
                deleteAnimeFavorite(dataAnime.id)
            }
        })        
    }

    if(output == 'favorite'){
        displayAnimeFavorite.appendChild(col)
    }else{
        displayAnimeCol.appendChild(col)
    }

}

//search anime
document.getElementById('searchButton').addEventListener('click', (event) => {
    searchAnime()
})
document.getElementById('inputSearch').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      searchAnime()
    }
});

function searchAnime(){
    let search = document.getElementById('inputSearch').value
    fetch(`https://api.jikan.moe/v4/anime?q=${search}`)
        .then(response => {
            return response.json()
        }).then(dataAnime => {
            let anime = dataAnime.data
            // console.log(anime)
            sectionName('Search',search)
            animeList(anime,'search')
        })
}

function dataOutputDetailAnime(dataAnime,output){
    let dataOutput = {};
    dataOutput.image
    dataOutput.rating
    dataOutput.title = dataAnime.title
    dataOutput.type = dataAnime.type
    dataOutput.score = dataAnime.score
    dataOutput.synopsis = dataAnime.synopsis

    if(output == "animeTable"){
        dataOutput.image = dataAnime.images.jpg.large_image_url
        dataOutput.rating = dataAnime.rating
    }else if(output == "favorite"){
        dataOutput.image = dataAnime.image_url
        dataOutput.rating = dataAnime.rated
    }
    return dataOutput
}

function showDetailAnime(dataAnime,output){
    let dataOutput = dataOutputDetailAnime(dataAnime,output)
    // console.log(dataAnime)
    let imageDetail = document.getElementById('imageDetail')
    imageDetail.setAttribute('src',dataOutput.image)
    let ratingDetail = document.getElementById('ratingDetail')
    ratingDetail.innerHTML = dataOutput.rating
    let titleDetail = document.getElementById('titleDetail')
    titleDetail.innerHTML = dataOutput.title
    let type = document.getElementById('type')
    type.innerHTML = dataOutput.type
    let scoreDetail = document.getElementById('scoreDetail')
    scoreDetail.innerHTML = dataOutput.score
    let synopsisDetail = document.getElementById('synopsisDetail')
    synopsisDetail.innerHTML = dataOutput.synopsis

    show_display_detail();
    sectionName('Detail',dataAnime.title)
    
}

function addFavorite (dataAnime,output){
    // console.log(dataAnime)
    
    // console.log('dataPost')
    const dataPost = {
    id: 642110329,
    movie: {
        url: dataAnime.url,
        image_url: dataAnime.images.jpg.large_image_url,
        title: dataAnime.title,
        synopsis: dataAnime.synopsis,
        type: dataAnime.type,
        episodes: dataAnime.episodes,
        score: dataAnime.score,
        rated: dataAnime.rating,
        airing: dataAnime.airing,
    },
    };
    // console.log(dataPost)
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
        // console.log('success',data)
        if(output == 'animeTable'){
            sectionName('ANIME ON SEASONS','none')
            fetchData();
        }else if(output == 'search'){
            searchAnime()
        }
    })
}

function animefavorite(dataAnime){
    for(anime of dataAnime){
        animeTable(anime,"favorite")
    }
}

//display favorite anime
document.getElementById('btn_favorite').addEventListener('click', (event) => {
    fetchFavorite()
})

function fetchFavorite(){
    fetch('https://se104-project-backend.du.r.appspot.com/movies/642110329')
    .then((response)=>{
        return response.json()
    }).then(data => {
        // console.log(data)
        show_display_Favorite()
        sectionName('Favorite',data.title)
        animefavorite(data)
    })
}


function deleteAnimeFavorite(id) {
    fetch(`https://se104-project-backend.du.r.appspot.com/movie?id=642110329&&movieId=${id}`, {
        method: 'DELETE'
    }).then(response => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw Error(response.statusText)
        }
    }).then(data => {
        alert(`Anime ${data.title} is deleted`)
        fetch('https://se104-project-backend.du.r.appspot.com/movies/642110329')
        .then(response => {
            return response.json().then(data => {
                // console.log(data)
                fetchFavorite()
            })
        })
    }).catch(error => {
        alert('your anime id is not in the database')
    })
}

//display home
document.getElementById('btn_home').addEventListener('click',(event)=>{
    onload()
})
document.getElementById('logo_home').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      onload()
    }
})


var display_anime = document.getElementById('display_anime')
var display_detail = document.getElementById('display_detail')

function hideAll(){
    countFavorite()
    display_anime.style.display='none'

    displayAnimeCol.style.display='none'
    displayAnimeFavorite.style.display='none'

    displayAnimeCol.innerHTML =''
    displayAnimeFavorite.innerHTML =''
    
    display_detail.style.display='none'
}

function show_display_anime(){
    hideAll()
    display_anime.style.display='block'
    displayAnimeCol.style.display='inline-flex'
}

function show_display_Favorite(){
    hideAll()
    display_anime.style.display='block'
    displayAnimeFavorite.style.display='inline-flex'
}

function show_display_detail(){
    hideAll()
    display_detail.style.display='block'
}
