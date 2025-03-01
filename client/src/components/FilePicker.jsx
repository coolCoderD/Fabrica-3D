import React, { useRef, useState } from 'react'
import CustomButton from './CustomButton'
import ShapeChanger from './ShapeChanger';

const FilePicker = ({ file, setFile, readFile ,removeFile, preview, setPreview}) => {

 
  const fileInputRef = useRef(null); 
  const handleClick = (e) => {
    setFile(e.target.files[0])
    const selectedFile = e.target.files[0];
     // Generate preview if it's an image
     if (selectedFile && selectedFile.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview(null); // Reset preview if not an image
    }
  }

  return (
    <div className='filepicker-container'>
    <div
      className="flex-1 relative flex flex-col items-center filepicker-label p-4 border  rounded-md cursor-pointer hover:bg-black/50 transition-all"
      onClick={() => fileInputRef.current.click()} // Clicking the div triggers file input
    >
      <input
        type="file"
        id="file-upload"
        accept="image/*"
        ref={fileInputRef} // Reference to the input
        onChange={(e)=>handleClick(e)}
        className="hidden"
      />
        <label htmlFor="file-upload" className=' text-center '>Upload File</label>
        {preview && (
        <img
          src={preview}
          alt="Preview"
          className=""
        />
      )}        
      </div>
      {
        file && (
          
          <div className='mt-4 flex flex-wrap gap-3'>
          <CustomButton type="filled" title="Remove" handleClick={removeFile} customStyles='text-xl' />
        </div>
        )
      }

      <div className='mt-4 flex flex-wrap gap-3'>
        <CustomButton type="outline" title="Logo" handleClick={() => readFile('logo')} customStyles='text-xl' />
        <CustomButton type="filled" title="Full" handleClick={() => readFile('full')} customStyles='text-xl' />
      </div>
      
    </div>
  )
}

export default FilePicker;
