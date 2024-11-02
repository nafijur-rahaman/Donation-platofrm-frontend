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

document.addEventListener('DOMContentLoaded', function () {

    function fetchCampaigns(type = '', status = '') {
        fetch(`https://donation-platform-backend-psi.vercel.app/api/campaign/list/?type=${type}&status=${status}`)
            .then(response => response.json())
            .then(data => {
                sortCampaigns(data);
            })
            .catch(error => console.error('Error fetching campaigns:', error));
    }
    
    function sortCampaigns(data) {
        const sortedData = data.sort((a, b) => {
            const order = {
                active: 1,
                completed: 2,
                cancel: 3,
            };
            return order[a.status] - order[b.status];
        });
    
        // Check if sortedData is empty
        if (sortedData.length === 0) {
            updateCampaignList([], true); // Pass a flag to show "Campaign Not Found"
        } else {
            updateCampaignList(sortedData, false);
        }
    }
    
    function updateCampaignList(data, showNotFound) {
        const campaignList = document.getElementById('campaign-list');
        campaignList.innerHTML = ''; // Clear the current list
    
        if (showNotFound) {
            // Show "Campaign Not Found" message
            campaignList.innerHTML = `<div class="flex flex-col items-center justify-center p-8 bg-gray-100 border border-gray-300 rounded-lg shadow-md transition-transform duration-300 transform">
    <h2 class="text-3xl font-bold text-gray-800">Campaign Not Found</h2>
    <p class="mt-4 text-lg text-gray-500">We couldn't find any campaigns matching your search criteria.</p>
</div>

`;
            return;
        }
    
        data.forEach(campaign => {
            const card = `
                <div class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                    <img src="https://res.cloudinary.com/dwsp8rft8/${campaign.image}" class="w-full h-64 object-cover" alt="${campaign.title}">
                    <div class="p-4">
                        <h5 class="text-xl font-semibold mb-2 text-gray-800">${campaign.title}</h5>
                        <p class="text-gray-700 mb-2">${campaign.description.slice(0, 50)}...</p>
                        <p class="text-gray-600 mb-2"><strong>Type:</strong> ${campaign.type}</p>
                        <p class="text-gray-600 mb-2"><strong>Goal Amount:</strong> ${campaign.goal_amount} BDT</p>
                        <p class="text-gray-600 mb-4"><strong>Status:</strong> ${campaign.status}</p>
                        <a href="./campaign_details.html?id=${campaign.id}" style="text-decoration: none;" class="inline-block px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">Details</a>
                    </div>
                </div>
            `;
            campaignList.insertAdjacentHTML('beforeend', card);
        });
    }
    
    document.getElementById('filter-form').addEventListener('submit', function (event) {
        event.preventDefault();
    
        const type = document.getElementById('typeFilter').value;
        const status = document.getElementById('statusFilter').value;
    
        fetchCampaigns(type, status);
    });
    
    // Initial load
    fetchCampaigns();
});    