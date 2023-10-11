import React, { useState } from "react";
import $ from "jquery";
import Sidebar from "./Sidebar";
import { useDispatch } from "react-redux";
import { removeUser } from "../Redux/Reducer/User";
import { useNavigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import Swal from "sweetalert2";
export default function Header() {
  const [accountModal, setAccountModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hankclickModal = () => {
    window.scroll(0, 0);
    setAccountModal(!accountModal);
  };

  const drawyer = () => {
    $(".app-sidebar").toggleClass("closed-sidebar");
    $(".app-main__outer").toggleClass("test");
    $(".app-footer__inner").toggleClass("test3");
  };
  const drawyerMob = () => {
    $(".app-sidebar").toggleClass("sidebarmob");
    $(".sidebar-mobile-overlay").toggleClass("sidebar-mobile-open");
    $(".BurgerBox").toggleClass("BurgerActive");
  };

  const logouthandeler = () => {
    Swal.fire({
      title: "Are you sure?",
      // text: "Do you really want to log out ?",
      icon: "warning",
      showCancelButton: true,
      // showNoButton:true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        reactLocalStorage.remove("loginStatus");
        reactLocalStorage.clear("token");
        navigate("/login");
      }
    });

    // const swalWithBootstrapButtons = Swal.mixin({
    //   customClass: {
    //     confirmButton: 'btn btn-success',
    //     cancelButton: 'btn btn-danger'
    //   },
    //   buttonsStyling: false
    // })

    // swalWithBootstrapButtons.fire({
    //   title: 'Are you sure?',
    //   // text: "You won't be able to revert this!",
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonText: 'Yes',
    //   confirmButtonAriaLabel:"5px",
    //   cancelButtonText: 'No',
    //   reverseButtons: false
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     if (result.isConfirmed) {
    //       reactLocalStorage.remove("loginStatus");
    //       reactLocalStorage.clear("token")
    //       navigate('/login')
    //     }
    //   }
    // })
  };
  return (
    <>
      <Sidebar />
      <div className="app-header bg-strong-bliss header-text-light header-shadow appear-done enter-done">
        <div className="app-header__logo">
          <div
            className="logo_"
            style={{
              marginLeft: "52px",
              fontStyle: "italic",
              fontSize: "large",
            }}
          >
            <span>Bushido</span>
          </div>

          <div className="header__pane ms-auto">
            <div>
              <button
                className="jsx-2200192874 BurgerSlider Burger"
                onClick={drawyer}
              >
                <div className="jsx-2200192874 BurgerBox">
                  <div className="jsx-2200192874 BurgerInner" />
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="app-header__mobile-menu">
          <div>
            <button
              className="jsx-3928250682 BurgerSlider Burger"
              onClick={drawyerMob}
            >
              <div className="jsx-3928250682 BurgerBox">
                <div className="jsx-3928250682 BurgerInner" />
              </div>
            </button>
          </div>
        </div>

        <div className="app-header__content">
          <div className="app-header-right">
            <div className="header-btn-lg pe-0">
              <div className="widget-content p-0">
                <div className="widget-content-wrapper">
                  <div className="widget-content-left">
                    <div className="btn-group">
                      <button
                        type="button"
                        aria-haspopup="true"
                        aria-expanded="false"
                        className="p-0 btn btn-link"
                        onClick={hankclickModal}
                      >
                        <img
                          width={42}
                          className="rounded-circle"
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                          alt=""
                        />
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="angle-down"
                          className="svg-inline--fa fa-angle-down ms-2 opacity-8"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          style={{ height: "1em" }}
                        >
                          <path
                            fill="currentColor"
                            d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
                          />
                        </svg>
                      </button>
                      <div
                        tabIndex={-1}
                        role="menu"
                        aria-hidden="true"
                        className="rm-pointers dropdown-menu-lg dropdown-menu dropdown-menu-end"
                      >
                        <ul className="nav flex-column">
                          <li className="nav-item-header nav-item">Activity</li>
                          <li className="nav-item">
                            <a href="#" className="nav-link">
                              Chat
                              <div className="ms-auto badge bg-pill bg-info">
                                8
                              </div>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a href="#" className="nav-link">
                              Recover Password
                            </a>
                          </li>
                          <li className="nav-item-header nav-item">
                            My Account
                          </li>
                          <li className="nav-item">
                            <a href="#" className="nav-link">
                              Settings
                              <div className="ms-auto badge bg-success">
                                New
                              </div>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a href="#" className="nav-link">
                              Messages
                              <div className="ms-auto badge bg-warning">
                                512
                              </div>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a href="#" className="nav-link">
                              Logs
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="widget-content-left  ms-3 header-user-info">
                    <div className="widget-heading">Admin</div>
                    {/* <div className="widget-subheading">VP People Manager</div> */}
                  </div>
                  {/* <div className="widget-content-right header-user-info ms-3">
                    <button
                      type="button"
                      id="Tooltip-1"
                      className="btn-shadow p-1 btn btn-info btn-sm"
                    >
                    <i class="fa-regular fa-calendar"></i>
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {accountModal && (
        <div className="accountOverlay">
          <div
            tabIndex={-1}
            role="menu"
            aria-hidden="false"
            className="rm-pointers dropdown-menu-lg dropdown-menu dropdown-menu-end show"
            data-popper-placement="bottom-end"
            style={{
              position: "absolute",
              inset: "14px 38px auto auto",
              transform: "translate(0px, 44px)",
            }}
          >
            <ul className="nav flex-column">
              {/* <li className="nav-item">
                <a href="#" className="nav-link">
                  Edit Profile
                </a>
              </li> */}
              <hr style={{ margin: "5px" }} />
              {/* <li className="nav-item-header nav-item">My Account</li> */}

              <li className="nav-item">
                <a className="nav-link">
                  <div
                    className="ms-auto badge bg-warning"
                    onClick={logouthandeler}
                  >
                    Logout
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
