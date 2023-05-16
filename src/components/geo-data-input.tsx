import { FC, useState } from 'react';

interface GeoDataInputProps {
  setGeoData: (data: any) => void
  title?: string;
  placeholder?: string;
}

const GeoDataInput: FC<GeoDataInputProps> = ({ setGeoData, title, placeholder = 'Select file fromm your device...' }) => {

  const [filename, setFilename] = useState<string>("")

  return (
    <>
      <div>
        <input
          style={{ background: "lightGrey", padding: "10px", borderRadius: "5px" }}
          type='file'
          id='geo-data-input'
          title={title}
          onChange={async (e) => {
            if (!e.target.files) return
            setFilename(e.target.value)


            const data = await e.target.files[0].text()
            console.log(data)
            setGeoData(data)
          }}
          value={filename}
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default GeoDataInput;