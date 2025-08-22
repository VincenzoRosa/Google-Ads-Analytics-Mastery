// Current active course
let currentCourse = null;

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load saved progress from localStorage
    if (typeof loadSavedProgress === 'function') {
        loadSavedProgress();
    }
    
    // Initialize course catalog
    initializeCatalog();
    
    // Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).classList.add('active');
            
            // Update view based on section
            if (targetId === 'catalog') {
                // Clear all course containers to show summary stats view
                const coursesGrid = document.getElementById('courses-grid');
                const enrolledCourses = document.getElementById('enrolled-courses');
                if (coursesGrid) coursesGrid.innerHTML = '';
                if (enrolledCourses) enrolledCourses.innerHTML = '';
            } else if (targetId === 'my-courses') {
                displayEnrolledCourses();
            } else if (targetId === 'dashboard') {
                updateDashboard();
            }
        });
    });

    // Module card interactions
    const moduleCards = document.querySelectorAll('.module-card');
    moduleCards.forEach(card => {
        card.addEventListener('click', function() {
            const moduleId = this.getAttribute('data-module');
            if (this.classList.contains('active') || this.classList.contains('completed')) {
                openModule(moduleId, currentCourse);
            }
        });
    });

    // Initialize progress on page load
    updateProgress();
    
    // Initialize course filters
    initializeCourseFilters();
    
    // Initialize dashboard
    updateDashboard();
});

// Initialize course catalog
function initializeCatalog() {
    updatePlatformStats();
    // Don't automatically display courses - keep summary stats view
    initializeCourseFilters();
}

// Update platform statistics
function updatePlatformStats() {
    if (typeof getCourseStats === 'function') {
        const stats = getCourseStats();
        
        const totalCoursesEl = document.getElementById('total-courses');
        const enrolledCoursesEl = document.getElementById('enrolled-courses-count');
        const completedCoursesEl = document.getElementById('completed-courses');
        const totalHoursEl = document.getElementById('total-hours');
        
        if (totalCoursesEl) totalCoursesEl.textContent = stats.totalCourses;
        if (enrolledCoursesEl) enrolledCoursesEl.textContent = stats.enrolledCourses;
        if (completedCoursesEl) completedCoursesEl.textContent = stats.completedCourses;
        if (totalHoursEl) totalHoursEl.textContent = stats.totalHours + '+';
    }
}

// Initialize course filter buttons
function initializeCourseFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Display filtered courses
            const filter = this.getAttribute('data-filter');
            displayCourses(filter);
        });
    });
}

// Display courses based on filter
function displayCourses(filter) {
    const coursesGrid = document.getElementById('courses-grid');
    if (!coursesGrid || typeof getAllCourses !== 'function') return;
    
    let coursesToDisplay = [];
    
    switch(filter) {
        case 'enrolled':
            coursesToDisplay = getEnrolledCourses();
            break;
        case 'available':
            coursesToDisplay = getAvailableCourses();
            break;
        case 'coming-soon':
            coursesToDisplay = getComingSoonCourses();
            break;
        default: // 'all'
            coursesToDisplay = getAllCourses();
    }
    
    // Clear grid
    coursesGrid.innerHTML = '';
    
    // Display courses
    coursesToDisplay.forEach(course => {
        const courseCard = createCourseCard(course);
        coursesGrid.appendChild(courseCard);
    });
    
    // Show message if no courses
    if (coursesToDisplay.length === 0) {
        coursesGrid.innerHTML = `
            <div class="no-courses-message">
                <i class="fas fa-inbox"></i>
                <p>No courses found in this category</p>
            </div>
        `;
    }
}

// Create course card element
function createCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'course-card';
    if (course.enrolled) card.classList.add('enrolled');
    if (course.comingSoon) card.classList.add('coming-soon');
    
    const progressRing = course.enrolled ? `
        <div class="course-progress-ring">
            <svg width="60" height="60">
                <circle cx="30" cy="30" r="25" stroke="#e0e0e0" stroke-width="5" fill="none"/>
                <circle cx="30" cy="30" r="25" stroke="${course.color}" stroke-width="5" fill="none"
                        stroke-dasharray="${157 * course.progress / 100} 157"
                        transform="rotate(-90 30 30)"/>
            </svg>
            <span class="progress-text">${course.progress}%</span>
        </div>
    ` : '';
    
    const actionButton = course.comingSoon ? 
        `<button class="btn btn-disabled" disabled>Coming Soon</button>` :
        course.enrolled ? 
        `<button class="btn btn-primary" onclick="openCourse('${course.id}')">Continue Learning</button>` :
        `<button class="btn btn-outline" onclick="enrollCourse('${course.id}')">Enroll Now</button>`;
    
    card.innerHTML = `
        <div class="course-header" style="background: linear-gradient(135deg, ${course.color}22 0%, ${course.color}11 100%);">
            <i class="${course.icon}" style="color: ${course.color}; font-size: 2rem;"></i>
            ${progressRing}
        </div>
        <div class="course-body">
            <h3>${course.title}</h3>
            <p class="course-subtitle">${course.subtitle}</p>
            <p class="course-description">${course.description}</p>
            <div class="course-meta">
                <span><i class="fas fa-clock"></i> ${course.duration}</span>
                <span><i class="fas fa-signal"></i> ${course.difficulty}</span>
            </div>
            ${course.modules ? `
                <div class="course-modules-count">
                    <i class="fas fa-book-open"></i> ${course.modules.length} Modules
                </div>
            ` : ''}
            <div class="course-tags">
                ${course.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
        <div class="course-footer">
            ${actionButton}
        </div>
    `;
    
    return card;
}

// Display enrolled courses in My Courses section
function displayEnrolledCourses() {
    const container = document.getElementById('enrolled-courses');
    if (!container || typeof getEnrolledCourses !== 'function') return;
    
    const enrolledCourses = getEnrolledCourses();
    
    container.innerHTML = '';
    
    if (enrolledCourses.length === 0) {
        container.innerHTML = `
            <div class="no-courses-message">
                <i class="fas fa-graduation-cap"></i>
                <h3>No Enrolled Courses Yet</h3>
                <p>Start your learning journey by enrolling in a course from the catalog</p>
                <button class="btn btn-primary" onclick="showCatalog()">Browse Courses</button>
            </div>
        `;
        return;
    }
    
    enrolledCourses.forEach(course => {
        const courseProgress = createEnrolledCourseCard(course);
        container.appendChild(courseProgress);
    });
}

