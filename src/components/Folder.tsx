export default function Folder ({
  name, images
}: {
  name: string,
  images: string[],
}): JSX.Element {

   return (

  <li className="folder-wrapper">
    <h2 className="folder-name">{name}</h2>
    <ul className="folder-images">
      {images}
      {images.map((image, index) => {
        return <li className="folder-list-item" key={index}><img className="folder-image" src={image} alt="result from the API"/></li>;
      })}
    </ul>
  </li>


)}