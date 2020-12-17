<template>
    <div class="container">
        <div id="dm-container" class="dm-container"></div>
        <div id="progress-container">
<!--            <progress-bar-->
<!--                    :data-arr="dataArr"-->
<!--                    :callback-function="callback"-->
<!--            ></progress-bar>-->
            <progress-bar></progress-bar>
        </div>
    </div>
</template>

<script>
    import diagramConfig from "../../public/config/diagram-config";
    import contextmenu_config from "../../public/config/contextmenu-config";
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

                dataArr: [],
                callback: function progressCallback(index) {

                }
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
                this.graphView.mi(function(e) {
                    if (e.kind === 'clickData') {
                        if (e.data.getTag() === 'DJX') {
                            window.location.href = 'index.html';
                        }
                    }
                });
                // 配置右键菜单
                this.setContextMenu(contextmenu_config, this.graphView);

                // 请求组态图结构数据以及初始化
                diagramConfig.pages.forEach(item => {
                    if(item.name === this.pageName) {
                        this.$axios.get(this.urlPreTreat(item.url))
                            .then(res => {
                                this.dataModel.deserialize(res.data, null, false);
                                this.graphView.setMovableFunc(function() {});
                                this.graphView.setSelectableFunc(function() {});
                                this.graphView.setPannable(false);
                                this.graphView.handleScroll = function() {};
                                let container = document.getElementById('dm-container');
                                // pageMainView.addToDOM(container);
                                this.graphView.addToDOM(container);
                                this.graphView.fitContent(false);
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
            nodeTrend () {
                console.log("nodeTrend");
            },
            totalTrend() {
                console.log("totalTrend");
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
