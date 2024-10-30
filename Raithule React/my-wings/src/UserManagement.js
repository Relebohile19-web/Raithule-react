import React, { useState, useEffect } from "react";

const UserManagement = ({ handleLogout }) => {
  const [view, setView] = useState("product"); // Toggle between product and user views

  // Product Management State
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: ""
  });
  const [editingProductIndex, setEditingProductIndex] = useState(null);

  // User Management State
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: "", password: "" });
  const [editingUserIndex, setEditingUserIndex] = useState(null);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    console.log("Loaded products from localStorage:", savedProducts);
    console.log("Loaded users from localStorage:", savedUsers);
    setProducts(savedProducts);
    setUsers(savedUsers);
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    console.log("Saving products to localStorage:", products);
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  // Save users to localStorage whenever they change
  useEffect(() => {
    console.log("Saving users to localStorage:", users);
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Handle input changes for product form
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Add or update product
  const addOrUpdateProduct = () => {
    if (editingProductIndex !== null) {
      const updatedProducts = products.map((product, index) =>
        index === editingProductIndex ? newProduct : product
      );
      setProducts(updatedProducts);
      setEditingProductIndex(null);
    } else {
      setProducts([...products, newProduct]);
    }
    setNewProduct({ name: "", description: "", price: "", quantity: "" });
  };

  // Delete product
  const deleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  // Edit product
  const editProduct = (index) => {
    setNewProduct(products[index]);
    setEditingProductIndex(index);
  };

  // Handle input changes for user form
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  // Add or update user
  const addOrUpdateUser = () => {
    if (editingUserIndex !== null) {
      const updatedUsers = users.map((user, index) =>
        index === editingUserIndex ? newUser : user
      );
      setUsers(updatedUsers);
      setEditingUserIndex(null);
    } else {
      setUsers([...users, newUser]);
    }
    setNewUser({ username: "", password: "" });
  };

  // Delete user
  const deleteUser = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  // Edit user
  const editUser = (index) => {
    setNewUser(users[index]);
    setEditingUserIndex(index);
  };

  return (
    <div className="container">
      {/* Navigation Bar */}
      <div className="nav-bar">
        <button onClick={() => setView("product")} className="nav-btn">
          Product Management
        </button>
        <button onClick={() => setView("user")} className="nav-btn">
          User Management
        </button>
        <button onClick={handleLogout} className="nav-btn">
          Logout
        </button>
      </div>

      {/* Conditional Rendering Based on View */}
      {view === "product" ? (
        <div>
          <h1>Product Management</h1>
          <form>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={handleProductChange}
            />
            <input
              type="text"
              name="description"
              placeholder="Product Description"
              value={newProduct.description}
              onChange={handleProductChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Product Price"
              value={newProduct.price}
              onChange={handleProductChange}
            />
            <input
              type="number"
              name="quantity"
              placeholder="Product Quantity"
              value={newProduct.quantity}
              onChange={handleProductChange}
            />
            <button type="button" onClick={addOrUpdateProduct}>
              Add/Update Product
            </button>
          </form>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <button onClick={() => editProduct(index)}>Edit</button>
                    <button onClick={() => deleteProduct(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <h1>User Management</h1>
          <form>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={newUser.username}
              onChange={handleUserChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={newUser.password}
              onChange={handleUserChange}
            />
            <button type="button" onClick={addOrUpdateUser}>
              Add/Update User
            </button>
          </form>
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.username}</td>
                  <td>{user.password}</td>
                  <td>
                    <button onClick={() => editUser(index)}>Edit</button>
                    <button onClick={() => deleteUser(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