// Create enrolled course card with detailed progress
function createEnrolledCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'enrolled-course-card';
    
    const completedModules = course.modules ? course.modules.filter(m => m.completed).length : 0;
    const totalModules = course.modules ? course.modules.length : 0;
    
    card.innerHTML = `
        <div class="enrolled-course-header">
            <div class="course-info">
                <i class="${course.icon}" style="color: ${course.color}; font-size: 2rem;"></i>
                <div>
                    <h3>${course.title}</h3>
                    <p>${course.subtitle}</p>
                </div>
            </div>
            <div class="course-overall-progress">
                <div class="progress-circle-large">
                    <svg width="100" height="100">
                        <circle cx="50" cy="50" r="42" stroke="#e0e0e0" stroke-width="6" fill="none"/>
                        <circle cx="50" cy="50" r="42" stroke="${course.color}" stroke-width="6" fill="none"
                                stroke-dasharray="${264 * course.progress / 100} 264"
                                transform="rotate(-90 50 50)"/>
                    </svg>
                    <div class="progress-info">
                        <span class="progress-percent">${course.progress}%</span>
                        <span class="progress-label">Complete</span>
                    </div>
                </div>
            </div>
        </div>
        ${course.modules ? `
            <div class="enrolled-course-modules">
                <h4>Module Progress (${completedModules}/${totalModules} completed)</h4>
                <div class="modules-progress-list">
                    ${course.modules.map(module => `
                        <div class="module-progress-item ${module.completed ? 'completed' : ''}">
                            <i class="fas ${module.completed ? 'fa-check-circle' : 'fa-circle'}"></i>
                            <span>${module.title}</span>
                            <span class="module-duration">${module.duration}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : ''}
        <div class="enrolled-course-actions">
            <button class="btn btn-primary" onclick="openCourse('${course.id}')">
                <i class="fas fa-play"></i> Continue Learning
            </button>
            ${course.modules ? `
                <button class="btn btn-outline" onclick="viewCourseDetails('${course.id}')">
                    <i class="fas fa-info-circle"></i> View Details
                </button>
            ` : ''}
        </div>
    `;
    
    return card;
}

// Open a specific course
function openCourse(courseId) {
    const course = getCourse(courseId);
    if (!course) return;
    
    // All courses now use the unified viewer
    window.location.href = `course-viewer.html?course=${courseId}`;
}

// Update module cards for a specific course
function updateModuleCards(course) {
    const moduleCards = document.querySelectorAll('.module-card');
    
    course.modules.forEach((module, index) => {
        if (moduleCards[index]) {
            const card = moduleCards[index];
            card.querySelector('h3').textContent = `Module ${module.id}: ${module.title}`;
            card.querySelector('p').textContent = module.description;
            
            // Update completion status
            if (module.completed) {
                card.classList.add('completed');
                card.classList.remove('locked');
            }
            
            // Update PDF download link
            const downloadBtn = card.querySelector('.btn-outline');
            if (downloadBtn && module.pdfFile) {
                downloadBtn.setAttribute('href', module.pdfFile);
            }
        }
    });
}

// Enroll in a course
function enrollCourse(courseId) {
    if (typeof enrollInCourse === 'function') {
        enrollInCourse(courseId);
        
        // Update UI
        updatePlatformStats();
        displayCourses('all');
        
        // Show success message
        showNotification(`Successfully enrolled in course!`, 'success');
        
        // Open the course
        openCourse(courseId);
    }
}

// Show catalog
function showCatalog() {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    
    const catalogLink = document.querySelector('a[href="#catalog"]');
    const catalogSection = document.getElementById('catalog');
    
    if (catalogLink) catalogLink.classList.add('active');
    if (catalogSection) catalogSection.classList.add('active');
    
    // Clear all course containers to show summary stats view
    const coursesGrid = document.getElementById('courses-grid');
    const enrolledCourses = document.getElementById('enrolled-courses');
    if (coursesGrid) coursesGrid.innerHTML = '';
    if (enrolledCourses) enrolledCourses.innerHTML = '';
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Update dashboard with dynamic content
function updateDashboard() {
    updateDashboardStats();
    displayCurrentCourses();
    displayRecentActivity();
}

// Update dashboard statistics
function updateDashboardStats() {
    const statsContainer = document.getElementById('dashboard-stats');
    if (!statsContainer) return;
    
    const enrolledCourses = getEnrolledCourses();
    const totalModules = enrolledCourses.reduce((sum, course) => sum + (course.modules ? course.modules.length : 0), 0);
    const completedModules = enrolledCourses.reduce((sum, course) => {
        return sum + (course.modules ? course.modules.filter(m => m.completed).length : 0);
    }, 0);
    const completedCourses = enrolledCourses.filter(c => c.progress === 100).length;
    const averageProgress = enrolledCourses.length > 0 ? 
        Math.round(enrolledCourses.reduce((sum, c) => sum + c.progress, 0) / enrolledCourses.length) : 0;
    
    statsContainer.innerHTML = `
        <div class="stat-card">
            <div class="stat-icon">
                <i class="fas fa-book-open"></i>
            </div>
            <div class="stat-content">
                <h3>${enrolledCourses.length}</h3>
                <p>Enrolled Courses</p>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon">
                <i class="fas fa-graduation-cap"></i>
            </div>
            <div class="stat-content">
                <h3>${completedModules}</h3>
                <p>Modules Completed</p>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon">
                <i class="fas fa-chart-line"></i>
            </div>
            <div class="stat-content">
                <h3>${averageProgress}%</h3>
                <p>Average Progress</p>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon">
                <i class="fas fa-trophy"></i>
            </div>
            <div class="stat-content">
                <h3>${completedCourses}</h3>
                <p>Completed Courses</p>
            </div>
        </div>
    `;
}

// Display current courses on dashboard
function displayCurrentCourses() {
    const container = document.getElementById('current-courses');
    if (!container) return;
    
    const enrolledCourses = getEnrolledCourses();
    
    if (enrolledCourses.length === 0) {
        container.innerHTML = `
            <div class="no-courses-message">
                <p>No enrolled courses yet. <a href="#catalog" onclick="showCatalog()">Browse courses</a> to get started!</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = enrolledCourses.slice(0, 3).map(course => {
        const nextModule = course.modules ? course.modules.find(m => !m.completed) : null;
        const progressWidth = course.progress || 0;
        
        return `
            <div class="current-course-card">
                <div class="course-progress-header">
                    <div class="course-basic-info">
                        <i class="${course.icon}" style="color: ${course.color};"></i>
                        <div>
                            <h3>${course.title}</h3>
                            <p>Progress: ${progressWidth}%</p>
                        </div>
                    </div>
                    <div class="course-progress-ring">
                        <svg width="50" height="50">
                            <circle cx="25" cy="25" r="20" stroke="#e0e0e0" stroke-width="4" fill="none"/>
                            <circle cx="25" cy="25" r="20" stroke="${course.color}" stroke-width="4" fill="none"
                                    stroke-dasharray="${126 * progressWidth / 100} 126"
                                    transform="rotate(-90 25 25)"/>
                        </svg>
                        <span class="progress-text">${progressWidth}%</span>
                    </div>
                </div>
                <div class="next-module">
                    ${nextModule ? 
                        `<p><strong>Next:</strong> ${nextModule.title}</p>` : 
                        `<p><strong>Status:</strong> Course completed! 🎉</p>`
                    }
                </div>
                <div class="course-actions">
                    <button class="btn btn-sm" onclick="openCourse('${course.id}')">
                        ${nextModule ? 'Continue Learning' : 'Review Course'}
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Display recent activity
function displayRecentActivity() {
    const container = document.getElementById('recent-activity');
    if (!container) return;
    
    // Generate some mock recent activity based on enrolled courses
    const enrolledCourses = getEnrolledCourses();
    const activities = [];
    
    enrolledCourses.forEach(course => {
        if (course.modules) {
            const completedModules = course.modules.filter(m => m.completed);
            const inProgressModule = course.modules.find(m => !m.completed);
            
            // Add completed modules to activity
            completedModules.slice(-2).forEach((module, index) => {
                activities.push({
                    type: 'completed',
                    title: `${course.title}: ${module.title}`,
                    description: 'Module completed',
                    time: `${(index + 1) * 15} minutes ago`,
                    icon: 'fa-check',
                    color: '#4caf50'
                });
            });
            
            // Add in-progress module
            if (inProgressModule && course.progress > 0) {
                activities.push({
                    type: 'in-progress',
                    title: `${course.title}: ${inProgressModule.title}`,
                    description: 'Currently in progress',
                    time: '2 minutes ago',
                    icon: 'fa-play',
                    color: '#ff9800'
                });
            }
        }
    });
    
    // Sort by most recent and limit to 4
    const recentActivities = activities.slice(0, 4);
    
    if (recentActivities.length === 0) {
        container.innerHTML = `
            <div class="no-activity">
                <p>No recent activity. Start a course to see your progress here!</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = recentActivities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon ${activity.type}" style="background: ${activity.color};">
                <i class="fas ${activity.icon}"></i>
            </div>
            <div class="activity-content">
                <h4>${activity.title}</h4>
                <p>${activity.description}</p>
                <span class="activity-time">${activity.time}</span>
            </div>
        </div>
    `).join('');
}










// Module functionality
function openModule(moduleId) {
    // Check if module is already completed
    const moduleCard = document.querySelector(`[data-module="${moduleId}"]`);
    const isCompleted = moduleCard && moduleCard.classList.contains('completed');
    
    // Create modal for module content
    const modal = document.createElement('div');
    modal.className = 'module-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Module ${moduleId}: ${getModuleTitle(moduleId)}</h2>
                <button class="modal-close" onclick="closeModule()">&times;</button>
            </div>
            <div class="modal-body">
                ${getModuleContent(moduleId)}
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeModule()">Close</button>
                ${isCompleted ? 
                    `<button class="btn btn-warning" onclick="incompleteModule(${moduleId})">Mark Incomplete</button>` :
                    `<button class="btn btn-primary" onclick="completeModule(${moduleId})">Mark Complete</button>`
                }
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Initialize quizzes after modal is added
    setTimeout(() => {
        initializeQuizzes();
    }, 100);
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .module-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-content {
            background: white;
            border-radius: 16px;
            max-width: 1000px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        
        .modal-header {
            padding: 2rem 2rem 1rem;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .modal-header h2 {
            margin: 0;
            color: #333;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #666;
            padding: 0;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.3s ease;
        }
        
        .modal-close:hover {
            background: rgba(0, 0, 0, 0.1);
        }
        
        .modal-body {
            padding: 2rem;
        }
        
        .modal-footer {
            padding: 1rem 2rem 2rem;
            border-top: 1px solid #eee;
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
        }
    `;
    
    document.head.appendChild(style);
}

function closeModule() {
    const modal = document.querySelector('.module-modal');
    if (modal) {
        modal.remove();
    }
}

function getModuleTitle(moduleId) {
    const titles = {
        1: 'KPI Foundation & Analysis Framework',
        2: 'Advanced Performance Diagnostics',
        3: 'Competitive Intelligence & Benchmarking',
        4: 'Advanced Reporting & Visualization',
        5: 'Advanced Optimization Strategies'
    };
    return titles[moduleId] || 'Module Content';
}

function getModuleContent(moduleId) {
    const content = {
        1: `
            <div class="module-content">
                <div class="module-intro">
                    <h2>Module 1: KPI Foundation & Analysis Framework</h2>
                    <p class="module-description">Master the metrics that matter and build your analytical mindset. Learn the three-tier KPI hierarchy, attribution models, and practical analysis techniques.</p>
                    <div class="module-meta">
                        <span><i class="fas fa-clock"></i> Duration: 5 Days (Week 1)</span>
                        <span><i class="fas fa-book"></i> 30 minutes daily</span>
                        <span><i class="fas fa-certificate"></i> Professional Certification</span>
                    </div>
                </div>

                <div class="day-section">
                    <h3><i class="fas fa-calendar-day"></i> Day 1: The KPI Hierarchy</h3>
                    <div class="lesson-content">
                        <h4>Learning Objectives</h4>
                        <ul>
                            <li>Understand the three-tier KPI pyramid</li>
                            <li>Identify primary vs. secondary KPIs</li>
                            <li>Learn the cascade effect of KPI improvements</li>
                        </ul>

                        <h4>The Three-Tier KPI Pyramid</h4>
                        
                        <div class="kpi-pyramid">
                            <div class="pyramid-tier tier-1">
                                <h5>🏔️ Tier 1: Business Impact KPIs (The Peak)</h5>
                                <p>These directly measure business success:</p>
                                <div class="kpi-grid">
                                    <div class="kpi-item">
                                        <strong>ROAS (Return on Ad Spend)</strong>
                                        <p>Revenue ÷ Ad Spend</p>
                                    </div>
                                    <div class="kpi-item">
                                        <strong>CPA (Cost Per Acquisition)</strong>
                                        <p>Ad Spend ÷ Conversions</p>
                                    </div>
                                    <div class="kpi-item">
                                        <strong>Revenue</strong>
                                        <p>Total income from campaigns</p>
                                    </div>
                                    <div class="kpi-item">
                                        <strong>Profit Margin</strong>
                                        <p>(Revenue - Total Costs) ÷ Revenue</p>
                                    </div>
                                </div>
                            </div>

                            <div class="pyramid-tier tier-2">
                                <h5>🏔️ Tier 2: Performance Driver KPIs (The Middle)</h5>
                                <p>These influence Tier 1 metrics:</p>
                                <div class="kpi-grid">
                                    <div class="kpi-item">
                                        <strong>Conversion Rate (CVR)</strong>
                                        <p>Conversions ÷ Clicks × 100</p>
                                    </div>
                                    <div class="kpi-item">
                                        <strong>Average Order Value (AOV)</strong>
                                        <p>Revenue ÷ Number of Orders</p>
                                    </div>
                                    <div class="kpi-item">
                                        <strong>Cost Per Click (CPC)</strong>
                                        <p>Ad Spend ÷ Clicks</p>
                                    </div>
                                    <div class="kpi-item">
                                        <strong>Conversion Value</strong>
                                        <p>Average value of each conversion</p>
                                    </div>
                                </div>
                            </div>

                            <div class="pyramid-tier tier-3">
                                <h5>🏔️ Tier 3: Engagement Signal KPIs (The Foundation)</h5>
                                <p>These affect overall performance:</p>
                                <div class="kpi-grid">
                                    <div class="kpi-item">
                                        <strong>Click-Through Rate (CTR)</strong>
                                        <p>Clicks ÷ Impressions × 100</p>
                                    </div>
                                    <div class="kpi-item">
                                        <strong>Impression Share</strong>
                                        <p>Impressions ÷ Total Available Impressions</p>
                                    </div>
                                    <div class="kpi-item">
                                        <strong>Quality Score</strong>
                                        <p>Google's 1-10 rating of ad relevance</p>
                                    </div>
                                    <div class="kpi-item">
                                        <strong>Ad Position</strong>
                                        <p>Average position in search results</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h4>The Chain Reaction Effect</h4>
                        <div class="chain-reaction">
                            <div class="reaction-flow">
                                <span>Higher CTR</span>
                                <i class="fas fa-arrow-right"></i>
                                <span>Higher Quality Score</span>
                                <i class="fas fa-arrow-right"></i>
                                <span>Lower CPC</span>
                                <i class="fas fa-arrow-right"></i>
                                <span>Lower CPA</span>
                                <i class="fas fa-arrow-right"></i>
                                <span>Higher ROAS</span>
                            </div>
                        </div>

                        <h4>Real-World Example: E-commerce Fitness Equipment</h4>
                        <div class="case-study">
                            <div class="performance-comparison">
                                <div class="performance-state">
                                    <h5>Initial State</h5>
                                    <ul>
                                        <li>CTR: 2.1%</li>
                                        <li>Quality Score: 6</li>
                                        <li>CPC: $2.40</li>
                                        <li>CPA: $45</li>
                                        <li>ROAS: 3.2:1</li>
                                    </ul>
                                </div>
                                <div class="performance-state">
                                    <h5>After Optimization</h5>
                                    <ul>
                                        <li>CTR: 3.4% (+62%)</li>
                                        <li>Quality Score: 8 (+33%)</li>
                                        <li>CPC: $1.85 (-23%)</li>
                                        <li>CPA: $34 (-24%)</li>
                                        <li>ROAS: 4.1:1 (+28%)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <h4>KPI Priority by Campaign Type</h4>
                        <div class="campaign-priority-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Campaign Type</th>
                                        <th>Primary KPIs</th>
                                        <th>Secondary KPIs</th>
                                        <th>Monitor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Lead Generation</td>
                                        <td>CPA, Conversion Volume</td>
                                        <td>CTR, Quality Score</td>
                                        <td>ROAS (if tracking lead value)</td>
                                    </tr>
                                    <tr>
                                        <td>E-commerce</td>
                                        <td>ROAS, Revenue</td>
                                        <td>AOV, Conversion Rate</td>
                                        <td>Impression Share</td>
                                    </tr>
                                    <tr>
                                        <td>Brand Awareness</td>
                                        <td>Impression Share, Reach</td>
                                        <td>CTR, Engagement Rate</td>
                                        <td>View-through conversions</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="day-exercise">
                            <h4>Day 1 Exercise</h4>
                            <div class="exercise-scenario">
                                <h5>Scenario: Online course platform Search campaign</h5>
                                <p><strong>Current Performance:</strong></p>
                                <ul>
                                    <li>Impressions: 50,000/month</li>
                                    <li>Clicks: 1,500</li>
                                    <li>CPC: $3.50</li>
                                    <li>Conversions: 75</li>
                                    <li>Conversion Value: $150/course</li>
                                    <li>Ad Spend: $5,250</li>
                                </ul>
                                
                                <div class="exercise-tasks">
                                    <h5>Tasks:</h5>
                                    <ol>
                                        <li>Calculate CTR, CVR, CPA, and ROAS</li>
                                        <li>Identify the weakest KPI against benchmarks (CTR: 3.5%, CVR: 5-7%, ROAS: 3:1)</li>
                                        <li>Project new ROAS if CTR improves to 4% (assume 15% CPC reduction)</li>
                                    </ol>
                                </div>

                                <div class="exercise-solutions">
                                    <h5>Solutions:</h5>
                                    <ul>
                                        <li>CTR: 3%, CVR: 5%, CPA: $70, ROAS: 2.14:1</li>
                                        <li>Weakest: ROAS (2.14:1 vs 3:1 benchmark)</li>
                                        <li>Projected: 2.52:1 ROAS with improved CTR</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="day-section">
                    <h3><i class="fas fa-calendar-day"></i> Day 2: KPI Relationships & Calculations</h3>
                    <div class="lesson-content">
                        <h4>Learning Objectives</h4>
                        <ul>
                            <li>Master advanced KPI calculations</li>
                            <li>Understand interdependencies between metrics</li>
                            <li>Build formulas for composite KPIs</li>
                        </ul>

                        <h4>Core KPI Formulas</h4>
                        
                        <div class="formula-section">
                            <h5>Revenue-Based KPIs</h5>
                            <div class="formula-grid">
                                <div class="formula-item">
                                    <code>ROAS = Total Conversion Value ÷ Ad Spend</code>
                                </div>
                                <div class="formula-item">
                                    <code>Target ROAS = Target CPA × Conversion Rate</code>
                                </div>
                                <div class="formula-item">
                                    <code>Break-even ROAS = 1 ÷ Profit Margin</code>
                                </div>
                            </div>
                        </div>

                        <div class="formula-section">
                            <h5>Cost-Based KPIs</h5>
                            <div class="formula-grid">
                                <div class="formula-item">
                                    <code>CPA = Ad Spend ÷ Conversions</code>
                                </div>
                                <div class="formula-item">
                                    <code>Target CPA = Average Order Value × Profit Margin</code>
                                </div>
                                <div class="formula-item">
                                    <code>Effective CPA = (Ad Spend + Operational Costs) ÷ Conversions</code>
                                </div>
                            </div>
                        </div>

                        <div class="formula-section">
                            <h5>Performance KPIs</h5>
                            <div class="formula-grid">
                                <div class="formula-item">
                                    <code>Conversion Rate = (Conversions ÷ Clicks) × 100</code>
                                </div>
                                <div class="formula-item">
                                    <code>Click-Through Rate = (Clicks ÷ Impressions) × 100</code>
                                </div>
                                <div class="formula-item">
                                    <code>Cost Per Click = Ad Spend ÷ Clicks</code>
                                </div>
                            </div>
                        </div>

                        <h4>Advanced Composite KPIs</h4>
                        
                        <div class="composite-kpis">
                            <div class="composite-kpi">
                                <h5>1. Value Per Click (VPC)</h5>
                                <code>VPC = (Conversion Value ÷ Clicks)</code>
                                <p>Measures average value generated per click</p>
                            </div>
                            <div class="composite-kpi">
                                <h5>2. Revenue Per Thousand Impressions (RPM)</h5>
                                <code>RPM = (Revenue ÷ Impressions) × 1000</code>
                                <p>Useful for display and video campaigns</p>
                            </div>
                            <div class="composite-kpi">
                                <h5>3. Assisted Conversion Value</h5>
                                <code>ACV = Total Conversion Value - Last-Click Conversion Value</code>
                                <p>Shows value of assists in the conversion path</p>
                            </div>
                        </div>

                        <h4>KPI Correlation Matrix</h4>
                        <div class="correlation-matrix">
                            <table>
                                <thead>
                                    <tr>
                                        <th>When This Increases →</th>
                                        <th>CTR</th>
                                        <th>CPC</th>
                                        <th>CVR</th>
                                        <th>CPA</th>
                                        <th>ROAS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>CTR</strong></td>
                                        <td>-</td>
                                        <td>↓</td>
                                        <td>↑</td>
                                        <td>↓</td>
                                        <td>↑</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Quality Score</strong></td>
                                        <td>↑</td>
                                        <td>↓</td>
                                        <td>→</td>
                                        <td>↓</td>
                                        <td>↑</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Bid Amount</strong></td>
                                        <td>→</td>
                                        <td>↑</td>
                                        <td>→</td>
                                        <td>↑</td>
                                        <td>↓</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Landing Page Relevance</strong></td>
                                        <td>→</td>
                                        <td>→</td>
                                        <td>↑</td>
                                        <td>↓</td>
                                        <td>↑</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="day-exercise">
                            <h4>Practical Calculation Exercise</h4>
                            <div class="exercise-scenario">
                                <h5>Multi-Channel Scenario:</h5>
                                <ul>
                                    <li>Search Campaign: $5,000 spend, 100 conversions, $150 AOV</li>
                                    <li>Shopping Campaign: $3,000 spend, 80 conversions, $120 AOV</li>
                                    <li>Display Campaign: $2,000 spend, 40 conversions, $100 AOV</li>
                                </ul>
                                
                                <div class="exercise-tasks">
                                    <h5>Calculate:</h5>
                                    <ol>
                                        <li>Individual campaign ROAS</li>
                                        <li>Blended ROAS</li>
                                        <li>Weighted CPA</li>
                                        <li>Which campaign to scale based on marginal ROAS?</li>
                                    </ol>
                                </div>

                                <div class="exercise-solutions">
                                    <h5>Solutions:</h5>
                                    <ul>
                                        <li>Search: 3:1, Shopping: 3.2:1, Display: 2:1</li>
                                        <li>Blended ROAS: 2.86:1</li>
                                        <li>Weighted CPA: $45.45</li>
                                        <li>Shopping (highest ROAS and good volume)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <h4>Building Your KPI Dashboard</h4>
                        <div class="dashboard-elements">
                            <h5>Essential elements:</h5>
                            <ol>
                                <li><strong>Period Comparison</strong>: Current vs. Previous Period</li>
                                <li><strong>Trend Lines</strong>: 7-day, 30-day moving averages</li>
                                <li><strong>Benchmarks</strong>: Industry and internal targets</li>
                                <li><strong>Segmentation</strong>: Device, location, time of day</li>
                                <li><strong>Alerts</strong>: Automatic flags for significant changes</li>
                            </ol>
                        </div>
                    </div>
                </div>

                <div class="day-section">
                    <h3><i class="fas fa-calendar-day"></i> Day 3: Attribution Models & Their Impact</h3>
                    <div class="lesson-content">
                        <h4>Learning Objectives</h4>
                        <ul>
                            <li>Understand different attribution models</li>
                            <li>See how attribution affects KPI interpretation</li>
                            <li>Choose the right model for your business</li>
                        </ul>

                        <h4>Attribution Models Explained</h4>
                        
                        <div class="attribution-models">
                            <div class="attribution-model">
                                <h5>1. Last-Click Attribution</h5>
                                <ul>
                                    <li><strong>What it measures</strong>: Gives 100% credit to the final touchpoint</li>
                                    <li><strong>Best for</strong>: Direct response campaigns</li>
                                    <li><strong>Limitation</strong>: Ignores assist value</li>
                                </ul>
                            </div>
                            <div class="attribution-model">
                                <h5>2. First-Click Attribution</h5>
                                <ul>
                                    <li><strong>What it measures</strong>: Gives 100% credit to the first touchpoint</li>
                                    <li><strong>Best for</strong>: Brand awareness analysis</li>
                                    <li><strong>Limitation</strong>: Ignores conversion optimization</li>
                                </ul>
                            </div>
                            <div class="attribution-model">
                                <h5>3. Linear Attribution</h5>
                                <ul>
                                    <li><strong>What it measures</strong>: Distributes credit equally across all touchpoints</li>
                                    <li><strong>Best for</strong>: Long sales cycles</li>
                                    <li><strong>Limitation</strong>: Treats all touches as equal value</li>
                                </ul>
                            </div>
                            <div class="attribution-model">
                                <h5>4. Time-Decay Attribution</h5>
                                <ul>
                                    <li><strong>What it measures</strong>: More credit to recent touchpoints</li>
                                    <li><strong>Best for</strong>: Short consideration cycles</li>
                                    <li><strong>Limitation</strong>: May undervalue awareness efforts</li>
                                </ul>
                            </div>
                            <div class="attribution-model">
                                <h5>5. Position-Based Attribution</h5>
                                <ul>
                                    <li><strong>What it measures</strong>: 40% first, 40% last, 20% middle</li>
                                    <li><strong>Best for</strong>: Balanced view of journey</li>
                                    <li><strong>Limitation</strong>: Arbitrary credit distribution</li>
                                </ul>
                            </div>
                            <div class="attribution-model">
                                <h5>6. Data-Driven Attribution (DDA)</h5>
                                <ul>
                                    <li><strong>What it measures</strong>: Uses machine learning to assign credit</li>
                                    <li><strong>Best for</strong>: Accounts with sufficient data</li>
                                    <li><strong>Limitation</strong>: Requires 15,000 clicks, 600 conversions/month</li>
                                </ul>
                            </div>
                        </div>

                        <h4>Attribution Impact on KPIs</h4>
                        <div class="attribution-case-study">
                            <h5>Case Study: B2B Software Company</h5>
                            <div class="attribution-comparison">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Campaign</th>
                                            <th>Last-Click CPA</th>
                                            <th>DDA CPA</th>
                                            <th>Difference</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Brand Search</td>
                                            <td>$45</td>
                                            <td>$125</td>
                                            <td>+178%</td>
                                        </tr>
                                        <tr>
                                            <td>Generic Search</td>
                                            <td>$250</td>
                                            <td>$180</td>
                                            <td>-28%</td>
                                        </tr>
                                        <tr>
                                            <td>Display Prospecting</td>
                                            <td>$500</td>
                                            <td>$210</td>
                                            <td>-58%</td>
                                        </tr>
                                        <tr>
                                            <td>YouTube</td>
                                            <td>$800</td>
                                            <td>$190</td>
                                            <td>-76%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p><strong>Key Insight</strong>: Upper-funnel campaigns show dramatically better performance under DDA</p>
                        </div>

                        <h4>Choosing Your Attribution Model</h4>
                        <div class="attribution-decision">
                            <h5>Decision Framework:</h5>
                            <div class="decision-factors">
                                <div class="decision-factor">
                                    <h6>1. Sales Cycle Length</h6>
                                    <ul>
                                        <li>&lt; 1 day: Last-click</li>
                                        <li>1-7 days: Time-decay</li>
                                        <li>7-30 days: Position-based</li>
                                        <li>&gt; 30 days: Linear or DDA</li>
                                    </ul>
                                </div>
                                <div class="decision-factor">
                                    <h6>2. Campaign Mix</h6>
                                    <ul>
                                        <li>Single channel: Last-click</li>
                                        <li>Multi-channel, same stage: Linear</li>
                                        <li>Full funnel: DDA or Position-based</li>
                                    </ul>
                                </div>
                                <div class="decision-factor">
                                    <h6>3. Data Volume</h6>
                                    <ul>
                                        <li>Low volume: Last-click or Position-based</li>
                                        <li>High volume: Data-driven</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="day-exercise">
                            <h4>Day 3 Exercise</h4>
                            <div class="exercise-scenario">
                                <h5>Attribution Analysis Challenge</h5>
                                <p>Your account shows:</p>
                                <ul>
                                    <li>Display Campaign: 1,000 clicks, 5 last-click conversions</li>
                                    <li>Generic Search: 500 clicks, 50 last-click conversions</li>
                                    <li>Brand Search: 300 clicks, 100 last-click conversions</li>
                                </ul>
                                <p>Path analysis shows:</p>
                                <ul>
                                    <li>60% of Brand Search converters saw Display first</li>
                                    <li>40% of Generic Search converters saw Display first</li>
                                </ul>
                                
                                <div class="exercise-tasks">
                                    <h5>Questions:</h5>
                                    <ol>
                                        <li>Calculate true contribution of Display using linear attribution</li>
                                        <li>How does Display CPA change?</li>
                                        <li>Should you increase Display budget?</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="day-section">
                    <h3><i class="fas fa-calendar-day"></i> Day 4: Attribution in Practice</h3>
                    <div class="lesson-content">
                        <h4>Learning Objectives</h4>
                        <ul>
                            <li>Implement attribution insights in optimization</li>
                            <li>Build attribution-aware budgets</li>
                            <li>Create multi-touch reporting</li>
                        </ul>

                        <h4>Setting Up Attribution in Google Ads</h4>
                        
                        <div class="setup-steps">
                            <div class="setup-step">
                                <h5>Step 1: Enable Attribution Reports</h5>
                                <ol>
                                    <li>Navigate to Tools & Settings > Measurement > Attribution</li>
                                    <li>Select your attribution model</li>
                                    <li>Set lookback window (typically 30-90 days)</li>
                                </ol>
                            </div>
                            <div class="setup-step">
                                <h5>Step 2: Analyze Path Metrics</h5>
                                <p>Key reports to review:</p>
                                <ul>
                                    <li>Top Paths</li>
                                    <li>Path Length</li>
                                    <li>Time Lag</li>
                                    <li>Model Comparison</li>
                                </ul>
                            </div>
                            <div class="setup-step">
                                <h5>Step 3: Implement Insights</h5>
                                <ul>
                                    <li>Adjust budgets based on true contribution</li>
                                    <li>Modify bid strategies for assist-heavy campaigns</li>
                                    <li>Create campaign experiments with different models</li>
                                </ul>
                            </div>
                        </div>

                        <h4>Multi-Touch Budget Allocation</h4>
                        <div class="budget-allocation">
                            <h5>Formula for Attribution-Based Budgeting:</h5>
                            <code>Adjusted Budget = Current Budget × (DDA ROAS ÷ Last-Click ROAS)</code>
                            
                            <h5>Example Reallocation:</h5>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Campaign</th>
                                        <th>Current Budget</th>
                                        <th>LC ROAS</th>
                                        <th>DDA ROAS</th>
                                        <th>New Budget</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Display</td>
                                        <td>$5,000</td>
                                        <td>1.5:1</td>
                                        <td>3.2:1</td>
                                        <td>$10,667</td>
                                    </tr>
                                    <tr>
                                        <td>Search</td>
                                        <td>$10,000</td>
                                        <td>4:1</td>
                                        <td>3.5:1</td>
                                        <td>$8,750</td>
                                    </tr>
                                    <tr>
                                        <td>Shopping</td>
                                        <td>$8,000</td>
                                        <td>3:1</td>
                                        <td>3.1:1</td>
                                        <td>$8,267</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4>Building Attribution Reports</h4>
                        <div class="attribution-metrics">
                            <h5>Essential Attribution Metrics:</h5>
                            <ol>
                                <li><strong>Assisted Conversions</strong>: Non-last-click conversions</li>
                                <li><strong>Assist/Last-Click Ratio</strong>: Indicates assist value</li>
                                <li><strong>Path Length</strong>: Average touchpoints to conversion</li>
                                <li><strong>Time to Conversion</strong>: Days from first touch</li>
                                <li><strong>Cross-Device Conversions</strong>: Multi-device journeys</li>
                            </ol>
                        </div>

                        <div class="day-exercise">
                            <h4>Day 4 Exercise</h4>
                            <div class="exercise-scenario">
                                <h5>Build Your Attribution Framework</h5>
                                <p>Using your account data:</p>
                                <ol>
                                    <li>Export path data for last 30 days</li>
                                    <li>Calculate assist/last-click ratios by campaign</li>
                                    <li>Identify your "hidden heroes" (high assist, low last-click)</li>
                                    <li>Propose budget reallocation based on findings</li>
                                </ol>
                                
                                <div class="exercise-template">
                                    <h5>Template Analysis:</h5>
                                    <ul>
                                        <li>Campaign A: 500 assists, 100 last-click = 5:1 ratio</li>
                                        <li>Campaign B: 200 assists, 300 last-click = 0.67:1 ratio</li>
                                        <li>Which deserves more budget under multi-touch view?</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="day-section">
                    <h3><i class="fas fa-calendar-day"></i> Day 5: Module 1 Checkpoint</h3>
                    <div class="lesson-content">
                        <h4>Knowledge Assessment Quiz</h4>
                        
                        <div class="quiz-section">
                            <div class="quiz-question">
                                <h5>Question 1: Which KPI cascade is correct?</h5>
                                <div class="quiz-options">
                                    <label><input type="radio" name="q1" value="a"> A) Higher CPC → Higher Quality Score → Higher CTR</label>
                                    <label><input type="radio" name="q1" value="b"> B) Higher CTR → Higher Quality Score → Lower CPC</label>
                                    <label><input type="radio" name="q1" value="c"> C) Lower CTR → Higher CPC → Higher ROAS</label>
                                    <label><input type="radio" name="q1" value="d"> D) Higher Quality Score → Higher CPC → Lower ROAS</label>
                                </div>
                            </div>
                            <div class="quiz-question">
                                <h5>Question 2: A campaign has $10,000 spend and generates $35,000 in revenue. What's the ROAS?</h5>
                                <div class="quiz-options">
                                    <label><input type="radio" name="q2" value="a"> A) 2.5:1</label>
                                    <label><input type="radio" name="q2" value="b"> B) 3.5:1</label>
                                    <label><input type="radio" name="q2" value="c"> C) 4.5:1</label>
                                    <label><input type="radio" name="q2" value="d"> D) 25%</label>
                                </div>
                            </div>
                            <div class="quiz-question">
                                <h5>Question 3: Under Data-Driven Attribution, upper-funnel campaigns typically show:</h5>
                                <div class="quiz-options">
                                    <label><input type="radio" name="q3" value="a"> A) Higher CPA than last-click</label>
                                    <label><input type="radio" name="q3" value="b"> B) Lower CPA than last-click</label>
                                    <label><input type="radio" name="q3" value="c"> C) Same CPA as last-click</label>
                                    <label><input type="radio" name="q3" value="d"> D) No measurable CPA</label>
                                </div>
                            </div>
                            <div class="quiz-question">
                                <h5>Question 4: Your CTR improves from 2% to 3%. Assuming this improves Quality Score and reduces CPC by 20%, how does this affect clicks with the same budget?</h5>
                                <div class="quiz-options">
                                    <label><input type="radio" name="q4" value="a"> A) 20% more clicks</label>
                                    <label><input type="radio" name="q4" value="b"> B) 25% more clicks</label>
                                    <label><input type="radio" name="q4" value="c"> C) 50% more clicks</label>
                                    <label><input type="radio" name="q4" value="d"> D) 66% more clicks</label>
                                </div>
                            </div>
                            <div class="quiz-question">
                                <h5>Question 5: Which attribution model gives 40% credit to first and last touch?</h5>
                                <div class="quiz-options">
                                    <label><input type="radio" name="q5" value="a"> A) Linear</label>
                                    <label><input type="radio" name="q5" value="b"> B) Time-decay</label>
                                    <label><input type="radio" name="q5" value="c"> C) Position-based</label>
                                    <label><input type="radio" name="q5" value="d"> D) Data-driven</label>
                                </div>
                            </div>
                        </div>

                        <h4>Practical Assignment</h4>
                        <div class="practical-assignment">
                            <h5>Campaign Analysis Project</h5>
                            <p>Using the provided dataset (or your own account):</p>
                            
                            <div class="assignment-tasks">
                                <div class="assignment-task">
                                    <h6>1. KPI Audit (10 minutes)</h6>
                                    <ul>
                                        <li>Calculate all Tier 1, 2, and 3 KPIs</li>
                                        <li>Identify top 3 underperforming metrics</li>
                                        <li>Compare to industry benchmarks</li>
                                    </ul>
                                </div>
                                <div class="assignment-task">
                                    <h6>2. Attribution Analysis (10 minutes)</h6>
                                    <ul>
                                        <li>Compare last-click vs. data-driven CPA</li>
                                        <li>Calculate assist/last-click ratios</li>
                                        <li>Identify attribution winners/losers</li>
                                    </ul>
                                </div>
                                <div class="assignment-task">
                                    <h6>3. Optimization Plan (10 minutes)</h6>
                                    <ul>
                                        <li>Propose 3 specific improvements</li>
                                        <li>Project KPI impact of each change</li>
                                        <li>Prioritize by effort vs. impact</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <h4>Module 1 Completion Checklist</h4>
                        <div class="completion-checklist">
                            <label><input type="checkbox"> Understand the three-tier KPI hierarchy</label>
                            <label><input type="checkbox"> Can calculate all major Google Ads KPIs</label>
                            <label><input type="checkbox"> Know when to use each attribution model</label>
                            <label><input type="checkbox"> Built a custom KPI dashboard template</label>
                            <label><input type="checkbox"> Completed attribution analysis exercise</label>
                            <label><input type="checkbox"> Identified account-specific KPI priorities</label>
                        </div>

                        <h4>Key Formulas Reference Sheet</h4>
                        <div class="formulas-reference">
                            <div class="formula-reference">
                                <code>ROAS = Revenue ÷ Ad Spend</code>
                            </div>
                            <div class="formula-reference">
                                <code>CPA = Ad Spend ÷ Conversions</code>
                            </div>
                            <div class="formula-reference">
                                <code>CTR = (Clicks ÷ Impressions) × 100</code>
                            </div>
                            <div class="formula-reference">
                                <code>CVR = (Conversions ÷ Clicks) × 100</code>
                            </div>
                            <div class="formula-reference">
                                <code>CPC = Ad Spend ÷ Clicks</code>
                            </div>
                            <div class="formula-reference">
                                <code>AOV = Revenue ÷ Orders</code>
                            </div>
                            <div class="formula-reference">
                                <code>Quality Score Impact on CPC = Base CPC × (1 ÷ Quality Score Factor)</code>
                            </div>
                            <div class="formula-reference">
                                <code>Attribution Credit = Model-Specific Weight × Conversion Value</code>
                            </div>
                            <div class="formula-reference">
                                <code>Break-even ROAS = 1 ÷ Profit Margin</code>
                            </div>
                            <div class="formula-reference">
                                <code>Target CPA = AOV × Profit Margin</code>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="module-resources">
                    <h3>Module Resources</h3>
                    <div class="resources-section">
                        <h4>Required Reading</h4>
                        <ol>
                            <li><strong>"Advanced Google Ads" by Brad Geddes</strong>
                                <ul>
                                    <li>Chapter 10: Understanding Quality Score</li>
                                    <li>Chapter 11: Advanced Optimization Techniques</li>
                                    <li>Chapter 12: Attribution and Analytics</li>
                                </ul>
                            </li>
                            <li><strong>Google Best Practices</strong>
                                <ul>
                                    <li><a href="https://support.google.com/google-ads/answer/6259715" target="_blank">About attribution models</a></li>
                                    <li><a href="https://support.google.com/google-ads/answer/6167118" target="_blank">Understanding Quality Score</a></li>
                                    <li><a href="https://support.google.com/google-ads/answer/6095821" target="_blank">Conversion tracking setup</a></li>
                                </ul>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        `,
        2: `
            <div class="module-content">
                <div class="module-intro">
                    <h2>Module 2: Advanced Performance Diagnostics</h2>
                    <p class="module-description">Learn to diagnose performance issues like a pro. Master the 5-step audit framework, advanced segmentation, and search query analysis techniques.</p>
                    <div class="module-meta">
                        <span><i class="fas fa-clock"></i> Duration: 5 Days (Week 2)</span>
                        <span><i class="fas fa-book"></i> 30 minutes daily</span>
                        <span><i class="fas fa-certificate"></i> Professional Certification</span>
                    </div>
                </div>

                <div class="day-section">
                    <h3><i class="fas fa-calendar-day"></i> Day 6: The Diagnostic Framework</h3>
                    <div class="lesson-content">
                        <h4>Learning Objectives</h4>
                        <ul>
                            <li>Understand the systematic approach to performance diagnosis</li>
                            <li>Learn the 5-step audit framework</li>
                            <li>Identify common performance bottlenecks</li>
                        </ul>

                        <h4>The 5-Step Performance Audit Framework</h4>
                        
                        <div class="audit-framework">
                            <div class="audit-step">
                                <h5>Step 1: Macro Analysis (The 30,000-foot view)</h5>
                                <p>Start with account-level metrics to identify broad trends:</p>
                                
                                <div class="key-questions">
                                    <h6>Key Questions:</h6>
                                    <ul>
                                        <li>Is overall performance trending up or down?</li>
                                        <li>Which campaigns drive 80% of results?</li>
                                        <li>Are there sudden spikes or drops?</li>
                                    </ul>
                                </div>

                                <div class="diagnostic-dashboard">
                                    <h6>Diagnostic Dashboard:</h6>
                                    <div class="dashboard-example">
                                        <code>
