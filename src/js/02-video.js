import _ from "lodash.throttle";
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const timeUpdate = ({ seconds } = 0) => {
    console.log(seconds);
    localStorage.setItem("player", seconds);
};

player.on("timeupdate", timeUpdate);

player.getCurrentTime().then(_.throttle(function (seconds) {
    console.log('current time:', seconds);
    localStorage.setItem("player", seconds);
}),1000);

player.setCurrentTime(actualTime).then(function(seconds) {
    console.log(actualTime);
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            console.log(`Wystąpił błąd: ${error.name}`);
            break;
        default:
            break;
    }
});