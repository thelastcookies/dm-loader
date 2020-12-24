<template>
    <div class="container">
        <div class="dm-container" ref="dmContainer"
             :class="{'dm-container-sp': progressBarShow}"
        ></div>
        <div class="progress-bar" ref="progressBar"
             v-if="progressBarShow" :class="{'progress-bar-sp': progressBarShow}">
            <progress-bar :timestamp-arr="progressTimestamp"
                          :callback-function="progressBarCallback"
            ></progress-bar>
        </div>
    </div>
</template>

<script>
    import diagramConfig from "../../public/config/diagram-config";
    import ProgressBar from "../components/progress-bar/ProgressBar";

    export default {
        name: "DmLoader",
        components: {ProgressBar},
        props: {
            pageName: [String]
        },
        data() {
            return {
                dataModel: null,
                graphView: null,
                progressBarShow: false,
                progressTimestamp: [],
                realTimeInterval: null,
                nodeTagArr: [],
                stTime: '2020-12-20 13:00:00',
                edTime: '2020-12-20 14:00:00',
                interval: 300,
                historyData: [],
                contextmenuConfig: [
                    {
                        label: "查看测点信息",
                        fordata: 1,
                        action: (item, event) => {

                        }
                    },
                    {
                        label: "查看测点趋势",
                        fordata: 1,
                        action: (item, event) => {

                        }
                    },
                    {
                        label: "查看历史回放",
                        fordata: 2,
                        disabled: () => { return this.progressBarShow},
                        action: (item, event) => {
                            this.showProgressBar();
                        }
                    },
                    {
                        label: "关闭历史回放",
                        fordata: 2,
                        disabled: () => { return !this.progressBarShow},
                        action: (item, event) => {
                            this.hideProgressBar();
                        }
                    }
                ],
            }
        },
        methods: {
            init() {
                this.dataModel = new ht.DataModel();
                this.graphView = new ht.graph.GraphView(this.dataModel);
                this.graphView.getSelectionModel().setSelectionMode('single');
                // dataModel.deserialize(json);
                // this.graphView.mi(function (e) {
                //     if (e.kind === 'clickData') {
                //         if (e.data.getTag() === 'DJX') {
                //             window.location.href = 'index.html';
                //         }
                //     }
                // });
                // 配置右键菜单
                this.setContextMenu(this.contextmenuConfig, this.graphView);

                // 请求组态图结构数据以及初始化
                diagramConfig.pages.forEach(item => {
                    if (item.name === this.pageName) {
                        this.$axios.get(this.urlPreprocess(item.url))
                            .then(res => {
                                this.dataModel.deserialize(res.data, null, false);
                                this.graphView.setMovableFunc(function () {
                                });
                                this.graphView.setSelectableFunc(function (data) {
                                    return data.a('node.type') === 'm-point';
                                });
                                this.graphView.setPannable(false);
                                this.graphView.handleScroll = function () {
                                };
                                this.graphView.addToDOM(this.$refs.dmContainer);
                                this.graphView.fitContent(false);
                                this.nodeTagArr = this.dataModel.getNodeTags().filter((item => {
                                    return /FC:/.test(item);
                                }));
                                this.getRealTimeData(this.nodeTagArr);
                            });
                    }
                });
            },
            urlPreprocess(url) {
                return url.replace("#", "%23")
            },
            /**
             * setContextMenu 设置右键点击事件
             * @param contextmenu_config - 右键点击配置
             * @param graphView - graphView
             */
            setContextMenu(contextmenu_config, graphView) {
                let contextmenu = new ht.widget.ContextMenu(contextmenu_config);
                contextmenu.enableGlobalKey();
                contextmenu.setVisibleFunc(function (item) {
                    let data = graphView.sm().ld();
                    if (data instanceof ht.Node) {
                        return item.fordata === 1;
                    } else {
                        return item.fordata === 2;
                    }
                });
                contextmenu.addTo(graphView.getView());
            },
            /**
             * getRealTimeData 获取实时数据
             * @param nodeArr - 需要请求参数的测点数组
             */
            getRealTimeData(nodeArr) {
                const nodeStrJoint = nodeArr.join("|");
                const request = {tags: nodeStrJoint};
                this.realTimeInterval = setTimeout(() => {
                    this.$axios.post(this.$url.realtimeData, request).then(res => {
                    let dataArr = res.data.values.split("|");
                    // let dataArr = {"values": "60|221|237|198|239|250|254|247|214|166|181"}.values.split("|");
                    let data = [];
                    this.nodeTagArr.forEach((item, index) => {
                        data.push({
                            nodeTag: item,
                            value: dataArr[index]
                        })
                    });
                    this.dataModel.setNodeStatusByValue(data);
                    });
                }, 3000);
            },
            /**
             * historicalDataPreprocess 处理请求返回的历史数据
             * @param data - 需要请求参数的测点数组
             * 返回一个由 dataArr 和 timestampArr 组成的对象
             * dataArr 是一个返回数据的转置，表示每个时间点各个组件的数据，用于进度条组件回调函数使用
             * timestampArr 是一个历史数据请求开始时间和结束时间构成的数组，用于传递给进度条组件
             */
            historicalDataPreprocess(data) {
                let tagDataArr = data.split("|");
                tagDataArr = tagDataArr.map(item => item.split(";"));
                let tagDataArrTranspose = tagDataArr[0].map((col, ci) => {
                    return tagDataArr.map((row, ri) => {
                        return {
                            nodeTag: this.nodeTagArr[ri],
                            value: row[ci]
                        }
                    })
                });
                let timestampArr = [];
                for (let i = 0, len = tagDataArrTranspose.length; i < len; i++) {
                    timestampArr.push(this.dateToStr(new Date(this.stTime).getTime() + i * this.interval * 1000));
                }
                console.log(timestampArr);
                return {
                    dataArr: tagDataArrTranspose,
                    timestampArr: timestampArr
                };
            },
            progressBarCallback(index) {
                this.dataModel.setNodeStatusByValue(this.dataModel.formulaPreprocess(this.historyData[index]));
            },
            dateToStr(date) {
                if (!(date instanceof Date)) date = new Date(date);
                return '' + date.getFullYear() + '-' +
                    (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-' +
                    (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ' +
                    (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' +
                    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':' +
                    (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
            },
            requestTimeStrPreprocess(timeStr) {
                let time = new Date(timeStr);
                return '' + time.getFullYear() +
                    (time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1) +
                    (time.getDate() < 10 ? '0' + time.getDate() : time.getDate()) +
                    (time.getHours() < 10 ? '0' + time.getHours() : time.getHours()) +
                    (time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()) +
                    (time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds());
            },
            /**
             * 显示进度条方法
             * 包括历史数据的获取
             */
            showProgressBar() {
                let nodeStrJoint = this.dataModel.getNodeTags().filter((item => {
                    return /FC:/.test(item);
                })).join("|");
                const request = {
                    tags: nodeStrJoint,
                    time: `${this.requestTimeStrPreprocess(this.stTime)}-${this.requestTimeStrPreprocess(this.edTime)}`,
                    interval: this.interval
                };

                // 测试数据
                // const request = {
                //     tags: nodeStrJoint,
                //     time: "20200531130000-20200531140000",
                //     interval: 300
                // };
                this.$axios.post(this.$url.historicalData, request).then(res => {
                    if (!(res.data.values instanceof Array)) { alert(`获取历史数据失败！Error Code: ${res.data.values}`); return};
                    let progressBarData = this.historicalDataPreprocess(res.data.values);
                    this.historyData = progressBarData.dataArr;
                    this.progressTimestamp = progressBarData.timestampArr;
                    if (this.realTimeInterval) clearInterval(this.realTimeInterval);
                    this.progressBarShow = true;
                    this.$nextTick(() => {
                        this.graphView.setHeight(this.$refs.dmContainer.offsetHeight);
                        this.graphView.fitContent(true);
                    });
                });
            },
            /**
             * 隐藏进度条方法
             * 隐藏后获取实时数据
             */
            hideProgressBar() {
                this.progressBarShow = false;
                this.$nextTick(() => {
                    this.graphView.setHeight(this.$refs.dmContainer.offsetHeight);
                    this.graphView.fitContent(true);
                });
                this.getRealTimeData(this.nodeTagArr);
            }
        },
        created() {
        },
        mounted() {
            this.init();
            window.onresize = () => this.graphView.fitContent(false);
        }
    }

</script>

<style scoped>
    .container {
        width: 100%;
        height: 100%;
        background-color: #000;
        overflow: hidden;
    }

    .dm-container {
        width: 100%;
        height: 100%;
    }
    .dm-container-sp {
        height: calc(100% - 50px);
    }
    .progress-bar {
        height: 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .progress-bar-sp {
        height: 50px;
    }
</style>
