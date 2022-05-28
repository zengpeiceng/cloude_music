
export default function(target,showTargetEle,triggerTargetEle) {
  // 当前单击的目标元素
  // showTargetEle 要隐藏或显示的目标元素
  // triggerTargetEle触发显示showTargetEle的元素
  
  // 要隐藏或显示的目标元素 是否包含了单击的元素 或者 是否单击了触发显示元素的元素
  // 包含了返回true继续显示 不包含返回false隐藏
  return showTargetEle.contains(target) || triggerTargetEle.contains(target);
}


