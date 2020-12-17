!function(T){"use strict";var Q=T.ht,o=Q.Default,f=o.getInternal(),n=f.ui(),G=null,w="__segmentLengths",D="__lineTotalLength",t="__linePoints",_="__distance0",B="flow.count",b="flow.step",Z="flow.element.max",P="flow.element.count",H="flow.element.min",S="flow.element.space",h="flow.element.autorotate",q="flow.element.background",d="flow.element.shadow.max",z="flow.element.shadow.min",y="flow.element.shadow.begincolor",X="flow.element.shadow.endcolor",u="flow.element.shadow.visible",r="flow.element.image",v="flow",L=Q.Math.Vector2,j=new L;new L,new L,Q.List;var W=Q.Default._edgeProtectMethod,U=W.getStraightLinePoints,x=function(L,R){for(var H=[],J=L.length,l=0;J>l;l++){var c=L[l];c._as&&(c=c._as);for(var j=c[0],G=1;G<c.length;G++)H.push([j,c[G]]),j=c[G]}for(var N=[],l=0;l<H.length;l++){var p=K(H[l][0],H[l][1],R);N.push(p)}return{distance:N,segments:H}},m=function(t,q,i){if(t){for(var A,r=x(t,q),Q=r.distance,g=r.segments,e=1/0,U=null,L=0,D=Q.length;D>L;L++){var $=Q[L];$.z<e&&(A=L,e=$.z,U=$)}if(null==i&&(i=.1),U.z<i){for(var z=0,l=0;A>=l;l++)z+=o.getDistance(g[l][0],A>l?g[l][1]:U);return z}}},K=function($,a,F){var s=$.x,d=$.y,V=a.x,v=a.y,Z=F.x,M=F.y,S=V-s,b=v-d,E=Math.sqrt(S*S+b*b),f=S/E,G=b/E,k=(-s+Z)*f+(-d+M)*G,w={x:s+k*f,y:d+k*G};return w.x>=Math.min($.x,a.x)&&w.x<=Math.max($.x,a.x)&&w.y>=Math.min($.y,a.y)&&w.y<=Math.max($.y,a.y)||(w.x=Math.abs(w.x-$.x)<Math.abs(w.x-a.x)?$.x:a.x,w.y=Math.abs(w.y-$.y)<Math.abs(w.y-a.y)?$.y:a.y),S=Z-w.x,b=M-w.y,w.z=Math.sqrt(S*S+b*b),w},g=function(Y,P){if(Y){var M=x(Y,P).distance,F=1/0,m=null;return M.forEach(function(b){b.z<F&&(F=b.z,m=b)}),m}},V=W.calculateLineLength,M=W.calcSegmentIndexByDistance,E=W.calculatePointAlongLine,k=function(I,T,Q){if(!I)return Q;if(0===T){var g=I[0][0],q=I[0][1];return Q+Math.atan2(q.y-g.y,q.x-g.x)}if(100===T){I=I[I.length-1];var g=I[I.length-2],q=I[I.length-1];return Q+Math.atan2(q.y-g.y,q.x-g.x)}for(var x=0,A=[],f=I.length,Z=0;f>Z;Z++){var J=I[Z],n=V(J);x+=n,A.push(n)}for(var W=x*T/100,c=M(W,A),t=0,$=0;c>$;$++)t+=A[$];W-=t;for(var p=E(I[c],W),F=I[c],z=0,y=0,C=0;C<F.length-1;C++){var L=F[C],i=F[C+1],U=i.x-L.x,k=i.y-L.y,X=Math.sqrt(U*U+k*k);if(z+=X,z>W){y=C;break}}var Y=F[y];return Q+Math.atan2(p.y-Y.y,p.x-Y.x)},O=function(o){var r=0;if(o)if(Array.isArray(o[0]))for(var R=o.length,t=0;R>t;t++){var T=o[t],B=V(T);r+=B}else r=V(o);return r},p=function(f,v,p,X){return j.set(v,p).rotateAround(null,X),f?{x:f.x+j.x,y:f.y+j.y}:{x:j.x,y:j.y}},i=function(i){var z=i._data,f=U(i);if(f){z.s("flow.reverse")&&(f.reverse(),f.forEach(function(X){X.reverse()}));for(var N=0,L=[],e=f.length,p=0;e>p;p++){var j=f[p],h=V(j);N+=h,L.push(h)}if(z[w]=L,z[D]=N,z[t]=f,z instanceof Q.Edge){var l=o.unionPoint(f),g=l.x+l.width/2,b=l.y+l.height/2;z.$10e={x:g,y:b}}J(i,!0)}},C=W.getPercentPosition,J=function(d,i){var I=d._data,E=I[D],F=I.s(B),v=I.s(b),Y=0,j=I[w],n=I.s(Z),A=I.s(H),k=I.s(P),W=(n-A)/(k-1),q=[];if(j){if(1===k)q.push(n);else if(2===k)q.push(n),q.push(A);else{if(!(k>2))return;q.push(n);for(var L=k-2;L>0;L--)q.push(A+W*L);q.push(A)}var m=0,J=0;q.forEach(function(B){k-1>m&&(J+=I.getFlowElementSpace(B)),m++}),J+=(n+A)/2,Y=(E-F*J+J)/F;var s=d[_];for(null==s&&(s=0),i||(s+=v);s>E+J;){var N=d._overCount;N?N++:N=1,N>=F&&(N=null),d._overCount=N,I.s("flow.autoreverse")?N?s-=Y+J:(s=0,I.s("flow.reverse",!I.s("flow.reverse"))):s-=Y+J}d[_]=s}},Y="prototype",$=Q.graph.GraphView[Y],F=Q.Data[Y],N=n.DataUI[Y],l=n.ShapeUI[Y],e=n.EdgeUI[Y],I=Q.DataModel[Y],c=Q.Style;c[Z]==G&&(c[Z]=7),c[H]==G&&(c[H]=0),c[B]==G&&(c[B]=1),c[b]==G&&(c[b]=3),c[P]==G&&(c[P]=10),c[S]==G&&(c[S]=3.5),c[h]==G&&(c[h]=!1),c[q]==G&&(c[q]="rgba(255, 255, 114, 0.4)"),c[y]==G&&(c[y]="rgba(255, 255, 0, 0.3)"),c[X]==G&&(c[X]="rgba(255, 255, 0, 0)"),c[u]==G&&(c[u]=1),c[d]==G&&(c[d]=22),c[z]==G&&(c[z]=4),$.calculatePointLength=function(f,u,l){var r=this.getDataUI(f),o=U(r);return m(o,u,l)},o.calculatePointLength=function(g,T,P,y){var S=U(G,g,T);return m(S,P,y)},o.calculateClosestPointOnLine=K,$.calculateClosestPoint=function(u,A){var F=this.getDataUI(u),P=U(F);return g(P,A)},o.calculateClosestPoint=function(b,l,M){var x=U(G,b,l);return g(x,M)},$.getPercentAngle=function(q,P){var I=this.getDataUI(q),V=U(I);return q.getRotation?q.getRotation():0,k(V,P,q.getRotation?q.getRotation():0)},o.getPercentAngle=function(m,h,S){var $=U(G,m,h);return k($,S,0)},$.calculateLength=function(W){var d=this.getDataUI(W),P=U(d);return O(P)},o.calculateLength=function(F,n){var j=U(G,F,n);return O(j)},$.getPercentPosition=function(T,p){var g=this.getDataUI(T),v=U(g);return C(v,p)},o.getPercentPositionOnPoints=function(J,v,s){var c=U(G,J,v);return C(c,s)};var R=function(S){var i=S.data,A=this.dm();if(i&&"add"===S.kind){var q=A.$3e;q&&i.s(v)&&q.indexOf(i)<0&&q.push(i)}"clear"===S.kind&&(A.$3e=[])},s=function(F){var S=F.property,U=F.data,L=F.newValue,O=this.dm().$3e;if(O&&"s:flow"===S)if(L)O.indexOf(U)<0&&O.push(U);else for(var e=O.length,m=0;e>m;m++)if(O[m]===U){O.splice(m,1);break}},A=$.setDataModel;$.setDataModel=function(T){var d=this,e=d._dataModel;if(e!==T){e&&(e.umm(R,d),e.umd(s,d),e.$3e=[]),T.mm(R,d),T.md(s,d);var $=T.$3e=[];T.each(function(E){E.s(v)&&$.indexOf(E)<0&&$.push(E)}),A.call(d,T)}},F.getFlowElementSpace=function(){return this.s(S)};var a=function(s){var U=this,q=U._data,m=q[D],R=q[w],j=q[t],i=q.s(B),x=0,u=U[_],W=q.s(Z),L=q.s(H),V=q.s(P),c=q.s(z),J=q.s(d),F=q.s(h),O=(J-c)/(V-1),T=(W-L)/(V-1),X=q.getRotation?q.getRotation():0,f=q.getPosition?q.p():q.$10e,y=[],N=[];if(u!=G){if(1===V)y.push(W);else if(2===V)y.push(W),y.push(L);else{if(!(V>2))return;y.push(W);for(var A=V-2;A>0;A--)y.push(L+T*A);y.push(L)}if(1===V)N.push(J);else if(2===V)N.push(J),N.push(c);else{if(!(V>2))return;N.push(J);for(var A=V-2;A>0;A--)N.push(c+O*A);N.push(c)}var Q=0,r=0;y.forEach(function(N){V-1>Q&&(r+=q.getFlowElementSpace(N)),Q++}),r+=(W+L)/2,x=(m-i*r+r)/i,s.save();for(var A=0;i>A;A++){var g=u,v=0,S=U._overCount,Y=0;q.s("flow.autoreverse")&&S&&S>i-(A+1)||(g-=A*(x+r),Q=0,y.forEach(function(x){var K=g-v;if(K>=0&&m>K){var i=!0,d=M(K,R);Y=0;for(var z=0;d>z;z++)Y+=R[z];if(K-=Y,i){var h=E(j[d],K),H=X;if(F){for(var P=j[d],$=0,G=0,W=0;W<P.length-1;W++){var l=P[W],J=P[W+1],e=J.x-l.x,B=J.y-l.y,V=Math.sqrt(e*e+B*B);if($+=V,$>K){G=W;break}}var k=P[G];H+=Math.atan2(h.y-k.y,h.x-k.x)}X&&(h=p(f,h.x-f.x,h.y-f.y,X)),U.$5e(s,h,x,N[Q],H)}}v+=q.getFlowElementSpace(y[Q]),Q++}))}s.restore()}},ss=e._80o;e._80o=function(Z){ss.call(this,Z);var F=this,p=F._data,o=F.gv;p.s(v)&&o.$7e!=G&&a.call(F,Z)};var Gg=l._80o;l._80o=function(Q){Gg.call(this,Q);var p=this,t=p._data,x=p.gv;t.s(v)&&x.$7e!=G&&a.call(p,Q)};var zk=e._79o,Ke=l._79o,bj=function(){var x=this,j=x._data,E=j.s(Z),A=!1,U=G;if(x._6I||(A=!0),U=j instanceof Q.Edge?zk.call(x):Ke.call(x),j.s(v)&&A){var n=j.s(d),J=j.s(u);J&&n>E&&(E=n),E>0&&o.grow(U,Math.ceil(E/2)),i(x)}return!j.s(v)&&A&&(j[w]=j[D]=j[t]=x[_]=G),U};l._79o=bj,e._79o=bj,N.$5e=function(m,b,j,v,Y){var K=this,n=K._data,l=K.gv,z=n.s(q),E=n.s(y),I=n.s(X),c=n.s(u),F=l.$8e,Q=n.s(r);if(F==G&&(F=l.$8e={}),m.beginPath(),Q!=G){var M=o.getImage(Q),D=j/2;m.translate(b.x,b.y),m.rotate(Y),m.translate(-b.x,-b.y),o.drawImage(m,M,b.x-D,b.y-D,j,j,n),m.translate(b.x,b.y),m.rotate(-Y),m.translate(-b.x,-b.y)}else if(l.__flowBatch){var k=l.__flowBatchGroup;k||(k=l.__flowBatchGroup={});var N=[b.x,b.y,j/2];k[z]?k[z].push(N):k[z]=[N]}else m.fillStyle=z,m.arc(b.x,b.y,j/2,0,2*Math.PI,!0),m.fill();if(c){var d=22,w=d+"_"+E+"_"+I,s=F[w];if(s==G){var x=document.createElement("canvas");f.setCanvas(x,d,d);var L=x.getContext("2d"),p=d/2,R=p,e=p;f.translateAndScale(L,0,0,1),L.beginPath();var g=L.createRadialGradient(R,e,0,R,R,p);g.addColorStop(0,E),g.addColorStop(1,I),L.fillStyle=g,L.arc(R,e,p,0,2*Math.PI,!0),L.fill(),s=F[w]=x}var D=v/2;o.drawImage(m,s,b.x-D,b.y-D,v,v,n)}},$.$9e=function(){var E=this,r=E.dm().$3e;E._24I,r.forEach(function(w){E._24I[w._id]=w}),E.iv()};var fm=I.prepareRemove;I.prepareRemove=function(x){fm.call(this,x);var a=x._dataModel,f=a.$3e;if(f)for(var w=f.length,Y=0;w>Y;Y++)if(f[Y]===x){f.splice(Y,1);break}},$.setFlowInterval=function(y){var $=this,_=$.$11e;$.$11e=y,$.fp("flowInterval",_,y),$.$7e!=G&&(clearInterval($.$7e),delete $.$7e,$.enableFlow(y))},$.getFlowInterval=function(){return this.$11e},$.enableFlow=function(F){var Z=this,D=Z.dm(),R=D.$3e;Z.$7e==G&&(R.forEach(function(J){var t=Z.getDataUI(J);i(t)}),Z.$7e=setInterval(function(){D.$3e.forEach(function(h){J(Z.getDataUI(h))}),Z.$9e()},F||Z.$11e||50))},$.disableFlow=function(){var G=this;clearInterval(G.$7e),delete G.$7e;var i=G.dm().$3e;i&&G.$9e()};var Uh=function(){this.__flowBatchGroup={}},ls=function(k){var D=this.__flowBatchGroup;if(D){k.save();for(var Y in D){k.fillStyle=Y,k.beginPath();var l=D[Y];l.forEach(function(h){k.moveTo(h[0],h[1]),k.arc(h[0],h[1],h[2],0,2*Math.PI,!0)}),k.fill()}k.restore()}};$.setFlowBatch=function(c){var b=this;!!b.__flowBatch!=!!c&&(b.__flowBatch=c,c?(b.addBottomPainter(Uh),b.addTopPainter(ls)):(b.removeBottomPainter(Uh),b.removeTopPainter(ls)))}}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:(0,eval)("this"),Object);