    // Function to adjust line height dynamically
    function adjustLineHeight() {
        var elements = document.getElementsByClassName('big');
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            var lineHeight = parseFloat(window.getComputedStyle(element).lineHeight);
            var fontSize = parseFloat(window.getComputedStyle(element).fontSize);
            var lineHeightMultiple = lineHeight / fontSize; // Convert lineHeight to a multiple of font size
            var contentHeight = element.clientHeight;
            var totalHeight = element.scrollHeight;
            var lines = totalHeight / lineHeight;

            if (lines > 1) {
                var adjustedLineHeight = contentHeight / lines;
                element.style.lineHeight = adjustedLineHeight + "px";
            } else {
                // Adjusted line height for single line
                element.style.lineHeight = '2.7em';
            }
        }
    }

    // Call the function initially and whenever the window is resized
    adjustLineHeight();
    window.addEventListener('resize', adjustLineHeight);