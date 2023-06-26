import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";
import CartItem from "../components/CartItem";
import PriceCard from "../components/PriceCard";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaEquals } from "react-icons/fa";

export default function MyCart() {
  const SHIPPING = 3000;
  const { uid } = useAuthContext();
  const { isLoading, data: products } = useQuery(["carts"], () => getCart(uid));

  if (isLoading) return <p>Loading...</p>;

  const hasProducts = products && products.length > 0;
  const totalPrice =
    hasProducts &&
    products.reduce(
      (prev, current) => prev + parseInt(current.price) * current.quantity,
      0
    );

  return (
    <section>
      <p>내 장바구니</p>
      {!hasProducts && <p>장바구니에 상품이 없습니다. 열심히 쇼핑해 주세요!</p>}
      {hasProducts &&
        products.map((product) => (
          <>
            <ul>
              <CartItem key={product.id} product={product} uid={uid} />
            </ul>
            <div>
              <PriceCard text="상품 총액" price={totalPrice} />
              <BsFillPlusCircleFill />
              <PriceCard text="배송비" price={SHIPPING} />
              <FaEquals />
              <PriceCard text="총 가격" price={totalPrice + SHIPPING} />
            </div>
          </>
        ))}
    </section>
  );
}
