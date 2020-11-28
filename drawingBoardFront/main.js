class Shape {
    props = {
        start: {
            x: 0,
            y: 0,
        },
        end: {
            x: 0,
            y: 0,
        },
        type: 'line',
        color: 'black',
        thick: 5,
        text: ''
    }

    drawShape() {
        switch (this.props.type) {
            case 'circle':
                const radius = Math.sqrt((this.props.end.x - this.props.start.x) ** 2 + (this.props.end.y - this.props.start.y) ** 2);
                ellipse(this.props.start.x, this.props.start.y, radius * 2, radius * 2);
                break;
            case 'rectangle':
                rect(this.props.start.x, this.props.start.y, this.props.end.x - this.props.start.x, this.props.end.y - this.props.start.y);
                break;
            case 'text':
                text(this.props.text, 0, 0);
                break;
            default:
                line(this.props.start.x, this.props.start.y, this.props.end.x, this.props.end.y);
                break;
        }
    }
    clone() {
        return JSON.parse(JSON.stringify(this.props));
    }
    copy(props) {
        this.props = {...props };
    }
}

class activeShape extends Shape {
    setStart(x, y) {
        this.props.start.x = x;
        this.props.start.y = y;
    }
    setEnd(x, y) {
        this.props.end.x = x;
        this.props.end.y = y;
    }
    setType(shapetype) {
        this.props.type = shapetype;
    }
    setColor(shapeColor) {
        this.props.color = shapeColor;
    }
    setText(iptext) {
        this.props.text = iptext;
    }
}