import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  IconButton,
  Card,
  Input,
} from "@material-tailwind/react";
import { Link, useLocation } from "react-router-dom";

export function StickyNavbar({ search, setSearch }) {
  const [openNav, setOpenNav] = React.useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
     <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
  <Link to="/form" className="flex items-center">Add books</Link>
</Typography>
      <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
         <Link to="/form/:id" className="flex items-center">Edit book</Link>
      </Typography>
    </ul>
  );

  return (
    <div>
      <Navbar className="fixed top-0 z-50 max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography as="div" className="mr-4 cursor-pointer py-1.5 font-medium">
            <Link to="/" className="flex items-center">e-Books</Link>
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          {navList}
        </MobileNav>
      </Navbar>
        <div className="relative">
          <Card className="mb-12 overflow-hidden">
            <img
              alt="nature"
              className="h-[32rem] w-full object-cover"
              src="https://c4.wallpaperflare.com/wallpaper/897/1005/115/library-artwork-books-wallpaper-preview.jpg"
            />
          </Card>
          {isHomePage && (<div className="absolute top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 px-4">
            <Input
              size="lg"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              label="Search books..."
              className="bg-white rounded-lg shadow-lg"
              crossOrigin={undefined}
            />
          </div>)}
        </div>
    </div>
  );
}
