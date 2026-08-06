/* ==========================================================================
   Yaswanth S S Portfolio JavaScript Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initTypewriter();
    initAmbientParticles();
    initNavbarScroll();
    initTerminal();
});

/* --------------------------------------------------------------------------
   1. Typewriter Animation Effect
   -------------------------------------------------------------------------- */
const typingPhrases = [
    "Computer Science Student 🎓",
    "Software & Web Developer 💻",
    "IoT & Edge Tech Enthusiast ⚡",
    "LeetCode Problem Solver 🧠"
];

let phraseIndex = 0;
let letterIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function initTypewriter() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    function type() {
        const currentPhrase = typingPhrases[phraseIndex];

        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, letterIndex - 1);
            letterIndex--;
            typingDelay = 50;
        } else {
            typingElement.textContent = currentPhrase.substring(0, letterIndex + 1);
            letterIndex++;
            typingDelay = 100;
        }

        if (!isDeleting && letterIndex === currentPhrase.length) {
            typingDelay = 2000;
            isDeleting = true;
        } else if (isDeleting && letterIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % typingPhrases.length;
            typingDelay = 500;
        }

        setTimeout(type, typingDelay);
    }

    type();
}

/* --------------------------------------------------------------------------
   2. Ambient Particle Canvas Animation
   -------------------------------------------------------------------------- */
