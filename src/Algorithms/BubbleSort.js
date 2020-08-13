function BubbleSort(array) {
    const animations = [];

    try {
        if(array.length === 1) {
            return array;
        }
    
    // function delay(ms) {
    //     return new Promise.all(resolve => setTimeout(resolve, ms));
    // }
        for(let i = 0; i < array.length - 1; i ++) {
            for(let j = 0; j < array.length - i - 1; j ++) { 
                animations.push([j,j+1]); // comparing change color once
                animations.push([j,j+1]); // change color back
                if(array[j] > array[j + 1]) {
                    // swap(array, j, j + 1);
                }
            }
        }
        return animations;
    } catch (e) {
        console.log(e);
    }
}

const swap = (array, i, j) => {
    try {
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    } catch (e) {
        console.log(e);
    }
};

function visualize(array) {
    
    let bars = document.getElementById("bar");
    let row = document.createElement('div');

    bars.innerHTML = 'idsjf';

    array.map(value => {
        let row = document.createElement('div');
        row.innerHTML = value;
        row.className = 'row';
        row.style.width = `${value}px`;
        bars.appendChild(row);
    })
}

export default BubbleSort;