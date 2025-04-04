import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

function Payment({ amount, onSuccess, onCancel, onError }) {
  return (
    <div>
      <PayPalButtons
        style={{ layout: "vertical", color: "blue", shape: "rect", label: "paypal" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: { value: amount }
            }]
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(details => {
            onSuccess(details);
          });
        }}
        onCancel={() => {
          onCancel();
        }}
        onError={(err) => {
          onError(err);
        }}
      />
    </div>
  );
}

export default Payment;

