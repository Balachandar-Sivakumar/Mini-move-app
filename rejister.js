let username = document.querySelector('#name'),
    emails = document.querySelector('#email'),
    pass = document.querySelector('#password'),
    conpass = document.querySelector('#confirm-password'),
    sumit_btn = document.querySelector('.submit_button');
    

 let err = document.querySelector('.notification'),
    local = JSON.parse(localStorage.getItem('user')) || [],
    form = document.querySelector('form'),
    checkbox = document.getElementById('terms'),

    statuscheck = local.find(n=> n.status == true );
     if(statuscheck) window.location.href='dashboard.html'
 
 sumit_btn.addEventListener('click',(event)=>{
    event.preventDefault();
    if(username.value.trim()==='')return error_msg('error', 'Please enter user name');
    let emailcheck = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emails.value);
    if(emails.value.trim()==='') return error_msg('error','Email field does not empty');
    if(!emailcheck) return error_msg('error','Invalid email');
    if(pass.value.trim()==='') return error_msg('error', 'Please Enter password');  
    if(conpass.value !== pass.value) return error_msg('error', "Password does not match");
    if(!checkbox.checked) return error_msg('error','Please accept the terms and conditions');

    email_checking();
    
 })

function useradd(){
    let data = {
        id : Math.floor(Math.random()*9000+1000),
        name : username.value,
        email : emails.value,
        password : pass.value
    }

    local.push(data)
    localStorage.setItem('user',JSON.stringify(local));
    form.reset();
    error_msg('success','User added successfully');
    setTimeout(()=>{window.location.href='index.html'},2000);
}

function error_msg(clas,content){
    err.classList.add(clas);
    err.innerHTML=content;
    setTimeout(()=>{
        err.classList.remove(clas);
        err.innerHTML=''
    },3000)
}

function email_checking(){
    let result = local.find(n=> n.email===email.value)
    if(result) return error_msg('error','Email id already exist');

    useradd();
}