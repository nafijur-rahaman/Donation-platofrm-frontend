function showAlert(message) {
    document.getElementById("alertMessage").textContent = message;
    document.getElementById("customAlert").style.display = "flex";
  }
  
  function su_showAlert(message) {
    document.getElementById("s-alertMessage").textContent = message;
    document.getElementById("s-customAlert").style.display = "flex";
  }
  
  function closeErrorAlert() {
    document.getElementById("customAlert").style.display = "none";
  }
  
  function closeSuccessAlert() {
    document.getElementById("s-customAlert").style.display = "none";
  }




const handleLogout=()=>{
    const token=localStorage.getItem("token")
    if(token){
        fetch("https://donation-platform-backend-rmqk.onrender.com/api/users/logout/",{
            method:"GET",
            headers:{
                'content-type':"application/json",
                "Authorization": `Token ${token}`,  
            }
        })
        .then(res=>res.json())
        .then(data =>{
            if(data.success){
                su_showAlert(data.message)
                localStorage.removeItem("token");
            localStorage.removeItem("user_id")
            setTimeout(() => {
                      window.location.href="home.html";
            }, 1000);
      
            }else{
                showAlert(data.message)
            }
            
        })
    }
}
const handleAdminLogout=()=>{
    const token=localStorage.getItem("admin_token")
    if(token){
        fetch("https://donation-platform-backend-rmqk.onrender.com/api/manager/logout/",{
            method:"GET",
            headers:{
                'content-type':"application/json",
                "Authorization": `Token ${token}`,  
            }
        })
        .then(res=>res.json())
        .then(data =>{
            if(data.success){
                su_showAlert(data.message)
                localStorage.removeItem("admin_token");
            localStorage.removeItem("user_id")
            setTimeout(() => {
                      window.location.href="home.html";
            }, 1000);
      
            }else{
                showAlert(data.message)
            }
            
        })
    }
}



