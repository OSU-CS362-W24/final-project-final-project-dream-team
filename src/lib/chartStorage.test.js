const {
  saveChart,
  loadAllSavedCharts,
  loadSavedChart,
  updateCurrentChartData,
  loadCurrentChartData
} = require('./chartStorage'); 

test('Saves a new chart correctly', function () {
  window.localStorage.clear();
  const chart = { id: 1, data: [2, 5, 4] };
  saveChart(chart);
  const savedCharts = loadAllSavedCharts();
  expect(savedCharts).toEqual([chart]);
});

test('Adds a new chart', function () {
  window.localStorage.clear();
  const chart = { id: 1, data: [1, 2, 3] };
  saveChart(chart);
  const savedCharts = loadAllSavedCharts();
  expect(savedCharts.length).toBe(1);
  expect(savedCharts).toEqual([chart]);
});

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

test('Loads specified chart', function () {
  window.localStorage.clear();
  const chart1 = { id: 1, data: [1, 2, 3] };
  const chart2 = { id: 2, data: [4, 5, 6] };
  saveChart(chart1);
  saveChart(chart2);
  expect(loadSavedChart(1)).toEqual(chart2);
});

test('Returns an empty object for an invalid index', function () {
  window.localStorage.clear();
  expect(loadSavedChart(10)).toEqual({});
});

test('Updates and loads the current chart data correctly', function () {
  window.localStorage.clear();
  const currentChartData = { id: 3, data: [7, 8, 9] };
  updateCurrentChartData(currentChartData);
  expect(loadCurrentChartData()).toEqual(currentChartData);
});


  