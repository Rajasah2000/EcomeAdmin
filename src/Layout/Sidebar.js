import React, { useState } from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import { TbCategory } from "react-icons/tb";
// import { VscDashboard  } from "react-icons/vsc";

export default function Sidebar() {
  const active = () => {
    $(".metismenu-link").toggleClass("active");
  };

  return (
    <>
      <div className="sidebar-mobile-overlay"></div>
      <div
        className="app-sidebar bg-royal sidebar-text-light sidebar-shadow appear-done enter-done fade-in slide-right"
        id="sidebar"
      >
        <div className="app-sidebar__inner">
          <div className="metismenu vertical-nav-menu">
            <ul className="metismenu-container">
              <li className="metismenu-item">
                <Link
                  className="metismenu-link"
                  to="/"
                  style={{ fontWeight: "700", fontSize: "medium" }}
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div
            className="panel-group"
            id="accordionMenu"
            role="tablist"
            aria-multiselectable="true"
          ></div>

          <div className="panel panel-default metismenu vertical-nav-menu">
            <div
              className="panel-heading metismenu-container"
              role="tab"
              id="headingone"
            >
              <div className="panel-title metismenu-item">
                <a
                  className="collapsed metismenu-link"
                  role="button"
                  data-toggle="collapse"
                  data-parent="#accordionMenu"
                  href="#collapseEleven"
                  aria-expanded="false"
                  aria-controls="collapseEleven"
                  style={{ fontWeight: "700", fontSize: "medium" }}
                >
                  Explore(E-Store)
                </a>
              </div>
            </div>
            <div
              id="collapseEleven"
              className="panel-collapse collapse"
              role="tabpanel"
              aria-labelledby="headingone"
            >
              <div className="panel-body">
                <div className="panel panel-default metismenu vertical-nav-menu">
                  <div
                    className="panel-heading metismenu-container"
                    role="tab"
                    id="heading1"
                  >
                    <div className="panel-title metismenu-item">
                      <a
                        className="collapsed metismenu-link"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordionMenu"
                        href="#collapseNine"
                        aria-expanded="false"
                        aria-controls="collapseNine"
                        style={{ fontWeight: "700", fontSize: "medium" }}
                      >
                        {/* <i class="metismenu-icon fa-brands fa-searchengin"></i> */}
                        Category
                      </a>
                    </div>
                  </div>
                  <div
                    id="collapseNine"
                    className="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="heading1"
                  >
                    <div className="panel-body">
                      <ul className="metismenu-container">
                        <li className="metismenu-item">
                          <Link
                            to="/add-manage-category"
                            className="metismenu-link"
                          >
                            Add/Manage Category
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="panel-body">
                <div className="panel panel-default metismenu vertical-nav-menu">
                  <div
                    className="panel-heading metismenu-container"
                    role="tab"
                    id="heading2"
                  >
                    <div className="panel-title metismenu-item">
                      <a
                        className="collapsed metismenu-link"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordionMenu"
                        href="#collapse2"
                        aria-expanded="false"
                        aria-controls="collapseNine"
                        style={{ fontWeight: "700", fontSize: "medium" }}
                      >
                        Country
                      </a>
                    </div>
                  </div>
                  <div
                    id="collapse2"
                    className="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="heading2"
                  >
                    <div className="panel-body">
                      <ul className="metismenu-container">
                        <li className="metismenu-item">
                          <Link
                            to="/add-manage-country"
                            className="metismenu-link"
                          >
                            Add/Manage Country
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="panel-body">
                <div className="panel panel-default metismenu vertical-nav-menu">
                  <div
                    className="panel-heading metismenu-container"
                    role="tab"
                    id="heading3"
                  >
                    <div className="panel-title metismenu-item">
                      <a
                        className="collapsed metismenu-link"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordionMenu"
                        href="#collapse3"
                        aria-expanded="false"
                        aria-controls="collapseNine"
                        style={{ fontWeight: "700", fontSize: "medium" }}
                      >
                        {/* <i class="metismenu-icon fa-brands fa-searchengin"></i> */}
                        Category Banner
                      </a>
                    </div>
                  </div>
                  <div
                    id="collapse3"
                    className="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="heading3"
                  >
                    <div className="panel-body">
                      <ul className="metismenu-container">
                        <li className="metismenu-item">
                          <Link
                            to="/add-manage-category-banner"
                            className="metismenu-link"
                          >
                            Add/Manage Category Banner
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="panel-body">
                <div className="panel panel-default metismenu vertical-nav-menu">
                  <div
                    className="panel-heading metismenu-container"
                    role="tab"
                    id="heading4"
                  >
                    <div className="panel-title metismenu-item">
                      <a
                        className="collapsed metismenu-link"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordionMenu"
                        href="#collapse4"
                        aria-expanded="false"
                        aria-controls="collapseNine"
                        style={{ fontWeight: "700", fontSize: "medium" }}
                      >
                        {/* <i class="metismenu-icon fa-brands fa-searchengin"></i> */}
                        Language
                      </a>
                    </div>
                  </div>
                  <div
                    id="collapse4"
                    className="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="heading4"
                  >
                    <div className="panel-body">
                      <ul className="metismenu-container">
                        <li className="metismenu-item">
                          <Link
                            to="/add-manage-language"
                            className="metismenu-link"
                          >
                            Add/Manage Language
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="panel-body">
                <div className="panel panel-default metismenu vertical-nav-menu">
                  <div
                    className="panel-heading metismenu-container"
                    role="tab"
                    id="heading5"
                  >
                    <div className="panel-title metismenu-item">
                      <a
                        className="collapsed metismenu-link"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordionMenu"
                        href="#collapse5"
                        aria-expanded="false"
                        aria-controls="collapseNine"
                        style={{ fontWeight: "700", fontSize: "medium" }}
                      >
                        {/* <i class="metismenu-icon fa-brands fa-searchengin"></i> */}
                        SubCategory
                      </a>
                    </div>
                  </div>
                  <div
                    id="collapse5"
                    className="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="heading5"
                  >
                    <div className="panel-body">
                      <ul className="metismenu-container">
                        <li className="metismenu-item">
                          <Link
                            to="/add-manage-subcategory"
                            className="metismenu-link"
                          >
                            Add/Manage SubCategory
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="panel-body">
                <div className="panel panel-default metismenu vertical-nav-menu">
                  <div
                    className="panel-heading metismenu-container"
                    role="tab"
                    id="heading6"
                  >
                    <div className="panel-title metismenu-item">
                      <a
                        className="collapsed metismenu-link"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordionMenu"
                        href="#collapse6"
                        aria-expanded="false"
                        aria-controls="collapseNine"
                        style={{ fontWeight: "700", fontSize: "medium" }}
                      >
                        {/* <i class="metismenu-icon fa-brands fa-searchengin"></i> */}
                        Banner
                      </a>
                    </div>
                  </div>
                  <div
                    id="collapse6"
                    className="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="heading6"
                  >
                    <div className="panel-body">
                      <ul className="metismenu-container">
                        <li className="metismenu-item">
                          <Link
                            to="/add-manage-banner"
                            className="metismenu-link"
                          >
                            Add/Manage Banner
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="panel-body">
                <div className="panel panel-default metismenu vertical-nav-menu">
                  <div
                    className="panel-heading metismenu-container"
                    role="tab"
                    id="heading7"
                  >
                    <div className="panel-title metismenu-item">
                      <a
                        className="collapsed metismenu-link"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordionMenu"
                        href="#collapse7"
                        aria-expanded="false"
                        aria-controls="collapseNine"
                        style={{ fontWeight: "700", fontSize: "medium" }}
                      >
                        {/* <i class="metismenu-icon fa-brands fa-searchengin"></i> */}
                        Unit
                      </a>
                    </div>
                  </div>
                  <div
                    id="collapse7"
                    className="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="heading7"
                  >
                    <div className="panel-body">
                      <ul className="metismenu-container">
                        <li className="metismenu-item">
                          <Link
                            to="/add-manage-unit"
                            className="metismenu-link"
                          >
                            Add/Manage Unit
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>


              <div className="panel-body">
                <div className="panel panel-default metismenu vertical-nav-menu">
                  <div
                    className="panel-heading metismenu-container"
                    role="tab"
                    id="heading7"
                  >
                    <div className="panel-title metismenu-item">
                      <a
                        className="collapsed metismenu-link"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordionMenu"
                        href="#collapse8"
                        aria-expanded="false"
                        aria-controls="collapseTen"
                        style={{ fontWeight: "700", fontSize: "medium" }}
                      >
                        {/* <i class="metismenu-icon fa-brands fa-searchengin"></i> */}
                        Coupon
                      </a>
                    </div>
                  </div>
                  <div
                    id="collapse8"
                    className="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="heading7"
                  >
                    <div className="panel-body">
                      <ul className="metismenu-container">
                        <li className="metismenu-item">
                          <Link
                            to="/add-manage-coupon"
                            className="metismenu-link"
                          >
                            Add/Manage Coupon
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="panel-body">
                <div className="panel panel-default metismenu vertical-nav-menu">
                  <div
                    className="panel-heading metismenu-container"
                    role="tab"
                    id="heading10"
                  >
                    <div className="panel-title metismenu-item">
                      <a
                        className="collapsed metismenu-link"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordionMenu"
                        href="#collapse10"
                        aria-expanded="false"
                        aria-controls="collapseNine"
                        style={{ fontWeight: "700", fontSize: "medium" }}
                      >
                        {/* <i class="metismenu-icon fa-brands fa-searchengin"></i> */}
                        Product
                      </a>
                    </div>
                  </div>
                  <div
                    id="collapse10"
                    className="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="heading10"
                  >
                    <div className="panel-body">
                      <ul className="metismenu-container">
                        <li className="metismenu-item">
                          <Link
                            to="/add-manage-product"
                            className="metismenu-link"
                          >
                            Add/Manage Product
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="panel-body">
                <div className="panel panel-default metismenu vertical-nav-menu">
                  <div
                    className="panel-heading metismenu-container"
                    role="tab"
                    id="heading23"
                  >
                    <div className="panel-title metismenu-item">
                      <a
                        className="collapsed metismenu-link"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordionMenu"
                        href="#collapse11"
                        aria-expanded="false"
                        aria-controls="collapseEleven"
                        style={{ fontWeight: "700", fontSize: "medium" }}
                      >
                        {/* <i class="metismenu-icon fa-brands fa-searchengin"></i> */}
                       Orders
                      </a>
                    </div>
                  </div>
                  <div
                    id="collapse11"
                    className="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="heading23"
                  >
                    <div className="panel-body">
                      <ul className="metismenu-container">
                        <li className="metismenu-item">
                          <Link
                            to="/add-manage-orders"
                            className="metismenu-link"
                          >
                            Add/Manage Orders
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="panel panel-default metismenu vertical-nav-menu">
            <div
              className="panel-heading metismenu-container"
              role="tab"
              id="headingTwo"
            >
              <div className="panel-title metismenu-item">
                <a
                  className="collapsed metismenu-link"
                  role="button"
                  data-toggle="collapse"
                  data-parent="#accordionMenu"
                  href="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                  style={{ fontWeight: "700", fontSize: "medium" }}
                >
                  Estore Partner
                </a>
              </div>
            </div>
            <div
              id="collapseTwo"
              className="panel-collapse collapse"
              role="tabpanel"
              aria-labelledby="headingTwo"
            >
              <div className="panel-body">
                <ul className="metismenu-container">
                  <li className="metismenu-item">
                    <Link
                      to="/apprroved-partner-list"
                      className="metismenu-link"
                    >
                      Approved PartnerList
                    </Link>
                  </li>
                </ul>
                <ul className="metismenu-container">
                  <li className="metismenu-item">
                    <Link
                      to="/view-pending-for-approval"
                      className="metismenu-link"
                    >
                      Pending ForApproval
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="panel panel-default metismenu vertical-nav-menu">
            <div
              className="panel-heading metismenu-container"
              role="tab"
              id="headingThree"
            >
              <div className="panel-title metismenu-item">
                <a
                  className="collapsed metismenu-link"
                  role="button"
                  data-toggle="collapse"
                  data-parent="#accordionMenu"
                  href="#collapse22"
                  aria-expanded="false"
                  aria-controls="collapse22"
                  style={{ fontWeight: "700", fontSize: "medium" }}
                >
                  PodCast
                </a>
              </div>
            </div>
            <div
              id="collapse22"
              className="panel-collapse collapse"
              role="tabpanel"
              aria-labelledby="headingThree"
            >
              <div className="panel-body">
                <div className="panel panel-default metismenu vertical-nav-menu">
                  <div
                    className="panel-heading metismenu-container"
                    role="tab"
                    id="headingONE"
                  >
                    <div className="panel-title metismenu-item">
                      <a
                        className="collapsed metismenu-link"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordionMenu"
                        href="#collapseTWO"
                        aria-expanded="false"
                        aria-controls="collapseNine"
                        style={{ fontWeight: "700", fontSize: "medium" }}
                      >
                        {/* <i class="metismenu-icon fa-brands fa-searchengin"></i> */}
                        Music Category
                      </a>
                    </div>
                  </div>
                  <div
                    id="collapseTWO"
                    className="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="headingONE"
                  >
                    <div className="panel-body">
                      <ul className="metismenu-container">
                        <li className="metismenu-item">
                          <Link
                            to="/add-manage-music-category"
                            className="metismenu-link"
                          >
                            Add/Manage Music Category
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="panel-body">
                <div className="panel panel-default metismenu vertical-nav-menu">
                  <div
                    className="panel-heading metismenu-container"
                    role="tab"
                    id="headingTWO"
                  >
                    <div className="panel-title metismenu-item">
                      <a
                        className="collapsed metismenu-link"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordionMenu"
                        href="#collapse11"
                        aria-expanded="false"
                        aria-controls="collapseNine"
                        style={{ fontWeight: "700", fontSize: "medium" }}
                      >
                        {/* <i class="metismenu-icon fa-brands fa-searchengin"></i> */}
                        Music Genre
                      </a>
                    </div>
                  </div>
                  <div
                    id="collapse11"
                    className="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="headingTwo"
                  >
                    <div className="panel-body">
                      <ul className="metismenu-container">
                        <li className="metismenu-item">
                          <Link
                            to="/add-manage-music-genre"
                            className="metismenu-link"
                          >
                            Add/Manage Music Genre
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="panel-body">
                <div className="panel panel-default metismenu vertical-nav-menu">
                  <div
                    className="panel-heading metismenu-container"
                    role="tab"
                    id="headingThree"
                  >
                    <div className="panel-title metismenu-item">
                      <a
                        className="collapsed metismenu-link"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordionMenu"
                        href="#collapse12"
                        aria-expanded="false"
                        aria-controls="collapseNine"
                        style={{ fontWeight: "700", fontSize: "medium" }}
                      >
                        {/* <i class="metismenu-icon fa-brands fa-searchengin"></i> */}
                        PodCast Category
                      </a>
                    </div>
                  </div>
                  <div
                    id="collapse12"
                    className="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="headingThree"
                  >
                    <div className="panel-body">
                      <ul className="metismenu-container">
                        <li className="metismenu-item">
                          <Link
                            to="/add-manage-podcast-category"
                            className="metismenu-link"
                          >
                            Add/Manage PodCast Category
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="panel-body">
                <div className="panel panel-default metismenu vertical-nav-menu">
                  <div
                    className="panel-heading metismenu-container"
                    role="tab"
                    id="headingFour"
                  >
                    <div className="panel-title metismenu-item">
                      <a
                        className="collapsed metismenu-link"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordionMenu"
                        href="#collapse13"
                        aria-expanded="false"
                        aria-controls="collapseNine"
                        style={{ fontWeight: "700", fontSize: "medium" }}
                      >
                        {/* <i class="metismenu-icon fa-brands fa-searchengin"></i> */}
                        Points
                      </a>
                    </div>
                  </div>
                  <div
                    id="collapse13"
                    className="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="headingFour"
                  >
                    <div className="panel-body">
                      <ul className="metismenu-container">
                        <li className="metismenu-item">
                          <Link
                            to="/add-and-view-points"
                            className="metismenu-link"
                          >
                            Add/View Points
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="panel-body">
                <div className="panel panel-default metismenu vertical-nav-menu">
                  <div
                    className="panel-heading metismenu-container"
                    role="tab"
                    id="headingFive"
                  >
                    <div className="panel-title metismenu-item">
                      <a
                        className="collapsed metismenu-link"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordionMenu"
                        href="#collapse14"
                        aria-expanded="false"
                        aria-controls="collapseNine"
                        style={{ fontWeight: "700", fontSize: "medium" }}
                      >
                        {/* <i class="metismenu-icon fa-brands fa-searchengin"></i> */}
                        Mood
                      </a>
                    </div>
                  </div>
                  <div
                    id="collapse14"
                    className="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="headingFive"
                  >
                    <div className="panel-body">
                      <ul className="metismenu-container">
                        <li className="metismenu-item">
                          <Link
                            to="/add-and-manage-mood"
                            className="metismenu-link"
                          >
                            Add/Manage Mood
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="panel-body">
                <div className="panel panel-default metismenu vertical-nav-menu">
                  <div
                    className="panel-heading metismenu-container"
                    role="tab"
                    id="headingSix"
                  >
                    <div className="panel-title metismenu-item">
                      <a
                        className="collapsed metismenu-link"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordionMenu"
                        href="#collapse15"
                        aria-expanded="false"
                        aria-controls="collapseNine"
                        style={{ fontWeight: "700", fontSize: "medium" }}
                      >
                        {/* <i class="metismenu-icon fa-brands fa-searchengin"></i> */}
                        Podcast Genre
                      </a>
                    </div>
                  </div>
                  <div
                    id="collapse15"
                    className="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="headingSix"
                  >
                    <div className="panel-body">
                      <ul className="metismenu-container">
                        <li className="metismenu-item">
                          <Link
                            to="/add-and-manage-podcast-genre"
                            className="metismenu-link"
                          >
                            Add/Manage Podcast Genre
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="panel-body">
                <div className="panel panel-default metismenu vertical-nav-menu">
                  <div
                    className="panel-heading metismenu-container"
                    role="tab"
                    id="headingSeven"
                  >
                    <div className="panel-title metismenu-item">
                      <a
                        className="collapsed metismenu-link"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordionMenu"
                        href="#collapse16"
                        aria-expanded="false"
                        aria-controls="collapseNine"
                        style={{ fontWeight: "700", fontSize: "medium" }}
                      >
                        {/* <i class="metismenu-icon fa-brands fa-searchengin"></i> */}
                        Subscription
                      </a>
                    </div>
                  </div>
                  <div
                    id="collapse16"
                    className="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="headingSeven"
                  >
                    <div className="panel-body">
                      <ul className="metismenu-container">
                        <li className="metismenu-item">
                          <Link
                            to="/add-and-manage-podcast-subscription"
                            className="metismenu-link"
                          >
                            Add/Manage Subscription
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>



              <div className="panel-body">
                <div className="panel panel-default metismenu vertical-nav-menu">
                  <div
                    className="panel-heading metismenu-container"
                    role="tab"
                    id="collapse78"
                  >
                    <div className="panel-title metismenu-item">
                      <a
                        className="collapsed metismenu-link"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordionMenu"
                        href="#collapseTWO"
                        aria-expanded="false"
                        aria-controls="collapse78"
                        style={{ fontWeight: "700", fontSize: "medium" }}
                      >
                        {/* <i class="metismenu-icon fa-brands fa-searchengin"></i> */}
                        PodCast/Music Add/Manage
                      </a>
                    </div>
                  </div>
                  <div
                    id="collapseTWO"
                    className="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="collapse78"
                  >
                    <div className="panel-body">
                      <ul className="metismenu-container">
                        <li className="metismenu-item">
                          <Link
                            to="/add-manage-podcast"
                            className="metismenu-link"
                          >
                            Add/Manage Podcast/Music
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>




              {/* <div className="panel-body">
                <div className="panel panel-default metismenu vertical-nav-menu">
                  <div
                    className="panel-heading metismenu-container"
                    role="tab"
                    id="collapse80"
                  >
                    <div className="panel-title metismenu-item">
                      <a
                        className="collapsed metismenu-link"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordionMenu"
                        href="#collapseFour"
                        aria-expanded="false"
                        aria-controls="collapse80"
                        style={{ fontWeight: "700", fontSize: "medium" }}
                      >

                        Music Add/Manage
                      </a>
                    </div>
                  </div>
                  <div
                    id="collapseFour"
                    className="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="collapse80"
                  >
                    <div className="panel-body">
                      <ul className="metismenu-container">
                        <li className="metismenu-item">
                          <Link
                            to="/add-manage-music"
                            className="metismenu-link"
                          >
                            Add/Manage Music
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div> */}



              {/* <div className="panel-body">
                <div className="panel panel-default metismenu vertical-nav-menu">
                  <div
                    className="panel-heading metismenu-container"
                    role="tab"
                    id="collapse81"
                  >
                    <div className="panel-title metismenu-item">
                      <a
                        className="collapsed metismenu-link"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordionMenu"
                        href="#collapseFive"
                        aria-expanded="false"
                        aria-controls="collapse81"
                        style={{ fontWeight: "700", fontSize: "medium" }}
                      >
                      
                        Music Album Add/Manage
                      </a>
                    </div>
                  </div>
                  <div
                    id="collapseFive"
                    className="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="collapse81"
                  >
                    <div className="panel-body">
                      <ul className="metismenu-container">
                        <li className="metismenu-item">
                          <Link
                            to="/add-manage-music-album"
                            className="metismenu-link"
                          >
                            Add/Manage Music Album
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div> */}

            </div>
          </div>

          <div className="panel panel-default metismenu vertical-nav-menu">
            <div
              className="panel-heading metismenu-container"
              role="tab"
              id="headingeight"
            >
              <div className="panel-title metismenu-item">
                <a
                  className="collapsed metismenu-link"
                  role="button"
                  data-toggle="collapse"
                  data-parent="#accordionMenu"
                  href="#collapse21"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                  style={{ fontWeight: "700", fontSize: "medium" }}
                >
                  {/* <i class="metismenu-icon fa-brands fa-searchengin"></i> */}
                  {/* <TbCategory/> */}
                  OTT Partner
                </a>
              </div>
            </div>
            <div
              id="collapse21"
              className="panel-collapse collapse"
              role="tabpanel"
              aria-labelledby="headingeight"
            >
              <div className="panel-body">
                <ul className="metismenu-container">
                  <li className="metismenu-item">
                    <Link
                      to="/add-and-manage-ott-partner"
                      className="metismenu-link"
                    >
                      AddAndManage OTT Partner
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="panel panel-default metismenu vertical-nav-menu">
            <div
              className="panel-heading metismenu-container"
              role="tab"
              id="headingnine"
            >
              <div className="panel-title metismenu-item">
                <a
                  className="collapsed metismenu-link"
                  role="button"
                  data-toggle="collapse"
                  data-parent="#accordionMenu"
                  href="#collapse23"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                  style={{ fontWeight: "700", fontSize: "medium" }}
                >
                  {/* <i class="metismenu-icon fa-brands fa-searchengin"></i> */}
                  {/* <TbCategory/> */}
                  OTT Content Language
                </a>
              </div>
            </div>
            <div
              id="collapse23"
              className="panel-collapse collapse"
              role="tabpanel"
              aria-labelledby="headingnine"
            >
              <div className="panel-body">
                <ul className="metismenu-container">
                  <li className="metismenu-item">
                    <Link
                      to="/add-and-manage-ott-content-language"
                      className="metismenu-link"
                    >
                      Add/Manage ContentLanguage
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="panel panel-default metismenu vertical-nav-menu">
            <div
              className="panel-heading metismenu-container"
              role="tab"
              id="headingTen"
            >
              <div className="panel-title metismenu-item">
                <a
                  className="collapsed metismenu-link"
                  role="button"
                  data-toggle="collapse"
                  data-parent="#accordionMenu"
                  href="#collapse43"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                  style={{ fontWeight: "700", fontSize: "medium" }}
                >
                  {/* <i class="metismenu-icon fa-brands fa-searchengin"></i> */}
                  {/* <TbCategory/> */}
                  OTT Partner Approve
                </a>
              </div>
            </div>
            <div
              id="collapse43"
              className="panel-collapse collapse"
              role="tabpanel"
              aria-labelledby="headingten"
            >
              <div className="panel-body">
                <ul className="metismenu-container">
                  <li className="metismenu-item">
                    <Link
                      to="/view-apprroved-partnership-list"
                      className="metismenu-link"
                    >
                      Approved PartnerShip
                    </Link>
                  </li>
                </ul>
                <ul className="metismenu-container">
                  <li className="metismenu-item">
                    <Link
                      to="/view-disapproved-partnership-list"
                      className="metismenu-link"
                    >
                      DisApproved PartnerShip
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>


          <div className="panel panel-default metismenu vertical-nav-menu">
            <div
              className="panel-heading metismenu-container"
              role="tab"
              id="heading41"
            >
              <div className="panel-title metismenu-item">
                <a
                  className="collapsed metismenu-link"
                  role="button"
                  data-toggle="collapse"
                  data-parent="#accordionMenu"
                  href="#collapse71"
                  aria-expanded="false"
                  aria-controls="collapse71"
                  style={{ fontWeight: "700", fontSize: "medium" }}
                >
                  Learning
                </a>
              </div>
            </div>
            <div
              id="collapse71"
              className="panel-collapse collapse"
              role="tabpanel"
              aria-labelledby="heading41"
            >
              <div className="panel-body">
                <div className="panel panel-default metismenu vertical-nav-menu">
                  <div
                    className="panel-heading metismenu-container"
                    role="tab"
                    id="collapse76"
                  >
                    <div className="panel-title metismenu-item">
                      <a
                        className="collapsed metismenu-link"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordionMenu"
                        href="#collapseTWO"
                        aria-expanded="false"
                        aria-controls="collapse76"
                        style={{ fontWeight: "700", fontSize: "medium" }}
                      >
                        {/* <i class="metismenu-icon fa-brands fa-searchengin"></i> */}
                        Category
                      </a>
                    </div>
                  </div>
                  <div
                    id="collapseTWO"
                    className="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="collapse76"
                  >
                    <div className="panel-body">
                      <ul className="metismenu-container">
                        <li className="metismenu-item">
                          <Link
                            to="/manage-category"
                            className="metismenu-link"
                          >
                            Add/Manage Category
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="panel-body">
                <div className="panel panel-default metismenu vertical-nav-menu">
                  <div
                    className="panel-heading metismenu-container"
                    role="tab"
                    id="collapse89"
                  >
                    <div className="panel-title metismenu-item">
                      <a
                        className="collapsed metismenu-link"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordionMenu"
                        href="#collapseTHREE"
                        aria-expanded="false"
                        aria-controls="collapse89"
                        style={{ fontWeight: "700", fontSize: "medium" }}
                      >
                        {/* <i class="metismenu-icon fa-brands fa-searchengin"></i> */}
                        Expertise
                      </a>
                    </div>
                  </div>
                  <div
                    id="collapseTHREE"
                    className="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="collapse89"
                  >
                    <div className="panel-body">
                      <ul className="metismenu-container">
                        <li className="metismenu-item">
                          <Link
                            to="/manage-expertise"
                            className="metismenu-link"
                          >
                            Add/Manage Expertise
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>


              <div className="panel-body">
                <div className="panel panel-default metismenu vertical-nav-menu">
                  <div
                    className="panel-heading metismenu-container"
                    role="tab"
                    id="collapse90"
                  >
                    <div className="panel-title metismenu-item">
                      <a
                        className="collapsed metismenu-link"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordionMenu"
                        href="#collapseFOUR"
                        aria-expanded="false"
                        aria-controls="collapse90"
                        style={{ fontWeight: "700", fontSize: "medium" }}
                      >
                        {/* <i class="metismenu-icon fa-brands fa-searchengin"></i> */}
                        Course
                      </a>
                    </div>
                  </div>
                  <div
                    id="collapseFOUR"
                    className="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="collapse90"
                  >
                    <div className="panel-body">
                      <ul className="metismenu-container">
                        <li className="metismenu-item">
                          <Link
                            to="/manage-course"
                            className="metismenu-link"
                          >
                            Add/Manage Course
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="panel panel-default metismenu vertical-nav-menu">
            <div
              className="panel-heading metismenu-container"
              role="tab"
              id="heading42"
            >
              <div className="panel-title metismenu-item">
                <a
                  className="collapsed metismenu-link"
                  role="button"
                  data-toggle="collapse"
                  data-parent="#accordionMenu"
                  href="#collapse72"
                  aria-expanded="false"
                  aria-controls="collapse72"
                  style={{ fontWeight: "700", fontSize: "medium" }}
                >
                  OTT
                </a>
              </div>
            </div>
            <div
              id="collapse72"
              className="panel-collapse collapse"
              role="tabpanel"
              aria-labelledby="heading42"
            >
              <div className="panel-body">
                <div className="panel panel-default metismenu vertical-nav-menu">
                  <div
                    className="panel-heading metismenu-container"
                    role="tab"
                    id="collapse77"
                  >
                    <div className="panel-title metismenu-item">
                      <a
                        className="collapsed metismenu-link"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordionMenu"
                        href="#collapseTWO"
                        aria-expanded="false"
                        aria-controls="collapse77"
                        style={{ fontWeight: "700", fontSize: "medium" }}
                      >
                        {/* <i class="metismenu-icon fa-brands fa-searchengin"></i> */}
                        Subscription
                      </a>
                    </div>
                  </div>
                  <div
                    id="collapseTWO"
                    className="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="collapse77"
                  >
                    <div className="panel-body">
                      <ul className="metismenu-container">
                        <li className="metismenu-item">
                          <Link
                            to="/add-manage-subscription"
                            className="metismenu-link"
                          >
                            Add/Manage Subscription
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>


              <div className="panel-body">
                <div className="panel panel-default metismenu vertical-nav-menu">
                  <div
                    className="panel-heading metismenu-container"
                    role="tab"
                    id="collapse91"
                  >
                    <div className="panel-title metismenu-item">
                      <a
                        className="collapsed metismenu-link"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordionMenu"
                        href="#collapseTHREE"
                        aria-expanded="false"
                        aria-controls="collapse91"
                        style={{ fontWeight: "700", fontSize: "medium" }}
                      >

                        Main Banner
                      </a>
                    </div>
                  </div>
                  <div
                    id="collapseTHREE"
                    className="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="collapse91"
                  >
                    <div className="panel-body">
                      <ul className="metismenu-container">
                        <li className="metismenu-item">
                          <Link
                            to="/add-and-manage-main-banner"
                            className="metismenu-link"
                          >
                            Add/Manage Main Banner
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>


              <div className="panel-body">
                <div className="panel panel-default metismenu vertical-nav-menu">
                  <div
                    className="panel-heading metismenu-container"
                    role="tab"
                    id="collapse92"
                  >
                    <div className="panel-title metismenu-item">
                      <a
                        className="collapsed metismenu-link"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordionMenu"
                        href="#collapseFour"
                        aria-expanded="false"
                        aria-controls="collapse92"
                        style={{ fontWeight: "700", fontSize: "medium" }}
                      >

                        Points
                      </a>
                    </div>
                  </div>
                  <div
                    id="collapseFour"
                    className="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="collapse92"
                  >
                    <div className="panel-body">
                      <ul className="metismenu-container">
                        <li className="metismenu-item">
                          <Link
                            to="/add-and-manage-points"
                            className="metismenu-link"
                          >
                            Add/Manage Points
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="panel panel-default metismenu vertical-nav-menu">
            <div
              className="panel-heading metismenu-container"
              role="tab"
              id="heading42"
            >
              <div className="panel-title metismenu-item">
                <a
                  className="collapsed metismenu-link"
                  role="button"
                  data-toggle="collapse"
                  data-parent="#accordionMenu"
                  href="#collapse73"
                  aria-expanded="false"
                  aria-controls="collapse73"
                  style={{ fontWeight: "700", fontSize: "medium" }}
                >
                  Bushido Wallet
                </a>
              </div>
            </div>
            <div
              id="collapse73"
              className="panel-collapse collapse"
              role="tabpanel"
              aria-labelledby="heading42"
            >
              <div className="panel-body">
                <div className="panel panel-default metismenu vertical-nav-menu">
                  <div
                    className="panel-heading metismenu-container"
                    role="tab"
                    id="collapse51"
                  >
                    <div className="panel-title metismenu-item">
                      <a
                        className="collapsed metismenu-link"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordionMenu"
                        href="#collapse41"
                        aria-expanded="false"
                        aria-controls="collapse51"
                        style={{ fontWeight: "700", fontSize: "medium" }}
                      >
                        {/* <i class="metismenu-icon fa-brands fa-searchengin"></i> */}
                        Social Wallet
                      </a>
                    </div>
                  </div>
                  <div
                    id="collapse41"
                    className="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="collapse51"
                  >
                    <div className="panel-body">
                      <ul className="metismenu-container">
                        <li className="metismenu-item">
                          <Link
                            to="/add-manage-social-wallet"
                            className="metismenu-link"
                          >
                            Add/Manage Social Wallet
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="panel-body">
                <div className="panel panel-default metismenu vertical-nav-menu">
                  <div
                    className="panel-heading metismenu-container"
                    role="tab"
                    id="collapse52"
                  >
                    <div className="panel-title metismenu-item">
                      <a
                        className="collapsed metismenu-link"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordionMenu"
                        href="#collapse45"
                        aria-expanded="false"
                        aria-controls="collapse52"
                        style={{ fontWeight: "700", fontSize: "medium" }}
                      >

                        Donation
                      </a>
                    </div>
                  </div>
                  <div
                    id="collapse45"
                    className="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="collapse52"
                  >
                    <div className="panel-body">
                      <ul className="metismenu-container">
                        <li className="metismenu-item">
                          <Link
                            to="/add-and-manage-donation"
                            className="metismenu-link"
                          >
                            Add/Manage Donation
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>


              <div className="panel-body">
                <div className="panel panel-default metismenu vertical-nav-menu">
                  <div
                    className="panel-heading metismenu-container"
                    role="tab"
                    id="collapse53"
                  >
                    <div className="panel-title metismenu-item">
                      <a
                        className="collapsed metismenu-link"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordionMenu"
                        href="#collapse54"
                        aria-expanded="false"
                        aria-controls="collapse53"
                        style={{ fontWeight: "700", fontSize: "medium" }}
                      >

                        Time Zone
                      </a>
                    </div>
                  </div>
                  <div
                    id="collapse54"
                    className="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="collapse53"
                  >
                    <div className="panel-body">
                      <ul className="metismenu-container">
                        <li className="metismenu-item">
                          <Link
                            to="/add-and-manage-time-zone"
                            className="metismenu-link"
                          >
                            Add/Manage Time Zone
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="panel panel-default metismenu vertical-nav-menu">
            <div
              className="panel-heading metismenu-container"
              role="tab"
              id="heading73"
            >
              <div className="panel-title metismenu-item">
                <a
                  className="collapsed metismenu-link"
                  role="button"
                  data-toggle="collapse"
                  data-parent="#accordionMenu"
                  href="#collapse75"
                  aria-expanded="false"
                  aria-controls="collapse75"
                  style={{ fontWeight: "700", fontSize: "medium" }}
                >
                  News
                </a>
              </div>
            </div>
            <div
              id="collapse75"
              className="panel-collapse collapse"
              role="tabpanel"
              aria-labelledby="heading73"
            >
              <div className="panel-body">
                <div className="panel panel-default metismenu vertical-nav-menu">
                  <div
                    className="panel-heading metismenu-container"
                    role="tab"
                    id="collapse55"
                  >
                    <div className="panel-title metismenu-item">
                      <a
                        className="collapsed metismenu-link"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordionMenu"
                        href="#collapse65"
                        aria-expanded="false"
                        aria-controls="collapse51"
                        style={{ fontWeight: "700", fontSize: "medium" }}
                      >
                        {/* <i class="metismenu-icon fa-brands fa-searchengin"></i> */}
                        News Category
                      </a>
                    </div>
                  </div>
                  <div
                    id="collapse65"
                    className="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="collapse55"
                  >
                    <div className="panel-body">
                      <ul className="metismenu-container">
                        <li className="metismenu-item">
                          <Link
                            to="/add-manage-news-category"
                            className="metismenu-link"
                          >
                            Add/Manage News Category
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="panel-body">
                <div className="panel panel-default metismenu vertical-nav-menu">
                  <div
                    className="panel-heading metismenu-container"
                    role="tab"
                    id="collapse56"
                  >
                    <div className="panel-title metismenu-item">
                      <a
                        className="collapsed metismenu-link"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordionMenu"
                        href="#collapse32"
                        aria-expanded="false"
                        aria-controls="collapse56"
                        style={{ fontWeight: "700", fontSize: "medium" }}
                      >
                        News
                      </a>
                    </div>
                  </div>
                  <div
                    id="collapse32"
                    className="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="collapse56"
                  >
                    <div className="panel-body">
                      <ul className="metismenu-container">
                        <li className="metismenu-item">
                          <Link
                            to="/add-and-manage-news"
                            className="metismenu-link"
                          >
                            Add/Manage News
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="panel panel-default metismenu vertical-nav-menu">
            <div
              className="panel-heading metismenu-container"
              role="tab"
              id="heading00"
            >
              <div className="panel-title metismenu-item">
                <a
                  className="collapsed metismenu-link"
                  role="button"
                  data-toggle="collapse"
                  data-parent="#accordionMenu"
                  href="#collapseToo"
                  aria-expanded="false"
                  aria-controls="collapseToo"
                  style={{ fontWeight: "700", fontSize: "medium" }}
                >
                  Commission for Partners
                </a>
              </div>
            </div>
            <div
              id="collapseToo"
              className="panel-collapse collapse"
              role="tabpanel"
              aria-labelledby="heading00"
            >
              <div className="panel-body">
                <ul className="metismenu-container">
                  <li className="metismenu-item">
                    <Link
                      to="/add-and-manage-commission"
                      className="metismenu-link"
                    >
                      Add And Manage Commission
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="panel panel-default metismenu vertical-nav-menu">
            <div
              className="panel-heading metismenu-container"
              role="tab"
              id="heading01"
            >
              <div className="panel-title metismenu-item">
                <a
                  className="collapsed metismenu-link"
                  role="button"
                  data-toggle="collapse"
                  data-parent="#accordionMenu"
                  href="#collapse02"
                  aria-expanded="false"
                  aria-controls="collapse02"
                  style={{ fontWeight: "700", fontSize: "medium" }}
                >
                  Event
                </a>
              </div>
            </div>
            <div
              id="collapse02"
              className="panel-collapse collapse"
              role="tabpanel"
              aria-labelledby="heading01"
            >
              <div className="panel-body">
                <div className="panel panel-default metismenu vertical-nav-menu">
                  <div
                    className="panel-heading metismenu-container"
                    role="tab"
                    id="collapse05"
                  >
                    <div className="panel-title metismenu-item">
                      <a
                        className="collapsed metismenu-link"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordionMenu"
                        href="#collapse06"
                        aria-expanded="false"
                        aria-controls="collapse06"
                        style={{ fontWeight: "700", fontSize: "medium" }}
                      >
                        {/* <i class="metismenu-icon fa-brands fa-searchengin"></i> */}
                        Events
                      </a>
                    </div>
                  </div>
                  <div
                    id="collapse06"
                    className="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="collapse05"
                  >
                    <div className="panel-body">
                      <ul className="metismenu-container">
                        <li className="metismenu-item">
                          <Link
                            to="/add-and-manage-events"
                            className="metismenu-link"
                          >
                            Add/Manage Events
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="panel-body">
                <div className="panel panel-default metismenu vertical-nav-menu">
                  <div
                    className="panel-heading metismenu-container"
                    role="tab"
                    id="collapse07"
                  >
                    <div className="panel-title metismenu-item">
                      <a
                        className="collapsed metismenu-link"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordionMenu"
                        href="#collapse08"
                        aria-expanded="false"
                        aria-controls="collapse08"
                        style={{ fontWeight: "700", fontSize: "medium" }}
                      >
                        {/* <i class="metismenu-icon fa-brands fa-searchengin"></i> */}
                        Session
                      </a>
                    </div>
                  </div>
                  <div
                    id="collapse08"
                    className="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="collapse07"
                  >
                    <div className="panel-body">
                      <ul className="metismenu-container">
                        <li className="metismenu-item">
                          <Link
                            to="/add-and-manage-session"
                            className="metismenu-link"
                          >
                            Add/Manage Session
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="panel-body">
                <div className="panel panel-default metismenu vertical-nav-menu">
                  <div
                    className="panel-heading metismenu-container"
                    role="tab"
                    id="collapse09"
                  >
                    <div className="panel-title metismenu-item">
                      <a
                        className="collapsed metismenu-link"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordionMenu"
                        href="#collapse10"
                        aria-expanded="false"
                        aria-controls="collapse10"
                        style={{ fontWeight: "700", fontSize: "medium" }}
                      >
                        {/* <i class="metismenu-icon fa-brands fa-searchengin"></i> */}
                        Speaker
                      </a>
                    </div>
                  </div>
                  <div
                    id="collapse10"
                    className="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="collapse09"
                  >
                    <div className="panel-body">
                      <ul className="metismenu-container">
                        <li className="metismenu-item">
                          <Link
                            to="/add-and-manage-speaker"
                            className="metismenu-link"
                          >
                            Add/Manage Speaker
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="panel-body">
                <div className="panel panel-default metismenu vertical-nav-menu">
                  <div
                    className="panel-heading metismenu-container"
                    role="tab"
                    id="collapse21"
                  >
                    <div className="panel-title metismenu-item">
                      <a
                        className="collapsed metismenu-link"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordionMenu"
                        href="#collapseab"
                        aria-expanded="false"
                        aria-controls="collapseab"
                        style={{ fontWeight: "700", fontSize: "medium" }}
                      >
                        {/* <i class="metismenu-icon fa-brands fa-searchengin"></i> */}
                        Sponser
                      </a>
                    </div>
                  </div>
                  <div
                    id="collapseab"
                    className="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="collapse21"
                  >
                    <div className="panel-body">
                      <ul className="metismenu-container">
                        <li className="metismenu-item">
                          <Link
                            to="/add-and-manage-sponser"
                            className="metismenu-link"
                          >
                            Add/Manage Sponser
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>


              <div className="panel-body">
                <div className="panel panel-default metismenu vertical-nav-menu">
                  <div
                    className="panel-heading metismenu-container"
                    role="tab"
                    id="collapseyz"
                  >
                    <div className="panel-title metismenu-item">
                      <a
                        className="collapsed metismenu-link"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordionMenu"
                        href="#collapsexy"
                        aria-expanded="false"
                        aria-controls="collapsexy"
                        style={{ fontWeight: "700", fontSize: "medium" }}
                      >
                        {/* <i class="metismenu-icon fa-brands fa-searchengin"></i> */}
                        Booth
                      </a>
                    </div>
                  </div>
                  <div
                    id="collapsexy"
                    className="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="collapseyz"
                  >
                    <div className="panel-body">
                      <ul className="metismenu-container">
                        <li className="metismenu-item">
                          <Link
                            to="/add-and-manage-booth"
                            className="metismenu-link"
                          >
                            Add/Manage Booth
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="panel-body">
                <div className="panel panel-default metismenu vertical-nav-menu">
                  <div
                    className="panel-heading metismenu-container"
                    role="tab"
                    id="collapsexyz"
                  >
                    <div className="panel-title metismenu-item">
                      <a
                        className="collapsed metismenu-link"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordionMenu"
                        href="#collapseddd"
                        aria-expanded="false"
                        aria-controls="collapseddd"
                        style={{ fontWeight: "700", fontSize: "medium" }}
                      >
                        {/* <i class="metismenu-icon fa-brands fa-searchengin"></i> */}
                        Booth Product
                      </a>
                    </div>
                  </div>
                  <div
                    id="collapseddd"
                    className="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="collapsexyz"
                  >
                    <div className="panel-body">
                      <ul className="metismenu-container">
                        <li className="metismenu-item">
                          <Link
                            to="/add-and-manage-booth-product"
                            className="metismenu-link"
                          >
                            Add/Manage Booth Product
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="panel panel-default metismenu vertical-nav-menu">
            <div
              className="panel-heading metismenu-container"
              role="tab"
              id="headingnine"
            >
              <div className="panel-title metismenu-item">
                <a
                  className="collapsed metismenu-link"
                  role="button"
                  data-toggle="collapse"
                  data-parent="#accordionMenu"
                  href="#collapse30"
                  aria-expanded="false"
                  aria-controls="collapseTen"
                  style={{ fontWeight: "700", fontSize: "medium" }}
                >
                  About Bushido
                </a>
              </div>
            </div>
            <div
              id="collapse30"
              className="panel-collapse collapse"
              role="tabpanel"
              aria-labelledby="headingnine"
            >
              <div className="panel-body">
                <ul className="metismenu-container">
                  <li className="metismenu-item">
                    <Link
                      to="/add-and-manage-about-bushido"
                      className="metismenu-link"
                    >
                      Add/Manage About Bushido
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>


        </div>
      </div>
    </>
  );
}
