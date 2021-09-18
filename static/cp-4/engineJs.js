
import { default as Suitclass } from "./oop-suit.js";


alert("page harus dijalankan dengan server, terimakasih");

// const Suit = require("./oop-suit");

// input (gunting, kertas, batu);

const suitan = new Suitclass();

const batuP1 = document.getElementById("batu-player1");
const guntingP1 = document.getElementById("gunting-player1");
const kertasP1 = document.getElementById("kertas-player1");
const refreshButton = document.getElementById("refresh-game");
const getBoardResult = document.getElementById("board-result")

let addSpan = document.createElement("span");
let getSpanBoard = document.getElementById("board-result");
// console.log(getSpanBoard.childNodes[0]);

/*
function hoverSetGrey(obj) {
    document.getElementById(obj.id).classList.add("set-bg-grey");
}
function hoverSetNull(obj) {
    document.getElementById(obj.id).classList.remove("set-bg-grey");
}
*/


batuP1.addEventListener("mouseover", () => {
    batuP1.classList.add("set-bg-grey");
});
guntingP1.addEventListener("mouseover", () => {
    guntingP1.classList.add("set-bg-grey");
});
kertasP1.addEventListener("mouseover", () => {
    kertasP1.classList.add("set-bg-grey");
});



batuP1.addEventListener("mouseout", () => {
    batuP1.classList.remove("set-bg-grey");
});
guntingP1.addEventListener("mouseout", () => {
    guntingP1.classList.remove("set-bg-grey");
});
kertasP1.addEventListener("mouseout", () => {
    kertasP1.classList.remove("set-bg-grey");
});




function replaceSpanElm() {
    if (addSpan.innerText && getSpanBoard.childNodes[0]) {
        getSpanBoard.removeChild(getSpanBoard.childNodes[0]);
        addSpan.innerText = "";
    } else if (addSpan.innerText) {
        addSpan.innerText = "";
    } else if (getSpanBoard.childNodes[0]) {
        getSpanBoard.removeChild(getSpanBoard.childNodes[0]);
    }
}

function p1_Win() {
    // if addSpan.textContent has String inside it, it will reassign with ""
    replaceSpanElm()


    getBoardResult.classList.remove("vs-frame", "draw_result");
    getBoardResult.classList.add("not_draw_result", "text_result");

    const text = document.createTextNode("PLAYER 1 WIN");
    addSpan.appendChild(text);

    getBoardResult.appendChild(addSpan);
    getBoardResult.style.wordSpacing = "";
}

function com_Win() {
    // if addSpan.textContent has String inside it, it will reassign with ""

    replaceSpanElm()

    getBoardResult.classList.remove("vs-frame", "draw_result");
    getBoardResult.classList.add("not_draw_result", "text_result");

    const text = document.createTextNode("COM WIN");
    addSpan.appendChild(text);
    getBoardResult.appendChild(addSpan);
    getBoardResult.style.wordSpacing = "100vw";
}

function draw_Condition() {
    replaceSpanElm()

    getBoardResult.classList.remove("vs-frame");
    getBoardResult.classList.add("draw_result", "text_result");

    const text = document.createTextNode("DRAW");
    addSpan.appendChild(text);
    getBoardResult.appendChild(addSpan);
}


