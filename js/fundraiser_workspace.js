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
  const user_id = window.localStorage.getItem("user_id");
  fetch(
    `https://donation-platform-backend-psi.vercel.app/api/campaign/creator/?user_id=${user_id}`
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(`You are not a fundraiser! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      //  console.log(data[0])

      const creator_id = data[0].id;
      fetch(
        `https://donation-platform-backend-psi.vercel.app/api/campaign/list/?creator=${creator_id}`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error(
              `Campaign not found of this id! status:${res.status}`
            );
          }
          return res.json();
        })

        .then((data) => {
          // console.log(data)

          // dashboard dynamic data

          const totalCampaign = document.getElementById("total-campaign");
          totalCampaign.innerHTML = `

            <h3 class="text-xl font-bold text-gray-700">Total Campaigns</h3>
            <p class="text-2xl font-bold text-gray-900 mt-2"> ${data.length} </p>                 

                    `;

          const campaign_list = document.getElementById("campaign-list");

          const flexContainer = document.createElement("div");
          flexContainer.classList.add("flex", "space-x-4", "overflow-x-auto");

          campaign_list.appendChild(flexContainer);

          data.forEach((campaign) => {
            function truncateText(text, wordLimit) {
              const words = text.split(" ");
              if (words.length > wordLimit) {
                return words.slice(0, wordLimit).join(" ") + "...";
              }
              return text;
            }

            const truncatedDescription = truncateText(campaign.description, 35);

            const card = document.createElement("div");
            card.classList.add(
              "w-full",
              "sm:w-1/2",
              "md:w-1/3",
              "lg:w-1/4",
              "flex-shrink-0"
            );

            card.innerHTML = `
        <div class="rounded overflow-hidden shadow-lg bg-white flex flex-col h-full">
            <div class="px-6 py-4 flex flex-col flex-grow">
                <img src="https://res.cloudinary.com/dwsp8rft8/${
                  campaign.image
                }" class="w-full h-48 object-cover" alt="${campaign.title}">
                <div class="font-bold text-xl mb-2">${campaign.title}</div>
                <div class="text-sm font-bold mb-4">
                    Status: ${
                      campaign.status.charAt(0).toUpperCase() +
                      campaign.status.slice(1)
                    }
                </div>
                <p class="text-gray-700 text-base flex-grow">
                    Description: ${truncatedDescription}
                </p>
            </div>
            <div class="px-6 py-2 flex flex-wrap justify-between items-center space-x-2 border-t border-gray-200 pt-3">
                <button class="open-modal-btn bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded" data-id="${
                  campaign.id
                }">
                    Edit
                </button>
                <button onclick="completeCampaign(${
                  campaign.id
                })" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">
                    Complete
                </button>
                <button onclick="cancelCampaign(${
                  campaign.id
                })" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded">
                    Cancel
                </button>
            </div>
            <div class="px-6 py-4 flex justify-center border-t border-gray-200 mt-auto">
                <button onclick="deleteCampaign(${
                  campaign.id
                })" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full">
                    Delete
                </button>
            </div>
        </div>
    `;

            flexContainer.appendChild(card);
          });

          const openModalButtons = document.querySelectorAll(".open-modal-btn");
          openModalButtons.forEach((button) => {
            button.addEventListener("click", (event) => {
              const campaignId = event.target.dataset.id;
              openModal(campaignId);
            });
          });
        })
        .catch((error) => {
          showAlert(error);
        });
    })
    .catch((error) => {
      showAlert(error);
    });
};

function completeCampaign(campaignId) {
  token = window.localStorage.getItem("token");

  fetch(`https://donation-platform-backend-psi.vercel.app/api/campaign/list/${campaignId}/`)
  .then(res =>{
    if(!res.ok){
        throw new Error("Campaign not found");
    }
    return res.json();
})
.then(data=>{

  if(data.status==='completed'){
    showAlert("The campaign already completed")
  }else if(data.goal_amount===data.fund_raised){
  fetch(
    `https://donation-platform-backend-psi.vercel.app/api/campaign/list/${campaignId}/`,
    {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ status: "completed" }),
    }
  )
  .then(res =>{
    if(!res.ok){
        throw new Error("Campaign not found");
    }
    return res.json();
})
    .then((data) => {
      su_showAlert("Campaign marked as complete!");
      setTimeout(() => {
        window.location.reload()
    }, 3000);
    })
    .catch(error => showAlert(error))

    }else{
        showAlert("The Campaign did't achieve Goal amount")
    }
})
.catch(error => showAlert(error))





}

