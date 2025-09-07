const { User, Supplier, Product, StockTransaction } = require("../Models/MainSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require('./Nodemailer');

const authentication = async (req, res, next) => {
  try {
    const token = req.cookies.authToken || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(404).json({ success: false, message: "Inavlid Token" });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(" Registration error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
}
const UserRegistration = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Validate fields
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ success: false, message: "Please fill all the fields" });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }

    // Check existing username
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Username already exists" });
    }

    // Check existing email
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    await newUser.save();

    // Generate token
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET_TOKEN,
      { expiresIn: "7d" }
    );
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
    });

    console.log(" User registered:", req.body);
    // sending welcome email 

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: 'Welcome To EComm-Inventory-Site',
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome Email</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Outfit', sans-serif;
      background-color: #1a0033;
      color: #ffffff;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      padding: 30px;
      background: linear-gradient(145deg, #3b0a6e, #1a0033);
      border-radius: 15px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.3);
      text-align: center;
    }
    h1 {
      color: #ffffff;
      font-size: 28px;
      margin-bottom: 10px;
    }
    p {
      font-size: 16px;
      line-height: 1.6;
      color: #e0e0e0;
      margin-bottom: 20px;
    }
    .email {
      background-color: rgba(255,255,255,0.1);
      padding: 10px 20px;
      border-radius: 8px;
      display: inline-block;
      margin-bottom: 20px;
      font-weight: 600;
      color: #ffffff;
    }
    .btn {
      display: inline-block;
      background-color: #8c2eff;
      color: #ffffff;
      text-decoration: none;
      padding: 12px 25px;
      border-radius: 10px;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    .btn:hover {
      background-color: #6f00cc;
    }
    .footer {
      margin-top: 30px;
      font-size: 12px;
      color: #bbbbbb;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome to E-comm Inventory!</h1>
    <p>Thank you for registering with us. We're excited to have you onboard.</p>
    <p>Your registered email is:</p>
    <div class="email">${email}</div>
    <p>Start managing your inventory efficiently and effortlessly.</p>
    <div class="footer">
      &copy; 2025 E-comm Inventory. All rights reserved.
    </div>
  </div>
</body>
</html>`
    };
    await transporter.sendMail(mailOptions);

  } catch (error) {
    console.error(" Registration error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
const UserLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).json({ success: false, message: "User Not Found" });

  }
  const MatchPassword = await bcrypt.compare(password, user.password);
  if (!MatchPassword) {
    return res.status(404).json({ success: false, message: "Invalid Password" });
  }
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET_TOKEN,
    { expiresIn: "7d" }
  );
  res.cookie("authToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.status(200).json({
    success: true,
    message: "Login Successful",
    token,               // <--- now React gets it
    user: { id: user._id, email: user.email, name: user.name }
  });
};

const SupplierRegister = async (req, res) => {
  try {
    const { name, company, email, phone, type } = req.body;
    const supplier = await Supplier.findOne({ name: name })

    if (type === "delete") {
      if (!supplier) {
        return res.status(404).json({ success: false, message: "Supplier not found" });
      }
      await Supplier.deleteOne({ name: name });
      return res.status(200).json({ success: true, message: "Supplier deleted successfully" });
    }
    if (supplier) {
      return res.status(400).json({ success: false, message: "supplier name already exists" });
    }
    const existingEmail = await Supplier.findOne({ email: email })
    if (existingEmail) {
      return res.status(400).json({ success: false, message: "supplier email already exists" });
    }
    const newsupplier = new Supplier({
      name, company, email, phone
    })
    await newsupplier.save();
    res.status(200).json({ success: true, message: "Supplier added Successfully" })
    console.log("Supplier added Successfully", req.body);

  } catch (error) {
    console.error(" Registration error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const AddProduct = async (req, res) => {
  try {
    const { name, category, costprice, price, quantity, supplier, action } = req.body;



    if (!name || !category || !costprice || !price || !quantity || !supplier) {
      return res.status(404).json({ success: false, message: "Please Fill the all required Fields" });
    }
    // 🗑️ If user selects delete action
    if (action === "delete") {
      const deletedProduct = await Product.findOneAndDelete({ name, supplier });
      if (!deletedProduct) {
        return res.status(404).json({
          success: false,
          message: "Product not found for this supplier",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Product deleted successfully",
        deletedProduct,
      });
    }

    const existingProduct = await Product.findOne({ name: name, supplier: supplier });

    if (existingProduct) {
      existingProduct.costprice = costprice;
      existingProduct.price = price;
      existingProduct.quantity += Number(quantity);
      await existingProduct.save();
      res.status(200).json({ success: true, message: "Product updated successfully ", supplier });
      console.log("Product updated successfully with supplier", supplier);
    } else {
      const newProduct = new Product({
        name, category, costprice, price, quantity, supplier: supplier
      })
      await newProduct.save();
      res.status(200).json({ success: true, message: "Product added successfully" });
      console.log("Product added successfully", req.body);
    }

  } catch (error) {
    console.error(" Registration error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const AddStock = async (req, res) => {
  try {
    const { product, quantity, type } = req.body;
    const qty = Number(quantity);
    if (isNaN(qty) || qty <= 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a positive number"
      });
    }


    const existingProduct = await Product.findById(product);

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not available. Please add the product first."
      });
    }

    // 2️⃣ Update product quantity
    if (type === "IN") {
      existingProduct.quantity += qty;  // update quantity in Product schema
    } else if (type === "OUT") {
      existingProduct.quantity -= qty;
      if (existingProduct.quantity < 0) existingProduct.quantity = 0;
    }

    await existingProduct.save();

    // 3️⃣ Log stock transaction (always required)
    const newTransaction = await StockTransaction.create({
      product,
      quantity: qty,
      type
    });

    return res.status(201).json({
      success: true,
      message: "Stock updated successfully",
      product: existingProduct,
      transaction: newTransaction
    });

  } catch (error) {
    console.error("Stock error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
const AllSupliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.status(201).json({ success: true, message: "All Suppliers ", data: suppliers });
    console.log("All Suppliers", suppliers);
  } catch (error) {
    console.error("Stock error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
const AllProducts = async (req, res) => {
  try {
    const Products = await Product.find();
    res.status(201).json({ success: true, message: "All Products ", data: Products });
    console.log("All Products", Products);
  } catch (error) {
    console.error("Stock error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const AllStockTransitions = async (req, res) => {
  try {
    const StockTransactions = await StockTransaction.find();
    res.status(201).json({ success: true, message: "All Suppliers ", data: StockTransactions });
    console.log("All Suppliers", StockTransactions);
  } catch (error) {
    console.error("Stock error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
}
const TotalSuppliers = async (req, res) => {
  try {
    const TotalSuppliers = await Supplier.countDocuments();
    res.status(200).json({ success: true, TotalSuppliers: TotalSuppliers });
  } catch (error) {
    console.error("Server error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
const TotalProducts = async (req, res) => {
  try {
    const TotalProducts = await Product.countDocuments();
    res.status(200).json({ success: true, TotalProducts: TotalProducts });
  } catch (error) {
    console.error("Server error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
const TotalStock = async (req, res) => {
  try {
    const TotalStock = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalstock: { $sum: "$quantity" }
        }
      }
    ]);
    res.status(200).json({
      success: true,
      TotalStock: TotalStock[0]?.totalstock || 0
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }

};
const TotalStockTransitions = async (req,res) =>{
  try {
    const TotalStockTransitions = await StockTransaction.countDocuments();
    res.status(200).json({ success: true, TotalStockTransitions: TotalStockTransitions });
  } catch (error) {
    console.error("Server error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
}
module.exports = { UserRegistration, UserLogin, SupplierRegister, AddProduct, AddStock, AllSupliers, AllProducts, AllStockTransitions, authentication, TotalSuppliers, TotalProducts,TotalStock ,TotalStockTransitions};
