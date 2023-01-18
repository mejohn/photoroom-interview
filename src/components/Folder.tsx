export default function Folder ({
  name, images
}: {
  name: string,
  images: string[],
}): JSX.Element {

   return (

  <li className="folder-wrapper">
    <h2 className="folder-name">{name}</h2>
    {images.length === 0 && <h3>No images in this folder. Add some!</h3>}
    <ul className="folder-images">
      {images.map((image, index) => {
        return <li className="folder-list-item" key={index}><img className="folder-image" src={image} alt="result from the API"/></li>;
      })}
    </ul>
  </li>


)}