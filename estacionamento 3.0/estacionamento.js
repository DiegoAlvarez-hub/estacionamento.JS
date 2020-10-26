(function () {
    const $ = q => document.querySelector(q);

    function convertPeriod(mil) {
        const min = Math.floor(mil / 60000);
        const sec = Math.floor((mil % 60000) / 1000);
        return `${min}m e ${sec}s `;
    };

    function renderGarage() {
        const garage = getGarage();
        $("#garage").innerHTML = "";
        garage.forEach(c => addCarToGarage(c))
    };

    function addCarToGarage(car) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${car.name}</td>
            <td>${car.licence}</td>
            <td data-time="${car.time}">${new Date(car.time).toLocaleString("pt-BR", {
            hour: "numeric", minute: "numeric"
        })}</td>
            <td>
                <button class="delete">x</button>
            </td>    
        `;
        $("#garage").appendChild(row)
    };

    function checkOut(info) {
        const licence = info[1].textContent;
        let period = new Date() - new Date(info[2].dataset.time);
        period = convertPeriod(period);
        msg = ` O veículo ${info[0].textContent} de placa ${licence} ficou ${period}. Deseja encerrar ? `;
        if (!confirm(msg)) return;

        const garage = getGarage().filter(c => c.licence !== licence);
        localStorage.garage = JSON.stringify(garage);

        renderGarage()

    }

    const getGarage = () => localStorage.garage ? JSON.parse(localStorage.garage) : [];

    renderGarage();

    $("#send").addEventListener('click', e => {
        const name = $("#name").value;
        const licence = $("#licence").value;

        if (!name || !licence) {
            alert("Os campos precisam ser preenchidos !")
            return
        }

        const car = { name, licence, time: new Date() };

        const garage = getGarage()

        garage.push(car);

        localStorage.garage = JSON.stringify(garage);

        $("#name").value = "";
        $("#licence").value = "";

        addCarToGarage(car);

    });
    $("#garage").addEventListener('click', e => {
        if (e.target.className = "delete")
            checkOut(e.target.parentElement.parentElement.cells);
    })

})();