# Atwood Machine Simulation

An interactive HTML5 simulation of an Atwood Machine for physics education. This simulation demonstrates the relationship between acceleration and motion direction, showing that objects can move in one direction while accelerating in another.

![Atwood Machine](https://img.shields.io/badge/Physics-Simulation-blue)
![HTML5](https://img.shields.io/badge/HTML5-Canvas-orange)
![License](https://img.shields.io/badge/License-MIT-green)

## 🎯 Features

- **Adjustable Masses**: Change the mass of both objects independently (0.1 - 20 kg)
- **Initial Velocity Control**: Set any initial velocity (-10 to +10 m/s) to demonstrate that acceleration direction ≠ motion direction
- **Real-time Physics**: Accurate physics simulation using classical mechanics equations
- **Frictionless Pulley**: Ideal Atwood machine with zero friction and massless pulley
- **Visual Feedback**: 
  - Color-coded masses
  - Velocity vectors (green arrows)
  - Acceleration vectors (orange dashed arrows)
  - Real-time display of acceleration, velocity, tension, and time
- **Educational Content**: Comprehensive explanations of the physics principles
- **Responsive Design**: Works on desktop and mobile devices

## 🚀 Live Demo

Simply open `index.html` in any modern web browser. No server required!

## 📚 Educational Use

This simulation is perfect for teaching:

1. **Newton's Laws of Motion**
2. **The difference between acceleration and velocity**
3. **How initial conditions affect motion**
4. **Special case: Equal masses (constant velocity)**
5. **The concept of a frictionless system**

### Suggested Experiments

1. **Basic Setup**: Set m₁ = 2 kg, m₂ = 3 kg, v₀ = 0 m/s
   - Observe: m₂ accelerates downward

2. **Counterintuitive Motion**: Set m₁ = 2 kg, m₂ = 3 kg, v₀ = -5 m/s
   - Observe: m₁ moves down initially despite acceleration pointing the other way!

3. **Constant Velocity**: Set m₁ = 2 kg, m₂ = 2 kg, v₀ = 3 m/s
   - Observe: System maintains constant velocity (a = 0)

4. **Extreme Difference**: Set m₁ = 1 kg, m₂ = 10 kg, v₀ = 0 m/s
   - Observe: Rapid acceleration

## 🧮 Physics Equations

### Acceleration
```
a = g × (m₂ - m₁) / (m₁ + m₂)
```

Where:
- `g = 9.8 m/s²` (gravitational acceleration)
- `m₁` = mass 1
- `m₂` = mass 2

### Tension
```
T = 2m₁m₂g / (m₁ + m₂)
```

## 🛠️ Technical Details

- **Pure HTML5/CSS3/JavaScript** - No frameworks required
- **Canvas API** for smooth animations
- **60 FPS** physics simulation
- **Responsive design** with CSS Grid
- **Clean, maintainable code** with OOP principles

## 📂 File Structure

```
Atwood Machine/
├── index.html          # Main HTML structure
├── styles.css          # Styling and layout
├── simulation.js       # Physics simulation and animation
└── README.md          # This file
```

## 🎨 Design

The design is inspired by modern educational websites with:
- Clean, professional layout
- Gradient backgrounds
- Clear information hierarchy
- Accessible color scheme
- Intuitive controls

## 🔧 How to Use

1. **Clone or download** this repository
2. **Open** `index.html` in a web browser
3. **Adjust** the masses and initial velocity using the controls
4. **Click Start** to begin the simulation
5. **Use Pause** to freeze the motion
6. **Click Reset** to return to initial conditions

## 📖 Browser Compatibility

Works on all modern browsers:
- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

## 📝 License

MIT License - Feel free to use this for educational purposes!

## 👨‍🏫 About

Created for physics education by **The Thinking Experiment**

Perfect for:
- High school physics classes
- University mechanics courses
- Online physics education
- Self-study and exploration

## 🤝 Contributing

Suggestions and improvements are welcome! This is an educational tool meant to help students understand physics better.

## 📧 Contact

For questions or feedback about this simulation, please open an issue on GitHub.

---

*"The best way to understand physics is to see it in action!"*
