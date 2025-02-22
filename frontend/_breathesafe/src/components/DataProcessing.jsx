function DataProcessing(data, type) {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleString('en-US', {
      /*year: 'numeric',
      month: '2-digit',
      day: '2-digit',*/
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  if (type === "25"){
    // Prepare data for PM 2.5 chart
    const pm25ChartData = {
      labels: data.map((item) => formatTimestamp(item.timestamp)), // X-axis values
      datasets: [
        {
          label: 'PM 2.5',
          data: data.map((item) => item.pm25), // Y-axis values
          borderColor: 'rgb(254, 75, 75)',
          backgroundColor: 'rgba(255,161,208,0.2)',
          fill: true,
          tension: 0.3,
          pointRadius: 3.5,
          pointBackgroundColor: 'rgb(254, 75, 75)',
        },
      ],
    };
    return pm25ChartData
  }

  
  else if (type === "10"){
    // Prepare data for PM 10 chart
    const pm10ChartData = {
      labels: data.map((item) => formatTimestamp(item.timestamp)), // X-axis values
      datasets: [
        {
          label: 'PM 10',
          data: data.map((item) => item.pm10), // Y-axis values
          borderColor: 'rgb(15, 12, 195)',
          backgroundColor: 'rgba(35, 32, 228, 0.2)',
          fill: true,
          tension: 0.3,
          pointRadius: 3.5,
          pointBackgroundColor: 'rgb(15, 12, 195)',
        },
      ],
    };
    return pm10ChartData
  }
}

export default DataProcessing;