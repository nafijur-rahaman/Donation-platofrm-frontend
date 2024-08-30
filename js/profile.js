function showAlert(message) {
    document.getElementById("alertMessage").textContent = message;
    document.getElementById("customAlert").style.display = "flex";
}

function closeAlert() {
    document.getElementById("customAlert").style.display = "none";
}




const handleProfile = () => {
    const user_id = localStorage.getItem("user_id")

    fetch(`http://127.0.0.1:8000/api/users/list/${user_id}`)
        .then(res => res.json())
        .then(data => {
            const user = data;
            const div = document.getElementById("profile-card")

            div.innerHTML = `
    
                <img class="w-64 h-64 object-cover mx-auto rounded-full"
                src="${user.image}"
                alt="Profile Picture">


              </div>
              <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">${user.first_name} ${user.last_name}</h1>
              <h3 class="text-gray-600 font-lg text-semibold leading-6">${user.profession}</h3>
              <p class="text-sm text-gray-500 hover:text-gray-600 leading-6">
              ${user.bio}
              </p>
              <ul class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                  <li class="flex items-center py-3">
                      <span>Status</span>
                      <span class="ml-auto"><span
                              class="bg-blue-500 py-1 px-2 rounded text-white text-sm">${user.status}</span></span>
                  </li>
                  <li class="flex items-center py-3">
                      <span>Member since</span>
                      <span class="ml-auto">${user.created}</span>
                  </li>
              </ul>
    
    `
            const section = document.getElementById("profile-about")
            section.innerHTML = `

<div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                  <span class="text-blue-500">
                      <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M5.121 17.804A13.937 13.937 0 0112 15c2.045 0 3.987.307 5.878.804M19 10V5a2 2 0 00-2-2h-1a2 2 0 00-2 2v1M5 10V5a2 2 0 012-2h1a2 2 0 012 2v1m0 9v5a2 2 0 002 2h4a2 2 0 002-2v-5M12 15v2m0 4h.01" />
                      </svg>
                  </span>
                  <span class="tracking-wide">About</span>
              </div>
              <div>
                  <div class="text-gray-700">
                      <div class="grid md:grid-cols-2 text-sm">
                          <div class="grid grid-cols-2">
                              <div class="px-4 py-2 font-semibold">Full Name</div>
                              <div class="px-4 py-2">${user.first_name}  ${user.last_name}</div>
                          </div>
                          <div class="grid grid-cols-2">
                              <div class="px-4 py-2 font-semibold">Email</div>
                              <div class="px-4 py-2">
                                  <a class="text-blue-500 hover:underline" href="mailto:${user.email}">${user.email}</a>
                              </div>
                          </div>
                          <div class="grid grid-cols-2">
                              <div class="px-4 py-2 font-semibold">Phone</div>
                              <div class="px-4 py-2">${user.phone_number}</div>
                          </div>
                          <div class="grid grid-cols-2">
                              <div class="px-4 py-2 font-semibold">Address</div>
                              <div class="px-4 py-2">${user.address}</div>
                          </div>
                      </div>
                  </div>
              </div>
            


`



        })
}


handleProfile()



const handleFundraiser = (event) => {
    const user_id = window.localStorage.getItem("user_id");
    const token = window.localStorage.getItem("token");
    event.preventDefault();


    const organization = getValue('organization');
    const experience_years = getValue("work");
    const service_areas = getValue('service');
    const message = getValue("message");


    const info = new FormData();
    info.append("user", user_id);
    info.append("organization", organization);
    info.append("experience_years", experience_years);
    info.append("service_areas", service_areas);
    info.append("message", message)



    fetch("http://127.0.0.1:8000/api/campaign/creator-request/", {

        method: "POST",
        body: info,
        headers: {
            Authorization: `Token ${token}`,
        },

    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                const form = document.getElementById('fund_raiser_form');
                showAlert(data.message);
                setTimeout(() => {
                    window.location.reload();
                }, 2000);

            } else {
                showAlert('A error happened')
            }
        })

}

const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('f-closeModalBtn');
const cancelModalBtn = document.getElementById('cancelModalBtn');
const fundraiserModal = document.getElementById('fundraiserModal');

if (openModalBtn && fundraiserModal) {
    openModalBtn.addEventListener('click', () => {
        fundraiserModal.classList.remove('hidden');
    });
}

if (closeModalBtn && fundraiserModal) {
    closeModalBtn.addEventListener('click', () => {
        fundraiserModal.classList.add('hidden');
    });
}

if (cancelModalBtn && fundraiserModal) {
    cancelModalBtn.addEventListener('click', () => {
        fundraiserModal.classList.add('hidden');
    });
}

const fundRaiser = () => {
    const user_id = window.localStorage.getItem("user_id");
    fetch(`http://127.0.0.1:8000/api/campaign/creator/?user_id= ${user_id}`)
    .then(res =>{
        if(!res.ok){
            throw new Error("You are not a creator");
        }
        return res.json();
    })
    .then(data=>{
        if(data[0] && data[0].id){
            const modal = document.getElementById("openModalBtn");
            modal.classList.add("hidden")

            let a = document.createElement("a");
            a.textContent = "Go to fundraiser Workspace";
            a.style.textDecoration = "none";
            a.style.textAlign = "center";
            a.href = "fundraiser_workspace.html"; 
            a.classList.add(
                "block",
                "w-full",
                "text-white",
                "bg-green-500",
                "text-sm",
                "font-semibold",
                "rounded-lg",
                "hover:bg-green-700",
                "focus:outline-none",
                "focus:shadow-outline",
                "focus:bg-green-700",
                "hover:shadow-xs",
                "p-3",
                "my-2"
            );

            const action = document.getElementById("profile-action");
            action.appendChild(a);

        }
    })
    .catch(error => showAlert(error))

};

