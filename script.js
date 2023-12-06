navigator.getBattery().then(function(battery) {
    function updateAllBatteryInfo() {
        updateChargeInfo()
        updateLevelInfo()
        updateCargingInfo()
        updateDischargingInfo()
    }

    updateAllBatteryInfo()

    battery.addEventListener('chargingchange', function() {
        updateChargeInfo()
    })

    function updateChargeInfo() {
        if (battery.charging) { // Если ноутбук заряжается true - да, false - нет
            document.querySelector('#status').innerHTML = 'Шнур питания подключён'
            document.querySelector('#battery-level').classList.add('battery-active')
        } else {
            document.querySelector('#status').innerHTML = 'Шнур питания не включён'
            document.querySelector('#battery-level').classList.remove('battery-active')
        }
    }

    battery.addEventListener('levelchange', updateLevelInfo)

    function updateLevelInfo () {
        document.querySelector('#battery-level-percent').innerHTML = battery.level * 100 + '%' // level - возвращает от 0 до 1, в зависимости от зарядки (0.5 = 50% зарядки)
        document.querySelector('#battery-level').style.width = battery.level * 100 + '%' 
    }

    battery.addEventListener('chargingtimechange', updateCargingInfo) // Сколько времени осталось до зарядки в секундах

    function updateCargingInfo () {
        if (battery.charging) {
            document.querySelector('#charging-time').innerHTML = ((battery.chargingTime) / 60).toFixed(0) + ' min'
        }
    }

    battery.addEventListener('dischargingtimechange', updateDischargingInfo) // Сколько времени осталось до разрядки

    function updateDischargingInfo () {
        if (!battery.charging) {
            document.querySelector('#discharging-time').innerHTML = ((battery.dischargingTime) / 60).toFixed(0) + ' min'
        }
    }
})