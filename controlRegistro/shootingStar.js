(function () {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:2;';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function lanzar() {
        const angle  = (28 + Math.random() * 15) * Math.PI / 180;
        const speed  = 14 + Math.random() * 8;
        const maxDist = 600 + Math.random() * 300;
        const trail  = [];
        const MAX_TRAIL = 28;

        let x = Math.random() * canvas.width  * 0.55;
        let y = Math.random() * canvas.height * 0.40;
        let dist = 0;

        function step() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            x += Math.cos(angle) * speed;
            y += Math.sin(angle) * speed;
            dist += speed;
            trail.push({ x, y });
            if (trail.length > MAX_TRAIL) trail.shift();

            // cola
            for (let i = 1; i < trail.length; i++) {
                const t = i / trail.length;
                ctx.beginPath();
                ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
                ctx.lineTo(trail[i].x, trail[i].y);
                ctx.strokeStyle = `rgba(255,255,255,${t * 0.85})`;
                ctx.lineWidth   = t * 2.5;
                ctx.lineCap     = 'round';
                ctx.stroke();
            }

            // cabeza brillante
            const g = ctx.createRadialGradient(x, y, 0, x, y, 10);
            g.addColorStop(0,   'rgba(255,255,255,1)');
            g.addColorStop(0.4, 'rgba(200,170,255,0.85)');
            g.addColorStop(1,   'rgba(120,80,255,0)');
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, Math.PI * 2);
            ctx.fillStyle = g;
            ctx.fill();

            if (dist < maxDist) {
                requestAnimationFrame(step);
            } else {
                // desvanecer cola
                let alpha = 1;
                (function fade() {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    for (let i = 1; i < trail.length; i++) {
                        const t = (i / trail.length) * alpha;
                        ctx.beginPath();
                        ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
                        ctx.lineTo(trail[i].x, trail[i].y);
                        ctx.strokeStyle = `rgba(255,255,255,${t * 0.85})`;
                        ctx.lineWidth   = t * 2.5;
                        ctx.lineCap     = 'round';
                        ctx.stroke();
                    }
                    alpha -= 0.08;
                    if (alpha > 0) requestAnimationFrame(fade);
                    else {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        setTimeout(lanzar, 9000 + Math.random() * 10000);
                    }
                })();
            }
        }

        step();
    }

    setTimeout(lanzar, 2500);
})();