fundRaiser()





const getValue = (id) => {
    const value = document.getElementById(id).value;
    return value;
};


const loadDonation=()=>{
    const user_id=localStorage.getItem("user_id");
    fetch(`http://127.0.0.1:8000/api/transactions/list/?user=${user_id}`)
    .then(res =>{
        if(!res.ok){
            throw new Error("No user found!");  
        }
        return res.json()
    })
    .then(data =>{
        if(data.results){
            data.results.forEach(donation => {
                const userDonor=document.getElementById("user-donor");
                const li=document.createElement("li")
                li.innerHTML=`
                
                              <div class="text-blue-500"> ${donation.campaign_name} </div>
                              <div class="text-gray-500 text-sm">Donated: ${donation.amount} | Date: ${donation.created_at} </div>
               
                `
                userDonor.appendChild(li);
               });
        }
      
    })
    .catch(error=>showAlert(error))
}

loadDonation()

// password change js


document.getElementById('changePasswordForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const oldPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const newPasswordConfirm = document.getElementById('confirm-password').value;
    const token=localStorage.getItem("token")

    if(newPassword===newPasswordConfirm){

        if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(newPassword)){
          
            fetch("http://127.0.0.1:8000/api/users/change-password/",{
                method: 'PUT',
                headers: {
               'Content-Type': 'application/json',
               'Authorization': `Token ${token}`  
                                            },
                body: JSON.stringify({
                    old_password: oldPassword,
                    new_password: newPassword,
                    new_password_confirm: newPasswordConfirm
                })

            })
            .then(res=>{
                
                if (!res.ok) {
                
                    return res.json().then(errorData => {
                        // Extract error messages
                        let errorMessage = 'Unknown error';
                        if (errorData.old_password && Array.isArray(errorData.old_password)) {
                            errorMessage = errorData.old_password.join(' '); 
                        }
                        
                        showToast(`Password change failed: ${errorMessage}`);
                    });


                }else{
                    showToast("Password change successfully");
                    setTimeout(() => {
                       window.location.reload();
                    }, 3000);
                }
                
            })





        }else{
            showToast("Password must contain at least 8 characters, at least one letter, one number, and one special character.")
        }

   




    }else{
        showToast("password doesn't match");
    }


})


// profile change

document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('profileModal');
    const editProfileBtn = document.getElementById('editProfileBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const form = document.getElementById('profileForm');
    const submitButton = document.getElementById('submitBtn');
    

    function fillFormWithExistingData() {
        const user_id=localStorage.getItem("user_id");
        const token=localStorage.getItem("token");
        fetch(`http://127.0.0.1:8000/api/users/list/${user_id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`  
            }
        })
        .then(res=>{
            if(!res.ok){
                throw new Error("Error fetching profile data")
            }
            return res.json();
        })
        .then(data => {
            // console.log(data)
         
                document.getElementById('first_name').value = data.first_name;
                document.getElementById('last_name').value = data.last_name;
                document.getElementById('h-username').value = data.username;
                document.getElementById('username').value = data.username;
                document.getElementById('email').value = data.email;
                document.getElementById('h-email').value = data.email;
                document.getElementById('profession').value = data.profession;
                document.getElementById('phone_number').value = data.phone_number;
                document.getElementById('bio').value = data.bio;
                document.getElementById('address').value = data.address;
               
           
        })
        .catch(error => {
            
            showToast(error);
        });
    }

  
    editProfileBtn.addEventListener('click', function () {
        modal.classList.remove('hidden');
        fillFormWithExistingData();
    });

  
    closeModalBtn.addEventListener('click', function () {
        modal.classList.add('hidden');
    });


    window.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });


    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const user_id = localStorage.getItem("user_id");
        const token = localStorage.getItem("token");
    
    const firstName = document.getElementById('first_name').value;
    const lastName = document.getElementById('last_name').value;
    const profession = document.getElementById('profession').value;
    const phoneNumber = document.getElementById('phone_number').value;
    const bio = document.getElementById('bio').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('h-email').value;
    const username = document.getElementById('h-username').value;
    console.log(email)
    console.log(username)
    
        if (firstName === '' || lastName === '') {
            showToast('Please fill out all required fields.', 'error');
            return;
        }
    
        if (phoneNumber && phoneNumber.length !== 11) {
            showToast('Phone number must be 11 digits.', 'error');
            return;
        }
    
        submitButton.disabled = true;
        submitButton.textContent = 'Updating...';
    
        const formData = new FormData(form);
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('profession', profession);
        formData.append('phone_number', phoneNumber);
        formData.append('bio', bio);
        formData.append('address', address);
        formData.append('email', email); 
        formData.append('username', username); 
        fetch(`http://127.0.0.1:8000/api/users/list/${user_id}/`, {
            method: 'PUT',
            body: formData,
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        .then(res => {
            if (!res.ok) {
                return res.text().then(text => {
                    throw new Error(text || "Error fetching profile data");
                });
            }
            return res.json();
        })
        .then(data => {
            submitButton.disabled = false;
            submitButton.textContent = 'Update Profile';
            showToast('Profile updated successfully!');
            modal.classList.add('hidden');
            setTimeout(() => {
                window.location.reload(); 
            }, 3000);
        })
        .catch(error => {
            submitButton.disabled = false;
            submitButton.textContent = 'Update Profile';
            showToast(error.message || 'An unexpected error occurred.');
        });
    });
    

    
    
});


function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`;
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

