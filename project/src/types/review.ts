export type ReviewType = {
  comment: string
  date: string
  offerId: number
  rating: number
  user: {
    avatarUrl: string
    id: number
    isPro: boolean
    name: string
  }
}

export type Review = ReviewType;

