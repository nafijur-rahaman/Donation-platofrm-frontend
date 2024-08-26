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
    console.log(data)
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