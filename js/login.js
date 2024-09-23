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



function handleLogin(event) {
    event.preventDefault();
    
    const role = document.getElementById('role').value;
    const email =getValue("email");
    const password=getValue("password");
  
    if (!role) {
      alert("Please select a role.");
      return;
    }
  
    if (role === 'manager') {
    
        if (email && password){
            document.getElementById("spinner").style.display = 'block';
            fetch("https://donation-platform-backend-psi.vercel.app/api/manager/login/",{
                method:"POST",
                headers:{"content-type":"application/json"},
                body:JSON.stringify({email,password})
            })
            .then(res => res.json())
            .then(data =>{
                if(data.token&&data.user_id){
                    localStorage.setItem("admin_token",data.token);
                    localStorage.setItem("user_id",data.user_id);
                    su_showAlert("Login successful");
                    setTimeout(() => {
                        window.location.href = "admin.html";
                    }, 2000);
                }else{
                    showAlert("Login failed! Please check you credentials")
                    document.getElementById("spinner").style.display = 'none';
                }
            })
            .catch(error => {
                // Hide the spinner in case of an error
                document.getElementById("spinner").style.display = 'none';
                showAlert("An error occurred. Please try again.");
                console.error('Error:', error);
            });
        }else{
            showAlert("Please enter both email and password.");
        }
    
    } else if (role === 'user') {
     
        if (email && password){
            document.getElementById("spinner").style.display = 'block';
            fetch("https://donation-platform-backend-psi.vercel.app/api/users/login/",{
                method:"POST",
                headers:{"content-type":"application/json"},
                body:JSON.stringify({email,password})
            })
            .then(res => res.json())
            .then(data =>{
                if(data.token&&data.user_id){
                    localStorage.setItem("token",data.token);
                    localStorage.setItem("user_id",data.user_id);
                    su_showAlert("Login successful");
                    setTimeout(() => {
                        window.location.href = "profile.html";
                    }, 2000);
                }else{
                    showAlert("Login failed! Please check you credentials")
                    document.getElementById("spinner").style.display = 'none';
                }
            })
            .catch(error => {
              
                document.getElementById("spinner").style.display = 'none';
                showAlert("An error occurred. Please try again.");
                console.error('Error:', error);
            });
        }else{
            showAlert("Please enter both email and password.");
        }
    
    }
    
  
  }
  




const getValue =(id)=>{
    return document.getElementById(id).value;
}



