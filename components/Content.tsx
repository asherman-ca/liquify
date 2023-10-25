import Nav from "./Nav";

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Content = ({ children, ...props }: ContentProps) => {
  return (
    <div {...props} className="flex flex-1 flex-col">
      <Nav />
      {children}
    </div>
  );
};

export default Content;
