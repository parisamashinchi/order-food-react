import { useContext } from 'react';
import logo from '../assets/logo.jpg';
import Button  from './UI/Button';
import CartContext from '../store/CartContext';
import ProgressContext from '../store/UserProgress';

const Header = () => {
  const cartCtx = useContext(CartContext);
  const progressCtx = useContext(ProgressContext);

  const totalNumber = cartCtx.items.reduce((total,item)=>{
    return  total + item.quantity
  },0)
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} placeholder="reactFood" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textStyle onClick={() =>  progressCtx.showCart()}>Cart({totalNumber})</Button>
      </nav>
    </header>
  );
};
export default Header;
