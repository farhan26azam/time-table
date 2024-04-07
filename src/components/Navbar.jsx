import logo from '../../public/logo.png'
import LogoutIcon from '@mui/icons-material/Logout';
const Navbar = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }
    return (
        <nav className="bg-white border-gray-200 border-b-2">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/dashboard" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={logo} className="h-8" alt="Flowbite Logo"/>
                </a>
                <button data-collapse-toggle="navbar-default" type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                            <button className="bg-red-500 p-2 rounded-xl" onClick={
                                handleLogout
                            }>
                                <LogoutIcon sx={{
                                    color: 'white'
                                }}/>
                            </button>

                </div>
            </div>
        </nav>

    )
};

export default Navbar;