const nav = document.getElementById("conditional-element");
const userToken = localStorage.getItem("token");


if(userToken){
  nav.innerHTML+=`

        <div class="bg-white shadow sticky top-0 z-50" x-data="{ open: false }">
        <div class="container mx-auto px-4">
          <div class="flex items-center justify-between py-4">
            <!-- Logo -->
            <a href="home.html" class="text-3xl font-bold">
              <span class="text-blue-600">Donation</span> 
              <span class="text-purple-600">Platform</span>
            </a>
            
            <!-- Links for Desktop -->
            <div class="hidden sm:flex sm:items-center space-x-16">
              <a href="home.html" class="text-gray-800 text-xl font-semibold hover:text-purple-600">Home</a>
              <a href="campaign.html" class="text-gray-800 text-xl font-semibold hover:text-purple-600">Campaign</a>
              <a href="about.html" class="text-gray-800 text-xl font-semibold hover:text-purple-600">About</a>
              <a href="contact.html" class="text-gray-800 text-lg font-semibold hover:text-purple-600">Contact</a>
            </div>
      
            <!-- Auth Links for Desktop -->
            <div class="hidden sm:flex sm:items-center space-x-4">
              <a href="profile.html" class="bg-blue-600 text-white text-lg font-semibold px-4 py-2 rounded-lg hover:bg-blue-700">Profile</a>
              <a onclick="handleLogout()" style="cursor:pointer;" class="bg-red-600 text-white text-lg font-semibold px-4 py-2 rounded-lg hover:bg-red-700">Logout</a>
            </div>
      
            <!-- Hamburger Icon for Mobile -->
            <div class="sm:hidden cursor-pointer" @click="open = !open">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
          </div>
      
          <!-- Mobile Menu -->
          <div x-show="open" class="block sm:hidden bg-white border-t-2 py-2" @click.away="open = false">
            <div class="flex flex-col space-y-1">
              <a href="home.html" class="text-gray-800 text-sm font-semibold hover:text-purple-600">Home</a>
              <a href="campaign.html" class="text-gray-800 text-sm font-semibold hover:text-purple-600">Campaign</a>
              <a href="about.html" class="text-gray-800 text-sm font-semibold hover:text-purple-600">About</a>
              <a href="contact.html" class="text-gray-800 text-sm font-semibold hover:text-purple-600">Contact</a>
            </div>
            <div class="flex flex-col items-center space-y-2 mt-2">
              <a href="profile.html" class="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg w-2/4 text-center hover:bg-blue-700">Sign in</a>
              <a onclick="handleLogout()" style="cursor:pointer;" class="bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-lg w-2/4 text-center hover:bg-red-700">Sign up</a>
            </div>
          </div>
        </div>
      </div>

  
  
  `
}else{
  nav.innerHTML+=`

<div class="bg-white shadow sticky top-0 z-50">
  <div class="container mx-auto px-4">
    <div class="flex items-center justify-between py-4">
      <!-- Logo -->
      <a href="home.html" class="text-3xl font-bold">
        <span class="text-blue-600">Donation</span> 
        <span class="text-purple-600">Platform</span>
      </a>
      
      <!-- Links for Desktop -->
      <div class="hidden sm:flex sm:items-center space-x-16">
        <a href="home.html" class="text-gray-800 text-xl font-semibold hover:text-purple-600">Home</a>
        <a href="campaign.html" class="text-gray-800 text-xl font-semibold hover:text-purple-600">Campaign</a>
        <a href="about.html" class="text-gray-800 text-xl font-semibold hover:text-purple-600">About</a>
        <a href="contact.html" class="text-gray-800 text-xl font-semibold hover:text-purple-600">Contact</a>
      </div>

      <!-- Auth Links for Desktop -->
      <div class="hidden sm:flex sm:items-center space-x-4">
        <a href="login.html" class="bg-blue-600 text-white text-lg font-semibold px-4 py-2 rounded-lg hover:bg-blue-700">Sign in</a>
        <a href="register.html" class="bg-purple-600 text-white text-lg font-semibold px-4 py-2 rounded-lg hover:bg-purple-700">Sign up</a>
      </div>

      <!-- Hamburger Icon for Mobile -->
      <div class="sm:hidden cursor-pointer" onclick="toggleMenu()">
        <svg id="hamburgerIcon" xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg id="closeIcon" xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-purple-600 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div id="mobileMenu" class="hidden sm:hidden bg-white border-t-2 py-2">
      <div class="flex flex-col space-y-1">
        <a href="home.html" class="text-gray-800 text-sm font-semibold hover:text-purple-600">Home</a>
        <a href="campaign.html" class="text-gray-800 text-sm font-semibold hover:text-purple-600">Campaign</a>
        <a href="about.html" class="text-gray-800 text-sm font-semibold hover:text-purple-600">About</a>
        <a href="contact.html" class="text-gray-800 text-sm font-semibold hover:text-purple-600">Contact</a>
      </div>
      <div class="flex flex-col items-center space-y-2 mt-2">
        <a href="login.html" class="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg w-2/4 text-center hover:bg-blue-700">Sign in</a>
        <a href="register.html" class="bg-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-lg w-2/4 text-center hover:bg-purple-700">Sign up</a>
      </div>
    </div>
  </div>
</div>

  
  
  `
}


function toggleMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  const hamburgerIcon = document.getElementById('hamburgerIcon');
  const closeIcon = document.getElementById('closeIcon');

  if (mobileMenu.classList.contains('hidden')) {
    mobileMenu.classList.remove('hidden');
    hamburgerIcon.classList.add('hidden');
    closeIcon.classList.remove('hidden');
  } else {
    mobileMenu.classList.add('hidden');
    hamburgerIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
  }
}