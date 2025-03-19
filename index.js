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
        let statuscheck = local.find(n=> n.status == true );
        if(statuscheck)  return statcheck(statuscheck);
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
    let result = null;
    function email_checking(){
     result = local.find(n=> n.email==email.value && n.password==password.value);
    if(!result) return error_msg('error','User not found');
      local = local.map(n=> n.email== email.value ? {...n,status : true}: n)
      localStorage.setItem('user',JSON.stringify(local))
     error_msg('success','Loged in successfully');
     forms.reset();
     setTimeout(()=>{  window.location.href='dashboard.html'},500)
    };

  function statcheck(check){
 
     if(check.email==email.value){
        error_msg('success','User already loged in');
        forms.reset();
      return setTimeout(()=>{  window.location.href='dashboard.html'},500)
     }
     error_msg('error','some user already loged in your device')
  } 