const iconPreview = document.getElementById('icon-preview');
const iconClassInput = document.getElementById('icon-class');
const iconSetSelect = document.getElementById('icon-set');
const iconColorInput = document.getElementById('icon-color');
const iconSizeInput = document.getElementById('icon-size');
const iconShapeSelect = document.getElementById('icon-shape');
const iconSearchLink = document.getElementById('icon-search');
const iconLink = document.getElementById('icon-link');
const downloadBtn = document.getElementById('download-btn');
const spinner = document.getElementById('spinner');

// Mapping of icon sets to common icon classes
const iconClasses = {
    solid: "fas fa-address-card",
    brands: "fab fa-apple",
    fa4: "fa fa-bell",
    bootstrap: "bi bi-alarm",
};

// Update icon preview when the icon class, size, background color, or shape changes
iconClassInput.addEventListener('input', updateIcon);
iconSetSelect.addEventListener('change', updateIconSet);
iconColorInput.addEventListener('input', updateIcon);
iconSizeInput.addEventListener('input', updateIconSize);
iconShapeSelect.addEventListener('change', updateIconShape);

function updateIcon() {
    const iconClass = iconClassInput.value || iconClasses[iconSetSelect.value]; // Default icon based on set
    iconLink.innerHTML = `<i class="${iconClass}"></i>`;
    iconPreview.style.backgroundColor = iconColorInput.value;
}

function updateIconSet() {
    const selectedOption = iconSetSelect.options[iconSetSelect.selectedIndex];
    const searchUrl = selectedOption.dataset.url;
    iconSearchLink.href = searchUrl;

    // Update the icon class input to reflect the first icon of the selected set
    iconClassInput.value = iconClasses[iconSetSelect.value];
    updateIcon(); // Update the icon preview
}

function updateIconSize() {
    const iconSize = iconSizeInput.value;
    iconPreview.querySelector('i').style.fontSize = `${iconSize}px`;
}

function updateIconShape() {
    if (iconShapeSelect.value === 'circle') {
        iconPreview.classList.add('icon-shape-circle');
    } else {
        iconPreview.classList.remove('icon-shape-circle');
    }
}

 // Download icon functionality
 downloadBtn.addEventListener('click', function () {
    spinner.style.display = 'inline-block'; // Show spinner while processing

    html2canvas(iconPreview).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'icon.png';
        link.click();
        spinner.style.display = 'none'; // Hide spinner after download
    }).catch(() => {
        alert('Failed to download the icon.');
        spinner.style.display = 'none'; // Hide spinner on error
    });
});

// Initialize the icon set and update link on load
updateIconSet();
updateIcon(); // Update icon preview with default values