let nodeTrendDialog = null,
    uploadPageDialog = null,
    realTimeDialog = null,
    historyDialog = null;

// var serializerInput = document.createElement('textarea');
// serializerInput.style.resize = 'none';

// 查看测点趋势操作
let initNodeTrendDialog = function (){
    nodeTrendDialog = new ht.widget.Dialog();
    nodeTrendDialog.setConfig({
        title: '测点趋势',
        content: '<div id="echarts-container" style="width: 600px;height:400px;"></div>',
        closable: true,
        contentPadding: 10,
        buttons: [{
            label: '关闭',
            action: function(button, e) {
                nodeTrendDialog.hide();
            }
        }],
        buttonsAlign: 'right'//按钮居右排放
    });
};

let showNodeTrendDialog = function (nodeDataArr) {
    // console.log(nodeDataArr);
    initNodeTrendDialog();

    let nodeName = "",
        timeStamp = [],
        yData = [],
        ledendData = [],
        title = "",
        series = [];
    // 设置x轴
    nodeDataArr[0].forEach(function (item, index) {
        timeStamp.push(item.timeStamp);
    });
    // 设置 title，lendendData，y轴，series。
    nodeDataArr.forEach(function (item, index) {
        title += item[0].nodeTag + " ";
        ledendData.push(item[0].nodeTag);
        item.forEach(function (item, index) {
            yData.push(item.nodeValue);
        });
        series.push({
            name: item[0].nodeTag,
            type: 'line',
            data: yData
        });
        yData = [];
    });

    title += "变化曲线";

    nodeTrendDialog.show();

    echarts.init(document.getElementById('echarts-container')).setOption({
        title: {
            text: "趋势曲线",
            x: 'left',
            align: 'right'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ledendData,
            x: 'right'
        },
        xAxis: {
            data: timeStamp
        },
        yAxis: {},
        series: series
    });
};

// 对话框打开所需上传的文件
let initUploadPageDialog = function() {
    uploadPageDialog = new ht.widget.Dialog();
    uploadPageDialog.setConfig({
        title: '上传',
        content: '<input type="file" id = "uploadFile" />',
        closable: true,
        contentPadding: 10,
        buttons: [{
            label: '上传',
            action: function(button, e) {
                getFileAsJSON("uploadFile");
            }
        }],
        buttonsAlign: 'right'//按钮居右排放
    });
};

let showUploadPageDialog = function () {
    if (!uploadPageDialog) initUploadPageDialog();

    uploadPageDialog.show();
};

// 实时数据
let initRealTimeDialog = function(content) {
    realTimeDialog = new ht.widget.Dialog();
    realTimeDialog.setConfig({
        title: '实时数据',
        content: content,
        width: 500,
        height: 300,
        closable: true,
        contentPadding: 10,
        buttons: [{
            label: '关闭',
            action: function(button, e) {
                realTimeDialog.hide();

            }
        }],
        buttonsAlign: 'right'//按钮居右排放
    });
};

let showRealTimeDialog = function () {
        let content = '<table class = "table table-hover" id = "realTimeTable"><thead><tr><th>测点</th><th>值</th><th>时间标签</th></tr></thead><tbody>';
        // content += '<tr><th>power</th><td id = "realTimeValue">' + mainPowerValue + '</td><td id = "realTimeTime"></td></tr>';
        content += '</tbody></table>';

        if (!realTimeDialog) initRealTimeDialog(content);

        realTimeDialog.show();

        // getDataIntervalID = setInterval(function() {
        //     var date =  new Date();
        //     let year = date.getFullYear();
        //     let month = date.getMonth() + 1;
        //     let day = date.getDate();
        //     let hours = date.getHours();
        //     let minutes = date.getMinutes();
        //     let seconds = date.getSeconds();
        //     let time = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
        //     console.log(time);
        //
        //     $("#realTimeValue").innerText = mainPowerValue;
        //
        //     $("#realTimeTime").innerText = time;
        //
        // }, 3000);
};

// 历史数据
let initHistoryDialog = function(title, content) {
    historyDialog = new ht.widget.Dialog();
    historyDialog.setConfig({
        title: title,
        content: content,
        width: 500,
        // height: 300,
        closable: true,
        contentPadding: 10,
        buttons: [{
            label: '关闭',
            action: function(button, e) {
                historyDialog.hide();
            }
        }],
        buttonsAlign: 'right'//按钮居右排放
    });
};

let showHistoryDialog = function () {
    let slModel = graphView.sm().getSelection();
    if (slModel.size() === 0) {
        alert("请选择测点");
        return;
    }
    let nodeTagArr = [];
    slModel.forEach(function (item, index) {
        if (!item.getTag()) {
            alert("当前节点没有配置测点名");
            return;
        }
        nodeTagArr.push(item.getTag());
    });
    let title = "";
    let content = '';
    if (slModel.length !== 0) {
        $.ajax ({
            type: 'POST',
            url: "http://localhost/server/node-trend.php",
            data: {nodeTagArr: nodeTagArr},
            dataType: "json",
            success: function (nodeDataArr) {
                let nodeData = nodeDataArr[0];
                console.log(nodeData);

                content = '<table class = "table table-hover" id = "historyTable"><thead><tr><th>#</th><th>时间</th><th>值</th></tr></thead><tbody>';
                nodeData.forEach(function (item, index) {
                    content += '<tr><th>' + index + '</th><td>' + item.timeStamp + '</td><td>' + item.nodeValue + '</td></tr>';
                });
                content += '</tbody></table>';
                title = nodeDataArr[0][0].nodeTag + " 历史数据";

                initHistoryDialog(title, content);
                historyDialog.show();
            }
        });
    }
};
