export class Suit {
    choices = ["rock", "paper", "scissor"];
    #cache = {};
    wins = 0;
    draws = 0;
    loses = 0;

    suit(inputPlayer) {
        let rand = Math.floor(Math.random() * this.choices.length);
        let inputComputer = this.choices[rand];
        this.choices.forEach(function (choice, i, choices) {
            this.#cache[choice] = {};
            this.#cache[choice][choice] = "draw"
            this.#cache[choice][choices[(i + 1) % 3]] = choices[(i + 1) % 3]
            this.#cache[choice][choices[(i + 2) % 3]] = choice
        }, this)

        let result = this.#compare(inputPlayer, inputComputer);
        if (result !== "draw") {
            if (result === inputPlayer) {
                result = "Player 1 win"
                this.wins++;
            } else {
                result = "Computer win"
                this.loses++;
            }
        } else {
            this.draws++;
        }
        return [`player 1: ${inputPlayer}\ncomputer: ${inputComputer}\nresult: ${result}`, inputComputer, result];
    }

    #compare(choice1, choice2) {
        return (this.#cache[choice1] || {})[choice2] || "Invalid choice";
    }
}

export class UIEngine extends Suit {
    #userChoice = "";
    #lastPlayerNode;
    #lastComputerNode;

    constructor() {
        super();
        const start = new Date().getTime();
        this.#init();
        const end = new Date().getTime();
        const time = end - start;
        console.log(`Init execution time: ${time}ms`);
    }
    #init() {
        this.#addLinks();
        this.#createNavbar();
        this.#createContent();
        this.#addClickListener();
    }

    #addLinks() {
        let linkStyle = document.createElement("link");
        linkStyle.href = "http://binar-chapter-4.s3-website-ap-southeast-1.amazonaws.com/css/style.css";
        linkStyle.type = "text/css";
        linkStyle.rel = "stylesheet";

        let linkFont = document.createElement("link");
        linkFont.href = "//fonts.googleapis.com/css?family=Open+Sans";
        linkFont.type = "text/css";
        linkFont.rel = "stylesheet";

        let linkBootstrap = document.createElement("link");
        linkBootstrap.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css";
        linkBootstrap.type = "text/css";
        linkBootstrap.rel = "stylesheet";
        linkBootstrap.integrity = "sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC";
        linkBootstrap.crossOrigin = "anonymous";
        document.getElementsByTagName( "head" )[0].append(linkStyle, linkFont, linkBootstrap);

        let scriptBootstrap = document.createElement("script");
        scriptBootstrap.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js";
        scriptBootstrap.integrity = "sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM";
        scriptBootstrap.crossOrigin = "anonymous";
        document.body.appendChild(scriptBootstrap);
    }

    #buildPictureElement({ imgId = '', srcWebp, srcPng, imgClass, imgAlt }) {
        const picture = document.createElement("picture");
        const sourceWebp = document.createElement("source");
        sourceWebp.srcset = srcWebp;
        const img = document.createElement("img");
        if (imgId) {
            img.id = imgId;
        }
        if (imgAlt) {
            img.alt = imgAlt;
        }
        if (imgClass) {
            img.className = imgClass;
        }
        img.src = srcPng;
        picture.innerHTML += sourceWebp.outerHTML + img.outerHTML;
        return picture
    }

    #buildSuitElement({ wrapperId, srcWebp, srcPng, wrapperClassName, imgAlt }) {
        const image = this.#buildPictureElement({
            srcWebp,
            srcPng,
            imgAlt,
            imgClass: "suit-image",
            imgId: wrapperId
        })

        const wrapper = document.createElement("div");
        wrapper.className = wrapperClassName;
        wrapper.id = `wrapper-${wrapperId}`;

        wrapper.innerHTML += image.outerHTML;
        return wrapper;
    }

    #buildVS(){
        const vs = document.createElement("div");
        vs.id = "result";
        vs.className = "noselect result vs";
        vs.innerText = "VS"
        return vs
    }

    #buildResult(winner){
        const result = document.createElement("div");
        result.id = "result";
        result.className = `noselect result ${winner ? 'not-draw' : 'draw'}`;
        result.innerText = winner || 'draw'
        return result
    }

    #createNavbar() {
        const backButton = document.createElement("span");
        backButton.id = "back-button";
        backButton.innerText = "<"

        const logo = this.#buildPictureElement({
            imgId: "logo",
            srcWebp: "./img/logo.webp",
            srcPng: "./img/logo.png",
            imgAlt: "home"
        })

        const title = document.createElement("h1");
        title.id = "title";
        title.innerText = "ROCK PAPER SCISSORS"

        const navbar = document.createElement("div");
        navbar.id = "navbar";
        navbar.innerHTML += backButton.outerHTML + logo.outerHTML + title.outerHTML;

        document.getElementById('app').innerHTML += navbar.outerHTML;
    }

    #createContent() {
        const refresh = this.#buildPictureElement({
            srcWebp: "./img/refresh.webp",
            srcPng: "./img/refresh.png",
            imgAlt: "refresh",
            imgId: "refresh"
        });

        let builtChoices = this.choices.map(function (choice) {
            return {
                player: this.#buildSuitElement({
                    wrapperId: `player-${choice}`,
                    srcWebp: `./img/${choice}.webp`,
                    srcPng: `./img/${choice}.png`,
                    wrapperClassName: "suit-button-wrapper",
                }),
                computer: this.#buildSuitElement({
                    wrapperId: `computer-${choice}`,
                    srcWebp: `./img/${choice}.webp`,
                    srcPng: `./img/${choice}.png`,
                    wrapperClassName: "suit-button-wrapper",
                })
            }
        }, this);

        const playerText = document.createElement("h2");
        playerText.className = "player-text";
        playerText.innerText = "Player 1";

        const computerText = document.createElement("h2");
        computerText.className = "player-text";
        computerText.innerText = "Computer";

        const outerColResult = document.createElement("div");
        outerColResult.className = "col-md-4 col-xs-12 align-self-center";
        outerColResult.id = "outer-col-result";

        const outerColPlayer = document.createElement("div");
        outerColPlayer.className = "col-md-4 col-xs-12";

        const outerColComputer = document.createElement("div");
        outerColComputer.className = "col-md-4 col-xs-12";

        outerColPlayer.innerHTML += playerText.outerHTML + builtChoices.reduce((accumulator, currentValue, i) => {
            return accumulator + currentValue.player.outerHTML
        }, "")
        outerColComputer.innerHTML += computerText.outerHTML + builtChoices.reduce((accumulator, currentValue, i) => {
            return accumulator + currentValue.computer.outerHTML
        }, "")
        outerColResult.innerHTML += this.#buildVS().outerHTML;

        const outerRow = document.createElement("div");
        outerRow.className = "row justify-content-center";
        outerRow.innerHTML += outerColPlayer.outerHTML + outerColResult.outerHTML + outerColComputer.outerHTML;

        const container = document.createElement("div");
        container.className = "container";
        container.innerHTML += outerRow.outerHTML + refresh.outerHTML;

        document.getElementById('app').innerHTML += container.outerHTML;
    }

    #updateResult(elem){
        document.getElementById('outer-col-result').innerHTML = elem;
    }

    #addClickListener() {
        const eventListeners = (e) => {
            if (this.#userChoice === '') {
                let [resultStr, computerInput, result] = this.suit(e.target.id.split('-')[1])
                console.log(resultStr)
                this.#lastPlayerNode = e.currentTarget.parentNode.parentNode
                this.#lastComputerNode = document.getElementById(`wrapper-computer-${computerInput}`)
                this.#toggleBackground()
                this.#updateResult(this.#buildResult(result).outerHTML)
                document.title = `${this.wins}/${this.draws}/${this.loses} | Chapter 4 Challenge | Bagas`;
            }
        }
        this.choices.forEach(function (choice) {
            document.getElementById(`player-${choice}`).addEventListener("click", eventListeners)
        })
        document.getElementById('refresh').addEventListener("click", (e) => {
            this.#refresh();
        })
    }

    #removeWordFromClass(word, elem) {
        elem.className = elem.className.replace(word, "");
        elem.className = elem.className.replace(/\s/g, '');
    }

    #addWordFromClass(word, elem) {
        elem.className += ` ${word}`
    }

    #toggleButtonBGColor(element) {
        if (element.className.includes("active")) {
            this.#removeWordFromClass("active", element)
            this.#userChoice = ""
        }
        else {
            this.#userChoice = element.id;
            this.#addWordFromClass("active", element)
        }
    }

    #refresh() {
        if (this.#lastPlayerNode && this.#lastComputerNode) {
            this.#removeWordFromClass("active", this.#lastPlayerNode)
            this.#removeWordFromClass("active", this.#lastComputerNode)
            this.#lastPlayerNode = null;
            this.#lastComputerNode = null;
            this.#userChoice = '';
            this.#updateResult(this.#buildVS().outerHTML);
            let element = document.getElementById('refresh')
            if (element.className.includes("active")) {
                this.#removeWordFromClass("active", document.getElementById('refresh'))
            }
            else {
                this.#addWordFromClass("active", document.getElementById('refresh'))
            }
        } 
    }
    
    #toggleBackground() {
        this.#toggleButtonBGColor(this.#lastPlayerNode);
        this.#toggleButtonBGColor(this.#lastComputerNode);
    }
}