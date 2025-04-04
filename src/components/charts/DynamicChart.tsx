
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadialBarChart, RadialBar, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartProps {
  type: 'line' | 'bar' | 'area' | 'pie' | 'radialBar';
  title: string;
  description?: string;
  height?: number;
  dataKey?: string;
  secondaryDataKey?: string;
  colors?: string[];
  showGrid?: boolean;
  showLegend?: boolean;
  refreshInterval?: number | null;
}

const defaultColors = ['#4285F4', '#0F9D58', '#DB4437', '#F4B400', '#673AB7', '#FF6D00', '#2196F3', '#009688'];

const DynamicChart: React.FC<ChartProps> = ({ 
  type, 
  title, 
  description, 
  height = 300, 
  dataKey = 'value', 
  secondaryDataKey,
  colors = defaultColors, 
  showGrid = true, 
  showLegend = true,
  refreshInterval = null 
}) => {
  const [data, setData] = useState<any[]>([]);
  
  // Generate random data for the chart
  const generateData = () => {
    if (type === 'pie' || type === 'radialBar') {
      return [
        { name: 'Category A', value: Math.floor(Math.random() * 100) + 20 },
        { name: 'Category B', value: Math.floor(Math.random() * 100) + 20 },
        { name: 'Category C', value: Math.floor(Math.random() * 100) + 20 },
        { name: 'Category D', value: Math.floor(Math.random() * 100) + 20 },
      ];
    } else {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
      return months.map(month => {
        const value = Math.floor(Math.random() * 100) + 20;
        const secondary = secondaryDataKey ? Math.floor(Math.random() * 100) + 20 : undefined;
        
        return {
          name: month,
          [dataKey]: value,
          ...(secondaryDataKey && { [secondaryDataKey]: secondary })
        };
      });
    }
  };
  
  useEffect(() => {
    setData(generateData());
    
    // Set up auto-refresh if interval is provided
    if (refreshInterval) {
      const interval = setInterval(() => {
        setData(generateData());
      }, refreshInterval);
      
      return () => clearInterval(interval);
    }
  }, []);
  
  // Render the appropriate chart based on type
  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={data}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" />}
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              {showLegend && <Legend />}
              <Line type="monotone" dataKey={dataKey} stroke={colors[0]} strokeWidth={2} name={dataKey} />
              {secondaryDataKey && <Line type="monotone" dataKey={secondaryDataKey} stroke={colors[1]} strokeWidth={2} name={secondaryDataKey} />}
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart data={data}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" />}
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              {showLegend && <Legend />}
              <Bar dataKey={dataKey} fill={colors[0]} name={dataKey} radius={[4, 4, 0, 0]} />
              {secondaryDataKey && <Bar dataKey={secondaryDataKey} fill={colors[1]} name={secondaryDataKey} radius={[4, 4, 0, 0]} />}
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <AreaChart data={data}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" />}
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              {showLegend && <Legend />}
              <Area type="monotone" dataKey={dataKey} stroke={colors[0]} fill={colors[0]} name={dataKey} fillOpacity={0.3} />
              {secondaryDataKey && <Area type="monotone" dataKey={secondaryDataKey} stroke={colors[1]} fill={colors[1]} name={secondaryDataKey} fillOpacity={0.3} />}
            </AreaChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={40}
                label={(entry) => entry.name}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
              {showLegend && <Legend />}
            </PieChart>
          </ResponsiveContainer>
        );
      
      case 'radialBar':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <RadialBarChart 
              cx="50%" 
              cy="50%" 
              innerRadius="20%" 
              outerRadius="80%" 
              barSize={10} 
              data={data}
            >
              <RadialBar
                background
                dataKey="value"
                label={{ position: "insideStart", fill: "#666", fontSize: 12 }}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </RadialBar>
              <Tooltip />
              {showLegend && <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />}
            </RadialBarChart>
          </ResponsiveContainer>
        );
      
      default:
        return <div>Chart type not supported</div>;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {renderChart()}
      </CardContent>
    </Card>
  );
};

export default DynamicChart;
