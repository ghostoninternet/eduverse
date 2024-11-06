import React from 'react';
import '../Auth/SignUpForm.jsx';




function SignupForm() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-8">Sign up</h2>

                <form>
                    {/* Full Name */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            className="w-full border rounded-md p-2" />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full border rounded-md p-2" />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full border rounded-md p-2" />
                        <small className="text-gray-500">Between 8-24 characters</small>
                    </div>

                    {/* Join Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Join for free
                    </button>
                </form>

                {/* Continue with */}
                <div className="my-6 flex items-center justify-between">
                    <hr className="w-full border-t border-gray-300" />
                    <span className="px-3 text-gray-500 whitespace-nowrap">Choose your role:</span>
                    <hr className="w-full border-t border-gray-300" />
                </div>

                {/* Student or tutor roles */}
                <div className="flex justify-center space-x-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                </div>

                
            </div>
        </div>
    );
}

export default SignupForm;