Time Period: Last 30 days vs Previous 30 days
├── Account ROAS: ↓ -15%
├── Total Conversions: ↑ +5%
├── Average CPA: ↑ +22%
└── Click Volume: ↑ +8%

Diagnosis: Rising costs despite more traffic
                                        </code>
                                    </div>
                                </div>
                            </div>

                            <div class="audit-step">
                                <h5>Step 2: Campaign Segmentation (Divide and diagnose)</h5>
                                <p>Break down performance by campaign characteristics:</p>
                                
                                <div class="segmentation-matrix">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Segment Type</th>
                                                <th>What to Look For</th>
                                                <th>Red Flags</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Campaign Type</td>
                                                <td>Performance variance</td>
                                                <td>50%+ difference in CPA</td>
                                            </tr>
                                            <tr>
                                                <td>Device</td>
                                                <td>Mobile vs Desktop gaps</td>
                                                <td>30%+ CTR difference</td>
                                            </tr>
                                            <tr>
                                                <td>Geography</td>
                                                <td>Location performance</td>
                                                <td>Some regions 2x CPA</td>
                                            </tr>
                                            <tr>
                                                <td>Time</td>
                                                <td>Day/Hour patterns</td>
                                                <td>Weekend conversion drops</td>
                                            </tr>
                                            <tr>
                                                <td>Audience</td>
                                                <td>New vs Returning</td>
                                                <td>New users not converting</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div class="audit-step">
                                <h5>Step 3: Funnel Analysis (Find the leak)</h5>
                                <p>Track user journey from impression to conversion:</p>
                                
                                <div class="performance-funnel">
                                    <h6>The Performance Funnel:</h6>
                                    <div class="funnel-visual">
                                        <div class="funnel-stage">
                                            <span class="stage-name">Impressions (1,000,000)</span>
                                            <span class="stage-metric">↓ CTR: 3% ⚠️ (Industry avg: 3.5%)</span>
                                        </div>
                                        <div class="funnel-stage">
                                            <span class="stage-name">Clicks (30,000)</span>
                                            <span class="stage-metric">↓ Landing Page Load: 95%</span>
                                        </div>
                                        <div class="funnel-stage">
                                            <span class="stage-name">Page Views (28,500)</span>
                                            <span class="stage-metric">↓ Engagement Rate: 45% ✓</span>
                                        </div>
                                        <div class="funnel-stage">
                                            <span class="stage-name">Engaged Users (12,825)</span>
                                            <span class="stage-metric">↓ Add to Cart: 15% ⚠️ (Target: 20%)</span>
                                        </div>
                                        <div class="funnel-stage">
                                            <span class="stage-name">Cart Additions (1,924)</span>
                                            <span class="stage-metric">↓ Checkout Rate: 65% ✓</span>
                                        </div>
                                        <div class="funnel-stage">
                                            <span class="stage-name">Conversions (1,251)</span>
                                        </div>
                                    </div>
                                    <p><strong>Bottleneck Identified:</strong> CTR and Add-to-Cart rates below targets</p>
                                </div>
                            </div>
                        </div>

                        <div class="day-exercise">
                            <h4>Day 6 Exercise</h4>
                            <div class="exercise-scenario">
                                <h5>Diagnostic Challenge</h5>
                                <p>You're given this account data:</p>
                                <ul>
                                    <li><strong>Last 30 days:</strong> 50,000 clicks, 1,000 conversions, $50,000 spend</li>
                                    <li><strong>Previous 30 days:</strong> 40,000 clicks, 1,200 conversions, $36,000 spend</li>
                                    <li><strong>Device Split:</strong> Desktop (70% clicks, 85% conversions), Mobile (30% clicks, 15% conversions)</li>
                                    <li><strong>Top Search Terms:</strong> 10% are competitor names with 0.5% CVR</li>
                                </ul>
                                
                                <div class="exercise-tasks">
                                    <h5>Tasks:</h5>
                                    <ol>
                                        <li>Calculate period-over-period CPA change</li>
                                        <li>Identify the primary performance issue</li>
                                        <li>Diagnose mobile performance problem</li>
                                        <li>Recommend 2 immediate actions</li>
                                    </ol>
                                </div>

                                <div class="exercise-solutions">
                                    <h5>Solutions:</h5>
                                    <ul>
                                        <li>CPA: $50 → $30 (+67% increase)</li>
                                        <li>Primary issue: Conversion rate dropped from 3% to 2%</li>
                                        <li>Mobile CVR: 1% vs Desktop: 2.4%</li>
                                        <li>Actions: Fix mobile experience, exclude competitor terms</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="lesson-section">
                    <h3>Lesson 2.2: Click-Through Rate (CTR) Analysis</h3>
                    <div class="lesson-content">
                        <h4>Mastering CTR for Better Performance</h4>
                        <p>CTR is one of the most important metrics in Google Ads, directly impacting quality scores, costs, and overall campaign performance.</p>
                        
                        <div class="ctr-analysis">
                            <h5>CTR Formula and Calculation</h5>
                            <div class="formula-box">
                                <h6>CTR = (Clicks ÷ Impressions) × 100</h6>
                                <p><strong>Example:</strong> If your ad received 1,000 impressions and 25 clicks:</p>
                                <p>CTR = (25 ÷ 1,000) × 100 = 2.5%</p>
                            </div>

                            <h5>Industry CTR Benchmarks</h5>
                            <div class="benchmark-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Industry</th>
                                            <th>Average CTR</th>
                                            <th>Top 10% CTR</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Finance & Insurance</td>
                                            <td>2.05%</td>
                                            <td>3.40%</td>
                                        </tr>
                                        <tr>
                                            <td>Real Estate</td>
                                            <td>2.14%</td>
                                            <td>3.50%</td>
                                        </tr>
                                        <tr>
                                            <td>Travel & Tourism</td>
                                            <td>1.94%</td>
                                            <td>3.20%</td>
                                        </tr>
                                        <tr>
                                            <td>E-commerce</td>
                                            <td>1.84%</td>
                                            <td>3.10%</td>
                                        </tr>
                                        <tr>
                                            <td>Healthcare</td>
                                            <td>2.18%</td>
                                            <td>3.60%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h5>CTR Optimization Strategies</h5>
                            <div class="optimization-strategies">
                                <div class="strategy">
                                    <h6>1. Ad Copy Optimization</h6>
                                    <ul>
                                        <li>Include primary keywords in headlines</li>
                                        <li>Use compelling call-to-actions</li>
                                        <li>Highlight unique value propositions</li>
                                        <li>Test emotional vs. rational appeals</li>
                                        <li>Use numbers and statistics</li>
                                    </ul>
                                </div>
                                <div class="strategy">
                                    <h6>2. Keyword Optimization</h6>
                                    <ul>
                                        <li>Use more specific, long-tail keywords</li>
                                        <li>Implement negative keywords</li>
                                        <li>Optimize keyword match types</li>
                                        <li>Focus on high-intent keywords</li>
                                        <li>Regular search term analysis</li>
                                    </ul>
                                </div>
                                <div class="strategy">
                                    <h6>3. Ad Extensions</h6>
                                    <ul>
                                        <li>Implement sitelink extensions</li>
                                        <li>Use callout extensions</li>
                                        <li>Add structured snippets</li>
                                        <li>Include call extensions</li>
                                        <li>Use price extensions</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="lesson-section">
                    <h3>Lesson 2.3: Cost Per Click (CPC) Management</h3>
                    <div class="lesson-content">
                        <h4>Strategic CPC Optimization</h4>
                        <p>CPC directly impacts your advertising costs and ROI. Understanding how to manage and optimize CPC is essential for profitable campaigns.</p>
                        
                        <div class="cpc-management">
                            <h5>CPC Formula and Factors</h5>
                            <div class="formula-box">
                                <h6>CPC = Total Cost ÷ Total Clicks</h6>
                                <p><strong>Example:</strong> If you spent $500 and received 100 clicks:</p>
                                <p>CPC = $500 ÷ 100 = $5.00 per click</p>
                            </div>

                            <h5>Factors Affecting CPC</h5>
                            <div class="cpc-factors">
                                <div class="factor">
                                    <h6>Quality Score Impact</h6>
                                    <p>Higher quality scores typically result in lower CPCs:</p>
                                    <ul>
                                        <li>Quality Score 1-3: High CPC</li>
                                        <li>Quality Score 4-6: Medium CPC</li>
                                        <li>Quality Score 7-10: Low CPC</li>
                                    </ul>
                                </div>
                                <div class="factor">
                                    <h6>Competition Level</h6>
                                    <p>More competitive keywords have higher CPCs:</p>
                                    <ul>
                                        <li>Brand terms: Lower CPC</li>
                                        <li>Generic terms: Higher CPC</li>
                                        <li>Seasonal terms: Variable CPC</li>
                                        <li>Long-tail terms: Lower CPC</li>
                                    </ul>
                                </div>
                                <div class="factor">
                                    <h6>Ad Position</h6>
                                    <p>Higher ad positions typically cost more:</p>
                                    <ul>
                                        <li>Position 1: Highest CPC</li>
                                        <li>Position 2-3: Medium CPC</li>
                                        <li>Position 4+: Lower CPC</li>
                                    </ul>
                                </div>
                            </div>

                            <h5>CPC Optimization Strategies</h5>
                            <div class="cpc-optimization">
                                <div class="optimization-method">
                                    <h6>1. Quality Score Improvement</h6>
                                    <ul>
                                        <li>Improve ad relevance</li>
                                        <li>Optimize landing pages</li>
                                        <li>Use relevant keywords</li>
                                        <li>Create compelling ad copy</li>
                                    </ul>
                                </div>
                                <div class="optimization-method">
                                    <h6>2. Bid Management</h6>
                                    <ul>
                                        <li>Use automated bidding strategies</li>
                                        <li>Implement bid adjustments</li>
                                        <li>Set appropriate bid limits</li>
                                        <li>Monitor competitor bidding</li>
                                    </ul>
                                </div>
                                <div class="optimization-method">
                                    <h6>3. Keyword Strategy</h6>
                                    <ul>
                                        <li>Focus on long-tail keywords</li>
                                        <li>Use negative keywords</li>
                                        <li>Optimize match types</li>
                                        <li>Target less competitive terms</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="lesson-section">
                    <h3>Lesson 2.4: Conversion Rate Optimization</h3>
                    <div class="lesson-content">
                        <h4>Maximizing Conversion Performance</h4>
                        <p>Conversion rate is the percentage of clicks that result in desired actions. Optimizing conversion rates is crucial for improving ROI and campaign efficiency.</p>
                        
                        <div class="conversion-analysis">
                            <h5>Conversion Rate Formula</h5>
                            <div class="formula-box">
                                <h6>Conversion Rate = (Conversions ÷ Clicks) × 100</h6>
                                <p><strong>Example:</strong> If you received 100 clicks and 5 conversions:</p>
                                <p>Conversion Rate = (5 ÷ 100) × 100 = 5%</p>
                            </div>

                            <h5>Conversion Rate Benchmarks by Industry</h5>
                            <div class="conversion-benchmarks">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Industry</th>
                                            <th>Average CVR</th>
                                            <th>Top 25% CVR</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Finance & Insurance</td>
                                            <td>3.48%</td>
                                            <td>5.10%</td>
                                        </tr>
                                        <tr>
                                            <td>Real Estate</td>
                                            <td>2.49%</td>
                                            <td>3.40%</td>
                                        </tr>
                                        <tr>
                                            <td>Travel & Tourism</td>
                                            <td>2.47%</td>
                                            <td>3.20%</td>
                                        </tr>
                                        <tr>
                                            <td>E-commerce</td>
                                            <td>2.35%</td>
                                            <td>3.10%</td>
                                        </tr>
                                        <tr>
                                            <td>Healthcare</td>
                                            <td>3.36%</td>
                                            <td>4.80%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h5>Conversion Rate Optimization Strategies</h5>
                            <div class="cvr-optimization">
                                <div class="optimization-area">
                                    <h6>1. Landing Page Optimization</h6>
                                    <ul>
                                        <li>Improve page load speed</li>
                                        <li>Create compelling headlines</li>
                                        <li>Use clear call-to-actions</li>
                                        <li>Reduce form fields</li>
                                        <li>Add trust signals</li>
                                        <li>Optimize for mobile</li>
                                    </ul>
                                </div>
                                <div class="optimization-area">
                                    <h6>2. Ad Copy Alignment</h6>
                                    <ul>
                                        <li>Match ad messaging to landing page</li>
                                        <li>Use consistent value propositions</li>
                                        <li>Address user intent</li>
                                        <li>Set proper expectations</li>
                                    </ul>
                                </div>
                                <div class="optimization-area">
                                    <h6>3. Audience Targeting</h6>
                                    <ul>
                                        <li>Target high-intent audiences</li>
                                        <li>Use remarketing lists</li>
                                        <li>Implement audience exclusions</li>
                                        <li>Optimize demographic targeting</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="lesson-section">
                    <h3>Lesson 2.5: Return on Ad Spend (ROAS) Analysis</h3>
                    <div class="lesson-content">
                        <h4>Measuring Revenue Performance</h4>
                        <p>ROAS is the ultimate metric for measuring advertising profitability. Understanding how to calculate, analyze, and optimize ROAS is essential for business success.</p>
                        
                        <div class="roas-analysis">
                            <h5>ROAS Formula and Calculation</h5>
                            <div class="formula-box">
                                <h6>ROAS = Revenue ÷ Ad Spend</h6>
                                <p><strong>Example:</strong> If you spent $1,000 on ads and generated $4,000 in revenue:</p>
                                <p>ROAS = $4,000 ÷ $1,000 = 4.0x (or 400%)</p>
                            </div>

                            <h5>ROAS Benchmarks by Industry</h5>
                            <div class="roas-benchmarks">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Industry</th>
                                            <th>Average ROAS</th>
                                            <th>Good ROAS</th>
                                            <th>Excellent ROAS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>E-commerce</td>
                                            <td>2.5x</td>
                                            <td>4.0x</td>
                                            <td>6.0x+</td>
                                        </tr>
                                        <tr>
                                            <td>Lead Generation</td>
                                            <td>3.0x</td>
                                            <td>5.0x</td>
                                            <td>8.0x+</td>
                                        </tr>
                                        <tr>
                                            <td>B2B Services</td>
                                            <td>4.0x</td>
                                            <td>6.0x</td>
                                            <td>10.0x+</td>
                                        </tr>
                                        <tr>
                                            <td>Real Estate</td>
                                            <td>5.0x</td>
                                            <td>8.0x</td>
                                            <td>15.0x+</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h5>ROAS Optimization Strategies</h5>
                            <div class="roas-optimization">
                                <div class="optimization-strategy">
                                    <h6>1. Campaign-Level Optimization</h6>
                                    <ul>
                                        <li>Focus budget on high-ROAS campaigns</li>
                                        <li>Pause or optimize low-ROAS campaigns</li>
                                        <li>Implement automated bidding strategies</li>
                                        <li>Use target ROAS bidding</li>
                                    </ul>
                                </div>
                                <div class="optimization-strategy">
                                    <h6>2. Keyword-Level Optimization</h6>
                                    <ul>
                                        <li>Increase bids on high-ROAS keywords</li>
                                        <li>Pause low-ROAS keywords</li>
                                        <li>Add negative keywords</li>
                                        <li>Optimize keyword match types</li>
                                    </ul>
                                </div>
                                <div class="optimization-strategy">
                                    <h6>3. Audience Optimization</h6>
                                    <ul>
                                        <li>Target high-value audiences</li>
                                        <li>Use customer match lists</li>
                                        <li>Implement lookalike audiences</li>
                                        <li>Optimize demographic targeting</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="day-section">
                    <h3><i class="fas fa-calendar-day"></i> Day 10: Module 2 Checkpoint</h3>
                    <div class="lesson-content">
                        <h4>Knowledge Assessment Quiz</h4>
                        
                        <div class="quiz-section">
                            <div class="quiz-question">
                                <h5>Question 1: In the 5-step diagnostic framework, what should you analyze first?</h5>
                                <div class="quiz-options">
                                    <label><input type="radio" name="q1" value="a"> A) Individual keyword performance</label>
                                    <label><input type="radio" name="q1" value="b"> B) Macro account-level trends</label>
                                    <label><input type="radio" name="q1" value="c"> C) Competitor metrics</label>
                                    <label><input type="radio" name="q1" value="d"> D) Landing page performance</label>
                                </div>
                            </div>
                            <div class="quiz-question">
                                <h5>Question 2: A search query has high CTR but low CVR. This indicates:</h5>
                                <div class="quiz-options">
                                    <label><input type="radio" name="q2" value="a"> A) Great performance overall</label>
                                    <label><input type="radio" name="q2" value="b"> B) Poor ad-to-landing page relevance</label>
                                    <label><input type="radio" name="q2" value="c"> C) Strong keyword targeting</label>
                                    <label><input type="radio" name="q2" value="d"> D) Need for higher bids</label>
                                </div>
                            </div>
                            <div class="quiz-question">
                                <h5>Question 3: What's the ideal action for queries with >5% CVR and <50% impression share?</h5>
                                <div class="quiz-options">
                                    <label><input type="radio" name="q3" value="a"> A) Add as negative keywords</label>
                                    <label><input type="radio" name="q3" value="b"> B) Decrease bids</label>
                                    <label><input type="radio" name="q3" value="c"> C) Create exact match keywords with higher bids</label>
                                    <label><input type="radio" name="q3" value="d"> D) Pause immediately</label>
                                </div>
                            </div>
                            <div class="quiz-question">
                                <h5>Question 4: In query analysis, what does a high occurrence of "free" indicate?</h5>
                                <div class="quiz-options">
                                    <label><input type="radio" name="q4" value="a"> A) High commercial intent</label>
                                    <label><input type="radio" name="q4" value="b"> B) Audience mismatch for paid products</label>
                                    <label><input type="radio" name="q4" value="c"> C) Need for higher bids</label>
                                    <label><input type="radio" name="q4" value="d"> D) Strong brand awareness</label>
                                </div>
                            </div>
                            <div class="quiz-question">
                                <h5>Question 5: Which segmentation reveals mobile UX issues?</h5>
                                <div class="quiz-options">
                                    <label><input type="radio" name="q5" value="a"> A) Time-based segmentation</label>
                                    <label><input type="radio" name="q5" value="b"> B) Geographic segmentation</label>
                                    <label><input type="radio" name="q5" value="c"> C) Device segmentation</label>
                                    <label><input type="radio" name="q5" value="d"> D) Audience segmentation</label>
                                </div>
                            </div>
                        </div>

                        <h4>Module 2 Skills Checklist</h4>
                        <div class="completion-checklist">
                            <label><input type="checkbox"> Can perform 5-step diagnostic audit</label>
                            <label><input type="checkbox"> Understand multi-dimensional segmentation</label>
                            <label><input type="checkbox"> Master search query analysis</label>
                            <label><input type="checkbox"> Build negative keyword strategies</label>
                            <label><input type="checkbox"> Create query-based optimizations</label>
                            <label><input type="checkbox"> Use scripts for automation</label>
                            <label><input type="checkbox"> Identify performance bottlenecks quickly</label>
                            <label><input type="checkbox"> Generate actionable recommendations</label>
                        </div>

                        <h4>Diagnostic Formulas & Thresholds</h4>
                        <div class="diagnostic-formulas">
                            <div class="formula-section">
                                <h5>Performance Health Indicators:</h5>
                                <div class="formula-grid">
                                    <div class="formula-item">
                                        <code>Account Health Score = (CTR vs Benchmark × 0.2) + (CVR vs Benchmark × 0.3) + (CPA vs Target × 0.3) + (ROAS vs Target × 0.2)</code>
                                    </div>
                                    <div class="formula-item">
                                        <code>Query Value Score = (Conversions × Conversion Value) - (Clicks × CPC)</code>
                                    </div>
                                    <div class="formula-item">
                                        <code>Negative Keyword Threshold = Cost > (Target CPA × 2) AND Conversions = 0 AND Clicks > 10</code>
                                    </div>
                                    <div class="formula-item">
                                        <code>Exact Match Threshold = Conversions > 2 AND CVR > Account Average × 1.5 AND Volume > 20 clicks</code>
                                    </div>
                                    <div class="formula-item">
                                        <code>Device Optimization Trigger = Device CVR < Account Average × 0.7 OR Device CPA > Account Average × 1.3</code>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        3: `
            <div class="module-content">
                <div class="module-intro">
                    <h2>Module 3: Competitive Intelligence & Benchmarking</h2>
                    <p class="module-description">Master competitive analysis, auction insights, and industry benchmarking to understand your performance in market context and make strategic decisions.</p>
                    <div class="module-meta">
                        <span><i class="fas fa-clock"></i> Duration: 5 Days (Week 3)</span>
                        <span><i class="fas fa-book"></i> 30 minutes daily</span>
                        <span><i class="fas fa-certificate"></i> Professional Certification</span>
                    </div>
                </div>

                <div class="day-section">
                    <h3><i class="fas fa-calendar-day"></i> Day 11: Auction Insights Mastery</h3>
                    <div class="lesson-content">
                        <h4>Learning Objectives</h4>
                        <ul>
                            <li>Understand all Auction Insights metrics</li>
                            <li>Identify competitive threats and opportunities</li>
                            <li>Create competitive tracking systems</li>
                        </ul>

                        <h4>Auction Insights Metrics Decoded</h4>
                        
                        <div class="insights-framework">
                            <div class="insight-metric">
                                <h5>1. Impression Share (IS)</h5>
                                <p><strong>What it really tells you:</strong></p>
                                
                                <div class="metric-breakdown">
                                    <div class="metric-example">
                                        <h6>Your IS: 35%</h6>
                                        <p><strong>Interpretation:</strong> You're showing for 35% of available auctions</p>
                                        
                                        <div class="breakdown-grid">
                                            <div class="breakdown-item">
                                                <span class="metric-label">Search IS:</span>
                                                <span class="metric-value">35%</span>
                                            </div>
                                            <div class="breakdown-item warning">
                                                <span class="metric-label">Search Lost IS (budget):</span>
                                                <span class="metric-value">25% ← Fixable with budget</span>
                                            </div>
                                            <div class="breakdown-item alert">
                                                <span class="metric-label">Search Lost IS (rank):</span>
                                                <span class="metric-value">40% ← Fixable with optimization</span>
                                            </div>
                                        </div>
                                        
                                        <div class="action-priority">
                                            <h6>Action Priority:</h6>
                                            <ul>
                                                <li>If Lost IS (budget) > Lost IS (rank) → Increase budget</li>
                                                <li>If Lost IS (rank) > Lost IS (budget) → Improve Quality Score/bids</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="insight-metric">
                                <h5>2. Average Position</h5>
                                <p><strong>Beyond the number:</strong></p>
                                
                                <div class="position-analysis">
                                    <div class="position-ranges">
                                        <div class="position-range">
                                            <h6>Above 3.0:</h6>
                                            <p>Losing premium visibility</p>
                                        </div>
                                        <div class="position-range">
                                            <h6>1.0-2.0:</h6>
                                            <p>Premium positions, high cost</p>
                                        </div>
                                        <div class="position-range">
                                            <h6>2.0-3.0:</h6>
                                            <p>Balanced visibility/cost</p>
                                        </div>
                                        <div class="position-range">
                                            <h6>3.0-4.0:</h6>
                                            <p>Cost-efficient, lower CTR</p>
                                        </div>
                                    </div>
                                    
                                    <div class="competitive-context">
                                        <h6>Competitive Context:</h6>
                                        <div class="context-comparison">
                                            <div class="context-item">
                                                <span class="competitor">You:</span>
                                                <span class="position">2.3</span>
                                            </div>
                                            <div class="context-item">
                                                <span class="competitor">Competitor A:</span>
                                                <span class="position">1.8 (paying premium)</span>
                                            </div>
                                            <div class="context-item">
                                                <span class="competitor">Competitor B:</span>
                                                <span class="position">3.1 (value player)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="insight-metric">
                                <h5>3. Overlap Rate</h5>
                                <p><strong>Strategic implications:</strong></p>
                                
                                <div class="overlap-analysis">
                                    <div class="overlap-scenario high">
                                        <h6>High Overlap (>70%):</h6>
                                        <ul>
                                            <li>Direct competitor for same queries</li>
                                            <li>Similar targeting strategy</li>
                                            <li>Price pressure likely</li>
                                        </ul>
                                    </div>
                                    <div class="overlap-scenario low">
                                        <h6>Low Overlap (<30%):</h6>
                                        <ul>
                                            <li>Different keyword strategies</li>
                                            <li>Potential partnership opportunity</li>
                                            <li>Unique positioning possible</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="day-exercise">
                            <h4>Day 11 Exercise</h4>
                            <div class="exercise-scenario">
                                <h5>Competitive Analysis Challenge</h5>
                                <p>You're given this Auction Insights data:</p>
                                
                                <div class="competitive-data">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Competitor</th>
                                                <th>Impression Share</th>
                                                <th>Overlap Rate</th>
                                                <th>Position Above Rate</th>
                                                <th>Avg Position</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>You</td>
                                                <td>32%</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>2.4</td>
                                            </tr>
                                            <tr>
                                                <td>Competitor A</td>
                                                <td>48%</td>
                                                <td>82%</td>
                                                <td>68%</td>
                                                <td>1.9</td>
                                            </tr>
                                            <tr>
                                                <td>Competitor B</td>
                                                <td>25%</td>
                                                <td>45%</td>
                                                <td>35%</td>
                                                <td>2.8</td>
                                            </tr>
                                            <tr>
                                                <td>Competitor C</td>
                                                <td>15%</td>
                                                <td>28%</td>
                                                <td>55%</td>
                                                <td>2.2</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                
                                <div class="exercise-tasks">
                                    <h5>Tasks:</h5>
                                    <ol>
                                        <li>Identify your main competitive threat</li>
                                        <li>Calculate approximate market share</li>
                                        <li>Diagnose why Competitor A dominates</li>
                                        <li>Propose 3 strategic responses</li>
                                    </ol>
                                </div>

                                <div class="exercise-solutions">
                                    <h5>Solutions:</h5>
                                    <ul>
                                        <li>Main threat: Competitor A (high overlap + position above)</li>
                                        <li>Market share: ~27% (32% / 120% total)</li>
                                        <li>Competitor A: Either 2x budget or better QS</li>
                                        <li>Responses: Improve QS, find niche keywords, dayparting</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="day-section">
                    <h3><i class="fas fa-calendar-day"></i> Day 12: Advanced Competitive Analysis</h3>
                    <div class="lesson-content">
                        <h4>Learning Objectives</h4>
                        <ul>
                            <li>Calculate true market share</li>
                            <li>Develop competitive response strategies</li>
                            <li>Use competitive gaps for opportunity</li>
                        </ul>

                        <h4>Market Share Calculation Methods</h4>
                        
                        <div class="market-share-methods">
                            <div class="method">
                                <h5>Method 1: Impression Share Based</h5>
                                <div class="formula-box">
                                    <h6>Simple Market Share = Your IS / Sum of All IS</h6>
                                    <div class="calculation-example">
                                        <p><strong>Example:</strong></p>
                                        <ul>
                                            <li>You: 32%</li>
                                            <li>Competitors: 48% + 25% + 15% = 88%</li>
                                            <li>Total: 120%</li>
                                            <li>Your Market Share: 32/120 = 26.7%</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div class="method">
                                <h5>Method 2: Click Share Estimation</h5>
                                <div class="formula-box">
                                    <h6>Click Share = IS × Relative CTR</h6>
                                    <div class="ctr-assumptions">
                                        <h6>Assumptions:</h6>
                                        <ul>
                                            <li>Position 1: CTR baseline 1.0x</li>
                                            <li>Position 2: CTR 0.7x</li>
                                            <li>Position 3: CTR 0.5x</li>
                                            <li>Position 4+: CTR 0.3x</li>
                                        </ul>
                                    </div>
                                    <div class="calculation-example">
                                        <p><strong>Your Click Share = 32% × 0.7 = 22.4%</strong></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="competitive-positioning">
                            <h4>Competitive Positioning Map</h4>
                            
                            <div class="positioning-grid">
                                <div class="positioning-quadrant premium">
                                    <h5>High Ad Spend, High Position</h5>
                                    <h6>"Premium Players"</h6>
                                    <ul>
                                        <li><strong>Strategy:</strong> Outmaneuver with QS</li>
                                        <li><strong>Example:</strong> Enterprise competitors</li>
                                        <li><strong>Your Response:</strong> Niche targeting</li>
                                    </ul>
                                </div>
                                <div class="positioning-quadrant inefficient">
                                    <h5>High Ad Spend, Low Position</h5>
                                    <h6>"Inefficient Spenders"</h6>
                                    <ul>
                                        <li><strong>Strategy:</strong> Let them waste budget</li>
                                        <li><strong>Example:</strong> New entrants</li>
                                        <li><strong>Your Response:</strong> Maintain efficiency</li>
                                    </ul>
                                </div>
                                <div class="positioning-quadrant efficient">
                                    <h5>Low Ad Spend, High Position</h5>
                                    <h6>"Efficient Operators"</h6>
                                    <ul>
                                        <li><strong>Strategy:</strong> Learn from them</li>
                                        <li><strong>Example:</strong> Niche specialists</li>
                                        <li><strong>Your Response:</strong> Study their approach</li>
                                    </ul>
                                </div>
                                <div class="positioning-quadrant dormant">
                                    <h5>Low Ad Spend, Low Position</h5>
                                    <h6>"Dormant Threats"</h6>
                                    <ul>
                                        <li><strong>Strategy:</strong> Monitor for changes</li>
                                        <li><strong>Example:</strong> Testing competitors</li>
                                        <li><strong>Your Response:</strong> Capture their share</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="day-exercise">
                            <h4>Day 12 Exercise</h4>
                            <div class="exercise-scenario">
                                <h5>Competitive Strategy Development</h5>
                                <p><strong>Scenario:</strong> You're a mid-size project management software company competing against:</p>
                                
                                <div class="competitor-profiles">
                                    <div class="competitor-profile">
                                        <h6>Monday.com:</h6>
                                        <ul>
                                            <li>55% impression share</li>
                                            <li>Premium pricing</li>
                                        </ul>
                                    </div>
                                    <div class="competitor-profile">
                                        <h6>Asana:</h6>
                                        <ul>
                                            <li>40% impression share</li>
                                            <li>Strong brand</li>
                                        </ul>
                                    </div>
                                    <div class="competitor-profile">
                                        <h6>ClickUp:</h6>
                                        <ul>
                                            <li>30% impression share</li>
                                            <li>Aggressive growth</li>
                                        </ul>
                                    </div>
                                </div>
                                
                                <div class="your-position">
                                    <h6>Your Position:</h6>
                                    <ul>
                                        <li>25% impression share</li>
                                        <li>Better pricing than top 2</li>
                                        <li>Stronger features than ClickUp</li>
                                        <li>Lower brand recognition</li>
                                    </ul>
                                </div>
                                
                                <div class="exercise-tasks">
                                    <h5>Tasks:</h5>
                                    <ol>
                                        <li>Choose your competitive positioning</li>
                                        <li>List 5 keywords to target</li>
                                        <li>Write 2 ad headlines</li>
                                        <li>Identify the easiest competitor to take share from</li>
                                    </ol>
                                </div>

                                <div class="exercise-solutions">
                                    <h5>Sample Solution:</h5>
                                    <ul>
                                        <li>Position: Value specialist for growing teams</li>
                                        <li>Keywords: "asana alternative", "monday.com pricing", "project management under $10 user"</li>
                                        <li>Headlines: "Better Than Monday—Half the Price" | "Project Management That Scales With You"</li>
                                        <li>Target: ClickUp (weaker features, similar share)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="day-section">
                    <h3><i class="fas fa-calendar-day"></i> Day 13: Industry Benchmarking Deep Dive</h3>
                    <div class="lesson-content">
                        <h4>Learning Objectives</h4>
                        <ul>
                            <li>Find and use industry benchmarks effectively</li>
                            <li>Create relative performance scorecards</li>
                            <li>Adjust strategies based on benchmarks</li>
                        </ul>

                        <h4>Industry Benchmark Sources</h4>
                        
                        <div class="benchmark-sources">
                            <div class="benchmark-table">
                                <h5>Google Ads Benchmarks by Industry (2024)</h5>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Industry</th>
                                            <th>Avg CTR</th>
                                            <th>Avg CPC</th>
                                            <th>Avg CVR</th>
                                            <th>Avg CPA</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>B2B Technology</td>
                                            <td>2.5%</td>
                                            <td>$3.50</td>
                                            <td>2.8%</td>
                                            <td>$125</td>
                                        </tr>
                                        <tr>
                                            <td>E-commerce</td>
                                            <td>3.2%</td>
                                            <td>$1.20</td>
                                            <td>3.5%</td>
                                            <td>$35</td>
                                        </tr>
                                        <tr>
                                            <td>Healthcare</td>
                                            <td>3.8%</td>
                                            <td>$2.80</td>
                                            <td>4.2%</td>
                                            <td>$67</td>
                                        </tr>
                                        <tr>
                                            <td>Financial Services</td>
                                            <td>4.5%</td>
                                            <td>$4.00</td>
                                            <td>5.1%</td>
                                            <td>$78</td>
                                        </tr>
                                        <tr>
                                            <td>Education</td>
                                            <td>3.5%</td>
                                            <td>$2.40</td>
                                            <td>3.8%</td>
                                            <td>$63</td>
                                        </tr>
                                        <tr>
                                            <td>Real Estate</td>
                                            <td>3.9%</td>
                                            <td>$2.20</td>
                                            <td>2.9%</td>
                                            <td>$76</td>
                                        </tr>
                                        <tr>
                                            <td>Legal</td>
                                            <td>4.2%</td>
                                            <td>$6.50</td>
                                            <td>6.7%</td>
                                            <td>$97</td>
                                        </tr>
                                        <tr>
                                            <td>Home Services</td>
                                            <td>4.8%</td>
                                            <td>$3.00</td>
                                            <td>7.2%</td>
                                            <td>$42</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="performance-scorecard">
                            <h4>Creating Performance Scorecards</h4>
                            
                            <div class="scorecard-example">
                                <h5>The Relative Performance Index (RPI)</h5>
                                <div class="formula-box">
                                    <h6>RPI = (Your Metric / Industry Benchmark) × 100</h6>
                                </div>
                                
                                <div class="scorecard-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Metric</th>
                                                <th>Yours</th>
                                                <th>Benchmark</th>
                                                <th>RPI</th>
                                                <th>Grade</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>CTR</td>
                                                <td>3.8%</td>
                                                <td>3.2%</td>
                                                <td>119</td>
                                                <td class="grade-a">A</td>
                                            </tr>
                                            <tr>
                                                <td>CPC</td>
                                                <td>$2.50</td>
                                                <td>$2.20</td>
                                                <td>88</td>
                                                <td class="grade-b">B-</td>
                                            </tr>
                                            <tr>
                                                <td>CVR</td>
                                                <td>2.1%</td>
                                                <td>2.9%</td>
                                                <td>72</td>
                                                <td class="grade-d">D</td>
                                            </tr>
                                            <tr>
                                                <td>CPA</td>
                                                <td>$119</td>
                                                <td>$76</td>
                                                <td>64</td>
                                                <td class="grade-f">F</td>
                                            </tr>
                                            <tr>
                                                <td>ROAS</td>
                                                <td>3.2:1</td>
                                                <td>4:1</td>
                                                <td>80</td>
                                                <td class="grade-c">C</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                
                                <div class="priority-action">
                                    <h6>Priority: Fix CVR (worst performer)</h6>
                                </div>
                            </div>
                        </div>

                        <div class="day-exercise">
                            <h4>Day 13 Exercise</h4>
                            <div class="exercise-scenario">
                                <h5>Benchmarking Analysis Project</h5>
                                <p><strong>Your Account Data:</strong></p>
                                <ul>
                                    <li>Industry: B2B Software</li>
                                    <li>CTR: 2.1%</li>
                                    <li>CPC: $4.20</li>
                                    <li>CVR: 2.2%</li>
                                    <li>CPA: $191</li>
                                    <li>Monthly Spend: $15,000</li>
                                </ul>
                                
                                <p><strong>Industry Benchmarks:</strong></p>
                                <ul>
                                    <li>CTR: 2.5%</li>
                                    <li>CPC: $3.50</li>
                                    <li>CVR: 2.8%</li>
                                    <li>CPA: $125</li>
                                </ul>
                                
                                <div class="exercise-tasks">
                                    <h5>Tasks:</h5>
                                    <ol>
                                        <li>Calculate RPI for each metric</li>
                                        <li>Grade performance (A-F)</li>
                                        <li>Identify biggest opportunity</li>
                                        <li>Calculate potential monthly savings at benchmark</li>
                                    </ol>
                                </div>

                                <div class="exercise-solutions">
                                    <h5>Solutions:</h5>
                                    <ul>
                                        <li>RPI: CTR=84, CPC=83, CVR=79, CPA=65</li>
                                        <li>Grades: CTR=C, CPC=C, CVR=D, CPA=F</li>
                                        <li>Biggest opportunity: CPA (furthest from benchmark)</li>
                                        <li>Savings: ($191-$125) × 78 conversions = $5,148/month</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="day-section">
                    <h3><i class="fas fa-calendar-day"></i> Day 14: Market Dynamics & Seasonal Patterns</h3>
                    <div class="lesson-content">
                        <h4>Learning Objectives</h4>
                        <ul>
                            <li>Identify and predict seasonal trends</li>
                            <li>Adjust strategies for market dynamics</li>
                            <li>Build seasonal forecasting models</li>
                        </ul>

                        <h4>Understanding Seasonal Patterns</h4>
                        
                        <div class="seasonal-patterns">
                            <div class="seasonal-index">
                                <h5>Industry Seasonal Indexes</h5>
                                <p><strong>Monthly Performance Index (100 = Average):</strong></p>
                                
                                <div class="seasonal-chart">
                                    <div class="industry-seasonal">
                                        <h6>E-commerce:</h6>
                                        <div class="monthly-indices">
                                            <span>Jan: 85</span>
                                            <span>Feb: 80</span>
                                            <span>Mar: 95</span>
                                            <span>Apr: 100</span>
                                            <span>May: 105</span>
                                            <span>Jun: 95</span>
                                            <span>Jul: 90</span>
                                            <span>Aug: 95</span>
                                            <span>Sep: 100</span>
                                            <span>Oct: 110</span>
                                            <span>Nov: 140</span>
                                            <span>Dec: 180</span>
                                        </div>
                                    </div>
                                    
                                    <div class="industry-seasonal">
                                        <h6>B2B Software:</h6>
                                        <div class="monthly-indices">
                                            <span>Jan: 110</span>
                                            <span>Feb: 115</span>
                                            <span>Mar: 105</span>
                                            <span>Apr: 100</span>
                                            <span>May: 95</span>
                                            <span>Jun: 90</span>
                                            <span>Jul: 80</span>
                                            <span>Aug: 75</span>
                                            <span>Sep: 105</span>
                                            <span>Oct: 110</span>
                                            <span>Nov: 100</span>
                                            <span>Dec: 85</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="seasonal-strategy">
                            <h4>Seasonal Strategy Playbook</h4>
                            
                            <div class="strategy-timeline">
                                <div class="timeline-phase">
                                    <h5>1. Pre-Season Preparation (T-60 days)</h5>
                                    <div class="timeline-tasks">
                                        <div class="task-week">
                                            <h6>8 Weeks Before Peak:</h6>
                                            <ul>
                                                <li>Analyze previous year's data</li>
                                                <li>Identify winning keywords/ads</li>
                                                <li>Budget allocation planning</li>
                                                <li>Creative asset preparation</li>
                                            </ul>
                                        </div>
                                        <div class="task-week">
                                            <h6>6 Weeks Before:</h6>
                                            <ul>
                                                <li>Launch early bird campaigns</li>
                                                <li>Test new ad variations</li>
                                                <li>Optimize landing pages</li>
                                                <li>Build remarketing lists</li>
                                            </ul>
                                        </div>
                                        <div class="task-week">
                                            <h6>4 Weeks Before:</h6>
                                            <ul>
                                                <li>Increase budgets gradually</li>
                                                <li>Expand keyword lists</li>
                                                <li>Launch countdown ads</li>
                                                <li>Set up automation rules</li>
                                            </ul>
                                        </div>
                                        <div class="task-week">
                                            <h6>2 Weeks Before:</h6>
                                            <ul>
                                                <li>Final bid adjustments</li>
                                                <li>Competitor monitoring</li>
                                                <li>Inventory/capacity check</li>
                                                <li>Emergency response plan</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="day-exercise">
                            <h4>Day 14 Exercise</h4>
                            <div class="exercise-scenario">
                                <h5>Seasonal Planning Challenge</h5>
                                <p><strong>Your Data:</strong></p>
                                <ul>
                                    <li>Business: Tax Preparation Service</li>
                                    <li>Peak Season: January-April (70% of revenue)</li>
                                    <li>Current Month: December</li>
                                    <li>Last Year Peak CPA: $45</li>
                                    <li>Off-Season CPA: $85</li>
                                </ul>
                                
                                <p><strong>Market Intelligence:</strong></p>
                                <ul>
                                    <li>Major competitor entering market</li>
                                    <li>New tax law changes driving searches</li>
                                    <li>Mobile searches up 40% YoY</li>
                                </ul>
                                
                                <div class="exercise-tasks">
                                    <h5>Tasks:</h5>
                                    <ol>
                                        <li>Create month-by-month budget allocation</li>
                                        <li>List 3 pre-season tactics to implement</li>
                                        <li>Calculate expected CPA with competition</li>
                                        <li>Design mobile-specific strategy</li>
                                    </ol>
                                </div>

                                <div class="exercise-solutions">
                                    <h5>Sample Solution:</h5>
                                    <ul>
                                        <li>Budget: Dec 10%, Jan 20%, Feb 25%, Mar 30%, Apr 15%</li>
                                        <li>Tactics: Build tax law content, create calculators, early bird offers</li>
                                        <li>Expected CPA: $45 × 1.15 (competition) = $52</li>
                                        <li>Mobile: Tax refund calculator app campaigns, simplified forms</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="day-section">
                    <h3><i class="fas fa-calendar-day"></i> Day 15: Module 3 Checkpoint</h3>
                    <div class="lesson-content">
                        <h4>Knowledge Assessment Quiz</h4>
                        
                        <div class="quiz-section">
                            <div class="quiz-question">
                                <h5>Question 1: What does a 70% overlap rate with a competitor indicate?</h5>
                                <div class="quiz-options">
                                    <label><input type="radio" name="q1" value="a"> A) They're not a real threat</label>
                                    <label><input type="radio" name="q1" value="b"> B) You're competing for the same queries</label>
                                    <label><input type="radio" name="q1" value="c"> C) You should reduce budgets</label>
                                    <label><input type="radio" name="q1" value="d"> D) They have better Quality Score</label>
                                </div>
                            </div>
                            <div class="quiz-question">
                                <h5>Question 2: If lost IS (budget) > lost IS (rank), you should:</h5>
                                <div class="quiz-options">
                                    <label><input type="radio" name="q2" value="a"> A) Improve Quality Score</label>
                                    <label><input type="radio" name="q2" value="b"> B) Decrease bids</label>
                                    <label><input type="radio" name="q2" value="c"> C) Increase budget</label>
                                    <label><input type="radio" name="q2" value="d"> D) Pause campaigns</label>
                                </div>
                            </div>
                            <div class="quiz-question">
                                <h5>Question 3: Your CTR is 2.5% and the industry benchmark is 3.2%. Your RPI is:</h5>
                                <div class="quiz-options">
                                    <label><input type="radio" name="q3" value="a"> A) 128</label>
                                    <label><input type="radio" name="q3" value="b"> B) 97</label>
                                    <label><input type="radio" name="q3" value="c"> C) 78</label>
                                    <label><input type="radio" name="q3" value="d"> D) 156</label>
                                </div>
                            </div>
                            <div class="quiz-question">
                                <h5>Question 4: Peak season is approaching. When should you start preparation?</h5>
                                <div class="quiz-options">
                                    <label><input type="radio" name="q4" value="a"> A) 1 week before</label>
                                    <label><input type="radio" name="q4" value="b"> B) 2 weeks before</label>
                                    <label><input type="radio" name="q4" value="c"> C) 4 weeks before</label>
                                    <label><input type="radio" name="q4" value="d"> D) 8 weeks before</label>
                                </div>
                            </div>
                            <div class="quiz-question">
                                <h5>Question 5: A new competitor appears with 15% impression share. Your response should be:</h5>
                                <div class="quiz-options">
                                    <label><input type="radio" name="q5" value="a"> A) Immediately increase all bids</label>
                                    <label><input type="radio" name="q5" value="b"> B) Monitor for 2 weeks first</label>
                                    <label><input type="radio" name="q5" value="c"> C) Reduce budgets</label>
                                    <label><input type="radio" name="q5" value="d"> D) Ignore them</label>
                                </div>
                            </div>
                        </div>

                        <h4>Module 3 Skills Checklist</h4>
                        <div class="completion-checklist">
                            <label><input type="checkbox"> Mastered all Auction Insights metrics</label>
                            <label><input type="checkbox"> Can calculate true market share</label>
                            <label><input type="checkbox"> Understand competitive response strategies</label>
                            <label><input type="checkbox"> Know industry benchmarks for your verticals</label>
                            <label><input type="checkbox"> Can identify seasonal patterns</label>
                            <label><input type="checkbox"> Built competitive tracking systems</label>
                            <label><input type="checkbox"> Created seasonal playbooks</label>
                            <label><input type="checkbox"> Developed market dynamics responses</label>
                        </div>

                        <h4>Competitive Intelligence Formulas</h4>
                        <div class="intelligence-formulas">
                            <div class="formula-section">
                                <h5>Key Calculations:</h5>
                                <div class="formula-grid">
                                    <div class="formula-item">
                                        <code>Market Share = Your IS / Total Market IS</code>
                                    </div>
                                    <div class="formula-item">
                                        <code>Competitive Threat Score = (Overlap Rate × 0.4) + (Position Above Rate × 0.3) + (IS Growth Rate × 0.3)</code>
                                    </div>
                                    <div class="formula-item">
                                        <code>Seasonal Index = Period Performance / Annual Average × 100</code>
                                    </div>
                                    <div class="formula-item">
                                        <code>Benchmark Performance Score = (Your Metric / Industry Benchmark) × 100</code>
                                    </div>
                                    <div class="formula-item">
                                        <code>Competitive Gap = Best Competitor Performance - Your Performance</code>
                                    </div>
                                    <div class="formula-item">
                                        <code>Share of Voice = Your Impressions / Total Market Impressions</code>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        4: `
            <div class="module-content">
                <div class="module-intro">
                    <h2>Module 4: Advanced Reporting & Visualization</h2>
                    <p class="module-description">Transform data into actionable insights with automated reporting systems, Google Ads Scripts, and compelling data storytelling.</p>
                    <div class="module-meta">
                        <span><i class="fas fa-clock"></i> Duration: 5 Days (Week 4)</span>
                        <span><i class="fas fa-book"></i> 30 minutes daily</span>
                        <span><i class="fas fa-certificate"></i> Professional Certification</span>
                    </div>
                </div>

                <div class="day-section">
                    <h3><i class="fas fa-calendar-day"></i> Day 16: Automated Reporting Systems</h3>
                    <div class="lesson-content">
                        <h4>Learning Objectives</h4>
                        <ul>
                            <li>Design efficient reporting workflows</li>
                            <li>Build automated alert systems</li>
                            <li>Create scalable reporting frameworks</li>
                        </ul>

                        <h4>The Modern Reporting Stack</h4>
                        
                        <div class="reporting-architecture">
                            <h5>Data Flow Architecture</h5>
                            <div class="architecture-diagram">
                                <div class="flow-step">
                                    <div class="step-header">Google Ads Data Sources</div>
                                    <div class="step-content">
                                        <div class="data-layer">
                                            <h6>Raw Data Layer</h6>
                                            <ul>
                                                <li>API Exports</li>
                                                <li>Scripts</li>
                                                <li>Scheduled Reports</li>
                                            </ul>
                                        </div>
                                        <div class="arrow">↓</div>
                                        <div class="processing-layer">
                                            <h6>Processing Layer</h6>
                                            <ul>
                                                <li>Google Sheets</li>
                                                <li>BigQuery</li>
                                                <li>Scripts</li>
                                                <li>Calculations</li>
                                            </ul>
                                        </div>
                                        <div class="arrow">↓</div>
                                        <div class="visualization-layer">
                                            <h6>Visualization Layer</h6>
                                            <ul>
                                                <li>Data Studio</li>
                                                <li>Sheets Charts</li>
                                                <li>Email Reports</li>
                                                <li>Dashboards</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h5>Automation Hierarchy</h5>
                            <div class="automation-levels">
                                <div class="level">
                                    <h6>Level 1: Basic Automation (Daily)</h6>
                                    <ul>
                                        <li>Scheduled email reports</li>
                                        <li>Basic performance alerts</li>
                                        <li>Simple dashboard updates</li>
                                    </ul>
                                </div>
                                <div class="level">
                                    <h6>Level 2: Intermediate (Hourly)</h6>
                                    <ul>
                                        <li>Real-time bid adjustments</li>
                                        <li>Budget pacing monitors</li>
                                        <li>Competitive tracking</li>
                                    </ul>
                                </div>
                                <div class="level">
                                    <h6>Level 3: Advanced (Real-time)</h6>
                                    <ul>
                                        <li>Anomaly detection</li>
                                        <li>Predictive alerts</li>
                                        <li>Multi-source integration</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <h4>Building Your First Automated Report</h4>
                        
                        <div class="report-template">
                            <h5>Report Planning Template</h5>
                            <div class="template-grid">
                                <div class="template-item">
                                    <strong>Audience:</strong> Marketing Manager
                                </div>
                                <div class="template-item">
                                    <strong>Frequency:</strong> Daily, 9 AM
                                </div>
                                <div class="template-item">
                                    <strong>Key Metrics:</strong>
                                    <ul>
                                        <li>Performance vs. Yesterday</li>
                                        <li>Performance vs. Last Week</li>
                                        <li>Budget Pacing</li>
                                        <li>Top 5 Campaigns</li>
                                        <li>Alert Conditions</li>
                                    </ul>
                                </div>
                                <div class="template-item">
                                    <strong>Format:</strong> Email with embedded charts
                                </div>
                                <div class="template-item">
                                    <strong>Time to Build:</strong> 2 hours
                                </div>
                                <div class="template-item">
                                    <strong>Maintenance:</strong> 15 min/month
                                </div>
                            </div>
                        </div>

                        <h4>Google Ads Script Foundation</h4>
                        
                        <div class="code-block">
                            <h5>Daily Performance Email Report</h5>
                            <pre><code>// Daily Performance Email Report
