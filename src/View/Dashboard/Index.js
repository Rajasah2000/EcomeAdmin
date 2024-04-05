import React, { useEffect, useState } from 'react'
import Table from '../../Component/Table'
import { reactLocalStorage } from 'reactjs-localstorage';
import Helpers from '../../Utils/Helpers';
import ContextProvider, { useContextProvider } from '../../Context/ContextProvider';
import { Pie } from 'react-chartjs-2';
import ReactApexChart from 'react-apexcharts';
export default function Index() {
    const apexOptions = {
    // ApexCharts options
    // Example options
    chart: {
      id: 'apex-chart',
    },
    series: [{
      name: 'series-1',
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    }],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    },
  };

 const pieData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    }],
  };

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

       {/* <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, marginRight: '20px' }}>
        <h2>Apex Chart</h2>
        <ReactApexChart options={apexOptions} series={apexOptions.series} type="line" height={350} />
      </div>
      <div style={{ flex: 1 }}>
        <h2>Pie Chart</h2>
        <Pie data={pieData} />
      </div>
    </div> */}

    </>


  )
}
