import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

function UploadFiles(props: any) {
  const [imageSelected, setImageSelected] = useState("");
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const previewFile = (file: any) => {
    const reader: any = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0];
    previewFile(file);
    setImageSelected(file);
    setFileInputState(e.target.value);
  };

  const handleSubmitFile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!imageSelected) return;
    const reader: any = new FileReader();
    reader.readAsDataURL(imageSelected);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error("Error subiendo el archivo!!");
    };
  };

  const uploadImage = async (base64EncodedImage: any) => {
    let secure_url;
    try {
      await fetch("https://api.cloudinary.com/v1_1/drgqlk8l3/image/upload", {
        method: "POST",
        body: JSON.stringify({
          file: base64EncodedImage,
          upload_preset: "unqyzvup",
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then((r) => r.json())
        .then((response) => {
          secure_url = response.secure_url;
        });
      setFileInputState("");
      setPreviewSource("");
      if (secure_url) console.log(secure_url);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Button
        borderRadius={"10px"}
        onClick={() => {
          onOpen();
          setFileInputState("");
          setPreviewSource("");
        }}
        w={props.width || "200px"}
      >
        {props.funcion || "Funcion que realiza"}
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose;
          setFileInputState("");
          setPreviewSource("");
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.titulo || "Header"}</ModalHeader>
          <ModalCloseButton
            onClick={() => {
              onClose();
              setFileInputState("");
              setPreviewSource("");
            }}
          />
          <ModalBody>
            <form onSubmit={handleSubmitFile}>
              <input
                type="file"
                name="image"
                onChange={handleFileInputChange}
                value={fileInputState}
              />
              {previewSource && (
                <img
                  src={previewSource}
                  alt="imagen_elegida"
                  style={{ height: "200px" }}
                />
              )}
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => {
                    onClose();
                    setFileInputState("");
                    setPreviewSource("");
                  }}
                >
                  Cerrar
                </Button>
                <Button type="submit" variant="ghost">
                  Subir Imagen
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* <form onSubmit={handleSubmitFile}>
        <input
          type="file"
          name="image"
          onChange={handleFileInputChange}
          value={fileInputState}
        />
        <button type="submit">Upload Image</button>
      </form>
      {previewSource && (
        <img
          src={previewSource}
          alt="imagen_elegida"
          style={{ height: "200px" }}
        />
      )} */}
    </div>
  );
}

export default UploadFiles;
