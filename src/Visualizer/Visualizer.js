import React from 'react';
import './Visualizer.css';
import Slider from 'react-input-slider';
import Sketch from 'react-p5';
import PopUp from "./PopUp"; 

//npm run deploy
export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            w: 30,
            sortSpeed: 200,
            values: [],
            states: [],
            seen: false
        };
    };

    togglePop = () => {
        this.setState({
            seen: !this.state.seen
        });
    };

    async bubbleSort(arr) {
        for(let i  = 0; i < arr.length - 1; i ++) {
            for(let j = 0; j < arr.length - i - 1; j ++) {
                let a = arr[j];
                let b = arr[j + 1];
                if(a > b) {
                    await this.swap(arr, j, j + 1);
                }
            }
        }
    }
    
    async insertionSort(arr) {
        let key = 0, j = 0;
        let n = arr.length;
        for(let i = 1; i < n; i ++) {
            key = arr[i];
            j = i - 1;

            while(j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                await this.sleep((251 - this.state.sortSpeed) / n);
                j --;
            }
            arr[j + 1] = key;
            await this.sleep((251 - this.state.sortSpeed) / n);
        }
    };

    async selectionSort(arr) {
        let min_idx = 0;
        let n = arr.length;
        for(let i = 0; i < arr.length - 1; i ++) {
            min_idx = i;
            for(let j = i + 1; j < arr.length; j ++) {
                if(arr[j] < arr[min_idx]) {
                    min_idx = j;
                    await this.sleep((251 - this.state.sortSpeed) / n);
                }
            }
            await this.swap(arr, min_idx, i);
        }
    };

    async quickSort(arr, start, end) {
        this.setState({
            draw: true
        })
        if (start >= end) {
            return;
        }
        let index = await this.partition(arr, start, end);
        this.state.states[index] = -1;

        await Promise.all([
            this.quickSort(arr, start, index - 1),
            this.quickSort(arr, index + 1, end)
        ]);
    };

    async partition(arr, start, end) {
        for(let i = start; i < end; i ++) {
            this.state.states[i] = 1;
        }

        let pivotValue = arr[end];
        let pivotIndex = start;
        this.state.states[pivotIndex] = 0;

        for(let i = start; i < end; i ++) {
            if(arr[i] < pivotValue) {
                await this.swap(arr, i, pivotIndex);
                this.state.states[pivotIndex] = -1;
                pivotIndex ++;
                this.state.states[pivotIndex] = 0;
            }
        }

        await this.swap(arr, pivotIndex, end);

        for(let i = start; i < end; i ++) {
            if (i !== pivotIndex) {
                this.state.states[i] = -1;
            }
        }

        return pivotIndex;
    };

    async mergeSort(arr) {
        var len = arr.length;
        if(len < 2) {
            return arr;
        }
        var mid = Math.floor(len/2),
            left = arr.slice(0,mid),
            right =arr.slice(mid);

        return this.merge(this.mergeSort(left), this.mergeSort(right));
    };

    async merge(left, right) {
        var result = [],
            lLen = left.length,
            rLen = right.length,
            l = 0,
            r = 0;
        while(l < lLen && r < rLen){
            if(left[l] < right[r]){
                result.push(left[l++]);
            }
            else{
                result.push(right[r++]);
            }
        }  
        //remaining part needs to be addred to the result
        return result.concat(left.slice(l)).concat(right.slice(r));
    };

    async heapSort() {

    };

    async heapify() {

    };

    async bernieSort(arr) {
        //replace all values with the mean
        var total = 0;
        for(var i = 0; i < arr.length; i++) {
            total += arr[i];
        }
        var avg = total / arr.length;

        for(i = 0; i < arr.length; i++) {
            await this.sleep(15);
            arr[i] = avg;
        }
    };

    async thanosSort(arr) {
        for (var i = 0; i < arr.length; i++) {
            await this.sleep(15);
            arr.splice(i + 1, 1);
        }
        this.quickSort(this.state.values, 0, this.state.values.length - 1);
    };

    //Description: Deletes all the elements that are not in order
    async stalinSort(arr) {
        alert("Stalin Sort deletes all the elements that are not already in order  ☭")
        const temp = arr.slice();
        temp.sort();
        for (var i = 0; i < arr.length; i++) {
            if(arr[i] !== temp[i]) {
                await this.sleep(25);
                arr.splice(i, 1);
                i --;
            }
        }
    };

    async buddhaSort(arr) {
        alert("The array, like all things, is ephemeral, thus its order is insignificant. Leave the array as it is, and pursue enlightment instead.");
    };

    async swap(arr, a, b) {
        await this.sleep(251 - this.state.sortSpeed);
        let temp = arr[a];
        arr[a] = arr[b];
        arr[b] = temp;
    };

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    newArray() {
        const array = [];

        for(let i = 0; i < Math.floor(window.innerWidth / this.state.w); i ++) {
            array.push(randomInt(20, window.innerHeight - 185));
        }
        this.setState({ values: array });
    }; 

    render() {
        return (
            <div className="App" style = {{ backgroundColor: 'lightyellow', height: '100% !important'}}>
				<Sketch
                    setup={(p5, parentRef) => {
                        p5.drawingContext.shadowOffsetX = 5;
                        p5.drawingContext.shadowOffsetY = -5;
                        p5.drawingContext.shadowBlur = 10;
                        p5.drawingContext.shadowColor = 'black';
                        p5.createCanvas(window.innerWidth, window.innerHeight - 185);
                        this.state.values = new Array(Math.floor(p5.width / this.state.w));
                        this.newArray();
					}}
                    
                    draw = {(p5) => {
                        p5.clear();
                        p5.background('lightyellow');
                        for (let i = 0; i < this.state.values.length; i ++) {
                            p5.fill('pink');
                            p5.stroke('lightyellow');
                            p5.rect(i * this.state.w, p5.height - this.state.values[i], this.state.w, this.state.values[i], 20, 20, 0, 0);
                        }
                    
                        
                        // if(this.state.draw) {
                        //     for (let i = 0; i < this.state.values.length; i ++) {
                        //         if (this.state.states[i] === 0) {
                        //             p5.fill('#E0777D');
                        //         } else if (this.state.states[i] === 1) {
                        //             p5.fill('#D6FFB7');
                        //         } else {
                        //             p5.fill(255);
                        //         }
                        //         p5.rect(i * this.state.w, p5.height - this.state.values[i], this.state.w, this.state.values[i]);
                        //     }
                        // } else {
                        //     for (let i = 0; i < this.state.values.length; i ++) {
                        //         p5.rect(i * this.state.w, p5.height - this.state.values[i], this.state.w, this.state.values[i]);
                        //     }
                        // }
                        // this.setState({
                        //     draw: false
                        // })
                    }}
				/>

                <br />
                <span style={{marginRight: 25, marginTop: 20}}>Size</span>
                <Slider x={this.state.w} xmin={5} xmax={window.innerWidth / 4} xstep={1} onChange={({x}) => this.setState({ w: x })} onDragEnd={() => this.newArray()} />
                <input type="text" value={Math.floor(window.innerWidth / this.state.w)} style= {{ width: 22, marginLeft: 15}} disabled={true}/>
                
                <br/>
                <span style={{marginRight: 25}}>Speed</span>
                <Slider x={this.state.sortSpeed} xmin={1} xmax={250} xstep={1} onChange={({x}) => this.setState({ sortSpeed: x })}/>
                <input type="text" value={this.state.sortSpeed} style= {{ width: 22, marginLeft: 15, marginBottom: 10}} disabled={true}/>

                <br />
                <button class="button2" onClick={() =>  this.newArray(this.state.values, 0, this.state.values.length - 1)}>New Array</button>

                <br /><br /><br />
                <button class="button" onClick={() =>  this.bubbleSort(this.state.values)} style={{ margin: 5 }}>Bubble Sort</button>
                <button class="button" onClick={() =>  this.insertionSort(this.state.values, 0, this.state.values.length - 1)} style={{ margin: 5 }}>Insertion Sort</button>
                <button class="button" onClick={() =>  this.selectionSort(this.state.values, 0, this.state.values.length - 1)} style={{ margin: 5 }}>Selection Sort</button>
                <button class="button" onClick={() =>  this.quickSort(this.state.values, 0, this.state.values.length - 1)} style={{ margin: 5 }}>Quick Sort</button>
                {/* <button class="button" onClick={() =>  this.mergeSort(this.state.values)} style={{ margin: 5 }}>Merge Sort</button> */}
                {/* <button class="button" onClick={() =>  this.heapSort(this.state.values, 0, this.state.values.length - 1)} style={{ margin: 5 }}>Heap Sort</button> */}
                <button class="button" onClick={() =>  this.thanosSort(this.state.values)} style={{ margin: 5 }}>Thanos Sort</button>
                <button class="button" onClick={() =>  this.togglePop()} style={{ margin: 5 }}>Trump Sort</button>
                {this.state.seen ? <PopUp toggle={this.togglePop} /> : null}
                <button class="button" onClick={() =>  this.bernieSort(this.state.values)} style={{ margin: 5 }}>Bernie Sort</button>
                <button class="button" onClick={() =>  this.stalinSort(this.state.values)} style={{ margin: 5 }}>Stalin Sort</button>
                <button class="button" onClick={() =>  this.buddhaSort(this.state.values)} style={{ margin: 5 }}>Buddha Sort</button>
			</div>
        );
    }
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}