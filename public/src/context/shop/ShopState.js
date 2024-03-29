import React, { useReducer } from "react";
import axios from "axios";
import ShopContext from './shopContext'
import ShopReducer from './shopReducer'
import { useParams } from "react-router";
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

const ShopState = props => {
  const {id } = useParams()

    const intialState = {
        shops:[],
        shop: [],
        loading: false,
        current: null,
        filtered: null,
        error: null
    }

    const [state, dispatch] = useReducer(ShopReducer,intialState)

    // Search Shops
    const searchShops = async (text) => {
        setLoading()
    
        const res = await axios.get(`/api/shops`)
    
       dispatch({
        type: SEARCH_SHOPS,
        payload: res.data
       })
       }
    // get Shop
    const getShop = async(shop) => {
        setLoading()
  
        const res =  await axios.get(`/api/shops/${id}`) 
     
        dispatch({
            type: GET_SHOP,
            payload: res.data
        })
      } 
    // Clear Shops
    const clearShops = () => dispatch({type: CLEAR_SHOPS}) 

    // Set Loading
    const setLoading = () => dispatch({ type: SET_LOADING})

    // Add Shop
    const addShop = async shop => {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      try {
        const res = await axios.post('/api/shops', shop, config);

        dispatch({ type: ADD_SHOP,
                   payload: res.data });

      } catch (err) {
        dispatch({ 
          type: SHOP_ERROR,
          payload: err.response.msg 
         })
      }
   };

   // Delete SHOP
   const deleteShop = async id => {
     try {
       await axios.delete(`/api/shops/${id}`);

       dispatch({ 
         type: DELETE_SHOP,
         payload: id });

     } catch (err) {
       dispatch({ 
         type: SHOP_ERROR,
         payload: err.response.msg });
     }
   };

   // Update SHOPs
   const updateShop = async shop => {
     const config = {
       headers: {
         'Content-Type': 'application/json'
       }
     }

     try {
     const res = await axios.put(`/api/shops/${shop._id}`, shop, config);

     dispatch({ 
                type: UPDATE_SHOP,
                payload: res.data 
               });

     } catch (err) {
       dispatch({ 
         type: SHOP_ERROR,
         payload: err.response.msg 
        })
     }
   };

   // Set Current Shop
   const setCurrent = shop => {
       dispatch({ type: SET_CURRENT, payload: shop });
     };

   // Clear Current Shop
   const clearCurrent = () => {
       dispatch({ type: CLEAR_CURRENT });
     };

   // Filter Shops
   const filterShops = text => {
       dispatch({ type: FILTER_SHOPS, payload: text });
     };

   // Clear Filter
   const clearFilter = () => {
       dispatch({ type: CLEAR_FILTER });
     };

    return <ShopContext.Provider value={{
        shops: state.shops,
        shop: state.shop,
        loading: state.loading,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        searchShops, getShop,
        clearShops, addShop, 
        deleteShop, setCurrent,
        clearCurrent,updateShop,
        filterShops,clearFilter
    }}>
     {props.children}
    </ShopContext.Provider>
}

export default ShopState