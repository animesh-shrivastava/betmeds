import { Button } from "@mui/material";
import React, { useState } from "react";
import ShoppingCart from "@mui/icons-material/ShoppingCart";




export default function AddToCart(props) {

    const [btn, setbtn] = useState(false);
    const [cartQtyBtn, setCartQtyBtn] = useState(props.value);

    const handleAdd = () => {


        setbtn(true);
        var v = cartQtyBtn + 1
        if (v <= 10)
            setCartQtyBtn(v)
        props.onChange(v)
    }



    const handleSubtract = () => {
        var v = cartQtyBtn - 1
        if (v >=0) {
            setCartQtyBtn(v)
            props.onChange(v)
        }
        if (v == 0) {
            setbtn(true);

        }
    }






    return ([

        cartQtyBtn >0 ?
            <div>
                <Button onClick={handleSubtract} style={{ background: "black", color: "white", height: "30px" }}>-</Button>  {cartQtyBtn}

                <Button onClick={handleAdd} style={{ background: "black", color: "white", height: "30px", marginLeft: "5px" }} >+</Button>
            </div>
            : <Button
                onClick={handleAdd}
                style={{ background: "black", color: "white", height: "30px" }}> Add To Cart <ShoppingCart />
            </Button>

    ])



}