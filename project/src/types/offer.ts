// export type OfferType = {
//   offerId: number;
//   data: OfferDescription;
// }

export type OfferType = {
  bedrooms: number
  city: {
    location: {
      latitude: number
      longitude: number
      zoom: number
    }
    name: string
  }
  description: string
  goods: string[]
  host: {
    avatarUrl: string
    hostId: number
    isPro: boolean
    name: string
  }
  offerId: number
  images: string[]
  isFavorite: boolean
  isPremium: boolean
  location: {
    latitude: number
    longitude: number
    zoom: number
  }
  maxAdults: number
  previewImage: string
  price: number
  rating: number
  title: string
  type: string
}

// export type HostInfo = {
//   pro: boolean;
//   avatar: string;
//   name: string;
// }

export type Offer = OfferType;
