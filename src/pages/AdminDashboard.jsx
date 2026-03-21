import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AdminProductModal from '../components/AdminProductModal';
import { createProduct, updateProduct } from '../api/adminApi';

import {
  Package, ShoppingCart, Users, DollarSign, Truck, CheckCircle,
  XCircle, Clock, MessageCircle, AlertTriangle, Eye, ChevronDown,
  ChevronUp, RefreshCw, Trash2, RotateCcw, Plus, Edit2, Box
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  getDashboard, getAdminOrders, updateOrderStatus,
  getEnquiries, updateEnquiryStatus, deleteEnquiry,
  getPendingCancelRequests, respondToCancelRequest,
  getAdminProducts, deleteProduct, restoreProduct,
  getAdminUsers
} from '../api/adminApi';
import { getImageUrl } from '../api/apiClient';
import styles from './PagesStyle/AdminDashboard.module.css';

const AdminDashboard = () => {
  const { isAdmin, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [dashboard, setDashboard] = useState(null);
  const [orders, setOrders] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [cancelRequests, setCancelRequests] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [expandedEnquiry, setExpandedEnquiry] = useState(null);
  const [expandedCancel, setExpandedCancel] = useState(null);
  const [statusLoading, setStatusLoading] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelResponse, setCancelResponse] = useState('');
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productSaving, setProductSaving] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate('/login?message=Admin access required');
      return;
    }
    loadDashboard();
  }, [isAuthenticated, isAdmin]);

  const loadDashboard = async () => {
    setLoading(true);
    try {
      const [dashRes, ordRes, enqRes, canRes] = await Promise.all([
        getDashboard().catch(() => ({ data: null })),
        getAdminOrders().catch(() => ({ data: [] })),
        getEnquiries().catch(() => ({ data: [] })),
        getPendingCancelRequests().catch(() => ({ data: [] })),
      ]);
      if (dashRes?.data) setDashboard(dashRes.data);
      if (ordRes?.data) setOrders(ordRes.data);
      if (enqRes?.data) setEnquiries(enqRes.data);
      if (canRes?.data) setCancelRequests(canRes.data);
    } catch (err) {
      console.error('Dashboard load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = async () => {
    try {
      const res = await getAdminProducts();
      if (res?.data) setProducts(res.data);
    } catch (err) { console.error(err); }
  };

  const loadUsers = async () => {
    try {
      const res = await getAdminUsers();
      if (res?.data) setUsers(res.data);
    } catch (err) { console.error(err); }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'products' && products.length === 0) loadProducts();
    if (tab === 'users' && users.length === 0) loadUsers();
  };

  const handleUpdateOrderStatus = async (orderId, status, reason) => {
    setStatusLoading(orderId);
    try {
      const data = { status };
      if (reason) data.reason = reason;
      await updateOrderStatus(orderId, data);
      await loadDashboard();
      setCancelReason('');
      alert(`Order #${orderId} status updated to ${status}`);
    } catch (err) {
      alert(err.message || 'Failed to update status');
    } finally {
      setStatusLoading(null);
    }
  };

  const handleEnquiryStatus = async (id, status, adminNotes) => {
    try {
      await updateEnquiryStatus(id, { status, adminNotes: adminNotes || '' });
      const res = await getEnquiries();
      if (res?.data) setEnquiries(res.data);
    } catch (err) { alert(err.message || 'Failed'); }
  };

  const handleDeleteEnquiry = async (id) => {
    if (!window.confirm('Delete this enquiry?')) return;
    try {
      await deleteEnquiry(id);
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
    } catch (err) { alert(err.message || 'Failed'); }
  };

  const handleCancelResponse = async (id, action) => {
    try {
      await respondToCancelRequest(id, {
        action,
        adminResponse: cancelResponse || (action === 'APPROVE' ? 'Approved' : 'Declined'),
      });
      await loadDashboard();
      setCancelResponse('');
      alert(`Cancel request ${action === 'APPROVE' ? 'approved' : 'declined'}`);
    } catch (err) { alert(err.message || 'Failed'); }
  };

    const handleDeleteProduct = async (id) => {
        if (!window.confirm('Deactivate this product?')) return;
        try {
        await deleteProduct(id);
        loadProducts();
        } catch (err) { alert(err.message || 'Failed'); }
    };

    const handleRestoreProduct = async (id) => {
        try {
        await restoreProduct(id);
        loadProducts();
        } catch (err) { alert(err.message || 'Failed'); }
    };

    const formatDate = (d) => {
        if (!d) return '';
        return new Date(d).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
        });
    };

    const handleAddProduct = () => {
    setEditingProduct(null);
    setShowProductModal(true);
    };

    const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowProductModal(true);
    };

    const handleSaveProduct = async (formData) => {
    setProductSaving(true);
    try {
        if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
        alert('Product updated successfully!');
        } else {
        await createProduct(formData);
        alert('Product added successfully!');
        }
        setShowProductModal(false);
        setEditingProduct(null);
        loadProducts();
        loadDashboard();
    } catch (err) {
        alert(err.message || 'Failed to save product');
    } finally {
        setProductSaving(false);
    }
    };

  const getStatusColor = (status) => {
    const c = { PENDING: '#f0ad4e', CONFIRMED: '#4a7c59', SHIPPED: '#2196f3', DELIVERED: '#28a745', CANCEL_REQUESTED: '#ff9800', CANCELLED: '#dc3545', NEW: '#2196f3', READ: '#666', REPLIED: '#4a7c59', CLOSED: '#999', APPROVED: '#28a745', DECLINED: '#dc3545' };
    return c[status] || '#666';
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <RefreshCw size={32} className={styles.spin} />
        <p>Loading Admin Dashboard...</p>
      </div>
    );
  }

  return (
    <div className={styles.adminPage}>
      <div className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>⚙️ Admin Panel</h2>
        <nav className={styles.sidebarNav}>
          {[
            { key: 'dashboard', icon: <Box size={18} />, label: 'Dashboard' },
            { key: 'orders', icon: <ShoppingCart size={18} />, label: 'Orders' },
            { key: 'enquiries', icon: <MessageCircle size={18} />, label: 'Enquiries' },
            { key: 'cancellations', icon: <AlertTriangle size={18} />, label: 'Cancel Requests' },
            { key: 'products', icon: <Package size={18} />, label: 'Products' },
            { key: 'users', icon: <Users size={18} />, label: 'Users' },
          ].map((item) => (
            <button
              key={item.key}
              className={`${styles.navItem} ${activeTab === item.key ? styles.active : ''}`}
              onClick={() => handleTabChange(item.key)}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
        <button className={styles.backBtn} onClick={() => navigate('/')}>← Back to Site</button>
      </div>

      <div className={styles.mainContent}>
        {/* ═══════ DASHBOARD TAB ═══════ */}
        {activeTab === 'dashboard' && dashboard && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className={styles.pageTitle}>📊 Dashboard Overview</h1>
            <div className={styles.kpiGrid}>
              {[
                { label: 'Total Products', value: dashboard.totalProducts, icon: <Package size={24} />, color: '#4a7c59' },
                { label: 'Total Orders', value: dashboard.totalOrders, icon: <ShoppingCart size={24} />, color: '#2196f3' },
                { label: 'Total Revenue', value: `₹${dashboard.totalRevenue?.toLocaleString() || 0}`, icon: <DollarSign size={24} />, color: '#c49a3c' },
                { label: 'Total Users', value: dashboard.totalUsers, icon: <Users size={24} />, color: '#9c27b0' },
                { label: 'Pending', value: dashboard.pendingOrders, icon: <Clock size={24} />, color: '#f0ad4e' },
                { label: 'Confirmed', value: dashboard.confirmedOrders, icon: <CheckCircle size={24} />, color: '#4a7c59' },
                { label: 'Shipped', value: dashboard.shippedOrders, icon: <Truck size={24} />, color: '#2196f3' },
                { label: 'Delivered', value: dashboard.deliveredOrders, icon: <CheckCircle size={24} />, color: '#28a745' },
                { label: 'Cancelled', value: dashboard.cancelledOrders, icon: <XCircle size={24} />, color: '#dc3545' },
                { label: 'Cancel Requests', value: dashboard.pendingCancelRequests, icon: <AlertTriangle size={24} />, color: '#ff9800' },
                { label: 'COD Revenue', value: `₹${dashboard.codRevenue?.toLocaleString() || 0}`, icon: <DollarSign size={24} />, color: '#795548' },
                { label: 'Online Revenue', value: `₹${dashboard.onlineRevenue?.toLocaleString() || 0}`, icon: <DollarSign size={24} />, color: '#00bcd4' },
              ].map((kpi, i) => (
                <div key={i} className={styles.kpiCard} style={{ borderTopColor: kpi.color }}>
                  <div className={styles.kpiIcon} style={{ color: kpi.color }}>{kpi.icon}</div>
                  <div className={styles.kpiValue}>{kpi.value}</div>
                  <div className={styles.kpiLabel}>{kpi.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ═══════ ORDERS TAB ═══════ */}
        {activeTab === 'orders' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className={styles.tabHeader}>
              <h1 className={styles.pageTitle}>📦 Order Management</h1>
              <button className={styles.refreshBtn} onClick={loadDashboard}><RefreshCw size={16} /> Refresh</button>
            </div>
            {orders.length === 0 ? (
              <p className={styles.emptyText}>No orders yet</p>
            ) : (
              <div className={styles.tableContainer}>
                {orders.map((order) => (
                  <div key={order.id} className={styles.orderRow}>
                    <div className={styles.orderRowHeader} onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}>
                      <div className={styles.orderBasic}>
                        <strong>#{order.id}</strong>
                        <span>{order.userFullName || `${order.firstName} ${order.lastName}`}</span>
                        <span>₹{order.totalAmount?.toFixed(2)}</span>
                        <span style={{ color: getStatusColor(order.orderStatus) }} className={styles.statusBadge}>{order.orderStatus}</span>
                        <span className={styles.payBadge}>{order.paymentType} • {order.paymentStatus}</span>
                        <span className={styles.dateText}>{formatDate(order.orderDate)}</span>
                      </div>
                      {expandedOrder === order.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>

                    {expandedOrder === order.id && (
                      <div className={styles.orderExpanded}>
                        <div className={styles.orderDetails}>
                          <div className={styles.detailSection}>
                            <h4>📍 Address</h4>
                            <p>{order.streetAddress}, {order.city}</p>
                            <p>{order.district}, {order.state} - {order.pincode}</p>
                            <p>📞 {order.phone}</p>
                          </div>
                          <div className={styles.detailSection}>
                            <h4>🛒 Items</h4>
                            {order.items?.map((item) => (
                              <p key={item.id}>{item.productName} ({item.productWeight}) × {item.quantity} = ₹{item.subtotal?.toFixed(2)}</p>
                            ))}
                            <p className={styles.totalLine}><strong>Total: ₹{order.totalAmount?.toFixed(2)}</strong></p>
                          </div>
                        </div>

                        <div className={styles.statusActions}>
                          <h4>Update Status:</h4>
                          <div className={styles.actionBtns}>
                            {order.orderStatus === 'PENDING' && (
                              <button className={styles.confirmBtn} disabled={statusLoading === order.id} onClick={() => handleUpdateOrderStatus(order.id, 'CONFIRMED')}>
                                ✅ Confirm
                              </button>
                            )}
                            {order.orderStatus === 'CONFIRMED' && (
                              <button className={styles.shipBtn} disabled={statusLoading === order.id} onClick={() => handleUpdateOrderStatus(order.id, 'SHIPPED')}>
                                🚚 Ship
                              </button>
                            )}
                            {order.orderStatus === 'SHIPPED' && (
                              <button className={styles.deliverBtn} disabled={statusLoading === order.id} onClick={() => handleUpdateOrderStatus(order.id, 'DELIVERED')}>
                                📦 Delivered
                              </button>
                            )}
                            {['PENDING', 'CONFIRMED'].includes(order.orderStatus) && (
                              <div className={styles.cancelSection}>
                                <input
                                  type="text"
                                  placeholder="Reason for cancellation..."
                                  value={cancelReason}
                                  onChange={(e) => setCancelReason(e.target.value)}
                                  className={styles.cancelInput}
                                />
                                <button
                                  className={styles.cancelOrderBtn}
                                  disabled={statusLoading === order.id || !cancelReason}
                                  onClick={() => handleUpdateOrderStatus(order.id, 'CANCELLED', cancelReason)}
                                >
                                  ❌ Cancel
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* ═══════ ENQUIRIES TAB ═══════ */}
        {activeTab === 'enquiries' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className={styles.pageTitle}>📬 Customer Enquiries</h1>
            {enquiries.length === 0 ? (
              <p className={styles.emptyText}>No enquiries</p>
            ) : (
              enquiries.map((enq) => (
                <div key={enq.id} className={styles.enquiryCard}>
                  <div className={styles.enquiryHeader} onClick={() => setExpandedEnquiry(expandedEnquiry === enq.id ? null : enq.id)}>
                    <div>
                      <span className={styles.statusDot} style={{ background: getStatusColor(enq.status) }}></span>
                      <strong>{enq.subject}</strong>
                      <span className={styles.enquiryFrom}> — {enq.name} • 📞 {enq.phone}</span>
                    </div>
                    <div className={styles.enquiryMeta}>
                      <span style={{ color: getStatusColor(enq.status) }}>{enq.status}</span>
                      <span>{formatDate(enq.createdAt)}</span>
                    </div>
                  </div>

                  {expandedEnquiry === enq.id && (
                    <div className={styles.enquiryBody}>
                      <p className={styles.enquiryMsg}>{enq.message}</p>
                      {enq.email && <p>📧 {enq.email}</p>}
                      {enq.adminNotes && <p className={styles.adminNote}>📝 Admin Notes: {enq.adminNotes}</p>}
                      <div className={styles.enquiryActions}>
                        {enq.status === 'NEW' && (
                          <button onClick={() => handleEnquiryStatus(enq.id, 'READ')}>👁️ Mark Read</button>
                        )}
                        {['NEW', 'READ'].includes(enq.status) && (
                          <button onClick={() => handleEnquiryStatus(enq.id, 'REPLIED', 'Contacted customer')}>✅ Mark Replied</button>
                        )}
                        {enq.status !== 'CLOSED' && (
                          <button onClick={() => handleEnquiryStatus(enq.id, 'CLOSED')}>🔒 Close</button>
                        )}
                        <button className={styles.deleteSmBtn} onClick={() => handleDeleteEnquiry(enq.id)}>🗑️ Delete</button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </motion.div>
        )}

        {/* ═══════ CANCELLATIONS TAB ═══════ */}
        {activeTab === 'cancellations' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className={styles.pageTitle}>🔴 Cancel Requests</h1>
            {cancelRequests.length === 0 ? (
              <p className={styles.emptyText}>No pending cancel requests</p>
            ) : (
              cancelRequests.map((cr) => (
                <div key={cr.id} className={styles.cancelCard}>
                  <div className={styles.cancelHeader} onClick={() => setExpandedCancel(expandedCancel === cr.id ? null : cr.id)}>
                    <div>
                      <strong>Order #{cr.orderId}</strong>
                      <span> — {cr.userFullName} • 📞 {cr.userPhone}</span>
                    </div>
                    <div className={styles.enquiryMeta}>
                      <span style={{ color: getStatusColor(cr.status) }}>{cr.status}</span>
                      <span>{formatDate(cr.requestedAt)}</span>
                    </div>
                  </div>

                  {expandedCancel === cr.id && (
                    <div className={styles.cancelBody}>
                      <div className={styles.cancelReason}>
                        <h4>Customer Reason:</h4>
                        <p>{cr.reason}</p>
                      </div>
                      {cr.order && (
                        <div className={styles.cancelOrderInfo}>
                          <h4>Order Details:</h4>
                          {cr.order.items?.map((item) => (
                            <p key={item.id}>{item.productName} × {item.quantity} = ₹{item.subtotal?.toFixed(2)}</p>
                          ))}
                          <p><strong>Total: ₹{cr.order.totalAmount?.toFixed(2)}</strong></p>
                          <p>Payment: {cr.order.paymentType} ({cr.order.paymentStatus})</p>
                        </div>
                      )}
                      {cr.status === 'PENDING' && (
                        <div className={styles.respondSection}>
                          <input
                            type="text"
                            placeholder="Admin response message..."
                            value={cancelResponse}
                            onChange={(e) => setCancelResponse(e.target.value)}
                            className={styles.cancelInput}
                          />
                          <div className={styles.respondBtns}>
                            <button className={styles.approveBtn} onClick={() => handleCancelResponse(cr.id, 'APPROVE')}>
                              ✅ Approve Cancellation
                            </button>
                            <button className={styles.declineBtn} onClick={() => handleCancelResponse(cr.id, 'DECLINE')}>
                              ❌ Decline
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </motion.div>
        )}

        {/* ═══════ PRODUCTS TAB ═══════ */}
                {/* ═══════ PRODUCTS TAB ═══════ */}
        {activeTab === 'products' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className={styles.tabHeader}>
              <h1 className={styles.pageTitle}>🏷️ Product Management</h1>
              <div className={styles.tabActions}>
                <button className={styles.addProductBtn} onClick={handleAddProduct}>
                  <Plus size={16} /> Add Product
                </button>
                <button className={styles.refreshBtn} onClick={loadProducts}>
                  <RefreshCw size={16} /> Refresh
                </button>
              </div>
            </div>
            {products.length === 0 ? (
              <div className={styles.emptyProducts}>
                <Package size={48} className={styles.emptyIcon} />
                <p className={styles.emptyText}>No products yet</p>
                <button className={styles.addProductBtn} onClick={handleAddProduct}>
                  <Plus size={16} /> Add Your First Product
                </button>
              </div>
            ) : (
              <div className={styles.productTable}>
                <div className={styles.productTableHeader}>
                  <span>Image</span>
                  <span>Name</span>
                  <span>Category</span>
                  <span>Price</span>
                  <span>Stock</span>
                  <span>Status</span>
                  <span>Actions</span>
                </div>
                {products.map((p) => (
                  <div
                    key={p.id}
                    className={`${styles.productRow} ${
                      !p.active ? styles.inactive : ''
                    }`}
                  >
                    <img
                      src={getImageUrl(p.imageUrl)}
                      alt={p.name}
                      className={styles.prodImg}
                    />
                    <span className={styles.prodName}>
                      {p.name} <small>({p.weight})</small>
                      {p.badge && (
                        <span className={styles.prodBadge}>{p.badge}</span>
                      )}
                    </span>
                    <span>{p.category}</span>
                    <span>₹{p.price}</span>
                    <span
                      className={
                        p.stock === 0
                          ? styles.outStock
                          : p.stock <= 5
                          ? styles.lowStock
                          : ''
                      }
                    >
                      {p.stock}
                    </span>
                    <span>{p.active ? '✅ Active' : '❌ Inactive'}</span>
                    <div className={styles.prodActions}>
                      <button
                        className={styles.editSmBtn}
                        onClick={() => handleEditProduct(p)}
                        title="Edit product"
                      >
                        <Edit2 size={14} />
                      </button>
                      {p.active ? (
                        <button
                          className={styles.deleteSmBtn}
                          onClick={() => handleDeleteProduct(p.id)}
                          title="Deactivate product"
                        >
                          <Trash2 size={14} />
                        </button>
                      ) : (
                        <button
                          className={styles.restoreBtn}
                          onClick={() => handleRestoreProduct(p.id)}
                          title="Restore product"
                        >
                          <RotateCcw size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Product Add/Edit Modal */}
            <AdminProductModal
              isOpen={showProductModal}
              onClose={() => {
                setShowProductModal(false);
                setEditingProduct(null);
              }}
              onSave={handleSaveProduct}
              product={editingProduct}
              loading={productSaving}
            />
          </motion.div>
        )}

        {/* ═══════ USERS TAB ═══════ */}
        {activeTab === 'users' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className={styles.pageTitle}>👥 Registered Users</h1>
            {users.length === 0 ? (
              <p className={styles.emptyText}>No users</p>
            ) : (
              <div className={styles.userTable}>
                <div className={styles.userTableHeader}>
                  <span>ID</span><span>Name</span><span>Email</span><span>Phone</span><span>Joined</span>
                </div>
                {users.map((u) => (
                  <div key={u.id} className={styles.userRow}>
                    <span>#{u.id}</span>
                    <span className={styles.userName}>{u.fullName}</span>
                    <span>{u.email}</span>
                    <span>{u.phone}</span>
                    <span>{formatDate(u.createdAt)}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;