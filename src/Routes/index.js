import { Routes, Route } from 'react-router-dom';
import ProductDetail from '../Components/ProductDetail';
import TestProductLink from '../Components/TestProductLink';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<TestProductLink />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            {/* Add other routes here */}
        </Routes>
    );
};

export default AppRoutes; 