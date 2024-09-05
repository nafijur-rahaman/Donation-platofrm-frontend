
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

function fetchUnreadCount() {
  const token=window.localStorage.getItem("admin_token");
  fetch("https://donation-platform-backend-rmqk.onrender.com/api/notification/list/", {
      method: 'GET',
      headers: {
          'Content-Type': 'campaign/json',
          Authorization: `Token ${token}`,
      }
  })
  .then(response => response.json())
  .then(data => {
    // console.log(data)
      let unreadNotificationsCount = 0;

      if (data.length > 0) {
       
       
          data.forEach((notification, index) => {
            const li = document.createElement('li');
            li.dataset.notificationId = notification.id;
            li.classList.add('p-2', 'mb-1', 'border-b', 'border-gray-200');
              if (!notification.is_read) {
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

          });

          unreadCount.textContent = `Unread: ${unreadNotificationsCount}`;
      } 
  })
  .catch(error => console.error('Error fetching notifications:', error));
}


document.addEventListener('DOMContentLoaded', function() {
    const notificationsButton = document.getElementById('notificationsButton');
    const notificationsDropdown = document.getElementById('notificationsDropdown');
    const notificationsList = document.getElementById('notificationsList');
    const notificationCount = document.getElementById('notificationCount');
    const token = localStorage.getItem("admin_token");


    function fetchNotifications() {
        fetch("https://donation-platform-backend-rmqk.onrender.com/api/notification/list/", {
            method: 'GET',
            headers: {
                'Content-Type': 'campaign/json',
                Authorization: `Token ${token}`,
            }
        })
        .then(response => response.json())
        .then(data => {
          // console.log(data)
            notificationsList.innerHTML = '';
            let unreadNotificationsCount = 0;

            if (data.length > 0) {
                notificationCount.textContent = data.length;

                data.forEach((notification, index) => {
                    const li = document.createElement('li');
                    li.dataset.notificationId = notification.id;
                    li.classList.add('p-2', 'mb-1', 'border-b', 'border-gray-200');

                    li.textContent = `${index + 1}. ${notification.message}`;

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
        fetch(`https://donation-platform-backend-rmqk.onrender.com/api/notification/notifications/${notificationId}/read/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'campaign/json',
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
                window.location.reload()
            } else {
                showAlert('Failed to mark notification as read');
            }
        })
        .catch(error => showAlert('Error marking notification as read:', error));
    }

    function toggleDropdown() {
        notificationsDropdown.classList.toggle('hidden');
    }

    notificationsButton.addEventListener('click', () => {
        toggleDropdown();
        fetchNotifications(); 
    });

    document.addEventListener('click', function(event) {
        if (!notificationsDropdown.contains(event.target) && !notificationsButton.contains(event.target)) {
            notificationsDropdown.classList.add('hidden');
        }
    });

    fetchNotifications();
    fetchUnreadCount();
});





const loadDashboard =()=>{
    // campaign load
    fetch("https://donation-platform-backend-rmqk.onrender.com/api/campaign/list/")
    .then(res =>{
        if(!res.ok){
            throw new Error("users not found");
        }
        return res.json();
    })
    .then(data =>{
        
        // console.log(campaign);
       let activeCampaign=0;
       let completeCampaign=0;
       const Active_campaign =document.getElementById("campaign");
       const Completed_campaign=document.getElementById("completed-campaigns");
       data.forEach(campaign=>{
        if(campaign.status==='active'){
          activeCampaign++;
        }else if(campaign.status==='completed'){
        completeCampaign++;
        }
       })
       Active_campaign.innerHTML= `   <h2 class="text-white text-xl font-bold">Active Campaigns</h2>
       <p class="text-white text-3xl font-bold mt-2"> ${activeCampaign} </p>`;
     
       Completed_campaign.innerHTML=`
         <h2 class="text-white text-xl font-bold">Completed Campaigns</h2>
       <p class="text-white text-3xl font-bold mt-2"> ${completeCampaign} </p>;
       
       `
        
    })
    .catch(error => showAlert(error))



    //   donation load
        fetch("https://donation-platform-backend-rmqk.onrender.com/api/transactions/list/")
        .then(res =>{
            if(!res.ok){
                throw new Error("Donations not found");
            }
            return res.json();
        })
        .then(donation =>{
            // console.log(donation)
            let total=0;
            donation.forEach(amount=>{
                total+= parseFloat(amount.amount)
            })
            const dash_donation=document.getElementById("donation");
            dash_donation.innerHTML=`
            
                 <h2 class="text-white text-xl font-bold">Total Donations</h2>
                <p class="text-white text-3xl font-bold mt-2"> ${total} BDT </p>
            
            `


        })
        .catch(error => showAlert(error))









        // users load
        fetch("https://donation-platform-backend-rmqk.onrender.com/api/users/list/")
        .then(res =>{
            if(!res.ok){
                throw new Error("Campaign not found");
            }
            return res.json();
        })
        .then(users =>{
            const dash_user=document.getElementById("users")
            dash_user.innerHTML=`
                                     <h2 class="text-white text-xl font-bold">Registered Users</h2>
                                     <p class="text-white text-3xl font-bold mt-2"> ${users.length} </p>
                                                `

        })
        .catch(error => showAlert(error))
        

    

}



loadDashboard()




const loadDonation = () => {
    fetch("https://donation-platform-backend-rmqk.onrender.com/api/transactions/list/")
      .then(res => {
        if (!res.ok) {
          throw new Error("Donations not found");
        }
        return res.json();
      })
      .then(data => {
        const parent = document.getElementById("donate-body");
        parent.innerHTML = "";
        data.forEach(donation => {
          if(donation.payment_status==="completed"){
            const formattedDate = formatDatee(donation.created_at);
            const tr = document.createElement("tr");
            tr.innerHTML = `
              <td class="border-b p-4 text-blue-600 font-semibold">${donation.donor_name}</td>
              <td class="border-b p-4 text-purple-600 font-medium">${donation.donor_email}</td>
              <td class="border-b p-4 text-green-600 font-semibold">${donation.amount} BDT</td>
              <td class="border-b p-4 text-indigo-600 font-medium">${formattedDate}</td>
              <td class="border-b p-4 text-pink-600 font-medium">${donation.campaign_name}</td>
            `;
            parent.appendChild(tr);
          }
         
        });
      })
      .catch(error => showAlert(error));
  }



  loadDonation();


function formatDate(datetimeString) {
    const date = new Date(datetimeString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
       
    });
}

function formatDatee(datetimeString) {
    const date = new Date(datetimeString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
}





function fetchUsers() {
  const token = localStorage.getItem("admin_token");
    fetch('https://donation-platform-backend-rmqk.onrender.com/api/users/list/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        }
    })
    .then(response => response.json())
    .then(data => {
      // console.log(data)
        const userTableBody = document.getElementById('userTableBody');
        userTableBody.innerHTML = '';

        data.forEach(user => {
            const row = document.createElement('tr');
            row.classList.add('hover:bg-gray-100');

            row.innerHTML = `
                <td class="p-3 text-gray-800">${user.first_name} ${user.last_name}</td>
                <td class="p-3 text-blue-600 font-medium">${user.email}</td>
                <td class="p-3 text-purple-600">${user.profession}</td>
                <td class="p-3 text-green-600">${user.status}</td>
                <td class="p-3">
                    <button 
                        class="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500" 
                        onclick="deleteUser(${user.id})">
                        Delete
                    </button>
                </td>
            `;
            
            userTableBody.appendChild(row);
        });
    })
    .catch(error => console.error('Error fetching users:', error));
}

function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        fetch(`https://donation-platform-backend-rmqk.onrender.com/api/users/list/${userId}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            }
        })
        .then(response => {
            if (response.ok) {
                su_showAlert('User deleted successfully');
                fetchUsers(); 
            } else {
                console.error('Failed to delete user');
            }
        })
        .catch(error => showAlert('Error deleting user:', error));
    }
}

document.getElementById('searchInput').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const rows = document.querySelectorAll('#userTableBody tr');
    rows.forEach(row => {
        const name = row.cells[0].textContent.toLowerCase();
        const email = row.cells[1].textContent.toLowerCase();
        if (name.includes(searchTerm) || email.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});

fetchUsers();








//  all campaign request 


document.addEventListener('DOMContentLoaded', () => {
  fetch("https://donation-platform-backend-rmqk.onrender.com/api/campaign/list/")
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load campaigns');
      }
      return response.json();
    })
    .then(data => {
      const tuitionList = document.getElementById('tuition-list').querySelector('tbody');

      data.forEach(campaign => {
        // Only add campaigns that are not completed
        if (campaign.status !== 'completed') {
          const tr = document.createElement('tr');
          tr.classList.add('hover:bg-gray-100', 'even:bg-gray-50', 'odd:bg-white');

          const tdTitle = document.createElement('td');
          tdTitle.classList.add('px-6', 'py-4', 'text-xl', 'font-semibold', 'text-gray-900', 'border-r');
          tdTitle.textContent = campaign.title;

          const tdCreator = document.createElement('td');
          tdCreator.classList.add('px-6', 'py-4', 'text-xl', 'font-medium', 'text-gray-900', 'border-r');
          tdCreator.textContent = campaign.creator_name;

          const tdStatus = document.createElement('td');
          tdStatus.classList.add('px-6', 'py-4', 'text-xl', 'font-medium', 'text-gray-900');

          const statusButton = document.createElement('button');
          statusButton.classList.add('px-4', 'py-2', 'rounded-full', 'text-white', 'transition', 'duration-300');

          // Normalize status to lowercase to avoid case-sensitive issues
          switch (campaign.status.toLowerCase()) {
            case 'active':
              statusButton.classList.add('bg-green-600', 'hover:bg-green-700');
              break;
            case 'pending':
              statusButton.classList.add('bg-red-500', 'hover:bg-red-600');
              break;
            case 'Pending':
                statusButton.classList.add('bg-red-500', 'hover:bg-red-600');
              break;
            default:
              statusButton.classList.add('bg-gray-600', 'hover:bg-gray-700');
              break;
          }

          statusButton.textContent = capitalizeFirstLetter(campaign.status);
          tdStatus.appendChild(statusButton);

          statusButton.addEventListener('click', () => {
            if (campaign.status === 'pending') {
              if (confirm('Are you sure you want to activate this campaign?')) {
                updateCampaignStatus(campaign.id, 'active')
                  .then(() => {
                    statusButton.textContent = 'Active';
                    statusButton.classList.replace('bg-red-500', 'bg-green-600');
                    statusButton.classList.replace('hover:bg-red-600', 'hover:bg-green-700');
                    su_showAlert("Campaign activated successfully");
                    setTimeout(() => window.location.reload(), 3000);
                  })
                  .catch(error => {
                    showAlert("Failed to activate campaign");
                    console.error(error);
                  });
              }
            }  else if (campaign.status === 'Pending') {
              if (confirm('Are you sure you want to active this campaign?')){
                  updateCampaignStatus(campaign.id, 'active')
                  .then(() => {
                    statusButton.textContent = 'Active';
                    statusButton.classList.replace('bg-yellow-500', 'bg-green-600');
                    statusButton.classList.replace('hover:bg-yellow-600', 'hover:bg-green-700');
                    su_showAlert("Campaign activated successfully");
                    setTimeout(() => window.location.reload(), 3000);
                  })
                  .catch(error => {
                    showAlert("Failed to activate campaign");
                    console.error(error);
                  });
              }
            
            }else if (campaign.status === 'active') {
              if (confirm('Are you sure you want to complete this campaign?')) {
                if (campaign.goal_amount === campaign.fund_raised) {
                  updateCampaignStatus(campaign.id, 'completed')
                    .then(() => {
                      statusButton.textContent = 'Completed';
                      statusButton.classList.replace('bg-green-600', 'bg-blue-600');
                      statusButton.classList.replace('hover:bg-green-700', 'hover:bg-blue-700');
                      su_showAlert("Campaign completed successfully");
                      setTimeout(() => window.location.reload(), 3000);
                    })
                    .catch(error => {
                      showAlert("Failed to complete campaign");
                      console.error(error);
                    });
                } else {
                  showAlert("Campaign did not achieve goal amount");
                }
              }
            } else {
              showAlert("Campaign is already active");
            }
          });

          tr.appendChild(tdTitle);
          tr.appendChild(tdCreator);
          tr.appendChild(tdStatus);
          tuitionList.appendChild(tr);
        }
      });
    })
    .catch(error => console.error('Error:', error));
});


  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function updateCampaignStatus(campaignId, newStatus) {
    const token = localStorage.getItem("admin_token");
    return fetch(`https://donation-platform-backend-rmqk.onrender.com/api/campaign/list/${campaignId}/`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ status: newStatus })
    }).then(response => {
      if (!response.ok) {
        throw new Error("Status change failed");
      }
      return response.json();
    })
    .catch(error=>showAlert(error))
  }



//   creator request

document.addEventListener('DOMContentLoaded', () => {
  fetch("https://donation-platform-backend-rmqk.onrender.com/api/campaign/creator-request/")
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load users');
      }
      return response.json();
    })
    .then(users => {
      const requestList = document.getElementById('request-list').querySelector('tbody');

      users.forEach(user => {
        const tr = document.createElement('tr');
        tr.classList.add('hover:bg-gray-100', 'even:bg-gray-50', 'odd:bg-white');

        const tdTitle = document.createElement('td');
        tdTitle.classList.add('px-6', 'py-4', 'text-xl', 'font-semibold', 'text-gray-900', 'border-r');
        tdTitle.textContent = user.requester_name;

        const tdCreator = document.createElement('td');
        tdCreator.classList.add('px-6', 'py-4', 'text-xl', 'font-medium', 'text-gray-900', 'border-r');
        tdCreator.textContent = user.message;

        const tdStatus = document.createElement('td');
        tdStatus.classList.add('px-6', 'py-4', 'text-xl', 'font-medium', 'text-gray-900');

        const statusButton = document.createElement('button');
        statusButton.classList.add('px-4', 'py-2', 'rounded-full', 'text-white', 'transition', 'duration-300');
        
        const updateStatusClasses = (status) => {
          statusButton.classList.remove('bg-green-600', 'bg-yellow-500', 'bg-red-500', 'bg-gray-600');
          statusButton.classList.remove('hover:bg-green-700', 'hover:bg-yellow-600', 'hover:bg-red-600', 'hover:bg-gray-700');

          switch (status) {
            case 'approved':
              statusButton.classList.add('bg-green-600', 'hover:bg-green-700');
              statusButton.textContent = 'Approved';
              break;
            case 'pending':
              statusButton.classList.add('bg-yellow-500', 'hover:bg-yellow-600');
              statusButton.textContent = 'Pending';
              break;
            case 'rejected':
              statusButton.classList.add('bg-red-500', 'hover:bg-red-600');
              statusButton.textContent = 'Rejected';
              break;
            default:
              statusButton.classList.add('bg-gray-600', 'hover:bg-gray-700');
              statusButton.textContent = 'Unknown';
              break;
          }
        };
        
        updateStatusClasses(user.status);
        tdStatus.appendChild(statusButton);

        const tdActions = document.createElement('td');
        tdActions.classList.add('px-6', 'py-4', 'text-xl', 'font-medium', 'text-gray-900');
        const actionButton = document.createElement('button');
        actionButton.classList.add('px-4', 'py-2', 'rounded-full', 'text-white', 'bg-red-500', 'hover:bg-red-700', 'transition', 'duration-300');
        actionButton.textContent = 'Reject';
        tdActions.appendChild(actionButton);

        statusButton.addEventListener('click', () => {
          if (user.status === 'pending') {
            if (confirm('Are you sure you want to approve this request?')) {
              updateUserStatus(user.id, 'approved')
                .then(() => {
                  updateStatusClasses('approved');
                  su_showAlert("Creator made successfully");
                })
                .catch(error => {
                  showAlert("Failed to activate user");
                  console.error(error);
                });
            }
          } else if(user.status === 'approved'){
            su_showAlert("You already active this creator");
          }
          else {
            showAlert("User already creator");
          }

   


        });


        actionButton.addEventListener('click',()=>{
          if (confirm('Are you sure you want to reject this request?')) {
            updateUserStatus(user.id, 'rejected')
              .then(() => {
                updateStatusClasses('rejected');
                su_showAlert("Request rejected successfully");
              })
              .catch(error => {
                showAlert("Failed to reject request");
                console.error(error);
              });
          }
        })

        tr.appendChild(tdTitle);
        tr.appendChild(tdCreator);
        tr.appendChild(tdStatus);
        tr.appendChild(tdActions);
        requestList.appendChild(tr);
      });
    })
    .catch(error => console.error('Error:', error));
});

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function updateUserStatus(userId, newStatus) {
    const token = localStorage.getItem("admin_token");
    return fetch(`https://donation-platform-backend-rmqk.onrender.com/api/campaign/creator-request/${userId}/`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ status: newStatus })
    })
    .then(res => {
      if (!res.ok) {
        throw new Error("Status change failed");
      }
      return res.json();
    })
    .catch(error=>showAlert(error))

  }





