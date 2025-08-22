// Course Viewer JavaScript - Unified Course Experience

let currentCourse = null;
let currentModule = null;
let currentLesson = 0;
let courseProgress = {};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Get course ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('course');
    
    if (courseId) {
        loadCourse(courseId);
    } else {
        window.location.href = 'index.html';
    }
    
    // Load saved notes
    loadNotes();
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyPress);
});

// Load course data
function loadCourse(courseId) {
    currentCourse = getCourse(courseId);
    const courseContent = getCourseContent(courseId);
    
    if (!currentCourse || !courseContent) {
        alert('Course not found');
        window.location.href = 'index.html';
        return;
    }
    
    // Update course title
    document.getElementById('course-title').textContent = currentCourse.title;
    
    // Load course progress
    loadCourseProgress(courseId);
    
    // Build module sidebar
    buildModuleSidebar(courseContent.modules);
    
    // Load first module or last accessed
    const lastModule = localStorage.getItem(`last_module_${courseId}`) || 1;
    loadModule(parseInt(lastModule));
    
    // Update overall progress
    updateCourseProgress();
}

// Build module sidebar
function buildModuleSidebar(modules) {
    const moduleList = document.getElementById('module-list');
    moduleList.innerHTML = '';
    
    modules.forEach((module, index) => {
        const moduleItem = document.createElement('div');
        moduleItem.className = 'module-item';
        moduleItem.dataset.moduleId = module.id;
        
        const isCompleted = courseProgress[`module_${module.id}`] === 'completed';
        const isInProgress = courseProgress[`module_${module.id}`] === 'in_progress';
        const isLocked = index > 0 && !courseProgress[`module_${modules[index - 1].id}`];
        
        if (isCompleted) moduleItem.classList.add('completed');
        if (isLocked) moduleItem.classList.add('locked');
        
        moduleItem.innerHTML = `
            <div class="module-header">
                <span class="module-number">${module.id}</span>
                <div class="module-status">
                    ${isCompleted ? '<div class="status-icon completed"><i class="fas fa-check"></i></div>' : 
                      isInProgress ? '<div class="status-icon in-progress"><i class="fas fa-circle-notch"></i></div>' :
                      isLocked ? '<div class="status-icon locked"><i class="fas fa-lock"></i></div>' : ''}
                </div>
            </div>
            <div class="module-info">
                <h3>${module.title}</h3>
                <div class="module-meta">
                    <span><i class="fas fa-clock"></i> ${module.duration}</span>
                    <span><i class="fas fa-book"></i> ${module.type}</span>
                </div>
            </div>
        `;
        
        if (!isLocked) {
            moduleItem.addEventListener('click', () => loadModule(module.id));
        }
        
        moduleList.appendChild(moduleItem);
    });
}

// Load module content
function loadModule(moduleId) {
    const courseContent = getCourseContent(currentCourse.id);
    const module = courseContent.modules.find(m => m.id === moduleId);
    
    if (!module) return;
    
    currentModule = module;
    currentLesson = 0;
    
    // Update active state in sidebar
    document.querySelectorAll('.module-item').forEach(item => {
        item.classList.remove('active');
        if (parseInt(item.dataset.moduleId) === moduleId) {
            item.classList.add('active');
        }
    });
    
    // Update module header
    document.getElementById('module-title').textContent = module.title;
    document.getElementById('module-duration').innerHTML = `<i class="fas fa-clock"></i> Duration: ${module.duration}`;
    document.getElementById('module-type').innerHTML = `<i class="fas fa-book"></i> Type: ${module.type}`;
    
    // Save last accessed module
    localStorage.setItem(`last_module_${currentCourse.id}`, moduleId);
    
    // Mark module as in progress only if not already completed
    if (!courseProgress[`module_${moduleId}`]) {
        courseProgress[`module_${moduleId}`] = 'in_progress';
        saveCourseProgress();
    } else if (courseProgress[`module_${moduleId}`] === 'completed') {
        // Module is already completed, ensure UI reflects this
        console.log(`Module ${moduleId} is already completed`);
    }
    
    // Load module content based on type
    console.log(`Loading module ${moduleId}: type=${module.type}, has lessons=${!!module.content.lessons}, lessons count=${module.content.lessons?.length || 0}`);
    if (module.type === 'lessons' && module.content.lessons) {
        loadLesson(0);
    } else if (module.type === 'comprehensive' && module.content.sections) {
        loadSection(0);
    } else {
        loadModuleOverview();
    }
    
    // Force update navigation after module is loaded (in case it's already completed)
    setTimeout(() => {
        const items = module.content.lessons || module.content.sections || [];
        if (items.length > 0) {
            updateNavigation(currentLesson, items.length);
        }
    }, 100);
    
    // Load resources
    loadModuleResources(module);
}

