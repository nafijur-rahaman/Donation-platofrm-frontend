
function showAlert(message) {
    document.getElementById("alertMessage").textContent = message;
    document.getElementById("customAlert").style.display = "flex";
}

function closeAlert() {
    document.getElementById("customAlert").style.display = "none";
}

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
                showToast(data.message)
                localStorage.removeItem("token");
            localStorage.removeItem("user_id")
            setTimeout(() => {
                      window.location.href="home.html";
            }, 3000);
      
            }else{
                showToast(data.message)
            }
            
        })
    }
}



function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`;
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}
