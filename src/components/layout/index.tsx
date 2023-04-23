import Navbar from "../navbar";
import { ILayoutProps } from "./interface";

function Layout(props: ILayoutProps) {
  const { children } = props;
  return (
    <div className="flex ">
      <Navbar />
      <main className=" min-h-screen flex-1 flex-col items-center justify-center bg-violet-950 p-4">
        {children}
      </main>
    </div>
  );
}

export default Layout;
