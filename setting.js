let presentNum;

let createForm = function(){
    presentNum = document.getElementById('num_box').value;

    for (let i = 0; i < presentNum; i++) {
        form =
        `<tr>
            <td>
                <input type="text" id="label${i}" class="form-control present_name">
            </td>
            <td>
                <input type="number" id="form${i}" class="form-control present_number">
            </td>
        </tr>`
        $('#presents').append(form);
    }
    
}

let getPresent = function(){
    presents = [];
    url = 'index.html?'
    for (let i = 0; i < presentNum; i++) {
        presents[i] = {}
        presents[i].name = document.getElementById(`label${i}`).value;
        presents[i].number = document.getElementById(`form${i}`).value;
        // name = document.getElementById(`label${i}`).value;
        // num = document.getElementById(`form${i}`).value;
        // url += `${encodeURI(name)}=${num}&`
    }
    // url += 'json='+JSON.stringify(presents);
    localStorage.setItem('present', JSON.stringify(presents));
    localStorage.setItem('default', JSON.stringify(presents));
    location.href = url;
}