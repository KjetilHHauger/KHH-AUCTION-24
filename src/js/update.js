import { API_BASE_URL } from './api.js';
import { loadFooter, loadNav } from './utils.js';

document.addEventListener('DOMContentLoaded', async () => {
  await loadNav();
  await loadFooter();

  const updateListingForm = document.getElementById('updateListingForm');
  const token = localStorage.getItem('accessToken');
  const queryParams = new URLSearchParams(window.location.search);
  const listingId = queryParams.get('id');

  if (!token || !listingId) {
    window.location.href = './login.html';
    return;
  }

  async function fetchListing() {
    try {
      const response = await fetch(
        `${API_BASE_URL}auction/listings/${listingId}`,
        {
          method: 'GET',
          headers: {
            'X-Noroff-API-Key': '04cc0fef-f540-4ae1-8c81-5706316265d4',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) throw new Error('Failed to fetch listing.');

      const data = await response.json();
      populateForm(data.data);
    } catch (error) {
      console.error('Error fetching listing:', error.message);
      alert('Failed to load listing details.');
    }
  }

  function populateForm(data) {
    document.getElementById('listingId').value = data.id;
    document.getElementById('title').value = data.title;
    document.getElementById('description').value = data.description || '';
    document.getElementById('tags').value = data.tags.join(', ') || '';
    document.getElementById('endsAt').value = new Date(data.endsAt)
      .toISOString()
      .slice(0, 16);
  }

  updateListingForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(updateListingForm);
    const updatedData = {
      title: formData.get('title').trim(),
      description: formData.get('description').trim(),
      tags: formData
        .get('tags')
        ?.split(',')
        .map((tag) => tag.trim()),
      endsAt: new Date(formData.get('endsAt')).toISOString(),
    };

    try {
      const response = await fetch(
        `${API_BASE_URL}auction/listings/${listingId}`,
        {
          method: 'PUT',
          headers: {
            'X-Noroff-API-Key': '04cc0fef-f540-4ae1-8c81-5706316265d4',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Failed to update listing: ${errorData.message}`);
        return;
      }

      alert('Listing updated successfully!');
      window.location.href = './profile.html';
    } catch (error) {
      console.error('Error updating listing:', error.message);
      alert('An unexpected error occurred.');
    }
  });

  fetchListing();
});
