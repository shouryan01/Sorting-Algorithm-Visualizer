def sort(array):
    ans = []
    l = []
    e = []
    g = []

    if(len(array) > 1):
        pivot = array[0]
        for num in array:
            if num < pivot:
                l.append(num)
            elif num == pivot:
                e.append(num)
            else:
                g.append(num)
        ans.append(sort(l))
        ans.append(e)
        ans.append(sort(g))
        # return sort(l) + e + sort(g)
        return ans
    else:
        return array

x = sort([2,3,4,1,7,3,4,9,0,1])
for i in x:
    print(i)