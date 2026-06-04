import { useState } from 'react';
import api from '../config/ApiConfig'; 

export default function Login() {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await api.post('/login', { phone, password });
            localStorage.setItem('token', res.data.token);
            alert('লগইন সফল!');
            window.location.href = '/dashboard';
        } catch (err) {
            console.error(err);
            alert('লগইন ব্যর্থ হয়েছে!');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <form onSubmit={handleLogin} className="card p-4 shadow">
                        <h2 className="mb-4">লগইন</h2>
                        <div className="mb-3">
                            <input 
                                className="form-control" 
                                type="text" 
                                placeholder="ফোন নম্বর" 
                                onChange={(e) => setPhone(e.target.value)} 
                            />
                        </div>
                        <div className="mb-3">
                            <input 
                                className="form-control" 
                                type="password" 
                                placeholder="পাসওয়ার্ড" 
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        </div>
                        <button className="btn btn-primary w-100" type="submit">লগইন করুন</button>
                    </form>
                </div>
            </div>
        </div>
    );
}