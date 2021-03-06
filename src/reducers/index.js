import { combineReducers } from 'redux';

const quizData = (state = {list: [], question: -1, status: 0, selectedAnswer: -1}, action) => {
  switch (action.type) {
    case 'fetchData':
      return {
        ...state,
        list: action.data,
        question: -1,
        status: 0,
        selectedAnswer: -1
      }
    case 'nextQuestion':
      let nx = state.question >= state.list.length - 1 ? state.question : state.question + 1;
      return {
        ...state,
        question: nx,
        status: 0,
        selectedAnswer: -1
      }
    case 'restart':
      return {
        ...state,
        question: 0,
        status: 0,
        selectedAnswer: -1
      }
    case 'correctAnswer':
      return {
        ...state,
        status: 1
      }
    case 'wrongAnswer':
      return {
        ...state,
        status: 2
      }
    case 'selectAnswer':
      return {
        ...state,
        selectedAnswer: action.selectedAnswer
      }
    default:
      return state
  }
}

const reader = (state = -1, action) => {
  switch (action.type) {
    case 'next_reader':
      return state + 1
    case 'reset_reader':
      return -1
    case 'stop_reader':
      return 99
    default:
      return state
  }
}

const config = (state = {talkspeed: 1, gender: 'UK English Male', useGsheet: false}, action) => {
  switch (action.type) {
    case 'update_talkspeed':
      return {
        ...state,
        talkspeed: action.speed
      }
    case 'update_gender':
      return {
        ...state,
        gender: action.gender
      }
    case 'toggle_useGsheet':
      return {
        ...state,
        useGsheet: !state.useGsheet
      }
    default:
      return state
  }
}

export default combineReducers({
  quizData,
  reader,
  config
})