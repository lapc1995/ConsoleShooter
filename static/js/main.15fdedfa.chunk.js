(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(t,e,a){t.exports=a(18)},16:function(t,e,a){},17:function(t,e,a){},18:function(t,e,a){"use strict";a.r(e);var i=a(0),s=a.n(i),h=a(8),o=a.n(h),r=(a(16),a(1)),n=a(2),p=a(5),l=a(4),d=a(6),c=a(9),m=a.n(c);a(17),i.Component,Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var f=a(3);function u(t){console.log(t);for(var e=Array(),a="",i=0;i<t.screen.length;i++)i%t.width==0&&(e.push(s.a.createElement("div",null,a)),a=""),a+=t.screen[i];return e.push(s.a.createElement("div",null,a)),s.a.createElement("div",null,e)}function v(t){console.log(t.map);for(var e=[],a="",i=0;i<t.map.length;i++)i%t.width==0&&(e.push(s.a.createElement("div",null,a)),a=""),Math.floor(t.y)*t.width+Math.floor(t.x)===i?a+="P":a+=t.map[i];return e.push(s.a.createElement("div",null,a)),s.a.createElement("div",null,e)}var y=function(t){function e(t){var a;return Object(r.a)(this,e),(a=Object(p.a)(this,Object(l.a)(e).call(this,t))).state={playerX:8,playerY:8,playerA:0},a.onKeyPressed=a.onKeyPressed.bind(Object(f.a)(a)),a.mapHeight=16,a.mapWidth=16,a.fov=.7853975,a.depth=16,a.map="",a.map+="################",a.map+="#..............#",a.map+="#..............#",a.map+="#..............#",a.map+="#..............#",a.map+="#..............#",a.map+="#..............#",a.map+="#..............#",a.map+="#..............#",a.map+="#..............#",a.map+="#..............#",a.map+="#......#.......#",a.map+="#..............#",a.map+="#..............#",a.map+="#..............#",a.map+="################",a}return Object(d.a)(e,t),Object(n.a)(e,[{key:"componentDidMount",value:function(){document.addEventListener("keydown",this.onKeyPressed,!1)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.onKeyPressed,!1)}},{key:"onKeyPressed",value:function(t){var e=this.state.playerA,a=this.state.playerX,i=this.state.playerY;if("a"===t.key)e-=.1;else if("d"===t.key)e+=.1;else if("w"===t.key){var s=a+2*Math.sin(e),h=i+2*Math.cos(e);"#"!=this.map[Math.floor(h)*this.mapWidth+Math.floor(s)]&&(a=s,i=h)}else if("s"===t.key){s=a-2*Math.sin(e),h=i-2*Math.cos(e);"#"!=this.map[Math.floor(h)*this.mapWidth+Math.floor(s)]&&(a=s,i=h)}this.setState({playerA:e,playerX:a,playerY:i})}},{key:"render",value:function(){for(var t=new Array(this.props.height*this.props.width).fill("\xa0"),e=0;e<this.props.width;e++){for(var a=this.state.playerA-this.fov/2+1*e/(1*this.props.width)*this.fov,i=0,h=!1,o=!1,r=Math.sin(a),n=Math.cos(a);!h&&i<this.depth;){i+=.1;var p=Math.floor(this.state.playerX+r*i),l=Math.floor(this.state.playerY+n*i);if(p<0||l>=this.mapWidth||l<0||l>=this.mapHeight)h=!0,i=this.depth;else if("#"==this.map[l*this.mapWidth+p]){h=!0;for(var d=[],c=0;c<2;c++)for(var m=0;m<2;m++){var f=1*l+m-this.state.playerY,y=1*p+c-this.state.playerX,w=Math.sqrt(y*y+f*f),g=r*y/w+n*f/w;d.push([w,g])}d=d.sort(function(t,e){return t[0]<e[0]});Math.acos(d[0][1])<.01&&(o=!0),Math.acos(d[1][1])<.01&&(o=!0)}}var M=this.props.height/2-this.props.height/(1*i),E=this.props.height-M,k="\xa0";k=i<=this.depth/4?"\u2588":i<this.depth/3?"\u2593":i<this.depth/2?"\u2592":i<this.depth/1?"\u2591":"\xa0",o&&(k="\xa0");for(var W=0;W<this.props.height;W++)if(W<=M)t[W*this.props.width+e]="\xa0";else if(W>M&&W<=E)t[W*this.props.width+e]=k;else{var b=1-(1*W-this.props.height/2)/(this.props.height/2);k=b<.25?"#":b<.5?"x":b<.75?".":b<.9?"-":"\xa0",t[W*this.props.width+e]=k}}return s.a.createElement("div",null,s.a.createElement("div",{style:{float:"left",width:"155px"}},s.a.createElement(v,{map:this.map,height:this.mapHeight,width:this.mapWidth,x:this.state.playerX,y:this.state.playerY})),s.a.createElement("div",{style:{float:"left"}},s.a.createElement(u,{screen:t,width:this.props.width,height:this.props.height})))}}]),e}(s.a.Component);o.a.render(s.a.createElement(y,{width:156,height:52}),document.getElementById("root")),console.log(window.innerHeight),console.log(window.innerWidth),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})},9:function(t,e,a){t.exports=a.p+"static/media/logo.5d5d9eef.svg"}},[[10,1,2]]]);
//# sourceMappingURL=main.15fdedfa.chunk.js.map