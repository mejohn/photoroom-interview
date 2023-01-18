import React, { ChangeEvent, FormEvent, useState } from 'react';
import './App.css';
import AddButton from './components/AddButton';
import AddFolder from './components/AddFolder';
import Folder from './components/Folder';
import loadImage, { LoadImageResult } from 'blueimp-load-image';
import { API_KEY, API_URL, BASE64_IMAGE_HEADER } from './Constants';

interface ImageFolder {
  name: string,
  images: Array<string>
}

function App() {
  const [latestResult, setLatestResult] = useState<string | null>(null);
  const [uploadedImages, setUploadedImages] = useState<Array<ImageFolder>>([{name: "Untitled Folder", images: [] as string[]}]);
  
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
          const newImages = [...uploadedImages];
          newImages[0].images.push(base64Result);
          setUploadedImages(newImages);
        }
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

    /* figuring out how to get value from onSubmit instead of onChange without a controlled element
    https://stackoverflow.com/questions/71598967/how-to-get-the-value-of-input-tag-onsubmit-without-using-onchange-in-react-js-ty 
    */
    let getFormInput = (form: HTMLFormElement, name: string): HTMLInputElement => {
      const input = form.elements.namedItem(name);
      if (!input || !("value" in input) || input instanceof RadioNodeList) {
        throw new Error(`Form input "{$name} was not found or doesn't have a value`);
      }
      return input;
    }

    let onFolderAdd = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if(e.currentTarget) {
        const input = getFormInput(e.currentTarget, "newFolderName");
        const newImages = [...uploadedImages];
        newImages.push({name: input.value, images: []});
        setUploadedImages(newImages);
      }
    }

    let onFolderRename = (index: number, newName: string) => {
      const newImages = [...uploadedImages];
      console.log(index);
      newImages[index].name = newName;
      setUploadedImages(newImages);
    }
    
    return (
      <div className="App">
        <header className="header">
            <AddButton onImageAdd={onImageAdd}/>
            {!latestResult && <h1 className="header-no-images">No Uploaded Images. Give it a try!</h1>}
            {latestResult && <h1 className="header-title">Latest Upload</h1>}
            {latestResult && <img className="header-image" src={latestResult} width={300} alt="result from the API"/>}
        </header>
        {latestResult && <section className="folders">
          <AddFolder onFolderAdd={onFolderAdd} />
          <ul className="folder-list">
            {uploadedImages.map((folder, index) => {
              return <Folder name={folder.name} images={folder.images} key={index} index={index} onFolderRename={onFolderRename} />
            })}
          </ul>
        </section>
        }
      </div>
      );
    }
    
    export default App;
    