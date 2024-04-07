import  { useState } from 'react';
import logo from '../../public/logo.png'
import axios from "axios";
import {useDispatch} from "react-redux";
import {setUser} from "../redux/slices/authSlice.js";
import {BASE_URL} from "../utils/config.js";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault(); // prevent form submission
        if (validateForm()) {
            try {
                const response = await axios.post(`${BASE_URL}/login`, {
                    username,
                    password,
                });
                // Assuming the API response contains a token
                if(response.data.token) {
                    const token = response.data.token;
                    // Store the token in browser storage
                    localStorage.setItem('token', token);
                    console.log('token:', token);
                    // Dispatch the setUser action with the token
                    dispatch(setUser({token}));
                    navigate('/dashboard')
                }
            } catch (error) {
                console.error('Login error:', error);
            }
        }
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const validateForm = () => {
        return username.length > 0 && password.length > 0;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <img src={logo} className="mx-auto h-[50px] w-[144px]" alt="ccript" />
                </div>
                <form className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm flex flex-col gap-4">
                        <div>
                            <label htmlFor="username" className="">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                className="appearance-none relative block w-full px-3 py-2 border-b-[1px] border-gray-600 placeholder-gray-500 text-gray-900 rounded-none focus:outline-none focus:border-b-[var(--green-theme)] focus:border-b-2 focus:z-10 sm:text-sm focus:border-2 border-green-600 border-opacity-40 "
                                placeholder="Enter Username"
                                value={username}
                                onChange={handleUsernameChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none relative block w-full px-3 py-2 border-b-[1px] border-gray-600 placeholder-gray-500 text-gray-900 rounded-none focus:outline-none focus:border-b-[var(--green-theme)] focus:border-b-2 focus:z-10 sm:text-sm focus:border-2 border-green-600 border-opacity-40 "
                                placeholder="Enter Password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                    </div>


                    <div>
                        <button
                            onClick={handleSubmit} // remove the arrow function
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--green-theme)]"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
