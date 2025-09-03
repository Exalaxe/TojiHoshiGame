const baseExp = 40;
let currentPlayerId = "player123";

let toji = {
    name: "Toji",
    level: 1,
    exp: 0,
    feedExp: 0,
    feedLvlExp: 0,
    playExp: 0,
    playLvlExp: 0,
    cleanExp: 0,
    cleanLvlExp: 0,
    sleepExp: 0,
    sleepLvlExp: 0,
    levelMeter: document.querySelector(".leveldonetoji"),
    feedStat: document.getElementById('feedstatstoji'),
    feedBtn: document.getElementById('feedbtntoji'),
    playStat: document.getElementById('playstatstoji'),
    playBtn: document.getElementById('playbtntoji'),
    cleanStat: document.getElementById('cleanstatstoji'),
    cleanBtn: document.getElementById('cleanbtntoji'),
    sleepStat: document.getElementById('sleepstatstoji'),
    sleepBtn: document.getElementById('sleepbtntoji'),
    img: document.getElementById('tojiimg')
};

let hoshi = {
    name: "Hoshi",
    level: 1,
    exp: 0,
    feedExp: 0,
    feedLvlExp: 0,
    sleepExp: 0,
    playLvlExp: 0,
    playExp: 0,
    cleanLvlExp: 0,
    cleanExp: 0,
    sleepLvlExp: 0,
    levelMeter: document.querySelector(".leveldonehoshi"),
    feedStat: document.getElementById('feedstatshoshi'),
    feedBtn: document.getElementById('feedbtnhoshi'),
    playStat: document.getElementById('playstatshoshi'),
    playBtn: document.getElementById('playbtnhoshi'),
    cleanStat: document.getElementById('cleanstatshoshi'),
    cleanBtn: document.getElementById('cleanbtnhoshi'),
    sleepStat: document.getElementById('sleepstatshoshi'),
    sleepBtn: document.getElementById('sleepbtnhoshi'),
    img: document.getElementById('hoshiimg')
};

const decayRates = {
    feed: 30,
    play: 180,
    clean: 300,
    sleep: 60
};

function requiredExp(level) {
    return baseExp + (level - 1) * 10;
}

function updateLevelMeter(pet) {
    const percent = (pet.exp / requiredExp(pet.level)) * 100;
    pet.levelMeter.style.width = percent + '%';

    const levelTextId = pet.name === "Toji" ? 'levelnumbertoji' : 'levelnumberhoshi';
    document.getElementById(levelTextId).textContent = "Lv " + pet.level;

    let scale = 1 + (pet.level - 1) * 0.1;
    if (scale > 3) scale = 3;

    if (pet.img) {
        pet.img.style.transform = `scale(${scale})`;
    }
    if (pet.video) {
        pet.video.style.transform = `scale(${scale})`;
    }
}


function gainExp(pet, amount) {
    pet.exp += amount;
    if (pet.exp >= requiredExp(pet.level)) {
        pet.exp = 0;
        pet.level++;

    }
    updateLevelMeter(pet);
}


function increaseFeed(pet, amount) {
    pet.feedExp = Math.min(100, pet.feedExp + amount);

    if (pet.feedExp < 100) {
        pet.feedLvlExp += amount;
    }

    if (pet.feedExp > 100) {
        pet.feedExp = 100;
    }

    if (pet.feedLvlExp >= 30) {
        gainExp(pet, 3);
        pet.feedLvlExp = 0;
    }

    pet.feedStat.textContent = pet.feedExp + " / 100";
}

function increasePlay(pet, amount) {
    pet.playExp = Math.min(100, pet.playExp + amount);


    if (pet.playExp < 100) {
        pet.playLvlExp += amount;
    }

    if (pet.playExp > 100) {
        pet.playExp = 100;
    }

    if (pet.playLvlExp >= 30) {
        gainExp(pet, 3);
        pet.playLvlExp = 0;
    }

    pet.playStat.textContent = pet.playExp + " / 100";
}

function increaseClean(pet, amount) {
    pet.cleanExp = Math.min(100, pet.cleanExp + amount);


    if (pet.cleanExp < 100) {
        pet.cleanLvlExp += amount;
    }

    if (pet.cleanExp > 100) {
        pet.cleanExp = 100;
    }

    if (pet.cleanLvlExp >= 30) {
        gainExp(pet, 3);
        pet.cleanLvlExp = 0;
    }

    pet.cleanStat.textContent = pet.cleanExp + " / 100";
}

function increaseSleep(pet, amount) {
    pet.sleepExp = Math.min(100, pet.sleepExp + amount);

    if (pet.sleepExp < 100) {
        pet.sleepLvlExp += amount;
    }

    if (pet.sleepExp > 100) {
        pet.sleepExp = 100;
    }

    if (pet.sleepLvlExp >= 30) {
        gainExp(pet, 3);
        pet.sleepLvlExp = 0;
    }

    pet.sleepStat.textContent = pet.sleepExp + " / 100";
}