// Load lesson content
function loadLesson(lessonIndex) {
    if (!currentModule || !currentModule.content.lessons) return;
    
    const lessons = currentModule.content.lessons;
    if (lessonIndex < 0 || lessonIndex >= lessons.length) return;
    
    currentLesson = lessonIndex;
    const lesson = lessons[lessonIndex];
    
    // Check if this is the last lesson and if module has a quiz
    const isLastLesson = lessonIndex === lessons.length - 1;
    const moduleQuiz = currentModule.content.quiz;
    
    // Update content
    const contentBody = document.getElementById('content-body');
    contentBody.innerHTML = `
        <div class="lesson-content">
            <h3>${lesson.title}</h3>
            ${lesson.content}
            ${lesson.quiz ? renderQuiz(lesson.quiz) : ''}
            ${isLastLesson && moduleQuiz ? `
                <div class="module-quiz-section" style="margin-top: 3rem; padding-top: 2rem; border-top: 2px solid var(--border);">
                    <h3 style="color: var(--primary); margin-bottom: 1.5rem;">📝 Module ${currentModule.id} Assessment</h3>
                    ${renderQuiz(moduleQuiz)}
                </div>
            ` : ''}
        </div>
    `;
    
    // Scroll to top first
    contentBody.scrollTop = 0;
    
    // Update navigation (after content is loaded so we can check completion status)
    updateNavigation(lessonIndex, lessons.length);
}

// Load section content (for comprehensive courses)
function loadSection(sectionIndex) {
    if (!currentModule || !currentModule.content.sections) return;
    
    const sections = currentModule.content.sections;
    if (sectionIndex < 0 || sectionIndex >= sections.length) return;
    
    currentLesson = sectionIndex;
    const section = sections[sectionIndex];
    
    // Update content
    const contentBody = document.getElementById('content-body');
    contentBody.innerHTML = `
        <div class="section-content">
            <h3>${section.title}</h3>
            ${section.content}
        </div>
    `;
    
    // Scroll to top first
    contentBody.scrollTop = 0;
    
    // Update navigation (after content is loaded so we can check completion status)
    updateNavigation(sectionIndex, sections.length);
}

// Load module overview
function loadModuleOverview() {
    const contentBody = document.getElementById('content-body');
    contentBody.innerHTML = `
        <div class="module-overview">
            <h3>Module Overview</h3>
            <p>${currentModule.content.overview}</p>
            ${currentModule.content.lessons ? `
                <h4>Lessons in this Module</h4>
                <ol>
                    ${currentModule.content.lessons.map(lesson => `
                        <li>${lesson.title}</li>
                    `).join('')}
                </ol>
            ` : ''}
            ${currentModule.content.sections ? `
                <h4>Sections in this Module</h4>
                <ol>
                    ${currentModule.content.sections.map(section => `
                        <li>${section.title}</li>
                    `).join('')}
                </ol>
            ` : ''}
            <div style="margin-top: 2rem;">
                <button class="btn" onclick="startModule()">Start Module</button>
            </div>
        </div>
    `;
    
    // Update navigation for overview - show proper total items
    const totalItems = (currentModule.content.lessons?.length || currentModule.content.sections?.length || 1);
    updateNavigation(-1, totalItems); // -1 to indicate overview state
    
    // Hide navigation buttons for overview 
    document.getElementById('prev-btn').style.display = 'none';
    document.getElementById('next-btn').style.display = 'none';
}

// Start module
function startModule() {
    if (currentModule.content.lessons) {
        loadLesson(0);
    } else if (currentModule.content.sections) {
        loadSection(0);
    }
}

// Navigate content
function navigateContent(direction) {
    const items = currentModule.content.lessons || currentModule.content.sections || [];
    
    if (direction === 'next') {
        if (currentLesson < items.length - 1) {
            if (currentModule.content.lessons) {
                loadLesson(currentLesson + 1);
            } else {
                loadSection(currentLesson + 1);
            }
        } else {
            // Module completed
            completeModule();
        }
    } else if (direction === 'prev') {
        if (currentLesson > 0) {
            if (currentModule.content.lessons) {
                loadLesson(currentLesson - 1);
            } else {
                loadSection(currentLesson - 1);
            }
        }
    }
}

