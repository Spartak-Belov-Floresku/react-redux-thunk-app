import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.css';
import "./NavBar.css"


const NavBar = () => {
    return(
        <div className="pt-5">
            <Navbar expand="md">
                <NavLink to="/" className="navbar-brand">
                    Microblog
                </NavLink>
                <Nav className='ml-auto' navbar>
                    <NavItem>
                        <NavLink to="/home">Blog</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/new">New post</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    )
}

export default NavBar;