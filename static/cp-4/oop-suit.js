
// input (gunting, kertas, batu);

export default class Suitclass {
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
