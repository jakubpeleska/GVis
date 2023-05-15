import React, { FC, useState } from 'react';

interface TitleProps {
  title?: string;
  placeholder?: string;
}

const FileInput: FC<TitleProps> = ({ title, placeholder = 'Select file fromm your device...' }) => {

  const [filename, setFilename] = useState<string>("")

  return (
    <>
      <div>
        <input
          style={{ background: "lightGrey", padding: "10px", borderRadius: "5px" }}
          type='file'
          id='geo-data-input'
          title={title}
          onChange={(e) => {
            console.log(e)
            setFilename(e.target.value)
          }}
          value={filename}
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default FileInput;