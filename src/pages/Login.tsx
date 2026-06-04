import { useState } from 'react';
import api from '../config/ApiConfig'; // আপনার কনফিগারেশন পাথ

export default function Login() {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // আপনার ব্যাকএন্ড এন্ডপয়েন্ট অনুযায়ী '/login' কল করা হচ্ছে
            const res = await api.post('/login', { phone, password });
            
            // টোকেন সেভ করুন
            localStorage.setItem('token', res.data.token);
            alert('লগইন সফল হয়েছে!');
            window.location.href = '/dashboard'; 
        } catch (err) {
            console.error(err);
            alert('লগইন ব্যর্থ হয়েছে, সঠিক তথ্য দিন।');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="p-8 bg-white rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6">লগইন</h2>
                <input 
                    className="border p-2 mb-4 w-full rounded" 
                    type="text" 
                    placeholder="ফোন নম্বর" 
                    onChange={(e) => setPhone(e.target.value)} 
                    required 
                />
                <input 
                    className="border p-2 mb-6 w-full rounded" 
                    type="password" 
                    placeholder="পাসওয়ার্ড" 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button 
                    className="bg-blue-600 text-white p-2 w-full rounded hover:bg-blue-700" 
                    type="submit" 
                    disabled={loading}
                >
                    {loading ? 'প্রসেস হচ্ছে...' : 'লগইন করুন'}
                </button>
            </form>
        </div>
    );
}