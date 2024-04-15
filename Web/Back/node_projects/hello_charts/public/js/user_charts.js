/**
 * @param {number} alpha Indicated the transparency of the color
 * @returns {string} A string of the form 'rgba(240, 50, 123, 1.0)' that represents a color
 */
function random_color(alpha=1.0)
{
    const r_c = () => Math.round(Math.random() * 255)
    return `rgba(${r_c()}, ${r_c()}, ${r_c()}, ${alpha}`
}

Chart.defaults.font.size = 16;

// We obtain a reference to the canvas that we are going to use to plot the chart.
const ctx = document.getElementById('firstChart').getContext('2d');

// To plot a chart, we need a configuration object that has all the information that the chart needs.
const firstChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// To plot data from an API, we first need to fetch a request, and then process the data.
try
{
    const levels_response = await fetch('http://localhost:5000/api/levels',{method: 'GET'})

    if(levels_response.ok)
    {
        console.log('Response is ok. Converting to JSON.')

        let results = await levels_response.json()

        console.log(results)
        console.log('Data converted correctly. Plotting chart.')

        // In this case, we just separate the data into different arrays using the map method of the values array. This creates new arrays that hold only the data that we need.
        const level_names = results.map(e => e['name'])
        const level_colors = results.map(e => random_color(0.8))
        const level_borders = results.map(e => 'rgba(0, 0, 0, 1.0)')
        const level_completion = results.map(e => e['completion_rate'])

        const ctx_levels1 = document.getElementById('apiChart1').getContext('2d');
        const levelChart1 = new Chart(ctx_levels1, 
            {
                type: 'pie',
                data: {
                    labels: level_names,
                    datasets: [
                        {
                            label: 'Completion Rate',
                            backgroundColor: level_colors,
                            borderColor: level_borders,
                            data: level_completion
                        }
                    ]
                }
            })

        const ctx_levels2 = document.getElementById('apiChart2').getContext('2d');
        const levelChart2 = new Chart(ctx_levels2, 
            {
                type: 'line',
                data: {
                    labels: level_names,
                    datasets: [
                        {
                            label: 'Completion Rate',
                            backgroundColor: level_colors,
                            pointRadius: 10,
                            data: level_completion
                        }
                    ]
                }
            })
        
        const ctx_levels3 = document.getElementById('apiChart3').getContext('2d');
        const levelChart3 = new Chart(ctx_levels3, 
            {
                type: 'bar',
                data: {
                    labels: level_names,
                    datasets: [
                        {
                            label: 'Completion Rate',
                            backgroundColor: level_colors,
                            borderColor: level_borders,
                            borderWidth: 2,
                            data: level_completion
                        }
                    ]
                }
            })
    }
}
catch(error)
{
    console.log(error)
}
