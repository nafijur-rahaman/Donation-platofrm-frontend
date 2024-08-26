function showAlert(message) {
    document.getElementById("alertMessage").textContent = message;
    document.getElementById("customAlert").style.display = "flex";
}

function closeAlert() {
    document.getElementById("customAlert").style.display = "none";
}




const handleProfile = () => {
    const user_id = localStorage.getItem("user_id")

    fetch(`http://127.0.0.1:8000/api/users/list/${user_id}`)
        .then(res => res.json())
        .then(data => {
            const user = data;
            const div = document.getElementById("profile-card")

            div.innerHTML = `
    
              <div class="image overflow-hidden">
                  <img  class="h-auto w-full mx-auto rounded-full"
                      src="${user.image}"
                      alt="Profile Picture">
              </div>
              <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">${user.first_name} ${user.last_name}</h1>
              <h3 class="text-gray-600 font-lg text-semibold leading-6">${user.profession}</h3>
              <p class="text-sm text-gray-500 hover:text-gray-600 leading-6">
              ${user.bio}
              </p>
              <ul class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                  <li class="flex items-center py-3">
                      <span>Status</span>
                      <span class="ml-auto"><span
                              class="bg-blue-500 py-1 px-2 rounded text-white text-sm">${user.status}</span></span>
                  </li>
                  <li class="flex items-center py-3">
                      <span>Member since</span>
                      <span class="ml-auto">${user.created}</span>
                  </li>
              </ul>
    
    `
            const section = document.getElementById("profile-about")
            section.innerHTML = `

<div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                  <span class="text-blue-500">
                      <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M5.121 17.804A13.937 13.937 0 0112 15c2.045 0 3.987.307 5.878.804M19 10V5a2 2 0 00-2-2h-1a2 2 0 00-2 2v1M5 10V5a2 2 0 012-2h1a2 2 0 012 2v1m0 9v5a2 2 0 002 2h4a2 2 0 002-2v-5M12 15v2m0 4h.01" />
                      </svg>
                  </span>
                  <span class="tracking-wide">About</span>
              </div>
              <div>
                  <div class="text-gray-700">
                      <div class="grid md:grid-cols-2 text-sm">
                          <div class="grid grid-cols-2">
                              <div class="px-4 py-2 font-semibold">Full Name</div>
                              <div class="px-4 py-2">${user.first_name}  ${user.last_name}</div>
                          </div>
                          <div class="grid grid-cols-2">
                              <div class="px-4 py-2 font-semibold">Email</div>
                              <div class="px-4 py-2">
                                  <a class="text-blue-500 hover:underline" href="mailto:${user.email}">${user.email}</a>
                              </div>
                          </div>
                          <div class="grid grid-cols-2">
                              <div class="px-4 py-2 font-semibold">Phone</div>
                              <div class="px-4 py-2">${user.phone_number}</div>
                          </div>
                          <div class="grid grid-cols-2">
                              <div class="px-4 py-2 font-semibold">Address</div>
                              <div class="px-4 py-2">${user.address}</div>
                          </div>
                      </div>
                  </div>
              </div>
              <button
                  class="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">Edit
                  Profile</button>


`



        })
}


handleProfile()



const handleFundraiser = (event) => {
    const user_id = window.localStorage.getItem("user_id");
    const token = window.localStorage.getItem("token");
    event.preventDefault();


    const organization = getValue('organization');
    const experience_years = getValue("work");
    const service_areas = getValue('service');
    const message = getValue("message");


    const info = new FormData();
    info.append("user", user_id);
    info.append("organization", organization);
    info.append("experience_years", experience_years);
    info.append("service_areas", service_areas);
    info.append("message", message)



    fetch("http://127.0.0.1:8000/api/campaign/creator-request/", {

        method: "POST",
        body: info,
        headers: {
            Authorization: `Token ${token}`,
        },

    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                const form = document.getElementById('fund_raiser_form');
                form.reset();
                showAlert(data.message);

            } else {
                showAlert('A error happened')
            }
        })

}

const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelModalBtn = document.getElementById('cancelModalBtn');
const fundraiserModal = document.getElementById('fundraiserModal');

if (openModalBtn && fundraiserModal) {
    openModalBtn.addEventListener('click', () => {
        fundraiserModal.classList.remove('hidden');
    });
}

if (closeModalBtn && fundraiserModal) {
    closeModalBtn.addEventListener('click', () => {
        fundraiserModal.classList.add('hidden');
    });
}

if (cancelModalBtn && fundraiserModal) {
    cancelModalBtn.addEventListener('click', () => {
        fundraiserModal.classList.add('hidden');
    });
}

const fundRaiser = () => {
    const user_id = window.localStorage.getItem("user_id");
    fetch(`http://127.0.0.1:8000/api/campaign/creator-request/?user_id=${user_id}`)
        .then(res => res.json())
        .then(data => {
            if (data.results[0].status === "approved") {
                const modal = document.getElementById("openModalBtn");
                modal.classList.add("hidden")

                let a = document.createElement("a");
                a.textContent = "Go to fundraiser Workspace";
                a.style.textDecoration = "none";
                a.style.textAlign = "center";
                a.href = "fundraiser_workspace.html"; 
                a.classList.add(
                    "block",
                    "w-full",
                    "text-white",
                    "bg-green-500",
                    "text-sm",
                    "font-semibold",
                    "rounded-lg",
                    "hover:bg-green-700",
                    "focus:outline-none",
                    "focus:shadow-outline",
                    "focus:bg-green-700",
                    "hover:shadow-xs",
                    "p-3",
                    "my-2"
                );

                const action = document.getElementById("profile-action");
                action.appendChild(a);


            };
        })
};
fundRaiser()



const getValue = (id) => {
    const value = document.getElementById(id).value;
    return value;
};