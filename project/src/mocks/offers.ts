import {Offer} from '../types/offer';

export const offers: Offer[] = [
  {
    bedrooms: 3,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: 'Amsterdam'
    },
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam1.',
    goods: [
      'Heating', 'Wi-Fi'
    ],
    host: {
      avatarUrl: 'img/avatar-max.jpg',
      hostId: 3,
      isPro: true,
      name: 'Angelina'
    },
    offerId: 1,
    images: ['img/studio-01.jpg', 'img/room.jpg', 'img/apartment-02.jpg', 'img/apartment-03.jpg', 'img/apartment-01.jpg'],
    isFavorite: true,
    isPremium: true,
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 8
    },
    maxAdults: 3,
    previewImage: 'img/studio-01.jpg',
    price: 76,
    rating: 2.8,
    title: 'Beautiful & luxurious studio at great location',
    type: 'flat'
  },

  {
    bedrooms: 3,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: 'Amsterdam'
    },
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam2.',
    goods: [
      'Heating',
      'Parking'
    ],
    host: {
      avatarUrl: 'img/avatar-max.jpg',
      hostId: 3,
      isPro: false,
      name: 'Michael'
    },
    offerId: 2,
    images: ['img/room.jpg', 'img/apartment-02.jpg', 'img/apartment-03.jpg', 'img/apartment-01.jpg', 'img/studio-01.jpg'],
    isFavorite: true,
    isPremium: true,
    location: {
      latitude: 52.369553943508,
      longitude: 4.85309666406198,
      zoom: 8
    },
    maxAdults: 2,
    previewImage: 'img/apartment-02.jpg',
    price: 50,
    rating: 3.8,
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment'
  },

  {
    bedrooms: 3,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: 'Amsterdam'
    },
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam3.',
    goods: [
      'Heating',
      'AC'
    ],
    host: {
      avatarUrl: 'img/avatar-max.jpg',
      hostId: 3,
      isPro: true,
      name: 'Donald'
    },
    offerId: 3,
    images: ['img/room.jpg', 'img/apartment-03.jpg', 'img/apartment-01.jpg', 'img/studio-01.jpg', 'img/apartment-02.jpg'],
    isFavorite: false,
    isPremium: true,
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 8
    },
    maxAdults: 5,
    previewImage: 'img/apartment-01.jpg',
    price: 70,
    rating: 4.8,
    title: 'Beautiful & luxurious studio at great location',
    type: 'house'
  },

  {
    bedrooms: 3,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: 'Amsterdam'
    },
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam4.',
    goods: [
      'Heating',
      'Spotless'
    ],
    host: {
      avatarUrl: 'img/avatar-max.jpg',
      hostId: 3,
      isPro: false,
      name: 'Mike'
    },
    offerId: 4,
    images: ['img/room.jpg', 'img/apartment-03.jpg', 'img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/studio-01.jpg'],
    isFavorite: true,
    isPremium: false,
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 8
    },
    maxAdults: 6,
    previewImage: 'img/apartment-02.jpg',
    price: 100,
    rating: 4,
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment4'
  }
];


