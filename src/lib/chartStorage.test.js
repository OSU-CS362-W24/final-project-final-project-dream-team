const {
  saveChart,
  loadAllSavedCharts,
  loadSavedChart,
  updateCurrentChartData,
  loadCurrentChartData
} = require('./chartStorage'); 

// Test case for verifying the functionality of saving a new chart
test('Saves a new chart correctly', function () {
  window.localStorage.clear();
  const chart = { id: 1, data: [2, 5, 4] };
  saveChart(chart);
  const savedCharts = loadAllSavedCharts();
  expect(savedCharts).toEqual([chart]);
});

// Test case for adding a new chart and verifying it's correctly added
test('Adds a new chart', function () {
  window.localStorage.clear();
  const chart = { id: 1, data: [1, 2, 3] };
  saveChart(chart);
  const savedCharts = loadAllSavedCharts();
  expect(savedCharts.length).toBe(1);
  expect(savedCharts).toEqual([chart]);
});

// Test case for overwriting an existing chart with a new one at a specified index
test('Overwrites an existing chart (with specified index)', function () {
  window.localStorage.clear();
  const chart1 = { id: 1, data: [1, 2, 3] };
  const chart2 = { id: 2, data: [4, 5, 6] };
  saveChart(chart1, 0); 
  saveChart(chart2, 0); // Overwrite first chart with a new chart at index 0
  const savedCharts = loadAllSavedCharts();
  expect(savedCharts.length).toBe(1); // Only one chart exist after overwrite
  expect(savedCharts[0]).toEqual(chart2); // Chart at index 0 is the new chart
});

// Test case for loading a specific chart by its ID
test('Loads specified chart', function () {
  window.localStorage.clear();
  const chart1 = { id: 1, data: [1, 2, 3] };
  const chart2 = { id: 2, data: [4, 5, 6] };
  saveChart(chart1);
  saveChart(chart2);
  expect(loadSavedChart(1)).toEqual(chart2);
});

test('update and load the current chart data correctly functionality', function () {
  const currentChartData = { id: 3, data: [7, 8, 9] };
  updateCurrentChartData(currentChartData);
  expect(loadCurrentChartData()).toEqual(currentChartData);
});






  
