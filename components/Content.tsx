import Nav from "./Nav";

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Content = ({ children, ...props }: ContentProps) => {
  return (
    <div {...props}>
      <Nav />
      {children}
    </div>
  );
};

export default Content;
