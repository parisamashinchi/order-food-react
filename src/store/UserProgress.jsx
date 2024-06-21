import { createContext, useState } from "react";

const ProgressContext = createContext({
   progress: '',
   showCart: () => {},
   hideCart: () => {},
   showCheckout: () => {},
   hideCheckout: () => {}, 
});

export function ProgressContextProvider({children}) {
    const [progress, setProgress]  = useState('');

    function showCart(){
        setProgress('cart')
    }

    function hideCart(){
        setProgress('')
    }

    function showCheckout(){
        setProgress('checkout')
    }

    function hideCheckout(){
        setProgress('')
    }

    const progressContext = {
        progress: progress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout, 
    }

    return  (
        <ProgressContext.Provider value={progressContext}>
          {children}
        </ProgressContext.Provider>
      );
  
    } 
    export default ProgressContext;

