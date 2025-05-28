import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AdminList.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminList = () => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    useEffect(() => {
        if (!token) {
            navigate("/")
            toast.success("Already logged in");
        }
    }, [])
    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/admin/all');
                setAdmins(res.data);
                setError(null);
            } catch (err) {
                console.error('Fetch error:', err);
                setError('Failed to load admin data');
            } finally {
                setLoading(false);
            }
        };
        fetchAdmins();
    }, []);
    if (loading) {
        return (
            <div className="admin-list-container">
                <h1 className="admin-list-title skeleton-text"></h1>
                <div className="admin-cards-grid">
                    {[...Array(8)].map((_, index) => (
                        <div className="admin-card skeleton-card" key={`skeleton-${index}`}>
                            <div className="admin-card-image-container skeleton-image"></div>
                            <div className="admin-card-content">
                                <div className="skeleton-text skeleton-title"></div>
                                <div className="skeleton-text"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <p className="error-message">{error}</p>
            </div>
        );
    }

    return (
        <div className="admin-list-container">
            <h1 className="admin-list-title">Available Coaches</h1>
            <div className="admin-cards-grid">
                {admins.length > 0 ? (
                    admins.map((admin) => (
                        <Link
                            to={`/coaches/${admin._id}`}
                            className="admin-card-link"
                            key={admin._id}
                        >
                            <div className="admin-card">
                                <div className="admin-card-image-container">
                                    <img
                                        className="admin-card-image"
                                        src={admin.image || 'https://via.placeholder.com/300x200?text=No+Image'}
                                        alt={admin.name}
                                    />
                                </div>
                                <div className="admin-card-content">
                                    <h2 className="admin-name">{admin.name}</h2>
                                    <p className="admin-phone">
                                        <span className="detail-label">Phone:</span> {admin.phoneno}
                                    </p>
                                    <div className="view-details">View Details</div>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>There are no coaches.</p>
                )}
            </div>
        </div>
    );
};

export default AdminList;