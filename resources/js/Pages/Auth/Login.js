import React, { useEffect } from 'react';
import Button from '@/Components/Button';
import Checkbox from '@/Components/Checkbox';
import Guest from '@/Layouts/Guest';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function Login({ status, canResetPassword, canRegister }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <Guest>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <ValidationErrors errors={errors} />
            <h1 className="fs-4 card-title fw-bold mb-4">Login</h1>

            <form onSubmit={submit}>
                {/* <div>
                    <Label className="mb-2 text-sm font-bold text-gray-700 tracking-wide" forInput="email" value="Email Address" />

                    <Input
                        type="text"
                        name="email"
                        value={data.email}
                        className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                        autoComplete="username"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />
                </div> */}
                <div className="mb-3">
                    <label className="mb-2 text-muted" htmlFor="email">E-Mail Address</label>
                    <input id="email" type="email" className="form-control" name="email" value={data.email} onChange={onHandleChange} required autoFocus />
                    <div className="invalid-feedback">
                        Email is invalid
                    </div>
                </div>
                <div className="mb-3">
                    <div className="mb-2 w-100">
                        <label className="text-muted" htmlFor="password">Password</label>
                        <a href={route('password.request')} className="float-end">
                            Forgot Password?
                        </a>
                    </div>
                    <input id="password" type="password" className="form-control" name="password" onChange={onHandleChange} required />
                    <div className="invalid-feedback">
                        Password is required
                    </div>
                </div>
                <div className="d-flex align-items-center">
                    <div className="form-check">
                        <input type="checkbox" name="remember" id="remember" className="form-check-input" value={data.remember} onChange={onHandleChange} />
                        <label htmlFor="remember" className="form-check-label">Remember Me</label>
                    </div>
                    <button type="submit" className="btn btn-primary ms-auto">
                        Login
                    </button>
                </div>

                {/* <div className="mt-4">
                    <Label className="mb-2 text-sm font-bold text-gray-700 tracking-wide" forInput="password" value="Password" />

                    <Input
                        type="password"
                        name="password"
                        value={data.password}
                        className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                        autoComplete="current-password"
                        handleChange={onHandleChange}
                    />

                </div> */}

                {/* <div className="flex justify-between my-4">
                    <label className="flex items-center">
                        <Checkbox name="remember" value={data.remember} handleChange={onHandleChange} />

                        <span className="ml-2 text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer">Remember me</span>
                    </label>

                    <div className="flex items-center justify-between my-4">
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                            >
                                Forgot your password?
                            </Link>
                        )}
                    </div>
                </div>

                <div>
                    <button
                        type='submit'
                        className="text-center bg-indigo-500 block text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display
                             focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg">
                        Login
                    </button>
                </div> */}
            </form>
        </Guest >
    );
}
