import React from "react";
import ItemsContainer from "./ItemsContainer";
import SocialIcons from "./SocialIcons";
import { Icons } from "./Menus";


/* const Footer = () => {
  return (
    
    <div>
      <div className="bg-light py-4">
        <p className="m-0 fs-5 text-center">
          Rolling Surveys. All rights reserved &copy;
        </p>
      </div>
    </div>
  );
}; */

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <ItemsContainer />
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
      text-center pt-2 text-gray-400 text-sm pb-8"
      >
        <span>© 2023 Rolling Surveys. All rights reserved.</span>
        <SocialIcons Icons={Icons} />
      </div>
    </footer>
  );
};
export default Footer;
