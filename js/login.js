function showAlert(message) {
    document.getElementById("alertMessage").textContent = message;
    document.getElementById("customAlert").style.display = "flex";
}

function closeAlert() {
    document.getElementById("customAlert").style.display = "none";
}


const handleLogin =(event)=>{
    event.preventDefault();

    const email =getValue("email");
    const password=getValue("password");

    if (email && password){
        document.getElementById("spinner").style.display = 'block';
        fetch("http://127.0.0.1:8000/api/users/login/",{
            method:"POST",
            headers:{"content-type":"application/json"},
            body:JSON.stringify({email,password})
        })
        .then(res => res.json())
        .then(data =>{
            if(data.token&&data.user_id){
                localStorage.setItem("token",data.token);
                localStorage.setItem("user_id",data.user_id);
                showAlert("Login successful");
                setTimeout(() => {
                    window.location.href = "profile.html";
                }, 3000);
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


}



const getValue =(id)=>{
    return document.getElementById(id).value;
}