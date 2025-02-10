
let dataset = [];

 
function addValue() {
  const input = document.getElementById('numberInput').value;
  const number = parseFloat(input);

  if (isNaN(number)) {
    alert("Please enter a valid number.");
  } else {
    dataset.push(number);
    updateDatasetDisplay();
    clearInput();
  }
}

function removeValue() {
  const input = document.getElementById('numberInput').value;
  const number = parseFloat(input);

  if (isNaN(number)) {
    alert("Please enter a valid number.");
  } else {
    const index = dataset.indexOf(number);
    if (index === -1) {
      alert("Number not found in the dataset.");
    } else {
      dataset.splice(index, 1);
      updateDatasetDisplay();
      clearInput();
    }
  }
}


function computeMean() {
  if (dataset.length === 0) {
    document.getElementById('meanDisplay').textContent = "Dataset is empty.";
    return;
  }

  let sum = 0;
  for (let i = 0; i < dataset.length; i++) {
    sum += dataset[i];
  }
  const mean = sum / dataset.length;
  document.getElementById('meanDisplay').textContent = mean.toFixed(2);
}


function updateDatasetDisplay() {
  document.getElementById('datasetDisplay').textContent = dataset.join(', ');
}

function clearInput() {
  document.getElementById('numberInput').value = '';
}