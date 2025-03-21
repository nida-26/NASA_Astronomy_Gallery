"use client";

import { useEffect, useState } from "react";
import ImageCard from "@/app/components/ImageCard";
import Navbar from "@/app/components/Navbar";
import SearchBar from "@/app/components/SearchBar";

interface ApodData {
  title: string;
  date: string;
  explanation: string;
  url: string;
  hdurl?: string;
  media_type: string;
}

export default function Home() {
  const [images, setImages] = useState<ApodData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [mediaFilter, setMediaFilter] = useState("all");

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}&count=10`
        );
        const data = await res.json();
        setImages(data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }

    fetchImages();
  }, []);

  // Filter images based on search and media type
  const filteredImages = images.filter((image) => {
    const matchesSearch =
      image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.date.includes(searchQuery);
    const matchesMediaType =
      mediaFilter === "all" || image.media_type === mediaFilter;

    return matchesSearch && matchesMediaType;
  });

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto p-6">
        <SearchBar setSearchQuery={setSearchQuery} />
        <div className="mb-4">
          <label className="mr-2">Filter by Media Type:</label>
          <select
            className="p-2 bg-gray-700 border rounded"
            value={mediaFilter}
            onChange={(e) => setMediaFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <ImageCard key={index} image={image} />
          ))}
        </div>
      </div>
    </div>
  );
}
