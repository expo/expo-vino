/**
 * @flow
 */

export type Location = {
  lat: number,
  lon: number,
};
export type Review = {
  who: string,
  when: Date,
  borrachos: number,
  rating: number,
  color: number,
  pairings: [string],
  notes: string,
};
export type Winery = {
  name: string,
  location: Location,
};
export type Bottle = {
  name?: string,
  style: string,
  purchasedOn?: Date,
  inStock: number,
  yearProduced: number,
  winery: Winery,
  image: string,
  reviews: Review[],
};
