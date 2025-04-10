document.addEventListener('DOMContentLoaded', function() {
    // Terminal typing effect
    const terminalContent = document.getElementById('typing-terminal');
    
    if (terminalContent) {
        const terminalLines = [
            "> Initializing security scan...",
            "> Checking system vulnerabilities...",
            "> Analyzing security practices...",
            "> Generating recommendations...",
            "> ALERT: Security improvements detected!",
            "> Scroll down to discover top security tips..."
        ];
        
        // Clear initial content
        terminalContent.innerHTML = '';
        
        // Function to simulate typing
        function typeTerminalLine(line, index) {
            let i = 0;
            const terminalLine = document.createElement('div');
            terminalLine.classList.add('terminal-line');
            terminalContent.appendChild(terminalLine);
            
            // Auto-scroll terminal
            terminalContent.scrollTop = terminalContent.scrollHeight;
            
            // Start typing timer
            const typingInterval = setInterval(() => {
                if (i < line.length) {
                    terminalLine.textContent += line.charAt(i);
                    i++;
                    
                    // Auto-scroll as typing
                    terminalContent.scrollTop = terminalContent.scrollHeight;
                } else {
                    clearInterval(typingInterval);
                    
                    // Type next line after a delay
                    if (index < terminalLines.length - 1) {
                        setTimeout(() => {
                            typeTerminalLine(terminalLines[index + 1], index + 1);
                        }, 800);
                    } else {
                        // Add blinking cursor after all lines typed
                        const cursor = document.createElement('span');
                        cursor.classList.add('terminal-cursor');
                        cursor.textContent = '█';
                        terminalLine.appendChild(cursor);
                        
                        // Start command input prompt after all lines
                        setTimeout(() => {
                            const promptLine = document.createElement('div');
                            promptLine.classList.add('terminal-line');
                            promptLine.classList.add('terminal-prompt');
                            promptLine.textContent = "> Command: _";
                            
                            terminalContent.appendChild(promptLine);
                            terminalContent.scrollTop = terminalContent.scrollHeight;
                            
                            // Simulate typing "help" command
                            setTimeout(() => {
                                simulateHelpCommand(promptLine);
                            }, 2000);
                        }, 1500);
                    }
                }
            }, 50 + Math.random() * 30); // Random typing speed variation
        }
        
        // Simulate user typing "help" command
        function simulateHelpCommand(promptLine) {
            const helpText = "help";
            let index = 0;
            
            const helpInterval = setInterval(() => {
                if (index < helpText.length) {
                    // Remove cursor
                    promptLine.textContent = "> Command: " + helpText.substring(0, index + 1);
                    index++;
                } else {
                    clearInterval(helpInterval);
                    
                    // Execute "help" command after brief delay
                    setTimeout(() => {
                        // Add response to help command
                        const helpResponse = document.createElement('div');
                        helpResponse.classList.add('terminal-line');
                        helpResponse.innerHTML = "Available commands: <br>" +
                                                "- scan : Run security scan<br>" +
                                                "- tips : Show security tips<br>" +
                                                "- learn : Access learning resources<br>" +
                                                "- protect : Activate protection";
                        
                        terminalContent.appendChild(helpResponse);
                        
                        // Add new command prompt
                        const newPrompt = document.createElement('div');
                        newPrompt.classList.add('terminal-line');
                        newPrompt.classList.add('terminal-prompt');
                        newPrompt.textContent = "> Command: _";
                        
                        terminalContent.appendChild(newPrompt);
                        terminalContent.scrollTop = terminalContent.scrollHeight;
                        
                        // Simulate typing "protect" command
                        setTimeout(() => {
                            simulateProtectCommand(newPrompt);
                        }, 2500);
                    }, 500);
                }
            }, 200);
        }
        
        // Simulate user typing "protect" command
        function simulateProtectCommand(promptLine) {
            const protectText = "protect";
            let index = 0;
            
            const protectInterval = setInterval(() => {
                if (index < protectText.length) {
                    promptLine.textContent = "> Command: " + protectText.substring(0, index + 1);
                    index++;
                } else {
                    clearInterval(protectInterval);
                    
                    // Execute "protect" command
                    setTimeout(() => {
                        // Add response to protect command
                        const protectResponse = document.createElement('div');
                        protectResponse.classList.add('terminal-line');
                        protectResponse.textContent = "> Activating security protocols...";
                        
                        terminalContent.appendChild(protectResponse);
                        terminalContent.scrollTop = terminalContent.scrollHeight;
                        
                        // Add loading animation
                        setTimeout(() => {
                            showProtectionActivated();
                        }, 1500);
                    }, 500);
                }
            }, 200);
        }
        
        // Display protection activated message
        function showProtectionActivated() {
            const loadingLine = document.createElement('div');
            loadingLine.classList.add('terminal-line');
            loadingLine.innerHTML = "[====================] 100% Complete";
            
            terminalContent.appendChild(loadingLine);
            
            setTimeout(() => {
                const activatedLine = document.createElement('div');
                activatedLine.classList.add('terminal-line');
                activatedLine.classList.add('success-text');
                activatedLine.textContent = "> PROTECTION ACTIVATED. You're ready to learn about digital security.";
                
                terminalContent.appendChild(activatedLine);
                terminalContent.scrollTop = terminalContent.scrollHeight;
                
                // Trigger scroll to tips section after activation
                setTimeout(() => {
                    const tipsSection = document.getElementById('tips');
                    if (tipsSection) {
                        tipsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 2000);
            }, 800);
        }
        
        // Start the typing animation with a delay
        setTimeout(() => {
            typeTerminalLine(terminalLines[0], 0);
        }, 1000);
    }
}); 