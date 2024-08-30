const getQueryParams=(param)=>{
    const urlParams=new URLSearchParams(window.location.search);
    return urlParams.get(param);
}


const getCampaignDetails =()=>{
    const campaign_id=getQueryParams("id");
    // console.log(campaign_id);
 fetch(`http://127.0.0.1:8000/api/campaign/list/${campaign_id}/`)
 .then(res => res.json())
 .then(data => {
    // console.log(data)
   const div=document.getElementById('campaign-detail')
  div.innerHTML=`
  
      <h1 class="text-3xl font-bold text-gray-800">${data.title} </h1>
      <p class="text-gray-600 mt-2">Organized by <span class="font-semibold">${data.creator_name}</span></p>
      <div class="flex mt-4">
          <img src="${data.image}" alt="Campaign Image" class="w-1/3 rounded-lg shadow-lg">
          <div class="w-2/3 ml-6">
              <p class="text-gray-700 text-lg">${data.description}</p>
              <p><strong>Location: ${data.location}</strong></p> 
              <p><strong>End Date: ${data.deadline}</strong>


              
                <div class="mt-4">
                  <div class="w-full bg-gray-200 rounded-full h-4">
                      <div class="bg-green-500 h-4 rounded-full" style="width: ${data.fund_raised / data.goal_amount * 100}%;"></div>
                  </div>
                  <p class="mt-2 text-gray-600">Raised: ${data.fund_raised} BDT of ${data.goal_amount} BDT goal</p>
              </div>



          </div>
      </div>
  
  
  `
 })

}


getCampaignDetails()



document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    const campaign_id=getQueryParams("id");
    // console.log(campaign_id)
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const amount = document.getElementById('amount').value;
    const cus_phone = document.getElementById('cus_phone').value;
    const cus_add1 = document.getElementById('cus_add1').value;
    const cus_city = document.getElementById('cus_city').value;
    const cus_postcode = document.getElementById('cus_postcode').value;
    
    const token=window.localStorage.getItem("token")
    // Make a request to your backend to initiate payment
    fetch('http://127.0.0.1:8000/api/transactions/initiate-payment/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
            'X-CSRFToken': csrfToken,
        },
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
            // Redirect the user to the payment gateway
            window.location.href = data.payment_url;
        } else {
            alert('Payment initiation failed.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});


const loadDonation=()=>{
    const campaign_id=getQueryParams("id");
    fetch(`http://127.0.0.1:8000/api/transactions/list/?campaign= ${campaign_id}`)
    .then(res=>{
        if(!res.ok){
            throw new Error("Donation loading failed")
        }
        return res.json()
    })
    .then(data =>{
        parent=document.getElementById("donation")
        parent.innerHTML=''
        data.forEach(donate => {

            const formattedDate = formatDate(donate.created_at);

            li=document.createElement("li");
            li.innerHTML=`
            
             <p class="text-gray-800 font-semibold"> ${donate.donor_name} </p>
                      <p class="text-gray-600">BDT${donate.amount} - ${formattedDate}</p>
            
            `
            parent.appendChild(li);
            
        });
    })
    .catch(error=>alert(error))
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
