import React, { useState, FormEvent } from "react";
import { ImageFolder } from "../Types";

export default function Image({
  image,
  folderIndex,
  uploadedImages,
  onImageMove,
}: {
  image: string,
  folderIndex: number,
  uploadedImages: Array<ImageFolder>,
  onImageMove: (image: string, newFolderIndex: number, oldFolderIndex: number) => void,
}): JSX.Element {
  const [showForm, setShowForm] = useState(false);
  const [newFolder, setNewFolder] = useState<number>(folderIndex);

  let onEditButtonClick = () => {
    setShowForm(true);
  }

  let onCancelButtonClick = () => {
    setShowForm(false);
  }

  let onSelectChange = (event: FormEvent<HTMLSelectElement>) => {
    setShowForm(false);
    const value = Number(event.currentTarget.value);
    setNewFolder(value);
    onImageMove(image, value, folderIndex);
  }

  return (
    <li className="folder-list-item">
      <img className="folder-image" src={image} alt="result from the API"/>
      <button className="image-edit-button" onClick={onEditButtonClick}>&#9998;</button>
      {showForm && <form className="image-move-form">
        <select className="image-move-select" onChange={onSelectChange} defaultValue={folderIndex}>
          {uploadedImages.map((folder, index) => {
              return <option value={index} key={index}>{folder.name}</option>
          })}
        </select>
        <button className="image-move-cancel" onClick={onCancelButtonClick}>&#9747;</button>
      </form>}
    </li>
  )
}