import React, { useState } from 'react'
import Table from '../../Component/Table'


export default function Index() {


  return (
    <>
      <div className=''>
        <div className=''>
          <div className="row">
            <div className="col-md-6 col-lg-3">
              <div className="card-shadow-danger mb-3 widget-chart widget-chart2 text-start card">
                <div className="widget-content">
                  <div className="widget-content-outer">
                    <div className="widget-content-wrapper">
                      <div className="widget-content-left pe-2 fsize-1">
                        <div className="widget-numbers mt-0 fsize-3 text-danger">71%</div>
                      </div>
                      <div className="widget-content-right w-100">
                        <div className="progress-bar-xs progress">
                          <div
                            className="progress-bar bg-danger"
                            role="progressbar"
                            aria-valuenow={71}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            style={{ width: "71%" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="widget-content-left fsize-1">
                      <div className="text-muted opacity-6">Total Sub Admin</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card-shadow-success mb-3 widget-chart widget-chart2 text-start card">
                <div className="widget-content">
                  <div className="widget-content-outer">
                    <div className="widget-content-wrapper">
                      <div className="widget-content-left pe-2 fsize-1">
                        <div className="widget-numbers mt-0 fsize-3 text-success">
                          54%
                        </div>
                      </div>
                      <div className="widget-content-right w-100">
                        <div className="progress-bar-xs progress">
                          <div
                            className="progress-bar bg-success"
                            role="progressbar"
                            aria-valuenow={54}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            style={{ width: "54%" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="widget-content-left fsize-1">
                      <div className="text-muted opacity-6">Total Merchant</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card-shadow-warning mb-3 widget-chart widget-chart2 text-start card">
                <div className="widget-content">
                  <div className="widget-content-outer">
                    <div className="widget-content-wrapper">
                      <div className="widget-content-left pe-2 fsize-1">
                        <div className="widget-numbers mt-0 fsize-3 text-warning">
                          32%
                        </div>
                      </div>
                      <div className="widget-content-right w-100">
                        <div className="progress-bar-xs progress">
                          <div
                            className="progress-bar bg-warning"
                            role="progressbar"
                            aria-valuenow={32}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            style={{ width: "32%" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="widget-content-left fsize-1">
                      <div className="text-muted opacity-6">Total User</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card-shadow-info mb-3 widget-chart widget-chart2 text-start card">
                <div className="widget-content">
                  <div className="widget-content-outer">
                    <div className="widget-content-wrapper">
                      <div className="widget-content-left pe-2 fsize-1">
                        <div className="widget-numbers mt-0 fsize-3 text-info">89%</div>
                      </div>
                      <div className="widget-content-right w-100">
                        <div className="progress-bar-xs progress">
                          <div
                            className="progress-bar bg-info"
                            role="progressbar"
                            aria-valuenow={89}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            style={{ width: "89%" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="widget-content-left fsize-1">
                      <div className="text-muted opacity-6">Total Activity</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

         

        </div>

      </div>
     {/* <Table /> */}

    </>


  )
}
