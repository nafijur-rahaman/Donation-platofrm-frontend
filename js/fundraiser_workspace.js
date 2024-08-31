
function showAlert(message) {
    document.getElementById("alertMessage").textContent = message;
    document.getElementById("customAlert").style.display = "flex";
}

function closeAlert() {
    document.getElementById("customAlert").style.display = "none";
}

const loadCampaign =()=>{
const user_id=window.localStorage.getItem("user_id");
fetch(`http://127.0.0.1:8000/api/campaign/creator/?user_id=${user_id}`)
        .then(res => {
            if (!res.ok) {
                throw new Error(`You are not a fundraiser! status: ${res.status}`);
            }
            return res.json()
        })
        .then(data => {
        //  console.log(data[0])

            const creator_id=data[0].id;
            fetch(`http://127.0.0.1:8000/api/campaign/list/?creator=${creator_id}`)
            .then(res =>{
                if(!res.ok){
                    throw new Error(`Campaign not found of this id! status:${res.status}`)
                }
                return res.json()
            })

            .then(data => {

// console.log(data)

// dashboard dynamic data

const totalCampaign=document.getElementById("total-campaign");
totalCampaign.innerHTML=`

            <h3 class="text-xl font-bold text-gray-700">Total Campaigns</h3>
            <p class="text-2xl font-bold text-gray-900 mt-2"> ${data.length} </p>                 

                    `










// campaign data
                const campaign_list=document.getElementById("campaign-list");
                data.forEach(campaign => {
                    const div = document.createElement("div")
                    div.innerHTML=`
                    
                   <div class="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col h-64">
                      <img src=" ${campaign.image} " alt="Campaign Image" class="w-full h-40 object-cover rounded-md mb-4">
                      <h3 class="text-xl font-bold text-gray-800 mb-2"> ${campaign.title} </h3>
                      <p class="text-gray-700 mb-4"> ${campaign.description.slice(0,35)}... </p>
                      <div class="flex justify-between items-center">
                      <div >
                            <span class="text-gray-800 font-semibold">Status: ${campaign.status} </span>
                    </div>
                    <button class="open-modal-btn bg-blue-500 text-white font-bold py-1 px-3 rounded" data-id="${campaign.id}">Edit</button>
                    <button class="bg-red-500 text-white font-bold py-1 px-3 rounded" onclick="deleteCampaign(${campaign.id})">Delete</button>
                      </div>
                  </div>
                    

                    `;

                    // campaign_list.appendChild(div)
                    loadDonation(campaign.id)
                });

                const openModalButtons = document.querySelectorAll('.open-modal-btn');
                openModalButtons.forEach(button => {
                    button.addEventListener('click', (event) => {
                        const campaignId = event.target.dataset.id;
                        openModal(campaignId);
                    });
                });


            })
            .catch(error =>{
                showAlert(error)
            })




          })
        .catch(error => {
            showAlert(error);
        });
};

// Function to open the modal
function openModal(campaignId) {
    
// Get the modal and close button elements
const modal = document.getElementById('campaign-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const form=document.getElementById("edit-campaign-form");


    fetch(`http://127.0.0.1:8000/api/campaign/list/${campaignId}`)
    .then(res =>{
        if(!res.ok){
            throw new Error(`Campaign not found! status:${res.status}`)
           
        }
        return res.json();
    })
    .then(campaign =>{
        // console.log(campaign.status)
        document.getElementById('campaign-id').value = campaign.id;
        document.getElementById('title').value = campaign.title;
        document.getElementById('goal_amount').value = campaign.goal_amount;
        document.getElementById('description').value = campaign.description;
        document.getElementById('location').value = campaign.location;
        document.getElementById('deadline').value = campaign.deadline;
        document.getElementById('type').value = campaign.type;
        document.getElementById('status').value = campaign.status
        modal.classList.remove('hidden');
    })
    .catch(error =>{
        showAlert(error);
    });

    closeModalBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });
}


function editCampaign(event){
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
        showAlert("Campaign update successfully")
        loadCampaign(); 
        closeModal(); 
        setTimeout(() => {
            window.location.reload();
        }, 3000);
    })
    .catch(error => {
        showAlert(error);
    });

}


function closeModal() {
    document.getElementById('campaign-modal').classList.add('hidden');
}

function deleteCampaign(campaignId){
 const token= window.localStorage.getItem("token");
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
                }, 3000);

            }
            loadCampaign();
        })
        
        .catch(error =>{
            showAlert(error);
        })
        
    }
}







const loadDonation =(campaignId)=>{
    const user_id=window.localStorage.getItem("user_id");
    const token=window.localStorage.getItem("token");

    fetch(`http://127.0.0.1:8000/api/transactions/list/?user= ${user_id} &campaign=${campaignId}`)
    .then(res =>{
        if(!res.ok){
            throw new Error(`Donation cannot load! status:${res.status} `)

        }
        return res.json()
    })
    .then(data=>{
        let totalAmount=0;
        data.forEach(donation =>{
            const formattedDate = formatDate(donation.created_at);

            // console.log(donation)
            const body=document.getElementById("donation-body");
            const tr=document.createElement("tr");
            tr.innerHTML=`
            
                 <td class="py-2"> ${donation.campaign_name} </td>
                <td class="py-2">${donation.donor_name}</td>
                <td class="py-2">${donation.amount} BDT</td>
                <td class="py-2">${formattedDate} </td>
            `
            body.appendChild(tr);

            totalAmount += parseFloat(donation.amount);

        })
        const totalDonation=document.getElementById("total-amount");
        totalDonation.innerHTML=`
        
            <h3 class="text-xl font-bold text-gray-700">Total Donations</h3>
            <p class="text-2xl font-bold text-gray-900 mt-2"> ${totalAmount} </p>
        
        `

        // console.log (totalAmount)
    })
    .catch(error=>showAlert(error))
}


const loadUser =()=>{
    fetch("http://127.0.0.1:8000/api/users/list/")
    .then(res =>{
        if(!res.ok){
            throw new Error("No user find")
        }
        return res.json()
    })
    .then(data =>{
        // console.log(data)
        const totalDonor=document.getElementById("total-donor");
        totalDonor.innerHTML=`
        
        <h3 class="text-xl font-bold text-gray-700">Active Donors</h3>
            <p class="text-2xl font-bold text-gray-900 mt-2"> ${data.length} </p>
        `

    })
    .catch(error=>showAlert(error))
}

window.onload = loadCampaign();
window.onload=loadUser()


function formatDate(datetimeString) {
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