export enum Path {
  MainPath = '/',
  LoginPath = '/login',
  OfferPath = 'offer/',
  ErrorPath = '*'
}

export enum APIRoute {
  OfferList = '/hotels',
}

export enum NameSpace {
  Offers = 'OFFERS',
}

export const CITIES_NAME: readonly string[] = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf'
];

export const SORT_NAME: readonly string[] = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first'
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
