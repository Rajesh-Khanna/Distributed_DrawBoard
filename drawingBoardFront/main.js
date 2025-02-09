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
        color: 'black',
        thick: 1,
    }
    drawShape() {
        if (this.props && this.props.start) {
            strokeWeight(this.props.thick);
            if (this.props.color == 'eraser') {
                stroke(225);
            } else {
                stroke(this.props.color);
            }
            line(this.props.start.x, this.props.start.y, this.props.end.x, this.props.end.y);
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
    setColor(shapeColor) {
        this.props.color = shapeColor;
    }
    setFont(thickness) {
        this.props.thick = thickness;
    }
}