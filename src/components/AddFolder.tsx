import React, { ChangeEvent } from "react";
import start from "../startButton.svg";

export default function AddFolder ({
    onFolderAdd,
  }: {
    onFolderAdd: (event: ChangeEvent<HTMLInputElement>) => void;
  }): JSX.Element {

   return (

  <div className="add-folder-wrapper">
    <label className="add-folder-label"
           htmlFor="customFolderAdd">
            Add Folder
      <input type="text"
             onChange={onFolderAdd}
             className="add-folder-input"
             id="customFolderAdd"
             minLength={1}
             maxLength={255}
             required={true}
             />
      <img src={start} alt="" className="add-folder-image"/>
    </label>
  </div>


)}