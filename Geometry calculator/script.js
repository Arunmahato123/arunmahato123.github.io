function calculatePerimeter() {
    const length = parseFloat(document.getElementById('perimeter-length').value);
    const width = parseFloat(document.getElementById('perimeter-width').value);

    if (!isNaN(length) && !isNaN(width)) {
        const perimeter = 2 * (length + width);
        document.getElementById('perimeter').textContent = perimeter.toFixed(2);
    } 
    else {
        document.getElementById('perimeter').textContent = "Invalid input";
    }
}

function calculateArea() {
    const length = parseFloat(document.getElementById('area-length').value);
    const width = parseFloat(document.getElementById('area-width').value);

    if (!isNaN(length) && !isNaN(width)) {
        const area = length * width;
        document.getElementById('area').textContent = area.toFixed(2);
    } 
    else {
        document.getElementById('area').textContent = "Invalid input";
    }
}

function calculateVolume() {
    const length = parseFloat(document.getElementById('volume-length').value);
    const width = parseFloat(document.getElementById('volume-width').value);
    const height = parseFloat(document.getElementById('volume-height').value);

    if (!isNaN(length) && !isNaN(width) && !isNaN(height)) {
        const volume = length * width * height;
        document.getElementById('volume').textContent = volume.toFixed(2);
    }
     else {
        document.getElementById('volume').textContent = "Invalid input";
    }
}
