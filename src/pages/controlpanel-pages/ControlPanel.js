import React, { useState, useEffect } from 'react';
import Loggingout from '../Loggingout';
import Nav from 'react-bootstrap/Nav';
import { Link, Outlet, useLocation } from 'react-router-dom';

const ControlPanel = () => {
  const location = useLocation();

  const [variant, setVariant] = useState(
    localStorage.getItem("controlPanelVariant") || "pills"
  );

  const [activeKey, setActiveKey] = useState("1");

  const handleSelect = (selectedKey) => {
    localStorage.setItem("controlPanelVariant", selectedKey);
    setVariant(selectedKey);
    setActiveKey(selectedKey);
  };

  useEffect(() => {
    const activeTab = document.querySelector(`.nav-link-custom[href="${location.pathname}"]`);
    if (activeTab) {
      setActiveKey(activeTab.getAttribute("data-rb-event-key"));
    }
  }, [location]);

  return (
    <div>
      <Nav variant={variant} activeKey={activeKey} className="mt-5 mb-5" onSelect={handleSelect}>
        <Nav.Item>
          <Nav.Link className="nav-link-custom" as={Link} to="/control-panel/duyular-update" eventKey="1" data-rb-event-key="1">Duyular Upadetes</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="nav-link-custom" as={Link} to="/control-panel/news-updates" eventKey="2" data-rb-event-key="2">News</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="nav-link-custom" as={Link} to="/control-panel/messages" eventKey="3" data-rb-event-key="3">Messages</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="nav-link-custom" as={Link} to="/control-panel/neler-yaptik-update" eventKey="4" data-rb-event-key="4">Neler Yaptik</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="nav-link-custom" as={Link} to="/control-panel/slider-images-update" eventKey="5" data-rb-event-key="5">Slider Images</Nav.Link>
        </Nav.Item>
      </Nav>
      <Outlet />
      <Loggingout />
    </div>
  );
};

export default ControlPanel;
