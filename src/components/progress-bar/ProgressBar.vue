<template>
    <div id="progress-div-container">
        <div id="progress-container">
            <button id="play-btn" type="button" class="btn"
                    @click="playBtnClick()"
            >
                <span id="play-btn-icon" :class="[play ? 'play-btn-pause': 'play-btn-play']"></span>
            </button>
            <button id="fast-forward-btn" type="button" class="btn"
                    :title="`${speed}倍速`"
                    @click="fastForwardBtnClick()"
            >
            <span id="fast-forward-btn-icon"
                  :style="{backgroundImage: fastForwardBtnIcon}"
            ></span>
            </button>
            <div id="progress" ref="progress">
                <div id="progress-bar" class=""  style=""
                     @mousedown="progressBarMousedown($event)"
                ></div>
                <div id="progress-btn" ref="progressBtn"
                     @mousedown="progressBtnMousedown()"
                ></div>
            </div>
            <div id="progress-time">{{ timestampArr.length ? timeText: '1970-01-01 00:00:00'}}</div>
        </div>
    </div>
</template>

<script>
    import progressBarConfig from "../../../public/config/progress-bar-config";
    export default {
        name: "ProgressBar",
        data() {
            return {
                // 进度条的是否在使用的生命周期标志
                flag: false,
                // 为滚动条距离窗口左边的距离，初始化后不再做修改。
                progressX: null,
                // progress-bar 的横坐标位置
                positionX: null,
                // 进度条长度
                progressLen: null,
                // 存储定时器 ID
                timerID: null,
                // 主要的数据间隔
                len: null,
                // 数据步长
                step: null,
                // 默认的时间间隔
                defaultInterval: 500,
                // 进度条数据
                index: 0,
                // 进度条播放状态flag
                play: false,
                //　当前播放倍速
                speed: 1,
                // 设置的最大播放倍速
                maxSpeed: 1,
                // 进度条回调函数
                progressBarMoveCallback: null,
                // timestampArr: ['2020-05-01 00:00:00', '2020-05-01 00:01:00', '2020-05-01 00:02:00', '2020-05-01 00:03:00', '2020-05-01 00:04:00'],
                // callbackFunction: function(index) {
                //     console.log(this.timestampArr[index]);
                // }
            }
        },
        props: {
            timestampArr: [Array, String],
            callbackFunction: [Function, String]
        },
        computed: {
            timeText() {
                return this.timestampArr[this.index]
            },
            // 进度条播放时间间隔
            interval () {
                return this.defaultInterval / this.speed;
            },
            playBtnIcon() {

            },
            fastForwardBtnIcon() {
                return this.speed === 1 ?
                    `url('./images/fast-forward.png')`:
                    `url('./images/@${this.speed}.png')`;
            }
        },
        methods: {
            mouseMoveEvent (e) {
                this.progressBtnMoveTo(e);
                window.getSelection ? window.getSelection().removeAllRanges() : window.selection.empty();
            },
            progressBtnMousedown() {
                this.setPlayStop();
                // document.addEventListener('mousemove', this.mouseMoveEvent);
                document.onmousemove = this.mouseMoveEvent;
            },
            progressBarMousedown(e) {
                this.setPlayStop();
                this.progressBtnMoveTo(e);
                // document.addEventListener('mousemove', this.mouseMoveEvent);
                document.onmousemove = this.mouseMoveEvent;
            },
            playBtnClick() {
                this.play = !this.play;
                this.play ? this.setPlayStart(this.interval): this.setPlayStop();
            },
            fastForwardBtnClick () {
                Number(this.speed) === this.maxSpeed ? this.speed = 1 : this.speed *= 2;
                this.setPlayStart(this.interval);
            },
            cal(numA, numB, symbol, decimal, roundFlag) {
                decimal = decimal === undefined ? 5 : decimal;
                roundFlag = roundFlag === undefined ? true : roundFlag;
                let result = null, tempResult = null;
                if (numA && !numB)
                    result = numA.toFixed(decimal);
                else if (numA && numB && symbol) {
                    tempResult = math.round(math.eval(numA + symbol + numB), 5);
                    if (symbol === '%') {
                        tempResult = tempResult === numB ? 0 : tempResult;
                    }
                    if (roundFlag)
                        result = tempResult.toFixed(decimal);
                }
                else
                    result = 0;
                return Number(result);
            },
            /**
             * 进度条的总初始化方法
             * init()
             * @param timestampArr
             * @param callback
             */
            init (timestampArr, callback) {
                if (!this.timestampArr.length) return;
                this.flag = true;
                this.timestampArr = timestampArr;
                // this.minInterval = this.defaultInterval / this.speed;

                this.len = this.timestampArr.length - 1;

                this.step = this.cal(this.progressLen, this.len, "/");
                while (this.cal(this.step, this.len, '*') > this.progressLen) {
                    this.len++;
                    this.step = this.cal(this.progressLen, this.len, "/");
                }

                // this.progressX 为滚动按钮开始位置距离窗口左边的距离，初始化后不再做修改。
                this.progressX = this.$refs.progress.offsetLeft + 10;

                // 初始化时 this.positionX 与 this.progressX 位置相同
                this.positionX = this.progressX;

                // document.addEventListener('mouseup', function (e) {
                //     console.log(e);
                //     document.removeEventListener('mousemove', this.mouseMoveEvent);
                // });

                document.onmouseup = function () {
                    document.onmousemove = function () {};
                };
                this.progressBarMoveCallback = callback;
                // 设置到一个初始状态
                this.progressBtnMoveTo(this.positionX);
            },
            /**
             * progressBtnMoveTo
             * 进度条移动方法
             * @param data
             */
            progressBtnMoveTo(data) {
                if (data instanceof MouseEvent) {
                    this.positionX = data.clientX;
                }
                else {
                    this.positionX = data;
                }
                if (this.positionX < this.progressX) return;
                if (this.positionX > this.cal(this.progressX + this.progressLen, 0.1, "+")) {
                    this.setPlayStop();
                    return;
                }
                let offsetX = this.positionX - this.progressX - 1;
                // console.log ("this.positionX", this.positionX);
                // console.log ("offsetX", offsetX);
                // 修改按钮的横坐标
                this.$refs.progressBtn.style.left = offsetX + 'px';
                this.index = this.cal(offsetX, this.step, "/", 0);

                // 进度条移动时的主要操作callback
                this.progressBarMoveCallback(this.index);
            },
            /**
             * mouseMove
             *
             */

            /**
             * setPlayStart
             * 进度条的播放开始方法
             * @param interval
             */
            setPlayStart(interval) {
                clearInterval(this.timerID);
                // 如果预计下一次播放会跳出进度条范围，则停止播放。
                if (this.positionX >= this.progressLen + this.progressX + 1) {
                    return;
                }
                // 如果播放到头了，下一次播放从头开始。
                if (this.positionX <= this.cal(this.progressX + this.progressLen, this.step, "+") && this.positionX >= this.cal(this.progressX + this.progressLen, this.step, "-"))
                {
                    this.positionX = this.progressX;
                    this.progressBtnMoveTo(this.positionX);
                }
                // 主要的播放操作
                this.timerID = setInterval(e =>{
                    // let this.step = this.cal(this.progressLen, this.len, "/");
                    if (this.positionX + this.step > this.cal(this.progressX + this.progressLen, 0.1, "+")) {
                        this.setPlayStop();
                        return;
                    }
                    // 如果 progress-bar 位置处于两个跳跃节点之间，那么开始移动时将其置于下一个跳跃节点处。
                    else if (this.cal(this.cal(this.positionX, this.progressX, "-"), this.step, "%") !== 0 ) {
                        // else if (this.cal(this.cal(this.positionX, this.progressX, "-"), this.step, "%") !== 0 && this.cal(this.cal(this.positionX, this.progressX, "-"), this.step, "%") !== this.step) {
                        this.positionX = this.cal(this.cal(Math.ceil((this.positionX - this.progressX)/this.step), this.step, "*"), this.progressX, "+");
                    }
                    // 如果 progress-bar 位置处于跳跃节点处，则直接跳跃。
                    else {
                        this.positionX = this.cal(this.positionX, this.step, "+");
                    }
                    // 进度条 btn 移动到指定位置
                    this.progressBtnMoveTo(this.positionX);

                }, this.defaultInterval / this.speed);
                this.play = true;
            },
            /**
             * setPlayStop
             * 进度条的播放停止方法
             */
            setPlayStop() {
                if (this.timerID) clearInterval(this.timerID);
                this.play = false;
            },
            /**
             * destroy
             * 进度条的销毁方法
             */
            destroy() {
                this.flag = false;
                this.setPlayStop();
                // this.interval = 500;
                // $("#fast-forward-btn")[0].title = `1倍速`;
                // $("#fast-forward-btn-icon")[0].style.backgroundImage = `url('progress-bar/images/fast-forward.png')`;
                // $("#progress-btn").off("mousedown");
                // $("#progress-bar").off("mousedown");
                // $(document).off("mouseup");
                // $("#play-btn").off("click");
                // $("#fast-forward-btn").off("click");
            }

        },
        mounted() {
            this.progressLen = progressBarConfig.progressLen;
            this.maxSpeed = progressBarConfig.maxSpeed;
            this.defaultInterval = progressBarConfig.defaultInterval;

            this.$nextTick(() => {
                this.init(this.timestampArr, this.callbackFunction);
            });
        },
    }
