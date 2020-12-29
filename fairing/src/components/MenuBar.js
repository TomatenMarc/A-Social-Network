import React, {Component} from 'react';
import {Dropdown, Grid, Image, Menu, Search} from "semantic-ui-react";
import logo from '../resources/logo.jpg'

class MenuBar extends Component {

    constructor(props) {
        super(props);
        this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
        this.handleDropdownItemClick = this.handleDropdownItemClick.bind(this)
    }


    handleMenuItemClick = (e, {name}) => {
        e.preventDefault()
        this.setState({activeItem: name});
        if (name === "Account") {
            console.log("Account")
        }
    }
    handleDropdownItemClick = (e, {text}) => {
        e.preventDefault()
        this.setState({activeItem: text});
        if (text === "Account") {
            console.log("Account")
        }
    }

    render() {
        this.items = ['Account', 'Logout', 'SignUp']
        return (
            <Menu secondary fixed={"top"}
                  inverted={true}
                  size='large'
                  style={{background: "#1b1c1d"}}
            >
                <Menu.Item name="Logo">
                    <Image avatar src={logo} alt="Logo"/>
                </Menu.Item>
                <Grid>
                    <Grid.Row only="computer tablet">
                        {
                            this.items.map((item, index) =>
                                <Menu.Item key={index} name={item} onClick={this.handleMenuItemClick}/>
                            )
                        }
                    </Grid.Row>
                    <Grid.Row only="mobile">
                        <Dropdown item icon='bars' simple>
                            <Dropdown.Menu>
                                {
                                    this.items.splice(0, this.items.length - 1).map((item, index) =>
                                        <Dropdown.Item key={index} text={item} onClick={this.handleDropdownItemClick}/>
                                    )
                                }
                                <Dropdown.Divider/>
                                <Dropdown.Item text={this.items.pop()}/>
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