function poppingPage() {
    // window.open("./popNotif.html", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=300,left=500,width=400,height=200");
    window.open("/api/refreshGame", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=300,left=500,width=400,height=200");
}


const getBatu = document.getElementById("batu-com");
const getGunting = document.getElementById("gunting-com");
const getKertas = document.getElementById("kertas-com");


// state before click, and "true" condition enable the click activity
let not_click = true;


// if click batu picture
batuP1.addEventListener("click", () => {


    if (not_click === true) {
        let inputan = suitan.suit("batu");
        console.log(inputan);
        if (inputan === "seri") {
            // DRAW
            draw_Condition()

            getBatu.classList.remove("set-bg-grey");
            getBatu.classList.add("set-bg-grey");
            // setTimeout(() => {
            //     getBatu.classList.remove("set-bg-grey");
            // }, 1000);
            not_click = false;
        }
        else if (inputan === "menang") {

            // P1 WIN
            p1_Win();

            getGunting.classList.remove("set-bg-grey");
            getGunting.classList.add("set-bg-grey");
            // setTimeout(() => {
            //     getGunting.classList.remove("set-bg-grey");
            // }, 1000);
            not_click = false;
        }
        else if (inputan === "kalah") {
            // COM WIN
            com_Win();
            getKertas.classList.remove("set-bg-grey");
            getKertas.classList.add("set-bg-grey");
            // setTimeout(() => {
            //     getKertas.classList.remove("set-bg-grey");
            // }, 1000);
            not_click = false;
        }
    } else {
        poppingPage();
    };
});




// if click gunting picture
guntingP1.addEventListener("click", () => {

    if (not_click === true) {

        let inputan = suitan.suit("gunting");
        console.log(inputan);

        if (inputan === "seri") {
            draw_Condition();
            getGunting.classList.remove("set-bg-grey");
            getGunting.classList.add("set-bg-grey");
            // setTimeout(() => {
            //     getGunting.classList.remove("set-bg-grey");
            // }, 1000);
            not_click = false;
        }
        else if (inputan === "kalah") {
            com_Win()
            getBatu.classList.remove("set-bg-grey");
            getBatu.classList.add("set-bg-grey");
            // setTimeout(() => {
            //     getBatu.classList.remove("set-bg-grey");
            // }, 1000);
            not_click = false;
        }

        else if (inputan === "menang") {
            // P1 WIN
            p1_Win();

            getKertas.classList.remove("set-bg-grey");
            getKertas.classList.add("set-bg-grey");
            // setTimeout(() => {
            //     getKertas.classList.remove("set-bg-grey");
            // }, 1000);

            not_click = false;
        }
    } else {
        poppingPage();

    };
});




// if click kertas picture
kertasP1.addEventListener("click", () => {


    if (not_click === true) {
        let inputan = suitan.suit("kertas");
        console.log(inputan);

        if (inputan === "seri") {
            draw_Condition();
            getKertas.classList.remove("set-bg-grey");
            getKertas.classList.add("set-bg-grey");
            // setTimeout(() => {
            //     getKertas.classList.remove("set-bg-grey");
            // }, 1000);
            not_click = false;
        }

        else if (inputan === "kalah") {
            com_Win();
            getGunting.classList.remove("set-bg-grey");
            getGunting.classList.add("set-bg-grey");
            // setTimeout(() => {
            //     getGunting.classList.remove("set-bg-grey");
            // }, 1000);
            not_click = false;
        }
        else if (inputan === "menang") {
            // P1 WIN
            p1_Win();

            getBatu.classList.remove("set-bg-grey");
            getBatu.classList.add("set-bg-grey");
            // setTimeout(() => {
            //     getBatu.classList.remove("set-bg-grey");
            // }, 1000);
            not_click = false;
        }
    } else {
        poppingPage();

    }
});


const refreshRotation = document.getElementById("rotatingRefreshButton");
// click refresh button
refreshButton.addEventListener("click", () => {

    replaceSpanElm();

    getBoardResult.classList.remove("not_draw_result", "draw_result", "text_result");
    getBoardResult.classList.add("vs-frame");
    refreshRotation.classList.add("rotate");
    setTimeout(() => {
        refreshRotation.classList.remove("rotate");
    }, 1000);


    const textVs = document.createTextNode("vs");
    addSpan.appendChild(textVs);
    getBoardResult.appendChild(addSpan);

    // change state to enable the click activity, when refresh button click
    not_click = true;

    // eradicatin grey color from each picture
    setTimeout(() => {
        getBatu.classList.remove("set-bg-grey");
    }, 500);
    setTimeout(() => {
        getGunting.classList.remove("set-bg-grey");
    }, 500);
    setTimeout(() => {
        getKertas.classList.remove("set-bg-grey");
    }, 500);
});




function getPlayButton() {
    location.href("/api/refreshGame");
}


