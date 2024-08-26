const handleLogout=()=>{
    const token=localStorage.getItem("token")
    if(token){
        fetch("http://127.0.0.1:8000/api/users/logout/",{
            method:"GET",
            headers:{
                'content-type':"application/json",
                "Authorization": `Token ${token}`,  
            }
        })
        .then(res=>res.json())
        .then(data =>{
            if(data.success){
                alert(data.message)
                localStorage.removeItem("token");
            localStorage.removeItem("user_id")
            window.location.href="home.html"
            }else{
                alert(data.message)
            }
            
        })
    }
}