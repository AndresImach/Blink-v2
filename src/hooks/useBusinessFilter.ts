import { useState, useMemo } from "react";
import { Business, Category } from "../types";

export const useBusinessFilter = (businesses: Business[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");

  const filteredBusinesses = useMemo(() => {
    return businesses.filter((business) => {
      const lowerSearch = searchTerm.toLowerCase();
      const matchesSearch =
        business.name.toLowerCase().includes(lowerSearch) ||
        business.description.toLowerCase().includes(lowerSearch) ||
        business.location.toLowerCase().includes(lowerSearch) ||
        business.category.toLowerCase().includes(lowerSearch);

      const matchesCategory =
        selectedCategory === "all" || business.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [businesses, searchTerm, selectedCategory]);

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    filteredBusinesses,
  };
};
