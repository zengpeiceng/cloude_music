export default function(func, wait = 500) {
  let timeout = null;
  return function(){
    if( timeout ) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      func()
      timeout = null
    }, wait)
  }
}