import DashBoardHeader from "@/app/dashboard/_componenets/DashBoardHeader";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
             <DashBoardHeader/>
            <div className='mx-10 md:mx-36 lg:px-60 mt-10'>
                {children}
            </div>
        </div>
    );
}