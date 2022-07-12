import React, { useState, useEffect } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  // useEffect will be called AFTER component render and for every render cycle, but when we add [...]
  // it will listen to the changes on it array. Without this [] it will be infinite loop. If we add empty []
  // the useEffect will play like afterDidMount - it will called only once
  useEffect(() => {
    fetch(
      "https://update-react-ingredients-default-rtdb.firebaseio.com/ingredients.json"
    )
      .then((response) => {
        response.json();
      })
      .then((responseData) => {
        loadedIngredients = [];
        for (const key in responseData) {
          loadedIngredients.push({
            id: key,
            title: response[key].title,
            amount: response[key].amount,
          });
        }
        setUserIngredients(loadedIngredients);
      });
  }, []);

  const addIngredientHandler = (ingredient) => {
    fetch(
      "https://update-react-ingredients-default-rtdb.firebaseio.com/ingredients.json",
      {
        method: "POST",
        body: JSON.stringify(ingredient),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setUserIngredients((prevIngredient) => [
          ...prevIngredient,
          { id: responseData.name, ...ingredient },
        ]);
      });
  };

  const removeIngredientHandler = (ingredientId) => {
    setUserIngredients((prevIngredients) =>
      prevIngredients.filter((ingredient) => ingredient.id !== ingredientId)
    );
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />
      <section>
        <Search />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;
