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


const loadCampaign = () => {
    fetch("https://donation-platform-backend-psi.vercel.app/api/campaign/list/")
    .then(res => {
        if (!res.ok) {
            throw new Error("Campaign not found");
        }
        return res.json();
    })
    .then(data => {
        const parent = document.getElementById("campaign-body");
        parent.innerHTML = '';
        data.forEach(campaign => {
            const formattedDate = formatDate(campaign.created_at);
            const raised = campaign.fund_raised > 0 ? `${campaign.fund_raised} BDT` : '0';

            const child = document.createElement("tr");
            child.classList.add('hover:bg-gray-100');

            child.innerHTML = `
                <td class="border-b p-3 text-gray-700">${campaign.title}</td>
                <td class="border-b p-3 text-gray-700">${campaign.goal_amount} BDT</td>
                <td class="border-b p-3 text-gray-700">${raised}</td>
                <td class="border-b p-3 text-gray-700">${formattedDate}</td>
                <td class="border-b p-3 text-gray-700">${campaign.deadline}</td>
                <td class="border-b p-3 text-gray-700">${campaign.status}</td>
           <td class="border-b p-3 flex space-x-2">
    <button class="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600" onclick="openEditModal('${campaign.id}')">Edit</button>
    <button class="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600" onclick="deleteCampaign('${campaign.id}')">Delete</button>
</td>

            `;

            parent.appendChild(child);
        });
    })
    .catch(error => showAlert(error));
}

loadCampaign();















// add campaign


document.getElementById("addCampaignButton").addEventListener("click", function () {
     document.getElementById("addCampaignModal").classList.remove("hidden");
   });

 document.getElementById("closeAddModalButton").addEventListener("click", function () {
     document.getElementById("addCampaignModal").classList.add("hidden");
   });







//    editing campaign
 function openEditModal(campaignId) {

//    console.log(campaignId)
   const modal = document.getElementById("editCampaignModal");
   const form = document.getElementById("edit-campaign-form");

   fetch(`https://donation-platform-backend-psi.vercel.app/api/campaign/list/${campaignId}`)
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
  

            const token =window.localStorage.getItem("admin_token");
            const form = document.getElementById('edit-campaign-form');
            const formData = new FormData(form);
            // formData.append("creator", parseInt(creator_id));
            const campaignId = formData.get('campaign-id');
            fetch(`https://donation-platform-backend-psi.vercel.app/api/campaign/list/${campaignId}/`,{
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
                su_showAlert("Campaign update successfully")
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
    const token= localStorage.getItem("admin_token");
       if(confirm('Are you sure to delete campaign?')){
           fetch(`https://donation-platform-backend-psi.vercel.app/api/campaign/list/${campaignId}/`,{
               method:"DELETE",
               headers: {
           
                   Authorization: `Token ${token}`,
               },
   
           })
           .then(res => {
               if(!res.ok){
                   throw new Error(`Cannot delete campaign! status: ${res.status} `) 
               }else{
                su_showAlert("Campaign delete successfully");
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
    fetch(`https://donation-platform-backend-psi.vercel.app/api/campaign/creator/?user_id=${user_id}`)
        .then(res => {
            if (!res.ok) {
                throw new Error(`You are not a fundraiser! status: ${res.status}`);
            }
            return res.json()
        })
        .then(data => {
        //    console.log(data)
            const creator_id = data[0].id
            // console.log(creator_id)
            const form = document.getElementById("add-campaign");
            const formData = new FormData(form);
            const token = localStorage.getItem("admin_token");
            formData.append("creator", parseInt(creator_id));
            fetch("https://donation-platform-backend-psi.vercel.app/api/campaign/list/", {

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
                    // console.log(data)
                    su_showAlert("Campaign Create successfully");
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





function formatDate(datetimeString) {
    const date = new Date(datetimeString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
       
    });
}