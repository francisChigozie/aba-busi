import {
    SEARCH_SHOPS,
    CLEAR_SHOPS,
    GET_SHOP,
    SET_LOADING,
    ADD_SHOP,
    DELETE_SHOP,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_SHOP,
    FILTER_SHOPS,
    CLEAR_FILTER,
    SHOP_ERROR
    } from '../types'
  
    export default(state,action) => {
      switch(action.type){
          case SEARCH_SHOPS:
              return {
                  ...state,
                  shops:action.payload,
                  loading:false
              }
              case GET_SHOP:
                  return {
                      ...state,
                      shop:action.payload,
                      loading:false
                  }    
          case CLEAR_SHOPS:
              return {
                  ...state,
                  shops:[],
                  loading:false,
                  filtered: null,
                  error: null,
                  current: null
              }    
          case SET_LOADING: 
          return {
              ...state,
              loading: true
          }
          case ADD_SHOP:
              return {
                  ...state,
                  shops: [action.payload, ...state.shops],
                  loading: false
              };
           case UPDATE_SHOP:
               return {
                   ...state,
                   shops: state.shops.map( shop => shop._id === action.payload._id ? action.payload : shop),
                   loading: false
               };  
           case DELETE_SHOP:
               return {
                 ...state,
                 shops: state.shops.filter(shop => shop._id !== action.payload),
                 loading: false
               }; 
               case SET_CURRENT:
                  return {
                      ...state,
                      current: action.payload
                  };
              case CLEAR_CURRENT:
                  return {
                      ...state,
                      current: null
                  };          
              case FILTER_SHOPS:
                  return {
                      ...state,
                      filtered: state.shops.filter(shop => {
                        const regex = new RegExp(`${action.payload}`, 'gi');
                        return shop.name.match(regex) || shop.summary.match(regex);
                      })
                  };
              case CLEAR_FILTER:
                  return {
                      ...state,
                      filtered: null
                  }; 
              case SHOP_ERROR:
                  return {
                      ...state,
                      error: action.payload
                  };             
  
          default:return state
      }
    }