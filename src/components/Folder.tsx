import React, { useState, FormEvent, ChangeEvent } from "react";
import editPencil from "../edit-pencil.png";

export default function Folder ({
  name, images, index, onFolderRename
}: {
  name: string,
  images: string[],
  index: number,
  onFolderRename: (key: number, newName: string) => void;
}): JSX.Element {

  const [showInput, setShowInput] = useState(false);
  const [newName, setNewName] = useState(name);

  let onEditButtonClick = () => {
    setShowInput(true);
  }

  let onCancelButtonClick = () => {
    setShowInput(false);
  }

  let onSubmit = (event: FormEvent<HTMLFormElement>) => {
    setShowInput(false);
    onFolderRename(index, newName);
  }

  let onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  }

   return (

  <li className="folder-wrapper">
    {!showInput && <h2 className="folder-name">{newName} <button className="folder-rename-button" style={{backgroundImage: `url(${editPencil})`}} onClick={onEditButtonClick}></button></h2>}
    {showInput && <form onSubmit={onSubmit} className="folder-rename-form">
      <input type="text" 
             className="folder-rename-input"
             id="editFolderName-{index}"
             name="editFolderName-{index}"
             minLength={1}
             maxLength={255}
             required={true}
             onChange={onInputChange}
             defaultValue={name}
             placeholder="Folder Name"
      />
            <button className="save-folder-button" type="submit">Save</button>
      <button className="cancel-folder-button" type="button" onClick={onCancelButtonClick}>Cancel</button>
    </form>}
    {images.length === 0 && <h3>No images in this folder. Add some!</h3>}
    <ul className="folder-images">
      {images.map((image, index) => {
        return <li className="folder-list-item" key={index}><img className="folder-image" src={image} alt="result from the API"/></li>;
      })}
    </ul>
  </li>


)}