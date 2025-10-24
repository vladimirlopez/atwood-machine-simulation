// Atwood Machine Simulation
class AtwoodMachine {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.g = 9.8; // gravitational acceleration (m/s²)
        
        // Physical properties
        this.mass1 = 2; // kg
        this.mass2 = 3; // kg
        this.initialVelocity = 0; // m/s (positive = mass1 down)
        this.velocity = 0; // m/s
        this.acceleration = 0; // m/s²
        this.tension = 0; // N
        
        // Position and animation
        this.position1 = 0; // meters from initial position (positive = down)
        this.pixelsPerMeter = 40;
        this.time = 0;
        this.dt = 0.016; // ~60 FPS
        
        // Animation state
        this.isRunning = false;
        this.animationId = null;
        
        // Canvas dimensions
        this.centerX = canvas.width / 2;
        this.pulleyY = 100;
        this.pulleyRadius = 35;
        this.ropeLength = 220;
        
        // Initial positions
        this.mass1InitialY = this.pulleyY + this.ropeLength;
        this.mass2InitialY = this.pulleyY + this.ropeLength;
        
        this.calculate();
        this.draw();
    }
    
    calculate() {
        // Calculate acceleration: a = g(m2-m1)/(m1+m2)
        this.acceleration = this.g * (this.mass2 - this.mass1) / (this.mass1 + this.mass2);
        
        // Calculate tension: T = 2*m1*m2*g/(m1+m2)
        this.tension = (2 * this.mass1 * this.mass2 * this.g) / (this.mass1 + this.mass2);
    }
    
    reset() {
        this.velocity = this.initialVelocity;
        this.position1 = 0;
        this.time = 0;
        this.calculate();
        this.draw();
        this.updateDisplay();
    }
    
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.animate();
        }
    }
    
    pause() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
    
    animate() {
        if (!this.isRunning) return;
        
        // Update physics
        this.velocity += this.acceleration * this.dt;
        this.position1 += this.velocity * this.dt;
        this.time += this.dt;
        
        // Check boundaries (prevent masses from going off screen)
        const maxPosition = (this.canvas.height - this.mass1InitialY - 60) / this.pixelsPerMeter;
        const minPosition = -(this.mass1InitialY - this.pulleyY - 60) / this.pixelsPerMeter;
        
        if (this.position1 > maxPosition || this.position1 < minPosition) {
            this.pause();
        }
        
        this.draw();
        this.updateDisplay();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Calculate current positions
        const mass1Y = this.mass1InitialY + this.position1 * this.pixelsPerMeter;
        const mass2Y = this.mass2InitialY - this.position1 * this.pixelsPerMeter;
        
        const mass1X = this.centerX - 100;
        const mass2X = this.centerX + 100;
        
        // Draw ceiling
        this.ctx.strokeStyle = '#495057';
        this.ctx.lineWidth = 6;
        this.ctx.beginPath();
        this.ctx.moveTo(0, 50);
        this.ctx.lineTo(this.canvas.width, 50);
        this.ctx.stroke();
        
        // Draw pulley support
        this.ctx.strokeStyle = '#495057';
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        this.ctx.moveTo(this.centerX, 50);
        this.ctx.lineTo(this.centerX, this.pulleyY - this.pulleyRadius);
        this.ctx.stroke();
        
        // Draw pulley
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.pulleyY, this.pulleyRadius, 0, Math.PI * 2);
        this.ctx.fillStyle = '#adb5bd';
        this.ctx.fill();
        this.ctx.strokeStyle = '#495057';
        this.ctx.lineWidth = 3;
        this.ctx.stroke();
        
        // Draw pulley center
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.pulleyY, 8, 0, Math.PI * 2);
        this.ctx.fillStyle = '#495057';
        this.ctx.fill();
        
        // Draw ropes (proper physics - over the pulley)
        this.ctx.strokeStyle = '#6c757d';
        this.ctx.lineWidth = 3;
        
        // Calculate rope angles
        const leftAngle = Math.atan2(mass1Y - this.pulleyY, mass1X - this.centerX);
        const rightAngle = Math.atan2(mass2Y - this.pulleyY, mass2X - this.centerX);
        
        // Left rope - from mass to pulley edge
        const leftPulleyX = this.centerX + this.pulleyRadius * Math.cos(leftAngle);
        const leftPulleyY = this.pulleyY + this.pulleyRadius * Math.sin(leftAngle);
        
        this.ctx.beginPath();
        this.ctx.moveTo(mass1X, mass1Y - 25);
        this.ctx.lineTo(leftPulleyX, leftPulleyY);
        this.ctx.stroke();
        
        // Right rope - from mass to pulley edge
        const rightPulleyX = this.centerX + this.pulleyRadius * Math.cos(rightAngle);
        const rightPulleyY = this.pulleyY + this.pulleyRadius * Math.sin(rightAngle);
        
        this.ctx.beginPath();
        this.ctx.moveTo(mass2X, mass2Y - 25);
        this.ctx.lineTo(rightPulleyX, rightPulleyY);
        this.ctx.stroke();
        
        // Draw rope arc over pulley
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.pulleyY, this.pulleyRadius, leftAngle, rightAngle);
        this.ctx.stroke();
        
        // Draw masses
        this.drawMass(mass1X, mass1Y, this.mass1, '#2fa4e7', 'm₁');
        this.drawMass(mass2X, mass2Y, this.mass2, '#e74c3c', 'm₂');
        
        // Draw velocity vectors
        this.drawVelocityVector(mass1X, mass1Y, this.velocity, '#28a745');
        this.drawVelocityVector(mass2X, mass2Y, -this.velocity, '#28a745');
        
        // Draw acceleration vectors
        if (Math.abs(this.acceleration) > 0.01) {
            this.drawAccelerationVector(mass1X, mass1Y, this.acceleration, '#ffc107');
            this.drawAccelerationVector(mass2X, mass2Y, -this.acceleration, '#ffc107');
        }
        
        // Draw labels
        this.drawLabels();
    }
    
    drawMass(x, y, mass, color, label) {
        const size = 20 + mass * 8;
        
        // Shadow
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        this.ctx.fillRect(x - size/2 + 3, y - size/2 + 3, size, size);
        
        // Mass block
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x - size/2, y - size/2, size, size);
        this.ctx.strokeStyle = '#2c3e50';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(x - size/2, y - size/2, size, size);
        
        // Label
        this.ctx.fillStyle = 'white';
        this.ctx.font = 'bold 16px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(label, x, y - 5);
        
        // Mass value
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.font = 'bold 12px Arial';
        this.ctx.fillText(mass.toFixed(1) + ' kg', x, y + 10);
    }
    
    drawVelocityVector(x, y, velocity, color) {
        if (Math.abs(velocity) < 0.1) return;
        
        const scale = 15;
        const arrowLength = velocity * scale;
        const maxLength = 90;
        const clampedLength = Math.max(-maxLength, Math.min(maxLength, arrowLength));
        
        const startY = y + 60;
        const endY = startY + clampedLength;
        
        // Double arrow shaft (two parallel lines)
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 3;
        
        // First line
        this.ctx.beginPath();
        this.ctx.moveTo(x - 3, startY);
        this.ctx.lineTo(x - 3, endY);
        this.ctx.stroke();
        
        // Second line
        this.ctx.beginPath();
        this.ctx.moveTo(x + 3, startY);
        this.ctx.lineTo(x + 3, endY);
        this.ctx.stroke();
        
        // Arrow heads on both lines
        const headSize = 10;
        const direction = velocity > 0 ? 1 : -1;
        
        this.ctx.fillStyle = color;
        // Left arrow head
        this.ctx.beginPath();
        this.ctx.moveTo(x - 3, endY);
        this.ctx.lineTo(x - 3 - headSize/2, endY - direction * headSize);
        this.ctx.lineTo(x - 3 + headSize/2, endY - direction * headSize);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Right arrow head
        this.ctx.beginPath();
        this.ctx.moveTo(x + 3, endY);
        this.ctx.lineTo(x + 3 - headSize/2, endY - direction * headSize);
        this.ctx.lineTo(x + 3 + headSize/2, endY - direction * headSize);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Label
        this.ctx.fillStyle = color;
        this.ctx.font = 'bold 13px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('v', x + 20, (startY + endY) / 2);
    }
    
    drawAccelerationVector(x, y, acceleration, color) {
        const scale = 8;
        const arrowLength = acceleration * scale;
        const maxLength = 60;
        const clampedLength = Math.max(-maxLength, Math.min(maxLength, arrowLength));
        
        const startY = y + 75;
        const endY = startY + clampedLength;
        const xOffset = 28;
        
        // Double arrow shaft (two parallel dashed lines)
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 2.5;
        this.ctx.setLineDash([5, 3]);
        
        // First line
        this.ctx.beginPath();
        this.ctx.moveTo(x + xOffset - 3, startY);
        this.ctx.lineTo(x + xOffset - 3, endY);
        this.ctx.stroke();
        
        // Second line
        this.ctx.beginPath();
        this.ctx.moveTo(x + xOffset + 3, startY);
        this.ctx.lineTo(x + xOffset + 3, endY);
        this.ctx.stroke();
        
        this.ctx.setLineDash([]);
        
        // Arrow heads on both lines
        const headSize = 9;
        const direction = acceleration > 0 ? 1 : -1;
        
        this.ctx.fillStyle = color;
        // Left arrow head
        this.ctx.beginPath();
        this.ctx.moveTo(x + xOffset - 3, endY);
        this.ctx.lineTo(x + xOffset - 3 - headSize/2, endY - direction * headSize);
        this.ctx.lineTo(x + xOffset - 3 + headSize/2, endY - direction * headSize);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Right arrow head
        this.ctx.beginPath();
        this.ctx.moveTo(x + xOffset + 3, endY);
        this.ctx.lineTo(x + xOffset + 3 - headSize/2, endY - direction * headSize);
        this.ctx.lineTo(x + xOffset + 3 + headSize/2, endY - direction * headSize);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Label
        this.ctx.fillStyle = color;
        this.ctx.font = 'bold 13px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('a', x + xOffset + 20, (startY + endY) / 2);
    }
    
    drawLabels() {
        // Legend at bottom
        const legendY = this.canvas.height - 30;
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.font = 'bold 12px Arial';
        this.ctx.textAlign = 'left';
        
        // Velocity legend (double arrow)
        this.ctx.fillStyle = '#28a745';
        this.ctx.fillText('⇉', 20, legendY);
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.fillText('Velocity (v)', 40, legendY);
        
        // Acceleration legend (double dashed arrow)
        this.ctx.fillStyle = '#ffc107';
        this.ctx.fillText('⇉', 140, legendY);
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.fillText('Acceleration (a)', 160, legendY);
    }
    
    updateDisplay() {
        document.getElementById('accelerationValue').textContent = this.acceleration.toFixed(2) + ' m/s²';
        document.getElementById('currentVelocity').textContent = this.velocity.toFixed(2) + ' m/s';
        document.getElementById('tensionValue').textContent = this.tension.toFixed(2) + ' N';
        document.getElementById('timeValue').textContent = this.time.toFixed(2) + ' s';
    }
    
    setMass1(mass) {
        this.mass1 = parseFloat(mass);
        this.calculate();
        if (!this.isRunning) {
            this.draw();
            this.updateDisplay();
        }
    }
    
    setMass2(mass) {
        this.mass2 = parseFloat(mass);
        this.calculate();
        if (!this.isRunning) {
            this.draw();
            this.updateDisplay();
        }
    }
    
    setInitialVelocity(velocity) {
        this.initialVelocity = parseFloat(velocity);
        if (!this.isRunning) {
            this.velocity = this.initialVelocity;
            this.updateDisplay();
        }
    }
}

