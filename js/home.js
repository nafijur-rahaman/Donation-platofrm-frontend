const nav = document.getElementById("conditional-element");
const userToken = localStorage.getItem("token");
const adminToken = localStorage.getItem('admin_token');

if (userToken) {
    nav.innerHTML = `
  <div class="container mx-auto px-6 py-4 flex items-center justify-between">
          <a href="./home.html" class="flex items-center text-white px-4 py-2 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">
        <!-- Optional logo icon -->
        <svg class="w-8 h-8 mr-2 fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2.3 8.94a5.5 5.5 0 018.25-7.09A7 7 0 0117 8a4 4 0 01-4 4h-.293l1.146 1.146a.5.5 0 01-.707.708l-1.147-1.147V12h-2v.707l-1.146 1.146a.5.5 0 01-.708-.707l1.146-1.146H7a4 4 0 01-4-4c0-.564.125-1.099.3-1.56a5.5 5.5 0 01-.7-2.5 5.5 5.5 0 01.7-2.5zm5.9-2.94a3.5 3.5 0 104.906 4.906l-.7-.7a2.5 2.5 0 11-3.535-3.535l.7-.7-.586-.586c-.403-.403-.872-.65-1.385-.814zM8 9h4v1H8V9z" />
        </svg>
        <span class="text-4xl font-extrabold tracking-tight">Donation<span class="text-yellow-300">Platform</span></span>
    </a>
            

           
            <ul class="flex space-x-6 items-center">
                <li><a href="./home.html" class="text-xl font-bold m-6 hover:text-gray-200">Home</a></li>
                <li><a href="./about.html" class="text-xl m-6 font-semibold  hover:text-gray-200">About</a></li>
                <li><a href="./campaign.html" class="text-xl m-6 font-semibold hover:text-gray-200">Campaigns</a></li>
                <li><a href="./contact.html" class="text-xl m-6 font-semibold hover:text-gray-200">Contact</a></li>
            </ul>
            <div class="flex space-x-4">
           
                <a href="./profile.html" class="bg-white text-blue-600 py-2 px-6 rounded-lg shadow-md hover:bg-gray-100 transition" id="loginBtn">Profile</a>
             
                <a style="cursor:pointer;"  onclick="handleLogout()" class="bg-red-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-red-700 transition" id="logoutBtn">Logout</a>
              
                
            </div>
        </div>
    `;
} else if (adminToken) {
    nav.innerHTML = `
<div class="container mx-auto px-6 py-4 flex items-center justify-between">
    <a href="./home.html" class="flex items-center text-white px-4 py-2 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">
        <!-- Optional logo icon -->
        <svg class="w-8 h-8 mr-2 fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2.3 8.94a5.5 5.5 0 018.25-7.09A7 7 0 0117 8a4 4 0 01-4 4h-.293l1.146 1.146a.5.5 0 01-.707.708l-1.147-1.147V12h-2v.707l-1.146 1.146a.5.5 0 01-.708-.707l1.146-1.146H7a4 4 0 01-4-4c0-.564.125-1.099.3-1.56a5.5 5.5 0 01-.7-2.5 5.5 5.5 0 01.7-2.5zm5.9-2.94a3.5 3.5 0 104.906 4.906l-.7-.7a2.5 2.5 0 11-3.535-3.535l.7-.7-.586-.586c-.403-.403-.872-.65-1.385-.814zM8 9h4v1H8V9z" />
        </svg>
        <span class="text-4xl font-extrabold tracking-tight">Donation<span class="text-yellow-300">Platform</span></span>
    </a>

           
            <ul class="flex space-x-6 items-center">
                <li><a href="./home.html" class="text-xl font-bold m-6 hover:text-gray-200">Home</a></li>
                <li><a href="./about.html" class="text-xl m-6 font-semibold  hover:text-gray-200">About</a></li>
                <li><a href="./campaign.html" class="text-xl m-6 font-semibold hover:text-gray-200">Campaigns</a></li>
                <li><a href="./contact.html" class="text-xl m-6 font-semibold hover:text-gray-200">Contact</a></li>
            </ul>
            <div class="flex space-x-4"> 

             <a href="./admin.html" class="bg-white text-blue-600 py-2 px-6 rounded-lg shadow-md hover:bg-gray-100 transition" id="loginBtn">Profile</a>

                <a style="cursor:pointer;" onclick="handleAdminLogout()" class="bg-red-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-red-700 transition" id="logoutBtn">Logout</a>
              
                
            </div>
        </div>
    `;
} else {
    nav.innerHTML = `
        <div class="container mx-auto px-6 py-4 flex items-center justify-between">
       <a href="./home.html" class="flex items-center text-white px-4 py-2 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">
        <!-- Optional logo icon -->
        <svg class="w-8 h-8 mr-2 fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2.3 8.94a5.5 5.5 0 018.25-7.09A7 7 0 0117 8a4 4 0 01-4 4h-.293l1.146 1.146a.5.5 0 01-.707.708l-1.147-1.147V12h-2v.707l-1.146 1.146a.5.5 0 01-.708-.707l1.146-1.146H7a4 4 0 01-4-4c0-.564.125-1.099.3-1.56a5.5 5.5 0 01-.7-2.5 5.5 5.5 0 01.7-2.5zm5.9-2.94a3.5 3.5 0 104.906 4.906l-.7-.7a2.5 2.5 0 11-3.535-3.535l.7-.7-.586-.586c-.403-.403-.872-.65-1.385-.814zM8 9h4v1H8V9z" />
        </svg>
        <span class="text-4xl font-extrabold tracking-tight">Donation<span class="text-yellow-300">Platform</span></span>
    </a>
            

           
            <ul class="flex space-x-6 items-center">
                <li><a href="./home.html" class="text-xl font-bold m-6 hover:text-gray-200">Home</a></li>
                <li><a href="./about.html" class="text-xl m-6 font-semibold  hover:text-gray-200">About</a></li>
                <li><a href="./campaign.html" class="text-xl m-6 font-semibold hover:text-gray-200">Campaigns</a></li>
                <li><a href="./contact.html" class="text-xl m-6 font-semibold hover:text-gray-200">Contact</a></li>
            </ul>
            <div class="flex space-x-4">
           
                <a href="./login.html" class="bg-white text-blue-600 py-2 px-6 rounded-lg shadow-md hover:bg-gray-100 transition" id="loginBtn">Login</a>
             
                <a href="./register.html" class="bg-green-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-700 transition" id="logoutBtn">Register</a>
              
                
            </div>
        </div>
    `;
}
