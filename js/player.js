const _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

const _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function initializePlayer(){
     getByQuery('.player .controls .play_pause').addEventListener('click', player.play.bind(player));
     getByQuery('.player .controls .navigation_prev').addEventListener('click', player.playPrev.bind(player));
     getByQuery('.player .controls .navigation_next').addEventListener('click', player.playNext.bind(player));
     getByQuery('.player .controls .progress_bar_stripe').addEventListener('click', player.pickNewProgress.bind(player));
}


const FILES = [
    'Jingle_Bells',
    'Harry_Potter',
    'Let_it_snow',
    'Last_Christmas'
]


/**
 * Player class
 */

let Player = function () {
    function Player(files) {
        _classCallCheck(this, Player);

        this.current = 0;
        this.status = 'pause';
        this.progress = 0;
        this.progressTimeout = null;
        this.files = FILES.map(function (name) {
            return {
                name: name
            };
        });
    }

    _createClass(Player, [{
        key: 'init',
        value: function init() {
        }
    }, {
        key: 'loadFile',
        value: function loadFile(i) {
            let f = this.files[i];
            console.log(f);

            f.file = new Audio(prepareFilePath(f.name));
            f.file.addEventListener('ended', this.playNext.bind(this, null, i));
        }
    }, {
                key: 'play',
        value: function play(e) {
            let i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.current || 0;

            if (!this.files[i].file) {
                this.loadFile(i);
            }

            let action = 'play';

            if (this.current == i) {
                action = this.status === 'pause' ? 'play' : 'pause';
                this.toggleStyles(action, i);
            } else if (_typeof(this.current) !== 'object') {
                this.files[this.current].file.pause();
                this.files[this.current].file.currentTime = 0;
                this.toggleStyles(action, this.current, i);
            } else {
                this.toggleStyles(action, i);
            }

            this.current = i;
            this.status = action;
            this.files[i].file[action]();

            if (action == 'play') {
                this.setTitle(this.files[i].name);
                this.stopProgress();
                this.runProgress();
            } else {
                this.stopProgress();
            }
     }
    }, {
        key: 'playNext',
        value: function playNext(e, currentIndex) {
            let nextIndex = (currentIndex ? currentIndex : this.current) + 1;

            if (!this.files[nextIndex]) {
                nextIndex = 0;
            }

            this.play(null, nextIndex);
        }
    }, {
        key: 'playPrev',
        value: function playPrev(e, currentIndex) {
            let prevIndex = (currentIndex ? currentIndex : this.current) - 1;

            if (!this.files[prevIndex]) {
                prevIndex = this.files.length - 1;
            }

            this.play(null, prevIndex);
        }
    }, {
        key: 'setTitle',
        value: function setTitle(title) {
            getByQuery('.progress_bar_title').textContent = title;
        }
    }, {
        key: 'setProgress',
        value: function setProgress() {
            let percent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            let cb = arguments[1];

            getByQuery('.progress_bar_container_percentage').style.width = percent + '%';
            cb && cb();
        }
    }, {
        key: 'countProgress',
        value: function countProgress() {
            let file = this.files[this.current].file;

            return file.currentTime * 100 / file.duration || 0;
        }
    }, {
        key: 'runProgress',
        value: function runProgress() {
            let _this2 = this;

            let percent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            let percentage = percent || this.countProgress();
            let cb = percent ? function () {
                _this2.files[_this2.current].file.currentTime = percentage * _this2.files[_this2.current].file.duration / 100;
            } : null;

            this.setProgress(percentage, cb);
            this.progressTimeout = setTimeout(this.runProgress.bind(this), 1000);
        }
    }, {
        key: 'stopProgress',
        value: function stopProgress() {
            clearTimeout(this.progressTimeout);
            this.progressTimeout = null;
        }
    }, {
        key: 'pickNewProgress',
        value: function pickNewProgress(e) {
            if (this.status != 'play') {
                this.play();
            }

            let coords = e.target.getBoundingClientRect().left;
            let progressBar = getByQuery('.progress_bar_stripe');
            let newPercent = (e.clientX - coords) / progressBar.offsetWidth * 100;

            this.stopProgress();
            this.runProgress(newPercent);
        }
        },
       {
        key: 'pause',
        value: function pause(){
           if (this.status != 'pause'){
               this.play();
           }
        }
    }, {
        key: 'toggleStyles',
        value: function toggleStyles(action, prev, next) {
            let playPause = getByQuery('.play_pause .play_pause_icon');
            if (!next && next !== 0) {
                playPause.classList.toggle('play_pause-play');
               playPause.classList.toggle('play_pause-pause');
            }
            if (playPause.classList.contains('play_pause-play') && action == 'play' && prev != next) {
                playPause.classList.toggle('play_pause-play');
                playPause.classList.toggle('play_pause-pause');
            }

        }
    }]);

    return Player;
}();

/**
 * Utils
 */

function prepareFilePath(name) {
    return './files/' + name + '.mp3';
}

function getByQuery(elem) {
    return typeof elem === 'string' ? document.querySelector(elem) : elem;
}

function prettifyTime(time) {
    var minutes = ~~(time % 3600 / 60);
    var seconds = ~~(time % 60);

    return '' + parseInt(minutes / 10) + minutes % 10 + ':' + parseInt(seconds / 10) + seconds % 10;
}
