import {combineReducers} from 'redux'
import userReducer from './userReducer'

const rootReudcer = combineReducers({
    user:userReducer
})

export default rootReudcer