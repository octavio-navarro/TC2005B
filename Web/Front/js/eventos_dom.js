function mouse_position(event)
{
    let p_div = document.getElementById('mousePosition');

    p_div.innerHTML = 'Posición del mouse: ' + event.clientX + ' , ' + event.clientY
}

function insertRow()
{
    let sample_table = document.getElementById('sampleTable');

    const rows = sample_table.rows.length;
    const cols = sample_table.rows[0].cells.length;

    // Crear una fila
    let row = document.createElement('tr');

    // Crear columnas
    for(let i = 0; i < cols; i++)
    {
        let col = document.createElement('td');
        col.innerText = 'Row ' + (rows+1) + ' column ' + (i+1);
        row.appendChild(col);
    }

    sample_table.appendChild(row);

}

function main()
{
    console.log('ya cargue')
}

document.addEventListener('load', main)