
// input (gunting, kertas, batu);

module.exports = {
    suitFunction : (p1, p2) => {
        let result;
        if (p1 == "gunting") {
            if ( p2 == p1) {
                result = "draw";
            } else if ( p2 == "kertas") {
                result = "player 1"
            } else if ( p2 == "batu") {
                result = "player 2"
            }
        } else if (p1 == "batu") {
            if ( p2 == p1) {
                result = "draw";
            } else if ( p2 == "kertas") {
                result = "player 2"
            } else if ( p2 == "gunting") {
                result = "player 1"
            }
        } else if (p1 == "kertas") {
            if ( p2 == p1) {
                result = "draw";
            } else if ( p2 == "gunting") {
                result = "player 2"
            } else if ( p2 == "batu") {
                result = "player 1"
            }
        }
        return result;
    }
}
