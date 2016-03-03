let BarChart = require('./BarChart');
let Waveform = require('./Waveform');
let PieChart = require('./PieChart');
let ScatterPlot = require('./ScatterPlot');
let LineChart = require('./LineChart');
let AreaChart = require('./AreaChart');
let Brush = require('./Brush');
let Coordinates = require('./Coordinates');
let Line = require('./plot/Line');
let d3 = require('d3');

module.exports = {
    BarChart: BarChart,
    PieChart: PieChart,
    ScatterPlot: ScatterPlot,
    LineChart: LineChart,
    AreaChart: AreaChart,
    Waveform: Waveform,
    Brush: Brush,
    d3: d3,
    Coordinates: Coordinates,
    Line: Line
};
