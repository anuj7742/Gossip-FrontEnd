import React from "react";
import { Line, Doughnut } from "react-chartjs-2"

import {
    CategoryScale,
    Chart as ChartJS,
    Tooltip,
    Filler,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Legend,
} from "chart.js";
import { getLast7Days } from "../../lib/features";
import { richblue, yellow } from "../../constants/color";

ChartJS.register(
    CategoryScale,
    Tooltip,
    Filler,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Legend,
)

const labels = getLast7Days()

const lineChartOptions = {
    resposive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        }
    },
    scales: {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            beginAtZero: true,
            grid: {
                display: false
            }
        }
    }
};

const LineChart = ({value=[]}) => {

    const data = {
        labels,
        datasets: [
            {
                data: value,
                label: "Messages",
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: " rgba(75,192,192,1)",
            },
        ]
    }
    return (
        <Line data={data} options={lineChartOptions} />
    )
}

const doughnutChartOptions = {
    resposive: true,
    plugins: {
        legend: {
            display: false,
        },
    },
    cutout: 120,
};

const DoughnutChart = ({value=[], labels = [] }) => {

    const data = {
        labels,
        datasets: [
            {
                data: value,
                backgroundColor: [yellow[300], richblue[300]],
                hoverBackgroundColor: [yellow[400], richblue[400]],
                borderColor: [yellow[600], richblue[600]],
                offset: 20
            },
        ]
    }


    return <Doughnut style={{zIndex: 10}} data={data} options={doughnutChartOptions}/>
}

export { LineChart, DoughnutChart }