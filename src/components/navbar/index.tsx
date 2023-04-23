import Link from "next/link";
import { INavbarProps } from "./interface";
import { links } from "./data";

function Navbar(props: INavbarProps) {
  const pr = props;
  return (
    <nav className="w-40 bg-violet-900 p-4">
      <ul className="navbar__list">
        {links.map((link) => (
          <li>
            <Link className="cursor-pointer text-white" href={link.url}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
