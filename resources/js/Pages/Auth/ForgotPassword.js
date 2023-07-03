import React from 'react';
import Button from '@/Components/Button';
import Guest from '@/Layouts/Guest';
import Input from '@/Components/Input';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, useForm } from '@inertiajs/inertia-react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <Guest>
            <Head title="Forgot Password" />

            <div className="mb-6 text-sm font-bold text-gray-800 tracking-wider ">
                Forgot your password? No problem. Just let us know your email address and we will email you a password
                reset link that will allow you to choose a new one.
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <ValidationErrors errors={errors} />

            <form onSubmit={submit}>
                {/* <Input
                    type="text"
                    name="email"
                    value={data.email}
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    isFocused={true}
                    handleChange={onHandleChange}
                /> */}
                <div className="mb-3">
                    <label className="mb-2 text-muted" htmlFor="email">E-Mail Address</label>
                    <input id="email" type="email" className="form-control" name="email" value={data.email} onChange={onHandleChange} required autoFocus />
                    <div className="invalid-feedback">
                        Email is invalid
                    </div>
                </div>
                <button type="submit" className="btn btn-primary ms-auto">
                    Email Password Reset Link
                </button>

                {/* <div className="flex items-center justify-end mt-8">
                    <button
                        type='submit'
                        className="text-center bg-indigo-500 block text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display
                             focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg" processing={processing}>
                        Email Password Reset Link
                    </button>
                </div> */}
            </form>
        </Guest>
    );
}
