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
             <div className="mt-10 mx-auto max-w-md">
                    <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-center xl:text-6xl
                    xl:text-bold">Log in</h2>
                    <div className="mt-12"></div>
             </div>

            <form onSubmit={submit}>
                <div>
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
                </div>

                <div className="mt-4">
                    <Label className="mb-2 text-sm font-bold text-gray-700 tracking-wide" forInput="password" value="Password" />

                    <Input
                        type="password"
                        name="password"
                        value={data.password}
                        className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                        autoComplete="current-password"
                        handleChange={onHandleChange}
                    />

                </div>

                <div className="flex justify-between my-4">
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
                </div>

                {/* <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                            Don't have an account ?
                    {canRegister =(

                        <Link
                         href={route('register')}
                         className="cursor-pointer text-indigo-600 hover:text-indigo-800">Sign up</Link>
                    )} 
                </div> */}
            </form>
        </Guest>
    );
}
