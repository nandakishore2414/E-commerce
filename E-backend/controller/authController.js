
import User from "../models/userSchema.js";
import * as adminHelper from "../middleware/adminAuth.js";
import Cart from "../models/cartSchema.js"
import Order from "../models/orderSchema.js";
import Product from "../models/productSchema.js";
import Category from "../models/categorySchema.js";

export async function register(req, res) {

  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exist = await User.findOne({ email });

    if (exist) return res.status(400).json({ message: "email already exist" });

    const hash = await adminHelper.hashPassword(password);
    const user = new User({ name, email, password: hash });
    await user.save();

    req.session.userId = user._id;
    req.session.role = user.role;

    res.status(201).json({ message: "registration success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function checkAuth(req, res) {
  if (req.session.userId) {
    return res.status(200).json({ message: "Authenticated", userId: req.session.userId });
  } else {
    return res.status(401).json({ message: "Not authenticated" });
  }
}

export async function userLogin(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "invalid email or password" });

    if (user.isActive === false) {
      return res.status(403).json({ message: "Account is inactive. Please contact admin." });
    }

    const passwordValidation = await adminHelper.verifyPassword(password, user.password);
    if (!passwordValidation)
      return res.status(400).json({ message: "invalid email or password" });

    req.session.user = user.email;
    req.session.userId = user._id;
    console.log(req.session);

    return res.json({
      message: "Login successful",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function logout(req, res) {
  req.session.destroy();
  res.json({ message: "Logged out successfully" });
}


//TO see products
export async function getProducts(req, res) {
  try {
    // Fetch products from the database
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getCategories(req, res) {
  try {
    const categories = await Category.find();
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function addToCart(req, res) {
  try {
    const productId = req.body.productId;
    const quantity = Number(req.body.quantity) || 1;

    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ mesage: "you have to login" })
    }
    let cart = await Cart.findOne({ userId })

    //if cart not created
    if (!cart) {
      cart = await Cart.create({ userId, items: [{ productId, quantity }] })
    }

    //if  product already exist
    const item = cart.items.find(i => i.productId.toString() === productId);

    if (item) {
      item.quantity += quantity
    } else {
      cart.items.push({ productId, quantity })
    }

    await cart.save()
    res.status(201).json({ message: "Added to cart" });

  } catch (error) {
    console.log(error)
  }
}

//get cart
export async function getCart(req, res) {
  try {
    const userId = req.session.userId;

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    res.json(cart || { items: [] });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//update 
export const updateQuantity = async (req, res) => {
  try {
    const productId = req.params.id;

    const quantity = Number(req.body.quantity)
    if (isNaN(quantity)) quantity = 1;

    const userId = req.session.userId;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.json({ message: "Cart not found" });

    const item = cart.items.find(i => i.productId.toString() === productId);

    if (!item) return res.json({ message: "Product not in cart" });

    item.quantity = quantity;
    await cart.save();

    res.json({ message: "Quantity updated", cart });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const removeFromCart = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.session.userId;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.json({ message: "Cart empty" });

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    res.json({ message: "Removed from cart", cart });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export async function createOrder(req, res) {
  try {
    const userId = req.session.userId;
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "cart is empty" })
    }

    // Filter and Map Items
    const validItems = cart.items.filter(item => item.productId);
    if (validItems.length === 0) {
      return res.status(400).json({ message: "No valid products in cart" });
    }

    const orderItems = validItems.map(item => ({
      productId: item.productId._id,
      quantity: item.quantity
    }));

    // Calculate Total
    const totalAmount = validItems.reduce((sum, item) => {
      const price = item.productId.price || 0;
      return sum + (price * item.quantity);
    }, 0);

    const newOrder = await Order.create({
      user: userId,
      items: orderItems,
      totalAmount: totalAmount,
    });

    await newOrder.save();

    // Clear cart
    await Cart.findOneAndUpdate({ userId }, { items: [], totalAmount: 0 });

    res.status(200).json({ message: "order success", details: newOrder });
  } catch (error) {
    console.log(error);
  }
}


export async function getUserOrders(req, res) {
  try {
    const userId = req.session.userId;
    const orders = await Order.find({ user: userId }).populate('items.productId')
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
  }
}

export async function cancelOrder(req, res) {
  try {
    const orderId = req.params.id;
    const userid = req.session.userId;
    const order = await Order.findOne({ _id: orderId, user: userid })
    if (!order) {
      return res.status(404).json({ message: "order not found" });
    }

    order.status = 'Cancelled';
    await order.save();

    res.status(200).json({ msg: 'Order cancelled successfully', order })
  } catch (error) {
    console.log(error);
  }
}

