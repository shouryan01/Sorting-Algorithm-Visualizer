import React from 'react';
import './Visualizer.css';
import BubbleSort from '../Algorithms/BubbleSort.js';
import QuickSort from '../Algorithms/QuickSort.js';
import MergeSort from '../Algorithms/MergeSort.js';
import Slider from 'react-input-slider';

//selection
//insertion
//quick
//heap
//shell/bucket/radix

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            arraySize: 5,
            sortSpeed: 1
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

        return array;
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
                }, i * (251 - this.state.sortSpeed));
            } else {
                setTimeout(() => {
                    bar1Style.backgroundColor = 'pink';
                    bar2Style.backgroundColor = 'pink';    
                }, i * (251 - this.state.sortSpeed));
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
        const animations = MergeSort(this.state.array);
        const { array } = this.state;
        for(let i = 0; i < animations.length; i++) {
            const bars = document.getElementsByClassName('bar');
            const isColorChange = i % 3 !== 2;
            if(isColorChange) {
              const [bar1Index, bar2Index] = animations[i];
              const barOneStyle = bars[bar1Index].style;
              const barTwoStyle = bars[bar2Index].style;
              const color = i % 3 === 0 ? 'darkseagreen': 'pink';
              setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
              }, i * (251 - this.state.sortSpeed));
            } else {
              setTimeout(() => {
                const [barOneIdx, newHeight] = animations[i];
                const barOneStyle = bars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
              }, i * (251 - this.state.sortSpeed));
            }
          }
    };

    quickSort() {
        const animations = QuickSort(this.state.array);
        // const { array } = this.state;
        // for(let i = 0; i < animations.length; i++) {
        //     const bars = document.getElementsByClassName('bar');
        //     const isColorChange = i % 2 === 0;
        //     const [bar1Index, bar2Index] = animations[i];
        //     const bar1Style = bars[bar1Index].style;
        //     const bar2Style = bars[bar2Index].style;
        //     if(isColorChange) {
        //         setTimeout(() => {
        //             bar1Style.backgroundColor = 'darksalmon';
        //             bar2Style.backgroundColor = 'darksalmon';   
        //             if(array[bar1Index] > array[bar2Index]) {
        //                 bar1Style.backgroundColor = 'darkseagreen';
        //                 bar2Style.backgroundColor = 'darkseagreen';   
        //                 this.swap(array, bar1Index, bar2Index);
        //             }
        //         }, i * (251 - this.state.sortSpeed));
        //     } else {
        //         setTimeout(() => {
        //             bar1Style.backgroundColor = 'pink';
        //             bar2Style.backgroundColor = 'pink';    
        //         }, i * (251 - this.state.sortSpeed));
        //     }
        // }    
    };

    insertionSort() {

    };

    selectionSort() {

    };

    heapSort() {

    };

    handleInput(event) {
        if(event.target.value < 100 && event.target.value > 1) {
            this.setState({
                arraySize: event.target.value
            })
        }
    };

    drawBars(array) {
        return (
            <div>
                {array.map((value, index) => (
                        <div className="bar" key={index} style={{height: `${value}px`, width: window.innerWidth / this.state.arraySize / 2, borderTopLeftRadius:20, borderTopRightRadius: 20}}></div>
                ))}
            </div>
        );
    }

    render() {
        const { array } = this.state;
        const bars = this.drawBars(array);

        return (
            <div className="container" style={{backgroundColor: "lightyellow", width: window.innerWidth, height: window.innerHeight, textAlign: "center"}}>
                <span style={{marginRight: 25}}>Size</span>
                <Slider x={this.state.arraySize} xmin={5} xmax={100} xstep={5} onChange={({x}) => this.setState({ arraySize: x })} onDragEnd={() => this.randomizeArray()}/>
                <input type="text" value={this.state.arraySize} style= {{ width: 22, marginLeft: 15}} disabled={true}/>
                <br/>
                <span style={{marginRight: 25}}>Speed</span>
                <Slider x={this.state.sortSpeed} xmin={1} xmax={250} xstep={1} onChange={({x}) => this.setState({ sortSpeed: x })}/>
                <input type="text" value={this.state.sortSpeed} style= {{ width: 22, marginLeft: 15}} disabled={true}/>
                <br /><br/><br/>
                {bars}
                
                <br />
                    <button onClick={() => this.randomizeArray()}>New Array</button>
                <div style={{textAlign: "center"}}>
                    <br/>                    
                    <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                    <button onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button onClick={() => this.selectionSort()}>Selection Sort</button>
                    <button onClick={() => this.insertionSort()}>insertion Sort</button>
                </div>
            </div>
        )
    }
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}