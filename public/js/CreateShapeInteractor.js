var CreateShapeInteractor = function (graphView, type) {
    CreateShapeInteractor.superClass.constructor.call(this, graphView);
    this._points = new ht.List();
    this._type = type;
};
let startPoint = {};
ht.Default.def(CreateShapeInteractor, ht.graph.Interactor, {
    setUp: function () {
        CreateShapeInteractor.superClass.setUp.call(this);
        this._graphView.addTopPainter(this);
        this._onBackgroundDoubleClicked = this._graphView.onBackgroundDoubleClicked;
        this._graphView.onBackgroundDoubleClicked = function () { };
        this._graphView.sm().cs();
    },
    tearDown: function () {
        CreateShapeInteractor.superClass.tearDown.call(this);
        this._graphView.removeTopPainter(this);
        this._graphView.onBackgroundDoubleClicked = this._onBackgroundDoubleClicked;

        this.clear();
    },

    clear: function () {
        this._points.clear();
        this._downPoint = null;
        this._movePoint = null;
        this._isLeftClick = false;
    },

    handle_mousedown: function (e) { this.handle_touchstart(e); },
    handle_touchstart: function (e) {
        this._isLeftClick = ht.Default.isLeftButton(e) && ht.Default.getTouchCount(e) === 1;

        var gv = this._graphView;
        this._downPoint = this._movePoint = gv.lp(e);

        this.startDragging(e);
    },

    handleWindowMouseMove: function(e) { this.handle_mousemove(e); },
    handle_mousemove: function (e) {
        // clear
        this.redraw();

        this._movePoint = this._graphView.getLogicalPoint(e);

        if (this._isLeftClick) {
            var gv = this._graphView;

            var zoom = gv.getZoom();
            var dx = this._movePoint.x - this._downPoint.x;
            gv.tx(gv.tx() + dx * zoom);

            var dy = this._movePoint.y - this._downPoint.y;
            gv.ty(gv.ty() + dy * zoom);
        }

        // redraw
        this.redraw();
    },

    handleWindowMouseUp: function(e) {},
    handle_mouseup: function (e) { this.handle_touchend(e); },
    handle_touchend: function (e) {
        if (this._isLeftClick && this._downPoint === this._movePoint) {
            if (ht.Default.isDoubleClick(e)) {
                var size = this._points.size();
                if (size > 1) {
                    var shape = new this._type();
                    shape.s({
                        'shape.background': null,
                        // 'shape.border.color': 'rbg(255, 0, 0)',
                        'shape.border.width': 2,
                        'shape.dash.pattern': [8, 8]
                    });
                    shape.setPoints(this._points.toArray());

                    var graphView = this._graphView;
                    shape.setParent(graphView.getCurrentSubGraph());
                    graphView.dm().add(shape);
                    graphView.sm().ss(shape);

                    resetDefault();
                    return;
                }
            }
            else {
                let tempArr = this._points.toArray ();
                if (tempArr.length != 0) {
                    let xm = Math.abs (tempArr[tempArr.length - 1].x - this._downPoint.x);
                    let ym = Math.abs (tempArr[tempArr.length - 1].y - this._downPoint.y);
                    if (xm < 20 && ym < 20) {
                        return;
                    }
                    else if (xm > ym) {
                        this._downPoint.y = tempArr[tempArr.length - 1].y;
                    }
                    else {
                        this._downPoint.x = tempArr[tempArr.length - 1].x;
                    }
                }
                else {
                    startPoint = {
                        x: this._downPoint.x,
                        y: this._downPoint.y
                    }
                }
                this._points.add (this._downPoint);
            }
        }
        this.redraw();

        this._isLeftClick = false;
    },

    handle_mousewheel: function (e) {
        this._graphView.handleScroll(e, e.wheelDelta);
    },
    handle_DOMMouseScroll: function (e) {
        if(e.axis === 2){
            this._graphView.handleScroll(e, -e.detail);
        }
    },

    redraw: function () {
        var points = this._points.toList();
        if (points.size() === 0) return;

        if (this._movePoint) points.add(this._movePoint);

        var rect = ht.Default.unionPoint(points);
        if (rect) {
            ht.Default.grow(rect, 5);
            this._graphView.redraw(rect);
        }
    },
    draw: function (g) {
        var size = this._points.size();
        if (size === 0) return;

        // 画线
        var point = this._points.get(0);
        g.lineWidth = 1;
        g.strokeStyle = '#FF0000';
        g.beginPath();
        g.moveTo(point.x, point.y);
        for (var i = 1; i < size; i++) {
            point = this._points.get(i);
            g.lineTo(point.x, point.y);
        }
        if (this._movePoint) g.lineTo(this._movePoint.x, this._movePoint.y);
        g.stroke();

        // 画圈
        for (i = 0; i < size; i++) {
            point = this._points.get(i);
            g.fillStyle = 'white';
            g.strokeStyle = '#FF0000';
            g.lineWidth = 1;
            g.beginPath();
            g.arc(point.x, point.y, 4, 0, Math.PI * 2, true);
            g.fill();
            g.stroke();
        }
    }
});
