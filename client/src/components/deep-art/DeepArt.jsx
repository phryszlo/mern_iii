import React from 'react'
import { useState } from 'react';
import axios from 'axios';
const sid = '';
const STYLES_URL = "https://api.deeparteffects.com/v1/noauth/styles";
const UPLOAD_URL = "https://api.deeparteffects.com/v1/noauth/upload";
const RESULT_URL = `https://api.deeparteffects.com/v1/noauth/result?submissionId=${sid}`;

function DeepArt({setStyle}) {
  const [srcImg, setSrcImg] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);

  const fileSelected = (e) => {
    // console.log(`e.target = ${e.target.files.length}`)
    // console.log(`files[0] = ${e.target.files[0].name}`);
    // const formstuff = new FormData();
    // formstuff.append('file', e.target.files[0])
    // console.log(formstuff.getAll("file"))
    // // console.log(formstuff.getAll("name"))
    // Object.values(formstuff).forEach(k => {
    //   console.log(`v=${k}`);
    // })
    setSrcImg(e.target.files[0]);
    // console.log(`but files[0] as selectedFile=${srcImg.name}`);
  }

  const fetchStyles = () => {
    return null;
  }
  const postImage = async (e) => {
    e.preventDefault();
    let file = srcImg;
    console.log(`file.name = ${file.name}`)
    const formData = new FormData();
    console.log(`file: ${srcImg}`)
    formData.append('srcImg', srcImg);
    formData.append('name', 'jimmy');

    // console.log(`image: ${selectedFile}`)
    // console.log(`type: ${typeof (formData)}`)
    // Object.values(formData).forEach(v => {
    //   console.log(`v:${v}`)
    // })
    console.log(`formData: ${JSON.stringify(formData)}`);
    try {
      const response = await axios.post("/api/deepart", formData, {});
      // const json = await response.json();


      console.log(`post "successful": ${response.data}`);
      response.data.indexOf('http') >= 0 && setResultUrl(response.data);

      // setImage(null);
    } catch (error) {
      console.log(`postImage error: ${error}`);
    }
  }
  return (
    <div className='deep-art-shell'>
      <form id="form" onSubmit={(e) => postImage(e)}>
        <h4>DeepArt</h4>
        <input type="file" name="file" onChange={(e) => fileSelected(e)} />

        {srcImg && (
          <div className="image-details">
            <p className="image-detail-p">Filename: {srcImg.name}</p>
            <p className="image-detail-p">Filetype: {srcImg.type}</p>
            <p className="image-detail-p">Bytes: {srcImg.size}</p>
            <button
              type="submit"
              className="post-image-btn btn btn-primary" >
              post image
            </button>
          </div>
        )}
      </form>
      <img src={resultUrl} alt="" />
    </div>
  )
}

export default DeepArt