/**
 * Created by ADMIN on 09.07.2017.
 */
"use strict";

var turn = 0;

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/
/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=Checker functions=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/
const comparator = function (s1, s2, s3, sign) {
    return (s1 === sign) && (s2 === sign) && (s3 === sign);
};

const findGood = function (field, sign) {
    if (isFree(field[8].id) && (comparator(sign, field[0].innerHTML, field[4].innerHTML, sign) ||
        comparator(sign, field[2].innerHTML, field[5].innerHTML, sign) ||
        comparator(sign, field[6].innerHTML, field[7].innerHTML, sign)))
        return 8;
    if (isFree(field[0].id) && (comparator(sign, field[1].innerHTML, field[2].innerHTML, sign) ||
        comparator(sign, field[3].innerHTML, field[6].innerHTML, sign) ||
        comparator(sign, field[4].innerHTML, field[8].innerHTML, sign)))
        return 0;
    if (isFree(field[7].id) && (comparator(sign, field[1].innerHTML, field[4].innerHTML, sign) ||
        comparator(sign, field[6].innerHTML, field[8].innerHTML, sign)))
        return 7;
    if (isFree(field[6].id) && (comparator(sign, field[0].innerHTML, field[3].innerHTML, sign) ||
        comparator(sign, field[2].innerHTML, field[4].innerHTML, sign) ||
        comparator(sign, field[7].innerHTML, field[8].innerHTML, sign)))
        return 6;
    if (isFree(field[1].id) && (comparator(sign, field[0].innerHTML, field[2].innerHTML, sign) ||
        comparator(sign, field[4].innerHTML, field[7].innerHTML, sign)))
        return 1;
    if (isFree(field[4].id) && (comparator(sign, field[0].innerHTML, field[8].innerHTML, sign) ||
        comparator(sign, field[1].innerHTML, field[7].innerHTML, sign) ||
        comparator(sign, field[2].innerHTML, field[6].innerHTML, sign) ||
        comparator(sign, field[3].innerHTML, field[5].innerHTML, sign)))
        return 4;
    if (isFree(field[3].id) && (comparator(sign, field[0].innerHTML, field[6].innerHTML, sign) ||
        comparator(sign, field[4].innerHTML, field[5].innerHTML, sign)))
        return 3;
    if (isFree(field[5].id) && (comparator(sign, field[3].innerHTML, field[4].innerHTML, sign) ||
        comparator(sign, field[2].innerHTML, field[8].innerHTML, sign)))
        return 5;
    if (isFree(field[2].id) && (comparator(sign, field[0].innerHTML, field[1].innerHTML, sign) ||
        comparator(sign, field[4].innerHTML, field[6].innerHTML, sign) ||
        comparator(sign, field[5].innerHTML, field[8].innerHTML, sign)))
        return 2;
    return -1;
};

const isWin = function (field, i1, i2, i3, sign) {
    return comparator(field[i1].innerHTML, field[i2].innerHTML, field[i3].innerHTML, sign);
};

const checkWinner = function (field, sign) {
    let win = false;
    for (let i = 0; i < 3; ++i) {
        win = win || isWin(field, 3 * i, 3 * i + 1, 3 * i + 2, sign);
        win = win || isWin(field, i, i + 3, i + 6, sign);
    }
    win = win || isWin(field, 0, 4, 8, sign);
    win = win || isWin(field, 2, 4, 6, sign);
    if (win)
        finalMessage((sign === "x") ? ("Player") : ("AI"));
    else if (!isPossibleToPlay())
        finalMessage("Nobody");
};

const isFree = function (id) {
    return (document.getElementById(id).innerHTML === "");
};
/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/
/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=Playing game-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/
const start = function () {
    for (let i = 0, game = document.getElementById("game"); i < 9; ++i) {
        let e = document.createElement("div");
        e.id = String(i);
        e.className = "block";
        game.appendChild(e);
    }
};

const restart = function (field) {
    turn = 0;
    for (let i = 0; i < 9; ++i)
        field[i].innerHTML = "";
};

const finish = function () {
    turn = 9;
};

const isPossibleToPlay = function () {
    return turn < 9;
};
/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/
/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=Final message=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/
const finalMessage = function (winner) {
    finish();
    setTimeout(function () {
        alert(winner + " won");
        console.log(winner + " won");
    }, 10);
    turn = 9;
};
/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/
/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=AI functions-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/
const killAllHumans = function (field) {
    if (isFree(field[4].id)) {
        document.getElementById(field[4].id).innerHTML = "o";
        return;
    }
    setTimeout(findGood(field, "o"), 1000);
    let pos = findGood(field, "o");
    if (pos === (-1)) {
        pos = findGood(field, "x");
    }
    else {
        document.getElementById(field[pos].id).innerHTML = "o";
        return;
    }
    if (pos === (-1)) {
        for (let j = 0; j < 2; ++j) {
            for (let i = j; i < 9; i += 2) {
                if (isFree(field[i].id)) {
                    document.getElementById(field[i].id).innerHTML = "o";
                    return;
                }
            }
        }
    } else {
        document.getElementById(field[pos].id).innerHTML = "o";
    }
};


/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/
/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=Overmind-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/
window.onload = function () {
    start();

    document.getElementById("game").addEventListener("click",  function () {
        if (isPossibleToPlay() && ((turn % 2) === 0)) {
            let field = document.getElementsByClassName("block");
                if ((event.target.className === "block") && isFree(event.target.id)) {
                event.target.innerHTML = "x";
                checkWinner(field, "x");
                turn++;
                if (isPossibleToPlay()) {
                    setTimeout(function(){
                        killAllHumans(field);
                        checkWinner(field, "o");
                        turn++;
                    }, 1000);
                }
            }
        }
    })  ;

    document.getElementById("button").addEventListener("click", function () {
        let field = document.getElementsByClassName("block");
        restart(field);
    });


};
/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/
/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=Konami-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/
const konami_code = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
var awesome_index = 0;

document.addEventListener("keydown", function () {
    let key = event.keyCode;
    if (key === konami_code[awesome_index])
        awesome_index++;
    else
        awesome_index = 0;
    if (awesome_index === 9){
        finish();
        finalMessage("player");
    }
});