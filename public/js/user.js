

const el = document.querySelectorAll('[data-spy]');
if(el != 'undefined')
    console.log(el);
el.forEach(ele =>{
    console.log(ele.dataset.spy);
    ele.addEventListener('click', (elem)=>{
        smoothScroll(ele.dataset.spy);
    })
})

window.smoothScroll = function(strtarget) {
    console.log(`smoth: ${strtarget}`);
    let target = document.querySelector(strtarget);
    var scrollContainer = target;
    do { //find scroll container
        scrollContainer = scrollContainer.parentNode;
        if (!scrollContainer) return;
        scrollContainer.scrollTop += 1;
    } while (scrollContainer.scrollTop == 0);
    
    var targetY = 0;
    do { //find the top of target relatively to the container
        if (target == scrollContainer) break;
        targetY += target.offsetTop;
    } while (target = target.offsetParent);
    
    scroll = function(c, a, b, i) {
        const arr = 30;
        i++; if (i > arr) return;
        c.scrollTop = a + (b - a) / arr * i;
        setTimeout(function(){ scroll(c, a, b, i); }, 20);
    }
    // start scrolling
    scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}