// Update navigation buttons
function updateNavigation(current, total) {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    prevBtn.style.display = 'flex';
    nextBtn.style.display = 'flex';
    
    prevBtn.disabled = current === 0;
    
    // Check if current module is already completed
    const isModuleCompleted = courseProgress[`module_${currentModule.id}`] === 'completed';
    
    if (current === total - 1) {
        // On the last lesson
        if (isModuleCompleted) {
            // Module already completed - show different text
            nextBtn.innerHTML = '<span>Next Module</span><i class="fas fa-arrow-right"></i>';
            nextBtn.classList.add('btn-completed');
            nextBtn.onclick = () => {
                // Go to next module or show completion message
                const courseContent = getCourseContent(currentCourse.id);
                const currentIndex = courseContent.modules.findIndex(m => m.id === currentModule.id);
                if (currentIndex < courseContent.modules.length - 1) {
                    loadModule(courseContent.modules[currentIndex + 1].id);
                } else {
                    // Last module of course - return to course list
                    if (confirm('You have completed all modules! Return to course list?')) {
                        window.location.href = 'index.html#my-courses';
                    }
                }
            };
        } else {
            // Module not completed yet
            nextBtn.innerHTML = '<span>Complete Module</span><i class="fas fa-check"></i>';
            nextBtn.classList.remove('btn-completed');
            nextBtn.onclick = () => navigateContent('next');
        }
    } else {
        nextBtn.innerHTML = '<span>Next</span><i class="fas fa-chevron-right"></i>';
        nextBtn.classList.remove('btn-completed');
        nextBtn.onclick = () => navigateContent('next');
    }
    
    // Update position indicator - ensure we show the correct values
    console.log(`Updating navigation: current=${current}, total=${total}`);
    const progressIndicator = document.querySelector('.progress-indicator');
    
    if (current === -1) {
        // Overview state
        document.getElementById('current-position').textContent = 'Overview';
        document.getElementById('total-items').textContent = total;
        if (progressIndicator) progressIndicator.style.display = 'flex';
    } else if (total === 1) {
        // Hide indicator when there's only 1 lesson/section
        if (progressIndicator) progressIndicator.style.display = 'none';
    } else {
        // Show position when there are multiple lessons/sections
        document.getElementById('current-position').textContent = current + 1;
        document.getElementById('total-items').textContent = total;
        if (progressIndicator) progressIndicator.style.display = 'flex';
    }
}

// Complete module
function completeModule() {
    courseProgress[`module_${currentModule.id}`] = 'completed';
    
    // Calculate the overall course progress percentage
    const courseContent = getCourseContent(currentCourse.id);
    const completedCount = courseContent.modules.filter(m => 
        courseProgress[`module_${m.id}`] === 'completed'
    ).length;
    const totalModules = courseContent.modules.length;
    const progressPercentage = Math.round((completedCount / totalModules) * 100);
    
    // Update the current course object's progress
    currentCourse.progress = progressPercentage;
    
    // Save progress with updated percentage
    saveCourseProgress();
    
    // Update sidebar
    const moduleItem = document.querySelector(`[data-module-id="${currentModule.id}"]`);
    if (moduleItem) {
        moduleItem.classList.add('completed');
        const statusIcon = moduleItem.querySelector('.module-status');
        if (statusIcon) {
            statusIcon.innerHTML = '<div class="status-icon completed"><i class="fas fa-check"></i></div>';
        }
    }
    
    // Update course progress in main courses data
    if (typeof updateModuleCompletion === 'function') {
        updateModuleCompletion(currentCourse.id, currentModule.id, true);
    }
    
    // Update progress bar
    updateCourseProgress();
    
    // Update the navigation buttons immediately to reflect completion
    const items = currentModule.content.lessons || currentModule.content.sections || [];
    updateNavigation(currentLesson, items.length);
    
    // Check if this is the last module and show appropriate message
    const currentIndex = courseContent.modules.findIndex(m => m.id === currentModule.id);
    const isLastModule = currentIndex === courseContent.modules.length - 1;
    const isCourseComplete = progressPercentage === 100;
    
    // Show completion message
    if (isLastModule && isCourseComplete) {
        showCourseCompletionMessage();
    } else {
        showCompletionMessage();
    }
    
    // Load next module if available
    if (!isLastModule) {
        setTimeout(() => {
            loadModule(courseContent.modules[currentIndex + 1].id);
        }, 2000);
    } else {
        // Course is complete - optionally redirect to courses page after delay
        setTimeout(() => {
            if (confirm('Congratulations! You have completed the entire course. Would you like to return to the course catalog?')) {
                window.location.href = 'index.html';
            }
        }, 3000);
    }
}

