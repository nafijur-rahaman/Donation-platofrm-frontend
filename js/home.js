const nav = document.getElementById("conditional-element");
const userToken = localStorage.getItem("token");
const adminToken = localStorage.getItem('admin_token');

const navbarHTML = (profileLink, logoutHandler) => `
  <div class="container mx-auto px-6 py-4 flex items-center justify-between flex-wrap">
    <a href="./home.html" class="flex items-center text-white px-4 py-2 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">
      <svg class="w-8 h-8 mr-2 fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2.3 8.94a5.5 5.5 0 018.25-7.09A7 7 0 0117 8a4 4 0 01-4 4h-.293l1.146 1.146a.5.5 0 01-.707.708l-1.147-1.147V12h-2v.707l-1.146 1.146a.5.5 0 01-.708-.707l1.146-1.146H7a4 4 0 01-4-4c0-.564.125-1.099.3-1.56a5.5 5.5 0 01-.7-2.5 5.5 5.5 0 01.7-2.5zm5.9-2.94a3.5 3.5 0 104.906 4.906l-.7-.7a2.5 2.5 0 11-3.535-3.535l.7-.7-.586-.586c-.403-.403-.872-.65-1.385-.814zM8 9h4v1H8V9z" />
      </svg>
      <span class="text-4xl font-extrabold tracking-tight">Donation<span class="text-yellow-300">Platform</span></span>
    </a>

    <div class="block lg:hidden">
      <button class="flex items-center px-3 py-2 border rounded text-white border-white hover:text-gray-200 hover:border-gray-200" onclick="toggleMenu()">
        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
      </button>
    </div>

    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block" id="nav-content">
      <ul class="lg:flex-grow flex flex-col lg:flex-row lg:space-x-6 items-center">
        <li><a href="./home.html" class="text-xl font-bold m-6 hover:text-gray-200">Home</a></li>
        <li><a href="./about.html" class="text-xl m-6 font-semibold  hover:text-gray-200">About</a></li>
        <li><a href="./campaign.html" class="text-xl m-6 font-semibold hover:text-gray-200">Campaigns</a></li>
        <li><a href="./contact.html" class="text-xl m-6 font-semibold hover:text-gray-200">Contact</a></li>
      </ul>
      <div class="flex space-x-4">
        <a href="${profileLink}" class="bg-white text-blue-600 py-2 px-6 rounded-lg shadow-md hover:bg-gray-100 transition">Profile</a>
        <a style="cursor:pointer;" onclick="${logoutHandler}" class="bg-red-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-red-700 transition">Logout</a>
      </div>
    </div>
  </div>
`;

const guestNavbarHTML = `
  <div class="container mx-auto px-6 py-4 flex items-center justify-between flex-wrap">
    <a href="./home.html" class="flex items-center text-white px-4 py-2 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">
      <svg class="w-8 h-8 mr-2 fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2.3 8.94a5.5 5.5 0 018.25-7.09A7 7 0 0117 8a4 4 0 01-4 4h-.293l1.146 1.146a.5.5 0 01-.707.708l-1.147-1.147V12h-2v.707l-1.146 1.146a.5.5 0 01-.708-.707l1.146-1.146H7a4 4 0 01-4-4c0-.564.125-1.099.3-1.56a5.5 5.5 0 01-.7-2.5 5.5 5.5 0 01.7-2.5zm5.9-2.94a3.5 3.5 0 104.906 4.906l-.7-.7a2.5 2.5 0 11-3.535-3.535l.7-.7-.586-.586c-.403-.403-.872-.65-1.385-.814zM8 9h4v1H8V9z" />
      </svg>
      <span class="text-4xl font-extrabold tracking-tight">Donation<span class="text-yellow-300">Platform</span></span>
    </a>

    <div class="block lg:hidden">
      <button class="flex items-center px-3 py-2 border rounded text-white border-white hover:text-gray-200 hover:border-gray-200" onclick="toggleMenu()">
        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
      </button>
    </div>

    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block" id="nav-content">
      <ul class="lg:flex-grow flex flex-col lg:flex-row lg:space-x-6 items-center">
        <li><a href="./home.html" class="text-xl font-bold m-6 hover:text-gray-200">Home</a></li>
        <li><a href="./about.html" class="text-xl m-6 font-semibold  hover:text-gray-200">About</a></li>
        <li><a href="./campaign.html" class="text-xl m-6 font-semibold hover:text-gray-200">Campaigns</a></li>
        <li><a href="./contact.html" class="text-xl m-6 font-semibold hover:text-gray-200">Contact</a></li>
      </ul>
      <div class="flex space-x-4">
        <a href="./login.html" class="bg-white text-blue-600 py-2 px-6 rounded-lg shadow-md hover:bg-gray-100 transition">Login</a>
        <a href="./register.html" class="bg-green-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-700 transition">Register</a>
      </div>
    </div>
  </div>
`;

if (userToken) {
  nav.innerHTML = navbarHTML('./profile.html', 'handleLogout()');
} else if (adminToken) {
  nav.innerHTML = navbarHTML('./admin.html', 'handleAdminLogout()');
} else {
  nav.innerHTML = guestNavbarHTML;
}

// Toggle menu function for mobile responsiveness
function toggleMenu() {
  const navContent = document.getElementById("nav-content");
  navContent.classList.toggle("hidden");
}
