import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <section>
      <nav className="bg-orange-500 border-b border-gray-200 shadow-md">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          <Link to="/" href="" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-650">
              Jeco
            </span>
          </Link>

          <div
            className="flex items-center space-x-6"
            style={{ position: 'relative' }}
          >
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                href=""
                className="text-gray-650 hover:text-blue-500 dark:text-gray-650 dark:hover:text-blue-400 hover:underline transition duration-300"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
