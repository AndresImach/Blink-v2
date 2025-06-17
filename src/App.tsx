import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { CategoryDropdown } from "./components/CategoryDropdown";
import { BusinessCard } from "./components/BusinessCard";
import { useBusinessFilter } from "./hooks/useBusinessFilter";
import { categories } from "./data/mockData";
import { fetchBusinesses } from "./services/api";
import { Business, Category } from "./types";

function App() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBusinesses = async () => {
      try {
        const data = await fetchBusinesses();
        setBusinesses(data);
        setError(null);
      } catch (err) {
        console.error("Failed to load businesses:", err);
        const error =
          err instanceof Error
            ? err.message
            : "Failed to load businesses. Please try again later.";
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBusinesses();
  }, []);

  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    filteredBusinesses,
  } = useBusinessFilter(businesses);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Header />

        <div className="flex flex-col lg:flex-row gap-4 mb-8 items-center justify-center">
          <div className="w-full lg:flex-1">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search for businesses, categories, or locations..."
            />
          </div>
          <CategoryDropdown
            value={selectedCategory}
            onChange={setSelectedCategory}
            options={categories.map((c) => ({
              value: c.value as Category,
              label: c.label,
            }))}
          />
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory === "all"
                ? "All Businesses"
                : categories.find((c) => c.value === selectedCategory)?.label}
            </h2>
            {!isLoading && !error && (
              <span className="px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full text-sm font-medium text-gray-600 border border-gray-200">
                {filteredBusinesses.length}{" "}
                {filteredBusinesses.length === 1 ? "result" : "results"}
              </span>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading businesses...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="text-red-500 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Error</h3>
            <p className="text-gray-500">{error}</p>
          </div>
        ) : filteredBusinesses.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No businesses found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search terms or category filter
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredBusinesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
