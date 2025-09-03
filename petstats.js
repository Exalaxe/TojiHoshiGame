/*const feedtoji = document.getElementById('feedbtntoji');
const cleantoji = document.getElementById('cleanbtntoji');
const playtoji = document.getElementById('playbtntoji');
const sleeptoji = document.getElementById('sleepbtntoji');
const feedhoshi = document.getElementById('feedbtnhoshi');
const cleanhoshi = document.getElementById('cleanbtnhoshi');
const playhoshi = document.getElementById('playbtnhoshi');
const sleephoshi = document.getElementById('sleepbtnhoshi');

const levelmetertoji = document.querySelector(".leveldonetoji")
const levelmeterhoshi = document.querySelector(".leveldonehoshi")

let level = 1;
let exp = 0;
const baseExp = 40



function requiredExp(level) {
    return baseExp + (level - 1) * 10;
}

function updateLevelMeter() {
    const percent = (exp / requiredExp(level)) * 100;
    levelmetertoji.style.width = percent + '%';
}

function gainExp(amount){
    exp += amount;
    if (exp >= requiredExp(level)){
        exp = 0;
        level++
    }
    updateLevelMeter();
}


let feedexpToji = 0;
let feedexpHoshi = 0;
let playexp = 0;
let cleanexp = 0;
let sleepexp = 0;

let feedlvlexp = 0;
let sleeplvlexp = 0;
let playlvlexp = 0;
let cleanlvlexp = 0;


function increaseFeedToji(amount) {
    feedexpToji += amount;

    if (feedexpToji < 100) {
        feedlvlexp += amount;
    }

    if(feedexpToji > 100) {
        feedexpToji = 100;}


    if (feedlvlexp >= 30) {
        gainExp(3);
        feedlvlexp = 0;

    }

    document.getElementById('feedstatstoji').textContent = feedexpToji + " / 100";
}

function increaseFeedHoshi(amount) {
    feedexpHoshi += amount;

    if (feedexpHoshi < 100) {
        feedlvlexp += amount;
    }

    if(feedexpHoshi > 100) {
        feedexpHoshi = 100;}


    if (feedlvlexp >= 30) {
        gainExp(3);
        feedlvlexp = 0;

    }

    document.getElementById('feedstatshoshi').textContent = feedexpHoshi + " / 100";
}

function increasePlay(amount) {
    playexp += amount;

    playlvlexp += amount;

    if (playexp >= 30) {
        gainExp(3);
        playexp = 0;

    }

}

function increaseClean(amount) {
    cleanexp += amount;

    cleanlvlexp += amount;

    if (cleanexp >= 30) {
        gainExp(3);
        cleanexp = 0;

    }

}

function increaseSleep(amount) {
    sleepexp += amount;

    sleeplvlexp += amount;

    if (sleepexp >= 30) {
        gainExp(3);
        sleepexp = 0;

    }

}

feedtoji.addEventListener('click', () => increaseFeedToji(10));
feedhoshi.addEventListener('click', () => increaseFeedHoshi(10));
document.getElementById('feedstatstoji').textContent = feedexpToji + " / 100";
document.getElementById('feedstatshoshi').textContent = feedexpHoshi + " / 100"; */
