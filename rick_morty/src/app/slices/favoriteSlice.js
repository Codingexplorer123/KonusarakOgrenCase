import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  characterIDs: localStorage.getItem("favorites")
    ? JSON.parse(localStorage.getItem("favorites"))
    : [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addCharacterID: (state, action) => {
      if (state.characterIDs.indexOf(action.payload) === -1) {
        state.characterIDs.push(action.payload);
      }

      let localFavorites = JSON.parse(localStorage.getItem("favorites"));
      console.log(localFavorites != null);
      if (localFavorites) {
        localFavorites.indexOf(action.payload) === -1 &&
          localFavorites.push(action.payload);
        localStorage.setItem("favorites", JSON.stringify(localFavorites));
      } else {
        localStorage.setItem("favorites", JSON.stringify([action.payload]));
      }
    },
    removeCharacterID: (state, action) => {
      state.characterIDs = state.characterIDs.filter(
        (id) => id !== action.payload
      );
      let localFavorites = JSON.parse(localStorage.getItem("favorites"));

      localFavorites = localFavorites.filter((id) => id !== action.payload);
      localStorage.setItem("favorites", JSON.stringify(localFavorites));
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCharacterID, removeCharacterID } = favoritesSlice.actions;

export default favoritesSlice.reducer;