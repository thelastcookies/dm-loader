<template>
    <div class="container">
        <div id="dm-container" class="dm-container"></div>
        <div id="progress-container">
            <!--            <progress-bar-->
            <!--                    :data-arr="dataArr"-->
            <!--                    :callback-function="callback"-->
            <!--            ></progress-bar>-->
            <progress-bar v-if="progressBarShow"></progress-bar>
        </div>
    </div>
</template>

<script>
    import diagramConfig from "../../public/config/diagram-config";
    import contextmenuConfig from "../../public/config/contextmenu-config";
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
                realTimeInterval: null,
                nodeTagArr: [],
                dataArr: [],
                callback: function progressCallback(index) {

                },
            }
        },
        methods: {
            init() {
                this.dataModel = new ht.DataModel();
                this.graphView = new ht.graph.GraphView(this.dataModel);
                this.graphView.getSelectionModel().setSelectionMode('single');
                // let pageMainView = new ht.widget.SplitView (this.graphView, ProgressBar, 'v', -100);
                // pageMainView.setStatus("cr");
                // pageMainView.setDividerSize(1);

                // dataModel.deserialize(json);
                this.graphView.mi(function (e) {
                    if (e.kind === 'clickData') {
                        if (e.data.getTag() === 'DJX') {
                            window.location.href = 'index.html';
                        }
                    }
                });
                // 配置右键菜单
                this.setContextMenu(contextmenuConfig, this.graphView);

                // 请求组态图结构数据以及初始化
                diagramConfig.pages.forEach(item => {
                    if (item.name === this.pageName) {
                        this.$axios.get(this.urlPreTreat(item.url))
                            .then(res => {
                                this.dataModel.deserialize(res.data, null, false);
                                this.graphView.setMovableFunc(function () {
                                });
                                this.graphView.setSelectableFunc(function () {
                                });
                                this.graphView.setPannable(false);
                                this.graphView.handleScroll = function () {
                                };
                                let container = document.getElementById('dm-container');
                                // pageMainView.addToDOM(container);
                                this.graphView.addToDOM(container);
                                this.graphView.fitContent(false);

                                // this.nodeTagArr = this.dataModel.getNodeTags();
                                this.nodeTagArr = this.dataModel.getNodeTags().filter((item => {
                                    return /FC:/.test(item);
                                }));
                                this.getRealTimeData(this.nodeTagArr);
                            });
                    }
                });
            },
            urlPreTreat(url) {
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
                    console.log(this.$url.realtimeData);
                    // this.$axios.post(this.$url.realtimeData, request).then(res => {
                    //     console.log(res.data);
                    // let dataArr = res.data.values.split("|");
                    let dataArr = {"values": "60|221|237|198|239|250|254|247|214|166|181"}.values.split("|");
                    let data = [];
                    this.nodeTagArr.forEach((item, index) => {
                        data.push({
                            nodeTag: item,
                            value: dataArr[index]
                        })
                    });
                    this.dataModel.setNodeStatusByValue(data);
                    // });
                }, 3000);
            },
            historicalDataPreTreat(data) {
                {
                    "values":"value11;value12;value13;value14......|value21;value22;value23;value24......|value31;value32;value33;value34......|......"
                }
                let dataArr = [],
                    timestampArr = [];

                let timeStepCount = Math.floor((Date.parse(edTime) - Date.parse(stTime)) / interval) + 1;
                let timestampArr = [],
                    res = [];
                for (let i = 0; i < timeStepCount; i++) {
                    res.push(data.filter((item, index) => {
                        return (index - i) % timeStepCount === 0
                    }));
                    timestampArr.push(res[i][0].timestamp);
                }
                return {
                    data: dataArr,
                    timestampArr: timestampArr
                };
            }
        },
        created() {
        },
        mounted() {
            this.init();
        }
    }

</script>

<style scoped>
    .container {
        width: 100%;
        height: 100%;
        background-color: #000;
    }

    .dm-container {
        width: 100%;
        height: calc(100% - 50px);
    }

    #progress-container {
        height: 50px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
