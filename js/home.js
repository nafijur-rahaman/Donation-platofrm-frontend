
const nav=document.getElementById("conditional-element");
const token=localStorage.getItem("token");
const admin_token=localStorage.getItem('admin_token')

if(token){
    nav.innerHTML=`
 <ul class="navbar-nav ms-3">
      <li class="nav-item">
        <a class="btn btn-primary text-white " href="profile.html" style="padding: 0.5rem 1.5rem; border-radius: 30px; font-weight: 700;margin-right: 10px; ">Profile</a>
      </li>
      <li class="nav-item">
        <a onclick="handleLogout()" class="btn btn-danger text-white"  id="logout-button" style="padding: 0.5rem 1.5rem; border-radius: 30px; font-weight: 700; ">Logout</a>
      </li>
    </ul>
  `;
    
}else if (admin_token) {
  nav.innerHTML=`
  <ul class="navbar-nav ms-3">
  <li class="nav-item">
    <a class="btn btn-primary text-white " href="admin.html" style="padding: 0.5rem 1.5rem; border-radius: 30px; font-weight: 700;margin-right: 10px; ">Profile</a>
  </li>
  <li class="nav-item">
    <a onclick="handleAdminLogout()" class="btn btn-danger text-white"  id="logout-button" style="padding: 0.5rem 1.5rem; border-radius: 30px; font-weight: 700; ">Logout</a>
  </li>
</ul>
`;
}


else{
    nav.innerHTML=`
    
          <ul class="navbar-nav ms-3">
            <li class="nav-item">
              <a class="btn btn-light text-dark me-2" href="login.html" style="
                  padding: 0.5rem 1.5rem;
                  border-radius: 30px;
                  font-weight: 700;
                  transition: background-color 0.3s, color 0.3s;
                ">
                Login
              </a>
            </li>
            <li class="nav-item">
              <a class="btn btn-primary" href="register.html" style="
                  padding: 0.5rem 1.5rem;
                  border-radius: 30px;
                  font-weight: 700;
                  transition: background-color 0.3s, color 0.3s;
                ">
                Register
              </a>
            </li>
          </ul>
    
    `
}