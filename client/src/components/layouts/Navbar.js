import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LoginOutlined, DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';

const CustomNavbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const history = useHistory();

  const logout = () => {
    dispatch({ type: 'LOGOUT', payload: null });
    history.push('/login');
  };

  const menuItems = [
    { label: <a href="#admin/dashboard">Dashboard</a>, key: '0' },
    { label: <a href="#admin/create-person">Create</a>, key: '1' },
    { label: <a href="#admin/allProduct-person">All Product</a>, key: '2' },
    { type: 'divider' },
    { label: <a href="#register">Register</a>, key: '3' },
  ];
  const clickHome = () => {
    history.push('/'); // นำทางไปยังเส้นทาง '/admin/dashboard'
  };
  const clickProduct= () => {
    history.push('/admin/allProduct-person'); // นำทางไปยังเส้นทาง '/admin/dashboard'
  };

  return (
    <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: '#6a0dad', marginBottom: '5vh' }} variant="dark">
      <Container>
        <Navbar.Brand href="/"><h3>CMU COOP</h3></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <button onClick={(e) => clickHome()} style={{ width:'fit-content',border: 'none', background: 'none', color: '#f6e4ff' }}>
                    <Space>
                      Home
                    </Space>
                  </button>
            {user &&  <button onClick={(e) => clickProduct()} style={{ width:'fit-content',border: 'none', background: 'none', color: '#f6e4ff' }}>
                    <Space>
                    Product
                    </Space>
                  </button>}
          </Nav>
          <Nav className="ms-auto ms-lg-0">
            {user ? (
              <>
                <Dropdown menu={{ items: menuItems }} trigger={['click']}>
                  <button onClick={(e) => e.preventDefault()} style={{ width:'fit-content',border: 'none', background: 'none', color: '#f6e4ff' }}>
                    <Space>
                      Menu
                      <DownOutlined />
                    </Space>
                  </button>
                </Dropdown>

                <button onClick={(e) => logout()} style={{ width:'fit-content',border: 'none', background: 'none', color: '#ff2b2b' }}>
                    <Space>
                      Logout
                    </Space>
                  </button>
              </>
            ) : (
              <Nav.Link style={{ color: '#f6e4ff' }} href="#login">Login <LoginOutlined /></Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
