# NASA Astronomy Gallery

A React/Next.js web application that fetches and displays astronomy images from NASA's APOD API. Users can search for images, filter by media type.

## Features
- Fetch and display 10 random astronomy images from NASA's APOD API
- Lazy loading for images
- Search functionality (by title or date)
- Filter images by media type (image/video)

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js (v16 or later)
- npm or yarn

### Steps to Run Locally
1. **Clone the repository**:
    Then change the directory
   ```sh
   cd nasa-gallery
   ```
2. **Install dependencies**:
   ```sh
   npm install  
   ```
3. **Set up environment variables**:
   - Create a `.env.local` file in the root directory.
   - Add your NASA API key:
     ```env
     NEXT_PUBLIC_NASA_API_KEY=your_nasa_api_key
     ```
4. **Run the development server**:
   ```sh
   npm run dev  
   ```
5. **Open the app in the browser**:
   Visit `http://localhost:3000`

## Technologies Used
- **Next.js** - React framework for server-side rendering and static site generation
- **NASA APOD API** - Fetching astronomy images

