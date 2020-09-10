import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NumberFormat from 'react-number-format';
import '../../../css/chart.css';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Title from 'reactjs-title';
import Favicon from 'react-favicon';




export default class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state =({
      totalBill: [],
      user:"",
      chartOptions: {
      },
      chartMonth: {}
    })

  }
  totalBill(){
    let d = new Array(31);
    let m = new Array(12);

    d.fill(0);
    m.fill(0);
    axios.get('/api/dashboard/totalBill').then(response =>{
      // console.log(response.data);
      const day = response.data.day;
      const month = response.data.month;
      this.setState({
        totalBill: response.data,
        chartOptions: {
          title: {
            text: "Chart Day to Month " + ((new Date()).getMonth()+1)
          },
          yAxis: {
              title: {
                  text: 'Money'
              }
          },
          xAxis: {
              accessibility: {
                  rangeDescription: 'Range: 1 to 12'
              }
          },
          legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'middle'
          },
          tooltip: {
                  headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                  pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +'<td style="padding:0"><b>{point.y} VND</b></td></tr>',
                  footerFormat: '</table>',
                  shared: true,
                  useHTML: true
                  },
          plotOptions: {
              series: {
                  label: {
                      connectorAllowed: false
                  },
                  pointStart: 1
              }
          },
          series: [{
              name: 'Total money',
              data: d.map((v, i) =>{
                if(day[i+1]){
                   return day[i+1];
                }else{
                  return v;
                }
               
              }),
          }],
          responsive: {
              rules: [{
                  condition: {
                      maxWidth: 500
                  },
                  chartOptions: {
                      legend: {
                          layout: 'horizontal',
                          align: 'center',
                          verticalAlign: 'bottom'
                      }
                  }
              }]
          }
        },
        chartMonth: {
          title: {
            text: "Chart Month Of The Year " + ((new Date()).getFullYear())
          },
          yAxis: {
              title: {
                  text: 'Money'
              }
          },
          xAxis: {
              accessibility: {
                  rangeDescription: 'Range: 1 to 12'
              }
          },
          legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'middle'
          },
          tooltip: {
                  headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                  pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +'<td style="padding:0"><b>{point.y} VND</b></td></tr>',
                  footerFormat: '</table>',
                  shared: true,
                  useHTML: true
                  },
          plotOptions: {
              series: {
                  label: {
                      connectorAllowed: false
                  },
                  pointStart: 1
              }
          },
          series: [{
              name: 'Total money',
              data: m.map((v, i) =>{
                if(month[i+1]){
                   return month[i+1];
                }else{
                  return v;
                }
               
              }),
          }],
          responsive: {
              rules: [{
                  condition: {
                      maxWidth: 500
                  },
                  chartOptions: {
                      legend: {
                          layout: 'horizontal',
                          align: 'center',
                          verticalAlign: 'bottom'
                      }
                  }
              }]
          }
        }
      })
    })
  }

  
  userActive(){
    axios.get('/api/dashboard/userActive').then(response =>{
      this.setState({
        user:response.data

      })
    })
  }
  componentDidMount(){
    this.totalBill();
    this.userActive();
    
  }
  render () {
    if(this.props.isPermission){
    return (
        <>
        <Favicon url="https://image.flaticon.com/icons/svg/1259/1259767.svg" />

        <Title render="Dashboard"/>

             {/* Content Row */}
      <div className="row">
        {/* Earnings (Monthly) Card Example */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Total Price</div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800"><NumberFormat value={this.state.totalBill.total} displayType={'text'} thousandSeparator={true} suffix={' VND'} />
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-dollar-sign fa-2x text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Earnings (Monthly) Card Example */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    User Active</div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.user}</div>
                </div>
                <div className="col-auto">
                  <i className=" fa fa-shoe-prints fa-2x text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Earnings (Monthly) Card Example */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Product Sold : {this.state.totalBill.count_product}
                    <span style={{color: 'blue', fontSize: '1.5rem', marginLeft: '5px'}}>
                    </span>
                  </div>
                  <div className="row no-gutters align-items-center">
                    <div className="col-auto">
                      <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-clipboard-list fa-2x text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Pending Requests Card Example */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="col-auto">
                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                      Total Bills</div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.totalBill.count}</div>
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-calendar fa-2x text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /.container-fluid */}
      <div className="row">
        <div className="col-lg-7 mb-4">
          {/* Illustrations */}
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Total money to day</h6>
            </div>
            <HighchartsReact
              highcharts={Highcharts}
              options={this.state.chartOptions}
            />
          </div>
        </div>
        <div className="col-lg-5 mb-4">
          {/* Chart */}
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Total money to month</h6>
            </div>
            <HighchartsReact
              highcharts={Highcharts}
              options={this.state.chartMonth}
            />
          </div>
        </div>
      </div>
        </>
    );
    }else{
      return(
              <>
                <Title render="Dashboard"/>
                <Favicon url="https://image.flaticon.com/icons/svg/1259/1259767.svg" />


                <div><a href="/">Lỗi</a></div>
              </>

      )
    }
  }
  
}
if (document.getElementById('app')) {
    ReactDOM.render(<Dashboard />, document.getElementById('app'));
}