import {configureStore} from '@reduxjs/toolkit'
import favoritesReducer from './slices/favoriteSlice'

export const store = configureStore({
    reducer: {
        favorites: favoritesReducer,
    },
})