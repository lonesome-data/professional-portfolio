document.addEventListener('DOMContentLoaded', function() {
    const toggleSections = document.querySelectorAll('.toggle-section');

    toggleSections.forEach(section => {
        section.addEventListener('click', function() {
            const detailsElement = this.parentNode;
            detailsElement.classList.toggle('open');

            if (detailsElement.classList.contains('open')) {
                const contentHeight = detailsElement.querySelector('div').scrollHeight;
                detailsElement.style.setProperty('--content-height', `${contentHeight}px`);
            } else {
                detailsElement.style.removeProperty('--content-height');
            }
        });
    });
});

/* GOOGLE ANALYTICS */
function gaEvent(clickedItem){
  gtag('event', 'click', {
    'event_category': clickedItem,
    'event_label': 'click'
  });
}

/* INITIALIZATION */
window.onload = function() { document.body.className = ''; }
window.ontouchmove = function() { return false; }
window.onorientationchange = function() { document.body.scrollTop = 0; }
