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
                // the time was less than 0 or greater than video's length
                break;
            default:
                // some error
                break;
        }
    });

player.on("timeupdate", throttle(onSaveTimeUpdate, 1000))