// Show completion message
function showCompletionMessage() {
    const notification = document.createElement('div');
    notification.className = 'completion-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>Module Completed! Great job!</span>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Show course completion message
function showCourseCompletionMessage() {
    const notification = document.createElement('div');
    notification.className = 'course-completion-message';
    notification.innerHTML = `
        <i class="fas fa-trophy"></i>
        <h2>Course Completed!</h2>
        <p>Congratulations! You've successfully completed<br><strong>${currentCourse.title}</strong></p>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Update course progress
function updateCourseProgress() {
    const courseContent = getCourseContent(currentCourse.id);
    const totalModules = courseContent.modules.length;
    const completedModules = courseContent.modules.filter(m => 
        courseProgress[`module_${m.id}`] === 'completed'
    ).length;
    
    const progress = Math.round((completedModules / totalModules) * 100);
    
    document.getElementById('course-progress-fill').style.width = `${progress}%`;
    document.getElementById('course-progress-text').textContent = `${progress}% Complete`;
}

// Load module resources
function loadModuleResources(module) {
    const resourcesList = document.getElementById('resources-list');
    
    if (module.content.exercises) {
        resourcesList.innerHTML = module.content.exercises.map((exercise, index) => {
            const icon = exercise.type === 'calculator' ? 'fa-calculator' : 
                         exercise.type === 'worksheet' ? 'fa-clipboard-list' : 
                         exercise.type === 'interactive' ? 'fa-laptop-code' : 'fa-tasks';
            
            return `
                <div class="resource-item clickable" onclick="openExercise('${exercise.type}', '${exercise.title}', ${currentModule.id}, ${index})">
                    <div class="resource-icon">
                        <i class="fas ${icon}"></i>
                    </div>
                    <div class="resource-info">
                        <h4>${exercise.title}</h4>
                        <p>${exercise.description}</p>
                    </div>
                    <div class="resource-arrow">
                        <i class="fas fa-chevron-right"></i>
                    </div>
                </div>
            `;
        }).join('');
    } else {
        resourcesList.innerHTML = '<p>No resources available for this module.</p>';
    }
}

// Open exercise based on type
function openExercise(type, title, moduleId, exerciseIndex) {
    let exerciseContent = '';
    
    if (type === 'calculator' && title === 'CPC Calculator') {
        exerciseContent = `
            <div class="exercise-modal">
                <div class="exercise-header">
                    <h2><i class="fas fa-calculator"></i> Advanced CPC Calculator</h2>
                    <button class="close-btn" onclick="closeExercise()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="exercise-body">
                    <p>Calculate your actual CPC based on Google's complete auction system including all thresholds and factors.</p>
                    
                    <div class="calculator-form">
                        <h4>Your Ad Information</h4>
                        <div class="form-group">
                            <label>Your Maximum Bid ($):</label>
                            <input type="number" id="max-bid" placeholder="e.g., 5.00" step="0.01">
                            <small>The maximum you're willing to pay per click</small>
                        </div>
                        
                        <div class="form-group">
                            <label>Your Quality Score (1-10):</label>
                            <input type="number" id="quality-score" placeholder="1-10" min="1" max="10">
                            <small>Your ad's quality score</small>
                        </div>
                        
                        <div class="form-group">
                            <label>Ad Format & Extensions Impact:</label>
                            <select id="format-impact">
                                <option value="1">Standard text ad (1x)</option>
                                <option value="1.2">With sitelinks (1.2x)</option>
                                <option value="1.3">With callouts + sitelinks (1.3x)</option>
                                <option value="1.5">Full extensions package (1.5x)</option>
                            </select>
                            <small>Extensions can boost your Ad Rank</small>
                        </div>
                        
                        <h4>Auction Context</h4>
                        <div class="form-group">
                            <label>Auction Type:</label>
                            <select id="auction-type">
                                <option value="top">Top of page (above organic)</option>
                                <option value="bottom">Bottom of page</option>
                                <option value="absolute-top">Absolute top (position 1)</option>
                            </select>
                            <small>Different positions have different thresholds</small>
                        </div>
                        
                        <div class="form-group">
                            <label>Minimum Threshold for Position ($):</label>
                            <input type="number" id="min-threshold" placeholder="e.g., 0.50" step="0.01">
                            <small>Minimum Ad Rank required for this position</small>
                        </div>
                        
                        <div class="form-group">
                            <label>Competitor Below You - Ad Rank:</label>
                            <input type="number" id="adrank-below" placeholder="e.g., 50" step="0.01">
                            <small>The Ad Rank of the advertiser below you (0 if none)</small>
                        </div>
                        
                        <div class="form-group">
                            <label>Search Query Context:</label>
                            <select id="search-context">
                                <option value="1">Low commercial intent</option>
                                <option value="1.2">Medium commercial intent</option>
                                <option value="1.5">High commercial intent</option>
                                <option value="2">Branded/navigational query</option>
                            </select>
                            <small>Commercial intent affects pricing</small>
                        </div>
                        
                        <button class="btn btn-primary" onclick="calculateAdvancedCPC()">
                            Calculate Actual CPC
                        </button>
                        
                        <div id="cpc-result" class="result-box" style="display: none;">
                            <h3>Your Actual CPC</h3>
                            <div class="result-value">$<span id="calculated-cpc">0.00</span></div>
                            <div class="result-details">
                                <p><strong>Your Ad Rank:</strong> <span id="your-adrank"></span></p>
                                <p><strong>Calculation Method:</strong> <span id="calc-method"></span></p>
                                <p><strong>Key Factor:</strong> <span id="key-factor"></span></p>
                            </div>
                            <p class="result-explanation" id="cpc-explanation"></p>
                            
                            <div class="cpc-breakdown">
                                <h4>CPC Breakdown:</h4>
                                <ul id="breakdown-list"></ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else if (type === 'worksheet' && title === 'Quality Score Audit') {
        exerciseContent = `
            <div class="exercise-modal">
                <div class="exercise-header">
                    <h2><i class="fas fa-clipboard-list"></i> Quality Score Audit Worksheet</h2>
                    <button class="close-btn" onclick="closeExercise()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="exercise-body">
                    <p>Audit your campaigns to identify Quality Score improvement opportunities.</p>
                    
                    <div class="audit-checklist">
                        <h3>Expected CTR Factors</h3>
                        <div class="checklist-item">
                            <input type="checkbox" id="check1">
                            <label for="check1">Ad relevance to keywords</label>
                        </div>
                        <div class="checklist-item">
                            <input type="checkbox" id="check2">
                            <label for="check2">Historical account performance</label>
                        </div>
                        <div class="checklist-item">
                            <input type="checkbox" id="check3">
                            <label for="check3">Ad extensions usage</label>
                        </div>
                        
                        <h3>Landing Page Experience</h3>
                        <div class="checklist-item">
                            <input type="checkbox" id="check4">
                            <label for="check4">Page load speed (< 3 seconds)</label>
                        </div>
                        <div class="checklist-item">
                            <input type="checkbox" id="check5">
                            <label for="check5">Mobile responsiveness</label>
                        </div>
                        <div class="checklist-item">
                            <input type="checkbox" id="check6">
                            <label for="check6">Relevant content to ad copy</label>
                        </div>
                        
                        <h3>Ad Relevance</h3>
                        <div class="checklist-item">
                            <input type="checkbox" id="check7">
                            <label for="check7">Keywords in headlines</label>
                        </div>
                        <div class="checklist-item">
                            <input type="checkbox" id="check8">
                            <label for="check8">Clear value proposition</label>
                        </div>
                        <div class="checklist-item">
                            <input type="checkbox" id="check9">
                            <label for="check9">Strong call-to-action</label>
                        </div>
                        
                        <div class="audit-score">
                            <h3>Your Audit Score: <span id="audit-score">0</span>/9</h3>
                            <div class="score-bar">
                                <div class="score-fill" id="score-fill"></div>
                            </div>
                        </div>
                        
                        <button class="btn btn-primary" onclick="downloadAudit()">
                            <i class="fas fa-download"></i> Download Audit Report
                        </button>
                    </div>
                </div>
            </div>
        `;
    } else {
        exerciseContent = `
            <div class="exercise-modal">
                <div class="exercise-header">
                    <h2><i class="fas fa-tasks"></i> ${title}</h2>
                    <button class="close-btn" onclick="closeExercise()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="exercise-body">
                    <p>This exercise is currently being developed. Check back soon!</p>
                </div>
            </div>
        `;
    }
    
    // Create and show the exercise modal
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'exercise-overlay';
    modalOverlay.innerHTML = exerciseContent;
    document.body.appendChild(modalOverlay);
    
    // Add show class for animation
    setTimeout(() => {
        modalOverlay.classList.add('show');
    }, 10);
    
    // Add event listeners for audit checkboxes if it's the audit worksheet
    if (type === 'worksheet') {
        setTimeout(() => {
            const checkboxes = modalOverlay.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', updateAuditScore);
            });
        }, 100);
    }
}

