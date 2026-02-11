# SundaySoul 🏔️

**SundaySoul** is a modern social travel community platform built with React, Vite, and Tailwind CSS. It connects travelers, allows them to book curated expeditions, share their stories, and join a vibrant community of explorers.

## 🚀 Features

-   **Home Page**: Immersive landing page with smooth parallax effects and featured trips.
-   **Trip Booking**: Browse curated trips, view details, and book your next adventure.
-   **Community**: Social feed to share travel stories, photos, and find travel buddies.
-   **User Authentication**: Secure Login and Registration flow (Mock backend).
-   **Admin Dashboard**: comprehensive admin panel for managing trips, bookings, and users.
-   **Responsive Design**: Fully responsive UI optimized for all devices.
-   **Animations**: Smooth transitions and micro-interactions using Framer Motion.
-   **Dark/Light Mode**: Themed UI with a focus on immersive visuals.

## � Gallery

![Hero](https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop)

### Featured Expeditions

| Mystic Himalayas | Coastal Odyssey | Spiti Valley |
| :---: | :---: | :---: |
| ![Himalayas](public/images/expeditions/himalayas-1.png) | ![Coastal](https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop) | ![Spiti](https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=400&auto=format&fit=crop) |

## �🛠️ Tech Stack

-   **Frontend**: React (Vite)
-   **Styling**: Tailwind CSS, Vanilla CSS
-   **Animations**: Framer Motion, GSAP (if used), Lenis (Smooth Scroll)
-   **Routing**: React Router DOM
-   **Icons**: React Icons (Feather, FontAwesome)
-   **State Management**: Context API (Auth)

## 📦 Installation

This project requires [Node.js](https://nodejs.org/) (v16+) to run.

1.  **Clone the repository** (if not already downloaded):
    ```bash
    git clone https://github.com/bangalsubham20/sundaysoul.git
    cd sundaysoul
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start the development server**:
    ```bash
    npm run dev
    ```

4.  **Open in Browser**:
    Visit `https://www.sundaysoul.in` to view the application.


## 📂 Project Structure

```
sundaysoul/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── auth/        # Auth-related components (Routes, Forms)
│   │   ├── common/      # Generic components (Button, Modal, Loader)
│   │   ├── home/        # Homepage specific components
│   │   └── ...
│   ├── config/          # Configuration files (Admin roles, etc.)
│   ├── context/         # React Context (AuthContext)
│   ├── hooks/           # Custom React Hooks
│   ├── pages/           # Page components (Home, Login, Dashboard)
│   ├── services/        # API services (Mock)
│   ├── App.jsx          # Main App component with Routes
│   └── main.jsx         # Entry point
├── index.html           # HTML entry point
├── tailwind.config.js   # Tailwind configuration
└── vite.config.js       # Vite configuration
```

---

Made with ❤️ by [Subham] | 🇮🇳 India
