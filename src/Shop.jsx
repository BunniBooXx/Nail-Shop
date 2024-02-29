import React from 'react';
import './Shop.css';

function Product(props) {
  return (
    <div className="product">
      <img src={props.image} alt={props.name} />
      <br/>
      <a href="https://www.google.com">
      <h2>{props.name}</h2>
      </a>
      <br/>
      <p className="price">{props.price}</p>
      <br/>
      <button>Add to Cart</button>
    </div>
  );
}

function Shop() {
  return (
    <div className="container">
      <h1>Welcome to Our Cute Shop!</h1>
      <div className="products">
        <Product name="Product 1" price="$10.99" image="nail_1.jpg" />
        <Product name="Product 2" price="$12.99" image="nail_2.jpg" />
        {/* Add more product entries as needed */}
      </div>
    </div>
  );
}

export default Shop;
