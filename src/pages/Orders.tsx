import React, { useEffect, useState } from "react";

import { toast } from "sonner";
import { mockOrders } from "../../public/demoData/data";

const STATUS_BADGES: Record<string, string> = {
  pending: "badge-yellow",
  confirmed: "badge-sage",
  delivered: "badge-green",
  cancelled: "badge-red",
};

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setOrders(mockOrders);
        toast.success("Orders loaded successfully");
      } catch (err) {
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1>My Orders 📋</h1>
        <p>Track all your produce orders</p>
      </div>

      <div className="card">
        {loading ? (
          <div className="loading-screen">
            <div className="spinner" style={{ width: 28, height: 28 }} />
          </div>
        ) : orders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <h3>No orders yet</h3>
            <p>Visit the marketplace to place your first order</p>
            {toast.info("No orders found")}
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Product</th>
                  <th>Vendor</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order, i) => (
                  <tr key={order.id || i}>
                    <td
                      style={{
                        fontFamily: "monospace",
                        fontSize: 12,
                        color: "var(--text-muted)",
                      }}
                    >
                      #{order.id.slice(-6)}
                    </td>

                    <td style={{ fontWeight: 500 }}>{order.produceId?.name}</td>

                    <td style={{ color: "var(--text-muted)", fontSize: 13 }}>
                      {order.vendorId?.farmName}
                    </td>

                    <td style={{ color: "var(--text-muted)", fontSize: 13 }}>
                      {new Date(order.orderDate).toLocaleDateString()}
                    </td>

                    <td>
                      <span
                        className={`badge ${
                          STATUS_BADGES[order.status] || "badge-sage"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
