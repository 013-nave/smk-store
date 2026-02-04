import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

function CartSidebar({ isOpen, closeCart, cartItems = [], updateQty }) {
  const [view, setView] = useState("cart");

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0,
  );

  const formatRupiah = (num) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);

  const handleClose = () => {
    setView("cart");
    closeCart();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay ${isOpen ? "open" : ""}`}
        onClick={handleClose}
      />

      {/* Sidebar */}
      <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
        {/* HEADER */}
        <div className="cart-header">
          <h2>
            {view === "cart" && "Cart"}
            {view === "qr" && "Payment"}
            {view === "struk" && "Digital Receipt"}
          </h2>
          <button className="close-btn" onClick={handleClose}>
            &times;
          </button>
        </div>

        {/* CONTENT */}
        <div className="cart-content">
          {view === "cart" && (
            <>
              {cartItems.length === 0 ? (
                <p style={{ textAlign: "center", marginTop: "40px" }}>
                  Cart is empty 😢
                </p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 6,
                        objectFit: "cover",
                      }}
                    />

                    <div style={{ flex: 1 }}>
                      <strong style={{ fontSize: "0.9rem" }}>
                        {item.name}
                      </strong>
                      <br />
                      <small>{formatRupiah(item.price)}</small>
                    </div>

                    <div className="qty-control">
                      <button onClick={() => updateQty(item.id, -1)}>-</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)}>+</button>
                    </div>

                    {/* <button
                      onClick={() => updateQty(item.id, -item.qty)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#dc2626",
                        fontSize: "1.2rem",
                        cursor: "pointer",
                      }}
                      title="Remove item"
                    >
                      🗑️
                    </button> */}
                  </div>
                ))
              )}
            </>
          )}

          {view === "qr" && (
            <div style={{ textAlign: "center", marginTop: 20 }}>
              <p>Scan QRIS SMK-Store</p>

              <QRCodeCanvas
                value={`PAYMENT-SMK-STORE-${totalPrice}`}
                size={180}
                includeMargin
              />

              <h3 style={{ marginTop: 15 }}>{formatRupiah(totalPrice)}</h3>

              <button
                className="checkout-btn"
                style={{ background: "#16a34a", marginTop: 20 }}
                onClick={() => setView("struk")}
              >
                Confirm Payment
              </button>
            </div>
          )}

          {view === "struk" && (
            <div
              style={{
                background: "#fffef0",
                padding: 15,
                border: "1px dashed #000",
                fontFamily: "monospace",
              }}
            >
              <center>
                <strong>SMK-STORE PROJECT</strong>
                <p>=======================</p>
              </center>

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>
                    {item.name} x{item.qty}
                  </span>
                  <span>{formatRupiah(item.price * item.qty)}</span>
                </div>
              ))}

              <p>=======================</p>

              <strong
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>TOTAL</span>
                <span>{formatRupiah(totalPrice)}</span>
              </strong>

              <button
                className="checkout-btn"
                style={{ marginTop: 15 }}
                onClick={handleClose}
              >
                Done
              </button>
            </div>
          )}
        </div>

        {/* FOOTER */}
        {view === "cart" && cartItems.length > 0 && (
          <div className="cart-footer">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 10,
                fontWeight: "bold",
              }}
            >
              <span>Total</span>
              <span>{formatRupiah(totalPrice)}</span>
            </div>

            <button className="checkout-btn" onClick={() => setView("qr")}>
              Pay Now
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CartSidebar;
