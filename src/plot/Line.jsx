let React = require('react');

let Path = require('../Path');

let ArrayifyMixin = require('../ArrayifyMixin');
let TooltipMixin = require('../TooltipMixin');
let DefaultScalesMixin = require('../DefaultScalesMixin');


var xAccessor = function (element) {
    return element[0];
};
var yAccessor = function (element) {
    return element[1];
};

let Line = React.createClass({
    mixins: [ArrayifyMixin, DefaultScalesMixin, TooltipMixin],

    getDefaultProps() {
        return {
            colorScale: d3.scale.category20(),
            label: stack => { return stack.label; },
            values: stack => { return stack.values; },
            x: xAccessor,
            y: yAccessor,
            interpolate: 'linear',
            defined: () => true
        };
    },

	propTypes: {
		data: React.PropTypes.array.isRequired,
		colorScale: React.PropTypes.func.isRequired
	},

	render() {
		let {width,
			 height,
			 strokeWidth,
			 strokeLinecap,
			 strokeDasharray,
			 colorScale,
             defined,
             interpolate,
			 values,
			 label} = this.props;

        let [data,
            xScale,
            yScale] = [this._data,
            this._xScale,
            this._yScale];

        let line = d3.svg.line()
            .x(function(e) { return xScale(x(e)); })
            .y(function(e) { return yScale(y(e)); })
            .interpolate(interpolate)
            .defined(defined);

		let sizeId = width + 'x' + height;

		let lines = data.map((stack, index) => {
			return (
					<Path
				key={`${label(stack)}.${index}`}
				className={'line'}
				d={line(values(stack))}
				stroke={colorScale(label(stack))}
				strokeWidth={typeof strokeWidth === 'function' ? strokeWidth(label(stack)) : strokeWidth}
				strokeLinecap={typeof strokeLinecap === 'function' ? strokeLinecap(label(stack)) : strokeLinecap}
				strokeDasharray={typeof strokeDasharray === 'function' ? strokeDasharray(label(stack)) : strokeDasharray}
				data={values(stack)}
				onMouseEnter={this.onMouseEnter}
				onMouseLeave={this.onMouseLeave}
				style={{clipPath: `url(#lineClip_${sizeId})`}}
					/>
			);
		});

		/*
		 The <rect> below is needed in case we want to show the tooltip no matter where on the chart the mouse is.
		 Not sure if this should be used.
		 */
		return (
				<g>
					  <defs>
					<clipPath id={`lineClip_${sizeId}`}>
						<rect width={width} height={height}/>
					</clipPath>
				</defs>
				{lines}
				<rect width={width} height={height} fill={'none'} stroke={'none'} style={{pointerEvents: 'all'}}
			onMouseMove={ evt => { this.onMouseEnter(evt, data); } }
			onMouseLeave={  evt => { this.onMouseLeave(evt); } }
				/>
			</g>
		);
	}
});


module.exports = Line;
