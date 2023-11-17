document.getElementById('hoverArea').addEventListener('mouseenter', function() {
    document.getElementById('navbar').classList.add('show');
});

document.getElementById('navbar').addEventListener('mouseleave', function() {
    document.getElementById('navbar').classList.remove('show');
});