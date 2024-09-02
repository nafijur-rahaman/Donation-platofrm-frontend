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

const addCampaign = (event) => {

    event.preventDefault();
    const user_id = localStorage.getItem("user_id");
    // console.log(user_id)
    fetch(`https://donation-platform-backend-rmqk.onrender.com/api/campaign/creator/?user_id=${user_id}`)
        .then(res => {
            if (!res.ok) {
                throw new Error(`You are not a fundraiser! status: ${res.status}`);
            }
            return res.json()
        })
        .then(data => {

            const creator_id = data[0].id
            const form = document.getElementById("add-campaign");
            const formData = new FormData(form);
            const token = localStorage.getItem("token");
            formData.append("creator", parseInt(creator_id));
            fetch("https://donation-platform-backend-rmqk.onrender.com/api/campaign/list/", {

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
                    su_showAlert("Campaign Create successfully");
                    form.reset();
                    setTimeout(() => {
                        window.location.href = "fundraiser_workspace.html";
                    }, 3000);
                    
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

