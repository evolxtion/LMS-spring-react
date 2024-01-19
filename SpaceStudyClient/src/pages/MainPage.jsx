import {
  Container,
  Header,
  Sidebar,
  Sidenav,
  Content,
  Navbar,
  Nav,
} from "rsuite";
import { CustomProvider } from "rsuite";
import { useState } from "react";
import SideNav from "../components/SideNav";
import "rsuite/dist/rsuite.min.css";
import { Outlet, Route } from "react-router-dom";

const MainPage = () => {
  const [activeKey, setActiveKey] = useState("1");
  const [openKeys, setOpenKeys] = useState([]);
  const [expanded, setExpand] = useState(true);

  return (
    <CustomProvider theme="dark">   
      <div className="show-fake-browser sidebar-page">
        <Container>
          <Sidebar
            style={{ display: "flex", flexDirection: "column" }}
            width={expanded ? 260 : 56}
            collapsible
          >
            <SideNav
              appearance={"subtle"}
              activeKey={activeKey}
              openKeys={openKeys}
              onSelect={setActiveKey}
              onOpenChange={setOpenKeys}
              expanded={expanded}
              onExpand={setExpand}
            />
          </Sidebar>

          <Container>

            <Outlet></Outlet>

          </Container>
        </Container>
      </div>
    </CustomProvider>
  );
};

export default MainPage;