// Close exercise modal
function closeExercise() {
    const overlay = document.querySelector('.exercise-overlay');
    if (overlay) {
        overlay.classList.remove('show');
        setTimeout(() => {
            overlay.remove();
        }, 300);
    }
}

// Calculate Advanced CPC with all factors
function calculateAdvancedCPC() {
    // Get all input values
    const maxBid = parseFloat(document.getElementById('max-bid').value) || 0;
    const qualityScore = parseFloat(document.getElementById('quality-score').value) || 1;
    const formatImpact = parseFloat(document.getElementById('format-impact').value) || 1;
    const auctionType = document.getElementById('auction-type').value;
    const minThreshold = parseFloat(document.getElementById('min-threshold').value) || 0;
    const adRankBelow = parseFloat(document.getElementById('adrank-below').value) || 0;
    const searchContext = parseFloat(document.getElementById('search-context').value) || 1;
    
    // Validate inputs
    if (maxBid <= 0 || qualityScore < 1 || qualityScore > 10) {
        alert('Please enter valid values for bid and quality score');
        return;
    }
    
    // Calculate your Ad Rank
    const yourAdRank = maxBid * qualityScore * formatImpact;
    
    // Calculate minimum Ad Rank needed for the position
    const minAdRankRequired = minThreshold * qualityScore;
    
    // Determine which calculation to use
    let calculatedCPC = 0;
    let calculationMethod = '';
    let keyFactor = '';
    const breakdown = [];
    
    if (adRankBelow > 0) {
        // There's a competitor below you
        const competitorBasedCPC = (adRankBelow / qualityScore) + 0.01;
        const thresholdBasedCPC = (minAdRankRequired / qualityScore);
        
        // Use the higher of the two
        if (competitorBasedCPC > thresholdBasedCPC) {
            calculatedCPC = competitorBasedCPC;
            calculationMethod = 'Competitor-based pricing';
            keyFactor = 'Ad Rank of competitor below';
            breakdown.push(`Base: (${adRankBelow} / ${qualityScore}) + $0.01 = $${competitorBasedCPC.toFixed(2)}`);
        } else {
            calculatedCPC = thresholdBasedCPC;
            calculationMethod = 'Threshold-based pricing';
            keyFactor = 'Minimum position threshold';
            breakdown.push(`Base: ${minThreshold} (threshold) = $${thresholdBasedCPC.toFixed(2)}`);
        }
    } else {
        // No competitor below - only threshold matters
        calculatedCPC = minThreshold;
        calculationMethod = 'Threshold-only pricing';
        keyFactor = 'Position threshold (no competitors below)';
        breakdown.push(`Base: Minimum threshold = $${minThreshold.toFixed(2)}`);
    }
    
    // Apply search context multiplier
    calculatedCPC *= searchContext;
    if (searchContext > 1) {
        breakdown.push(`Commercial intent multiplier: x${searchContext} = $${calculatedCPC.toFixed(2)}`);
    }
    
    // Apply position premium for absolute top
    if (auctionType === 'absolute-top') {
        calculatedCPC *= 1.2;
        breakdown.push(`Position 1 premium: x1.2 = $${calculatedCPC.toFixed(2)}`);
    }
    
    // CPC cannot exceed max bid
    if (calculatedCPC > maxBid) {
        breakdown.push(`Capped at max bid: $${maxBid.toFixed(2)}`);
        calculatedCPC = maxBid;
        keyFactor += ' (capped by max bid)';
    }
    
    // Update the display
    document.getElementById('calculated-cpc').textContent = calculatedCPC.toFixed(2);
    document.getElementById('your-adrank').textContent = yourAdRank.toFixed(2);
    document.getElementById('calc-method').textContent = calculationMethod;
    document.getElementById('key-factor').textContent = keyFactor;
    
    // Create breakdown list
    const breakdownList = document.getElementById('breakdown-list');
    breakdownList.innerHTML = breakdown.map(item => `<li>${item}</li>`).join('');
    
    // Create explanation
    let explanation = `With a Quality Score of ${qualityScore} and ${formatImpact > 1 ? 'ad extensions' : 'no extensions'}, `;
    explanation += `your Ad Rank is ${yourAdRank.toFixed(2)}. `;
    
    if (yourAdRank < minAdRankRequired) {
        explanation += `Warning: Your Ad Rank (${yourAdRank.toFixed(2)}) is below the minimum required (${minAdRankRequired.toFixed(2)}) for this position. Your ad may not show.`;
    } else {
        explanation += `Your ad qualifies for the ${auctionType.replace('-', ' ')} position. `;
        explanation += `The actual CPC is determined by ${calculationMethod.toLowerCase()}.`;
    }
    
    document.getElementById('cpc-explanation').textContent = explanation;
    document.getElementById('cpc-result').style.display = 'block';
}

