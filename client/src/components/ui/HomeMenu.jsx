import { Link } from "react-router-dom";
import Copyright from "../ui/Copyright";
import "../../styles/ui/homeMenu.css";

const HomeMenu = () => {
  return (
    <>
      {/* Ovde ide theme provider */}
      <div className="home_menu-grid">
        <Link to="/app/audio">
          <div className="home_menu-item" id="audio"></div>
        </Link>
        <Link to="/app/books">
          <div className="home_menu-item" id="books"></div>
        </Link>
        <Link to="/app/documents">
          <div className="home_menu-item" id="documents"></div>
        </Link>
        <Link to="/app/magazines">
          <div className="home_menu-item" id="magazines"></div>
        </Link>
        <Link to="/app/newspapers">
          <div className="home_menu-item" id="newspapers"></div>
        </Link>
        <Link to="/app/photo_collections">
          <div className="home_menu-item" id="photos"></div>
        </Link>
        <Link to="/app/postcards">
          <div className="home_menu-item" id="postcards"></div>
        </Link>
        <Link to="/app/posters">
          <div className="home_menu-item" id="posters"></div>
        </Link>
        <Link to="/app/stamps">
          <div className="home_menu-item" id="stamps"></div>
        </Link>
        <Link to="/app/video">
          <div className="home_menu-item" id="video"></div>
        </Link>
      </div>

      <div className="copyright-wrapper">
        <Copyright />
      </div>
    </>
  );
};

export default HomeMenu;
