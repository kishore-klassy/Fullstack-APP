
import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const Dashboard = () => {
    const sampleData = [
        { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
        { name: 'Page B', uv: 300, pv: 2300, amt: 2200 },
    ];

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Dashboard</h1>
            </header>
            <aside className="dashboard-sidebar">
                <nav>
                    <ul>
                        <li>Menu Item 1</li>
                        <li>Menu Item 2</li>
                    </ul>
                </nav>
            </aside>
            <main className="dashboard-main">
                <div className="visualization-container">
                    <h2>Data Visualization Placeholder</h2>
                    <LineChart width={600} height={300} data={sampleData}>
                        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                    </LineChart>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
