import { API_BASE_URL } from './api.js';
import { loadFooter, loadNav } from './utils.js';

loadNav();
loadFooter();

const registerForm = document.getElementById('registerForm');
const messageDiv = document.getElementById('message');

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const avatar = document.getElementById('avatar').value.trim();

  const userData = {
    name,
    email,
    password,
    ...(avatar && { avatar }),
  };

  try {
    const response = await fetch(`${API_BASE_URL}auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      const loginResponse = await fetch(`${API_BASE_URL}auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!loginResponse.ok) {
        messageDiv.textContent =
          'Registration successful, but login failed. Please log in manually.';
        messageDiv.className = 'text-yellow-500 font-header text-center';

        setTimeout(() => {
          window.location.href = `${window.location.origin}/login.html`;
        }, 3000);
        return;
      }

      const loginData = await loginResponse.json();
      const { accessToken, name } = loginData.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('username', name);

      messageDiv.textContent =
        'Registration and login successful! Redirecting...';
      messageDiv.className = 'text-lime-200 font-header text-center';

      setTimeout(() => {
        window.location.href = `${window.location.origin}/index.html`;
      }, 2000);
    } else {
      messageDiv.textContent = `Error: ${data.message}`;
      messageDiv.className = 'text-pink-200 font-header text-center';
    }
  } catch {
    messageDiv.textContent =
      'An unexpected error occurred. Please try again later.';
    messageDiv.className = 'text-pink-200 font-header text-center';
  }
});
