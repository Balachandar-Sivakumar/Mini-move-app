let show = document.querySelector('.name > span');
let local = JSON.parse(localStorage.getItem('user')) || [];
let user = local.find(n => n.status === true); 

if (user) {
    show.innerHTML = user.name;
} else {
    window.location.href = 'index.html';
}

let movie_list = document.querySelector('.movie-list'),
      input = document.querySelector('#searchInput');

async function getdatabase(){
 await fetch('https://mimic-server-api.vercel.app/movies',{
    method : "GET",
    headers : {'Content-Type':'application/json'}
 })
 .then(res => res.json())
 .then(data => getdatas(data))
 .catch(error=>console.log(error))
}

getdatabase()
 
    let genredetail={
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
   
  async function getdatas(data){
       try{
        let datas = data;
       
        datas.forEach(ele => {
            let getgerne = ele.genre_ids.map(n=> !n ? '':isNaN(n)?'':genredetail[n]).join(',')
            
            movie_list.innerHTML+=` <div class="movie-card" data-title="Inception">
                <img src="${ele.poster_path ? ele.poster_path : 'Image not available'}" class="movie-poster">
                <label class="movie-title">Title : <p>${ele.original_title}</p></label>
                <label class="language">Language : <p>${ele.original_language=='ta' ? 'Tamil' :'English'}</p></label>
                 <label class="genre">Genre : <p>${getgerne}</p></label>
                 <label class="release">Release Date : <p>${ele.release_date}</p></label>
                 <label class="rating">Rating : <i class="fa-solid fa-star"></i> ${ele.vote_average}/10</label>
                 <label class="adult">Adult Content : ${ele.adult ==true ? ' <i class="fas fa-exclamation-triangle"> </i>  </i> <i class="fas fa-ban"></i> ' : ' <i class="fas fa-user-plus"> </i> <i class="fa-solid fa-check"></i>'}</label>
            </div>`
            genre='';
        });
       }catch(error){console.log(error);}
 }

 async function searching(){
    if(input.value.trim()=='') return getdatabase();
   
   let title = document.querySelectorAll('.movie-title > p');
        movie_list.innerHTML='';
      await title.forEach(n=>{
     if(n.textContent.toLowerCase().includes(input.value.toLowerCase())){
        fetch(`https://mimic-server-api.vercel.app/movies?original_title=${n.textContent}`,{
            method : "GET",
            headers : {"Content-type": 'application/json'}
        })
        .then(res => res.json())
        .then(data => getdatas(data))
        .catch(error=>console.log(error))
      }
   })
 }  
 
 const logout_btn = document.querySelector('.logout');

 logout_btn.addEventListener('click',()=>{
    local= local.map(n => n.status === true ? {...n,status: false}: n);
    localStorage.setItem('user',JSON.stringify(local));
    error_msg('success','logout successfull')
    setTimeout(()=>{window.location.href='index.html'},1000)
 })

setTimeout(()=>{error_msg('success','loggged in successfully'),500})

let err = document.querySelector('.notification');

 function error_msg(clas,content){
    err.classList.add(clas);
    err.innerHTML=content;
    setTimeout(()=>{
        err.classList.remove(clas);
        err.innerHTML=''
    },3000)
}

let data_form = document.querySelector('.movieForm');

function togglebtn(){data_form.classList.toggle('getforms');}

let submitbtn = document.querySelector('.submit_button');
submitbtn.addEventListener('click',(event)=>{
    event.preventDefault();
    console.log('clicking');
    
    add_data_databse()})

async function add_data_databse(){
    let data = {
        "adult": data_form.elements['adult'].checked,
        "backdrop_path": data_form.elements['backdrop_path'].value.trim(),
        "genre_ids": [28, 80, 53], 
        "id": Date.now(),
        "original_language": data_form.elements['original_language'].value.toLowerCase() === 'tamil' ? 'ta' : 'eng',
        "original_title": data_form.elements['original_title'].value.trim(),
        "overview": data_form.elements['overview'].value.trim(),
        "poster_path": data_form.elements['poster_path'].value.trim(),
        "release_date": data_form.elements['release_date'].value,
        "video": data_form.elements['video'].checked,
        "vote_average": parseFloat(data_form.elements['vote_average'].value) || 0,
        "vote_count": parseInt(data_form.elements['vote_count'].value) || 0
    };
   await fetch('https://mimic-server-api.vercel.app/movies',{
        method : 'POST',
        headers:{'Content-Type':'application/json'},
        body : JSON.stringify(data)
    })
    .then(res =>res.json())
    .then(res => getdatabase())
    .catch(error => console.log(error))
}



