import Nav from "./Nav";
import Nav2 from "./Nav2";
import NavContainer from "./nav/NavContainer";

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Content = ({ children, ...props }: ContentProps) => {
  return (
    <div {...props} className="flex flex-1 flex-col overflow-x-auto">
      <NavContainer />
      {children}
    </div>
  );
};

export default Content;
