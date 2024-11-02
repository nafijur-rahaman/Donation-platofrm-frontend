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
const getQueryParams = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}


const getCampaignDetails = () => {
    const campaign_id = getQueryParams("id");
    // console.log(campaign_id);
    fetch(`https://donation-platform-backend-psi.vercel.app/api/campaign/list/${campaign_id}/`)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            const div = document.getElementById('campaign-detail')
            div.innerHTML = `
  
      <h1 class="text-3xl font-bold text-blue-600">${data.title} </h1>
      <p class="text-gray-600 mt-2">Organized by <span class="font-semibold">${data.creator_name}</span></p>
      <div class="flex mt-4">
          <img src="https://res.cloudinary.com/dwsp8rft8/${data.image}" alt="Campaign Image" class="w-1/3 rounded-lg shadow-lg">
          <div class="w-2/3 ml-6">
              <p class="text-gray-700 text-lg">${data.description}</p>
              <p><strong>Location: </strong><span>${data.location} </span> </p> 
              <p><strong>End Date: </strong><span>${data.deadline}</span> </p>


              
                <div class="mt-4">
                  <div class="w-full bg-gray-200 rounded-full h-4">
                      <div class="bg-green-500 h-4 rounded-full" style="width: ${data.fund_raised / data.goal_amount * 100}%;"></div>
                  </div>
                  <p class="mt-2 text-purple-800 font-bold">Raised: ${data.fund_raised} BDT of ${data.goal_amount} BDT goal</p>
              </div>



          </div>
      </div>
  
  
  `
        })

}


getCampaignDetails()



document.getElementById('payment-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const campaign_id = getQueryParams("id");
    // console.log(campaign_id)
    fetch(`https://donation-platform-backend-psi.vercel.app/api/campaign/list/${campaign_id}/`)
    .then(res =>{
        if(!res.ok){
            throw new Error("Campaign not found");
        }
        return res.json();
    })
    .then(data=>{
        
        if(data.goal_amount===data.fund_raised){
            su_showAlert("The Campaign Successfully Completed! You may look for another campaign.")
        }else{
          
            const amount = parseFloat(document.getElementById('amount').value);
    // console.log(amount)
    if (amount > data.goal_amount) {
        showAlert("You can't donate over the goal amount");
    } else if (amount < 0) {
        showAlert("You can't donate a negative amount");
    } else if (amount === 0) {
        showAlert("You can't donate 0 amount");
    }else if(data.status==='cancel'){
showAlert("The campaign is canceled");
    }else {
        initiatePayment(amount,data.id);
    }
        }

        })
});





function initiatePayment(amount,campaign_id) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const cus_phone = document.getElementById('cus_phone').value;
    const cus_add1 = document.getElementById('cus_add1').value;
    const cus_city = document.getElementById('cus_city').value;
    const cus_postcode = document.getElementById('cus_postcode').value;
    const token = localStorage.getItem("token");
    const headers = {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
    };

    if (token) {
        headers['Authorization'] = `Token ${token}`;
    }

    fetch('https://donation-platform-backend-psi.vercel.app/api/transactions/initiate-payment/', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            amount: amount,
            campaign_id: campaign_id,
            cus_phone: cus_phone,
            cus_add1: cus_add1,
            cus_city: cus_city,
            cus_postcode: cus_postcode
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.payment_url) {
            window.location.href = data.payment_url;
        } else {
            showAlert('Payment initiation failed.');
        }
    })
    .catch(error => {
        showAlert('Error: ' + error.message); 
    });
}



const loadDonation = () => {
    const campaign_id = getQueryParams("id");
    fetch(`https://donation-platform-backend-psi.vercel.app/api/transactions/list/?campaign=${campaign_id}`)
        .then(res => {
            if (!res.ok) {
                throw new Error("Donation loading failed");
            }
            return res.json();
        })
        .then(data => {
           
            data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

            const parent = document.getElementById("donation");
            parent.innerHTML = '';
            data.forEach(donate => {
                
                const formattedDate = formatDate(donate.created_at);

                const li = document.createElement("li");
               if(donate.payment_status==='completed'){
                li.innerHTML = `
                <p class="text-gray-800 text-lg font-bold">${donate.donor_name}</p>
                <p class="text-green-600 font-semibold">BDT${donate.amount} - ${formattedDate}</p>
            `;
               }
                
                parent.appendChild(li);
            });
        })
        .catch(error => alert(error));
}




loadDonation()


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



//review 




const form = document.getElementById('submit-review-form');
form.addEventListener('submit', function (event) {
    event.preventDefault();

    
    const campaignID = getQueryParams("id");
    const userID = localStorage.getItem('user_id');
    const ratingSymbol = document.getElementById('rating').value;
    const comments = document.getElementById('comments').value;
    const reviewData = {
        rating: ratingSymbol,
        comments: comments,
        reviewer: userID,
        campaign: campaignID
    };



    fetch('https://donation-platform-backend-psi.vercel.app/api/campaign/review/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
    })
    .then(res =>{
        if(!res.ok){
            throw new Error("Campaign not found");
        }
        return res.json();
    })
    .then(data =>{
        su_showAlert('review submit successfully')
        setTimeout(() => {
            window.location.reload()
        }, 1000);
    })
    .catch(error =>showAlert(error))





});



// load reviews




const loadReviews=()=>{
    const campaignID=getQueryParams("id");
    fetch(`https://donation-platform-backend-psi.vercel.app/api/campaign/review/?campaign=${campaignID}`)
    .then(res =>{
        if(!res.ok){
            throw new Error("Campaign not found");
        }
        return res.json();
    })
    .then(data=>{
        // console.log(data)
        const parent=document.getElementById("reivew-list");
        parent.innerHTML='';
        data.forEach(review=>{
            const child=document.createElement("div");
            child.classList.add('bg-white', 'p-6', 'rounded-lg', 'shadow-lg', 'w-80', 'flex-shrink-0');
            child.innerHTML=`
              <p class="text-gray-700 mb-4">“${review.comments}”</p>
              <h3 class="text-lg font-semibold text-gray-800"> ${review.reviewer_name} </h3>
              <p class="text-gray-600">Donor</p>
            
            `;
            parent.appendChild(child);
        })
        

    })
    .catch(error=>ShowAlert(error))
}


loadReviews()