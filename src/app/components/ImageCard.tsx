import Image from "next/image";
import { useRouter } from "next/navigation";

interface ImageProps {
  image: {
    title: string;
    date: string;
    url: string;
    media_type: string;
  };
}

export default function ImageCard({ image }: ImageProps) {
  const router = useRouter();

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-bold mb-2">{image.title}</h3>
      <p className="text-gray-400 text-sm">{image.date}</p>

      {image.media_type === "image" ? (
        <Image
          src={image.url}
          alt={image.title}
          width={400}
          height={300}
          className="rounded-lg shadow-lg"
          loading="lazy" // Lazy Loading enabled by default in next/image
          placeholder="blur"
          blurDataURL={image.url} // Uses the actual image as blur placeholder
        />
      ) : (
        <iframe
          src={image.url}
          className="w-full h-48 rounded-lg shadow-lg"
          allowFullScreen
        ></iframe>
      )}

      <button
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
        onClick={() =>
          router.push(
            `/details?title=${encodeURIComponent(image.title)}&url=${encodeURIComponent(image.url)}`
          )
        }
      >
        View Details
      </button>
    </div>
  );
}
