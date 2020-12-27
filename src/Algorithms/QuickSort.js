function QuickSort(array) {
    const animations = [];
    var l = [];
    var e = [];
    var g = [];

    if(array.length > 1) {
        var pivot = array[0];
        for(var x of array) {
            if (x < pivot) {
                l.push(x);
            } else if (x == pivot) {
                e.push(x);
            } else {
                g.push(x);
            }
        }
        animations.push(QuickSort(l) * 2);
        animations.push(e * 2);
        animations.push(QuickSort(g) * 2)
        return animations
    } else {
        return array;
    }
}
 
export default QuickSort;