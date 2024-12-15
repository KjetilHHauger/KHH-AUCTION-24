# [Project Name: Hammer time Auctions]

## 🚀 About the Project

The **Auction Website** is a dynamic platform where users can browse, create, and bid on auctions. Designed for seamless interaction, it includes features like user authentication, listing management, and bidding functionality—all built using the **Noroff API**.

---

## 🛠️ Features

- **User Authentication**
  - Login/Logout functionality
  - Token-based session handling
  - Register new user
  - Update profile

- **Auction Listings**
  - View live auctions with media, descriptions, and bidding information
  - Search auctions
  - Create auctions

- **Bidding System**
  - Place bids on auctions with real-time updates
  - View bid history

- **Responsive Design**
  - Fully responsive for desktop, tablet, and mobile screens
  - Smooth user experience powered by TailwindCSS

---

## 🎨 Technologies Used

| **Category**           | **Technologies**               |
|------------------------|--------------------------------|
| **Frontend**           | HTML5, TailwindCSS, JavaScript |
| **API Integration**    | Noroff API                     |
| **Hosting**            | Netlify                        |
| **Version Control**    | Git & GitHub                   |

---

## 📂 Folder Structure

```plaintext
.
├── src/
│   ├── assets/          # Images, icons, and static files
│   ├── css/             # Tailwind CSS styles
│   ├── js/              # JavaScript modules
│   ├── nav.html         # Navigation component
│   ├── profile.html     # User profile page
│   ├── single.html      # Single auction page
│   ├── index.html       # Home page
│   └── README.md        # Documentation
├── dist/                # Compiled CSS/JS for production
└── tailwind.config.js   # TailwindCSS configuration
```

---

## ⚙️ Setup Instructions

### Prerequisites

- **Git**: [Download Git](https://git-scm.com/)
- **Node.js**: [Download Node.js](https://nodejs.org/)
- **Netlify Account** (optional for deployment)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/KjetilHHauger/KHH-AUCTION-24.git
   ```

2. Navigate to the project directory:
   ```bash
   cd KHH-AUCTION-24
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Build Tailwind CSS:
   ```bash
   npm run build
   ```

5. Start the development server:
   ```bash
   npm run start
   ```

---

## 🌐 Deployment

To deploy the site on Netlify:

1. Drag and drop the `dist/` folder into your Netlify dashboard.
2. Set up environment variables (if required).
3. Click **Deploy Site**.

---

## 🧩 API Integration

This project utilizes the Noroff API for:

- Authentication
- Auction listing management
- Real-time bidding

**Base URL**: `https://v2.api.noroff.dev/`

Example API Request:
```javascript
fetch(`${API_BASE_URL}auction/listings`, {
  headers: {
    "X-Noroff-API-Key": "your-api-key",
    "Content-Type": "application/json",
  },
});
```

---

## 📸 Screenshots

- **Homepage**
- **Single Auction Page**

---

## 📜 License

This project is licensed under the MIT License.

---

## 🙌 Acknowledgements

- [Noroff API Documentation](https://api.noroff.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/)

---

## ✨ Author

👤 **Kjeti H.H**  
