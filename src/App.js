import './App.css';
import { useState } from 'react';

function App() {

  const [balance,setBalance]= useState()
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState({})
  const [error, setError] = useState(false)


  function balanceOnChangeHandler(e) {

    const { value } = e.target
    setBalance(value)
  }

  function productOnChangeHandler(e) {
    const { value, name } = e.target
    setProduct({
      ...product,
      [name]: value
    })
  }

  function getTotals(products){

    let total = 0
    for(let i=0; i< products.length; i++){
      const {price} = products[i]
      total += parseInt(price)
    }
    return total
  }

  function addProductHandler() {
    let updatedProducts = [...products]
    updatedProducts = [...updatedProducts, product]
    if(parseInt(getTotals(updatedProducts)) < balance){
    setProducts(updatedProducts)
    }else{
      setError(true)
    }
  }


  return (
    <div>
      <div>
        <input type='text' name='product' value={product?.name} onChange={productOnChangeHandler} />
        <input type='number' name='price' value={product?.price} onChange={productOnChangeHandler} />
        <button onClick={addProductHandler}>{'Buy'}</button>
      </div>


      <div>
        <h3>Rs:{parseInt(balance) - parseInt(getTotals(products))}</h3>
        <input type='number' value={balance} onChange={balanceOnChangeHandler} />
        <button onClick={addProductHandler}>{'Load Money'}</button>
      </div>


      {
        products && products.length > 0 && products.map((eachProduct, index) => {
          const { product, price } = eachProduct
          return (
            <div key={index} 
            style={{
              display:'flex',
              flexDirection:'row',
              alignItems:'center',
              gap:'10px'
            }}>
              <h5>{product}</h5>
              <small>{price}</small>
            </div>
          )
        })
      }
      {
        error && <h1>{'Please Load Money'}</h1>
      }
    </div>
  );
}

export default App;
