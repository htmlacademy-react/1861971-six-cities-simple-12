import { nanoid } from 'nanoid';

type HeaderImageProps = {
  images: string[];
};

function HeaderImage ({images}: HeaderImageProps): JSX.Element {
  const imagesList: string[] = images.slice(0, 6);

  return (
    <div className="property__gallery">
      { imagesList.map((image) =>
        (
          <div key={nanoid(3)} className="property__image-wrapper">
            <img className="property__image" src={image} alt=""/>
          </div>
        )
      )}
    </div>
  );
}

export default HeaderImage;
