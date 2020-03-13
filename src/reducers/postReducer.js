import {SEND_CODE_UPDATE, SEND_GO_UPDATE, GET_STATE} from "../actions/types"

//empty state where model shall be exported
const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case SEND_CODE_UPDATE: 
    return {
      ...state
    }
    case SEND_GO_UPDATE: 
    return {
      ...state
    }
    default: return state 
  }
}