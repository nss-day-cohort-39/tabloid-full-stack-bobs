import React, { useContext, useEffect } from "react";
import { CategoryContext } from "../providers/CategoryProvider";
import { Category } from "./Category";
import "../styles/Category.css";

export const CategoryList = () => {
  const { categories, getAllCategories } = useContext(CategoryContext);

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="categoryContainer">
      <div className="row justify-content-center">
        <div className="cards-column">
          {categories.map((category) => (
            <Category key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};
