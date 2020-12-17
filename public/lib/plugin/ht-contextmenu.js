!function(C,f){"use strict";var B="ht",N=C[B],o="position",t="absolute",b="px",K="left",Z="top",U="innerHTML",O="className",k="width",G="height",Q="0",h="display",X="none",l="visibility",R="user-select",n="margin",u="padding",z=null,w=N.Color,m=N.Default,J=m.getInternal(),T=C.setTimeout,y=C.setInterval,S=C.clearTimeout,j=C.clearInterval,A=C.parseInt,W=m.isLeftButton,p=m.isDragging,e=m.startDragging,V=m.getDistance,r=m.isTouchable,M=m.isTouchEvent,P=m.getPagePoint,c=m.isRightButton,i=w.widgetIconHighlight,d=w.widgetIconBorder,I=w.widgetIconGradient,v=function(){return document},g=function(P,s){return P.querySelectorAll(s)},_=function(N){var S=v().createElement(N);return"ul"===N&&(s(S,o,"relative"),s(S,n,Q),s(S,u,Q),s(S,"list-style",X),s(S,"box-sizing","border-box"),s(S,"-moz-box-sizing","border-box"),s(S,h,"inline-block"),s(S,"vertical-align","text-bottom"),s(S,"border","1px solid "+m.contextMenuBorderColor),s(S,"box-shadow","0 0 16px 1px "+m.contextMenuShadowColor),s(S,"overflow","hidden"),m.contextMenuBorderRadius&&s(S,"border-radius",m.contextMenuBorderRadius+b)),S},q=function(Y){var N=Y.touches[0];return N?N:Y.changedTouches[0]},E=function(){return _("div")},L=function(){return _("canvas")},s=function(v,k,Q){v.style.setProperty(k,Q,z)},$=function(W,y,S){m.def(N.widget[W],y,S)},D=function(p,V){p.appendChild(V)},H=function(d,Q){d.removeChild(Q)},Y=J.addEventListener,x=J.removeEventListener;J.addMethod(m,{contextMenuCheckIcon:{width:16,height:16,comps:[{type:"border",rect:[1,1,14,14],width:1,color:d},{type:"shape",points:[13,3,7,12,4,8],borderWidth:2,borderColor:i}]},contextMenuRadioIcon:{width:16,height:16,comps:[{type:"circle",rect:[2,2,12,12],borderWidth:1,borderColor:d},{type:"circle",rect:[4,4,8,8],borderWidth:1,borderColor:i,gradient:m.imageGradient,gradientColor:I,background:i}]},contextMenuLabelFont:(r?"16":"13")+"px arial, sans-serif",contextMenuLabelColor:"#000",contextMenuBackground:"#fff",contextMenuDisabledLabelColor:"#888",contextMenuHoverBackground:"#648BFE",contextMenuHoverLabelColor:"#fff",contextMenuSeparatorWidth:1,contextMenuSeparatorColor:"#E5E5E5",contextMenuScrollerColor1:"#FDFDFD",contextMenuScrollerColor2:"#D3D3D3",contextMenuScrollerBorderColor:"#C3C3C3",contextMenuBorderColor:"#C3C3C3",contextMenuShadowColor:"rgba(128, 128, 128, 0.5)",contextMenuBorderRadius:5,contextMenuSubmenuMark:"▶"},!0);var a=function(b){var n=this,w=b._view;n.$11b=b,n.addListeners(),Y(w,"contextmenu",function(N){N.preventDefault()});var _=n.$37b=n.$36b.bind(n);Y(w,"mouseover",_),Y(w,"mouseout",_)};m.def(a,f,{ms_listener:1,getView:function(){return this.$11b._view},handle_touchstart:function(Y){if(m.preventDefault(Y),W(Y)){for(var g=this,N=g.$11b,E=g.getView(),w=E.children,C=0;C<w.length;C++){var p=w[C],Z=p.$24b,s=p.$25b;if(Z&&Z.contains(Y.target))return N.scrollUp(p),g.$28b=T(function(){g.$29b=y(function(){N.scrollUp(p)},100)},500),e(g,Y),void 0;if(s&&s.contains(Y.target))return N.scrollDown(p),g.$28b=T(function(){g.$29b=y(function(){N.scrollDown(p)},100)},500),e(g,Y),void 0}g.$30b=P(Y)}},handle_mousedown:function(O){this.handle_touchstart(O)},handle_touchend:function(E){if(W(E)){var $=this,w=$.$30b,P=M(E)?{x:q(E).pageX,y:q(E).pageY}:{x:E.pageX,y:E.pageY};if(!w||V(w,P)>1)return delete $.$30b,void 0;for(var N=$.getView(),m=$.$11b,A=E.target,L=z,J=z,b=m._items,F=N.$26b,e=0;e<F.length;e++)if(J=F[e],J.contains(A)){L=J.getAttribute("data-id");break}if(L&&b){var h=m.$17b(b,function(k){return k._id===L});if(h){var v=!1;h.disabled instanceof Function?v=h.disabled.call(m,h):h.disabled===!0&&(v=!0),v||(h.items?M(E)&&$.$36b(J,!0):m.$1b(h,E))}}delete $.$30b}},$36b:function(W,E){if(!p()){var w,e=this,x=e.$11b,M=e.getView(),H=x.$20b||M.children[0],i=x.$19b,v=M.$26b,G=M.children,Q=W.target,X=M.getBoundingClientRect(),q=m.getWindowInfo(),u=q.width,n=q.height,F=function(b){for(var S=0;S<G.length;S++){var F=G[S],o=new RegExp(b+"$"),T=F[O];if(T&&(o.test(T)||T.indexOf(b+" ")>=0))return F}},J=function(I){for(var m=0;m<v.length;m++){var t=v[m],f=new RegExp(I+"$"),H=t[O];if(H&&(f.test(H)||H.indexOf(I+" ")>=0))return t}},k=function(L){var C=J("menu-item"+L.$45b),E=C.getBoundingClientRect(),d=E.top-X.top,j=E.left-X.left;s(L,Z,d+b),s(L,K,j+E.width+b);var r=L.getBoundingClientRect(),T=r.top,R=r.left,o=r.height,x=r.width,f=T+o+2,Q=R+x+2;f>n&&s(L,Z,d+n-f+b),Q>u&&s(L,K,j-x+b)};if(E)w=W;else{if("mouseover"===W.type){for(var R=0;R<v.length;R++){var S=v[R];if(S.contains(Q)){w=S;break}}if(!w&&i){var t=i.parentNode,C=F("submenu"+i.getAttribute("data-id"));(C&&C.contains(Q)||t&&t.contains(Q))&&(w=i)}}else if("mouseout"===W.type){for(var c=!1,A=W.relatedTarget,R=0;R<G.length;R++){var y=G[R];if("hidden"!==y.style.visibility&&y.contains(A)){c=!0;break}}if(c)return}!w&&H&&(w=J("menu-item"+(H.$45b||"NaN")))}if(w!=i){if(i)for(var r=i;r;){if(r[O]=r[O].replace(" menu-item-hover",""),r[O].indexOf("disabled")<0){var L=x.getItemByProperty("_id",r.getAttribute("data-id"));null!=L.background?L.background instanceof Function?s(r,"background-color",L.background.call(x,L)):s(r,"background-color",L.background):s(r,"background-color",m.contextMenuBackground),s(r,"color",m.contextMenuLabelColor)}var o=F("submenu"+r.getAttribute("data-id"));o&&s(o,l,"hidden");var Y=r.parentNode;r=J("menu-item"+(Y.$45b||"NaN"))}if(w){for(var P=w,B=[];P;){P[O]+=" menu-item-hover",P[O].indexOf("disabled")<0&&(s(P,"background-color",m.contextMenuHoverBackground),s(P,"color",m.contextMenuHoverLabelColor));var U=F("submenu"+P.getAttribute("data-id"));U&&(s(U,l,"visible"),B.push(U));var Y=P.parentNode;P=J("menu-item"+(Y.$45b||"NaN"))}B.reverse(),B.forEach(function(x){k(x)})}}x.$19b=w,x.$20b=w?w.parentNode:M.children[0]}},handle_mouseup:function(O){this.handle_touchend(O)},handleWindowTouchEnd:function(){var Z=this;Z.$28b!=z&&(S(Z.$28b),delete Z.$28b),Z.$29b!=z&&(j(Z.$29b),delete Z.$29b),delete Z.$34b,delete Z.$30b,delete Z.$35b},handleWindowMouseUp:function(p){this.handleWindowTouchEnd(p)},handle_mousemove:function(T){this.handle_touchmove(T)},handle_touchmove:function(i){if(!p()&&W(i)){for(var g=this,F=g.getView().children,E=z,O=0;O<F.length;O++){var s=F[O];if(s.contains(i.target)){E=s;break}}var k=g.$30b,X=M(i)?{x:q(i).pageX,y:q(i).pageY}:{x:i.pageX,y:i.pageY};E&&k&&V(k,X)>2&&(e(g,i),g.$34b=E,g.$35b=E.$18b)}},handleWindowTouchMove:function(i){i.preventDefault();var N=this,$=N.$11b,Q=N.$34b,d=N.$35b,A=N.$30b;if(A&&Q){var p=M(i)?{x:q(i).pageX,y:q(i).pageY}:{x:i.pageX,y:i.pageY},b=p.y-A.y;b>0?$.scrollUp(Q,Q.$18b-(d-b)):$.scrollDown(Q,d-b-Q.$18b)}},handleWindowMouseMove:function(F){this.handleWindowTouchMove(F)},$10b:function(O,P){O.preventDefault();for(var j=this,E=j.getView().children,S=z,C=0;C<E.length;C++){var y=E[C];if(y.contains(O.target)){S=y;break}}if(S){var Q=this.$11b,n=Q.getRowHeight();Math.abs(P)>.05&&(P>0?Q.scrollUp(S,P*n):0>P&&Q.scrollDown(S,-P*n))}},handle_mousewheel:function(t){this.$10b(t,t.wheelDelta/40)},handle_DOMMouseScroll:function(F){this.$10b(F,-F.detail)},$44b:function(m){this.getView().contains(m.target)||this.$11b.hide()},$41b:function(I){m.preventDefault(I)},$4b:function(u,r){var R=this.$11b;if(r=r||R._items,r&&r.length&&u.keyCode){var s=[u.keyCode];u.shiftKey&&s.push(16),u.ctrlKey&&s.push(17),u.altKey&&s.push(18),/mac/.test(C.navigator?C.navigator.userAgent.toLowerCase():"")?u.metaKey&&s.push(17):u.metaKey&&s.push(91),s.sort();var y=s.join(),n=R.$17b(r,function(o){if(o.key){var F=o.key.slice(0);return F.sort(),y===F.join()}});if(n){n.preventDefault!==!1&&u.preventDefault();var H=!1;n.disabled instanceof Function?H=n.disabled.call(R,n):n.disabled===!0&&(H=!0),H||R.$1b(n,u)}}},$39b:function(y){this.$32b=P(y)},$38b:function(n){if(m.preventDefault(n),!W(n)){var e=this;e._showContextMenu=c(n),e._showContextMenu||(e.$31b=P(n),e.$33b=T(function(){e._showContextMenu=!0,delete e.$33b},600))}},$40b:function(e){var W=this;W._showContextMenu&&(c(e)?W.$11b.show(e):W.$31b&&(W.$32b?V(W.$31b,W.$32b)<10&&W.$11b.show(e):W.$11b.show(e))),W.$33b!=z&&(S(W.$33b),delete W.$33b),delete W.$31b,delete W.$32b}}),N.widget.ContextMenu=function(q){var T=this,L=T._view=J.createView(null,T);L[O]="ht-widget-contextmenu",T.setItems(q),T.$13b=new a(T),s(L,"font",m.contextMenuLabelFont),s(L,o,t),s(L,"cursor","default"),s(L,"-webkit-"+R,X),s(L,"-moz-"+R,X),s(L,"-ms-"+R,X),s(L,R,X),s(L,"box-sizing","border-box"),s(L,"-moz-box-sizing","border-box"),m.baseZIndex!=z&&s(L,"z-index",A(m.baseZIndex)+2+""),T.$3b=function(_){T.$13b.$4b(_)}},$("ContextMenu",f,{$5b:0,_items:z,$21b:z,_enableGlobalKey:!1,ms_v:1,enableGlobalKey:function(){var N=this,g=N._enableGlobalKey;g===!1&&(Y(v(),"keydown",N.$3b),N._enableGlobalKey=!0)},disableGlobalKey:function(){this._enableGlobalKey=!1,x(v(),"keydown",this.$3b)},setItems:function(P){this._items=P},getItems:function(){return this._items},setVisibleFunc:function(N){this.$16b=N},setLabelMaxWidth:function(P){this.$43b=P},$1b:function(W,P){var Q=this;if("check"===W.type)W.selected=!W.selected;else if("radio"===W.type){var V=W.groupId;Q.$17b(Q._items,function(l){l.groupId===V&&(l.selected=!1)}),W.selected=!0}if(Q.hide(),W.action)W.action.apply(W.scope||Q,[W,P]);else if(W.href){var E=W.linkTarget||"_self";C.open(W.href,E)}},getItemById:function(I){return this.getItemByProperty("id",I)},setItemVisible:function(B,V){var C=this.getItemById(B);C&&(C.visible=V)},getItemByProperty:function(U,T,G){var S=this;if(G=G||S._items,!G||0===G.length)return z;var k=S.$17b(G,function(c){return c[U]===T});return k||z},scrollUp:function(M,P){var L=this;if(P=P==z?20:P,P=A(P),0!==P){var R=0;M.$18b>P&&(R=M.$18b-P),L.$42b(M,R),M.scrollTop=R,M.$18b=R}},scrollDown:function(W,Z){var a=this;if(Z=Z==z?20:Z,Z=A(Z),0!==Z){var y=W.$22b,Y=W.$23b,i=y-Y;Y+W.$18b+Z<y&&(i=W.$18b+Z),a.$42b(W,i),W.scrollTop=i,W.$18b=i}},$42b:function(I,n){n=n==z?I.$18b:n;var g=I.$24b,e=I.$25b;g&&(s(g,"top",n+b),0==n?s(g,h,X):s(g,h,"block")),e&&(s(e,"bottom",-n+b),n==I.$22b-I.$23b?s(e,h,X):s(e,h,"block"))},getRowHeight:function(){return this._view.querySelector(".menu-item").offsetHeight},$17b:function(c,H){for(var y=0;y<c.length;y++){var X=c[y];if(H(X))return X;if(X.items){var D=this.$17b(X.items,H);if(D)return D}}},$2b:function(X,q){for(var z=this,K=0;K<X.length;K++){z.$5b++;var Y=X[K];if(Y.visible!==!1)if(m.isFunction(Y.visible)&&Y.visible()===!1)this._clearItemId(Y);else if(!z.$16b||z.$16b.call(z,Y)){var g=_("li"),J=z.$5b+"";if(s(g,"white-space","nowrap"),s(g,h,"block"),"separator"===Y||Y.separator===!0){var $=E();$[O]="separator",s($,G,m.contextMenuSeparatorWidth+b),s($,"background",m.contextMenuSeparatorColor),D(g,$)}else{Y._id=J,g.setAttribute("data-id",J);var v=_("span"),Q=_("span"),P=L(),d=E();if(s(v,h,"inline-block"),s(v,G,"1.2em"),s(Q,h,"inline-block"),s(Q,G,"1.2em"),s(Q,"line-height","1.2em"),P[O]="prefix",s(P,h,"inline-block"),s(P,k,"1em"),s(P,G,"1em"),s(P,"vertical-align","middle"),s(P,n,"0 0.2em"),"check"===Y.type&&Y.selected?P[O]+=" check-prefix":"radio"===Y.type&&Y.selected&&(P[O]+=" radio-prefix"),D(g,P),Y.icon){var R=L();R[O]="contextmenu-item-icon",s(R,h,"inline-block"),s(R,G,"1.2em"),s(R,k,"1.2em"),s(R,"margin-right","0.2em"),s(R,"float","left"),R.$50b=Y.icon,R._item=Y,D(v,R)}if(Q[U]=Y.label,D(v,Q),D(g,v),d[O]="suffix",s(d,h,"inline-block"),s(d,"margin-left","1em"),s(d,"margin-right","0.4em"),s(d,"text-align","right"),s(d,"font-size","75%"),Y.items&&(d[U]=m.contextMenuSubmenuMark),Y.suffix&&(d[U]=Y.suffix),D(g,d),g[O]="menu-item menu-item"+J,null!=Y.background?Y.background instanceof Function?s(g,"background-color",Y.background.call(z,Y)):s(g,"background-color",Y.background):s(g,"background-color",m.contextMenuBackground),s(g,"color",m.contextMenuLabelColor),s(g,u,"3px 0"),Y.disabled instanceof Function){var p=Y.disabled.call(z,Y);p&&(g[O]+=" disabled",s(g,"color",m.contextMenuDisabledLabelColor))}else Y.disabled&&(g[O]+=" disabled",s(g,"color",m.contextMenuDisabledLabelColor));if(Y.items){z.$21b||(z.$21b=new N.List);var r=_("ul");r[O]="submenu"+J,r.$45b=J,s(r,l,"hidden"),s(r,o,t),D(z._view,r),z.$21b.add(r),z.$2b(Y.items,r)}}D(q,g)}else this._clearItemId(Y);else this._clearItemId(Y)}},rebuild:function(){var x=this,W=x._items,Z=x._view;if(Z&&(Z[U]="",x.$21b=z,x.$5b=0,x.$19b=z,x.$20b=z,Z.$26b=z,W&&0!==W.length)){var T=_("ul",x._r);D(Z,T),x.$2b(W,T)}},addTo:function(z){if(z){var b=this,t=b.$13b;b.$12b=z,b.$9b=function(X){t.$44b(X)};var J=b.$6b=function(S){t.$38b(S)},s=b.$7b=function(a){t.$39b(a)},e=b.$8b=function(H){t.$40b(H)};m.mockTouch&&(Y(z,"touchstart",J,!0),Y(z,"touchmove",s),Y(z,"touchend",e)),Y(z,"mousedown",J,!0),Y(z,"mousemove",s),Y(z,"mouseup",e),b.$27b=function(S){t.$41b(S)},Y(z,"contextmenu",b.$27b)}},showOnView:function(H,M,b){H=H.getView?H.getView():H;var $=m.getWindowInfo(),y=H.getBoundingClientRect();this.show(y.left+$.left+M,y.top+$.top+b)},show:function(X,L,n){var p=this,n=n==z?!0:!1,J=p._view;if(J){if(p.invalidate(),1===arguments.length){var e=X;if(M(e)){var c=q(e);X=c.pageX,L=c.pageY}else X=e.pageX,L=e.pageY}var H=m.getWindowInfo(),j=H.width,r=H.height,P=H.left,S=H.top,R={pageX:X,pageY:L,clientX:X-P,clientY:L-S,target:1,originEvent:e},f=R.clientX,W=R.clientY,a=function(h){h.style.height=r-6+b;var B=E(),v=E(),G=function(d){s(d,o,t),s(d,"text-align","center"),s(d,k,"100%"),s(d,"font-size",10+b),s(d,"padding","2px 0"),s(d,"border","0px solid "+m.contextMenuScrollerBorderColor),s(d,"background-color",m.contextMenuScrollerColor1),d.style.backgroundImage="-webkit-linear-gradient(top, "+m.contextMenuScrollerColor1+", "+m.contextMenuScrollerColor2+")",d.style.backgroundImage="linear-gradient(to bottom, "+m.contextMenuScrollerColor1+", "+m.contextMenuScrollerColor2+")"};B[O]="menu-arrow-item menu-arrow-item-top",v[O]="menu-arrow-item menu-arrow-item-bottom",G(B),s(B,"top",Q),s(B,"left",Q),s(B,"border-bottom-width",1+b),B[U]="▲",G(v),s(v,"bottom",Q),s(v,"left",Q),s(v,"border-top-width",1+b),v[U]="▼",h.$24b=B,h.$25b=v,h.$18b=h.scrollTop,h.$22b=h.scrollHeight,h.$23b=h.clientHeight,D(h,B),D(h,v),p.$42b(h)};p.beforeShow&&p.beforeShow(R);var y=p._items;if(y&&(e&&e.preventDefault(),y.length)){p.rebuild(),m.appendToScreen(J),J.$26b=g(J,".menu-item");var d=J.children[0];d.offsetHeight>r&&a(d);var B=W+(n?1:0),i=f+(n?1:0),N=function(w){for(var m=0,V=0,A=0,D=p.$43b;A<w.children.length;A++){var x=w.children[A];if(x.getAttribute("data-id")){var v=x.children[1],l=x.children[2],S=v.children;if(D){var z=S[0];S.length>1&&(z=S[1]),z.offsetWidth>D&&(z[U]="<marquee scrollamount='3'>"+z[U]+"</marquee>",z.children[0].style.verticalAlign="text-bottom",s(z,k,D+b),s(z,h,"inline-block"))}var M=v.offsetWidth,Q=l.offsetWidth;M>m&&(m=M),Q>V&&(V=Q)}}for(A=0;A<w.children.length;A++){var x=w.children[A];if(x.getAttribute("data-id")){var v=x.children[1],l=x.children[2],o=v.children[0],N=v.children[1];!N&&o.style.width&&s(o,k,m+b),s(v,k,m+b),s(l,k,V+b)}}};N(d);var u=W+3+J.offsetHeight,_=f+3+J.offsetWidth;u>r?s(J,Z,B-(u-r)+S+b):s(J,Z,B+S+b),_>j?s(J,K,i-(_-j)+P+b):s(J,K,i+P+b);var x=p.$21b;x&&x.each(function(O){N(O),O.offsetHeight>r&&a(O)}),p.$9b&&(m.mockTouch&&Y(v(),"touchstart",p.$9b,!0),Y(v(),"mousedown",p.$9b,!0)),p.afterShow&&p.afterShow(R),p.$47b()}}},isShowing:function(){return this._view?this._view.parentNode!=z:!1},getRelatedView:function(){return this.$12b},hide:function(){var n=this,S=n._view;S&&S.parentNode&&(H(S.parentNode,S),m.mockTouch&&x(v(),"touchstart",n.$9b,!0),x(v(),"mousedown",n.$9b,!0),n.afterHide&&n.afterHide())},dispose:function(){var j=this,l=j.$12b,k=j._view;k&&(this.hide(),j.disableGlobalKey(),l&&(m.mockTouch&&(x(l,"touchstart",j.$6b,!0),x(l,"touchmove",j.$7b),x(l,"touchend",j.$8b)),x(l,"mousedown",j.$6b,!0),x(l,"mousemove",j.$7b),x(l,"mouseup",j.$8b),x(l,"contextmenu",j.$27b)),j._view=j._items=j.$21b=j.$19b=j.$12b=j.beforeShow=j.afterShow=j.afterHide=j.$9b=j.$3b=j.$6b=j.$7b=j.$8b=j.$27b=z)},$46b:function(M,R,G,o,g){var k=J.initContext(M);J.translateAndScale(k,0,0,1),k.clearRect(0,0,G,o),m.drawStretchImage(k,m.getImage(R),"fill",0,0,G,o,g,this),k.restore()},$47b:function(){var f,j,r,N=this,v=N._view;if(N.isShowing()){var l=g(v,".check-prefix");for(r=0;r<l.length;r++){var P=l[r];f=P.clientWidth,j=P.clientHeight,P.$48b=f,P.$49b=j,J.setCanvas(P,f,j)}var R=g(v,".radio-prefix");for(r=0;r<R.length;r++){var O=R[r];f=O.clientWidth,j=O.clientHeight,O.$48b=f,O.$49b=j,J.setCanvas(O,f,j)}var d=g(v,".contextmenu-item-icon");for(r=0;r<d.length;r++){var H=d[r];f=H.clientWidth,j=H.clientHeight,H.$48b=f,H.$49b=j,J.setCanvas(H,f,j)}}},validateImpl:function(){var o,D,$,L=this,K=L._view;if(L.isShowing()){var V=g(K,".check-prefix");for($=0;$<V.length;$++){var C=V[$];o=C.$48b,D=C.$49b,o&&D&&L.$46b(C,m.contextMenuCheckIcon,o,D)}var U=g(K,".radio-prefix");for($=0;$<U.length;$++){var s=U[$];o=s.$48b,D=s.$49b,o&&D&&L.$46b(s,m.contextMenuRadioIcon,o,D)}var z=g(K,".contextmenu-item-icon");for($=0;$<z.length;$++){var q=z[$];o=q.$48b,D=q.$49b,o&&D&&L.$46b(q,m.getImage(q.$50b),o,D,q._item)}}},_clearItemId:function(b){var N=this;delete b._id,b.items&&b.items.forEach(function(T){N._clearItemId(T)})}})}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:(0,eval)("this"),Object);