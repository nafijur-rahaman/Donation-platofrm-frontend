
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);

    fetch('http://127.0.0.1:8000/api/notification/list/', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(result => {
        alert('Message sent successfully!');
        document.getElementById('contact-form').reset();
    })
    .catch(error => {
        alert('An error occurred. Please try again.');
    });
});