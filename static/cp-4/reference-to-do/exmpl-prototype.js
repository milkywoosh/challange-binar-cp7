// hanya gambaran implementasi class untuk criteria OOP challenge ch4

class SuitClass {
    #isReady = true;
    refresh() {
        // ubah state jadi VS
        // ilangin background input user
        // ilangin background input computer
        // ganti result jadi VS
        // plus: rotate image refresh 360 derajat 1x
    }

    suit(inputUser) {
        // if state === VS:
            // log input user
            // highlight tombol suit yang dipilih user
            // highlight tombol suit yang dipilih computer
            // generate hasil suit, input computer random
            // log hasil suit
            // ganti VS jadi result
            // ubah state jadi Result
        // else: ga bisa ngapa ngapain
    }

    #removeSuitButtonBackground(elementID) {
        // remove background color by element ID
    }

    #addSuitButtonBackground(elementID) {
        // remove background color by element ID
    }

    #showResult(resultString) {
        // tunjukin kotak yang isinya text result
    }

    #removeResult() {
        // ilangin komponen result
        // tunjukin komponen VS
    }
}

let suit = new SuitClass();
suit.refresh()