// import React from 'react';
// import { Card, Col, Row } from 'react-bootstrap';
// // import { Bar, Pie } from 'react-chartjs-2';
// // import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// const DashboardMain = () => {
//     const barChartData = {
//         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//         datasets: [{
//             label: 'Projects Completed',
//             data: [65, 59, 80, 81, 56, 55, 40],
//             backgroundColor: 'rgba(75, 192, 192, 0.2)',
//             borderColor: 'rgba(75, 192, 192, 1)',
//             borderWidth: 1
//         }]
//     };

//     const pieChartData = {
//         labels: ['Total Projects', 'Pending Projects', 'Running Projects', 'Completed Projects'],
//         datasets: [{
//             data: [100, 20, 30, 50],
//             backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
//         }]
//     };

//     const barChartOptions = {
//         responsive: true,
//         maintainAspectRatio: false,
//         plugins: {
//             legend: {
//                 display: true,
//             },
//             title: {
//                 display: true,
//                 text: 'Projects Over Time',
//             },
//         },
//     };

//     const pieChartOptions = {
//         responsive: true,
//         maintainAspectRatio: false,
//         plugins: {
//             legend: {
//                 display: true,
//             },
//             title: {
//                 display: true,
//                 text: 'Projects Breakdown',
//             },
//         },
//     };

//     return (
//         <div>
//             <h1>Dashboard</h1>
//             <Row className="cards-row">
//                 <Col md={3}>
//                     <Card>
//                         <Card.Body>
//                             <Card.Title>Total Projects</Card.Title>
//                             <Card.Text>100</Card.Text>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//                 <Col md={3}>
//                     <Card>
//                         <Card.Body>
//                             <Card.Title>Pending Projects</Card.Title>
//                             <Card.Text>20</Card.Text>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//                 <Col md={3}>
//                     <Card>
//                         <Card.Body>
//                             <Card.Title>Running Projects</Card.Title>
//                             <Card.Text>30</Card.Text>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//                 <Col md={3}>
//                     <Card>
//                         <Card.Body>
//                             <Card.Title>Completed Projects</Card.Title>
//                             <Card.Text>50</Card.Text>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             </Row>
//             <Row className="charts-row">
//                 <Col md={6}>
//                     <Card>
//                         <Card.Body>
//                             <Card.Title>Projects Over Time</Card.Title>
//                             <div style={{ height: '400px' }}>
//                                 <Bar data={barChartData} options={barChartOptions} />
//                             </div>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//                 <Col md={6}>
//                     <Card>
//                         <Card.Body>
//                             <Card.Title>Projects Breakdown</Card.Title>
//                             <div style={{ height: '400px' }}>
//                                 <Pie data={pieChartData} options={pieChartOptions} />
//                             </div>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             </Row>
//         </div>
//     );
// }

// export default DashboardMain;
