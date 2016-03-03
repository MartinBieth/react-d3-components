let React = require('react');
let d3 = require('d3');

let Chart = require('./Chart');
let Axis = require('./Axis');
let Tooltip = require('./Tooltip');

let DefaultPropsMixin = require('./DefaultPropsMixin');
let HeightWidthMixin = require('./HeightWidthMixin');
let ArrayifyMixin = require('./ArrayifyMixin');
let DefaultScalesMixin = require('./DefaultScalesMixin');
let TooltipMixin = require('./TooltipMixin');

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

let Coordinates = React.createClass({
    propTypes: {
        label: React.PropTypes.func,
        values: React.PropTypes.func,
        x: React.PropTypes.func,
        y: React.PropTypes.func,
        y0: React.PropTypes.func
    },

    mixins: [DefaultPropsMixin,
        HeightWidthMixin,
        ArrayifyMixin,
        DefaultScalesMixin,
        TooltipMixin],

    getDefaultProps() {
        return {
            shape: 'circle',
            shapeColor: null,
            x: xAccessor,
            y: yAccessor,
            y0: e => { return 0; },
            values: valuesAccessor,
            label: labelAccessor
        };
    },


    /*
     stroke,
     strokeWidth,
     strokeLinecap,
     strokeDasharray,
     */
    render() {

        let {height,
            width,
            margin,
            colorScale,
            stroke,
            values,
            label,
            x,
            y,
            xAxis,
            yAxis,
            shape,
            shapeColor} = this.props;

        let [data,
            innerWidth,
            innerHeight,
            xScale,
            yScale,
            xIntercept,
            yIntercept] = [this._data,
            this._innerWidth,
            this._innerHeight,
            this._xScale,
            this._yScale,
            this._xIntercept,
            this._yIntercept];

        let tooltipSymbol;
        if (!this.state.tooltip.hidden) {
            let symbol = d3.svg.symbol().type(shape);
            let symbolColor = shapeColor ? shapeColor : colorScale(this._tooltipData.label);

            let translate = this._tooltipData ? `translate(${xScale(x(this._tooltipData.value))}, ${yScale(y(this._tooltipData.value))})` : "";
            tooltipSymbol = this.state.tooltip.hidden ? null :
                <path
                    className="dot"
                    d={symbol()}
                    transform={translate}
                    fill={symbolColor}
                    onMouseEnter={evt => { this.onMouseEnter(evt, data); }}
                    onMouseLeave={evt => { this.onMouseLeave(evt); }}
                />;
        }

        return (
            <div>
                <Chart height={height} width={width} margin={margin}>
                    <Axis
                        className={'x axis'}
                        orientation={'bottom'}
                        scale={xScale}
                        height={innerHeight}
                        width={innerWidth}
                        zero={yIntercept}
                        {...xAxis}
                    />

                    <Axis
                        className={'y axis'}
                        orientation={'left'}
                        scale={yScale}
                        height={innerHeight}
                        width={innerWidth}
                        zero={xIntercept}
                        {...yAxis}
                    />
                    { this.props.children }
                    {tooltipSymbol}

                </Chart>

                <Tooltip {...this.state.tooltip}/>
            </div>
        );
    }
});

module.exports = Coordinates;
