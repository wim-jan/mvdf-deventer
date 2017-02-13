export default function eventPreview() {

    const zigzags = document.querySelectorAll('.event.preview .zigzag .inner');
    return;
    if (!zigzags) return;

    var resizeTimer

    var position = function () {
        zigzags.forEach((z) => {
            z.style.left = Math.ceil(0 - (z.getBoundingClientRect().left % 300)) + 'px'
        })
    }

    position()

    window.addEventListener('resize', (e) => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            position()
        }, 500);
    })
}
