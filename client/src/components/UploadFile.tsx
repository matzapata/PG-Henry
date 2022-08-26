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
  Image,
} from "@chakra-ui/react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getUserInfo } from "../redux/slices/userSlices";
import api from "../services/api";

function UploadFiles(props: any) {
  const [imageSelected, setImageSelected] = useState("");
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const user_detail: any = useAppSelector((state) => state.user.user_detail);
  const isLoggedIn = useAppSelector((state) => state.auth.token);

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
    reader.onloadend = async () => {
      uploadImage(reader.result);
    };

    reader.onerror = () => {
      console.error("Error subiendo el archivo!!");
    };
  };

  const uploadImage = async (base64EncodedImage: any) => {
    let secure_url;
    try {
      await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_ID}/image/upload`,
        {
          method: "POST",
          body: JSON.stringify({
            file: base64EncodedImage,
            upload_preset: `${process.env.REACT_APP_CLOUDINARY_UNSIGNED}`,
          }),
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((r) => r.json())
        .then((response) => {
          secure_url = response.secure_url;
        });
      setFileInputState("");
      setPreviewSource("");
      if (secure_url) {
        await api
          .put(`${props.url}`, {
            avatar: secure_url,
            email: user_detail.email,
            id: user_detail.id,
          })
          .then((r) => r.data)
          .then((r) => console.log(r));
      }
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
              if (isLoggedIn) dispatch(getUserInfo(null));
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
                <Image
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
                    if (isLoggedIn) dispatch(getUserInfo(null));
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
    </div>
  );
}

export default UploadFiles;
