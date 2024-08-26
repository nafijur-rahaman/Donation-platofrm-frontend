document.addEventListener('DOMContentLoaded', function() {
    let currentPage = 1;
    const campaignsPerPage = 3;

    function fetchCampaigns(type = '', status = '') {
        fetch(`http://127.0.0.1:8000/api/campaign/list/?type=${type}&status=${status}&page=${currentPage}&per_page=${campaignsPerPage}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                updateCampaignList(data);
                updatePagination(data.count);
            })
            .catch(error => console.error('Error fetching campaigns:', error));
    }

    function updateCampaignList(data) {
        const campaignList = document.getElementById('campaign-list');
        campaignList.innerHTML = '';

        data.results.forEach(campaign => {
            const card = `
                <div class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                    <img src="${campaign.image}" class="w-full h-48 object-cover" alt="${campaign.title}">
                    <div class="p-4">
                        <h5 class="text-xl font-semibold mb-2 text-gray-800">${campaign.title}</h5>
                        <p class="text-gray-700 mb-2">${campaign.description.slice(0,50)}...</p>
                        <p class="text-gray-600 mb-2"><strong>Type:</strong> ${campaign.type}</p>
                        <p class="text-gray-600 mb-2"><strong>Goal Amount:</strong> $${campaign.goal_amount}</p>
                        <p class="text-gray-600 mb-4"><strong>Status:</strong> ${campaign.status}</p>
                        <a href="./campaign_details.html?id=${campaign.id}" style="text-decoration: none;" class="inline-block px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">Details</a>
                    </div>
                </div>
            `;
            campaignList.insertAdjacentHTML('beforeend', card);
        });
    }

    function updatePagination(totalCampaigns) {
        document.getElementById('currentPage').textContent = `Page ${currentPage}`;
        document.getElementById('prevPage').disabled = currentPage === 1;
        document.getElementById('nextPage').disabled = (currentPage * campaignsPerPage) >= totalCampaigns;
    }

    document.getElementById('filter-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const type = document.getElementById('typeFilter').value;
        const status = document.getElementById('statusFilter').value;

        fetchCampaigns(type, status);
        currentPage = 1; // Reset to first page on new filter
    });

    document.getElementById('prevPage').addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            const type = document.getElementById('typeFilter').value;
            const status = document.getElementById('statusFilter').value;
            fetchCampaigns(type, status);
        }
    });

    document.getElementById('nextPage').addEventListener('click', function() {
        const type = document.getElementById('typeFilter').value;
        const status = document.getElementById('statusFilter').value;
        fetch(`http://127.0.0.1:8000/api/campaign/list/?type=${type}&status=${status}&page=${currentPage + 1}&per_page=${campaignsPerPage}`)
            .then(response => response.json())
            .then(data => {
                if (data.results.length > 0) {
                    currentPage++;
                    updateCampaignList(data);
                    updatePagination(data.count);
                }
            })
            .catch(error => console.error('Error fetching next page of campaigns:', error));
    });

    // Initial load
    fetchCampaigns();
});