function cancelCampaign(campaignId) {
  token = window.localStorage.getItem("token");
  fetch(
    `https://donation-platform-backend-psi.vercel.app/api/campaign/list/${campaignId}/`,
    {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ status: "cancel" }),
    }
  )
  .then(res =>{
    if(!res.ok){
        throw new Error("Campaign not found");
    }
    return res.json();
})
    .then((data) => {
      su_showAlert("Campaign has been canceled.");

      setTimeout(() => {
        window.location.reload()
    }, 3000);
    })
    .catch(error => showAlert(error))
}

function openModal(campaignId) {
  const modal = document.getElementById("campaign-modal");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const form = document.getElementById("edit-campaign-form");

  fetch(
    `https://donation-platform-backend-psi.vercel.app/api/campaign/list/${campaignId}`
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Campaign not found! status:${res.status}`);
      }
      return res.json();
    })
    .then((campaign) => {
      // console.log(campaign.status)
      document.getElementById("campaign-id").value = campaign.id;
      document.getElementById("title").value = campaign.title;
      document.getElementById("goal_amount").value = campaign.goal_amount;
      document.getElementById("description").value = campaign.description;
      document.getElementById("location").value = campaign.location;
      document.getElementById("deadline").value = campaign.deadline;
      document.getElementById("type").value = campaign.type;
      modal.classList.remove("hidden");
    })
    .catch((error) => {
      showAlert(error);
    });

  closeModalBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
}

function editCampaign(event) {
  event.preventDefault();
  const token = window.localStorage.getItem("token");
  const form = document.getElementById("edit-campaign-form");
  const formData = new FormData(form);
  // formData.append("creator", parseInt(creator_id));
  const campaignId = formData.get("campaign-id");
  fetch(
    `https://donation-platform-backend-psi.vercel.app/api/campaign/list/${campaignId}/`,
    {
      method: "PUT",
      headers: {
        Authorization: `Token ${token}`,
      },
      body: formData,
    }
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to update campaign! status: ${res.status}`);
      }
      return res.json();
    })
    .then(() => {
      su_showAlert("Campaign update successfully");
      loadCampaign();
      closeModal();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    })
    .catch((error) => {
      showAlert(error);
    });
}

function closeModal() {
  document.getElementById("campaign-modal").classList.add("hidden");
}

function deleteCampaign(campaignId) {
  const token = window.localStorage.getItem("token");
  if (confirm("Are you sure to delete campaign?")) {
    fetch(
      `https://donation-platform-backend-psi.vercel.app/api/campaign/list/${campaignId}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Cannot delete campaign! status: ${res.status} `);
        } else {
          su_showAlert("Campaign delete successfully");
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
        loadCampaign();
      })

      .catch((error) => {
        showAlert(error);
      });
  }
}

const loadDonation = () => {
  const user_id = window.localStorage.getItem("user_id");
  const token = window.localStorage.getItem("token");

  fetch(
    `https://donation-platform-backend-psi.vercel.app/api/transactions/list/?user= ${user_id}`
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Donation cannot load! status:${res.status} `);
      }
      return res.json();
    })
    .then((data) => {
      let totalAmount = 0;
      data.forEach((donation) => {
        if (donation.payment_status === "completed") {
          const formattedDate = formatDate(donation.created_at);

          // console.log(donation)
          const body = document.getElementById("donation-body");
          const tr = document.createElement("tr");
          tr.innerHTML = `
                
                     <td class="py-2"> ${donation.campaign_name} </td>
                    <td class="py-2">${donation.donor_name}</td>
                    <td class="py-2">${donation.amount} BDT</td>
                    <td class="py-2">${formattedDate} </td>
                `;
          body.appendChild(tr);

          totalAmount += parseFloat(donation.amount);
        }
      });

      const totalDonation = document.getElementById("total-amount");
      totalDonation.innerHTML = "";
      totalDonation.innerHTML = `
            
                <h3 class="text-xl font-bold text-gray-700">Total Donations</h3>
                <p class="text-2xl font-bold text-gray-900 mt-2"> ${totalAmount} </p>
            
            `;

      // console.log (totalAmount)
    })
    .catch((error) => showAlert(error));
};

loadDonation();

const loadUser = () => {
  fetch("https://donation-platform-backend-psi.vercel.app/api/users/list/")
    .then((res) => {
      if (!res.ok) {
        throw new Error("No user find");
      }
      return res.json();
    })
    .then((data) => {
      // console.log(data)
      const totalDonor = document.getElementById("total-donor");
      totalDonor.innerHTML = `
        
        <h3 class="text-xl font-bold text-gray-700">Active Donors</h3>
            <p class="text-2xl font-bold text-gray-900 mt-2"> ${data.length} </p>
        `;
    })
    .catch((error) => showAlert(error));
};

window.onload = loadCampaign();
window.onload = loadUser();

function formatDate(datetimeString) {
  const date = new Date(datetimeString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}