// Initialize simulation
const canvas = document.getElementById('atwoodCanvas');
const simulation = new AtwoodMachine(canvas);

// Control elements
const mass1Input = document.getElementById('mass1');
const mass2Input = document.getElementById('mass2');
const velocityInput = document.getElementById('initialVelocity');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

// Display elements
const mass1Display = document.getElementById('mass1Display');
const mass2Display = document.getElementById('mass2Display');
const velocityDisplay = document.getElementById('velocityDisplay');

// Event listeners
mass1Input.addEventListener('input', (e) => {
    simulation.setMass1(e.target.value);
    mass1Display.textContent = parseFloat(e.target.value).toFixed(1) + ' kg';
});

mass2Input.addEventListener('input', (e) => {
    simulation.setMass2(e.target.value);
    mass2Display.textContent = parseFloat(e.target.value).toFixed(1) + ' kg';
});

velocityInput.addEventListener('input', (e) => {
    simulation.setInitialVelocity(e.target.value);
    velocityDisplay.textContent = parseFloat(e.target.value).toFixed(1) + ' m/s';
});

startBtn.addEventListener('click', () => {
    simulation.start();
    startBtn.disabled = true;
    pauseBtn.disabled = false;
});

pauseBtn.addEventListener('click', () => {
    simulation.pause();
    startBtn.disabled = false;
    pauseBtn.disabled = true;
});

resetBtn.addEventListener('click', () => {
    simulation.pause();
    simulation.reset();
    startBtn.disabled = false;
    pauseBtn.disabled = true;
});

// Initialize button states
pauseBtn.disabled = true;

// Initialize displays
mass1Display.textContent = simulation.mass1.toFixed(1) + ' kg';
mass2Display.textContent = simulation.mass2.toFixed(1) + ' kg';
velocityDisplay.textContent = simulation.initialVelocity.toFixed(1) + ' m/s';
