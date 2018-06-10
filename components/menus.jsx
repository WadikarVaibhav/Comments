import React, { Component } from 'react';

export default class Menu extends Component {
  constructor() {
    super();

    this.state = {
      showMenu: false,
    };

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu(event) {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu(event) {
    if (!this.dropdownMenu.contains(event.target)) {

      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });

    }
  }

  render() {
    return (
      <div className="menus_list">
        <button className="menus" onClick={this.showMenu}></button>

        {
          this.state.showMenu
            ? (
              <div className="menu" ref={(element) => {this.dropdownMenu = element;}}>
                  <ul className="menu_unordered_list">
                    <li className="menus_list_item">
                      <a className="menu_item"> Edit </a>
                    </li>
                    <li className="menus_list_item">
                      <a className="menu_item"> Delete </a>
                    </li>
                  </ul>
              </div>
            )
            : (
              null
            )
        }
      </div>
    );
  }
}