</script>

<style scoped>
    #progress-div-container {
        width: 100%;
        position: absolute;
        display: flex;
        align-items: end;
        justify-content: center;
    }
    #progress-container {
        width: 800px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }
    .btn {
        display: flex;
        width: 30px;
        height: 30px;
        padding: 0;
        background-color: #fff;
        box-sizing: content-box;
        border: 1px solid #9d9d9d;
        border-radius: 15px;
        background-repeat: no-repeat;
        background-position: center;
        cursor: pointer;
    }
    #play-btn {

    }
    .btn span {
        margin-left: 7px;
        width: 16px;
        height: 16px;
    }
    #play-btn-icon {

    }
    .play-btn-play {
        background-image: url('../../../public/images/bofang.png');
    }
    .play-btn-pause {
        background-image: url('../../../public/images/zanting.png');
    }
    #progress {
        height: 22px;
        width: 500px;
        position: relative;
        border: 1px solid #9d9d9d;
        border-radius: 10px;
        box-sizing: content-box;
        z-index: 0;
    }
    #progress-bar {
        height: 16px;
        width: 496px;
        border-radius: 8px;
        background-color: #5bc0de;
        position:relative;
        top: 3px;
        left: 2px;
        z-index: 0;
    }
    #progress-btn {
        width: 22px;
        height: 22px;
        border: 1px solid #9d9d9d;
        box-sizing: content-box;
        border-radius: 11px;
        position: relative;
        top: -17px;
        left: -1px;
        background-color: #fff;
        z-index: 1;

    }
    #progress-time {
        width: 180px;
        height: fit-content;
        padding: 5px 8px;
        color: #FFF;
        border: 1px solid #9d9d9d;
        border-radius: 3px;
        position: relative;
        box-sizing: border-box;
    }

</style>
