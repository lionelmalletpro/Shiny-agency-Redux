// import { combineReducers, createStore } from 'redux'
import themeReducer from '../features/theme'
import freelancesReducer from '../features/freelances'
import surveyReducer from '../features/survey'
import freelanceReducer from '../features/freelance'
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    theme: themeReducer,
    freelances: freelancesReducer,
    survey: surveyReducer,
    freelance: freelanceReducer,
  },
})

// on utilise le résultat de cette fonction en parametre de createStore
// const store = createStore(reducer, reduxDevtools)
