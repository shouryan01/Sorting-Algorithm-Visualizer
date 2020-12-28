function MergeSort(array) {
    const animations = [];
    if(array.length <= 1) {
        return array;
    }
    const tempArray = array.slice();
    divide(array, 0, array.length - 1, tempArray, animations);
    return animations;
};

function divide(array, startIndex, endIndex, tempArray, animations) {
    if(startIndex === endIndex) {
        return;
    }
    const midIndex = Math.floor((startIndex + endIndex) / 2);
    divide(tempArray, startIndex, midIndex, array, animations);
    divide(tempArray, midIndex + 1, endIndex, array, animations);
    conquer(array, startIndex, midIndex, endIndex, tempArray, animations);
};

function conquer(array, startIndex, midIndex, endIndex, tempArray, animations) {
    let k = startIndex;
    let i = startIndex;
    let j = midIndex + 1;
    while(i <= midIndex && j <= endIndex) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([i, j]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([i, j]);
        if (tempArray[i] <= tempArray[j]) {
            // We overwrite the value at index k in the original array with the
            // value at index i in the auxiliary array.
            animations.push([k, tempArray[i]]);
            array[k++] = tempArray[i++];
        } else {
            // We overwrite the value at index k in the original array with the
            // value at index j in the auxiliary array.
            animations.push([k, tempArray[j]]);
            array[k++] = tempArray[j++];
        }
    }
    while (i <= midIndex) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([i, i]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([i, i]);
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, tempArray[i]]);
        array[k++] = tempArray[i++];
    }
    while (j <= endIndex) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([j, j]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([j, j]);
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, tempArray[j]]);
        array[k++] = tempArray[j++];
    }
};

export default MergeSort;