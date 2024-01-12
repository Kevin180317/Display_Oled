import React, { useRef } from 'react'
import { saveAs } from 'file-saver';

function App() {
  const fileInput = useRef();

  const handleClick = () => {
    // Redirige a 'localhost:3000/test'
    window.location.href = 'http://localhost:3000/test';
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const byteArray = new Uint8Array(reader.result);
      let hex = Array.from(byteArray).map(b => '0x' + b.toString(16).padStart(2, '0'));
      
      let formattedHex = '';
      while(hex.length) {
        formattedHex += '  ' + hex.splice(0,16).join(', ') + ',\n';
      }

      const content = `static const byte image_array[] PROGMEM  = {\n${formattedHex}};`;
      console.log(content);

      const blob = new Blob([content], {type: "text/plain;charset=utf-8"});
      saveAs(blob, "image.h");
    };

    reader.readAsArrayBuffer(file);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>App</div>
      <input type="file" accept=".png" ref={fileInput} onChange={handleFileChange} />
      <button>Click me</button>
    </div>
  )
}

export default App