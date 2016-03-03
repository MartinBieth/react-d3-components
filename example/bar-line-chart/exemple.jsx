var BarChart = ReactD3.BarChart;
var PieChart = ReactD3.PieChart;
var AreaChart = ReactD3.AreaChart;
var ScatterPlot = ReactD3.ScatterPlot;
var LineChart = ReactD3.LineChart;
var Brush = ReactD3.Brush;
var Chart = ReactD3.Chart;
var Axis = ReactD3.Axis;

var tooltip = function (x, y0, y, total) {
    return y.toString();
};

var tooltipScatter = function (x, y) {
    return "x: " + x + " y: " + y;
};

var tooltipPie = function (x, y) {
    return y.toString();
};

var tooltipArea = function (y, cumulative, x) {
    return "Total: " + cumulative + " X: " + x + " Y: " + y;
}

var tooltipLine = function (label, data) {
    return label + " x: " + data.x + " y: " + data.y;
}

data = [{
    customLabel: 'somethingA',
    customValues: [['SomethingA', 10], ['SomethingB', 4], ['SomethingC', 3]]
}];
var labelAccessor = function (stack) {
    return stack.customLabel;
};
var valuesAccessor = function (stack) {
    return stack.customValues;
};
var xAccessor = function (element) {
    return element[0];
};
var yAccessor = function (element) {
    return element[1];
};

var MyBarChart = React.createClass({
    getInitialState: function () {
        return {};
    },

    componentDidMount: function () {
    },

    render: function () {

        var xScale = d3.scale.ordinal()
            .domain(valuesAccessor(data[0]).map(e => {
                return xAccessor(e);
            }))
            .rangeRoundBands([0, 400 - 50 - 10], 0.5);

        var xScaleShifted = function (x) {
            return xScale(x) + xScale.rangeBand() / 2;
        }

        var colorScale = d3.scale.ordinal().range(['#ff7f0e', '#2ca02c']);
        return (
            <Chart
                data={data}
                width={400}
                height={400}
                margin={{top: 10, bottom: 50, left: 50, right: 10}}
                tooltipHtml={tooltip}
                label={labelAccessor}
                x={xAccessor}
                y={yAccessor}
                values={valuesAccessor}>
                <Axis
                    className={'x axis'}
                    orientation={'bottom'}
                    label={'Age'}
                    innerTickSize={5}
                    scale={xScale}/>
                <Axis
                    className={"y axis"}
                    orientation={'left'}
                    label={'Funds'}
                    innerTickSize={5}
                    scale={'y'}/>
                <BarChart
                    data={data}
                    label={labelAccessor}
                    x={xAccessor}
                    y={yAccessor}
                    values={valuesAccessor}
                    xScale={xScale}/>
                <LineChart
                    data={data}
                    label={labelAccessor}
                    x={xAccessor}
                    y={yAccessor}
                    values={valuesAccessor}
                    xScale={xScaleShifted}
                    colorScale={colorScale}/>
                <ScatterPlot
                    data={data}
                    label={labelAccessor}
                    x={xAccessor}
                    y={yAccessor}
                    values={valuesAccessor}
                    xScale={xScaleShifted}
                    colorScale={colorScale}/>
            </Chart>
        );
    }
});

React.render(<MyBarChart/>, document.getElementById('exemple'));
