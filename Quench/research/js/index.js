AnimateCircle("example-animation-container", 0.7);

function AnimateCircle(container_id, animatePercentage) {
    var startColor = '#FC5B3F';
    var endColor = '#6FD57F';

    var element = document.getElementById(container_id);
    var circle = new ProgressBar.Circle(element, {
        color: startColor,
        trailColor: '#eee',
        trailWidth: 5,
        duration: 2000,
        easing: 'bounce',
        strokeWidth: 5,
        text: {
            value: (animatePercentage * 100) + " % complete.",
            className: 'progressbar__label'
        },
        // Set default step function for all animate calls
        step: function (state, circle) {
            circle.path.setAttribute('stroke', state.color);
        }
    });

    circle.animate(animatePercentage, {
        from: {
            color: startColor
        },
        to: {
            color: endColor