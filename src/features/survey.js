// import produce from 'immer'
import { selectSurvey } from '../utils/selectors'
import { createAction, createReducer } from '@reduxjs/toolkit'

const initialState = {
  status: 'void',
  data: null,
  error: null,
}

// const FETCHING = 'survey/fetching'
// const RESOLVED = 'survey/resolved'
// const REJECTED = 'survey/rejected'

// const surveyFetching = () => ({ type: FETCHING })
// const surveyResolved = (data) => ({ type: RESOLVED, payload: data })
// const surveyRejected = (error) => ({ type: REJECTED, payload: error })

const surveyFetching = createAction('survey/fetching')

const surveyResolved = createAction('survey/resolved', (data) => ({
  payload: { data },
}))

const surveyRejected = createAction('survey/rejected', (error) => ({
  payload: { error },
}))

export async function fetchOrUpdateSurvey(store) {
  const status = selectSurvey(store.getState()).status
  if (status === 'pending' || status === 'updating') {
    return
  }
  store.dispatch(surveyFetching())
  try {
    const response = await fetch('http://localhost:8000/survey')
    const data = await response.json()
    store.dispatch(surveyResolved(data))
  } catch (error) {
    store.dispatch(surveyRejected(error))
  }
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(surveyFetching, (draft, action) => {
      if (draft.status === 'void') {
        draft.status = 'pending'
        return
      }
      if (draft.status === 'rejected') {
        draft.error = null
        draft.status = 'pending'
        return
      }
      if (draft.status === 'resolved') {
        draft.status = 'updating'
        return
      }
      return
    })
    .addCase(surveyResolved, (draft, action) => {
      if (draft.status === 'pending' || draft.status === 'updating') {
        draft.data = action.payload
        draft.status = 'resolved'
        return
      }
      return
    })
    .addCase(surveyRejected, (draft, action) => {
      if (draft.status === 'pending' || draft.status === 'updating') {
        draft.error = action.payload
        draft.data = null
        draft.status = 'rejected'
        return
      }
      return
    })
)
