import { returnTypeHousing } from '../../util/util';

type PropertyFeaturesProps = {
  typeApartment: string;
  room: number;
  maxPeople: number;
}

function PropertyFeatures ({typeApartment, room, maxPeople}: PropertyFeaturesProps): JSX.Element {
  return (
    <ul className="property__features">
      <li className="property__feature property__feature--entire">
        {returnTypeHousing(typeApartment)}
      </li>
      <li className="property__feature property__feature--bedrooms">
        {room < 2 ? `${room} Bedroom` : `${room} Bedrooms`}
      </li>
      <li className="property__feature property__feature--adults">
        {maxPeople < 2 ? `Max ${maxPeople} adult` : `Max ${maxPeople} adults`}
      </li>
    </ul>
  );
}

export default PropertyFeatures;
