import Category from "../models/categorySchema.js";
import Product from "../models/productSchema.js"
import Admin from "../models/adminSchema.js"
import User from "../models/userSchema.js"
import { verifyPassword } from "../middleware/adminAuth.js";
import Order from "../models/orderSchema.js";


export async function adminLogin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "invalid email or password" });
    }

    //pass word checking
    let passwordValid;
    if (admin.password.startsWith('$2')) {
      passwordValid = await verifyPassword(password, admin.password);
    } else {
      // Password is plain text, compare directly
      passwordValid = password === admin.password;
    }

    if (!passwordValid) {
      return res.status(400).json({ message: "invalid email or password" });
    }

    req.session.admin = admin.email;
    await new Promise((resolve, reject) => {
      req.session.save((err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


//get all products
export async function getAllProducts(req, res) {
  try {
    const products = await Product.find().populate('category', 'name slug');
    return res.json(products);
  } catch (error) {
    console.error("Get Products Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch products."
    });
  }
}


//creating product
export async function createProduct(req, res) {
  try {
    const { name, price, category } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Name, price, and category are required."
      });
    }

    // Validate price is a number
    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be a valid positive number."
      });
    }

    //Create product
    const product = await Product.create({
      name: name.trim(),
      price: priceNum,
      category,
      image: req.file ? req.file.filename : null
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully.",
      data: product
    });

  } catch (error) {
    console.error("Create Product Error:", error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: error.message || "Validation error"
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create product."
    });
  }
}


//update product
export async function updateProduct(req, res) {
  try {
    const { name, price, category } = req.body;

    // Validate required fields
    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Name, price, and category are required."
      });
    }

    // Validate price is a number
    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be a positive numbeRr"
      });
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: name.trim(),
        price: priceNum,
        category,
        ...(req.file && { image: req.file.filename })
      },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      data: updated
    });
  } catch (error) {
    console.error("Update Product Error:", error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: error.message || "Validation error occurred."
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update product."
    });
  }
}


//delete product
export async function deleteProduct(req, res) {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.json({ message: "Product deleted" })
  } catch (error) {
    console.log(error);
  }
}


export async function getCategory(req, res) {
  const category = await Category.find()
  return res.status(200).json({ categorys: category })
}

//create category
export async function createCategory(req, res) {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category name is required."
      });
    }

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') //spcl char removal
      .replace(/\s+/g, '-') // space to -
      .replace(/-+/g, '-');

    const newCategory = await Category.create({ name: name.trim(), slug });
    return res.status(201).json({
      success: true,
      message: "Category created successfully.",
      added: newCategory
    });
  } catch (error) {
    console.error("Create Category Error:", error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Category name or slug already exists."
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create category."
    });
  }
}

//update category
export async function updateCategory(req, res) {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category name is required."
      });
    }

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name: name.trim(), slug },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category updated successfully.",
      updatedCategory
    });
  } catch (error) {
    console.error("Update Category Error:", error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Category name or slug already exists."
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update category."
    });
  }
}

//delete category
export async function deleteCategory(req, res) {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);

    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully."
    });
  } catch (error) {
    console.error("Delete Category Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete category."
    });
  }
}

//get all users
export async function getAllUsers(req, res) {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    console.log(error);
  }
}

//delete user
export async function deleteUser(req, res) {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.json({ message: "User deleted" })
  } catch (error) {
    console.log(error);
  }
}

//toggle user status
export async function toggleUserStatus(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isActive = !user.isActive;
    await user.save();

    res.json({ message: "User status updated", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

export async function checkSession(req, res) {
  if (req.session.admin) {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
}

// Get all ordersss
export async function getAllOrders(req, res) {
  try {
    const orders = await Order.find()
      .populate('items.productId', 'name price')
      .sort({ createdAt: -1 }); // Sort by newest first
    res.json(orders);
  } catch (error) {
    console.error("Get All Orders Error:", error);
    res.status(500).json({ message: error.message });
  }
}

export async function updateOrderStatus(req, res) {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(order);
  } catch (error) {
    console.error("Update Order Status Error:", error);
    res.status(500).json({ message: error.message });
  }
}

export async function deleteOrder(req, res) {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted" });
  } catch (error) {
    console.error("Delete Order Error:", error);
    res.status(500).json({ message: error.message });
  }
}