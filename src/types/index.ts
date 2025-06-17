export interface BankBenefit {
  bankName: string;
  cardName: string;
  benefit: string;
  rewardRate: string;
  color: string;
  icon: string;
}

export interface Business {
  id: string;
  name: string;
  category: string;
  description: string;
  rating: number;
  location: string;
  image: string;
  benefits: BankBenefit[];
}

export type Category = 'all' | 'restaurants' | 'retail' | 'gas' | 'grocery' | 'travel' | 'entertainment';