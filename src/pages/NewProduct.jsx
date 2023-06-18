import React, { useState } from "react";
import Button from "../components/ui/Button";
import { uploadeImage } from "../api/uploader";
import { addNewProduct } from "../api/firebase";

export default function NewProduct() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFile(files && files[0]);
      console.log(files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    uploadeImage(file).then((url) => {
      console.log(url);
      addNewProduct(product, url);
    });
  };

  return (
    <section>
      {file && <img src={URL.createObjectURL(file)} alt="local file" />}
      <form
        onSubmit={handleSubmit}
        className="flex-col items-center content-center"
      >
        <label>새로운 제품 등록</label>
        <input
          className="flex"
          type="file"
          accept="image/*"
          name="file"
          required
          onChange={handleChange}
        />
        <input
          className="flex"
          type="text"
          name="title"
          value={product.title ?? ""}
          placeholder="제품명"
          required
          onChange={handleChange}
        />
        <input
          className="flex"
          type="text"
          name="price"
          value={product.price ?? ""}
          placeholder="가격"
          required
          onChange={handleChange}
        />
        <input
          className="flex"
          type="text"
          name="category"
          value={product.category ?? ""}
          placeholder="카테고리"
          required
          onChange={handleChange}
        />
        <input
          className="flex"
          type="text"
          name="description"
          value={product.description ?? ""}
          placeholder="제품설명"
          required
          onChange={handleChange}
        />
        <input
          className="flex"
          type="text"
          name="options"
          value={product.options ?? ""}
          placeholder="옵션들(콤마(,)로 구분)"
          required
          onChange={handleChange}
        />
        <Button text={"제품 등록하기"} />
      </form>
    </section>
  );
}
