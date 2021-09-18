

/*
    knp kalo import class TOGETHER WITH feature hover gak jalan???
*/
// import { Suitclass } from './oop-suit.js';



/* ON OFF hovering element
    onmouseover = "getId(this)"
    onmouseout = "getOutId(this)"
*/
function hoverSetGrey(obj) {
    document.getElementById(obj.id).classList.add("set-bg-grey")
}
function hoverSetNull(obj) {
    document.getElementById(obj.id).classList.remove("set-bg-grey")
}




