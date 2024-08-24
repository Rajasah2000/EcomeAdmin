import React from "react";
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
                  style={{ fontWeight: '700', fontSize: '18px', fontSize: 'medium' }}
                >
                  DASHBOARD
                </Link>
              </li>
            </ul>
          </div>

          <div className="panel-group" id="accordionMenu" role="tablist" aria-multiselectable="true"></div>

          {/* Banner Section   */}

          <div className="panel panel-default metismenu vertical-nav-menu">
            <div className="panel-heading metismenu-container" role="tab" id="headingnine131">
              <div className="panel-title metismenu-item">
                <a
                  className="collapsed metismenu-link"
                  role="button"
                  data-toggle="collapse"
                  data-parent="#accordionMenu"
                  href="#collapse3113"
                  aria-expanded="false"
                  aria-controls="collapseTen"
                  style={{ fontWeight: '700', fontSize: 'medium' }}
                >
                  Banner
                </a>
              </div>
            </div>
            <div id="collapse3113" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingnine131">
              <div className="panel-body">
                <ul className="metismenu-container">
                  <li className="metismenu-item">
                    <Link to="/add-and-manage-banner" className="metismenu-link">
                      Add And Manage Banner
                    </Link>
                  
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="panel panel-default metismenu vertical-nav-menu">
            {/* <div className="panel-heading metismenu-container" role="tab" id="headingone">
              <div className="panel-title metismenu-item">
                <a
                  className="collapsed metismenu-link"
                  role="button"
                  data-toggle="collapse"
                  data-parent="#accordionMenu"
                  href="#collapseEleven"
                  aria-expanded="false"
                  aria-controls="collapseEleven"
                  style={{ fontWeight: '700', fontSize: 'medium' }}
                >
                  E-Store
                </a>
              </div>
            </div> */}
            <div id="collapseEleven" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingone">
              <div className="panel-body">
                <div className="panel panel-default metismenu vertical-nav-menu">
                  <div className="panel-heading metismenu-container" role="tab" id="heading1">
                    <div className="panel-title metismenu-item">
                      <a
                        className="collapsed metismenu-link"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordionMenu"
                        href="#collapseNine"
                        aria-expanded="false"
                        aria-controls="collapseNine"
                        style={{ fontWeight: '700', fontSize: 'medium' }}
                      >
                        {/* <i class="metismenu-icon fa-brands fa-searchengin"></i> */}
                        Category
                      </a>
                    </div>
                  </div>
                  <div id="collapseNine" className="panel-collapse collapse" role="tabpanel" aria-labelledby="heading1">
                    <div className="panel-body">
                      <ul className="metismenu-container">
                        <li className="metismenu-item">
                          <Link to="/add-manage-category" className="metismenu-link">
                            Add/Manage Category
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
            <div className="panel-heading metismenu-container" role="tab" id="headingnine">
              <div className="panel-title metismenu-item">
                <a
                  className="collapsed metismenu-link"
                  role="button"
                  data-toggle="collapse"
                  data-parent="#accordionMenu"
                  href="#collapse30"
                  aria-expanded="false"
                  aria-controls="collapseTen"
                  style={{ fontWeight: '700', fontSize: 'medium' }}
                >
                  Category
                </a>
              </div>
            </div>
            <div id="collapse30" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingnine">
              <div className="panel-body">
                <ul className="metismenu-container">
                  <li className="metismenu-item">
                    <Link to="/add-and-manage-category" className="metismenu-link">
                      Add And Manage Category
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="panel panel-default metismenu vertical-nav-menu">
            <div className="panel-heading metismenu-container" role="tab" id="headingnine1">
              <div className="panel-title metismenu-item">
                <a
                  className="collapsed metismenu-link"
                  role="button"
                  data-toggle="collapse"
                  data-parent="#accordionMenu"
                  href="#collapse31"
                  aria-expanded="false"
                  aria-controls="collapseTen"
                  style={{ fontWeight: '700', fontSize: 'medium' }}
                >
                  Product
                </a>
              </div>
            </div>
            <div id="collapse31" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingnine1">
              <div className="panel-body">
                <ul className="metismenu-container">
                  <li className="metismenu-item">
                    <Link to="/add-product" className="metismenu-link">
                      Add Product
                    </Link>
                    <Link to="/manage-product" className="metismenu-link">
                      Manage Product
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* <div className="panel panel-default metismenu vertical-nav-menu">
            <div className="panel-heading metismenu-container" role="tab" id="headingnine2">
              <div className="panel-title metismenu-item">
                <a
                  className="collapsed metismenu-link"
                  role="button"
                  data-toggle="collapse"
                  data-parent="#accordionMenu"
                  href="#collapse32"
                  aria-expanded="false"
                  aria-controls="collapseTen"
                  style={{ fontWeight: '700', fontSize: 'medium' }}
                >
                  Trending Product
                </a>
              </div>
            </div>
            <div id="collapse32" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingnine2">
              <div className="panel-body">
                <ul className="metismenu-container">
                  <li className="metismenu-item">
                    <Link to="/add-trending-product" className="metismenu-link">
                     Add Product
                    </Link>
                    <Link to="/manage-trending-product" className="metismenu-link">
                     Manage Product
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

           <div className="panel panel-default metismenu vertical-nav-menu">
            <div className="panel-heading metismenu-container" role="tab" id="headingnine3">
              <div className="panel-title metismenu-item">
                <a
                  className="collapsed metismenu-link"
                  role="button"
                  data-toggle="collapse"
                  data-parent="#accordionMenu"
                  href="#collapse33"
                  aria-expanded="false"
                  aria-controls="collapseTen"
                  style={{ fontWeight: '700', fontSize: 'medium' }}
                >
                  Best Selling Product
                </a>
              </div>
            </div>
            <div id="collapse33" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingnine3">
              <div className="panel-body">
                <ul className="metismenu-container">
                  <li className="metismenu-item">
                    <Link to="/add-best-product" className="metismenu-link">
                     Add Product
                    </Link>
                    <Link to="/manage-best-product" className="metismenu-link">
                     Manage Product
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

            <div className="panel panel-default metismenu vertical-nav-menu">
            <div className="panel-heading metismenu-container" role="tab" id="headingnine4">
              <div className="panel-title metismenu-item">
                <a
                  className="collapsed metismenu-link"
                  role="button"
                  data-toggle="collapse"
                  data-parent="#accordionMenu"
                  href="#collapse34"
                  aria-expanded="false"
                  aria-controls="collapseTen"
                  style={{ fontWeight: '700', fontSize: 'medium' }}
                >
                  Deals On audioProduct
                </a>
              </div>
            </div>
            <div id="collapse34" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingnine4">
              <div className="panel-body">
                <ul className="metismenu-container">
                  <li className="metismenu-item">
                    <Link to="/add-deals-product" className="metismenu-link">
                     Add Product
                    </Link>
                    <Link to="/manage-deals-product" className="metismenu-link">
                     Manage Product
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
