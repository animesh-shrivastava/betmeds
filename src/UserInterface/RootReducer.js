const initialState={
    product:{},
    user:{}

}
export default function RootReducer(state=initialState,action)
{
    switch(action.type)
    {
        case 'ADD_PRODUCT':
            state.product[action.payload[0]]=action.payload[1]
            console.log(state.product)
            
            return({product:state.product})

            case 'DEL_PRODUCT':
               delete state.product[action.payload[0]]
                return({product:state.product}) 
                
             case 'ADD_USER':
                state.user[action.payload[0]]=action.payload[1]
            console.log("uuuuuuuuuuuuuser",state.user)
            return({user:state.user})


  
                
        default:
            return(state)    
    }
} 