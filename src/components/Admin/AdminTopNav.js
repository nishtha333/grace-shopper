import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { Tabs, Tab } from '@material-ui/core';

import AdminHome from './AdminHome';
import AdminUsersMain from './UserMgt/AdminUsersMain';
import AdminProductMain from './ProductMgt/AdminProductMain';
import AdminOrdersMain from './OrderMgt/AdminOrdersMain';

class AdminTopNav extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { location } = this.props;

    if (location.pathname.includes('admins/user')) {
      this.setState({ value: 1 });
    } else if (location.pathname.includes('admins/product-create')) {
      this.setState({ value: 2 });
    } else if (location.pathname.includes('admins/product-search')) {
      this.setState({ value: 2 });
    } else if (location.pathname.includes('admins/orders')) {
      this.setState({ value: 3 });
    }
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;

    if(prevProps !== this.props) {
      if (location.pathname.includes('admins/user')) {
        this.setState({ value: 1 });
      } else if (location.pathname.includes('admins/product-create')) {
        this.setState({ value: 2 });
      } else if (location.pathname.includes('admins/product-search')) {
        this.setState({ value: 2 });
      } else if (location.pathname.includes('admins/orders')) {
        this.setState({ value: 3 });
      }
    }
  }

  handleChange(event, value) {
    this.setState({ value });
  }

  render() {
    const { handleChange } = this;
    const { location, match, history } = this.props;

    const { value } = this.state;

    return (
      <Fragment>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Home" component={Link} to="/admins" />

          <Tab label="Users" component={Link} to="/admins/users" />

          <Tab label="Products" component={Link} to="/admins/product-create" />

          {/* <Tab label="Orders" component={Link} to="/admins/orders" /> */}
        </Tabs>

        <div style={{ height: '50px' }} />

        {value === 0 && <AdminHome />}
        {value === 1 && (
          <AdminUsersMain location={location} history={history} match={match} />
        )}
        {value === 2 && (
          <AdminProductMain
            location={location}
            history={history}
            match={match}
          />
        )}

        {value === 3 && <AdminOrdersMain location={location} />}
      </Fragment>
    );
  }
}

export default AdminTopNav;
