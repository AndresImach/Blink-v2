import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { CategoryDropdown } from "../components/CategoryDropdown";
import { BusinessCard } from "../components/BusinessCard";
import { useBusinessFilter } from "../hooks/useBusinessFilter";
import { categories as rawCategories } from "../data/mockData";
import { Business, Category } from "../types";
import { fetchBusinesses } from "../services/api";
import { useNavigate } from "react-router-dom";

function Home() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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
    filteredBusinesses: filteredByCategory,
  } = useBusinessFilter(businesses);

  // Custom filter for each special category
  let finalBusinesses = filteredByCategory;
  if (selectedCategory === "gastronomia") {
    finalBusinesses = businesses.filter(
      (b) =>
        typeof b.category === "string" &&
        b.category.toLowerCase().includes("gastronom")
    );
  } else if (selectedCategory === "moda") {
    finalBusinesses = businesses.filter(
      (b) =>
        typeof b.category === "string" &&
        b.category.toLowerCase().includes("moda")
    );
  } else if (selectedCategory === "entretenimiento") {
    finalBusinesses = businesses.filter(
      (b) =>
        typeof b.category === "string" &&
        b.category.toLowerCase().includes("entretenimiento")
    );
  } else if (selectedCategory === "otros") {
    finalBusinesses = businesses.filter(
      (b) =>
        typeof b.category === "string" &&
        b.category.toLowerCase().includes("otros")
    );
  } else if (selectedCategory === "deportes") {
    finalBusinesses = businesses.filter(
      (b) =>
        typeof b.category === "string" &&
        b.category.toLowerCase().includes("deporte")
    );
  } else if (selectedCategory === "regalos") {
    finalBusinesses = businesses.filter(
      (b) =>
        typeof b.category === "string" &&
        b.category.toLowerCase().includes("regalo")
    );
  } else if (selectedCategory === "viajes") {
    finalBusinesses = businesses.filter(
      (b) =>
        typeof b.category === "string" &&
        b.category.toLowerCase().includes("viaje")
    );
  } else if (selectedCategory === "automotores") {
    finalBusinesses = businesses.filter(
      (b) =>
        typeof b.category === "string" &&
        b.category.toLowerCase().includes("automotor")
    );
  } else if (selectedCategory === "belleza") {
    finalBusinesses = businesses.filter(
      (b) =>
        typeof b.category === "string" &&
        b.category.toLowerCase().includes("belleza")
    );
  } else if (selectedCategory === "jugueterias") {
    finalBusinesses = businesses.filter(
      (b) =>
        typeof b.category === "string" &&
        b.category.toLowerCase().includes("jugueter")
    );
  } else if (selectedCategory === "hogar") {
    finalBusinesses = businesses.filter(
      (b) =>
        (typeof b.category === "string" &&
          b.category.toLowerCase().includes("hogar")) ||
        (typeof b.category === "string" &&
          b.category.toLowerCase().includes("deco"))
    );
  } else if (selectedCategory === "electro") {
    finalBusinesses = businesses.filter(
      (b) =>
        (typeof b.category === "string" &&
          b.category.toLowerCase().includes("electro")) ||
        (typeof b.category === "string" &&
          b.category.toLowerCase().includes("tecnolog"))
    );
  } else if (selectedCategory === "shopping") {
    finalBusinesses = businesses.filter(
      (b) =>
        typeof b.category === "string" &&
        b.category.toLowerCase().includes("shopping")
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <div className="flex justify-center w-full md:w-auto">
            <CategoryDropdown
              value={selectedCategory}
              onChange={setSelectedCategory}
              options={rawCategories as { value: Category; label: string }[]}
            />
          </div>
        </div>
        {isLoading ? (
          <div className="text-center text-gray-500">Loading businesses...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : finalBusinesses.length === 0 ? (
          <div className="text-center text-gray-500">No businesses found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {finalBusinesses.map((business) => (
              <BusinessCard
                key={business.id}
                business={business}
                onBenefitClick={(benefitIndex) =>
                  navigate(`/benefit/${business.id}/${benefitIndex}`)
                }
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;
