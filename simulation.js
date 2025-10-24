// Atwood Machine Simulation
class AtwoodMachine {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.g = 9.8; // gravitational acceleration (m/s²)
        
        // Physical properties
        this.mass1 = 2; // kg (left side)
        this.mass2 = 3; // kg (right side)
        this.initialVelocity = 0; // m/s (positive = clockwise = mass2 down, mass1 up)
        this.velocity = 0; // m/s (positive = clockwise rotation)
        this.acceleration = 0; // m/s² (positive = clockwise acceleration)
        this.tension = 0; // N
        
        // Position and animation
        this.position2 = 0; // meters from initial position for mass2 (positive = down)
        this.pixelsPerMeter = 25; // Slower motion for clarity
        this.time = 0;
        this.dt = 0.008; // ~120 FPS, but slower per frame
        
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
        this.position2 = 0;
        this.velocity = this.initialVelocity;
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
        
        // Update physics (positive velocity = clockwise = mass2 down)
        this.velocity += this.acceleration * this.dt;
        this.position2 += this.velocity * this.dt;
        this.time += this.dt;
        
        // Check boundaries (prevent masses from going off screen)
        const maxPosition = (this.canvas.height - this.mass2InitialY - 60) / this.pixelsPerMeter;
        const minPosition = -(this.mass2InitialY - this.pulleyY - 60) / this.pixelsPerMeter;
        
        if (this.position2 > maxPosition || this.position2 < minPosition) {
            this.pause();
        }
        
        this.draw();
        this.updateDisplay();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Tangent points on the pulley (left and right edges)
        const leftTangentX = this.centerX - this.pulleyRadius;
        const rightTangentX = this.centerX + this.pulleyRadius;
        
        // Masses are directly below their respective tangent points
        const mass1X = leftTangentX;
        const mass2X = rightTangentX;
        
        // Calculate current positions (positive position2 = mass2 down, mass1 up)
        const mass1Y = this.mass1InitialY - this.position2 * this.pixelsPerMeter;
        const mass2Y = this.mass2InitialY + this.position2 * this.pixelsPerMeter;
        
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
        
        // Draw ropes (straight down from tangent points)
        this.ctx.strokeStyle = '#6c757d';
        this.ctx.lineWidth = 3;
        
        // Left rope - straight vertical line from mass to tangent point
        this.ctx.beginPath();
        this.ctx.moveTo(mass1X, mass1Y - 25);
        this.ctx.lineTo(leftTangentX, this.pulleyY);
        this.ctx.stroke();
        
        // Right rope - straight vertical line from mass to tangent point
        this.ctx.beginPath();
        this.ctx.moveTo(mass2X, mass2Y - 25);
        this.ctx.lineTo(rightTangentX, this.pulleyY);
        this.ctx.stroke();
        
