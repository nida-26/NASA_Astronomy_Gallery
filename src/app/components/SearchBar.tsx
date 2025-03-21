interface SearchBarProps {
  setSearchQuery: (query: string) => void;
}

export default function SearchBar({ setSearchQuery }: SearchBarProps) {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search by title or date (YYYY-MM-DD)"
        className="w-full p-2 rounded bg-gray-700 text-white"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}
