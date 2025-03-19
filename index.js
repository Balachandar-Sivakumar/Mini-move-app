let email = document.querySelector('#email'),
    password = document.querySelector('#password'),
    local = JSON.parse(localStorage.getItem('user')) || [],
    loginbtn = document.querySelector('#submit'),
    err = document.querySelector('.notification'),
    forms = document.querySelector('form');

    loginbtn.addEventListener('click',(event)=>{
        event.preventDefault();
        let emailcheck = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value);
        if(email.value.trim()==='') return error_msg('error','Email field does not empty');
        if(!emailcheck) return error_msg('error','Invalid email');
        if(password.value.trim()==='') return error_msg('error', 'Please Enter password'); 
        return email_checking();
    })

    function error_msg(clas,content){
        err.classList.add(clas);
        err.innerHTML=content;
        setTimeout(()=>{
            err.classList.remove(clas);
            err.innerHTML='';
           
        },2000)
    }
    
    function email_checking(){
      let result = local.find(n=> n.email==email.value && n.password==password.value);
     if(!result) return error_msg('error','User not found');
     error_msg('success','Loged in successfully');
     forms.reset();
     setTimeout(()=>{  window.location.href='dashboard.html'},500)
    };
    