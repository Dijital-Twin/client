export default function Layout({ children }) {
    return (
        <div className='flex flex-col items-center justify-center py-5 px-2 md:px-5 lg:px-10 mx-auto max-w-1250p min-h-[80vh] h-full'>
            {children}
        </div>
    )
}