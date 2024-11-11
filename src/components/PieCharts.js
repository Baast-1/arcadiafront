'use client';

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const PieChart = ({ data }) => {
    const colors = data.map(() => getRandomColor());

    const chartData = {
        labels: data.map(animal => animal.name),
        datasets: [
            {
                data: data.map(animal => animal.view),
                backgroundColor: colors,
                hoverBackgroundColor: colors,
            },
        ],
    };

    return <Pie data={chartData} />;
};

export default PieChart;