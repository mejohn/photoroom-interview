import React, { ChangeEvent, useState } from 'react';
import './App.css';
import AddButton from './components/AddButton';
import AddFolder from './components/AddFolder';
import Folder from './components/Folder';
import loadImage, { LoadImageResult } from 'blueimp-load-image';
import { API_KEY, API_URL, BASE64_IMAGE_HEADER } from './Constants';

type ImageFolder = {
  name: string;
  images: string[];
};
function App() {
  const [latestResult, setLatestResult] = useState<string | null>(null)
  let uploadedImages: Array<ImageFolder> = [{name: "Untitled Folder", images: []}];
  
  let uploadImageToServer = (file: File) => {
    loadImage(
      file,
      {
        maxWidth: 400,
        maxHeight: 400,
        canvas: true
      })
      .then(async (imageData: LoadImageResult) => {
        let image = imageData.image as HTMLCanvasElement
        
        let imageBase64 = image.toDataURL("image/png")
        let imageBase64Data = imageBase64.replace(BASE64_IMAGE_HEADER, "")
        let data = {
          image_file_b64: imageBase64Data,
        }
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-api-key': API_KEY
          },
          body: JSON.stringify(data)
        });

        if (response.status >= 400 && response.status < 600) {
          throw new Error("Bad response from server");
        }

        const latestResult = await response.json();
        const base64Result = BASE64_IMAGE_HEADER + latestResult.result_b64
        setLatestResult(base64Result)
        if (latestResult) {
          // we upload to "Untitled Folder" right now, which is always index 0.
          uploadedImages[0].images.push(base64Result);
        }
        console.log(uploadedImages);
      })
      
      .catch(error => {
        console.error(error)
      })
    }
    
    let onImageAdd = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        uploadImageToServer(e.target.files[0])
      } else {
        console.error("No file was picked")
      }
    }

    let onFolderAdd = (e: ChangeEvent<HTMLInputElement>) => {
      if(e.target.value) {
        console.log(e.target.value);
        uploadedImages.push({name: e.target.value, images: []});
      }
    }
    
    return (
      <div className="App">
        <header className="App-header">
          {!latestResult && <AddButton onImageAdd={onImageAdd}/>}
          {latestResult && <img src={latestResult} width={300} alt="result from the API"/>}
          <AddFolder onFolderAdd={onFolderAdd} />
          <ul className="folder-list">
            {uploadedImages.map((folder, index) => {
              console.log(folder.images);
              return <Folder name={folder.name} images={folder.images} key={index} />
            })}
          </ul>
        </header>
      </div>
      );
    }
    
    export default App;
    