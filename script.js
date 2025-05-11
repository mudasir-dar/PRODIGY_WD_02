let [hours, minutes, seconds] = [0, 0, 0];
    let display = document.getElementById("display");
    let interval = null;
    let lapHistory = [];

    function updateDisplay() {
      let h = hours < 10 ? "0" + hours : hours;
      let m = minutes < 10 ? "0" + minutes : minutes;
      let s = seconds < 10 ? "0" + seconds : seconds;
      display.innerText = `${h}:${m}:${s}`;
    }

    function start() {
      if (interval !== null) return;
      interval = setInterval(() => {
        seconds++;
        if (seconds === 60) {
          seconds = 0;
          minutes++;
        }
        if (minutes === 60) {
          minutes = 0;
          hours++;
        }
        updateDisplay();
      }, 1000);
    }

    function pause() {
      clearInterval(interval);
      interval = null;
    }

    function reset() {
      pause();
      [hours, minutes, seconds] = [0, 0, 0];
      updateDisplay();
      document.getElementById("laps").innerHTML = "";
      lapHistory = [];
      localStorage.removeItem("lapHistory");
    }

    function lap() {
      const lapTime = display.innerText;
      lapHistory.unshift(lapTime);
      localStorage.setItem("lapHistory", JSON.stringify(lapHistory));
      renderLaps();
    }

    function renderLaps() {
      const lapList = document.getElementById("laps");
      lapList.innerHTML = "";
      lapHistory.forEach((lap, index) => {
        const lapItem = document.createElement("div");
        lapItem.className = "lap";
        lapItem.innerText = `Lap ${lapHistory.length - index}: ${lap}`;
        lapList.appendChild(lapItem);
      });
    }

    function toggleTheme() {
      document.body.classList.toggle("dark-mode");
      localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
    }

    // Restore state
    window.onload = () => {
      const savedLaps = localStorage.getItem("lapHistory");
      if (savedLaps) {
        lapHistory = JSON.parse(savedLaps);
        renderLaps();
      }
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "dark") document.body.classList.add("dark-mode");
    };