import React,{Component} from "react";
import './timer.css';

export class Timer extends Component {
        constructor(props){
            super(props);

            //declare
            var timer;
            // timer start time
            var then;
            // pause duration
            var delay;
            // pause start time
            var delayThen;
                
            this.state={            
                playing : false,
                animation : this.playing ? 'stop' : 'play',
                output : document.getElementById('timer'),
                toggle : document.getElementById('toggle'),    
                clear : document.getElementById('clear'),
                running : false,
                paused : false,
                timer: timer,
                then: then,
                delay:delay,
                delayThen: delayThen
            }
        }
        // parse time in ms for output
        parseTime (elapsed) {
            // array of time multiples [hours, min, sec, decimal]
            var d = [3600000,60000,1000];
            var time = [];
            var i = 0;

            while (i < d.length) {
                var t = Math.floor(elapsed/d[i]);

                // remove parsed time for next iteration
                elapsed -= t*d[i];

                // add '0' prefix to m,s,d when needed
                t = (i > 0 && t < 10) ? '0' + t : t;
                time.push(t);
                i++;
            }
            
            return time;
        };
	
    	// run
        run () {
            // get output array and print
            var time = this.parseTime(Date.now()-this.then-this.delay);
            this.output.innerHTML = time[0] + ':' + time[1] + ':' + time[2];
	    };
        start() {
		    this.delay = 0;
		    this.running = true;
		    this.then = Date.now();
		    this.timer = setInterval( this.run,51);
	    };

        // stop
        stop() {
            this.paused = true;
            this.delayThen = Date.now();
            this.clear.dataset.state = 'visible';
            clearInterval(this.timer);
            // call one last time to print exact time
            this.run();
        };
	
	
	// resume
	resume() {
		this.paused = false;
		this.delay += Date.now()-this.delayThen;
		this.timer = setInterval(this.run,51);
		this.clear.dataset.state = '';
	};
	
	
	// clear
	reset() {
		this.running = false;
		this.paused = false;
		this.output.innerHTML = '0:00:00';
		this.clear.dataset.state = '';
	};
	
	
	// evaluate and route
	router() {
		if (!this.running) this.start();
		else if (this.paused) this.resume();
		else this.stop();
										
		var color = this.playing ? 'dimgray' : 'dimgray';	
		document.getElementById("shape").style.fill = color;
				
		
	};

        timerClick(){
            this.router();
        }


    render() {
    
        return (
        <div className="timerobj"> 	
            <div className="timernum"> 
              <time id="timer">0:00:00</time>	
            </div>		
            <div className="play-btn">
                <svg onClick={()=> this.timerClick()} id="toggle" viewBox="0 0 140 140">
                  <circle className="circ" cx="70" cy="70" r="65" />
                  <polygon className="poly" id="shape" points="50,40 100,70 100,70 50,100, 50,40" >
                    <animate 
                      id="animate_to_stop" 
                      begin="indefinite" 
                      fill="freeze" 
                      attributeName="points" 
                      dur="500ms" 
                      to="45,45 95,45 95,95, 45,95 45,45"
                      keySplines="
                        0.1 0.8 0.2 1; 
                        0.1 0.8 0.2 1; 
                        0.1 0.8 0.2 1; 
                        0.1 0.8 0.2 1; 
                        0.1 0.8 0.2 1; 
                        0.1 0.8 0.2 1"
                      keyTimes="0;0.22;0.33;0.55;0.66;0.88;1" 
                      calcMode="spline"
  
                    />
  
                    <animate 
                      id="animate_to_play" 
                      begin="indefinite" 
                      fill="freeze" 
                      attributeName="points" 
                      dur="500ms" 
                      to="50,40 100,70 100,70 50,100, 50,40" 
                      keySplines="
                        0.1 0.8 0.2 1; 
                        0.1 0.8 0.2 1; 
                        0.1 0.8 0.2 1; 
                        0.1 0.8 0.2 1; 
                        0.1 0.8 0.2 1; 
                        0.1 0.8 0.2 1"
                      keyTimes="0;0.22;0.33;0.55;0.66;0.88;1" 
                      calcMode="spline"
                    />
                  </polygon>
                </svg>
                <button id="clear">clear</button>
            </div>		
        </div>
        )
    }
}