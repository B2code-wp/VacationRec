export interface Product {
  name: string;
  price: number;
  image: string;
  qty?: number;
}

export interface Place {
  name: string;
  country: string;
  review: number;
  image: string;
  rating?: number;
  days?: number;

  // user signals
  liked?: boolean;
  disliked?: boolean;

  clicks?: number;
  addedToCart?: number;
  score?: number;
}

export interface CartItem extends Place {
  qty: number;
}

/* Base places (real destinations) */
export const BASE_PLACES: Place[] = [
  {
    name: 'Tokyo',
    country: 'Japan',
    review: 4.8,
    image: 'https://images.unsplash.com/photo-1601823984263-b87b59798b70?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8amFwYW58ZW58MHx8MHx8fDA%3D',
    days: 7
  },
  {
    name: 'Cape Town',
    country: 'South Africa',
    review: 4.7,
    image: 'https://images.unsplash.com/photo-1576485375217-d6a95e34d043?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FwZSUyMHRvd258ZW58MHx8MHx8fDA%3D',
    days: 5
  },
  {
    name: 'New York',
    country: 'USA',
    review: 4.6,
    image: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TmV3JTIwWW9ya3xlbnwwfHwwfHx8MA%3D%3D',
        days: 6
  },
  {
    name: 'Paris',
    country: 'France',
    review: 4.7,
    image: 'https://plus.unsplash.com/premium_photo-1661919210043-fd847a58522d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFyaXN8ZW58MHx8MHx8fDA%3D',
    rating: 4.7,
    days: 4
  },
  {
    name: 'Dubai',
    country: 'UAE',
    review: 4.5,
    image: 'https://plus.unsplash.com/premium_photo-1697729914552-368899dc4757?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RHViYWl8ZW58MHx8MHx8fDA%3D',
    rating: 4.5,
    days: 5
  }
];

const cities = [
  'Barcelona', 'Rome', 'Berlin', 'Sydney', 'Bangkok',
  'Istanbul', 'Amsterdam', 'Toronto', 'Singapore', 'Bali'
];

const countries = [
  'Spain', 'Italy', 'Germany', 'Australia', 'Thailand',
  'Turkey', 'Netherlands', 'Canada', 'Singapore', 'Indonesia'
];

/* Generate 2000 places */
export const PLACES: Place[] = [
  ...BASE_PLACES,
  ...Array.from({ length: 2000 }, (_, i) => {
    const index = i % cities.length;

    return {
      name: `${cities[index]} Trip ${i + 1}`,
      country: countries[index],
      review: +(4.0 + (i % 10) * 0.1).toFixed(1), // 4.0 - 5.0
      image: `https://picsum.photos/seed/place${i}/400/300`,
      days: 3 + (i % 10) // 3–12 days
    };
  })
];
