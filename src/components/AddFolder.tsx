import React, { useState, FormEvent } from "react";

export default function AddFolder ({
    onFolderAdd,
  }: {
    onFolderAdd: (event: FormEvent<HTMLFormElement>) => void;
  }): JSX.Element {

    const [showInput, setShowInput] = useState(false);

    let onAddButtonClick = () => {
      setShowInput(true);
    }

    let onCancelButtonClick = () => {
      setShowInput(false);
    }

    let onSubmit = (event: FormEvent<HTMLFormElement>) => {
      setShowInput(false);
      onFolderAdd(event);
    }

   return (
  <div className="add-folder-wrapper">
    {!showInput && <button className="add-folder-button" type="button" onClick={onAddButtonClick}>New Folder</button>}
    {showInput && <form onSubmit={onSubmit}>
    <label className="add-folder-label"
           htmlFor="customFolderAdd">
      <input type="text"
             className="add-folder-input"
             id="newFolderName"
             name="newFolderName"
             minLength={1}
             maxLength={255}
             required={true}
             placeholder="New Folder"
             />
      <button className="save-folder-button" type="submit">Save</button>
      <button className="cancel-folder-button" type="button" onClick={onCancelButtonClick}>Cancel</button>
    </label>
    </form>
    }
  </div>


)}