import { createStore, combineReducers } from "redux";
import categoryesReducer from "./categoryesReducer";

let reducers=combineReducers({
   categories: categoryesReducer,
})
let store=createStore(reducers);

export default store;