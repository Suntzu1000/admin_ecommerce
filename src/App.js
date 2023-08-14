import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import MainLayout from "./components/MainLayout";
import Enquiries from "./pages/Enquiries";
import BlogList from "./pages/BlogList";
import BlogCatList from "./pages/BlogCatList";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import ColorList from "./pages/ColorList";
import BrandList from "./pages/BrandList";
import AddBrand from "./pages/AddBrand";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import CategoryList from "./pages/CategoryList";
import AddBlog from "./pages/AddBlog";
import AddBlogCat from "./pages/AddBlogCat";
import AddColor from "./pages/AddColor";
import AddCat from "./pages/AddCat";
import CouponList from "./pages/CouponList";
import AddCoupon from "./pages/AddCoupon";
import  ViewEnq  from "./pages/ViewEnq";
import ViewOrder from "./pages/ViewOrder";
import { OpenRoutes } from "./routing/OpenRoutes";
import { PrivateRoutes } from "./routing/PrivateRoutes";

function App() {
  return (
    <Router className="App">
      <Routes>
        <Route path="/" element={<OpenRoutes><Login /></OpenRoutes>} />
        <Route path="admin" element={<PrivateRoutes><MainLayout /></PrivateRoutes>}>
          <Route index element={<PrivateRoutes><Dashboard /></PrivateRoutes>} />
          <Route path="enquiries" element={<PrivateRoutes><Enquiries /></PrivateRoutes>} />
          <Route path="enquiries/:id" element={<PrivateRoutes><ViewEnq /></PrivateRoutes>} />
          <Route path="blog-list" element={<PrivateRoutes><BlogList /></PrivateRoutes>} />
          <Route path="coupon-list" element={<PrivateRoutes><CouponList /></PrivateRoutes>} />
          <Route path="coupon" element={<PrivateRoutes><AddCoupon /></PrivateRoutes>} />
          <Route path="coupon/:id" element={<PrivateRoutes><AddCoupon /></PrivateRoutes>} />
          <Route path="add-blog" element={<PrivateRoutes><AddBlog /></PrivateRoutes>} />
          <Route path="add-blog/:id" element={<PrivateRoutes><AddBlog /></PrivateRoutes>} />
          <Route path="blog-category-list" element={<PrivateRoutes><BlogCatList /></PrivateRoutes>} />
          <Route path="blog-category" element={<PrivateRoutes><AddBlogCat /></PrivateRoutes>} />
          <Route path="blog-category/:id" element={<PrivateRoutes><AddBlogCat /></PrivateRoutes>} />
          <Route path="orders" element={<PrivateRoutes><Orders /></PrivateRoutes>} />
          <Route path="order/:id" element={<PrivateRoutes><ViewOrder /></PrivateRoutes>} />
          <Route path="customers" element={<PrivateRoutes><Customers/></PrivateRoutes>} />
          <Route path="list-colors" element={<PrivateRoutes><ColorList /></PrivateRoutes>} />
          <Route path="color" element={<PrivateRoutes><AddColor /></PrivateRoutes>} />
          <Route path="color/:id" element={<PrivateRoutes><AddColor /></PrivateRoutes>} />
          <Route path="list-category" element={<PrivateRoutes><CategoryList /></PrivateRoutes>} />
          <Route path="category" element={<PrivateRoutes><AddCat /></PrivateRoutes>} />
          <Route path="category/:id" element={<PrivateRoutes><AddCat /></PrivateRoutes>} />
          <Route path="list-brand" element={<PrivateRoutes><BrandList /></PrivateRoutes>} />
          <Route path="brand" element={<PrivateRoutes><AddBrand /></PrivateRoutes>} />
          <Route path="brand/:id" element={<PrivateRoutes><AddBrand /></PrivateRoutes>} />
          <Route path="product-list" element={<PrivateRoutes><ProductList /></PrivateRoutes>} />
          <Route path="product" element={<PrivateRoutes><AddProduct /></PrivateRoutes>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
