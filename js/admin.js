function showAlert(message) {
    document.getElementById("alertMessage").textContent = message;
    document.getElementById("customAlert").style.display = "flex";
}

function closeAlert() {
    document.getElementById("customAlert").style.display = "none";
}


document.addEventListener('DOMContentLoaded', function() {
    const notificationsButton = document.getElementById('notificationsButton');
    const notificationsDropdown = document.getElementById('notificationsDropdown');
    const notificationsList = document.getElementById('notificationsList');
    const notificationCount = document.getElementById('notificationCount');
    const unreadCount = document.getElementById('unreadCount');  
    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');
    let currentPage = 1;
    const token = localStorage.getItem("admin_token");

    function fetchUnreadCount() {
        fetch('http://127.0.0.1:8000/api/notification/unread-count/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.unread_count !== undefined) {
                unreadCount.textContent = `Unread: ${data.unread_count}`;
            } else {
                console.error('Unread count not found in response:', data);
            }
        })
        .catch(error => console.error('Error fetching unread count:', error));
    }

    function fetchNotifications(page = 1) {
        fetch(`http://127.0.0.1:8000/api/notification/list/?page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            }
        })
        .then(response => response.json())
        .then(data => {
            notificationsList.innerHTML = '';
            let unreadNotificationsCount = 0;

            if (data.length > 0) {
                notificationCount.textContent = data.length;

                data.forEach((notification, index) => {
                    const li = document.createElement('li');
                    li.dataset.notificationId = notification.id;
                    li.classList.add('p-2', 'mb-1', 'border-b', 'border-gray-200');

                    li.textContent = `${index + 1 + (page - 1) * 10}. ${notification.message}`;

                    if (notification.is_read) {
                        li.classList.add('bg-green-100');
                    } else {
                        li.classList.add('bg-red-100');
                        unreadNotificationsCount++;

                        const markReadButton = document.createElement('button');
                        markReadButton.textContent = 'Mark as Read';
                        markReadButton.classList.add('text-blue-500', 'ml-2');

                        markReadButton.addEventListener('click', function() {
                            markAsRead(notification.id, li);
                        });

                        li.appendChild(markReadButton);
                    }

                    notificationsList.appendChild(li);
                });

                unreadCount.textContent = `Unread: ${unreadNotificationsCount}`;

                prevButton.disabled = !data.previous;
                nextButton.disabled = !data.next;
                prevButton.dataset.page = data.previous ? page - 1 : page;
                nextButton.dataset.page = data.next ? page + 1 : page;
            } else {
                notificationCount.textContent = 0;
                const li = document.createElement('li');
                li.textContent = 'No notifications available.';
                li.classList.add('text-gray-500', 'p-4');
                notificationsList.appendChild(li);

                unreadCount.textContent = 'Unread: 0';
            }
        })
        .catch(error => console.error('Error fetching notifications:', error));
    }

    function markAsRead(notificationId, listItem) {
        fetch(`http://127.0.0.1:8000/api/notification/notifications/${notificationId}/read/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            }
        })
        .then(response => {
            if (response.ok) {
                listItem.classList.remove('bg-red-100');
                listItem.classList.add('bg-green-100');
                const button = listItem.querySelector('button');
                if (button) button.remove();
                notificationCount.textContent = parseInt(notificationCount.textContent) - 1;
                fetchUnreadCount();
            } else {
                console.error('Failed to mark notification as read');
            }
        })
        .catch(error => console.error('Error marking notification as read:', error));
    }

    function changePage(event) {
        const page = event.target.dataset.page;
        if (page) {
            currentPage = parseInt(page);
            fetchNotifications(currentPage);
        }
    }

    prevButton.addEventListener('click', changePage);
    nextButton.addEventListener('click', changePage);

    notificationsButton.addEventListener('click', () => {
        notificationsDropdown.classList.toggle('hidden');
        fetchNotifications(currentPage);
    });

    fetchNotifications(currentPage);
    fetchUnreadCount();
});



