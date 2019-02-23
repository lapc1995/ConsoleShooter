import React from 'react';

class ConsoleShooter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerX : 8.0,
            playerY : 8.0,
            playerA : 0.0,
        }
        this.onKeyPressed = this.onKeyPressed.bind(this);
        this.mapHeight = 16;
        this.mapWidth = 16;
        this.fov = 3.14159 / 4.0;
        this.depth = 16.0;

        this.map = '';

        this.map += '################';
        this.map += '#..............#';
        this.map += '#..............#';
        this.map += '#..............#';
        this.map += '#..............#';
        this.map += '#..............#';
        this.map += '#..............#';
        this.map += '#..............#';
        this.map += '#..............#';
        this.map += '#..............#';
        this.map += '#..............#';
        this.map += '#......#.......#';
        this.map += '#..............#';
        this.map += '#..............#';
        this.map += '#..............#';
        this.map += '################';

    }

    componentDidMount() {
        document.addEventListener("keydown", this.onKeyPressed, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.onKeyPressed, false);
    }

    onKeyPressed(e) {
        var new_playerA = this.state.playerA;
        var new_playerX = this.state.playerX;
        var new_playerY = this.state.playerY;
        if(e.key === 'a')
            new_playerA -= 0.1;
        else if(e.key === 'd')
            new_playerA += 0.1;
        else if(e.key === 'w') {
            var aux_playerX = new_playerX + Math.sin(new_playerA) * 2.0;
            var aux_playerY = new_playerY + Math.cos(new_playerA) * 2.0;

            if(!(this.map[Math.floor(aux_playerY) * this.mapWidth + Math.floor(aux_playerX )] == '#')) {
                new_playerX = aux_playerX;
                new_playerY = aux_playerY;
            } 


        } else if(e.key === 's') {
            var aux_playerX = new_playerX - Math.sin(new_playerA) * 2.0;
            var aux_playerY = new_playerY - Math.cos(new_playerA) * 2.0;
            if(!(this.map[Math.floor(aux_playerY) * this.mapWidth + Math.floor(aux_playerX )] == '#')) {
                new_playerX = aux_playerX;
                new_playerY = aux_playerY;
            } 
        }

        this.setState({
            playerA: new_playerA,
            playerX: new_playerX,
            playerY : new_playerY,
        });
        
    }

    render() {
        
            var new_screen = new Array(this.props.height * this.props.width).fill('\xa0');
            
            for(var i = 0; i < this.props.width; i++) {
                var rayAngle = (this.state.playerA - this.fov / 2.0) + ((i * 1.0) / (this.props.width * 1.0)) * this.fov;
                
                var distanceToWall = 0.0;
                var hitWall = false;
                var hitBoundry = false;

                var eyeX = Math.sin(rayAngle);
                var eyeY = Math.cos(rayAngle);

                while(!hitWall && distanceToWall < this.depth) {
                    distanceToWall += 0.1;
                    var testX = Math.floor(this.state.playerX + eyeX * distanceToWall)
                    var testY = Math.floor(this.state.playerY + eyeY * distanceToWall)

                    if (testX < 0 || testY >= this.mapWidth || testY < 0 || testY >= this.mapHeight) {
                        hitWall = true;
                        distanceToWall = this.depth;
                    } else {
                        if (this.map[testY * this.mapWidth + testX] == '#') {
                            hitWall = true;

                            var p = []; // distance , dot
                            for(var tx = 0; tx < 2; tx++) {
                                for(var ty = 0; ty < 2; ty++) {
                                    var vy = (1.0 * testY) + ty - this.state.playerY;
                                    var vx = (1.0 * testX) + tx - this.state.playerX;
                                    var d = Math.sqrt(vx*vx + vy*vy);
                                    var dot = (eyeX * vx / d) + (eyeY * vy / d);
                                    p.push([d, dot]);
                                }
                            }

                            p = p.sort(function(a, b) {return a[0] < b[0]});

                            var bound = 0.01;
                            if(Math.acos(p[0][1]) < bound)
                                hitBoundry = true;
                            if(Math.acos(p[1][1]) < bound)
                                hitBoundry = true;
                            //if(Math.acos(p[2][1]) < bound)
                            //    hitBoundry = true;


                        }
                    }
                }

                var ceiling = (this.props.height / 2.0) - this.props.height / (1.0 * distanceToWall);
                var floor = this.props.height - ceiling;

                var shade = '\xa0';
                if(distanceToWall <= this.depth / 4.0) 
                    shade = '\u2588';
                else if(distanceToWall < this.depth / 3.0) 
                    shade = '\u2593';
                else if(distanceToWall < this.depth / 2.0) 
                    shade = '\u2592';
                else if(distanceToWall < this.depth / 1.0) 
                    shade = '\u2591';
                else
                    shade = '\xa0';

                if(hitBoundry)
                    shade = '\xa0';

                for(var j = 0; j < this.props.height; j++) {
                    if(j <= ceiling) {
                        new_screen[j*this.props.width+i] = '\xa0';
                    }
                    else if(j > ceiling && j <= floor) {
                        new_screen[j*this.props.width+i] = shade;
                    }
                    else {
                        var b = 1.0 - ((j * 1.0 - this.props.height / 2.0) / (this.props.height /2.0)); 
                        if(b < 0.25)
                            shade = '#';
                        else if(b < 0.5)
                            shade = 'x';
                        else if(b < 0.75)
                            shade = '.';
                        else if(b < 0.9)
                            shade = '-';
                        else 
                            shade = '\xa0';
                        new_screen[j*this.props.width+i] = shade;
                    }
                }
            }

            return  <div>
                        <div style={{float: 'left', width: '155px'}}>
                            <MiniMap map={this.map} height={this.mapHeight} width={this.mapWidth} x={this.state.playerX} y={this.state.playerY}/>
                        </div>
                        <div style={{float: 'left'}}>
                            <ConsoleShooterRenderer screen={new_screen} width={this.props.width} height={this.props.height}/>
                        </div>
                    </div>
      
    }
}

function ConsoleShooterRenderer(props) {
    console.log(props);
    var lines = Array();
    var line = '';
    for(var i = 0; i < props.screen.length; i++) {
        if(i % props.width == 0) {
            lines.push(<div>{line}</div>);
            line = ''
        }
        line += props.screen[i];
    }
    lines.push(<div>{line}</div>);

    return <div>{lines}</div>;
}

function MiniMap(props) {
    console.log(props.map);
    var lines = [];
    var line = ''; 
    for(var i = 0; i < props.map.length; i++) {
        if(i % props.width == 0) {
            lines.push(<div>{line}</div>);
            line = '';
        }

        if(Math.floor(props.y) * props.width + Math.floor(props.x) === i)
            line += 'P';
        else
            line += props.map[i];
    }
    lines.push(<div>{line}</div>);

    return <div>{lines}</div>
}

export default ConsoleShooter