function initAmbientParticles() {
    const canvas = document.getElementById('ambient-particles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 25), 45);

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 1,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            color: Math.random() > 0.4 ? 'rgba(16, 185, 129, ' : 'rgba(6, 182, 212, ',
            alpha: Math.random() * 0.5 + 0.2
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color + p.alpha + ')';
            ctx.fill();

            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(16, 185, 129, ${0.15 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
}

/* --------------------------------------------------------------------------
   3. Navbar Scroll & Mobile Menu Toggle
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 200;

        sections.forEach(sec => {
            const top = sec.offsetTop;
            const height = sec.offsetHeight;
            const id = sec.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                document.querySelectorAll('.nav-item').forEach(a => {
                    a.classList.remove('active');
                    if (a.getAttribute('href') === `#${id}`) {
                        a.classList.add('active');
                    }
                });
            }
        });
    });

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-item').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
}

/* --------------------------------------------------------------------------
   4. Interactive Terminal CLI Parser
   -------------------------------------------------------------------------- */
function initTerminal() {
    const terminalInput = document.getElementById('terminal-input');
    const terminalBody = document.getElementById('terminal-body');
    if (!terminalInput || !terminalBody) return;

    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = terminalInput.value.trim().toLowerCase();
            terminalInput.value = '';

            appendTerminalLine(`yaswanth@portfolio:~$ ${command}`, 'term-prompt');
            processCommand(command);
            
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    });

    function processCommand(cmd) {
        switch (cmd) {
            case 'help':
                appendTerminalLine('Available commands:');
                appendTerminalLine('  skills      - Show technical skills and stack');
                appendTerminalLine('  projects    - List featured projects');
                appendTerminalLine('  experience  - Show internship experience');
                appendTerminalLine('  education   - Show academic qualifications');
                appendTerminalLine('  contact     - Display contact details');
                appendTerminalLine('  resume      - Download resume file');
                appendTerminalLine('  clear       - Clear the terminal');
                break;
            case 'skills':
                appendTerminalLine('⚡ Programming: Java, Python, C, C++');
                appendTerminalLine('🌐 Web Tech: HTML, CSS, JavaScript, Responsive UI');
                appendTerminalLine('🗄️ Database & Core: SQL, DBMS, Data Structures, OS');
                appendTerminalLine('🛠️ Tools: Git, GitHub, VS Code');
                break;
            case 'projects':
                appendTerminalLine('1. Plant Health Monitoring System (IoT & Sensors)');
                appendTerminalLine('   - Real-time soil/temp monitoring system.');
                appendTerminalLine('2. Virtual Voice Identity Vault (Biometric Security)');
                appendTerminalLine('   - Secure voice-based identity verification.');
                break;
            case 'experience':
                appendTerminalLine('💼 Web Development Intern @ NxtLogic Software Solutions');
                appendTerminalLine('   - Developed responsive web applications & version control with Git.');
                break;
            case 'education':
                appendTerminalLine('🎓 B.E. Computer Science & Engineering (2024-2028)');
                appendTerminalLine('   - Dr. N.G.P. Institute of Technology | CGPA: 7.5 / 10');
                break;
            case 'contact':
                appendTerminalLine('📧 Email: yaswxnth0912@gmail.com');
                appendTerminalLine('📞 Phone: +91 9384915147');
                appendTerminalLine('🌐 LinkedIn: linkedin.com/in/yaswanth-ss-271593386');
                break;
            case 'resume':
                appendTerminalLine('📄 Downloading Yaswanth S S Resume file...');
                downloadResume();
                break;
            case 'clear':
                terminalBody.innerHTML = '';
                appendTerminalLine('Terminal cleared. Type "help" for options.');
                break;
            case '':
                break;
            default:
                appendTerminalLine(`Command not recognized: '${cmd}'. Type 'help' for commands.`, 'text-dim');
                break;
        }
    }

    function appendTerminalLine(text, customClass = '') {
        const line = document.createElement('div');
        line.className = `terminal-line ${customClass}`;
        line.textContent = text;
        terminalBody.appendChild(line);
    }
}

/* --------------------------------------------------------------------------
   5. Direct Resume File Generation & Instant Download
   -------------------------------------------------------------------------- */
function openResumeModal() {
    const modal = document.getElementById('resume-modal');
    if (modal) modal.classList.add('active');
}

function closeResumeModal() {
    const modal = document.getElementById('resume-modal');
    if (modal) modal.classList.remove('active');
}

function downloadResume() {
    showToast("Downloading Resume file to your device...");

    const resumeHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Yaswanth S S - Resume</title>
<style>
    body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #111827; margin: 0; padding: 40px; background: #f9fafb; line-height: 1.6; }
    .container { max-width: 800px; margin: 0 auto; background: #fff; padding: 40px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
    h1 { margin: 0; color: #064e3b; font-size: 28px; }
    .subtitle { color: #10b981; font-weight: bold; font-size: 16px; margin-bottom: 12px; }
    .contact { font-size: 14px; color: #4b5563; margin-bottom: 20px; border-bottom: 2px solid #10b981; padding-bottom: 15px; }
    h2 { font-size: 16px; color: #0f172a; border-bottom: 1px solid #e5e7eb; padding-bottom: 4px; text-transform: uppercase; margin-top: 25px; }
    p, ul { font-size: 14px; color: #374151; }
    ul { padding-left: 20px; }
    .flex { display: flex; justify-content: space-between; font-weight: bold; }
    .sub { color: #6b7280; font-size: 13px; margin-bottom: 8px; }
</style>
</head>
<body>
<div class="container">
    <h1>YASWANTH S S</h1>
    <div class="subtitle">B.E. COMPUTER SCIENCE AND ENGINEERING</div>
    <div class="contact">
        <strong>Email:</strong> yaswxnth0912@gmail.com | <strong>Phone:</strong> +91 9384915147 | <strong>Location:</strong> Coimbatore, Tamil Nadu, India<br>
        <strong>LinkedIn:</strong> linkedin.com/in/yaswanth-ss-271593386 | <strong>GitHub:</strong> github.com/Yaswanth-1223
    </div>

    <h2>CAREER OBJECTIVE</h2>
    <p>Computer Science and Engineering student with a strong foundation in Java, Python, C, C++, HTML, and SQL. Passionate about developing innovative software solutions and continuously learning new technologies. Collaborative team player eager to contribute technical and problem-solving skills to a dynamic organization.</p>

    <h2>EDUCATION</h2>
    <div class="flex"><span>Bachelor of Engineering in Computer Science and Engineering</span><span>2024 - 2028</span></div>
    <div class="sub">Dr. N.G.P. Institute of Technology, Coimbatore — CGPA: 7.5 / 10</div>

    <div class="flex"><span>Higher Secondary (12th Grade)</span><span>2023 - 2024</span></div>
    <div class="sub">Velalar Vidhyallayaa Senior Secondary School, Erode — Percentage: 71%</div>

    <div class="flex"><span>Secondary School (10th Grade)</span><span>2021 - 2022</span></div>
    <div class="sub">Velalar Vidhyallayaa Senior Secondary School, Erode — Percentage: 65.4%</div>

    <h2>SKILLS</h2>
    <ul>
        <li><strong>Programming Languages:</strong> Java, Python, C, C++</li>
        <li><strong>Web Technologies:</strong> HTML, CSS, JavaScript</li>
        <li><strong>Database:</strong> SQL, DBMS</li>
        <li><strong>Tools:</strong> Git, GitHub, VS Code</li>
        <li><strong>Core CS:</strong> Data Structures, DBMS, Operating Systems</li>
        <li><strong>Soft Skills:</strong> Problem Solving, Teamwork, Communication, Time Management, Quick Learner, Adaptability</li>
    </ul>

    <h2>PROJECTS</h2>
    <p><strong>1. Plant Health Monitoring System:</strong> Developed a system to monitor plant health using sensor-based technology and real-time telemetry.</p>
    <p><strong>2. Virtual Voice Identity Vault:</strong> Developed a secure voice-based identity verification system using audio biometric algorithms.</p>

    <h2>INTERNSHIP</h2>
    <p><strong>Web Development Intern @ NxtLogic Software Solutions</strong><br>
    Developed responsive web applications, gained hands-on experience in frontend engineering and Git version control, and collaborated on UI/UX interfaces.</p>

    <h2>CERTIFICATIONS & ACHIEVEMENTS</h2>
    <ul>
        <li>NPTEL - Internet of Things (Silver + Elite Distinction)</li>
        <li>Specialized Certification in IoT in Edge Computing</li>
        <li>Presented Technical Research Paper at KIT, Coimbatore</li>
        <li>LeetCode Problem Solver</li>
    </ul>

    <h2>LANGUAGES</h2>
    <p>English (Fluent), Tamil (Fluent), Telugu (Fluent)</p>
</div>
</body>
</html>`;

    const blob = new Blob([resumeHTML], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Yaswanth_SS_Resume.html';
    document.body.appendChild(link);
    link.click();
    
    setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, 100);
}

/* --------------------------------------------------------------------------
   6. Interactive Project Demos
   -------------------------------------------------------------------------- */
function openProjectDemo(projectType) {
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('project-modal-title');
    const modalBody = document.getElementById('project-modal-body');

    if (!modal || !modalTitle || !modalBody) return;

    if (projectType === 'plant') {
        modalTitle.textContent = "🌱 Plant Health Monitoring System (Live Simulator)";
        modalBody.innerHTML = `
            <div class="demo-container">
                <p>Adjust environmental sensor controls below to test real-time telemetry alerts:</p>
                <div class="form-group" style="margin-top:1rem;">
                    <label>Soil Moisture Sensor (%): <span id="val-moisture" style="color:var(--primary-light)">65%</span></label>
                    <input type="range" id="input-moisture" min="0" max="100" value="65" oninput="updatePlantDemo()">
                </div>
                <div class="form-group">
                    <label>Ambient Temperature (°C): <span id="val-temp" style="color:var(--accent-cyan)">28°C</span></label>
                    <input type="range" id="input-temp" min="10" max="50" value="28" oninput="updatePlantDemo()">
                </div>
                <div class="form-group">
                    <label>Humidity (%): <span id="val-humidity" style="color:#f59e0b">55%</span></label>
                    <input type="range" id="input-humidity" min="10" max="100" value="55" oninput="updatePlantDemo()">
                </div>
                
                <div id="plant-status-box" style="margin-top:1.5rem; padding:1.2rem; background:rgba(16,185,129,0.15); border:1px solid var(--border-emerald); border-radius:8px;">
                    <h4 style="color:var(--primary-light); margin-bottom:4px;">STATUS: OPTIMAL HEALTH 🟢</h4>
                    <p id="plant-status-text" style="font-size:0.9rem; color:var(--text-muted);">Soil moisture levels are ideal for healthy plant growth and root absorption.</p>
                </div>
            </div>
        `;
    } else if (projectType === 'voice') {
        modalTitle.textContent = "🎙️ Virtual Voice Identity Vault (Biometric Demo)";
        modalBody.innerHTML = `
            <div class="demo-container" style="text-align:center;">
                <p>Click the microphone button to simulate voice print recognition & identity verification:</p>
                
                <div style="margin:2rem 0;">
                    <button id="voice-mic-btn" onclick="simulateVoiceAuth()" class="btn btn-primary btn-lg" style="width:90px; height:90px; border-radius:50%; font-size:2rem;">
                        <i class="fa-solid fa-microphone"></i>
                    </button>
                </div>

                <div id="voice-wave-anim" style="height:40px; display:flex; align-items:center; justify-content:center; gap:6px; margin-bottom:1rem;">
                    <span style="width:4px; height:15px; background:var(--primary); display:inline-block;"></span>
                    <span style="width:4px; height:25px; background:var(--accent-cyan); display:inline-block;"></span>
                    <span style="width:4px; height:35px; background:var(--primary-light); display:inline-block;"></span>
                    <span style="width:4px; height:20px; background:var(--accent-purple); display:inline-block;"></span>
                </div>

                <div id="voice-auth-status" style="padding:1rem; background:rgba(255,255,255,0.05); border-radius:8px; border:1px solid var(--border-glass);">
                    <p style="font-family:var(--font-mono); color:var(--text-muted);">System ready. Press Mic to Speak 'Authorize Yaswanth'</p>
                </div>
            </div>
        `;
    }

    modal.classList.add('active');
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    if (modal) modal.classList.remove('active');
}

function updatePlantDemo() {
    const moisture = document.getElementById('input-moisture').value;
    const temp = document.getElementById('input-temp').value;
    const humidity = document.getElementById('input-humidity').value;

    document.getElementById('val-moisture').textContent = moisture + '%';
    document.getElementById('val-temp').textContent = temp + '°C';
    document.getElementById('val-humidity').textContent = humidity + '%';

    const statusBox = document.getElementById('plant-status-box');
    const statusText = document.getElementById('plant-status-text');

    if (moisture < 30) {
        statusBox.style.background = 'rgba(239, 68, 68, 0.15)';
        statusBox.style.borderColor = 'rgba(239, 68, 68, 0.4)';
        statusBox.querySelector('h4').textContent = 'STATUS: CRITICAL WATER DEFICIT 🔴';
        statusBox.querySelector('h4').style.color = '#ef4444';
        statusText.textContent = 'Soil moisture is dangerously low (<30%). Irrigation system alert triggered!';
    } else if (temp > 40) {
        statusBox.style.background = 'rgba(245, 158, 11, 0.15)';
        statusBox.style.borderColor = 'rgba(245, 158, 11, 0.4)';
        statusBox.querySelector('h4').textContent = 'STATUS: HIGH TEMPERATURE WARNING 🟡';
        statusBox.querySelector('h4').style.color = '#f59e0b';
        statusText.textContent = 'Ambient temperature exceeds 40°C. Cooling fan sequence initiated.';
    } else {
        statusBox.style.background = 'rgba(16, 185, 129, 0.15)';
        statusBox.style.borderColor = 'var(--border-emerald)';
        statusBox.querySelector('h4').textContent = 'STATUS: OPTIMAL HEALTH 🟢';
        statusBox.querySelector('h4').style.color = 'var(--primary-light)';
        statusText.textContent = 'All sensor metrics are within ideal vegetative growth parameters.';
    }
}

function simulateVoiceAuth() {
    const btn = document.getElementById('voice-mic-btn');
    const status = document.getElementById('voice-auth-status');
    if (!btn || !status) return;

    btn.style.background = 'linear-gradient(135deg, #ef4444, #f59e0b)';
    status.innerHTML = `<p style="color:#f59e0b; font-family:var(--font-mono);"><i class="fa-solid fa-spinner fa-spin"></i> Processing Voice Waveform & Frequency Spectrogram...</p>`;

    setTimeout(() => {
        btn.style.background = 'linear-gradient(135deg, var(--primary-dark), var(--primary))';
        status.innerHTML = `
            <h4 style="color:var(--primary-light); font-family:var(--font-mono); margin-bottom:4px;">IDENTITY VERIFIED: YASWANTH S S 🔓</h4>
            <p style="font-size:0.85rem; color:var(--text-muted);">Match Confidence: 99.4% | Vault Unlocked</p>
        `;
        showToast("Voice Biometric Authenticated!");
    }, 1800);
}

/* --------------------------------------------------------------------------
   7. Contact Form Handler & Utility Clipboard
   -------------------------------------------------------------------------- */
function handleFormSubmit(e) {
    showToast("Sending message to yaswxnth0912@gmail.com...");
}

function copyToClipboard(text, message) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(message || "Copied to clipboard!");
    }).catch(err => {
        showToast("Failed to copy text");
    });
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = msg;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}