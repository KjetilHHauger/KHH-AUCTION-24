import { loadFooter, loadNav } from "./utils.js";
import { API_BASE_URL } from "./api.js";

loadNav();
loadFooter();

const auctionList = document.getElementById("auctionList");
const errorMessage = document.getElementById("errorMessage");
const searchInput = document.getElementById("searchInput");
const paginationContainer = document.createElement("div");

let allAuctions = [];
let filteredAuctions = [];
let currentPage = 1;
const itemsPerPage = 12;

paginationContainer.className = "flex items-center space-y-2 mt-4 mb-8"; 

async function fetchAuctions() {
  const url = `${API_BASE_URL}auction/listings?_active=true`;
  try {
    const response = await fetch(url, {
      headers: {
        "X-Noroff-API-Key": "04cc0fef-f540-4ae1-8c81-5706316265d4",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to fetch auctions.");

    const data = await response.json();
    allAuctions = data.data;
    filteredAuctions = [...allAuctions];
    return data.data;
  } catch {
    errorMessage.classList.remove("hidden");
    errorMessage.textContent =
      "Failed to load auctions. Please try again later.";
    return [];
  }
}

function renderAuctions(auctions) {
  auctionList.innerHTML = "";

  if (auctions.length === 0) {
    errorMessage.classList.remove("hidden");
    errorMessage.textContent = "No auctions available.";
    return;
  }

  errorMessage.classList.add("hidden");

  auctions.forEach((auction) => {
    const { id, title, media, endsAt } = auction;
    const imageUrl =
      media && media[0]?.url
        ? media[0].url
        : "https://fakeimg.pl/800x400?text=No+image";
    const timeLeft = calculateTimeLeft(endsAt);

    const auctionElement = document.createElement("div");
    auctionElement.className =
      "w-full max-w-sm bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 mb-4";
    auctionElement.innerHTML = `
      <div class="relative cursor-pointer" data-id="${id}">
        <img class="w-full h-60 object-contain" src="${imageUrl}" alt="${title}">
      </div>
      <div class="p-4">
        <h3 class="text-lg font-semibold text-gray-800 mb-2 font-header">${title}</h3>
        <div class="text-sm text-gray-600 mb-4 flex justify-between">
          <p>Time Left: <span class="text-tertiary font-body">${timeLeft}</span></p>
        </div>
      </div>
    `;

    auctionElement.querySelector(".relative").addEventListener("click", (e) => {
      const auctionId = e.currentTarget.dataset.id;
      window.location.href = `src/single.html?id=${auctionId}`;
    });

    auctionList.appendChild(auctionElement);
  });
}

function calculateTimeLeft(endsAt) {
  const now = new Date();
  const end = new Date(endsAt);
  const diff = Math.max(0, end - now);
  const hours = Math.floor(diff / 1000 / 60 / 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  return diff > 0 ? `${hours}h ${minutes}m` : "Expired";
}

function renderPaginationControls(totalPages) {
  paginationContainer.innerHTML = "";

  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.className =
    "px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-primary hover:text-white transition";
  prevButton.disabled = currentPage === 1;
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderPaginatedAuctions(filteredAuctions);
    }
  });

  const pageInfo = document.createElement("span");
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
  pageInfo.className = "text-gray-600 font-medium mx-4";

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.className =
    "px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-primary hover:text-white transition";
  nextButton.disabled = currentPage === totalPages;
  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderPaginatedAuctions(filteredAuctions);
    }
  });

  paginationContainer.appendChild(prevButton);
  paginationContainer.appendChild(pageInfo);
  paginationContainer.appendChild(nextButton);

  auctionList.parentNode.appendChild(paginationContainer);
}

function renderPaginatedAuctions(auctions) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAuctions = auctions.slice(startIndex, startIndex + itemsPerPage);
  renderAuctions(paginatedAuctions);

  const totalPages = Math.ceil(auctions.length / itemsPerPage);
  renderPaginationControls(totalPages);
}

function filterAuctions(query) {
  currentPage = 1;
  filteredAuctions = allAuctions.filter(
    (auction) =>
      auction.title.toLowerCase().includes(query) ||
      auction.description?.toLowerCase().includes(query)
  );

  if (filteredAuctions.length === 0) {
    errorMessage.classList.remove("hidden");
    errorMessage.textContent = "No auctions match your search.";
  } else {
    errorMessage.classList.add("hidden");
  }

  renderPaginatedAuctions(filteredAuctions);
}

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  filterAuctions(query);
});

async function loadAuctions() {
  const auctions = await fetchAuctions();
  renderPaginatedAuctions(auctions);
}

loadAuctions();
