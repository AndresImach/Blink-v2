import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { CategoryDropdown } from "../components/CategoryDropdown";
import { BusinessCard } from "../components/BusinessCard";
import { useBusinessFilter } from "../hooks/useBusinessFilter";
import { categories as rawCategories } from "../data/mockData";
import { Business, Category } from "../types";
import { fetchBusinesses } from "../services/api";

function Home() {
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

  // Convert categories to correct type
  const categories: { value: Category; label: string }[] =
    rawCategories as { value: Category; label: string }[];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <CategoryDropdown
            options={categories}
            value={selectedCategory}
            onChange={setSelectedCategory}
          />
        </div>
        {isLoading ? (
          <div className="text-center text-gray-500">Loading businesses...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : filteredBusinesses.length === 0 ? (
          <div className="text-center text-gray-500">No businesses found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBusinesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;