// Keep the old simple calculator function for backward compatibility
function calculateCPC() {
    calculateAdvancedCPC();
}

// Update audit score
function updateAuditScore() {
    const checkboxes = document.querySelectorAll('.audit-checklist input[type="checkbox"]');
    const checked = document.querySelectorAll('.audit-checklist input[type="checkbox"]:checked');
    const score = checked.length;
    const percentage = (score / checkboxes.length) * 100;
    
    document.getElementById('audit-score').textContent = score;
    document.getElementById('score-fill').style.width = `${percentage}%`;
    
    // Change color based on score
    const fill = document.getElementById('score-fill');
    if (percentage >= 80) {
        fill.style.background = '#48bb78';
    } else if (percentage >= 60) {
        fill.style.background = '#ed8936';
    } else {
        fill.style.background = '#f56565';
    }
}

// Download audit report
function downloadAudit() {
    const checkboxes = document.querySelectorAll('.audit-checklist input[type="checkbox"]');
    const score = document.querySelectorAll('.audit-checklist input[type="checkbox"]:checked').length;
    
    let report = 'Quality Score Audit Report\n';
    report += '=' .repeat(30) + '\n\n';
    report += `Date: ${new Date().toLocaleDateString()}\n`;
    report += `Course: ${currentCourse.title}\n`;
    report += `Module: ${currentModule.title}\n\n`;
    report += `Audit Score: ${score}/${checkboxes.length}\n\n`;
    
    report += 'Checklist Results:\n';
    report += '-'.repeat(20) + '\n';
    
    checkboxes.forEach(checkbox => {
        const label = checkbox.nextElementSibling.textContent;
        const status = checkbox.checked ? '✓' : '✗';
        report += `${status} ${label}\n`;
    });
    
    report += '\n' + '=' .repeat(30) + '\n';
    report += 'Generated by Google Ads Learning Platform';
    
    // Create download link
    const blob = new Blob([report], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quality-score-audit-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    alert('Audit report downloaded successfully!');
}

// Render quiz
function renderQuiz(quiz) {
    return `
        <div class="quiz-section">
            <h4 style="margin-bottom: 1.5rem;">Test Your Knowledge</h4>
            ${quiz.map((q, index) => `
                <div class="quiz-question" data-quiz-index="${index}">
                    <h5>Question ${index + 1}: ${q.question}</h5>
                    <div class="quiz-options">
                        ${q.options.map((option, optIndex) => `
                            <label>
                                <input type="radio" name="quiz-${index}" value="${optIndex}" 
                                    onchange="selectQuizOption(${index}, ${optIndex}, ${q.correct}, '${q.explanation ? q.explanation.replace(/'/g, "\\'") : ''}')">
                                <span>${option}</span>
                            </label>
                        `).join('')}
                    </div>
                    <div id="quiz-feedback-${index}" class="quiz-feedback" style="display: none; margin-top: 1rem;"></div>
                </div>
            `).join('')}
        </div>
    `;
}

// Handle quiz selection
function selectQuizOption(quizIndex, optionIndex, correctIndex, explanation) {
    const feedbackDiv = document.getElementById(`quiz-feedback-${quizIndex}`);
    
    // Check if correct
    const isCorrect = optionIndex === correctIndex;
    
    // Show feedback
    feedbackDiv.style.display = 'block';
    feedbackDiv.className = `quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    feedbackDiv.innerHTML = `
        <i class="fas fa-${isCorrect ? 'check-circle' : 'times-circle'}"></i>
        <strong>${isCorrect ? 'Correct!' : 'Not quite right.'}</strong>
        ${explanation ? `<p style="margin-top: 0.5rem;">${explanation}</p>` : ''}
    `;
    
    // Update visual feedback on options
    const quizItem = document.querySelector(`[data-quiz-index="${quizIndex}"]`);
    const labels = quizItem.querySelectorAll('label');
    
    // Remove previous visual feedback
    labels.forEach(label => {
        label.style.background = '';
        label.style.borderColor = '';
    });
    
    // Add visual feedback for selected option
    if (isCorrect) {
        labels[optionIndex].style.background = 'rgba(72, 187, 120, 0.1)';
        labels[optionIndex].style.borderColor = 'var(--success)';
    } else {
        labels[optionIndex].style.background = 'rgba(245, 101, 101, 0.1)';
        labels[optionIndex].style.borderColor = 'var(--danger)';
        // Also highlight the correct answer
        labels[correctIndex].style.background = 'rgba(72, 187, 120, 0.1)';
        labels[correctIndex].style.borderColor = 'var(--success)';
    }
}

// Switch panel
function switchPanel(panelName) {
    // Update tab states
    document.querySelectorAll('.panel-tab').forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    
    // Update panel visibility
    document.querySelectorAll('.panel-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(`${panelName}-panel`).classList.add('active');
}

// Save notes
function saveNotes() {
    const notes = document.getElementById('course-notes').value;
    localStorage.setItem(`notes_${currentCourse.id}_${currentModule.id}`, notes);
    alert('Notes saved!');
}

// Load notes
function loadNotes() {
    if (currentCourse && currentModule) {
        const notes = localStorage.getItem(`notes_${currentCourse.id}_${currentModule.id}`) || '';
        document.getElementById('course-notes').value = notes;
    }
}

// Save course progress
function saveCourseProgress() {
    // Calculate the current progress percentage
    const courseContent = getCourseContent(currentCourse.id);
    let progressPercentage = 0;
    
    if (courseContent && courseContent.modules) {
        const completedCount = courseContent.modules.filter(m => 
            courseProgress[`module_${m.id}`] === 'completed'
        ).length;
        const totalModules = courseContent.modules.length;
        progressPercentage = Math.round((completedCount / totalModules) * 100);
    }
    
    // Save using the same key format as main application expects
    localStorage.setItem(`course_progress_${currentCourse.id}`, progressPercentage);
    
    // Also save module completion status in the format main app expects
    const moduleStatus = [];
    if (courseContent && courseContent.modules) {
        courseContent.modules.forEach(module => {
            const isCompleted = courseProgress[`module_${module.id}`] === 'completed';
            moduleStatus.push({ id: module.id, completed: isCompleted });
        });
        localStorage.setItem(`modules_${currentCourse.id}`, JSON.stringify(moduleStatus));
    }
    
    // Keep the viewer's own progress tracking for compatibility
    localStorage.setItem(`progress_${currentCourse.id}`, JSON.stringify(courseProgress));
}

// Load course progress
function loadCourseProgress(courseId) {
    // First try to load from the main app's format
    const mainAppModules = localStorage.getItem(`modules_${courseId}`);
    if (mainAppModules) {
        const moduleStatus = JSON.parse(mainAppModules);
        courseProgress = {};
        moduleStatus.forEach(status => {
            if (status.completed) {
                courseProgress[`module_${status.id}`] = 'completed';
            }
        });
    }
    
    // Also check viewer's own format as fallback
    const saved = localStorage.getItem(`progress_${courseId}`);
    if (saved && Object.keys(courseProgress).length === 0) {
        courseProgress = JSON.parse(saved);
    }
}

// Handle keyboard navigation
function handleKeyPress(e) {
    switch(e.key) {
        case 'ArrowRight':
            navigateContent('next');
            break;
        case 'ArrowLeft':
            navigateContent('prev');
            break;
        case 'Escape':
            if (confirm('Return to course catalog?')) {
                window.location.href = 'index.html';
            }
            break;
        case ' ':
            if (e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'INPUT') {
                e.preventDefault();
                completeModule();
            }
            break;
    }
}

// Add completion notification styles
const style = document.createElement('style');
style.textContent = `
    .completion-notification {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.8);
        background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
        color: white;
        padding: 2rem 3rem;
        border-radius: 16px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        gap: 1rem;
        font-size: 1.2rem;
        font-weight: 600;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 10000;
    }
    
    .completion-notification.show {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
    
    .completion-notification i {
        font-size: 2rem;
    }
    
    .completion-notification.course-complete {
        background: linear-gradient(135deg, #ffd700 0%, #ffb700 100%);
        padding: 3rem;
        min-width: 400px;
    }
    
    .completion-notification.course-complete .completion-content {
        text-align: center;
        width: 100%;
    }
    
    .completion-notification.course-complete i.fa-trophy {
        font-size: 4rem;
        margin-bottom: 1rem;
        display: block;
        animation: bounce 0.5s ease-in-out;
    }
    
    .completion-notification.course-complete h2 {
        font-size: 2rem;
        margin: 0 0 0.5rem 0;
        font-weight: 700;
    }
    
    .completion-notification.course-complete p {
        font-size: 1.1rem;
        margin: 0 0 1.5rem 0;
        opacity: 0.95;
    }
    
    .completion-notification.course-complete .completion-stats {
        display: flex;
        justify-content: center;
        gap: 2rem;
        font-size: 1rem;
        opacity: 0.9;
    }
    
    .completion-notification.course-complete .completion-stats span {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .completion-notification.course-complete .completion-stats i {
        font-size: 1.2rem;
    }
    
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
`;
document.head.appendChild(style);