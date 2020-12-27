function BubbleSort(array) {
    const animations = [];

    try {
        if(array.length === 1) {
            return array;
        }
        for(let i = 0; i < array.length - 1; i ++) {
            for(let j = 0; j < array.length - i - 1; j ++) { 
                animations.push([j,j+1]); // comparing change color once
                animations.push([j,j+1]); // change color back
            }
        }
        return animations;
    } catch (e) {
        console.log(e);
    }
}

export default BubbleSort;