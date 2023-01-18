import React, { useState, FormEvent, ChangeEvent } from "react";
import Image from "./Image";
import { ImageFolder } from "../Types";

export default function Folder ({
  name, images, folderIndex, onFolderRename, uploadedImages, onImageMove
}: {
  name: string,
  images: string[],
  folderIndex: number,
  onFolderRename: (key: number, newName: string) => void,
  uploadedImages: Array<ImageFolder>,
  onImageMove: (image: string, newFolderIndex: number, oldFolderIndex: number) => void,
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
    onFolderRename(folderIndex, newName);
  }

  let onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  }

   return (

  <li className="folder-wrapper">
    {!showInput && <h2 className="folder-name">{newName} <button className="folder-rename-button" onClick={onEditButtonClick}>&#9998;</button></h2>}
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
        return <Image key={index} image={image} folderIndex={folderIndex} uploadedImages={uploadedImages} onImageMove={onImageMove} />
      })}
    </ul>
  </li>


)}