const loadDashboard =()=>{
    // campaign load
    fetch("http://127.0.0.1:8000/api/campaign/list/")
    .then(res =>{
        if(!res.ok){
            throw new Error("Campaigns not found");
        }
        return res.json();
    })
    .then(campaign =>{
        
        // console.log(campaign);

       const dash_campaign =document.getElementById("campaign");
       dash_campaign.innerHTML= `   <h2 class="text-white text-xl font-semibold">Active Campaigns</h2>
                                <p class="text-white text-3xl font-bold mt-2"> ${campaign.length} </p>`;


        
    })
    .catch(error => showAlert(error))



    //   donation load
        fetch("http://127.0.0.1:8000/api/transactions/list/")
        .then(res =>{
            if(!res.ok){
                throw new Error("Donations not found");
            }
            return res.json();
        })
        .then(donation =>{
            // console.log(donation)
            let total=0;
            donation.results.forEach(amount=>{
                total+= parseFloat(amount.amount)
            })
            const dash_donation=document.getElementById("donation");
            dash_donation.innerHTML=`
            
                 <h2 class="text-white text-xl font-semibold">Total Donations</h2>
                <p class="text-white text-3xl font-bold mt-2"> ${total} BDT </p>
            
            `


        })
        .catch(error => showAlert(error))









        // users load
        fetch("http://127.0.0.1:8000/api/users/list/")
        .then(res =>{
            if(!res.ok){
                throw new Error("Campaign not found");
            }
            return res.json();
        })
        .then(users =>{
            const dash_user=document.getElementById("users")
            dash_user.innerHTML=`
                                     <h2 class="text-white text-xl font-semibold">Registered Users</h2>
                                     <p class="text-white text-3xl font-bold mt-2"> ${users.length} </p>
                                                `

        })
        .catch(error => showAlert(error))
        





    


}



loadDashboard()



const loadCampaign=()=>{
    fetch("http://127.0.0.1:8000/api/campaign/list/")
    .then(res =>{
        if(!res.ok){
            throw new Error("Campaign not found");
        }
        return res.json();
    })
    .then(data => {
        console.log(data)
        const parent=document.getElementById("campaign-body");
        parent.innerHTML='';
        data.results.forEach(campaign => {
            const formattedDate = formatDate(campaign.created_at);
            
          
            const raised = campaign.fund_raised > 0 ? `${campaign.fund_raised} BDT` : '0';
            
           
            const child = document.createElement("tr");
         
            child.innerHTML = `
                <td class="border-b p-2">${campaign.title}</td>
                <td class="border-b p-2">${campaign.goal_amount} BDT</td>
                <td class="border-b p-2">${raised}</td>
                <td class="border-b p-2">${formattedDate}</td>
                <td class="border-b p-2">${campaign.deadline}</td>
                <td class="border-b p-2">${campaign.status}</td>
                <td class="border-b p-2">
                    <button class="bg-green-500 text-white px-2 py-1 rounded-lg shadow-md hover:bg-green-600" onclick="openEditModal('${campaign.id}')">Edit</button>
                    <button class="bg-red-500 text-white px-2 py-1 rounded-lg shadow-md hover:bg-red-600 ml-2" onclick="deleteCampaign('${campaign.id}')">Delete</button>
                </td>
            `;
            
        
            parent.appendChild(child);
        });
        
    })

    .catch(error => showAlert(error))
}


loadCampaign()




function formatDate(datetimeString) {
    const date = new Date(datetimeString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
       
    });
}






// add campaign


document.getElementById("addCampaignButton").addEventListener("click", function () {
     document.getElementById("addCampaignModal").classList.remove("hidden");
   });

 document.getElementById("closeAddModalButton").addEventListener("click", function () {
     document.getElementById("addCampaignModal").classList.add("hidden");
   });

//  document.getElementById("add-campaign").addEventListener("submit", function (event) {
//      event.preventDefault();
//      // Handle form submission here
//      alert("Campaign added!");
//      document.getElementById("addCampaignModal").classList.add("hidden");
//    });





