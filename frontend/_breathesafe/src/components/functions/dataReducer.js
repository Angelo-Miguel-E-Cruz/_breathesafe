export const INITIAL_STATE ={
  latestPM25:{},
  latestPM10:{},
  latestPM25AQI:{},
  latestPM10AQI:{},
  latestPM25Level:{},
  latestPM10Level:{},
  lastPM25:{},
  lastPM10:{},
  lastPM25Level:{},
  lastPM10Level:{},
}

export const dataReducer = (state, action) => {
  switch(action.type){
    case "UPDATE":
      return{
        ...state, 
        [action.field]:{
          value: action.value,
          timestamp: action.timestamp
        } 
      }
      break;
    default:
      return state
  }
}