function startDecay(pet) {
    // Feed decay
    setInterval(() => {
        if (pet.feedExp > 0) {
            pet.feedExp--;
            pet.feedStat.textContent = pet.feedExp + " / 100";
            saveProgressToServer(currentPlayerId);
        }
    }, decayRates.feed * 1000); 

    // Play decay
    setInterval(() => {
        if (pet.playExp > 0) {
            pet.playExp--;
            pet.playStat.textContent = pet.playExp + " / 100";
            saveProgressToServer(currentPlayerId);
        }
    }, decayRates.play * 1000);

    // Clean decay
    setInterval(() => {
        if (pet.cleanExp > 0) {
            pet.cleanExp--;
            pet.cleanStat.textContent = pet.cleanExp + " / 100";
            saveProgressToServer(currentPlayerId);
        }
    }, decayRates.clean * 1000);

    // Sleep decay
    setInterval(() => {
        if (pet.sleepExp > 0) {
            pet.sleepExp--;
            pet.sleepStat.textContent = pet.sleepExp + " / 100";
            saveProgressToServer(currentPlayerId);
        }
    }, decayRates.sleep * 1000);
}

function applyOfflineDecay(pet, lastUpdate) {
    const now = Date.now();
    const elapsedSeconds = Math.floor((now - new Date(lastUpdate).getTime()) / 1000);

    pet.feedExp = Math.max(0, pet.feedExp - Math.floor(elapsedSeconds / decayRates.feed));
    pet.playExp = Math.max(0, pet.playExp - Math.floor(elapsedSeconds / decayRates.play));
    pet.cleanExp = Math.max(0, pet.cleanExp - Math.floor(elapsedSeconds / decayRates.clean));
    pet.sleepExp = Math.max(0, pet.sleepExp - Math.floor(elapsedSeconds / decayRates.sleep));
}


const API_URL = "https://tojihoshigame.onrender.com"; // change to your deployed server later

// Save Toji & Hoshi to MongoDB
function getPetSaveData(pet) {
    return {
        name: pet.name,
        level: pet.level,
        exp: pet.exp,
        feedExp: pet.feedExp,
        playExp: pet.playExp,
        cleanExp: pet.cleanExp,
        sleepExp: pet.sleepExp,
        feedLvlExp: pet.feedLvlExp,
        playLvlExp: pet.playLvlExp,
        cleanLvlExp: pet.cleanLvlExp,
        sleepLvlExp: pet.sleepLvlExp
    };
}

async function saveProgressToServer(playerId) {
    const petData = {
        toji: getPetSaveData(toji),
        hoshi: getPetSaveData(hoshi)
    };

    try {
        await fetch(`${API_URL}/save`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ playerId, data: petData })
        });
        console.log("Progress saved to MongoDB");
    } catch (err) {
        console.error("Save failed", err);
    }
}


// Load Toji & Hoshi from MongoDB
async function loadProgressFromServer(playerId) {
    try {
        const res = await fetch(`${API_URL}/load/${playerId}`);
        const result = await res.json();

        if (result && result.data) {
            Object.assign(toji, result.data.toji);
            Object.assign(hoshi, result.data.hoshi);

            // 🔥 Apply offline decay using lastUpdate
            if (result.lastUpdate) {
                applyOfflineDecay(toji, result.lastUpdate);
                applyOfflineDecay(hoshi, result.lastUpdate);
            }

            initPetStats(toji);
            initPetStats(hoshi);
            console.log("Progress loaded");
        } else {
            console.log("No save found");
            initPetStats(toji);
            initPetStats(hoshi);
        }
    } catch (err) {
        console.error("Load failed", err);
    }
}






// Event listeners
toji.feedBtn.addEventListener('click', () => { increaseFeed(toji, 10); saveProgressToServer(currentPlayerId); });
hoshi.feedBtn.addEventListener('click', () => { increaseFeed(hoshi, 10); saveProgressToServer(currentPlayerId); });
toji.playBtn.addEventListener('click', () => { increasePlay(toji, 10); saveProgressToServer(currentPlayerId); });
hoshi.playBtn.addEventListener('click', () => { increasePlay(hoshi, 10); saveProgressToServer(currentPlayerId); });
toji.cleanBtn.addEventListener('click', () => { increaseClean(toji, 10); saveProgressToServer(currentPlayerId); });
hoshi.cleanBtn.addEventListener('click', () => { increaseClean(hoshi, 10); saveProgressToServer(currentPlayerId); });
toji.sleepBtn.addEventListener('click', () => { increaseSleep(toji, 10); saveProgressToServer(currentPlayerId); });
hoshi.sleepBtn.addEventListener('click', () => { increaseSleep(hoshi, 10); saveProgressToServer(currentPlayerId); });

// Initialize stats and bars on page load
function initPetStats(pet) {
    pet.feedStat.textContent = pet.feedExp + " / 100";
    pet.playStat.textContent = pet.playExp + " / 100";
    pet.cleanStat.textContent = pet.cleanExp + " / 100";
    pet.sleepStat.textContent = pet.sleepExp + " / 100";
    updateLevelMeter(pet);
}



initPetStats(toji);
initPetStats(hoshi);
window.addEventListener("DOMContentLoaded", () => {
    loadProgressFromServer(currentPlayerId).then(() => {
        startDecay(toji);
        startDecay(hoshi);
    });
});
