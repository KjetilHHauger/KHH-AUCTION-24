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

  if (loginLink) loginLink.style.display = token ? "none" : "inline";
  if (mobileLoginLink) mobileLoginLink.style.display = token ? "none" : "inline";
  if (profileLink) profileLink.style.display = token ? "block" : "none";
  if (logoutButton) logoutButton.style.display = token ? "inline" : "none";
  if (mobileLogoutButton) mobileLogoutButton.style.display = token ? "inline" : "none";
}
