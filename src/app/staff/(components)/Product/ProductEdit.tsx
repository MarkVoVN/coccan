import "firebase/storage";
import {
  Edit,
  ImageField,
  ReferenceInput,
  SimpleForm,
  TextInput,
} from "react-admin";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { storage } from "../../../../firebase";
import { Button } from "@mui/material";

export const ProductEdit = () => {
  const [img, setImg] = useState<File>();
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  const handleSubmit = () => {
    const file = img;
    if (!file) return;

    const storageRef = ref(storage, `${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
        });
      }
    );
  };

  const handleChange = (e: any) => {
    const file = e.target?.files[0];
    console.log(file);
    setImg(file);
  };
  const transform = (data: any) => ({
    id: data.id,
    name: data.name,
    storeId: data.storeId,
    image: imgUrl ? imgUrl : data.image,
    category: data.category,
  });
  return (
    <Edit transform={transform}>
      <SimpleForm>
        <TextInput source="name" isRequired />
        <ReferenceInput source="storeId" reference="stores" isRequired />
        <ReferenceInput
          source="category.id"
          reference="categories"
          isRequired
        />
        <ImageField source="image"></ImageField>
        <TextInput source="image"></TextInput>
        <input type="file" placeholder="image" onChange={handleChange} />
        <Button onClick={handleSubmit}>Upload</Button>
        {imgUrl && <img src={imgUrl} alt="uploaded file" height={200} />}
      </SimpleForm>
    </Edit>
  );
};
