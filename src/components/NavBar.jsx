
import React from 'react'
import {Link} from 'react-router-dom';
import {createUseStyles} from 'react-jss'
import { useHistory } from "react-router-dom";

const NavBar = (props) => {
  const classes = useStyles()
  const { currentUser, logOut } = props;
  const history = useHistory();
  const pathname = history.location.pathname;
  return (
    <nav className={`navbar navbar-expand-lg navbar navbar-dark bg-dark`}>
      <a href='/' className={classes.ask} style={{textDecoration: "none"}}><i className="far fa-comment-dots"></i>
        <span>Ask me! {pathname.slice(1)}</span>
      </a>
      <button to='/' className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className={`navbar-nav ${classes.navBarNav}`}>
            {currentUser.id && <a className={`nav-item nav-link active ${pathname==='/rtv' ? classes.highlight : ''}`} href='/rtv'> RTV</a> }
            {currentUser.id && <a className={`nav-item nav-link active ${pathname==='/agd' ? classes.highlight : ''}`} href='/agd'> AGD</a> }
            {currentUser.id && <a className={`nav-item nav-link active ${pathname==='/komputery' ? classes.highlight : ''}`} href='/komputery'> Computers</a> }
            {currentUser.id && <a className={`nav-item nav-link active ${pathname==='/budownictwo' ? classes.highlight : ''}`} href='/budownictwo'> Building</a> }
            {currentUser.id && <a className={`nav-item nav-link active ${pathname==='/samochody' ? classes.highlight : ''}`} href='/samochody'> Cars</a> }
            {!currentUser.id && <Link className={`nav-item nav-link active ${pathname==='/rtv' ? classes.highlight : ''}`} to='/sign-up'> Sign up</Link> }
            {!currentUser.id && <Link className={`nav-item nav-link active ${pathname==='/rtv' ? classes.highlight : ''}`} to='/sign-in'> Sign in</Link> }
            {currentUser.id && <button className='btn btn-danger' onClick={logOut}> sign out</button>}
        </div>
      </div>
    </nav>
  )
}

const useStyles = createUseStyles({
  navBarContainer: {
    width: '100%',
    height: "8vh",
    backgroundColor: "#000",
    display: 'flex'
  },
  ask: {
    color: "white",
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: '17px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none',
    },
  NavBar: {
    fontSize: '17px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  navBarNav: {
    width: '100%',
  },
  highlight: {
    fontSize: '1.7em',
  }
})

export default NavBar;

