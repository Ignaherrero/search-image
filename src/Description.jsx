import { Button, Flex, Image, Text } from "@chakra-ui/react";
import fileDownload from "js-file-download";
import React, { useContext, useReducer, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { ContextImage } from "./image-context";

export const Description = () => {
  let params = useParams();
  const { image } = useContext(ContextImage);

  const handleDownloadImage = () => {
    const imageInfo = image.find((image) => image.id == params.id);

    fetch(imageInfo.largeImageURL)
      .then((res) => res.blob())
      .then((blob) => {
        fileDownload(blob, imageInfo.tags + ".jpg");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Button>
        <Link to="/">Volver</Link>
      </Button>
      <Flex
        width="100%"
        justifyContent="center"
        flexDir="column"
        alignItems="center"
      >
        {image.map((image) => {
          if (image.id == params.id) {
            return (
              <>
                <Image src={image.largeImageURL} key={crypto.randomUUID()} />
                <Text key={crypto.randomUUID()}>{image.description}</Text>
              </>
            );
          }
        })}
        <Button onClick={handleDownloadImage} width="300px">
          Descargar
        </Button>
      </Flex>
    </>
  );
};
