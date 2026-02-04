import React from "react";


function Header({ cartCount, onOpenCart }) {
  return (
    <nav className="navbar">
      <div className="brand">SMK-Store</div>


      {/* Saat diklik, panggil fungsi onOpenCart */}
      <button className="cart-btn" onClick={onOpenCart}>
        🛒 <span className="badge">{cartCount}</span>
      </button>
    </nav>
  );
}


export default Header;