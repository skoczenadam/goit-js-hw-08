import Player from '@vimeo/player';

const throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const onSaveTimeUpdate = ({ seconds }) => {
    localStorage.setItem("videoplayer-current-time", seconds);
}

const getVideoPlayerCurrentTime = () => {
    return localStorage.getItem("videoplayer-current-time") || 0;
}

player.
    setCurrentTime(getVideoPlayerCurrentTime())
    .catch(function (err) {
        switch (err.name) {
            case "RangeError":
                console.log(`BŁĄD: vimeo-player próbuje wprowadzić czas: ${getVideoPlayerCurrentTime}.`)
                break;
            default:
                console.log("Nieznany błąd")
                break;
        }
    });

player.on("timeupdate", throttle(onSaveTimeUpdate, 1000))