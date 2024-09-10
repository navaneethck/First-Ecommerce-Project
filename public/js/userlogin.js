const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
signupBtn.onclick = (()=>{
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
});
loginBtn.onclick = (()=>{
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
});
signupLink.onclick = (()=>{
  signupBtn.click();
  return false;
});

// function submitForgotPassword() {
//   const email = document.getElementById('email').value;
//   if (email) {
//     document.getElementById('forgot-password-email').value = email;
//     document.getElementById('forgot-password-form').submit();
//   } else {
//     alert("Please enter your email address.");
//   }
//   fetch 
// }

function submitForgotPassword(){
  const email = document.getElementById('email').value;
  if(!email){
    Swal.fire({
      icon:'Error',
      text:'Please enter the Email id First !'
     });
    return;
  }

  fetch('/forgot-password',{
    method:'POST',
    headers:{
      'content-type':'application/json'
    },
    body:JSON.stringify({email:email})
  })
  .then(response => response.json())
  .then(data =>{
    if (data.success){
      Swal.fire({
       icon:'Success',
       title:'Email sent',
       text:'A password reset email has been sent to your inbox!'
      });
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong. Please try again.'
      });
    }
  })
  .catch(error=>{
    console.error('error:',error)
    alert("There was an error. Please try again.");
  })
   
}