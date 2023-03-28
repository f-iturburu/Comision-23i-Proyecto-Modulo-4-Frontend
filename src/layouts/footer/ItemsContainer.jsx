import Item from "./Item";
import { LOGO, LINKS, CONTACTO, /* SUPPORT */ } from "./Menus";
const ItemsContainer = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:px-8 px-5 py-16">
      <Item Links={LOGO} title="LOGO" />
      <Item Links={LINKS} title="LINKS" />
      <Item Links={CONTACTO} title="CONTACTO" />
      {/* <Item Links={SUPPORT} title="SUPPORT" /> */}
    </div>
  );
};

export default ItemsContainer;
