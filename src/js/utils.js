export async function loadNav() {
  const navElement = document.createElement("div");
  const response = await fetch("/src/nav.html");
  const navHTML = await response.text();
  navElement.innerHTML = navHTML;
  document.body.insertBefore(navElement, document.body.firstChild);

  const token = localStorage.getItem("accessToken");
  const loginLink = document.getElementById("loginLink");
  const mobileLoginLink = document.getElementById("mobileLoginLink");
  const profileLink = document.querySelector('a[href="/src/profile.html"]');
  const logoutButton = document.getElementById("logoutButton");
  const mobileLogoutButton = document.getElementById("mobileLogoutButton");
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  // Show/Hide links
  if (token) {
    // User logged in
    loginLink.style.display = "none";
    mobileLoginLink.style.display = "none";
    profileLink.style.display = "block"; // Ensure Profile is visible
    logoutButton.style.display = "inline";
    mobileLogoutButton.style.display = "inline";
  } else {
    // User not logged
    profileLink.style.display = "none";
    logoutButton.style.display = "none";
    mobileLogoutButton.style.display = "none";
    loginLink.style.display = "inline"; // Ensure Login is visible
    mobileLoginLink.style.display = "inline";
  }

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/index.html";
  };
  if (logoutButton) logoutButton.addEventListener("click", handleLogout);
  if (mobileLogoutButton)
    mobileLogoutButton.addEventListener("click", handleLogout);

  // Mobile menu toggle
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }
}
