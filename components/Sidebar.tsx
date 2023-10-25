interface SideBarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Sidebar = ({ children, ...props }: SideBarProps) => {
  return (
    <div className="flex">
      <div id="sidebar" {...props}>
        sidebar
      </div>
      {children}
    </div>
  );
};

export default Sidebar;
