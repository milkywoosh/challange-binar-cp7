
const parse = (data) => {
    const res = {};
    data.forEach((item) => {
        Object.keys(item).map(key => {
            if (!res[key]) {
                res[key] = item[key]
            } else {
                res[key] += item[key]
            }
        })
    })
    return res;
}

let resultArray = []

resultArray.push({
    1: 1,
    2: 0
})

resultArray.push({
    1: 1,
    2: 0
})

resultArray.push({
    1: 1,
    2: 0
})

console.log(resultArray);
const cleanData = parse(resultArray); // as Object
console.log('cleanData: ', cleanData);
let keys = Object.keys(cleanData)
let values = Object.values(cleanData)
console.log('keys: ', keys);
console.log('values', values);

console.log('cleanData[keys[0]]: ', cleanData[keys[0]] == cleanData['1']) // ==> true
console.log('cleanData[keys[1]]: ' ,cleanData[keys[1]] == cleanData['2']) // ==> true


// trial my logic

let obj = [
    // first input
    // second input
    
];
// input array, sequentially input element: creating versatile function

// if keys[0], keys[1]
function inputData(arr, data) {
    if (arr.length >= 0) {
        if (data['winner'] == null) {
            if (data['a'] > data['b']) {
                data['winner'] = 'a';    
            } else if (data['a'] < data['b']) {
                data['winner'] ='b';    
            } else {
                data['winner'] = 'draw';
            }     
            arr.push(data)    
        }  
    }
}

let data1 = {
    10: 0,
    b: 1,
    winner: null
}

console.log('tes: ---', parseInt(Object.keys(data1)[0]))
let data2 = {
    a: 1,
    b: 0,
    winner: null
}
let data3 = {
    a: 0,
    b: 1,
    winner: null
}




//code driver
let arrInput = [data1, data2, data3];
for (let i=0; i<arrInput.length; i++) {
    inputData(obj, arrInput[i]);
}

console.log(obj)

// mapping FUNCTION conclude winner from array object

function countingResult(obj) {
	let result = [0,0]
	let i;
	for (i=0; i<obj.length; i++) {
		if (obj[i]['winner'] == 'a') {
			result[0] += 1;
		} else if (obj[i]['winner'] == 'b') {
			result[1] += 1;
		} 
	}
	return result;
}

console.log(countingResult(obj))