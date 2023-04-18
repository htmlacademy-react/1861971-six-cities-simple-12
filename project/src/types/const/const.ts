export enum Path {
  MainPath = '/',
  LoginPath = '/login',
  OfferPath = '/offer/',
  ErrorPath = '*'
}

export enum APIRoute {
  OfferList = '/hotels',
  OfferNear = 'nearby',
  Comments = '/comments',
  Login = '/login',
  Delete = '/logout'
}

export enum NameSpace {
  Offers = 'OFFERS',
  Offer = 'OFFER',
  OffersNear = 'OFFERS_NEAR',
  Comments = 'COMMENTS',
  Authorization = 'AUTHORIZATION',
  OfferList = 'OFFER_LIST'
}

export enum TypeHousing {
  Apartment = 'Apartment',
  Room = 'Private Room',
  House = 'House',
  Hotel = 'Hotel'
}

export enum TypeDownload {
  Fulfilled = 'fulfilled',
  Rejected = 'rejected',
  Pending = 'pending'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export const CITIES_NAMES: readonly string[] = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf'
];

export enum SortName {
  Popular = 'Popular',
  LowToHigh = 'Price: low to high',
  HighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first'
}

export const TITLES: readonly string[] = [
  'perfect',
  'good',
  'not bad',
  'badly',
  'terribly'
];

export type Offer = {
bedrooms: number;
city: {
location: {
latitude: number;
longitude: number;
zoom: number;
};
name: string;
};
description: string;
goods: [string];
host: {
avatarUrl: string;
id: number;
isPro: boolean;
name: string;
};
id: number;
images: [string];
isPremium: boolean;
location: {
latitude: number;
longitude: number;
zoom: number;
};
maxAdults: number;
previewImage: string;
price: number;
rating: number;
title: string;
type: string;
}

export type Offers = Offer[];

export type Comment = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
  };
}

export type Comments = Comment[];

export type Authorization = {
  avatarUrl: string;
  email: string;
  id: number;
  isPro: boolean;
  name: string;
  token: string;
  }

export type DataUser = {
    email: string;
    password: string;
}

export type UserComment = {
  comment: string;
  rating: number;
  id: number;
  }
