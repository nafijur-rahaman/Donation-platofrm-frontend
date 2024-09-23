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
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);

    fetch('https://donation-platform-backend-psi.vercel.app/api/notification/list/', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(result => {
        su_showAlert('Message sent successfully!');
        document.getElementById('contact-form').reset();
    })
    .catch(error => {
        showAlert('An error occurred. Please try again.');
    });
});