var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

const FILES = [
    'Jingle_Bells',
    'Harry_Potter',
    'Let_it_snow',
    'Last_Christmas'
]


/**
 * Player class
 */

var Player = function () {
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
            var f = this.files[i];
            console.log(f);

            f.file = new Audio(prepareFilePath(f.name));
            f.file.addEventListener('ended', this.playNext.bind(this, null, i));
        }
    }, {
        key: 'play',
        value: function play(e) {
            i = this.current !== null ? this.current : 0

            if (!this.files[i].file) {
                this.loadFile(i);
            }

            var action = 'play';

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
            var nextIndex = (currentIndex ? currentIndex : this.current) + 1;

            if (!this.files[nextIndex]) {
                nextIndex = 0;
            }

            this.play(null, nextIndex);
        }
    }, {
        key: 'playPrev',
        value: function playPrev(e, currentIndex) {
            var prevIndex = (currentIndex ? currentIndex : this.current) - 1;

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
            var percent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var cb = arguments[1];

            getByQuery('.progress_bar_container_percentage').style.width = percent + '%';
            cb && cb();
        }
    }, {
        key: 'countProgress',
        value: function countProgress() {
            var file = this.files[this.current].file;

            return file.currentTime * 100 / file.duration || 0;
        }
    }, {
        key: 'runProgress',
        value: function runProgress() {
            var _this2 = this;

            var percent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            var percentage = percent || this.countProgress();
            var cb = percent ? function () {
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

            var coords = e.target.getBoundingClientRect().left;
            var progressBar = getByQuery('.progress_bar_stripe');
            var newPercent = (e.clientX - coords) / progressBar.offsetWidth * 100;

            this.stopProgress();
            this.runProgress(newPercent);
        }
    }, {
        key: 'toggleStyles',
        value: function toggleStyles(action, prev, next) {
            var playPause = getByQuery('.play_pause .play_pause_icon');

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

function createElem(config) {
    var element = document.createElement(config.type);

    config.class && (element.className = config.class);
    config.id && (element.id = config.id);
    config.textContent && (element.textContent = config.textContent);
    config.handlers && Object.keys(config.handlers).length && Object.keys(config.handlers).forEach(function (key) {
        element.addEventListener(key, config.handlers[key]);
    });
    config.appendTo && config.appendTo.appendChild(element);

    return element;
}
