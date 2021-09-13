import React,{createContext,useState,useEffect} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

const UserContext=createContext({
    isLoggedIn:"",
    getLoggedIn:"",
    cart:""
});




export function UserContextProvider(props){
    const history=useHistory();
    const [isLoggedIn,setIsLoggedIn]=useState(undefined);

    const [cart,setCart]=useState([]);

   async function getLoggedIn(){
    const res=await axios.get('/loggedIn')
    setIsLoggedIn(res.data);
    }

    async function getCart(){
      const res= await axios.get('/user/cart');
      console.log("HELLO")
      console.log("Logged in status",isLoggedIn)
      setCart(res.data);
      
    }

   async function addToCart(product){
    try{
        setCart((prevCart)=>{
            return prevCart.concat(product)
        })
        await axios.post('/user/cart/add',{productId:product.id});
        console.log("Product Add Successfully in the cart");
    }catch(e){
        console.log(e.message);
        history.push('/allproducts')
    }

    }

    async function removeFromCart(productid){
        console.log("Removing")
        setCart((prevCart)=>{
            console.log("prevCart",prevCart)
            return prevCart.filter(product=>product._id !== productid);
        })

        await axios.post('/user/cart/remove',{productid})

    }



    useEffect(()=>{
        getLoggedIn();

        if(isLoggedIn===true){
            getCart();
        }
        // eslint-disable-next-line
    },[isLoggedIn])

    const context={
        isLoggedIn,
        getLoggedIn,
        cart,
        addToCart,
        cartLength:cart.length,
        removeFromCart
    }

    return(
        <UserContext.Provider value={context}>
            {props.children}
        </UserContext.Provider>
    )
    
}

export default UserContext