//    editing campaign
 function openEditModal(campaignId) {

//    console.log(campaignId)
   const modal = document.getElementById("editCampaignModal");
   const form = document.getElementById("edit-campaign-form");

   fetch(`http://127.0.0.1:8000/api/campaign/list/${campaignId}`)
     .then((res) => {
       if (!res.ok) {
         throw new Error(`Campaign not found! status:${res.status}`);
       }
       return res.json();
     })
     .then((campaign) => {
    //    console.log(campaign)
       document.getElementById("campaign-id").value = campaign.id;
       document.getElementById("title").value = campaign.title;
       document.getElementById("goal_amount").value = campaign.goal_amount;
       document.getElementById("description").value = campaign.description;
       document.getElementById("location").value = campaign.location;
       document.getElementById("deadline").value = campaign.deadline;
       document.getElementById("type").value = campaign.type;
       document.getElementById("status").value = campaign.status;
       modal.classList.remove("hidden");
     })
     .catch((error) => {
       alert("asci")
       showAlert(error);
     });

   document.getElementById("editCampaignModal").classList.remove("hidden");
 }

 document
   .getElementById("closeEditModalButton")
   .addEventListener("click", function () {
     document.getElementById("editCampaignModal").classList.add("hidden");
   });





   document.getElementById("edit-campaign-form").addEventListener("submit", function (event) {
    event.preventDefault();
  

            const token =window.localStorage.getItem("token");
            const form = document.getElementById('edit-campaign-form');
            const formData = new FormData(form);
            // formData.append("creator", parseInt(creator_id));
            const campaignId = formData.get('campaign-id');
            fetch(`http://127.0.0.1:8000/api/campaign/list/${campaignId}/`,{
                method:"PUT",
                headers: {
        
                    Authorization: `Token ${token}`,
                },
                body:formData
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Failed to update campaign! status: ${res.status}`);
                }
                return res.json();
            })
            .then(() => {
                loadCampaign(); 
                closeModal(); 
                showAlert("Campaign update successfully")
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            })
            .catch(error => {
                showAlert(error);
            });
      
    document.getElementById("editCampaignModal").classList.add("hidden");
  });


  function closeModal() {
    document.getElementById('editCampaignModal').classList.add('hidden');
}




function deleteCampaign(campaignId){
    const token= localStorage.getItem("token");
       if(confirm('Are you sure to delete campaign?')){
           fetch(`http://127.0.0.1:8000/api/campaign/list/${campaignId}/`,{
               method:"DELETE",
               headers: {
           
                   Authorization: `Token ${token}`,
               },
   
           })
           .then(res => {
               if(!res.ok){
                   throw new Error(`Cannot delete campaign! status: ${res.status} `) 
               }else{
                   showAlert("Campaign delete successfully");
                   setTimeout(() => {
                       window.location.reload();
                   }, 2000);
   
               }
               loadCampaign();
           })
           
           .catch(error =>{
               showAlert(error);
           })
           
       }
   }




const addCampaign = (event) => {

    event.preventDefault();
    const user_id = localStorage.getItem("user_id");
    // console.log(user_id)
    fetch(`http://127.0.0.1:8000/api/campaign/creator/?user_id=${user_id}`)
        .then(res => {
            if (!res.ok) {
                throw new Error(`You are not a fundraiser! status: ${res.status}`);
            }
            return res.json()
        })
        .then(data => {

            const creator_id = data.results[0].id
            const form = document.getElementById("add-campaign");
            const formData = new FormData(form);
            const token = localStorage.getItem("admin_token");
            formData.append("creator", parseInt(creator_id));
            fetch("http://127.0.0.1:8000/api/campaign/list/", {

                method: "POST",
                headers: {

                    Authorization: `Token ${token}`,
                },

                body: formData,
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`Campaign not created! status:${res.status}`);
                    }
                    return res.json();
                })
                .then(data => {
                    showAlert("Campaign Create successfully");
                    loadCampaign()
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000);
                    
                })
                .catch(error => {
                    showAlert(error)
                })
        }
        )
        .catch(error => {
            showAlert(error);
        });

};

