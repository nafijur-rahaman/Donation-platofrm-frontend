function showAlert(message) {
    document.getElementById("alertMessage").textContent = message;
    document.getElementById("customAlert").style.display = "flex";
}

function closeAlert() {
    document.getElementById("customAlert").style.display = "none";
}
const handleRegistration =(event) =>{
event.preventDefault();

const username = getValue("username");
const first_name=getValue('first_name');
const last_name=getValue('last_name');
const email=getValue('email');
const image = document.getElementById("image").files[0];
const profession=getValue("profession");
const address=getValue("address");
const phone=getValue("phone");
const bio=getValue("bio");
const password=getValue('password');
const confirm_password=getValue('confirm_password');


const info=new FormData();
info.append('username', username);
info.append('first_name', first_name);
info.append('last_name', last_name);
info.append('email', email);
info.append('image',image)
info.append('bio',bio);
info.append('profession',profession);
info.append('phone_number',phone);
info.append('address',address);
info.append('password', password);
info.append('confirm_password', confirm_password);




document.getElementById("username_error").innerText = "";
document.getElementById("email_error").innerText = "";
document.getElementById("password_error").innerText = "";
if(password===confirm_password){
    if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)){
        document.getElementById("spinner").style.display = 'block';
        fetch('http://127.0.0.1:8000/api/users/register/',{
            method:"POST",
            body:info,
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            if(data.success){
                document.getElementById("spinner").style.display = 'none';
                showAlert(data.message);
                setTimeout(() => {
                    window.location.href = "login.html";
                }, 3000);
                
            }else{
                document.getElementById("spinner").style.display = 'none';
                if (data.message.username) {
                    document.getElementById("username_error").innerText = data.message.username[0];
                }
                if (data.message.email) {
                    document.getElementById("email_error").innerText = data.message.email[0];
                }
                if (data.message.password) {
                    document.getElementById("password_error").innerText = data.message.password[0];
                }
            }
          
        })
        // .catch(error => {
        //     document.getElementById("spinner").style.display = 'none';
        //     showAlert("An error occurred. Please try again.");
        //     console.error('Error:', error);
        // });
    }else{
        const p=document.getElementById("password_error").innerText="Password must contain at least 8 characters, at least one letter, one number, and one special character."
    }
}else{
const p=document.getElementById("password_error").innerText="Password don't match"

}

};



const getValue = (id) => {
    const value = document.getElementById(id).value;
    return value;
};