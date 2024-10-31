import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './Dashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Metric {
  carbonEmissions: number;
  waterUsage: number;
  wasteGenerated: number;
}

interface ChartDataset {
  label: string;
  data: number[];
  borderColor: string;
  borderWidth: number;
  fill: boolean;
  borderDash?: number[];
}

interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<Metric>({
    carbonEmissions: 0,
    waterUsage: 0,
    wasteGenerated: 0,
  });

  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      { label: 'Carbon Emissions', data: [], borderColor: 'rgba(75, 192, 192, 1)', borderWidth: 2, fill: false },
      { label: 'Water Usage', data: [], borderColor: 'rgba(54, 162, 235, 1)', borderWidth: 2, fill: false },
      { label: 'Waste Generated', data: [], borderColor: 'rgba(255, 99, 132, 1)', borderWidth: 2, fill: false },
      { label: 'Industry Carbon Emissions Benchmark', data: [10, 9, 8, 7, 6], borderColor: 'rgba(75, 192, 192, 0.5)', borderDash: [5, 5], borderWidth: 2, fill: false },
      { label: 'Industry Water Usage Benchmark', data: [12, 11, 10, 9, 8], borderColor: 'rgba(54, 162, 235, 0.5)', borderDash: [5, 5], borderWidth: 2, fill: false },
      { label: 'Industry Waste Generated Benchmark', data: [5, 6, 5, 6, 5], borderColor: 'rgba(255, 99, 132, 0.5)', borderDash: [5, 5], borderWidth: 2, fill: false },
    ],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMetrics((prev) => ({
      ...prev,
      [name]: parseFloat(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Convert yearLabels to strings
    const yearLabels = Array.from({ length: 5 }, (_, i) => (2023 - i).toString());
  
    setChartData((prev) => ({
      labels: yearLabels,
      datasets: [
        { ...prev.datasets[0], data: [...prev.datasets[0].data, metrics.carbonEmissions] },
        { ...prev.datasets[1], data: [...prev.datasets[1].data, metrics.waterUsage] },
        { ...prev.datasets[2], data: [...prev.datasets[2].data, metrics.wasteGenerated] },
        ...prev.datasets.slice(3),
      ],
    }));
  
    setMetrics({ carbonEmissions: 0, waterUsage: 0, wasteGenerated: 0 });
  };
  

  const handleDownload = () => {
    const jsonData = {
      metrics: {
        carbonEmissions: chartData.datasets[0].data,
        waterUsage: chartData.datasets[1].data,
        wasteGenerated: chartData.datasets[2].data,
      },
      labels: chartData.labels,
      industryBenchmarks: {
        carbonEmissions: chartData.datasets[3].data,
        waterUsage: chartData.datasets[4].data,
        wasteGenerated: chartData.datasets[5].data,
      },
    };

    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'metrics-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleLogout = async () => {
    try {
      await axios.post("https://sustainanility-dashboard.onrender.com/api/auth/logout", {}, { withCredentials: true });
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Interactive Sustainability Dashboard</h1>

      <div className="dashboard-content">
        <form onSubmit={handleSubmit} className="dashboard-form">
          <div className="form-group">
            <label>Carbon Emissions</label>
            <input type="number" name="carbonEmissions" value={metrics.carbonEmissions} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Water Usage</label>
            <input type="number" name="waterUsage" value={metrics.waterUsage} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Waste Generated</label>
            <input type="number" name="wasteGenerated" value={metrics.wasteGenerated} onChange={handleChange} required />
          </div>
          <button type="submit" className="primary-button">Add Metrics</button>

          <div className="dashboard-actions">
            <button onClick={handleDownload} className="secondary-button">Download Data as JSON</button>
            <button onClick={handleLogout} className="secondary-button logout">Logout</button>
          </div>
        </form>

        <div className="chart-container">
          <Line data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
