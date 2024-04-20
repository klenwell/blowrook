document.addEventListener("DOMContentLoaded", function() {
    console.log('document ready');
    const h2Title = document.getElementById('title');
    const titleTag = document.getElementsByTagName('title')[0];
    h2Title.innerText = titleTag.innerText;
})
