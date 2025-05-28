import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDetail.css';
import { useNavigate,useParams, Link } from 'react-router-dom';

const AdminDetail = () => {
    const { id } = useParams();
    console.log(id,"this is the id i got in ")
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    useEffect(() => {
        if (!token) {
            navigate("/")
        }
    }, [])

    useEffect(() => {
        const fetchAdminDetail = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/admin/${id}`);
                setAdmin(res.data);
            } catch (err) {
                console.error('Fetch error:', err);
                setError('Failed to load admin details');
            } finally {
                setLoading(false);
            }
        };
        fetchAdminDetail();
    }, [id]);

    if (loading) {
        return (
            <div className="admin-detail-container">
                <div className="admin-detail-skeleton">
                    <div className="skeleton-header">
                        <div className="skeleton-image skeleton"></div>
                        <div className="skeleton-title skeleton"></div>
                    </div>
                    <div className="skeleton-info">
                        <div className="skeleton-line skeleton"></div>
                        <div className="skeleton-line skeleton"></div>
                        <div className="skeleton-line skeleton"></div>
                        <div className="skeleton-line skeleton"></div>
                        <div className="skeleton-line skeleton"></div>
                        <div className="skeleton-paragraph skeleton"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !admin) {
        return (
            <div className="admin-detail-error">
                <h2>{error || 'Admin not found'}</h2>
                <Link to="/admins" className="back-button">
                    Back to Admin List
                </Link>
            </div>
        );
    }

    return (
        <div className="admin-detail-container">
            <Link to="/coaches" className="back-button">
                &larr; Back to Admin List
            </Link>
            <div className="admin-detail-card">
                <div className="admin-detail-header">
                    <div className="admin-detail-image-container">
                        <img
                            src={admin.image || 'https://via.placeholder.com/400x300?text=No+Image'}
                            alt={admin.name}
                            className="admin-detail-image"
                        />
                    </div>
                    <div className="admin-detail-title">
                        <h1>{admin.name}</h1>
                        <p className="admin-detail-sport">{admin.sport}</p>
                    </div>
                </div>

                <div className="admin-detail-content">
                    <div className="admin-detail-section">
                        <h2>Contact Information</h2>
                        <p><span className="detail-label">Email:</span> {admin.gmail}</p>
                        <p><span className="detail-label">Phone:</span> {admin.phoneno}</p>
                    </div>

                    <div className="admin-detail-section">
                        <h2>Professional Information</h2>
                        <p><span className="detail-label">Speciality:</span> {admin.speciality}</p>
                        <p><span className="detail-label">Experience:</span> {admin.experience}</p>
                        <p><span className="detail-label">Certifications:</span></p>
                        <ul className="certification-list">
                            {admin.certifications.map((cert, index) => (
                                <li key={index}>{cert}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="admin-detail-section">
                        <h2>Biography</h2>
                        <p className="admin-bio">{admin.bio}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AdminDetail;