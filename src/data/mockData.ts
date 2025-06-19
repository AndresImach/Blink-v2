import { Business } from '../types';

export const mockBusinesses: Business[] = [
  {
    id: '1',
    name: 'Starbucks Coffee',
    category: 'restaurants',
    description: 'Global coffeehouse chain known for premium coffee and cozy atmosphere',
    rating: 4.5,
    location: 'Multiple locations',
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400',
    benefits: [
      {
        bankName: 'Chase',
        cardName: 'Sapphire Preferred',
        benefit: 'Earn 3x points on dining',
        rewardRate: '3x points',
        color: 'bg-blue-500',
        icon: 'CreditCard'
      },
      {
        bankName: 'Capital One',
        cardName: 'Savor Card',
        benefit: 'Earn 4% cash back on dining',
        rewardRate: '4% cash back',
        color: 'bg-red-500',
        icon: 'CreditCard'
      },
      {
        bankName: 'American Express',
        cardName: 'Gold Card',
        benefit: 'Earn 4x points at restaurants',
        rewardRate: '4x points',
        color: 'bg-yellow-500',
        icon: 'CreditCard'
      }
    ]
  },
  {
    id: '2',
    name: 'Shell Gas Station',
    category: 'gas',
    description: 'Leading fuel retailer with convenient locations nationwide',
    rating: 4.2,
    location: 'Nationwide',
    image: 'https://images.pexels.com/photos/33488/gasoline-gas-station-refuel-gas.jpg?auto=compress&cs=tinysrgb&w=400',
    benefits: [
      {
        bankName: 'Chase',
        cardName: 'Freedom Flex',
        benefit: 'Rotating 5% categories include gas',
        rewardRate: '5% quarterly',
        color: 'bg-blue-500',
        icon: 'CreditCard'
      },
      {
        bankName: 'Citi',
        cardName: 'Custom Cash',
        benefit: 'Earn 5% on gas purchases',
        rewardRate: '5% cash back',
        color: 'bg-indigo-500',
        icon: 'CreditCard'
      }
    ]
  },
  {
    id: '3',
    name: 'Target',
    category: 'retail',
    description: 'Popular retail chain offering everything from groceries to home goods',
    rating: 4.3,
    location: 'Multiple locations',
    image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=400',
    benefits: [
      {
        bankName: 'Target',
        cardName: 'RedCard',
        benefit: '5% off every purchase',
        rewardRate: '5% discount',
        color: 'bg-red-600',
        icon: 'CreditCard'
      },
      {
        bankName: 'Chase',
        cardName: 'Freedom Unlimited',
        benefit: 'Earn 1.5% on all purchases',
        rewardRate: '1.5% cash back',
        color: 'bg-blue-500',
        icon: 'CreditCard'
      }
    ]
  },
  {
    id: '4',
    name: 'Whole Foods Market',
    category: 'grocery',
    description: 'Premium grocery chain specializing in organic and natural foods',
    rating: 4.4,
    location: 'Multiple locations',
    image: 'https://images.pexels.com/photos/1435752/pexels-photo-1435752.jpeg?auto=compress&cs=tinysrgb&w=400',
    benefits: [
      {
        bankName: 'Amazon',
        cardName: 'Prime Visa',
        benefit: '5% back at Whole Foods for Prime members',
        rewardRate: '5% cash back',
        color: 'bg-orange-500',
        icon: 'CreditCard'
      },
      {
        bankName: 'American Express',
        cardName: 'Blue Cash Preferred',
        benefit: 'Earn 6% on supermarkets',
        rewardRate: '6% cash back',
        color: 'bg-yellow-500',
        icon: 'CreditCard'
      }
    ]
  },
  {
    id: '5',
    name: 'Netflix',
    category: 'entertainment',
    description: 'Leading streaming entertainment service with original content',
    rating: 4.1,
    location: 'Online streaming',
    image: 'https://images.pexels.com/photos/265685/pexels-photo-265685.jpeg?auto=compress&cs=tinysrgb&w=400',
    benefits: [
      {
        bankName: 'Chase',
        cardName: 'Sapphire Reserve',
        benefit: 'Earn 3x points on streaming',
        rewardRate: '3x points',
        color: 'bg-blue-500',
        icon: 'CreditCard'
      },
      {
        bankName: 'American Express',
        cardName: 'Cash Magnet',
        benefit: 'Earn 1.5% on all purchases',
        rewardRate: '1.5% cash back',
        color: 'bg-yellow-500',
        icon: 'CreditCard'
      }
    ]
  },
  {
    id: '6',
    name: 'Hilton Hotels',
    category: 'travel',
    description: 'Global hospitality company with luxury and business hotels',
    rating: 4.6,
    location: 'Worldwide',
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=400',
    benefits: [
      {
        bankName: 'Hilton',
        cardName: 'Honors Card',
        benefit: 'Earn 7x points at Hilton properties',
        rewardRate: '7x points',
        color: 'bg-purple-500',
        icon: 'CreditCard'
      },
      {
        bankName: 'Chase',
        cardName: 'Sapphire Preferred',
        benefit: 'Earn 2x points on travel',
        rewardRate: '2x points',
        color: 'bg-blue-500',
        icon: 'CreditCard'
      },
      {
        bankName: 'Capital One',
        cardName: 'Venture Rewards',
        benefit: 'Earn 2x miles on all purchases',
        rewardRate: '2x miles',
        color: 'bg-red-500',
        icon: 'CreditCard'
      }
    ]
  }
];

export const categories = [
  { value: 'all', label: 'Todos' },
  { value: 'gastronomia', label: 'Gastronomía' },
  { value: 'moda', label: 'Moda' },
  { value: 'entretenimiento', label: 'Entretenimiento' },
  { value: 'otros', label: 'Otros comercios y servicios' },
  { value: 'deportes', label: 'Deportes' },
  { value: 'regalos', label: 'Regalos' },
  { value: 'viajes', label: 'Viajes' },
  { value: 'automotores', label: 'Automotores' },
  { value: 'belleza', label: 'Belleza' },
  { value: 'jugueterias', label: 'Jugueterías' },
  { value: 'hogar', label: 'Hogar y Deco' },
  { value: 'electro', label: 'Electro y Tecnología' },
  { value: 'shopping', label: 'Shopping' },
];