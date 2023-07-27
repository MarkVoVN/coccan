import "firebase/storage";
import { Create, ReferenceInput, SimpleForm, TextInput } from "react-admin";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { storage } from "../../../../firebase";
import { Button } from "@mui/material";

export const ProductCreate = () => {
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
    ...data,
    image: imgUrl,
  });
  return (
    <Create transform={transform}>
      <SimpleForm>
        <TextInput source="name" isRequired />
        <ReferenceInput source="storeId" reference="stores" isRequired />
        <ReferenceInput source="categoryId" reference="categories" isRequired />
        <input
          type="file"
          placeholder="image"
          onChange={handleChange}
          required
        />
        <Button onClick={handleSubmit}>Upload</Button>
        {imgUrl && <img src={imgUrl} alt="uploaded file" height={200} />}
      </SimpleForm>
    </Create>
  );
};
