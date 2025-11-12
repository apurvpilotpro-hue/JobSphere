import React from 'react';
import { Paper, Typography } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ApplicationCharts = () => {
  // This would come from props or context in a real application
  const applicationData = [
    { month: 'Jan', applications: 2 },
    { month: 'Feb', applications: 3 },
    { month: 'Mar', applications: 4 },
    { month: 'Apr', applications: 3 },
    { month: 'May', applications: 5 },
    { month: 'Jun', applications: 3 }
  ];

  const statusData = [
    { name: 'Accepted', value: 2 },
    { name: 'Rejected', value: 18 },
    { name: 'In Progress', value: 0 }
  ];

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Application Trends
      </Typography>
      
      {/* Line Chart for Application Timeline */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={applicationData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="applications"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Pie Chart for Application Status */}
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Application Status
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={statusData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {statusData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default ApplicationCharts;