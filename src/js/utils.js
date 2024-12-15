// NAVIGATION
export async function loadNav() {
  const navElement = document.createElement("div");
  try {
    const response = await fetch("/src/nav.html");
    if (!response.ok) {
      throw new Error(`Failed to load nav.html: ${response.statusText}`);
    }
    const navHTML = await response.text();
    navElement.innerHTML = navHTML;
    document.body.insertBefore(navElement, document.body.firstChild);
  } catch (error) {
    console.error("Error loading nav:", error);
    return;
  }

  const token = localStorage.getItem("accessToken");

  const loginLink = document.getElementById("loginLink");
  const mobileLoginLink = document.getElementById("mobileLoginLink");
  const profileLink = document.querySelector('a[href="/src/profile.html"]');
  const logoutButton = document.getElementById("logoutButton");
  const mobileLogoutButton = document.getElementById("mobileLogoutButton");
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  const mobileAuctionsLink = document.createElement("a");
  mobileAuctionsLink.href = "/index.html";
  mobileAuctionsLink.textContent = "Auctions";
  mobileAuctionsLink.className =
    "block py-4 hover:bg-secondary text-center rounded";

  if (mobileMenu) {
    mobileMenu.prepend(mobileAuctionsLink); 
  }

  // Show/Hide 
  if (loginLink) loginLink.style.display = token ? "none" : "inline";
  if (mobileLoginLink) mobileLoginLink.style.display = token ? "none" : "inline";
  if (profileLink) profileLink.style.display = token ? "block" : "none";
  if (logoutButton) logoutButton.style.display = token ? "inline" : "none";
  if (mobileLogoutButton) mobileLogoutButton.style.display = token ? "inline" : "none";

  // Mobile toggle
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Logout
  const handleLogout = () => {
    localStorage.clear(); 
    window.location.href = "/index.html"; 
  };

  if (logoutButton) logoutButton.addEventListener("click", handleLogout);
  if (mobileLogoutButton) mobileLogoutButton.addEventListener("click", handleLogout);
}

// FOOTER
export async function loadFooter() {
  const footerContainer = document.getElementById("footer-container");
  if (!footerContainer) return;

  try {
    const response = await fetch("/src/footer.html");
    if (!response.ok) {
      throw new Error(`Failed to load footer.html: ${response.statusText}`);
    }

    const footerHTML = await response.text();
    footerContainer.innerHTML = footerHTML;

    footerContainer.className = "bg-primary text-white h-24 border-t flex items-center justify-center";
  } catch (error) {
    console.error("Error loading footer:", error);
  }
}

