// utils
const $ = (selector) => document.querySelector(selector);

// elements
const $sayBtn = $('#saybtn');
const $video = $('#video');
const $number = $('#number');

// listeners
$sayBtn.onclick = () => {
    const number = parseInt($number.value);
    $video.style.opacity = 1;
    $sayBtn.disabled = true;
    $number.disabled = true;
    say(number).then(() => {
        $video.style.opacity = 0;
        $number.disabled = null;
        $sayBtn.disabled = null;
    });
};

// states
const a = ['', 'yek', 'do', 'se', 'chahar', 'panj', 'shesh', 'haft', 'hasht', 'noh', 'dah', 'yazdah', 'davazdah', 'sizdah', 'chahardah', 'punzdah', 'shunzdah', 'hifdah', 'hijdah', 'nuzdah'];
const b = ['bist', 'si', 'chehel', 'panjah', 'shast', 'haftad', 'hashtad', 'navad'];
const c = ['sad', 'divist', 'sisad', 'charsad', 'punsad', 'shishsad', 'haftsad', 'hashtsad', 'nohsad'];
const d = ['hezar', 'milyun', 'milyard'];
const z = 'o';

// methods
const say = async (num) => {
    const m99 = (_num) => {
        let ret = [];
        const _a = _num % 10;
        const _b = _num % 100;
        if (_b < 20) {
            ret = [a[_b]];
        } else {
            ret = [b[Math.floor(_b / 10) - 2], a[_a]];
        }
        return ret;
    }
    const m9xx = (_num) => {
        const _a = Math.floor(_num / 100) % 10;
        return _a ? [c[_a - 1]] : [];
    }
    const m999xxx = (_num) => {
        const _a = Math.floor(_num / 1000) % 1000;
        return _a ? [
            ...m9xx(_a),
            ...m99(_a),
            d[0],
        ] : [];
    }
    const m999xxxxxx = (_num) => {
        const _a = Math.floor(_num / 1000000) % 1000;
        console.warn(_a);
        return _a ? [
            ...m9xx(_a),
            ...m99(_a),
            d[1],
        ] : [];
    }
    const ret = [
        ...m999xxxxxx(num),
        ...m999xxx(num),
        ...m9xx(num),
        ...m99(num),
    ].filter(x=>!!x);
    const sounds = [];
    for(const part of ret) {
        const sound = new Audio(`./voices/${part}.mp3`);
        sounds.push(sound);
        await new Promise(resolve => {
            sound.addEventListener('loadeddata', () => {
                resolve();
            });
        });
    }
    for(const sound of sounds) {
        sound.play();
        await new Promise(resolve => {
            setTimeout(resolve, (sound.duration * 1000) - 50);
        });
    }
}