function dailyPerformanceReport() {
  // Configuration
  var EMAIL_RECIPIENTS = 'manager@company.com';
  var ACCOUNT_NAME = AdWordsApp.currentAccount().getName();
  
  // Get date ranges
  var yesterday = getDateStringInPast(1);
  var twoDaysAgo = getDateStringInPast(2);
  var lastWeek = getDateStringInPast(8);
  
  // Fetch performance data
  var stats = {
    yesterday: getAccountStats(yesterday, yesterday),
    dayBefore: getAccountStats(twoDaysAgo, twoDaysAgo),
    lastWeek: getAccountStats(lastWeek, lastWeek)
  };
  
  // Calculate changes
  var changes = {
    dailySpend: percentChange(stats.yesterday.cost, stats.dayBefore.cost),
    dailyConversions: percentChange(stats.yesterday.conversions, stats.dayBefore.conversions),
    weeklyCPA: percentChange(stats.yesterday.cpa, stats.lastWeek.cpa)
  };
  
  // Build email HTML
  var html = buildEmailTemplate(stats, changes);
  
  // Send report
  MailApp.sendEmail({
    to: EMAIL_RECIPIENTS,
    subject: ACCOUNT_NAME + ' - Daily Report - ' + yesterday,
    htmlBody: html
  });
}</code></pre>
                        </div>

                        <h4>Advanced Reporting Patterns</h4>
                        
                        <div class="reporting-patterns">
                            <div class="pattern">
                                <h5>The Executive Dashboard</h5>
                                <div class="dashboard-layout">
                                    <div class="dashboard-section">
                                        <h6>EXECUTIVE SUMMARY</h6>
                                        <div class="kpi-grid">
                                            <div class="kpi-card">
                                                <span class="kpi-label">Total Spend</span>
                                                <span class="kpi-value">$45,231</span>
                                                <span class="kpi-change positive">▲ 12%</span>
                                            </div>
                                            <div class="kpi-card">
                                                <span class="kpi-label">Conversions</span>
                                                <span class="kpi-value">1,234</span>
                                                <span class="kpi-change negative">▼ 5%</span>
                                            </div>
                                            <div class="kpi-card">
                                                <span class="kpi-label">ROAS</span>
                                                <span class="kpi-value">4.2:1</span>
                                                <span class="kpi-change positive">▲ 8%</span>
                                            </div>
                                            <div class="kpi-card">
                                                <span class="kpi-label">CPA</span>
                                                <span class="kpi-value">$36.65</span>
                                                <span class="kpi-change positive">▲ 15%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="exercise-section">
                            <h4>Day 16 Exercise</h4>
                            <div class="exercise-content">
                                <h5>Automated Report Design Challenge</h5>
                                <p><strong>Scenario:</strong> You manage a $50k/month account with:</p>
                                <ul>
                                    <li>5 campaigns (Brand, Generic, Shopping, Display, YouTube)</li>
                                    <li>Key stakeholders: CMO (monthly), Marketing Manager (weekly), You (daily)</li>
                                    <li>Main KPIs: ROAS, CPA, Revenue</li>
                                </ul>
                                <p><strong>Tasks:</strong></p>
                                <ol>
                                    <li>Design 3-tier reporting structure</li>
                                    <li>List specific metrics for each tier</li>
                                    <li>Choose distribution method for each</li>
                                    <li>Write pseudo-code for one automation</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="day-section">
                    <h3><i class="fas fa-calendar-day"></i> Day 17: Google Ads Scripts Mastery</h3>
                    <div class="lesson-content">
                        <h4>Learning Objectives</h4>
                        <ul>
                            <li>Master advanced Google Ads Scripts</li>
                            <li>Build custom analysis tools</li>
                            <li>Create maintenance automation</li>
                        </ul>

                        <h4>Advanced Script Patterns</h4>
                        
                        <div class="script-patterns">
                            <div class="pattern">
                                <h5>The MCC Multi-Account Analyzer</h5>
                                <div class="code-block">
                                    <pre><code>// Analyze performance across multiple accounts
