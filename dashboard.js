let show = document.querySelector('.name > span');
let local = JSON.parse(localStorage.getItem('user')) || [];
let user = local.find(n => n.status === true); 

if (user) {
    show.innerHTML = user.name;
} else {
    window.location.href = 'index.html';
}

let movie_list = document.querySelector('.movie-list'),
      input = document.querySelector('#searchInput'),
   moviesdata=[];
function getdatabase(){
  let  getrequest = new XMLHttpRequest();

    getrequest.open('GET','https://mimic-server-api.vercel.app/movies');

    getrequest.onload = ()=>{
        if(getrequest.status==200) return getdatas(getrequest.response),moviesdata=JSON.parse(getrequest.response);
    }
    getrequest.send();
}

getdatabase()

    let genre = '',
        genredetail={
            28:'Action',
            80:'Crime', 
            53:'Thriller',
            18:'Drama', 
            10751:'Family',
            35:'Comedy',
            12:'Adventure',
            14:'Fantasy',
            36:'History',
            10749:'Romance'
        };
   


    function getdatas(data){
        let datas = JSON.parse(data);
       
        datas.forEach(ele => {
            if(ele.genre_ids){
                ele.genre_ids.forEach(n=>{
                    genre+=genredetail[n]+' ';
                })
            }
            movie_list.innerHTML+=` <div class="movie-card" data-title="Inception">
                <img src="${ele.poster_path ? ele.poster_path : 'Image not available'}" class="movie-poster">
                <label class="movie-title">Title : <p>${ele.original_title}</p></label>
                <label class="language">Language : <p>${ele.original_language=='ta' ? 'Tamil' :'English'}</p></label>
                 <label class="genre">Genre : <p>${genre}</p></label>
                 <label class="release">Release Date : <p>${ele.release_date}</p></label>
                 <label class="rating">Rating : <i class="fa-solid fa-star"></i> ${ele.vote_average}/10</label>
                 <label class="adult">Adult Content : ${ele.adult ==true ? ' <i class="fas fa-exclamation-triangle"> </i>  </i> <i class="fas fa-ban"></i> ' : ' <i class="fas fa-user-plus"> </i> <i class="fa-solid fa-check"></i>'}</label>
            </div>`
            genre='';
        });
        
    }

 function searching(){
    if(input.value.trim()=='') return getdatabase();
   let title = document.querySelectorAll('.movie-title > p');
        movie_list.innerHTML='';
   title.forEach(n=>{
      if(n.textContent.toLowerCase().includes(input.value.toLowerCase())){
        console.log(n.textContent,'bala');
        
        let loadrequest = new XMLHttpRequest()
        loadrequest.open('GET',`https://mimic-server-api.vercel.app/movies?original_title=${n.textContent}`)
        loadrequest.onload = ()=>{
             return getdatas(loadrequest.response)
        }
        loadrequest.send()
      }
   })
 }   

