import { Link } from 'react-router-dom';

const TestProductLink = () => {
    return (
        <div style={{ padding: '2rem' }}>
            <h2>Test Product Link</h2>
            <Link
                to="/product/1"
                style={{
                    display: 'inline-block',
                    padding: '1rem 2rem',
                    background: '#667eea',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    marginTop: '1rem'
                }}
            >
                View Product Details
            </Link>
        </div>
    );
};

export default TestProductLink; 