import React, { useCallback, useReducer, useMemo, useEffect } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";
import ErrorModal from "../UI/ErrorModal";
import useHttp from "../../hooks/http";

const ingredientsReducer = (currentIngredients, action) => {
  switch (action.type) {
    case "SET":
      return action.ingredients;
    case "ADD":
      return [...currentIngredients, action.ingredient];
    case "DELETE":
      return currentIngredients.filter((ing) => ing.id !== action.id);
    default:
      throw new Error("Somthing goes wrong!");
  }
};

const Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(ingredientsReducer, []);
  const { isLoading, error, data, sendRequest, extra, identifier, clear } =
    useHttp();

  useEffect(() => {
    if (!isLoading && !error && identifier === "REMOVE_IDENTIFIER") {
      dispatch({
        type: "DELETE",
        id: extra,
      });
    } else if (!isLoading && !error && identifier === "ADD_IDENTIFIER") {
      dispatch({
        type: "ADD",
        ingredient: {
          id: data.name,
          ...extra,
        },
      });
    }
  }, [data, extra, identifier, isLoading, error]);

  const addIngredientHandler = useCallback(
    (ingredient) => {
      sendRequest(
        "https://update-react-ingredients-default-rtdb.firebaseio.com/ingredients.json",
        "POST",
        JSON.stringify(ingredient),
        ingredient,
        "ADD_IDENTIFIER"
      );
    },
    [sendRequest]
  );

  const removeIngredientHandler = useCallback(
    (ingredientId) => {
      sendRequest(
        `https://update-react-ingredients-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,
        "DELETE",
        null,
        ingredientId,
        "REMOVE_IDENTIFIER"
      );
    },
    [sendRequest]
  );

  const filterIngredientsHandler = useCallback((filterIngredients) => {
    dispatch({
      type: "SET",
      ingredients: filterIngredients,
    });
  }, []);

  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={userIngredients}
        onRemoveItem={removeIngredientHandler}
      />
    );
  }, [userIngredients, removeIngredientHandler]);

  return (
    <div className="App">
      {error ? <ErrorModal onClose={clear}>{error}</ErrorModal> : null}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />
      <section>
        <Search onLoadedIngredients={filterIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
};

export default Ingredients;