function mccPerformanceAnalyzer() {
  var accountIterator = MccApp.accounts()
    .withCondition('Impressions > 0')
    .forDateRange('LAST_30_DAYS')
    .get();
  
  var accountData = [];
  
  while (accountIterator.hasNext()) {
    var account = accountIterator.next();
    MccApp.select(account);
    
    var stats = account.getStatsFor('LAST_30_DAYS');
    accountData.push({
      name: account.getName(),
      id: account.getCustomerId(),
      spend: stats.getCost(),
      conversions: stats.getConversions(),
      cpa: stats.getCost() / stats.getConversions(),
      roas: stats.getConversionValue() / stats.getCost()
    });
  }
  
  // Sort by opportunity
  accountData.sort(function(a, b) {
    return b.spend - a.spend;
  });
  
  // Generate insights
  var insights = generateAccountInsights(accountData);
  
  // Create report
  createMccReport(accountData, insights);
}</code></pre>
                                </div>
                            </div>

                            <div class="pattern">
                                <h5>Advanced Bid Management</h5>
                                <div class="code-block">
                                    <pre><code>// Dynamic bid adjustments based on performance
function advancedBidManager() {
  // Configuration
  var LOOKBACK_DAYS = 30;
  var MIN_CONVERSIONS = 5;
  var TARGET_CPA = 50;
  
  var keywords = AdWordsApp.keywords()
    .withCondition('Status = ENABLED')
    .withCondition('CampaignStatus = ENABLED')
    .withCondition('AdGroupStatus = ENABLED')
    .forDateRange('LAST_' + LOOKBACK_DAYS + '_DAYS')
    .withCondition('Conversions > ' + MIN_CONVERSIONS)
    .get();
  
  while (keywords.hasNext()) {
    var keyword = keywords.next();
    var stats = keyword.getStatsFor('LAST_' + LOOKBACK_DAYS + '_DAYS');
    var currentBid = keyword.bidding().getCpc();
    var cpa = stats.getCost() / stats.getConversions();
    
    // Calculate optimal bid
    var bidModifier = TARGET_CPA / cpa;
    var newBid = currentBid * bidModifier;
    
    // Apply constraints
    newBid = Math.max(0.1, Math.min(newBid, currentBid * 1.25));
    
    // Set new bid
    keyword.bidding().setCpc(newBid);
  }
}</code></pre>
                                </div>
                            </div>
                        </div>

                        <div class="exercise-section">
                            <h4>Day 17 Exercise</h4>
                            <div class="exercise-content">
                                <h5>Script Development Challenge</h5>
                                <p><strong>Task:</strong> Create a script that:</p>
                                <ol>
                                    <li>Identifies keywords with declining performance</li>
                                    <li>Calculates the trend over 4 weeks</li>
                                    <li>Suggests bid adjustments</li>
                                    <li>Sends an email summary</li>
                                </ol>
                                <p><strong>Requirements:</strong></p>
                                <ul>
                                    <li>Compare week-over-week performance</li>
                                    <li>Flag keywords with 3+ weeks of decline</li>
                                    <li>Calculate optimal bid based on target CPA</li>
                                    <li>Format results in an HTML table</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="day-section">
                    <h3><i class="fas fa-calendar-day"></i> Day 18: Data Studio Deep Dive</h3>
                    <div class="lesson-content">
                        <h4>Learning Objectives</h4>
                        <ul>
                            <li>Master Data Studio for Google Ads</li>
                            <li>Build interactive dashboards</li>
                            <li>Create custom visualizations</li>
                        </ul>

                        <h4>Data Studio Architecture</h4>
                        
                        <div class="datastudio-architecture">
                            <h5>Data Source Configuration</h5>
                            <div class="connector-setup">
                                <div class="setup-section">
                                    <h6>Standard Fields Available:</h6>
                                    <div class="field-categories">
                                        <div class="category">
                                            <strong>Campaign</strong>
                                            <ul>
                                                <li>Campaign name</li>
                                                <li>Campaign ID</li>
                                                <li>Campaign status</li>
                                                <li>Campaign type</li>
                                            </ul>
                                        </div>
                                        <div class="category">
                                            <strong>Metrics</strong>
                                            <ul>
                                                <li>Impressions</li>
                                                <li>Clicks</li>
                                                <li>Cost</li>
                                                <li>Conversions</li>
                                                <li>Conversion value</li>
                                            </ul>
                                        </div>
                                        <div class="category">
                                            <strong>Segments</strong>
                                            <ul>
                                                <li>Date</li>
                                                <li>Device</li>
                                                <li>Network</li>
                                                <li>Hour of day</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h4>Building Interactive Dashboards</h4>
                        
                        <div class="dashboard-design">
                            <h5>KPI Scorecard Design</h5>
                            <div class="scorecard-config">
                                <div class="config-item">
                                    <strong>Metric:</strong> ROAS
                                </div>
                                <div class="config-item">
                                    <strong>Comparison:</strong> Previous Period
                                </div>
                                <div class="config-item">
                                    <strong>Conditional Formatting:</strong>
                                    <ul>
                                        <li>> 4.0 → Green (#0F9D58)</li>
                                        <li>3.0-4.0 → Yellow (#F4B400)</li>
                                        <li>< 3.0 → Red (#EA4335)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="exercise-section">
                            <h4>Day 18 Exercise</h4>
                            <div class="exercise-content">
                                <h5>Data Studio Dashboard Challenge</h5>
                                <p><strong>Task:</strong> Design a dashboard for:</p>
                                <ul>
                                    <li>Audience: Marketing Director</li>
                                    <li>Update Frequency: Daily</li>
                                    <li>Key Decisions: Budget allocation, campaign optimization</li>
                                    <li>Data Sources: Google Ads, Google Analytics</li>
                                </ul>
                                <p><strong>Requirements:</strong></p>
                                <ol>
                                    <li>Sketch the layout (2 pages max)</li>
                                    <li>List 5 calculated fields needed</li>
                                    <li>Choose 4 visualization types</li>
                                    <li>Define 3 interactive filters</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="day-section">
                    <h3><i class="fas fa-calendar-day"></i> Day 19: Storytelling with Data</h3>
                    <div class="lesson-content">
                        <h4>Learning Objectives</h4>
                        <ul>
                            <li>Transform data into compelling narratives</li>
                            <li>Design for different audiences</li>
                            <li>Master presentation techniques</li>
                        </ul>

                        <h4>The Data Storytelling Framework</h4>
                        
                        <div class="storytelling-framework">
                            <div class="story-structure">
                                <h5>The Three-Act Structure</h5>
                                <div class="acts">
                                    <div class="act">
                                        <h6>Act 1: Context (The Setup)</h6>
                                        <ul>
                                            <li>Current situation</li>
                                            <li>Why it matters</li>
                                            <li>What's at stake</li>
                                            <li>Key characters (metrics)</li>
                                        </ul>
                                    </div>
                                    <div class="act">
                                        <h6>Act 2: Conflict (The Challenge)</h6>
                                        <ul>
                                            <li>What changed</li>
                                            <li>Problems discovered</li>
                                            <li>Opportunities missed</li>
                                            <li>Tension building</li>
                                        </ul>
                                    </div>
                                    <div class="act">
                                        <h6>Act 3: Resolution (The Solution)</h6>
                                        <ul>
                                            <li>Recommendations</li>
                                            <li>Expected outcomes</li>
                                            <li>Next steps</li>
                                            <li>Call to action</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h4>Visual Storytelling Principles</h4>
                        
                        <div class="visual-principles">
                            <div class="principle">
                                <h5>The Visual Hierarchy</h5>
                                <div class="hierarchy-example">
                                    <div class="hierarchy-level primary">
                                        <span>Primary Message (Largest)</span>
                                        <div class="example">"ROAS Increased 47%" (72pt)</div>
                                    </div>
                                    <div class="hierarchy-level secondary">
                                        <span>Supporting Data (Medium)</span>
                                        <div class="example">From 2.8:1 to 4.1:1 (36pt)</div>
                                    </div>
                                    <div class="hierarchy-level tertiary">
                                        <span>Context/Details (Smallest)</span>
                                        <div class="example">After implementing smart bidding (18pt)</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="exercise-section">
                            <h4>Day 19 Exercise</h4>
                            <div class="exercise-content">
                                <h5>Data Story Creation Challenge</h5>
                                <p><strong>Scenario:</strong> Last month's data shows:</p>
                                <ul>
                                    <li>Overall ROAS dropped from 4.5:1 to 3.8:1</li>
                                    <li>Mobile conversions increased 60%</li>
                                    <li>Desktop conversions decreased 20%</li>
                                    <li>New competitor entered with aggressive pricing</li>
                                </ul>
                                <p><strong>Your Task:</strong></p>
                                <ol>
                                    <li>Create a 3-slide story for the CMO</li>
                                    <li>Choose one chart type per slide</li>
                                    <li>Write the headline for each slide</li>
                                    <li>Draft speaker notes (50 words/slide)</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="day-section">
                    <h3><i class="fas fa-calendar-day"></i> Day 20: Module 4 Checkpoint</h3>
                    <div class="lesson-content">
                        <h4>Knowledge Assessment Quiz</h4>
                        
                        <div class="quiz-section">
                            <div class="quiz-question">
                                <h5>Question 1: What's the optimal email report frequency for a Marketing Director?</h5>
                                <div class="quiz-options">
                                    <label class="quiz-option">
                                        <input type="radio" name="q1" value="a">
                                        <span class="option-text">a) Real-time alerts</span>
                                    </label>
                                    <label class="quiz-option">
                                        <input type="radio" name="q1" value="b">
                                        <span class="option-text">b) Daily summaries</span>
                                    </label>
                                    <label class="quiz-option">
                                        <input type="radio" name="q1" value="c">
                                        <span class="option-text">c) Weekly performance reviews</span>
                                    </label>
                                    <label class="quiz-option">
                                        <input type="radio" name="q1" value="d">
                                        <span class="option-text">d) Monthly deep dives</span>
                                    </label>
                                </div>
                            </div>

                            <div class="quiz-question">
                                <h5>Question 2: In Google Ads Scripts, what's the best way to handle large data sets?</h5>
                                <div class="quiz-options">
                                    <label class="quiz-option">
                                        <input type="radio" name="q2" value="a">
                                        <span class="option-text">a) Process everything at once</span>
                                    </label>
                                    <label class="quiz-option">
                                        <input type="radio" name="q2" value="b">
                                        <span class="option-text">b) Use batch processing</span>
                                    </label>
                                    <label class="quiz-option">
                                        <input type="radio" name="q2" value="c">
                                        <span class="option-text">c) Increase script timeout</span>
                                    </label>
                                    <label class="quiz-option">
                                        <input type="radio" name="q2" value="d">
                                        <span class="option-text">d) Use multiple scripts</span>
                                    </label>
                                </div>
                            </div>

                            <div class="quiz-question">
                                <h5>Question 3: Which Data Studio feature helps with performance?</h5>
                                <div class="quiz-options">
                                    <label class="quiz-option">
                                        <input type="radio" name="q3" value="a">
                                        <span class="option-text">a) Complex calculations</span>
                                    </label>
                                    <label class="quiz-option">
                                        <input type="radio" name="q3" value="b">
                                        <span class="option-text">b) Extracted data sources</span>
                                    </label>
                                    <label class="quiz-option">
                                        <input type="radio" name="q3" value="c">
                                        <span class="option-text">c) Multiple data blends</span>
                                    </label>
                                    <label class="quiz-option">
                                        <input type="radio" name="q3" value="d">
                                        <span class="option-text">d) Detailed tables</span>
                                    </label>
                                </div>
                            </div>

                            <div class="quiz-question">
                                <h5>Question 4: For C-suite presentations, the ideal length is:</h5>
                                <div class="quiz-options">
                                    <label class="quiz-option">
                                        <input type="radio" name="q4" value="a">
                                        <span class="option-text">a) 30-45 minutes</span>
                                    </label>
                                    <label class="quiz-option">
                                        <input type="radio" name="q4" value="b">
                                        <span class="option-text">b) 15-20 minutes</span>
                                    </label>
                                    <label class="quiz-option">
                                        <input type="radio" name="q4" value="c">
                                        <span class="option-text">c) 5-10 minutes</span>
                                    </label>
                                    <label class="quiz-option">
                                        <input type="radio" name="q4" value="d">
                                        <span class="option-text">d) 3-5 minutes</span>
                                    </label>
                                </div>
                            </div>

                            <div class="quiz-question">
                                <h5>Question 5: The best chart for showing campaign performance trends is:</h5>
                                <div class="quiz-options">
                                    <label class="quiz-option">
                                        <input type="radio" name="q5" value="a">
                                        <span class="option-text">a) Pie chart</span>
                                    </label>
                                    <label class="quiz-option">
                                        <input type="radio" name="q5" value="b">
                                        <span class="option-text">b) Bar chart</span>
                                    </label>
                                    <label class="quiz-option">
                                        <input type="radio" name="q5" value="c">
                                        <span class="option-text">c) Line chart</span>
                                    </label>
                                    <label class="quiz-option">
                                        <input type="radio" name="q5" value="d">
                                        <span class="option-text">d) Scatter plot</span>
                                    </label>
                                </div>
                            </div>

                            <div class="quiz-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: 0%"></div>
                                </div>
                                <span class="progress-text">0/5 questions answered</span>
                            </div>

                            <div class="quiz-results" style="display: none;">
                                <h4>Quiz Results</h4>
                                <div class="score-display">
                                    <span class="score-text">Score: <span class="score-value">0</span>/5</span>
                                    <span class="score-percentage">(<span class="percentage-value">0</span>%)</span>
                                </div>
                                <div class="feedback-message"></div>
                                <button class="btn btn-primary retake-quiz">Retake Quiz</button>
                            </div>
                        </div>

                        <div class="practical-project">
                            <h4>Practical Project</h4>
                            <div class="project-content">
                                <h5>Build a Complete Reporting System</h5>
                                <p><strong>Scenario:</strong> You're tasked with creating a reporting system for a $100k/month e-commerce account.</p>
                                
                                <div class="stakeholders">
                                    <h6>Stakeholders:</h6>
                                    <ul>
                                        <li>CEO: Monthly business review</li>
                                        <li>CMO: Weekly performance update</li>
                                        <li>Marketing Manager: Daily operations</li>
                                        <li>Your team: Real-time monitoring</li>
                                    </ul>
                                </div>

                                <div class="project-requirements">
                                    <h6>Requirements:</h6>
                                    <ol>
                                        <li><strong>Automation Plan (10 minutes)</strong>
                                            <ul>
                                                <li>List 3 Google Ads Scripts needed</li>
                                                <li>Define trigger schedule for each</li>
                                                <li>Estimate development time</li>
                                            </ul>
                                        </li>
                                        <li><strong>Dashboard Design (10 minutes)</strong>
                                            <ul>
                                                <li>Sketch Data Studio layout</li>
                                                <li>List 10 key metrics to track</li>
                                                <li>Design 3 interactive filters</li>
                                            </ul>
                                        </li>
                                        <li><strong>Presentation Template (5 minutes)</strong>
                                            <ul>
                                                <li>Create slide titles for monthly review</li>
                                                <li>Choose visualization for each slide</li>
                                                <li>Write executive summary</li>
                                            </ul>
                                        </li>
                                        <li><strong>Communication Plan (5 minutes)</strong>
                                            <ul>
                                                <li>Define report distribution matrix</li>
                                                <li>Set alert thresholds</li>
                                                <li>Create escalation process</li>
                                            </ul>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>

                        <div class="skills-checklist">
                            <h4>Module 4 Skills Checklist</h4>
                            <div class="checklist-items">
                                <label class="checklist-item">
                                    <input type="checkbox">
                                    <span>Can build automated email reports</span>
                                </label>
                                <label class="checklist-item">
                                    <input type="checkbox">
                                    <span>Understand Google Ads Scripts architecture</span>
                                </label>
                                <label class="checklist-item">
                                    <input type="checkbox">
                                    <span>Create Data Studio dashboards</span>
                                </label>
                                <label class="checklist-item">
                                    <input type="checkbox">
                                    <span>Design for different audiences</span>
                                </label>
                                <label class="checklist-item">
                                    <input type="checkbox">
                                    <span>Tell compelling data stories</span>
                                </label>
                                <label class="checklist-item">
                                    <input type="checkbox">
                                    <span>Choose appropriate visualizations</span>
                                </label>
                                <label class="checklist-item">
                                    <input type="checkbox">
                                    <span>Write actionable recommendations</span>
                                </label>
                                <label class="checklist-item">
                                    <input type="checkbox">
                                    <span>Present complex data simply</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="module-resources">
                    <h3><i class="fas fa-book"></i> Module Resources</h3>
                    <div class="resources-grid">
                        <div class="resource-category">
                            <h4>Scripts Library</h4>
                            <ul>
                                <li>Complete Automation Suite</li>
                                <li>Data Studio Connectors</li>
                                <li>Presentation Templates</li>
                            </ul>
                        </div>
                        <div class="resource-category">
                            <h4>Learning Resources</h4>
                            <ul>
                                <li>Google Ads Scripts Tutorials</li>
                                <li>Data Studio Course</li>
                                <li>Data Visualization Best Practices</li>
                            </ul>
                        </div>
                        <div class="resource-category">
                            <h4>Tools & Resources</h4>
                            <ul>
                                <li>Development Tools</li>
                                <li>Design Resources</li>
                                <li>Template Libraries</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `,
        5: `
            <div class="module-content">
                <div class="module-intro">
                    <h2>Module 5: Optimization Strategies Based on Analysis</h2>
                    <p class="module-description">Turn insights into performance improvements with advanced bid strategies, budget allocation models, and predictive analytics. Master the science of optimization.</p>
                    <div class="module-meta">
                        <span><i class="fas fa-clock"></i> Duration: 5 Days (Week 5)</span>
                        <span><i class="fas fa-book"></i> 30 minutes daily</span>
                        <span><i class="fas fa-certificate"></i> Professional Certification</span>
                    </div>
                </div>

                <div class="day-section">
                    <h3><i class="fas fa-calendar-day"></i> Day 21: Bid Strategy Optimization</h3>
                    <div class="lesson-content">
                        <h4>Learning Objectives</h4>
                        <ul>
                            <li>Understand all bid strategy options</li>
                            <li>Learn when to use each strategy</li>
                            <li>Master bid strategy transitions</li>
                        </ul>

                        <h4>Bid Strategy Decision Framework</h4>
                        
                        <h5>The Strategy Selection Matrix</h5>
                        <div class="strategy-matrix">
                            <p><strong>Campaign Maturity vs. Business Goal:</strong></p>
                            <div class="matrix-table">
                                <table>
                                    <tr>
                                        <th></th>
                                        <th>Awareness</th>
                                        <th>Consideration</th>
                                        <th>Conversion</th>
                                        <th>Revenue</th>
                                    </tr>
                                    <tr>
                                        <td><strong>New Campaign</strong></td>
                                        <td>Max Clicks</td>
                                        <td>Max Clicks</td>
                                        <td>Target CPA</td>
                                        <td>Manual CPC</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Growing</strong></td>
                                        <td>Max Clicks</td>
                                        <td>tCPM</td>
                                        <td>Target CPA</td>
                                        <td>Target ROAS</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Mature</strong></td>
                                        <td>Max Conv.</td>
                                        <td>Max Conv.</td>
                                        <td>Max Conv.</td>
                                        <td>Max Conv. Value</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Optimized</strong></td>
                                        <td>Portfolio</td>
                                        <td>Portfolio</td>
                                        <td>Portfolio</td>
                                        <td>Portfolio</td>
                                    </tr>
                                </table>
                            </div>
                            
                            <p><strong>Decision Factors:</strong></p>
                            <ul>
                                <li>Conversion Volume: Need 30+ conversions/month</li>
                                <li>Data Quality: Accurate conversion tracking</li>
                                <li>Business Model: Lead gen vs. e-commerce</li>
                                <li>Competition: Market dynamics</li>
                            </ul>
                        </div>

                        <h5>Manual vs. Automated Strategies</h5>
                        <div class="strategy-comparison">
                            <div class="manual-strategies">
                                <h6>When to Use Manual CPC:</h6>
                                <ul>
                                    <li>✓ New campaigns (&lt;30 conversions)</li>
                                    <li>✓ Highly volatile markets</li>
                                    <li>✓ Specific position requirements</li>
                                    <li>✓ Limited budget scenarios</li>
                                    <li>✓ Testing new markets/products</li>
                                </ul>
                            </div>
                            
                            <div class="automated-strategies">
                                <h6>When to Use Automated:</h6>
                                <ul>
                                    <li>✓ Stable conversion data (30+/month)</li>
                                    <li>✓ Clear CPA/ROAS targets</li>
                                    <li>✓ Multiple campaigns to manage</li>
                                    <li>✓ Predictable demand patterns</li>
                                    <li>✓ Focus on efficiency over control</li>
                                </ul>
                            </div>
                        </div>

                        <h4>Target CPA Optimization</h4>
                        <div class="tcpa-optimization">
                            <h5>Setting the Right Target:</h5>
                            
                            <div class="tcpa-steps">
                                <div class="step">
                                    <h6>Step 1: Calculate Historical CPA</h6>
                                    <ul>
                                        <li>Last 30 days: $45</li>
                                        <li>Last 90 days: $52</li>
                                        <li>Account average: $48</li>
                                    </ul>
                                </div>
                                
                                <div class="step">
                                    <h6>Step 2: Apply Business Constraints</h6>
                                    <ul>
                                        <li>Profit margin: 40%</li>
                                        <li>Customer LTV: $200</li>
                                        <li>Max acceptable CPA: $80</li>
                                    </ul>
                                </div>
                                
                                <div class="step">
                                    <h6>Step 3: Set Initial Target</h6>
                                    <ul>
                                        <li>Conservative: Historical + 20% = $57</li>
                                        <li>Aggressive: Historical - 10% = $43</li>
                                        <li>Recommended: Start at $55</li>
                                    </ul>
                                </div>
                                
                                <div class="step">
                                    <h6>Step 4: Optimization Timeline</h6>
                                    <ul>
                                        <li>Week 1-2: Let algorithm learn</li>
                                        <li>Week 3-4: Adjust target ±10%</li>
                                        <li>Week 5+: Fine-tune weekly</li>
                                    </ul>
                                </div>
                            </div>
                            
                            <h5>Common Mistakes:</h5>
                            <ul>
                                <li>❌ Setting target too low initially</li>
                                <li>❌ Changing target daily</li>
                                <li>❌ Not allowing learning period</li>
                                <li>❌ Ignoring seasonality</li>
                            </ul>
                        </div>

                        <h4>Target ROAS Mastery</h4>
                        <div class="troas-calculation">
                            <h5>ROAS Target Calculation:</h5>
                            
                            <div class="business-requirements">
                                <h6>Business Requirements:</h6>
                                <ul>
                                    <li>Product cost: 40%</li>
                                    <li>Operating costs: 30%</li>
                                    <li>Profit target: 20%</li>
                                    <li>Marketing budget: 10%</li>
                                </ul>
                            </div>
                            
                            <div class="roas-formulas">
                                <p><strong>Minimum ROAS</strong> = 1 / Marketing % = 10:1</p>
                                <p><strong>Breakeven ROAS</strong> = 1 / Profit Margin = 2.5:1</p>
                                <p><strong>Target ROAS</strong> = Breakeven × Safety = 3.5:1</p>
                            </div>
                            
                            <h5>Dynamic ROAS Targets:</h5>
                            <ul>
                                <li>High-margin products: 2.5:1</li>
                                <li>Low-margin products: 5:1</li>
                                <li>New products: 2:1 (investment)</li>
                                <li>Mature products: 4:1</li>
                                <li>Clearance: 1.5:1</li>
                            </ul>
                        </div>

                        <h4>Real-World Bid Strategy Case Study</h4>
                        <div class="case-study">
                            <h5>Client: B2B SaaS Company</h5>
                            <p><strong>Challenge:</strong> Inconsistent CPA across campaigns</p>
                            
                            <div class="initial-state">
                                <h6>Initial State:</h6>
                                <ul>
                                    <li>5 campaigns on Manual CPC</li>
                                    <li>CPA range: $75-$250</li>
                                    <li>Monthly conversions: 200</li>
                                    <li>Budget: $25,000</li>
                                </ul>
                            </div>
                            
                            <div class="optimization-process">
                                <h6>Optimization Process:</h6>
                                
                                <div class="week-analysis">
                                    <h6>Week 1-2: Data Audit</h6>
                                    <ul>
                                        <li>Brand: 50 conv @ $45 CPA → Keep Manual</li>
                                        <li>Generic: 80 conv @ $125 CPA → tCPA candidate</li>
                                        <li>Competitor: 30 conv @ $200 CPA → tCPA test</li>
                                        <li>Display: 25 conv @ $150 CPA → Max Conv test</li>
                                        <li>Video: 15 conv @ $250 CPA → Pause/rebuild</li>
                                    </ul>
                                </div>
                                
                                <div class="week-implementation">
                                    <h6>Week 3-4: Strategy Implementation</h6>
                                    <ul>
                                        <li>Brand: Manual CPC (working well)</li>
                                        <li>Generic: tCPA @ $120</li>
                                        <li>Competitor: tCPA @ $180</li>
                                        <li>Display: Maximize Conversions</li>
                                        <li>Video: Paused for rebuild</li>
                                    </ul>
                                </div>
                                
                                <div class="week-optimization">
                                    <h6>Week 5-8: Optimization</h6>
                                    <ul>
                                        <li>Generic tCPA → $110 (performing well)</li>
                                        <li>Competitor tCPA → $150 (improved QS)</li>
                                        <li>Display → Added tCPA @ $140</li>
                                        <li>Launched new Video with tCPA</li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="results">
                                <h6>Results After 60 Days:</h6>
                                <ul>
                                    <li>Overall CPA: $152 → $98 (-35%)</li>
                                    <li>Conversions: 200 → 285 (+42%)</li>
                                    <li>Budget efficiency: 100% spent</li>
                                    <li>ROAS: 2.8:1 → 4.2:1</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="day-section">
                    <h3><i class="fas fa-calendar-day"></i> Day 22: Advanced Bid Strategy Tactics</h3>
                    <div class="lesson-content">
                        <h4>Learning Objectives</h4>
                        <ul>
                            <li>Master complex bidding scenarios</li>
                            <li>Implement advanced automation</li>
                            <li>Build custom bidding models</li>
                        </ul>

                        <h4>Multi-Goal Optimization</h4>
                        <div class="multi-goal-framework">
                            <h5>Balancing Multiple Objectives:</h5>
                            
                            <div class="scenario">
                                <h6>Scenario: E-commerce with multiple goals</h6>
                                <ul>
                                    <li>Goal 1: Revenue (primary)</li>
                                    <li>Goal 2: New customers (secondary)</li>
                                    <li>Goal 3: Email signups (tertiary)</li>
                                </ul>
                            </div>
                            
                            <div class="solution-architecture">
                                <h6>Solution Architecture:</h6>
                                <div class="campaign-structure">
                                    <div class="primary-campaigns">
                                        <h6>Primary Campaigns (60%)</h6>
                                        <ul>
                                            <li>tROAS 4:1</li>
                                            <li>Value: $100/conv</li>
                                        </ul>
                                    </div>
                                    
                                    <div class="growth-campaigns">
                                        <h6>Growth Campaigns (30%)</h6>
                                        <ul>
                                            <li>tCPA $80</li>
                                            <li>Value: $150 LTV</li>
                                        </ul>
                                    </div>
                                    
                                    <div class="support-campaigns">
                                        <h6>Support Campaigns (10%)</h6>
                                        <ul>
                                            <li>Max Conv</li>
                                            <li>Value: $10/lead</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h4>Custom Bidding Models</h4>
                        <div class="custom-bidding">
                            <h5>Profit-Maximizing Bid Calculator</h5>
                            <div class="code-example">
                                <pre><code>function calculateOptimalBid(keyword) {
  // Historical data
  var avgPosition = keyword.getAveragePosition();
  var currentCpc = keyword.getCpc();
  var conversionRate = keyword.getConversionRate();
  var avgOrderValue = 150; // From analytics
  
  // Business constraints
  var profitMargin = 0.4;
  var overheadPercent = 0.2;
  
  // Calculate max profitable CPC
  var revenue = avgOrderValue * conversionRate;
  var profit = revenue * profitMargin;
  var maxCpc = profit * (1 - overheadPercent);
  
  // Position-based adjustment
  var positionMultiplier = {
    1: 1.0,
    2: 0.85,
    3: 0.7,
    4: 0.55
  }[Math.round(avgPosition)] || 0.4;
  
  var optimalBid = maxCpc * positionMultiplier;
  
  // Safety constraints
  optimalBid = Math.max(0.1, Math.min(optimalBid, currentCpc * 1.5));
  
  return optimalBid;
}</code></pre>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="day-section">
                    <h3><i class="fas fa-calendar-day"></i> Day 23: Budget Allocation Models</h3>
                    <div class="lesson-content">
                        <h4>Learning Objectives</h4>
                        <ul>
                            <li>Master budget allocation strategies</li>
                            <li>Build predictive budget models</li>
                            <li>Optimize cross-campaign budgets</li>
                        </ul>

                        <h4>Scientific Budget Allocation</h4>
                        <div class="efficient-frontier">
                            <h5>The Efficient Frontier Model</h5>
                            <p><strong>Portfolio Theory Applied to Google Ads:</strong></p>
                            
                            <div class="risk-return-analysis">
                                <h6>Risk vs. Return Analysis:</h6>
                                <div class="campaign-plot">
                                    <p><strong>Campaigns Plotted:</strong></p>
                                    <ul>
                                        <li>A: Brand (Low risk, moderate return)</li>
                                        <li>B: Generic (Medium risk, good return)</li>
                                        <li>C: Shopping (Low risk, high return)</li>
                                        <li>D: Display (High risk, high return)</li>
                                        <li>E: Video (High risk, moderate return)</li>
                                        <li>F: DSA (Medium risk, low return)</li>
                                        <li>G: Competitor (High risk, low return)</li>
                                    </ul>
                                </div>
                                
                                <div class="optimal-allocation">
                                    <h6>Optimal Allocation:</h6>
                                    <ul>
                                        <li>30% to C (Shopping) - Best ratio</li>
                                        <li>25% to A (Brand) - Stability</li>
                                        <li>25% to B (Generic) - Growth</li>
                                        <li>15% to D (Display) - Upside</li>
                                        <li>5% to experimentation</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <h4>Zero-Based Budget Building</h4>
                        <div class="zero-based-budget">
                            <h5>Monthly Budget Construction:</h5>
                            
                            <div class="budget-steps">
                                <div class="step">
                                    <h6>Step 1: Define Minimum Viable Budgets</h6>
                                    <ul>
                                        <li>Brand Protection: $2,000</li>
                                        <li>Remarketing: $1,000</li>
                                        <li>Customer Match: $500</li>
                                        <li>Total Fixed: $3,500</li>
                                    </ul>
                                </div>
                                
                                <div class="step">
                                    <h6>Step 2: Calculate Variable Allocation</h6>
                                    <p>Available: $20,000 - $3,500 = $16,500</p>
                                </div>
                                
                                <div class="step">
                                    <h6>Step 3: Rank by Efficiency</h6>
                                    <ol>
                                        <li>Shopping: 5.2:1 ROAS</li>
                                        <li>Brand Expansion: 4.8:1</li>
                                        <li>Generic Search: 3.5:1</li>
                                        <li>Display: 2.8:1</li>
                                        <li>Video: 2.2:1</li>
                                    </ol>
                                </div>
                                
                                <div class="step">
                                    <h6>Step 4: Allocate by Diminishing Returns</h6>
                                    <ul>
                                        <li>Shopping: First $5k at 5.2:1, next $2k at 4.5:1</li>
                                        <li>Brand Ex: First $3k at 4.8:1, next $2k at 4.0:1</li>
                                        <li>Generic: First $4k at 3.5:1, next $3k at 3.0:1</li>
                                        <li>Remaining: Test budget</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="day-section">
                    <h3><i class="fas fa-calendar-day"></i> Day 24: Predictive Analytics & Forecasting</h3>
                    <div class="lesson-content">
                        <h4>Learning Objectives</h4>
                        <ul>
                            <li>Build predictive models for Google Ads</li>
                            <li>Master forecasting techniques</li>
                            <li>Create scenario planning tools</li>
                        </ul>

                        <h4>Time Series Forecasting</h4>
                        <div class="forecasting-methods">
                            <h5>Multiple Forecasting Methods:</h5>
                            
                            <div class="method">
                                <h6>Method 1: Exponential Smoothing</h6>
                                <p>Best for: Seasonal patterns with trends</p>
                                <div class="code-example">
                                    <pre><code>def exponential_smoothing_forecast(data):
    model = ExponentialSmoothing(
        data['conversions'],
        seasonal_periods=7,  # Weekly seasonality
        trend='add',
        seasonal='add'
    )
    fitted_model = model.fit()
    forecast = fitted_model.forecast(periods)
    return forecast</code></pre>
                                </div>
                            </div>
                            
                            <div class="method">
                                <h6>Method 2: Prophet (Facebook's forecasting tool)</h6>
                                <p>Best for: Complex seasonality and holidays</p>
                                <div class="code-example">
                                    <pre><code>def prophet_forecast(data):
    df = pd.DataFrame({
        'ds': data['date'],
        'y': data['conversions']
    })
    
    model = Prophet(
        yearly_seasonality=True,
        weekly_seasonality=True,
        daily_seasonality=False
    )
    
    model.fit(df)
    future = model.make_future_dataframe(periods=periods)
    forecast = model.predict(future)
    
    return forecast</code></pre>
                                </div>
                            </div>
                        </div>

                        <h4>Scenario Planning Models</h4>
                        <div class="scenario-planning">
                            <h5>Multi-Scenario Framework:</h5>
                            
                            <div class="scenarios">
                                <div class="scenario">
                                    <h6>Base Scenario (Most Likely):</h6>
                                    <ul>
                                        <li>Market growth: 5%</li>
                                        <li>Competition: Stable</li>
                                        <li>Budget: No change</li>
                                        <li>Expected ROAS: 4.0:1</li>
                                        <li>Revenue: $500k</li>
                                    </ul>
                                </div>
                                
                                <div class="scenario">
                                    <h6>Optimistic Scenario (20% probability):</h6>
                                    <ul>
                                        <li>Market growth: 15%</li>
                                        <li>Competition: Decreases</li>
                                        <li>Budget: +20% approved</li>
                                        <li>Expected ROAS: 4.5:1</li>
                                        <li>Revenue: $750k</li>
                                    </ul>
                                </div>
                                
                                <div class="scenario">
                                    <h6>Pessimistic Scenario (20% probability):</h6>
                                    <ul>
                                        <li>Market growth: -5%</li>
                                        <li>Competition: Intensifies</li>
                                        <li>Budget: -10% cut</li>
                                        <li>Expected ROAS: 3.2:1</li>
                                        <li>Revenue: $350k</li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="weighted-forecast">
                                <h6>Weighted Forecast:</h6>
                                <p><strong>Expected Revenue</strong> = (Base × 0.6) + (Optimistic × 0.2) + (Pessimistic × 0.2)</p>
                                <p>= ($500k × 0.6) + ($750k × 0.2) + ($350k × 0.2) = <strong>$520k</strong></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="day-section">
                    <h3><i class="fas fa-calendar-day"></i> Day 25: Final Project & Course Completion</h3>
                    <div class="lesson-content">
                        <h4>Learning Objectives</h4>
                        <ul>
                            <li>Apply all course concepts</li>
                            <li>Create comprehensive optimization plan</li>
                            <li>Build ongoing improvement framework</li>
                        </ul>

                        <h4>Final Project: Comprehensive Account Optimization</h4>
                        <div class="final-project">
                            <h5>Project Scenario</h5>
                            
                            <div class="project-overview">
                                <h6>Company: TechFlow Solutions (B2B SaaS)</h6>
                                <div class="current-state">
                                    <h6>Current State:</h6>
                                    <ul>
                                        <li>Monthly Budget: $75,000</li>
                                        <li>Accounts: 5 (Search, Shopping, Display, Video, Discovery)</li>
                                        <li>Overall ROAS: 3.2:1</li>
                                        <li>Market Position: #3 in category</li>
                                        <li>Growth Target: +50% revenue in 90 days</li>
                                    </ul>
                                </div>
                                
                                <div class="mission">
                                    <h6>Your Mission:</h6>
                                    <p>Create a complete optimization strategy using all modules</p>
                                </div>
                            </div>

                            <h5>90-Day Optimization Roadmap</h5>
                            <div class="roadmap">
                                <div class="phase">
                                    <h6>Days 1-30: Foundation</h6>
                                    <div class="week-tasks">
                                        <div class="week">
                                            <h6>Week 1: Fix Critical Issues</h6>
                                            <ul>
                                                <li>□ Repair mobile experience</li>
                                                <li>□ Fix shopping feed</li>
                                                <li>□ Pause wasting keywords</li>
                                                <li>□ Implement dayparting</li>
                                            </ul>
                                        </div>
                                        
                                        <div class="week">
                                            <h6>Week 2-3: Restructure</h6>
                                            <ul>
                                                <li>□ Implement portfolio bidding</li>
                                                <li>□ Create value-based campaigns</li>
                                                <li>□ Launch SKAGs for top terms</li>
                                                <li>□ Set up proper attribution</li>
                                            </ul>
                                        </div>
                                        
                                        <div class="week">
                                            <h6>Week 4: Testing Framework</h6>
                                            <ul>
                                                <li>□ Landing page tests</li>
                                                <li>□ Ad copy experiments</li>
                                                <li>□ Bid strategy tests</li>
                                                <li>□ New audience tests</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="phase">
                                    <h6>Days 31-60: Scale</h6>
                                    <div class="week-tasks">
                                        <div class="week">
                                            <h6>Week 5-6: Expand Winners</h6>
                                            <ul>
                                                <li>□ Increase budgets on performers</li>
                                                <li>□ Launch new keyword themes</li>
                                                <li>□ Expand shopping inventory</li>
                                                <li>□ Add video campaigns</li>
                                            </ul>
                                        </div>
                                        
                                        <div class="week">
                                            <h6>Week 7-8: Competitive Assault</h6>
                                            <ul>
                                                <li>□ Launch competitor campaigns</li>
                                                <li>□ Dominate niche keywords</li>
                                                <li>□ Increase impression share</li>
                                                <li>□ Defend brand terms</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="phase">
                                    <h6>Days 61-90: Optimize</h6>
                                    <div class="week-tasks">
                                        <div class="week">
                                            <h6>Week 9-10: Advanced Tactics</h6>
                                            <ul>
                                                <li>□ Implement predictive bidding</li>
                                                <li>□ Launch custom audiences</li>
                                                <li>□ Test new platforms</li>
                                                <li>□ Refine attribution model</li>
                                            </ul>
                                        </div>
                                        
                                        <div class="week">
                                            <h6>Week 11-12: Maximize</h6>
                                            <ul>
                                                <li>□ Push efficiency limits</li>
                                                <li>□ Scale winning tests</li>
                                                <li>□ Plan next quarter</li>
                                                <li>□ Document learnings</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h5>Expected Results</h5>
                            <div class="expected-results">
                                <ul>
                                    <li>Revenue: +65%</li>
                                    <li>ROAS: 3.2:1 → 4.8:1</li>
                                    <li>CPA: $125 → $85</li>
                                    <li>Market Share: 18% → 25%</li>
                                </ul>
                            </div>
                        </div>

                        <h4>Course Completion Checklist</h4>
                        <div class="completion-checklist">
                            <h5>Technical Skills Mastered:</h5>
                            <ul>
                                <li>□ KPI analysis and relationships</li>
                                <li>□ Performance diagnostics</li>
                                <li>□ Competitive analysis</li>
                                <li>□ Industry benchmarking</li>
                                <li>□ Automated reporting</li>
                                <li>□ Google Ads Scripts</li>
                                <li>□ Data Studio dashboards</li>
                                <li>□ Data storytelling</li>
                                <li>□ Bid strategy optimization</li>
                                <li>□ Budget allocation models</li>
                                <li>□ Predictive analytics</li>
                                <li>□ Testing frameworks</li>
                            </ul>
                            
                            <h5>Strategic Skills Developed:</h5>
                            <ul>
                                <li>□ Business-first thinking</li>
                                <li>□ Data-driven decision making</li>
                                <li>□ Competitive positioning</li>
                                <li>□ Stakeholder communication</li>
                                <li>□ Resource optimization</li>
                                <li>□ Risk management</li>
                                <li>□ Innovation mindset</li>
                                <li>□ Continuous improvement</li>
                            </ul>
                        </div>

                        <h4>Certification of Completion</h4>
                        <div class="certification">
                            <div class="certificate">
                                <h5>🏆 GOOGLE ADS PERFORMANCE ANALYSIS MASTERY 🏆</h5>
                                <p>This certifies that you have completed all five modules:</p>
                                <ul>
                                    <li>✓ Module 1: KPI Foundation & Analysis Framework</li>
                                    <li>✓ Module 2: Advanced Performance Diagnostics</li>
                                    <li>✓ Module 3: Competitive Intelligence & Benchmarking</li>
                                    <li>✓ Module 4: Advanced Reporting & Visualization</li>
                                    <li>✓ Module 5: Optimization Strategies Based on Analysis</li>
                                </ul>
                                <p><strong>You are now equipped to:</strong></p>
                                <ul>
                                    <li>Analyze any Google Ads account professionally</li>
                                    <li>Diagnose and fix performance issues</li>
                                    <li>Create compelling data visualizations</li>
                                    <li>Build automated optimization systems</li>
                                    <li>Drive significant business results</li>
                                </ul>
                                <p><strong>Next Step:</strong> Apply these skills and share your success!</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="module-assessment">
                    <h3>Module 5 Checkpoint Quiz</h3>
                    <p>Test your understanding of optimization strategies and bid management concepts.</p>
                    
                    <div class="quiz-section">
                        <div class="quiz-question">
                            <h4>Question 1: What's the optimal bid strategy for a new campaign with 15 conversions/month?</h4>
                            <div class="quiz-options">
                                <label><input type="radio" name="q1" value="a"> A) Target CPA</label>
                                <label><input type="radio" name="q1" value="b"> B) Manual CPC</label>
                                <label><input type="radio" name="q1" value="c"> C) Target ROAS</label>
                                <label><input type="radio" name="q1" value="d"> D) Maximize Conversions</label>
                            </div>
                        </div>

                        <div class="quiz-question">
                            <h4>Question 2: For a mature e-commerce campaign, which portfolio strategy is best?</h4>
                            <div class="quiz-options">
                                <label><input type="radio" name="q2" value="a"> A) High-Value Portfolio (tROAS 2:1)</label>
                                <label><input type="radio" name="q2" value="b"> B) Mid-Value Portfolio (tROAS 4:1)</label>
                                <label><input type="radio" name="q2" value="c"> C) Low-Value Portfolio (tCPA $25)</label>
                                <label><input type="radio" name="q2" value="d"> D) Growth Portfolio (Max Conversions)</label>
                            </div>
                        </div>

                        <div class="quiz-question">
                            <h4>Question 3: What's the recommended timeline for bid strategy transitions?</h4>
                            <div class="quiz-options">
                                <label><input type="radio" name="q3" value="a"> A) Change daily for best results</label>
                                <label><input type="radio" name="q3" value="b"> B) Allow 2-week learning period</label>
                                <label><input type="radio" name="q3" value="c"> C) Switch immediately when underperforming</label>
                                <label><input type="radio" name="q3" value="d"> D) Never change once set</label>
                            </div>
                        </div>

                        <div class="quiz-question">
                            <h4>Question 4: Which forecasting method is best for complex seasonality?</h4>
                            <div class="quiz-options">
                                <label><input type="radio" name="q4" value="a"> A) Simple moving average</label>
                                <label><input type="radio" name="q4" value="b"> B) Exponential smoothing</label>
                                <label><input type="radio" name="q4" value="c"> C) Prophet (Facebook's tool)</label>
                                <label><input type="radio" name="q4" value="d"> D) Linear regression</label>
                            </div>
                        </div>

                        <div class="quiz-question">
                            <h4>Question 5: What's the first step in zero-based budget allocation?</h4>
                            <div class="quiz-options">
                                <label><input type="radio" name="q5" value="a"> A) Rank campaigns by ROAS</label>
                                <label><input type="radio" name="q5" value="b"> B) Define minimum viable budgets</label>
                                <label><input type="radio" name="q5" value="c"> C) Calculate marginal returns</label>
                                <label><input type="radio" name="q5" value="d"> D) Set portfolio targets</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="module-resources">
                    <h3>Module 5 Resources</h3>
                    
                    <div class="resources-section">
                        <h4>Complete Script Library</h4>
                        <p>All scripts from the course compiled and ready to use:</p>
                        <ul>
                            <li>Performance monitoring suite</li>
                            <li>Automated optimization tools</li>
                            <li>Reporting generators</li>
                            <li>Competitive trackers</li>
                            <li>Forecast models</li>
                        </ul>
                    </div>

                    <div class="resources-section">
                        <h4>Advanced Learning Resources</h4>
                        <p><strong>Books for Deeper Study:</strong></p>
                        <ol>
                            <li>"Advanced Google Ads" - Brad Geddes</li>
                            <li>"Digital Marketing Analytics" - Chuck Hemann</li>
                            <li>"Competing on Analytics" - Thomas Davenport</li>
                            <li>"The Signal and the Noise" - Nate Silver</li>
                        </ol>
                        
                        <p><strong>Online Resources:</strong></p>
                        <ul>
                            <li>Google Ads Official Blog</li>
                            <li>PPC Hero Advanced Guides</li>
                            <li>Search Engine Land Pro Tips</li>
                            <li>Analytics Mania Tutorials</li>
                        </ul>
                    </div>

                    <div class="resources-section">
                        <h4>Your Next Challenge</h4>
                        <p><strong>The 100-Day Challenge:</strong></p>
                        <ul>
                            <li>Days 1-30: Implement core optimizations</li>
                            <li>Days 31-60: Build automation systems</li>
                            <li>Days 61-90: Scale successful tests</li>
                            <li>Days 91-100: Share your results</li>
                        </ul>
                        <p>Document your journey and inspire others!</p>
                    </div>
                </div>
            </div>
        `
    };
    
    return content[moduleId] || '<p>Module content coming soon...</p>';
}

function completeModule(moduleId) {
    // Update module status
    const moduleCard = document.querySelector(`[data-module="${moduleId}"]`);
    if (moduleCard) {
        moduleCard.classList.remove('active');
        moduleCard.classList.remove('reset'); // Remove reset class when completing
        moduleCard.classList.add('completed');
        
        // Update status icon
        const statusIcon = moduleCard.querySelector('.module-status i');
        if (statusIcon) {
            statusIcon.className = 'fas fa-check-circle';
        }
        
        // Update button
        const button = moduleCard.querySelector('.btn');
        if (button) {
            button.textContent = 'Review Module';
            button.className = 'btn btn-secondary';
        }
    }
    
    // Unlock next module if available
    const nextModule = moduleId + 1;
    if (nextModule <= 5) {
        const nextModuleCard = document.querySelector(`[data-module="${nextModule}"]`);
        if (nextModuleCard) {
            nextModuleCard.classList.add('active');
            nextModuleCard.classList.remove('locked');
            
            const nextStatusIcon = nextModuleCard.querySelector('.module-status i');
            if (nextStatusIcon) {
                nextStatusIcon.className = 'fas fa-play-circle';
            }
            
            const nextButton = nextModuleCard.querySelector('.btn');
            if (nextButton) {
                nextButton.textContent = 'Start Learning';
                nextButton.className = 'btn btn-primary';
                nextButton.disabled = false;
            }
        }
    }
    
    // Update progress
    updateProgress();
    
    // Close modal
    closeModule();
}

function incompleteModule(moduleId) {
    // Update module status
    const moduleCard = document.querySelector(`[data-module="${moduleId}"]`);
    if (moduleCard) {
        moduleCard.classList.remove('completed');
        moduleCard.classList.add('active');
        
        // Add a special class to track that this module was reset
        moduleCard.classList.add('reset');
        
        // Update status icon
        const statusIcon = moduleCard.querySelector('.module-status i');
        if (statusIcon) {
            statusIcon.className = 'fas fa-play-circle';
        }
        
        // Update button
        const button = moduleCard.querySelector('.btn');
        if (button) {
            button.textContent = 'Start Learning';
            button.className = 'btn btn-primary';
        }
    }
    
    // Lock subsequent modules if this module is no longer completed
    for (let i = moduleId + 1; i <= 5; i++) {
        const nextModuleCard = document.querySelector(`[data-module="${i}"]`);
        if (nextModuleCard) {
            nextModuleCard.classList.remove('active');
            nextModuleCard.classList.add('locked');
            
            const nextStatusIcon = nextModuleCard.querySelector('.module-status i');
            if (nextStatusIcon) {
                nextStatusIcon.className = 'fas fa-lock';
            }
            
            const nextButton = nextModuleCard.querySelector('.btn');
            if (nextButton) {
                nextButton.textContent = 'Locked';
                nextButton.className = 'btn btn-secondary';
                nextButton.disabled = true;
            }
        }
    }
    
    // Update progress
    updateProgress();
    
    // Close modal
    closeModule();
}

function updateProgress() {
    const completedModules = document.querySelectorAll('.module-card.completed').length;
    const totalModules = 5;
    
    // Calculate overall progress including partial progress from active module
    let overallProgress = (completedModules / totalModules) * 100;
    
    // Add partial progress from active module (60% of one module = 12% of total course)
    const activeModule = document.querySelector('.module-card.active:not(.reset)');
    if (activeModule) {
        const activeModuleIndex = parseInt(activeModule.getAttribute('data-module')) - 1;
        const partialProgress = (60 / totalModules); // 60% of one module = 12% of total
        overallProgress += partialProgress;
    }
    
    // Update overall progress circle
    const progressCircle = document.querySelector('.progress-percentage');
    if (progressCircle) {
        progressCircle.textContent = Math.round(overallProgress) + '%';
    }
    
    // Update SVG circle stroke-dashoffset
    const svgCircle = document.querySelector('.progress-circle svg circle:last-child');
    if (svgCircle) {
        const circumference = 502.4; // 2 * π * radius (80)
        const offset = circumference - (overallProgress / 100) * circumference;
        svgCircle.setAttribute('stroke-dashoffset', offset);
    }
    
    // Update navigation progress
    const navProgress = document.querySelector('.nav-user .progress-bar');
    if (navProgress) {
        navProgress.style.width = overallProgress + '%';
    }
    
    // Update module progress bars
    const progressItems = document.querySelectorAll('.progress-item');
    progressItems.forEach((item, index) => {
        const fill = item.querySelector('.progress-bar-fill');
        const percent = item.querySelector('.progress-percent');
        const moduleCard = document.querySelector(`[data-module="${index + 1}"]`);
        
        if (moduleCard && moduleCard.classList.contains('completed')) {
            fill.style.width = '100%';
            percent.textContent = '100%';
        } else if (moduleCard && moduleCard.classList.contains('active')) {
            // Check if this module was reset (marked as incomplete)
            if (moduleCard.classList.contains('reset')) {
                fill.style.width = '0%';
                percent.textContent = '0%';
            } else {
                // This is the first active module (not previously completed)
                fill.style.width = '60%';
                percent.textContent = '60%';
            }
        } else {
            fill.style.width = '0%';
            percent.textContent = '0%';
        }
    });
    
    // Update achievements
    updateAchievements(completedModules);
}

function updateAchievements(completedModules) {
    const courseMasterAchievement = document.querySelector('.achievement-card:last-child');
    if (courseMasterAchievement) {
        if (completedModules === 5) {
            courseMasterAchievement.classList.add('earned');
        } else {
            courseMasterAchievement.classList.remove('earned');
        }
    }
}

// Quiz functionality
function initializeQuizzes() {
    const quizQuestions = document.querySelectorAll('.quiz-question');
    
    quizQuestions.forEach((question, index) => {
        const radioButtons = question.querySelectorAll('input[type="radio"]');
        // Check for both h4 and h5 tags for question text
        const questionTitle = question.querySelector('h4') || question.querySelector('h5');
        const questionText = questionTitle ? questionTitle.textContent : '';
        
        if (questionText && radioButtons.length > 0) {
            radioButtons.forEach(radio => {
                radio.addEventListener('change', function() {
                    if (this.checked) {
                        checkQuizAnswer(question, this.value, questionText);
                    }
                });
            });
        }
    });
}

function checkQuizAnswer(questionElement, selectedAnswer, questionText) {
    // Remove any existing feedback
    const existingFeedback = questionElement.querySelector('.quiz-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    // Define correct answers for Module 1 and Module 2 quizzes
    const correctAnswers = {
        // Module 1 Quiz
        'Question 1: Which KPI cascade is correct?': 'b',
        'Question 2: A campaign has $10,000 spend and generates $35,000 in revenue. What\'s the ROAS?': 'b',
        'Question 3: Under Data-Driven Attribution, upper-funnel campaigns typically show:': 'b',
        'Question 4: Your CTR improves from 2% to 3%. Assuming this improves Quality Score and reduces CPC by 20%, how does this affect clicks with the same budget?': 'b',
        'Question 5: Which attribution model gives 40% credit to first and last touch?': 'c',
        // Module 2 Quiz
        'Question 1: In the 5-step diagnostic framework, what should you analyze first?': 'b',
        'Question 2: A search query has high CTR but low CVR. This indicates:': 'b',
        'Question 3: What\'s the ideal action for queries with >5% CVR and <50% impression share?': 'c',
        'Question 4: In query analysis, what does a high occurrence of "free" indicate?': 'b',
        'Question 5: Which segmentation reveals mobile UX issues?': 'c',
        // Module 3 Quiz
        'Question 1: What does a 70% overlap rate with a competitor indicate?': 'b',
        'Question 2: If lost IS (budget) > lost IS (rank), you should:': 'c',
        'Question 3: Your CTR is 2.5% and the industry benchmark is 3.2%. Your RPI is:': 'c',
        'Question 4: Peak season is approaching. When should you start preparation?': 'd',
        'Question 5: A new competitor appears with 15% impression share. Your response should be:': 'b',
        // Module 4 Quiz
        'Question 1: What\'s the optimal email report frequency for a Marketing Director?': 'c',
        'Question 2: In Google Ads Scripts, what\'s the best way to handle large data sets?': 'b',
        'Question 3: Which Data Studio feature helps with performance?': 'b',
        'Question 4: For C-suite presentations, the ideal length is:': 'c',
        'Question 5: The best chart for showing campaign performance trends is:': 'c',
        // Module 5 Quiz
        'Question 1: What\'s the optimal bid strategy for a new campaign with 15 conversions/month?': 'b',
        'Question 2: For a mature e-commerce campaign, which portfolio strategy is best?': 'a',
        'Question 3: What\'s the recommended timeline for bid strategy transitions?': 'b',
        'Question 4: Which forecasting method is best for complex seasonality?': 'c',
        'Question 5: What\'s the first step in zero-based budget allocation?': 'b'
    };
    
    const correctAnswer = correctAnswers[questionText];
    const isCorrect = selectedAnswer === correctAnswer;
    
    // Create feedback element
    const feedback = document.createElement('div');
    feedback.className = `quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    
    if (isCorrect) {
        feedback.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>Correct! Well done!</span>
        `;
    } else {
        const correctOption = getCorrectOptionText(questionText, correctAnswer);
        feedback.innerHTML = `
            <i class="fas fa-times-circle"></i>
            <span>Incorrect. The correct answer is: ${correctOption}</span>
        `;
    }
    
    // Insert feedback after the quiz options
    const quizOptions = questionElement.querySelector('.quiz-options');
    quizOptions.parentNode.insertBefore(feedback, quizOptions.nextSibling);
    
    // Update progress
    updateQuizProgress();
}

function getCorrectOptionText(questionText, correctAnswer) {
    const optionTexts = {
        // Module 1 Quiz
        'Question 1: Which KPI cascade is correct?': {
            'b': 'B) Higher CTR → Higher Quality Score → Lower CPC'
        },
        'Question 2: A campaign has $10,000 spend and generates $35,000 in revenue. What\'s the ROAS?': {
            'b': 'B) 3.5:1'
        },
        'Question 3: Under Data-Driven Attribution, upper-funnel campaigns typically show:': {
            'b': 'B) Lower CPA than last-click'
        },
        'Question 4: Your CTR improves from 2% to 3%. Assuming this improves Quality Score and reduces CPC by 20%, how does this affect clicks with the same budget?': {
            'b': 'B) 25% more clicks'
        },
        'Question 5: Which attribution model gives 40% credit to first and last touch?': {
            'c': 'C) Position-based'
        },
        // Module 2 Quiz
        'Question 1: In the 5-step diagnostic framework, what should you analyze first?': {
            'b': 'B) Macro account-level trends'
        },
        'Question 2: A search query has high CTR but low CVR. This indicates:': {
            'b': 'B) Poor ad-to-landing page relevance'
        },
        'Question 3: What\'s the ideal action for queries with >5% CVR and <50% impression share?': {
            'c': 'C) Create exact match keywords with higher bids'
        },
        'Question 4: In query analysis, what does a high occurrence of "free" indicate?': {
            'b': 'B) Audience mismatch for paid products'
        },
        'Question 5: Which segmentation reveals mobile UX issues?': {
            'c': 'C) Device segmentation'
        },
        // Module 3 Quiz
        'Question 1: What does a 70% overlap rate with a competitor indicate?': {
            'b': 'B) You\'re competing for the same queries'
        },
        'Question 2: If lost IS (budget) > lost IS (rank), you should:': {
            'c': 'C) Increase budget'
        },
        'Question 3: Your CTR is 2.5% and the industry benchmark is 3.2%. Your RPI is:': {
            'c': 'C) 78'
        },
        'Question 4: Peak season is approaching. When should you start preparation?': {
            'd': 'D) 8 weeks before'
        },
        'Question 5: A new competitor appears with 15% impression share. Your response should be:': {
            'b': 'B) Monitor for 2 weeks first'
        },
        // Module 4 Quiz
        'Question 1: What\'s the optimal email report frequency for a Marketing Director?': {
            'c': 'C) Weekly performance reviews'
        },
        'Question 2: In Google Ads Scripts, what\'s the best way to handle large data sets?': {
            'b': 'B) Use batch processing'
        },
        'Question 3: Which Data Studio feature helps with performance?': {
            'b': 'B) Extracted data sources'
        },
        'Question 4: For C-suite presentations, the ideal length is:': {
            'c': 'C) 5-10 minutes'
        },
        'Question 5: The best chart for showing campaign performance trends is:': {
            'c': 'C) Line chart'
        },
        // Module 5 Quiz
        'Question 1: What\'s the optimal bid strategy for a new campaign with 15 conversions/month?': {
            'b': 'B) Manual CPC'
        },
        'Question 2: For a mature e-commerce campaign, which portfolio strategy is best?': {
            'a': 'A) High-Value Portfolio (tROAS 2:1)'
        },
        'Question 3: What\'s the recommended timeline for bid strategy transitions?': {
            'b': 'B) Allow 2-week learning period'
        },
        'Question 4: Which forecasting method is best for complex seasonality?': {
            'c': 'C) Prophet (Facebook\'s tool)'
        },
        'Question 5: What\'s the first step in zero-based budget allocation?': {
            'b': 'B) Define minimum viable budgets'
        }
    };
    
    return optionTexts[questionText]?.[correctAnswer] || `Option ${correctAnswer.toUpperCase()}`;
}

function updateQuizProgress() {
    const moduleContent = document.querySelector('.module-content');
    if (!moduleContent) return;
    
    const questions = moduleContent.querySelectorAll('.quiz-question');
    const answeredQuestions = moduleContent.querySelectorAll('.quiz-feedback');
    const progressPercentage = (answeredQuestions.length / questions.length) * 100;
    
    // Update or create progress indicator
    let progressIndicator = moduleContent.querySelector('.quiz-progress');
    if (!progressIndicator) {
        progressIndicator = document.createElement('div');
        progressIndicator.className = 'quiz-progress';
        const quizSection = moduleContent.querySelector('.quiz-section');
        quizSection.insertBefore(progressIndicator, quizSection.firstChild);
    }
    
    progressIndicator.innerHTML = `
        <div class="progress-bar">
            <div class="progress-fill" style="width: ${progressPercentage}%"></div>
        </div>
        <div class="progress-text">${answeredQuestions.length} of ${questions.length} questions answered</div>
    `;
    
    // Show completion message if all questions answered
    if (answeredQuestions.length === questions.length) {
        showQuizCompletion();
    }
}

function showQuizCompletion() {
    const moduleContent = document.querySelector('.module-content');
    if (!moduleContent) return;
    
    const correctAnswers = moduleContent.querySelectorAll('.quiz-feedback.correct').length;
    const totalQuestions = moduleContent.querySelectorAll('.quiz-question').length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    
    let completionMessage = moduleContent.querySelector('.quiz-completion');
    if (!completionMessage) {
        completionMessage = document.createElement('div');
        completionMessage.className = 'quiz-completion';
        const quizSection = moduleContent.querySelector('.quiz-section');
        quizSection.appendChild(completionMessage);
    }
    
    let messageClass = 'completion-good';
    let messageIcon = 'fas fa-thumbs-up';
    let messageText = 'Good job!';
    
    if (score >= 90) {
        messageClass = 'completion-excellent';
        messageIcon = 'fas fa-trophy';
        messageText = 'Excellent!';
    } else if (score >= 70) {
        messageClass = 'completion-good';
        messageIcon = 'fas fa-thumbs-up';
        messageText = 'Good job!';
    } else {
        messageClass = 'completion-needs-improvement';
        messageIcon = 'fas fa-lightbulb';
        messageText = 'Keep studying!';
    }
    
    completionMessage.innerHTML = `
        <div class="${messageClass}">
            <i class="${messageIcon}"></i>
            <h4>${messageText}</h4>
            <p>You scored ${score}% (${correctAnswers} out of ${totalQuestions} correct)</p>
            <button class="btn btn-primary" onclick="retakeQuiz()">Retake Quiz</button>
        </div>
    `;
}

function retakeQuiz() {
    const moduleContent = document.querySelector('.module-content');
    if (!moduleContent) return;
    
    // Reset all radio buttons
    const radioButtons = moduleContent.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.checked = false;
    });
    
    // Remove all feedback and completion messages
    const feedbackElements = moduleContent.querySelectorAll('.quiz-feedback, .quiz-completion, .quiz-progress');
    feedbackElements.forEach(element => {
        element.remove();
    });
}

// Add some additional styling for module content
const additionalStyles = `
    .content-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin: 1rem 0;
    }
    
    .content-item {
        padding: 1rem;
        background: rgba(102, 126, 234, 0.1);
        border-radius: 8px;
        border-left: 4px solid #667eea;
    }
    
    .content-item h4 {
        margin-bottom: 0.5rem;
        color: #333;
    }
    
    .metrics-explanation {
        display: grid;
        gap: 1rem;
        margin: 1rem 0;
    }
    
    .metric-explanation {
        padding: 1rem;
        background: rgba(76, 175, 80, 0.1);
        border-radius: 8px;
        border-left: 4px solid #4CAF50;
    }
    
    .metric-explanation h4 {
        margin-bottom: 0.5rem;
        color: #333;
    }
    
    .metric-explanation strong {
        color: #4CAF50;
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet); 