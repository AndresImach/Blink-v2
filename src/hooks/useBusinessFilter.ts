import { useState, useMemo } from 'react';
import { Business, Category } from '../types';

export const useBusinessFilter = (businesses: Business[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');

  const filteredBusinesses = useMemo(() => {
    return businesses.filter(business => {
      const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          business.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          business.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || business.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [businesses, searchTerm, selectedCategory]);

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    filteredBusinesses
  };
};