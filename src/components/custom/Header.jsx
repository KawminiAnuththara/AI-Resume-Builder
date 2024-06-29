import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";

function Header() {
  const { isSignedIn } = useUser();
  return (
    <div className="p-5 px-5 flex justify-between shadow-md bg-gray-700">
      <img src="/logo.svg" width={70} height={60} alt="Logo" />

      {isSignedIn ? (
        <div className="flex gap-2 items-center">
          <div className="flex items-center text-white text-lg m-2">
             Started Here  <span className="arrow">➔</span>
          </div>
          <Link to={'/dashboard'}>
            <Button variant="outline">Dashboard</Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <Link to={"/auth/sign-in"}>
          <Button>Get Started</Button>
        </Link>
      )}
    </div>
  );
}

export default Header;
