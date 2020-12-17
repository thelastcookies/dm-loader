!function(f,W){"use strict";var M="ht",U=f[M],B="innerHTML",N="className",I=null,w="px",Z=U.Default,e=Z.getInternal(),u="0",A=function(){return document},h=function(T){return A().createElement(T)},L=function(){return h("canvas")},r=function(H,P,p){H.style.setProperty(P,p,I)},G=function(z,r,g){Z.def(U.widget[z],r,g)},_=function(J,B){J.appendChild(B)},s=function(f,k){f.removeChild(k)},t=e.addEventListener,E=e.removeEventListener,D=Z.isTouchable,k=Z.isTouchEvent;e.addMethod(Z,{menuLabelFont:(D?"16":"13")+"px arial, sans-serif",menuLabelColor:"#000",menuBackground:"#F0EFEE",menuHoverBackground:"#648BFE",menuHoverLabelColor:"#fff",menuSeparatorWidth:1,menuSeparatorColor:"#999"},!0),U.widget.Menu=function(M){var w=this,X=w._view=e.createView(null,w),q=w.$1g=new U.widget.ContextMenu,y=h("ul");q._r=!0,q._view[N]+=" ht-widget-dropdownmenu",X[N]="ht-widget-menu",y[N]="header",r(X,"margin",u),r(X,"padding",u),r(X,"background",Z.menuBackground),r(X,"-webkit-user-select","none"),r(X,"-moz-user-select","none"),r(X,"user-select","none"),r(X,"text-align","left"),r(X,"border-bottom",Z.menuSeparatorWidth+"px solid "+Z.menuSeparatorColor),r(X,"cursor","default"),r(X,"overflow","auto"),r(X,"white-space","nowrap"),r(X,"font",Z.menuLabelFont),r(X,"color",Z.menuLabelColor),r(X,"box-sizing","border-box"),r(X,"-moz-box-sizing","border-box"),r(y,"list-style","none"),r(y,"margin",u),r(y,"padding",u),r(y,"display","inline-block"),_(X,y),w.setItems(M),w.$2g=function(W){w.$3g(W)},w.$4g=function(T){w.$5g(T)},w.$6g=function(f){w.$7g(f)},w.$8g=function(K){w.$9g(K)},w.$9b=function(B){w.$10g(B)},w._autoShow=!0,w.setAutoShow(!1),q.afterHide=function(){w.$11g()},q.afterShow=function(){w.$12g()},E(A(),"keydown",q.$3b),w.$3b=function(K){w.$13g(K)},w.invalidate()},G("Menu",W,{_items:I,$14g:Z.menuHoverBackground,$15g:Z.menuHoverLabelColor,$16g:{},_enableGlobalKey:!1,ms_v:1,$21g:"smallicons",$22g:0,$23g:0,$24g:"left",getDropDownMenu:function(){return this.$1g},setLayout:function(f){var K=this;if(K.$21g=f,K.setItems(K._items),"largeicons"===f){for(var R=K._view.querySelectorAll(".header-item"),k=0,$=0;$<R.length;$++){var b=R[$];k=Math.max(k,b.clientWidth)}for(var $=0;$<R.length;$++){var b=R[$];r(b,"min-width",k+w)}}this.invalidate()},getLayout:function(){return this.$21g},setHeaderItemHGap:function(z){this.$22g=z;for(var Y=this._view.querySelectorAll(".header-item"),A=0;A<Y.length;A++){var L=Y[A];r(L,"margin-left",z+w),r(L,"margin-right",z+w)}},getHeaderItemHGap:function(){return this.$22g},setHeaderItemVGap:function(X){this.$23g=X;for(var U=this._view.querySelectorAll(".header-item"),u=0;u<U.length;u++){var O=U[u];r(O,"margin-top",X+w),r(O,"margin-bottom",X+w)}},getHeaderItemVGap:function(){return this.$24g},setHeaderItemAlign:function(M){this.$24g=M,r(this._view,"text-align",M)},getHeaderItemAlign:function(){return this.$23g},enableGlobalKey:function(){var U=this,m=U._enableGlobalKey;m===!1&&(t(A(),"keydown",U.$3b),U._enableGlobalKey=!0)},disableGlobalKey:function(){this._enableGlobalKey=!1,E(A(),"keydown",this.$3b)},setHoverBackground:function(u){this.$14g=u},setHoverColor:function(Z){this.$15g=Z},setItems:function(v){var R=this,k=R._view,V=R.$21g;if(R._items=v,k.children[0][B]="",R.$16g={},v&&v.length){for(var M=k.children[0],I=0,y=A().createDocumentFragment();I<v.length;I++){var d=v[I],U=h("li"),i=h("span");if(d.icon){var t=L();t[N]="menu-item-icon","smallicons"===V?(r(t,"height","1.2em"),r(t,"width","1.2em"),r(t,"vertical-align","middle")):(r(t,"height","32px"),r(t,"width","32px"),r(t,"display","block"),r(t,"margin","0 auto")),t.$20g=d.icon,_(U,t)}U[N]="header-item",r(U,"display","inline-block"),r(U,"vertical-align","top"),r(U,"padding","0 1.2em"),r(U,"line-height","1.8em"),"largeicons"===V&&r(U,"text-align","center"),r(U,"background-color","rgba(0,0,0,0)"),U.setAttribute("data-index",I),R.$16g[I]=d.items,i[B]=d.label,"iconsonly"!==V&&_(U,i),_(y,U)}_(M,y)}},showDropdownMenu:function(J){var C=this,E=C.$16g[J],f=C.$1g,r=C._view.children[0].children[J],g=C.$17g;if(r&&r!==g){g&&C.hideDropdownMenu();var K=r.getBoundingClientRect(),z=Z.getWindowInfo();C.$17g=r,f.setItems(E),f.show(K.left+z.left,K.top+K.height+z.top,!1)}},hideDropdownMenu:function(){this.$1g.hide()},getItemByProperty:function(o,i){var m=this,L=m._items;return L&&0!==L.length?m.$1g.getItemByProperty(o,i,L):I},$12g:function(){var _=this,w=_.$17g;w.style.background=_.$14g,w.style.color=_.$15g,_._autoShow||t(A(),D?"touchstart":"mousedown",_.$9b)},$11g:function(){var i=this,P=i.$17g;P&&(P.style.background="",P.style.color="",i.$17g=I),E(A(),D?"touchstart":"mousedown",i.$9b)},$10g:function(e){var D=this,h=D._view,S=D.$1g,m=h.children[0];!A().body.contains(h)||m.contains(e.target)||S._view.contains(e.target)||D.hideDropdownMenu()},$13g:function(r){var V=this,Q=V.$1g;A().body.contains(V._view)&&Q.$13b.$4b.call(Q.$13b,r,V._items)},setAutoShow:function(B){var z=this,a=z.$1g,e=z._view;z._autoShow!==B&&(z._autoShow?(E(e,"mouseover",z.$2g),E(e,"mouseout",z.$4g),E(a._view,"mouseout",z.$4g),D||(t(e,"mouseover",z.$8g),t(e,"mouseout",z.$8g)),t(e,D?"touchstart":"mousedown",z.$6g)):(E(e,"mouseover",z.$8g),E(e,"mouseout",z.$8g),E(e,D?"touchstart":"mousedown",z.$6g),E(A(),D?"touchstart":"mousedown",z.$9b),D||(t(e,"mouseover",z.$2g),t(e,"mouseout",z.$4g),t(a._view,"mouseout",z.$4g))),z._autoShow=B)},$3g:function(E){var C=this,u=C._view.children[0],b=E.target;if(u!==b&&u.contains(b)){for(;"header-item"!==b[N];)b=b.parentNode;C.showDropdownMenu(b.getAttribute("data-index"))}},$5g:function(v){var S=this,p=S._view.children[0],H=S.$1g,m=v.target,h=v.relatedTarget;!p.contains(m)&&!H._view.contains(m)||p.contains(h)||H._view.contains(h)||S.hideDropdownMenu()},$7g:function(T){T.preventDefault();var H=this,m=H._view.children[0],M=H.$1g,j=T.target;if(Z.isLeftButton(T)&&m!==j&&m.contains(j))if(k(T)){for(;"header-item"!==j[N];)j=j.parentNode;var E=j.getAttribute("data-index"),M=H.$1g,b=H._view.children[0].children[E],h=H.$17g;M.isShowing()&&H.hideDropdownMenu(),b!==h&&H.showDropdownMenu(E)}else if(M.isShowing())H.hideDropdownMenu();else{for(;"header-item"!==j[N];)j=j.parentNode;H.showDropdownMenu(j.getAttribute("data-index"))}},$9g:function(a){var j=this,N=j._view,d=j.$1g,y=a.target;if(N.contains(y)){for(var w=N.querySelectorAll(".header-item"),c=I,H=0;H<w.length;H++){var F=w[H];F.style.background="",F.style.color="","mouseover"===a.type?F.contains(y)&&(c=F):"mouseout"===a.type&&d.isShowing()&&j.$17g===F&&(c=F)}d.isShowing()&&(c||(c=j.$17g),j.showDropdownMenu(c.getAttribute("data-index"))),c&&(c.style.background=j.$14g,c.style.color=j.$15g)}},getShowingMenuIndex:function(){var j=this.$17g;return j?j.getAttribute("data-index"):-1},addTo:function(Z){var i=this,X=i._view;_(Z,X),i.invalidate()},dispose:function(){var q=this,R=q._view,B=q.$1g;R&&(q._autoShow?(E(R,"mouseover",q.$2g),E(R,"mouseout",q.$4g),E(B._view,"mouseout",q.$4g)):(E(R,"mouseover",q.$8g),E(R,"mouseout",q.$8g),E(R,D?"touchstart":"mousedown",q.$6g),E(A(),D?"touchstart":"mousedown",q.$9b)),E(A(),"keydown",q.$3b),B.dispose(),R.parentNode&&s(R.parentNode,R),q._view=q.$1g=q.$16g=q._items=q.$17g=q.$2g=q.$4g=q.$6g=q.$8g=q.$9b=q.$3b=I)},$19g:function(i,K,d,W){var J=e.initContext(i);e.translateAndScale(J,0,0,1),J.clearRect(0,0,d,W),Z.drawStretchImage(J,Z.getImage(K),"fill",0,0,d,W),J.restore()},validateImpl:function(){var b,$,r,t=this,i=t._view,E=i.querySelectorAll(".menu-item-icon");for(r=0;r<E.length;r++){var T=E[r];b=T.clientWidth,$=T.clientHeight,b&&$&&(e.setCanvas(T,b,$),t.$19g(T,Z.getImage(T.$20g),b,$))}}})}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:(0,eval)("this"),Object);