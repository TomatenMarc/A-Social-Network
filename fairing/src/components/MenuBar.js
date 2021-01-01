import React, {Component} from 'react';
import {Dropdown, Grid, Image, Menu, Search} from "semantic-ui-react";
import logo from '../resources/logo.jpg'
import {Link, NavLink} from "react-router-dom";

class MenuBar extends Component {
    /**
     * This component is for the navigation in SolAr.
     * By choosing a specific option the user will be directed to a specific page.
     * @returns {JSX.Element}
     */

    render() {
        this.items = ['Account', 'Logout', 'SignUp']
        return (
            <Menu secondary
                  inverted
                  fixed={"top"}
                  size='large'
                  style={{background: "#1b1c1d"}}
            >
                <Menu.Item name="Logo" as={Link} to="/">
                    <Image avatar src={logo} alt="Logo"/>
                </Menu.Item>
                <Grid>
                    <Grid.Row only="computer tablet">
                        {
                            this.items.map((item, index) =>
                                <Menu.Item key={index}
                                           name={item}
                                           as={NavLink}
                                           to={"/".concat(item)}/>
                            )
                        }
                    </Grid.Row>
                    <Grid.Row only="mobile">
                        <Dropdown item icon='bars' simple>
                            <Dropdown.Menu>
                                {
                                    this.items.splice(0, this.items.length).map((item, index) =>
                                        <Dropdown.Item
                                            key={index}
                                            text={item}
                                            as={NavLink}
                                            to={"/".concat(item)}/>
                                    )
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </Grid.Row>
                </Grid>
                <Menu.Item position='right'>
                    <Search/>
                </Menu.Item>
            </Menu>
        );
    }
}

export default MenuBar;