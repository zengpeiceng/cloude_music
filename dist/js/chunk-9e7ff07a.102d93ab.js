(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9e7ff07a"],{1924:function(t,s,a){"use strict";a("4b5a")},"4b5a":function(t,s,a){},"874b":function(t,s,a){"use strict";var n=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{attrs:{id:"songAddition"}},[a("div",{staticClass:"sc-r"},[t._t("sc-r-nav",(function(){return[t._v("喜欢这个歌单的人")]})),t._t("sc-r-con"),a("div",{staticClass:"sc-r-nav"},[t._v("网易云音乐多端下载")]),t._m(0)],2)])},e=[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"sys"},[a("ul",[a("li",[a("a",{attrs:{href:"https://apps.apple.com/cn/app/id590338362",target:"_blank"}},[t._v("iPhone")])]),a("li",[a("a",{attrs:{href:"https://music.163.com/api/pc/download/latest",target:"_blank"}},[t._v("PC")])]),a("li",[a("a",{attrs:{href:"https://music.163.com/api/android/download/latest2",target:"_blank"}},[t._v("Android")])])]),a("p",[t._v("同步歌单，随时畅听320k好音乐")])])}],r={name:"SongAddition",data:function(){return{}},mounted:function(){},methods:{}},i=r,o=(a("1924"),a("2877")),c=Object(o["a"])(i,n,e,!1,null,"2728d4c2",null);s["a"]=c.exports},"9ef9":function(t,s,a){},a8ef:function(t,s,a){"use strict";a.r(s);var n=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{attrs:{id:"songDetail"}},[a("div",{staticClass:"sc"},[a("div",{staticClass:"sc-c"},[a("song-desc",{attrs:{song_details:t.song_details},scopedSlots:t._u([{key:"creatorMsg",fn:function(s){return[a("div",{staticClass:"d-message"},[s.creatorMsg.creator?a("div",[a("a",{attrs:{href:"#"}},[a("img",{attrs:{src:s.creatorMsg.creator.avatarUrl,alt:""}})]),a("router-link",{attrs:{to:"/user/home?uid="+s.creatorMsg.creator.userId}},[t._v(t._s(s.creatorMsg.creator.nickname))]),a("span",[t._v(t._s(t._f("dateFormat")(s.creatorMsg.createTime))+" 创建")])],1):t._e()])]}}])},[a("span",{staticClass:"sign",attrs:{slot:"sign"},slot:"sign"})]),a("song-list",{attrs:{songList:t.songList}},[a("template",{slot:"playCount"},[a("i",[t._v("播放: "),a("em",[t._v(t._s(t.song_details.playCount))]),t._v("次")])])],2),a("song-comment")],1),a("div",{staticClass:"sc-r"},[a("song-addition",[a("div",{staticClass:"sc-r-nav",attrs:{slot:"sc-r-nav"},slot:"sc-r-nav"},[t._v("喜欢这个歌单的人")]),a("template",{slot:"sc-r-con"},[a("ul",{staticClass:"similar"},t._l(t.song_details.subscribers,(function(t,s){return a("li",[a("router-link",{attrs:{to:"/user/home?uid="+t.userId}},[a("img",{attrs:{src:t.avatarUrl,alt:""}})])],1)})),0)])],2)],1)])])},e=[],r=a("cbe0"),i=a("aa14"),o=a("874b"),c=a("192e"),l=a("b2f5"),d={components:{SongDesc:r["a"],SongList:i["a"],SongAddition:o["a"],SongComment:c["a"]},name:"SongDetail",data:function(){return{song_details:{},songList:[]}},created:function(){var t=this;Object(l["c"])(this.$route.query.id,1e3).then((function(s){t.songList=s.songs})),Object(l["a"])(this.$route.query.id).then((function(s){t.song_details=s.playlist}))},mounted:function(){},methods:{}},u=d,g=(a("d5a0"),a("2877")),_=Object(g["a"])(u,n,e,!1,null,"1caa8d3a",null);s["default"]=_.exports},d5a0:function(t,s,a){"use strict";a("9ef9")}}]);
//# sourceMappingURL=chunk-9e7ff07a.102d93ab.js.map