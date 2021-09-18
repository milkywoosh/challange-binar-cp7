// npm install -g live-server
// jalankan command `live-server` di direktori html kalian


import {SuitClass} from "./suit.js"
let counter = 0;
document.getElementById("hello").addEventListener("click", function () {
    let pool = ["gunting", "batu", "kertas"];
	let rand =  Math.floor(Math.random() * pool.length);
	// console.log("player1: ", player1, " vs com: ", pool[rand]);
    document.getElementById("one").innerHTML = "gunting";
    document.getElementById("two").innerHTML = pool[rand];
    // document.getElementById("result").innerHTML = parseInt(document.getElementById("one").innerHTML) + parseInt(document.getElementById("two").innerHTML)
    setTimeout(()=>{
        document.getElementById("result").innerHTML = suit("gunting", pool[rand]);
    }, [500]) // 500 milisecond
    // console.log(suit("gunting", "kertas"), 1)
});

class SuitClass {
    suit(inputUser) {
        let pool = ["gunting", "batu", "kertas"];
        let rand = Math.floor(Math.random() * pool.length);
        let result;
        if (inputUser == "gunting") {
            if (pool[rand] == inputUser) {
                result = "seri";
            } else if (pool[rand] == "kertas") {
                result = "menang"
            } else if (pool[rand] == "batu") {
                result = "kalah"
            }
        } else if (inputUser == "batu") {
            if (pool[rand] == inputUser) {
                result = "seri";
            } else if (pool[rand] == "kertas") {
                result = "kalah"
            } else if (pool[rand] == "gunting") {
                result = "menang"
            }
        } else if (inputUser == "kertas") {
            if (pool[rand] == inputUser) {
                result = "seri";
            } else if (pool[rand] == "gunting") {
                result = "kalah"
            } else if (pool[rand] == "batu") {
                result = "menang"
            }
        }
        return result;
    }
}

// class Suit
let suit = new SuitClass();

// memiliki Public method 'suit()', input computer random
// input: string ["gunting", "batu", "kertas"]
// output: string ["menang", "kalah", "seri"]
console.log(suit.suit("gunting")) // -> "menang" / "kalah" / "seri"