import { nanoid } from 'nanoid';

type HouseholdThingsListProps = {
  things: string[];
};

function HouseholdThingsList ({things}: HouseholdThingsListProps): JSX.Element {
  return (
    <ul className="property__inside-list">
      { things.map((thing) =>
        (
          <li key={nanoid(3)} className="property__inside-item">
            {thing}
          </li>
        )
      )}
    </ul>
  );
}

export default HouseholdThingsList;
