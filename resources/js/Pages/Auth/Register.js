import React, { useEffect } from 'react';
import Button from '@/Components/Button';
import Guest from '@/Layouts/Guest';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <Guest className="lg:flex">
            <Head title="Register" />

            <ValidationErrors errors={errors} />

            <form onSubmit={submit}>
                <div>
                    <Label className="mt-4 mb-2 text-sm font-bold text-gray-700 tracking-wide" forInput="name" value="Name" />

                    <Input
                        type="text"
                        name="name"
                        value={data.name}
                        className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                        autoComplete="name"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />
                </div>

                <div className="mt-4">
                    <Label className="mb-2 text-sm font-bold text-gray-700 tracking-wide" forInput="email" value="Email Address" />

                    <Input
                        type="email"
                        name="email"
                        value={data.email}
                        className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                        autoComplete="username"
                        handleChange={onHandleChange}
                        required
                    />
                </div>

                <div className="mt-4">
                    <Label className="mb-2 text-sm font-bold text-gray-700 tracking-wide" forInput="password" value="Password" />

                    <Input
                        type="password"
                        name="password"
                        value={data.password}
                        className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                        autoComplete="new-password"
                        handleChange={onHandleChange}
                        required
                    />
                </div>

                <div className="mt-4">
                    <Label className="mb-2 text-sm font-bold text-gray-700 tracking-wide" forInput="password_confirmation" value="Confirm Password" />

                    <Input
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                        handleChange={onHandleChange}
                        required
                    />
                </div>

                <div>
                    <button
                        type='submit'
                        className="mt-6 text-center bg-indigo-500 block text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display
                        focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg" processing={processing}>
                        Sign up!
                    </button>
                </div>


                <div className="flex items-center justify-end mt-12">
                    <Link href={route('login')} className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer">
                        Already registered?Log in here!
                    </Link>
                </div>
            </form>
        </Guest>
    );
}
