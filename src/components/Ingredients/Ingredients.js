import React, { useState } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  // 1. In this component we expect to see our list of ingredients, so here
  // we should implementet the logic for adding items to such list
  const addIngredientHandler = (ingredient) => {
    setUserIngredients((prevIngredient) => [
      // 2. This is the new array which we will return instead of previous one
      // so here we expext to see all our old ingredients plus new one
      // As the ingredient has the id field which we didn't get from user (user enterd only 2 fields)
      // thats why we need to construct our ingredient object by our own:
      // id field plus all fields from passing ingredient
      ...prevIngredient,
      { id: Math.random(), ...ingredient },
    ]);
  };

  // 3. IngredientList is the component which is resposible for managing the list of ingredients
  // and expects to have the list

  // 4. IngredientFrom is responsible for getting the ingredient from user so should have our adding functionality
  // so we pass our function through the props to IngredientForm component, where this function will be called
  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />
      <section>
        <Search />
        <IngredientList ingredients={userIngredients} onRemoveItem={() => {}} />
      </section>
    </div>
  );
};

export default Ingredients;
