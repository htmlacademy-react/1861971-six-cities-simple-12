type Host = {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
}

type HostInformationProps = {
  hostData: Host;
};

function HostInformation ({hostData}: HostInformationProps): JSX.Element {
  const { avatarUrl, name, isPro } = hostData;

  return (
    <div className="property__host-user user">
      <div className={
        isPro ?
          'property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper' :
          'property__avatar-wrapper user__avatar-wrapper'
      }
      >
        <img className="property__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar"/>
      </div>
      <span className="property__user-name">
        {name}
      </span>
      <span className="property__user-status">
        {isPro && 'Pro'}
      </span>
    </div>
  );
}

export default HostInformation;
