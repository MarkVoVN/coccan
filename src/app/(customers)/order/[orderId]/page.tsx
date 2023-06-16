import React from "react";

function OrderDetailPage({ params }: { params: { orderId: string } }) {
  return <div>OrderDetailPage of order id: {params.orderId}</div>;
}

export default OrderDetailPage;
