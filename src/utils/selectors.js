// ce selector est utilisé avec le hook useSeletor
export const selectTheme = (state) => state.theme

export const selectFreelances = (state) => state.freelances

//export const selectFreelance = (state) => state.freelance
const voidFreelance = { status: 'void' }

export const selectFreelance = (freelanceId) => (state) => {
  return state.freelance[freelanceId] ?? voidFreelance
}

export const selectSurvey = (state) => state.survey