        // Draw rope arc over pulley (semicircle over the top)
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.pulleyY, this.pulleyRadius, Math.PI, 0, false);
        this.ctx.stroke();
        
        // Draw masses
        this.drawMass(mass1X, mass1Y, this.mass1, '#2fa4e7', 'm₁');
        this.drawMass(mass2X, mass2Y, this.mass2, '#e74c3c', 'm₂');
        
        // Draw velocity and acceleration arrows BESIDE each mass
        // Draw velocity and acceleration arrows BESIDE each mass
        // Left mass (m1) - velocity is positive when m1 goes UP (opposite of position2)
        this.drawVelocityArrow(mass1X - 50, mass1Y, -this.velocity, '#28a745', 'v');
        this.drawAccelerationArrow(mass1X - 90, mass1Y, -this.acceleration, '#ffc107', 'a');
        
        // Right mass (m2) - velocity is positive when m2 goes DOWN (same as position2)
        this.drawVelocityArrow(mass2X + 50, mass2Y, this.velocity, '#28a745', 'v');
        this.drawAccelerationArrow(mass2X + 90, mass2Y, this.acceleration, '#ffc107', 'a');
        
        // Draw labels
        this.drawLabels();
    }
    
    drawVelocityArrow(x, y, velocity, color, label) {
        if (Math.abs(velocity) < 0.05) return;
        const scale = 20; // pixels per m/s
        const arrowLength = velocity * scale; // No clamping - let it scale naturally
        const startY = y;
        const endY = y + arrowLength; // Positive = down, negative = up
        const arrowX = x;
        
        // Double arrow shaft (vertical lines)
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        this.ctx.moveTo(arrowX - 6, startY);
        this.ctx.lineTo(arrowX - 6, endY);
        this.ctx.moveTo(arrowX + 6, startY);
        this.ctx.lineTo(arrowX + 6, endY);
        this.ctx.stroke();
        
        // Arrow heads
        const headSize = 12;
        const direction = arrowLength > 0 ? 1 : -1;
        this.ctx.fillStyle = color;
        
        // Left arrow head
        this.ctx.beginPath();
        this.ctx.moveTo(arrowX - 6, endY);
        this.ctx.lineTo(arrowX - 6 - headSize/2, endY - direction * headSize);
        this.ctx.lineTo(arrowX - 6 + headSize/2, endY - direction * headSize);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Right arrow head
        this.ctx.beginPath();
        this.ctx.moveTo(arrowX + 6, endY);
        this.ctx.lineTo(arrowX + 6 - headSize/2, endY - direction * headSize);
        this.ctx.lineTo(arrowX + 6 + headSize/2, endY - direction * headSize);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Label
        this.ctx.fillStyle = color;
        this.ctx.font = 'bold 16px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(label, arrowX + 20, startY + (endY - startY)/2);
    }
    
    drawAccelerationArrow(x, y, acceleration, color, label) {
        if (Math.abs(acceleration) < 0.01) return;
        const scale = 20; // pixels per m/s²
        const arrowLength = acceleration * scale; // No clamping - let it scale naturally
        const startY = y;
        const endY = y + arrowLength; // Positive = down, negative = up
        const arrowX = x;
        
        // Double dashed arrow shaft (vertical lines)
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 3;
        this.ctx.setLineDash([7, 5]);
        this.ctx.beginPath();
        this.ctx.moveTo(arrowX - 5, startY);
        this.ctx.lineTo(arrowX - 5, endY);
        this.ctx.moveTo(arrowX + 5, startY);
        this.ctx.lineTo(arrowX + 5, endY);
        this.ctx.stroke();
        this.ctx.setLineDash([]);
        
        // Arrow heads
        const headSize = 10;
        const direction = arrowLength > 0 ? 1 : -1;
        this.ctx.fillStyle = color;
        
        // Left arrow head
        this.ctx.beginPath();
        this.ctx.moveTo(arrowX - 5, endY);
        this.ctx.lineTo(arrowX - 5 - headSize/2, endY - direction * headSize);
        this.ctx.lineTo(arrowX - 5 + headSize/2, endY - direction * headSize);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Right arrow head
        this.ctx.beginPath();
        this.ctx.moveTo(arrowX + 5, endY);
        this.ctx.lineTo(arrowX + 5 - headSize/2, endY - direction * headSize);
        this.ctx.lineTo(arrowX + 5 + headSize/2, endY - direction * headSize);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Label
        this.ctx.fillStyle = color;
        this.ctx.font = 'bold 16px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(label, arrowX + 20, startY + (endY - startY)/2);
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
    
    drawMass(x, y, mass, color, label) {
        const width = 50;
        const height = 50;
        
        // Draw mass box
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x - width/2, y - height/2, width, height);
        this.ctx.strokeStyle = '#2c3e50';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(x - width/2, y - height/2, width, height);
        
        // Draw mass label
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = 'bold 16px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(label, x, y - 8);
        this.ctx.font = '12px Arial';
        this.ctx.fillText(mass.toFixed(1) + ' kg', x, y + 8);
    }
    
    drawLabels() {
        // Draw sign convention info
        this.ctx.fillStyle = '#495057';
        this.ctx.font = '12px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText('Sign Convention: Clockwise = Positive', 10, this.canvas.height - 10);
    }
    
    updateDisplay() {
        document.getElementById('currentAcceleration').textContent = this.acceleration.toFixed(2);
        document.getElementById('currentVelocity').textContent = this.velocity.toFixed(2);
        document.getElementById('currentTension').textContent = this.tension.toFixed(2);
        document.getElementById('currentTime').textContent = this.time.toFixed(2);
    }
    
    setMass1(mass) {
        this.mass1 = parseFloat(mass);
        if (this.mass1 < 0.1) this.mass1 = 0.1;
        if (this.mass1 > 10) this.mass1 = 10;
        this.calculate();
        this.draw();
        this.updateDisplay();
    }
    
    setMass2(mass) {
        this.mass2 = parseFloat(mass);
        if (this.mass2 < 0.1) this.mass2 = 0.1;
        if (this.mass2 > 10) this.mass2 = 10;
        this.calculate();
        this.draw();
        this.updateDisplay();
    }
    
    setInitialVelocity(velocity) {
        this.initialVelocity = parseFloat(velocity);
        if (this.initialVelocity < -5) this.initialVelocity = -5;
        if (this.initialVelocity > 5) this.initialVelocity = 5;
        this.velocity = this.initialVelocity;
        this.draw();
        this.updateDisplay();
    }
}

// Initialize simulation
var canvas = document.getElementById('atwoodCanvas');
var simulation = new AtwoodMachine(canvas);

// Control elements
var mass1Input = document.getElementById('mass1');
var mass2Input = document.getElementById('mass2');
var velocityInput = document.getElementById('initialVelocity');
var startBtn = document.getElementById('startBtn');
var pauseBtn = document.getElementById('pauseBtn');
var resetBtn = document.getElementById('resetBtn');

// Display elements
var mass1Display = document.getElementById('mass1Display');
var mass2Display = document.getElementById('mass2Display');
var velocityDisplay = document.getElementById('velocityDisplay');

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
