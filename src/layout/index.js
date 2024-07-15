import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';
import React from 'react';

const Layout = ({ children }) => {
    const router = useRouter();
    const noNavbar = !router.pathname.match(/(\/register|\/)$/);

    return (
        <div>
            {noNavbar && <Navbar/>}
            <div>{children}</div>
        </div>
    );
}

export default Layout;
