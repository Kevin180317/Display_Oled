import React, { useRef, useState } from "react";
import { saveAs } from "file-saver";

function App() {
  const fileInput = useRef();
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = 240;
      canvas.height = 240;
      ctx.drawImage(this, 0, 0, 240, 240);

      const resizedImageUrl = canvas.toDataURL();
      setPreview(resizedImageUrl);  // Guardar la URL de la imagen redimensionada para la vista previa.
       
      canvas.toBlob(function(blob) {
        const reader = new FileReader();
        reader.onloadend = function() {
          const byteArray = new Uint8Array(reader.result);

          let hex = Array.from(byteArray).map(
            (b) => "0x" + b.toString(16).padStart(2, "0")
          );

          let formattedHex = "";
          while (hex.length) {
            formattedHex += "  " + hex.splice(0, 16).join(", ") + ",\n";
          }

          const content = `static const byte image_array[] PROGMEM  = {\n${formattedHex}};`;
          console.log(content);

          const blob = new Blob([content], {
            type: "text/plain;charset=utf-8",
          });
          saveAs(blob, "image.h");
        }
        reader.readAsArrayBuffer(blob);
      });
    };
    img.src = URL.createObjectURL(file);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <div>Convertir Image to HEX</div>
      <input
        type="file"
        accept="image/*"
        ref={fileInput}
        onChange={handleFileChange}
      />
      {preview && <img src={preview} alt="Preview" className="mt-4" />}  // Mostrar la vista previa
    </div>
  );
}

export default App;