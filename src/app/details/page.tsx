"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";

interface ApodData {
  title: string;
  date: string;
  explanation: string;
  url: string;
  media_type: string;
}

export default function DetailsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const date = searchParams?.get("date") || "";
  
  const [imageData, setImageData] = useState<ApodData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchImageDetails();
  }, [date]);

  async function fetchImageDetails() {
    if (!date) {
      setError("No date provided.");
      setLoading(false);
      return;
    }

    try {
      const apiKey = process.env.NEXT_PUBLIC_NASA_API_KEY;
      if (!apiKey) throw new Error("NASA API key is missing.");

      const res = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`
      );
      if (!res.ok) throw new Error("Failed to fetch data.");

      const data = await res.json();
      setImageData(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to load image details.");
      }
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p className="text-white text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!imageData) return <p className="text-white text-center">No data found.</p>;

  return (
    <div className="p-6 text-white max-w-3xl mx-auto">
      <button
        onClick={() => router.back()}
        className="bg-gray-700 text-white px-4 py-2 rounded mb-4 hover:bg-gray-600"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-4">{imageData.title}</h1>
      <p className="text-gray-400 text-sm mb-4">Date: {imageData.date}</p>

      {imageData.media_type === "image" ? (
        <Image
          src={imageData.url}
          alt={imageData.title}
          width={600}
          height={400}
          className="rounded-lg shadow-lg w-full"
          loading="lazy"
        />
      ) : (
        <iframe
          src={imageData.url}
          className="w-full h-64 rounded-lg shadow-lg"
          allowFullScreen
        ></iframe>
      )}

      <p className="mt-4">{imageData.explanation}</p>
    </div>
  );
}
