const nav = document.getElementById("conditional-element");
const userToken = localStorage.getItem("token");
const adminToken = localStorage.getItem('admin_token');

if(userToken){
  nav.innerHTML+=`
  
          <div class="container mx-auto px-6 py-4 flex justify-between items-center">
            <div class="flex items-center">
                <span class="text-2xl font-bold text-white">Donation platform</span>
            </div>
            <div class="hidden md:flex space-x-8">
                <a href="./home.html" class="text-gray-300 hover:text-blue-400 text-xl font-semibold transition duration-300">Home</a>
                <a href="./campaign.html" class="text-gray-300 hover:text-blue-400 text-xl font-semibold transition duration-300">Campaign</a>
                <a href="./about.html" class="text-gray-300 hover:text-blue-400 text-xl font-semibold transition duration-300">About</a>
                <a href="./contact.html" class="text-gray-300 hover:text-blue-400 text-xl font-semibold transition duration-300">Contact</a>
                <a href="./profile.html" class="text-white bg-blue-600 hover:bg-blue-700 text-xl font-semibold transition duration-300 px-4 py-2 rounded-lg shadow">Profile</a>
                <a onclick="handleLogout()" style="cursor:pointer;" class="text-white bg-red-600 hover:bg-red-700 text-xl font-semibold transition duration-300 px-4 py-2 rounded-lg shadow">Logout</a>
            </div>
            <div class="md:hidden flex items-center">
                <button id="menu-toggle" class="text-white focus:outline-none">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>
        </div>
        <div id="mobile-menu" class="md:hidden hidden bg-gray-800 shadow-xl">
            <a href="./home.html" class="block text-gray-300 hover:text-blue-400 transition duration-300 px-4 py-2">Home</a>
            <a href="./campaign.html" class="block text-gray-300 hover:text-blue-400 transition duration-300 px-4 py-2">Campaign</a>
            <a href="./about.html" class="block text-gray-300 hover:text-blue-400 transition duration-300 px-4 py-2">About</a>
            <a href="./contact.html" class="block text-gray-300 hover:text-blue-400 transition duration-300 px-4 py-2">Contact</a>
            <a href="./profile.html" class="block text-white bg-blue-600 hover:bg-blue-700 transition duration-300 rounded-lg text-center py-1 px-2">Profile</a>
            <a onclick="handleLogout()" style="cursor:pointer;" class="block text-white bg-red-600 hover:bg-red-700 transition duration-300 rounded-lg text-center py-1 px-2">Logout</a>
        </div>
  
  
  
  
  `
}else if(adminToken){
  nav.innerHTML+=`
  
  <div class="container mx-auto px-6 py-4 flex justify-between items-center">
    <div class="flex items-center">
        <span class="text-2xl font-bold text-white">Donation platform</span>
    </div>
    <div class="hidden md:flex space-x-8">
        <a href="./home.html" class="text-gray-300 hover:text-blue-400 text-xl font-semibold transition duration-300">Home</a>
        <a href="./campaign.html" class="text-gray-300 hover:text-blue-400 text-xl font-semibold transition duration-300">Campaign</a>
        <a href="./about.html" class="text-gray-300 hover:text-blue-400 text-xl font-semibold transition duration-300">About</a>
        <a href="./contact.html" class="text-gray-300 hover:text-blue-400 text-xl font-semibold transition duration-300">Contact</a>
        <a href="./admin.html" class="text-white bg-blue-600 hover:bg-blue-700 text-xl font-semibold transition duration-300 px-4 py-2 rounded-lg shadow">Profile</a>
        <a onclick="handleAdminLogout" style="cursor:pointer;" class="text-white bg-red-600 hover:bg-red-700 text-xl font-semibold transition duration-300 px-4 py-2 rounded-lg shadow">Logout</a>
    </div>
    <div class="md:hidden flex items-center">
        <button id="menu-toggle" class="text-white focus:outline-none">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
        </button>
    </div>
</div>
<div id="mobile-menu" class="md:hidden hidden bg-gray-800 shadow-xl">
    <a href="./home.html" class="block text-gray-300 hover:text-blue-400 transition duration-300 px-4 py-2">Home</a>
    <a href="./campaign.html" class="block text-gray-300 hover:text-blue-400 transition duration-300 px-4 py-2">Campaign</a>
    <a href="./about.html" class="block text-gray-300 hover:text-blue-400 transition duration-300 px-4 py-2">About</a>
    <a href="./contact.html" class="block text-gray-300 hover:text-blue-400 transition duration-300 px-4 py-2">Contact</a>
    <a href="./admin.html" class="block text-white bg-blue-600 hover:bg-blue-700 transition duration-300 rounded-lg text-center py-1 px-2">Profile</a>
    <a onclick="handleAdminLogout()" style="cursor:pointer;" class="block text-white bg-red-600 hover:bg-red-700 transition duration-300 rounded-lg text-center py-1 px-2">Logout</a>
</div>




`
}


else{
  nav.innerHTML+=`
        <div class="container mx-auto px-6 py-4 flex justify-between items-center">
            <div class="flex items-center">
                <span class="text-2xl font-bold text-white">Donation platform</span>
            </div>
            <div class="hidden md:flex space-x-8">
                <a href="./home.html" class="text-gray-300 hover:text-blue-400 text-xl font-semibold transition duration-300">Home</a>
                <a href="./campaign.html" class="text-gray-300 hover:text-blue-400 text-xl font-semibold transition duration-300">Campaign</a>
                <a href="./about.html" class="text-gray-300 hover:text-blue-400 text-xl font-semibold transition duration-300">About</a>
                <a href="./contact.html" class="text-gray-300 hover:text-blue-400 text-xl font-semibold transition duration-300">Contact</a>
                <a href="./login.html" class="text-white bg-blue-600 hover:bg-blue-700 text-xl font-semibold transition duration-300 px-4 py-2 rounded-lg shadow">Login</a>
                <a href="./register.html" class="text-white bg-green-600 hover:bg-green-700 text-xl font-semibold transition duration-300 px-4 py-2 rounded-lg shadow">Register</a>
            </div>
            <div class="md:hidden flex items-center">
                <button id="menu-toggle" class="text-white focus:outline-none">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>
        </div>
        <div id="mobile-menu" class="md:hidden hidden bg-gray-800 shadow-xl">
            <a href="./home.html" class="block text-gray-300 hover:text-blue-400 transition duration-300 px-4 py-2">Home</a>
            <a href="./campaign.html" class="block text-gray-300 hover:text-blue-400 transition duration-300 px-4 py-2">Campaign</a>
            <a href="./about.html" class="block text-gray-300 hover:text-blue-400 transition duration-300 px-4 py-2">About</a>
            <a href="./contact.html" class="block text-gray-300 hover:text-blue-400 transition duration-300 px-4 py-2">Contact</a>
            <a href="./login.html" class="block text-white bg-blue-600 hover:bg-blue-700 transition duration-300 rounded-lg text-center py-1 px-2">Login</a>
            <a href="./register.html" class="block text-white bg-green-600 hover:bg-green-700 transition duration-300 rounded-lg text-center py-1 px-2">Register</a>
        </div>
  
  
  
  `
}






const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});