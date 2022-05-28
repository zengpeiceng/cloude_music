export default function(obj, target, callback) {
  obj.timer = setInterval(function() {
   var step = (target - obj.offsetTop) / 10;
   step = step > 0 ? Math.ceil(step) : Math.floor(step);
   if(obj.offsetTop >= target) {
     clearInterval(obj.timer);
     // 回调函数写到定时器结束里面
     if(callback) {
       // 调用函数
       callback();
     }
   }
   obj.style.Top = obj.offsetTop + step + 'px';
 }, 15);
}