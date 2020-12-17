!function(B){"use strict";var G="ht",E=B[G],K=E.Default,J=Math,I=(J.PI,J.sin,J.cos,J.atan2,J.sqrt,J.max),S=J.floor,h=(J.round,J.ceil),y=E.Shape,F=(E.Edge,E.List),T=E.Style,$=E.graph,H=K.getInternal(),X=H.ui(),q=null,f="prototype",n=B.clearInterval,R=B.setInterval,k=function(Z){var x=Z.data,E=this.dm();if(x&&"add"===Z.kind){var g=E.$1c,o=x instanceof y?"shape.":"edge.";g&&x.s(o+"dash.flow")&&g.indexOf(x)<0&&g.push(x)}"clear"===Z.kind&&(E.$1c=[])},N=function(W){var r=W.property,B=W.data,u=W.newValue,M=this.dm().$1c,h=B instanceof y?"s:shape.dash.flow":"s:edge.dash.flow";if(M&&r===h)if(u)M.indexOf(B)<0&&M.push(B);else for(var v=M.length,c=0;v>c;c++)if(M[c]===B){M.splice(c,1);break}},r=$.GraphView[f],s=X.EdgeUI[f],M=X.ShapeUI[f],i=M._80o,d=s._80o,p=E.DataModel[f],v=p.prepareRemove,t=r.setDataModel;T["edge.dash.flow.step"]==q&&(T["edge.dash.flow.step"]=3),T["shape.dash.flow.step"]==q&&(T["shape.dash.flow.step"]=3),p.prepareRemove=function(J){v.call(this,J);var t=J._dataModel,$=t.$1c;if($)for(var q=$.length,j=0;q>j;j++)if($[j]===J){$.splice(j,1);break}},r.setDataModel=function(q){var u=this,L=u._dataModel;if(L!==q){L&&(L.umm(k,u),L.umd(N,u),L.$1c=[]),q.mm(k,u),q.md(N,u);var B=q.$1c=[];q.each(function(g){var l=g instanceof y?"shape.":"edge.";g.s(l+"dash.flow")&&B.indexOf(g)<0&&B.push(g)}),t.call(u,q)}},r.setDashFlowInterval=function(U){var h=this,K=h.$2c;h.$2c=U,h.fp("dashFlowInterval",K,U),h.$3c!=q&&(n(h.$3c),delete h.$3c,h.enableDashFlow(U))},r.getDashFlowInterval=function(){return this.$2c},r.$4c=function(){var z,B,g,x=this,q=x.tx(),Y=x.ty(),O=x._zoom,C=x.getWidth(),i=x.getHeight(),Z={x:-q/O,y:-Y/O,width:C/O,height:i/O},N=x.dm().$1c,$=x._56I,E=new F;if(N.forEach(function(I){$[I.getId()]&&(z=x.getDataUI(I),z&&(g=z._79o(),g&&E.add(g)))}),0!==E.size()&&(E.each(function($){K.intersectsRect(Z,$)&&(B=K.unionRect(B,$))}),B&&(B&&(K.grow(B,I(1,1/O)),B.x=S(B.x*O)/O,B.y=S(B.y*O)/O,B.width=h(B.width*O)/O,B.height=h(B.height*O)/O,B=K.intersection(Z,B)),B))){var k=x._canvas.getContext("2d");k.save(),k.lineCap=K.lineCap,k.lineJoin=K.lineJoin;var V=K.devicePixelRatio,X=B.x,c=B.y,D=B.width,p=B.height;X=Math.floor((X*O+q)*V),c=Math.floor((c*O+Y)*V),D=Math.ceil(D*O*V)+1,p=Math.ceil(p*O*V)+1,B.x=(X/V-q)/O,B.y=(c/V-Y)/O,B.width=D/V/O,B.height=p/V/O,k.beginPath(),k.rect(X,c,D,p),k.clip(),k.clearRect(X,c,D,p),H.translateAndScale(k,q,Y,O),x.$5c(k,B),k.restore()}},r.$5c=function(g,i){var q,H,F=this;F._93db(g),F.each(function(c){F._56I[c._id]&&(q=F.getDataUI(c),q&&(H=q._79o(),(!i||K.intersectsRect(i,H))&&(q.$7c=!0,q._42(g),delete q.$7c)))}),F._92db(g)},r.enableDashFlow=function(V){var e=this;e.$3c==q&&(e.$3c=R(function(){e.$4c()},V||e.$2c||50))},r.disableDashFlow=function(){var r=this;n(r.$3c),delete r.$3c};var l=function(){var M=this,K=M._data,N=K instanceof y?"shape.":"edge.",U=K.s(N+"dash.pattern"),n=K.s(N+"dash.flow.reverse");if(U&&K.s(N+"dash")&&K.s(N+"dash.flow")&&M.$7c){var o=M.s(N+"dash.offset")||0,$=K.s(N+"dash.flow.step"),G=K.getStyleMap(),B=0;U.forEach(function(N){B+=N}),n&&($=-$),o-=$,o%=B,G||(K._styleMap=G={}),G[N+"dash.offset"]=o}};s._80o=function(c){d.call(this,c),l.call(this)},M._80o=function(o){i.call(this,o),l.call(this)}}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:(0,eval)("this"),Object);