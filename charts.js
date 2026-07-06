function drawChart(canvasId, habits) {

    const canvas = document.getElementById(canvasId);

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const barWidth = 30;

    const gap = 20;

    const maxHeight = 180;

    let x = 30;

    habits.forEach(habit => {

        const data = Object.values(habit.history);

        let positive = 0;
        let negative = 0;

        data.forEach(day => {
            positive += day.positive;
            negative += day.negative;
        });

        const total = positive + negative;

        let percent = 0;

        if (total > 0) {
            percent = (positive / total) * 100;
        }

        const height = (percent / 100) * maxHeight;

        const y = 200 - height;

        // bar
        ctx.fillStyle = "#2ecc71";
        ctx.fillRect(x, y, barWidth, height);

        // text percent
        ctx.fillStyle = "#000";
        ctx.font = "12px Tahoma";
        ctx.fillText(Math.round(percent) + "%", x, y - 5);

        // name
        ctx.fillText(habit.name.substring(0, 6), x, 220);

        x += barWidth + gap;

    });

}