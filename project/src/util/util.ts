import leaflet from 'leaflet';
import { SortName, Offer, Offers, TypeHousing } from '../types/const/const';


export const sortOffersByCity = (offers:Offers, cityName:string):Offers =>
  offers.filter(
    (offer: Offer) => offer.city.name === cityName
  );

export const sortOffers = (sortType:string, offers:Offers) => {
  let sortResult: Offers = [];

  switch (sortType) {
    case SortName.Popular:
      sortResult = offers;
      break;
    case SortName.HighToLow:
      sortResult = offers.slice ().sort ((a,b) => {
        if (a.price < b.price) {
          return -1;
        }
        if (a.price > b.price) {
          return 1;
        }
        return 0;
      }).reverse();
      break;
    case SortName.LowToHigh:
      sortResult = offers.slice ().sort ((a,b) => {
        if (a.price < b.price) {
          return -1;
        }
        if (a.price > b.price) {
          return 1;
        }
        return 0;
      });
      break;
    case SortName.TopRatedFirst:
      sortResult = offers.slice ().sort ((a,b) => {
        if (a.rating < b.rating) {
          return -1;
        }
        if (a.rating > b.rating) {
          return 1;
        }
        return 0;
      }).reverse();
      break;
  }
  return sortResult;
};

export const returnTypeHousing = ( typeHousing: string ) => {
  const { Apartment, Room, House, Hotel } = TypeHousing;

  switch (typeHousing) {
    case 'apartment':
      return Apartment;
    case 'room':
      return Room;
    case 'house':
      return House;
    case 'hotel':
      return Hotel;
    default:
      return '';
  }
};

export const returnNewOffers = (offersData: Offers | undefined, dataOffersNear: Offers | null | undefined): Offers => {
  let newOffers: Offers = [];

  if(offersData) {
    newOffers = offersData.slice(0, 5);
  }

  if(dataOffersNear) {
    newOffers = dataOffersNear.slice(0, 3);
  }
  return newOffers;
};

export const validateStars = <A, B>(cb: A, validate: B, valueStar: string) => {
  if(typeof cb !== 'function'){
    throw new Error('Parameter "cb" must be a function');
  }

  if(valueStar.length !== 0) {
    cb({
      ...validate,
      validatStar: true
    });
  }
};

export const validateText = <A, B>(cb: A, validate: B, valueText: string) => {
  if(typeof cb !== 'function'){
    throw new Error('Parameter "cb" must be a function');
  }

  if(valueText.length >= 50 && valueText.length < 300) {
    cb({
      ...validate,
      validatText: true
    });
  } else {
    cb({
      ...validate,
      validatText: false
    });
  }
};

export const checkValidate = <A, B>(cb: A, validate: B, value: string, fieldName: string) => {
  if(typeof cb !== 'function'){
    throw new Error('Parameter "cb" must be a function');
  }

  if(value.length !== 1 && value.length !== 0) {
    cb({
      ...validate,
      [fieldName]: true
    });
  } else {
    cb({
      ...validate,
      [fieldName]: false
    });
  }
};

export const createMarker = (offers: Offers, indexPlase: number | undefined, place: Offer | undefined): leaflet.Marker[] => {

  let offersList = offers;

  const defaultIcon = leaflet.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const activeIcon = leaflet.icon({
    iconUrl: 'img/pin-active.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });


  if(place !== undefined) {
    offersList = createNewOffersList(offers, place);
  }

  const markers = offersList.map((offer) => {
    const { location:{latitude, longitude}, id } = offer;

    return leaflet
      .marker({
        lat: latitude,
        lng: longitude,
      }, {
        icon: (id === indexPlase)
          ? activeIcon
          : defaultIcon
      });
  });

  return markers;
};

const createNewOffersList = (offers: Offers, offer: Offer) => {
  const newOffersList = offers.map((place) => place);
  newOffersList.push(offer);

  return newOffersList;
};
