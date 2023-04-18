type HouseholdThingsListProps = {
  things: string[];
};

function HouseholdThingsList ({things}: HouseholdThingsListProps): JSX.Element {
  return (
    <ul className="property__inside-list">
      { things.map((thing) =>
        (
          <li key={thing} className="property__inside-item">
            {thing}
          </li>
        )
      )}
    </ul>
  );
}

export default HouseholdThingsList;
