var Coordinates = ReactD3.Coordinates;
var Line = ReactD3.Line;

data = [
    {
        customLabel: 'somethingA',
        customValues: [['SomethingA', -10], ['SomethingB', 4], ['SomethingC', 3]]
    },
    {
        customLabel: 'somethingOther',
        customValues: [['SomethingA', 32], ['SomethingB', 2], ['SomethingC', 10]]
    }
];

var MyBarChart2 = React.createClass({

    render: function () {

        return (
            <Coordinates
                data={data}
                width={400}
                height={400}
                margin={{top: 10, bottom: 50, left: 50, right: 10}}
            >

            </Coordinates>
        );
    }
});

React.render(<MyBarChart2/>, document.getElementById('container'));

// <Line data={[data[0]]}></Line>
