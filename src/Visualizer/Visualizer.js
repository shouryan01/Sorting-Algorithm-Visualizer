import React from 'react';
import './Visualizer.css';
import BubbleSort from '../Algorithms/BubbleSort.js';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            arraySize: 10
        };

        this.handleInput = this.handleInput.bind(this);
    };

    componentDidMount() {
        this.randomizeArray();
    };

    randomizeArray() {
        const array = [];

        for(let i = 0; i < this.state.arraySize; i ++) {
            array.push(randomInt(10, 510));
        }
        this.setState({ array: array });
    };

    bubbleSort() {
        const animations = BubbleSort(this.state.array);
        const { array } = this.state;
        for(let i = 0; i < animations.length; i++) {
            const bars = document.getElementsByClassName('bar');
            const isColorChange = i % 2 === 0;
            const [bar1Index, bar2Index] = animations[i];
            const bar1Style = bars[bar1Index].style;
            const bar2Style = bars[bar2Index].style;
            if(isColorChange) {
                setTimeout(() => {
                    bar1Style.backgroundColor = 'darksalmon';
                    bar2Style.backgroundColor = 'darksalmon';   
                    if(array[bar1Index] > array[bar2Index]) {
                        bar1Style.backgroundColor = 'darkseagreen';
                        bar2Style.backgroundColor = 'darkseagreen';   
                        this.swap(array, bar1Index, bar2Index);
                    }
                }, i * 250);
            } else {
                setTimeout(() => {
                    bar1Style.backgroundColor = 'pink';
                    bar2Style.backgroundColor = 'pink';    
                }, i * 250);
            }
        }   

    };

    swap = (array, i, j) => {
        try {
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            this.setState({
                array: array
            })
        } catch (e) {
            console.log(e);
        }
    };

    mergeSort() {

    };

    quickSort() {

    };

    heapSort() {

    };

    handleInput(event) {
        if(event.target.value < 311 && event.target.value > 9) {
            this.setState({
                arraySize: event.target.value
            })
            this.randomizeArray();
        }
    };

    drawBars(array) {
        
    }

    render() {
        const { array } = this.state;

        return (
            <div className="container" style={{backgroundColor: "lightyellow", width: window.innerWidth, height: window.innerHeight, 
            textAlign: "center"}}>
                {array.map((value, index) => (
                    <div className="bar" key={index} style={{height: `${value}px`, width: window.innerWidth / this.state.arraySize / 2}}>
                    </div>
                ))}

                <div style={{textAlign: "center"}}>
                    <input type="text" name="arraySize" onChange={this.handleInput} />  
                    <br />
                    <br />
                    <button onClick={() => this.randomizeArray()}>New Array</button>
                    <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                    <button onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button onClick={() => this.quickSort}>Quick Sort</button>
                    <button onClick={() => this.heapSort()}>Heap Sort</button>
                </div>
            </div>
        )
    }
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}