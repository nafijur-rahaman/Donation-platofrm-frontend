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

const loadDashboard = () => {
  // Load campaign data
  fetch("https://donation-platform-backend-psi.vercel.app/api/campaign/list/")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Campaigns not found");
      }
      return res.json();
    })
    .then((data) => {
      let activeCampaigns = 0;
      let completedCampaigns = 0;
      data.forEach((campaign) => {
        if (campaign.status === "active") {
          activeCampaigns++;
        } else if (campaign.status === "completed") {
          completedCampaigns++;
        }
      });

      document.getElementById("completed-campaigns").innerHTML = `
                <h2 class="text-gray-600 text-xl font-bold">Completed Campaigns</h2>
                <p class="text-white text-gray-600 text-3xl font-bold mt-2">${completedCampaigns}</p>
            `;
    })
    .catch((error) => showAlert(error.message));

  // Load donation data
  fetch(
    "https://donation-platform-backend-psi.vercel.app/api/transactions/list/"
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("Donations not found");
      }
      return res.json();
    })
    .then((donations) => {
      let totalDonations = donations.reduce(
        (sum, donation) => sum + parseFloat(donation.amount),
        0
      );

      document.getElementById("donation").innerHTML = `
                <h2 class=" text-gray-600  text-xl font-bold">Total Donations</h2>
                <p class="  text-gray-600 text-3xl font-bold mt-2">${totalDonations.toLocaleString()} BDT</p>
            `;
    })
    .catch((error) => showAlert(error.message));

  // Load user data
  fetch("https://donation-platform-backend-psi.vercel.app/api/users/list/")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Users not found");
      }
      return res.json();
    })
    .then((users) => {
      document.getElementById("users").innerHTML = `
                <h2 class="text-gray-600 text-xl font-bold">Registered Users</h2>
                <p class="text-gray-600 text-3xl font-bold mt-2">${users.length}</p>
            `;
    })
    .catch((error) => showAlert(error.message));
};

// Call the loadDashboard function when the page loads
window.onload = loadDashboard;

// Function to fetch and load campaigns
const loadCampaigns = () => {
  fetch("https://donation-platform-backend-psi.vercel.app/api/campaign/list/")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Campaigns not found");
      }
      return res.json();
    })
    .then((data) => {
      // Shuffle the data array and select the first three campaigns
      const shuffledCampaigns = data
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      const campaignsContainer = document.getElementById("campaigns");
      campaignsContainer.innerHTML = ""; // Clear existing content

      shuffledCampaigns.forEach((campaign) => {
        const campaignCard = document.createElement("div");
        campaignCard.className =
          "bg-white shadow-lg rounded-lg overflow-hidden transform transition hover:scale-105 hover:shadow-xl";

        campaignCard.innerHTML = `
            <img class="w-full h-64 object-cover" src="https://res.cloudinary.com/dwsp8rft8/${
              campaign.image
            }" alt="${campaign.title}">
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-800 mb-2">${
                campaign.title
              }</h3>
              <p class="text-sm text-gray-500 mb-4">${campaign.description.slice(
                0,
                50
              )}...</p>
              <div class="flex justify-between items-center">
                <p class="text-blue-600 font-semibold">${
                  campaign.goal_amount
                } BDT</p>
                <button 
    onclick="window.location.href='./campaign_details.html?id=${campaign.id}'" 
    class="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full shadow hover:bg-blue-700 transition duration-200">
    <span>View Details</span>
    <svg class="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M5 12h14m-7-7l7 7-7 7"></path>
    </svg>
</button>
              </div>
            </div>
          `;

        campaignsContainer.appendChild(campaignCard);
      });
    })
    .catch((error) => console.error("Error loading campaigns:", error));
};

// Call the function to load campaigns on page load
loadCampaigns();
