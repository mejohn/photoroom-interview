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
        return <li className="folder-image"><img src={image} key={index} width={300} alt="result from the API"/></li>;
      })}
    </ul>
  </li>


)}