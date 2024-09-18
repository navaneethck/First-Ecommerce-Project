document.getElementById('reset-password-form').addEventListener('submit',function(event){
    event.preventDefault();

    const formData=new FormData(this);
    const newPassword=formData.get('newPassword');
    const confirmPassword=formData.get('confirmPassword');
    const token = formData.get('token');

    const data = {newPassword,confirmPassword};
    console.log(token);
    fetch(`/reset-password?token=${token}`,{
        method:'POST',
        headers:{'content-Type':'application/json'},
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if(result.success){
            Swal.fire('success','password updated successfully!','success').then(() =>{
                setTimeout(()=>{
                   window.location.href='/profile';
                },500);
                
            });
        }else{
            Swal.fire('Error',result.message,'error')
        }
    })
    .catch((error)=>{
        console.log(error)
        Swal.fire('Error','something went wrong try again later','error')
    });
});