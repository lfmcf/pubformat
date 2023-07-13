import React from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/inertia-react';

export default function Guest({ children }) {
    return (
        // <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
        //     <div>
        //         <Link href="/">
        //             <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
        //         </Link>
        //     </div>

        //     <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
        //         {children}
        //     </div>
        // </div>
        <section className="h-100">
            <div className="container h-100">
                <div className="row justify-content-sm-center h-100">
                    <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
                        <div className="text-center my-5">
                            <img src="" alt="logo" width="100" />
                        </div>
                        <div className="card shadow-lg">
                            <div className="card-body p-5">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
