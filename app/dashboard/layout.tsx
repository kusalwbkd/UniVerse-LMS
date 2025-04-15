import React from 'react'
import Sidebar from './_componenets/Sidebar';
import DashBoardHeader from './_componenets/DashBoardHeader';

const DashboardLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div>
            <div className='md:w-64 hidden md:block fixed'>
                <Sidebar />
            </div>
            <div className='md:ml-64'>
                <DashBoardHeader/>
                <div className='p-10'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout