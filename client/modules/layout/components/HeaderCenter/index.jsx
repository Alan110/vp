import React, { PropTypes } from 'react';
import { Row, Col, Menu, Icon, Button, Dropdown } from 'antd';

import MenuButton from './components/MenuButton';
import FBShare from './components/FBShare';
import ProfileMenu from './components/ProfileMenu';

import { Link } from 'react-router';
import style from './style.less';

const HeaderCenter = ({logout, userInfo, isNavBtnActive, currentPath}) => {


  let profileMenu = userInfo.get('isAuth') ?
    <ProfileMenu
      onClick={logout}
      username={userInfo.get('detail').get('name')} /> : null;

  return <header className={style.header}>
    <Row>

      <Col lg={19} md={14} sm={18} xs={24} className={style.leftHeaderContainer}>

        <MenuButton isNavBtnActive={isNavBtnActive}/>

        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        {
          currentPath === '/new'?
          <Link to="/">
          <Button type="default" icon="home">
          Back home
          </Button>
          </Link> :
          <Link to="/new">
            <Button type="primary" icon="plus">
              &nbsp;&nbsp;New Color
            </Button>
          </Link>
        }

        &nbsp;&nbsp;&nbsp;
        { userInfo.get('isAuth') ?
          <Dropdown overlay={profileMenu}>
            <img src={userInfo.get('detail').get('img')} alt="icon"/>
          </Dropdown>
          :
          <Link to="/auth">
            <Button type="default" icon="user">
              Sign In
            </Button>
          </Link>
        }

      </Col>


      <Col lg={5} md={7} sm={6} xs={0}>
        <div className={style.shareBtnGroup}>
          <FBShare/>
        </div>
      </Col>

    </Row>
  </header>;
};

export default HeaderCenter;
