// Course data structure for the multi-course platform
const courses = {
    'performance-analysis': {
        id: 'performance-analysis',
        title: 'Google Ads Performance Analysis Mastery',
        subtitle: 'Master the art of analyzing and optimizing Google Ads campaigns',
        description: 'Comprehensive 5-module course covering KPI analysis, performance diagnostics, competitive intelligence, reporting, and advanced optimization strategies.',
        type: 'modular', // modular or single-page
        duration: '15 hours',
        difficulty: 'Intermediate to Advanced',
        enrolled: true,
        progress: 0,
        tags: ['Analytics', 'Performance', 'Optimization', 'Reporting'],
        icon: 'fas fa-chart-line',
        color: '#4285f4',
        modules: [
            {
                id: 1,
                title: 'KPI Foundation & Analysis Framework',
                description: 'Master the metrics that matter and build your analytical mindset',
                duration: '2 hours',
                completed: false,
                pdfFile: 'Google Ads Performance Analysis Mastery Course Module 1.pdf'
            },
            {
                id: 2,
                title: 'Advanced Performance Diagnostics',
                description: 'Deep dive into performance analysis and troubleshooting',
                duration: '3 hours',
                completed: false,
                pdfFile: 'Google Ads Performance Analysis Mastery Course Module 2.pdf'
            },
            {
                id: 3,
                title: 'Competitive Intelligence & Benchmarking',
                description: 'Analyze competitors and establish performance benchmarks',
                duration: '2.5 hours',
                completed: false,
                pdfFile: 'Google Ads Performance Analysis Mastery Course Module 3.pdf'
            },
            {
                id: 4,
                title: 'Advanced Reporting & Visualization',
                description: 'Create impactful reports and data visualizations',
                duration: '3 hours',
                completed: false,
                pdfFile: 'Google Ads Performance Analysis Mastery Course Module 4.pdf'
            },
            {
                id: 5,
                title: 'Advanced Optimization Strategies',
                description: 'Implement advanced optimization techniques for maximum ROI',
                duration: '4 hours',
                completed: false,
                pdfFile: 'Google Ads Performance Analysis Mastery Course Module 5.pdf'
            }
        ],
        features: [
            'Interactive dashboard simulations',
            'Real-world case studies',
            'Downloadable PDF guides',
            'Progress tracking',
            'Quizzes and assessments'
        ]
    },
    
    'cpc-adrank': {
        id: 'cpc-adrank',
        title: 'Google Ads CPC & Ad Rank Mastery',
        subtitle: 'How the Auction System Really Works',
        description: 'Understand the complex mechanics behind Google Ads CPC and Ad Rank, including the 6 real factors that determine your ad position and costs.',
        type: 'modular',
        duration: '2 hours',
        difficulty: 'Intermediate',
        enrolled: false,
        progress: 0,
        tags: ['CPC', 'Ad Rank', 'Bidding', 'Auction System'],
        icon: 'fas fa-gavel',
        color: '#34a853',
        modules: [
            {
                id: 1,
                title: 'The Ad Rank Formula Myth',
                description: 'Discover why the commonly taught formula is oversimplified',
                duration: '45 minutes',
                completed: false
            },
            {
                id: 2,
                title: 'The 6 Real Ad Rank Factors',
                description: 'Deep dive into the actual factors Google uses',
                duration: '30 minutes',
                completed: false
            },
            {
                id: 3,
                title: 'Understanding Ad Rank Thresholds',
                description: 'Learn how multiple auctions work',
                duration: '20 minutes',
                completed: false
            },
            {
                id: 4,
                title: 'Live Auction Simulation',
                description: 'See real auction examples and calculations',
                duration: '25 minutes',
                completed: false
            },
            {
                id: 5,
                title: 'Quality Score Deep Dive',
                description: 'Impact on position and costs',
                duration: '20 minutes',
                completed: false
            },
            {
                id: 6,
                title: 'Modern CPC Strategy',
                description: 'Why manual bidding is obsolete',
                duration: '30 minutes',
                completed: false
            }
        ],
        features: [
            'Live auction simulations',
            'Interactive threshold visualizations',
            'Quality Score deep dive',
            'Real-world examples',
            'Strategic optimization tips'
        ]
    },
    
    'keyword-research': {
        id: 'keyword-research',
        title: 'Advanced Keyword Research & Strategy',
        subtitle: 'Find and optimize profitable keywords',
        description: 'Master keyword research techniques, match types, negative keywords, and bid strategies to maximize your Google Ads ROI.',
        type: 'modular',
        duration: '8 hours',
        difficulty: 'Beginner to Intermediate',
        enrolled: false,
        progress: 0,
        tags: ['Keywords', 'Research', 'Strategy', 'Match Types'],
        icon: 'fas fa-search',
        color: '#fbbc04',
        comingSoon: true,
        modules: [],
        features: [
            'Keyword research tools mastery',
            'Match type strategies',
            'Negative keyword lists',
            'Bid optimization techniques',
            'Competitor keyword analysis'
        ]
    },
    
    'shopping-ads': {
        id: 'shopping-ads',
        title: 'Google Shopping Ads Mastery',
        subtitle: 'Dominate e-commerce with Shopping campaigns',
        description: 'Learn to create, optimize, and scale profitable Google Shopping campaigns with advanced feed management and bidding strategies.',
        type: 'modular',
        duration: '10 hours',
        difficulty: 'Intermediate',
        enrolled: false,
        progress: 0,
        tags: ['Shopping', 'E-commerce', 'Product Feeds', 'Retail'],
        icon: 'fas fa-shopping-cart',
        color: '#ea4335',
        comingSoon: true,
        modules: [],
        features: [
            'Product feed optimization',
            'Campaign structure best practices',
            'Smart Shopping strategies',
            'Performance Max for retail',
            'Competitive pricing strategies'
        ]
    },
    
    'youtube-ads': {
        id: 'youtube-ads',
        title: 'YouTube Ads Complete Guide',
        subtitle: 'Master video advertising on YouTube',
        description: 'Create compelling video ad campaigns, understand YouTube targeting options, and optimize for conversions and brand awareness.',
        type: 'modular',
        duration: '12 hours',
        difficulty: 'Intermediate to Advanced',
        enrolled: false,
        progress: 0,
        tags: ['YouTube', 'Video Ads', 'Branding', 'Awareness'],
        icon: 'fas fa-play-circle',
        color: '#ff0000',
        comingSoon: true,
        modules: [],
        features: [
            'Video ad formats and specs',
            'Audience targeting strategies',
            'Creative best practices',
            'Campaign optimization',
            'Performance tracking and analytics'
        ]
    },
    
    'performance-max': {
        id: 'performance-max',
        title: 'Performance Max Campaigns Expert',
        subtitle: 'Leverage Google\'s AI for maximum performance',
        description: 'Master Performance Max campaigns with advanced strategies for asset creation, audience signals, and campaign optimization.',
        type: 'modular',
        duration: '6 hours',
        difficulty: 'Advanced',
        enrolled: false,
        progress: 0,
        tags: ['Performance Max', 'Automation', 'AI', 'Machine Learning'],
        icon: 'fas fa-rocket',
        color: '#9333ea',
        comingSoon: true,
        modules: [],
        features: [
            'Campaign setup and structure',
            'Asset group optimization',
            'Audience signal strategies',
            'Budget and bid management',
            'Performance analysis and scaling'
        ]
    }
};

// Function to get all courses
function getAllCourses() {
    return Object.values(courses);
}

// Function to get a specific course
function getCourse(courseId) {
    return courses[courseId] || null;
}

// Function to get enrolled courses
function getEnrolledCourses() {
    return Object.values(courses).filter(course => course.enrolled);
}

// Function to get available courses (not enrolled)
function getAvailableCourses() {
    return Object.values(courses).filter(course => !course.enrolled && !course.comingSoon);
}

// Function to get coming soon courses
function getComingSoonCourses() {
    return Object.values(courses).filter(course => course.comingSoon);
}

// Function to update course progress
function updateCourseProgress(courseId, progress) {
    if (courses[courseId]) {
        courses[courseId].progress = progress;
        localStorage.setItem(`course_progress_${courseId}`, progress);
    }
}

// Function to update module completion
function updateModuleCompletion(courseId, moduleId, completed) {
    const course = courses[courseId];
    if (course && course.modules) {
        const module = course.modules.find(m => m.id === moduleId);
        if (module) {
            module.completed = completed;
            
            // Recalculate course progress
            const completedModules = course.modules.filter(m => m.completed).length;
            const totalModules = course.modules.length;
            const progress = Math.round((completedModules / totalModules) * 100);
            
            updateCourseProgress(courseId, progress);
            
            // Save to localStorage
            const moduleStatus = course.modules.map(m => ({ id: m.id, completed: m.completed }));
            localStorage.setItem(`modules_${courseId}`, JSON.stringify(moduleStatus));
        }
    }
}

// Function to load saved progress from localStorage
function loadSavedProgress() {
    Object.keys(courses).forEach(courseId => {
        // Load course progress
        const savedProgress = localStorage.getItem(`course_progress_${courseId}`);
        if (savedProgress !== null) {
            courses[courseId].progress = parseInt(savedProgress);
        }
        
        // Load module completion status
        const savedModules = localStorage.getItem(`modules_${courseId}`);
        if (savedModules && courses[courseId].modules) {
            const moduleStatus = JSON.parse(savedModules);
            moduleStatus.forEach(saved => {
                const module = courses[courseId].modules.find(m => m.id === saved.id);
                if (module) {
                    module.completed = saved.completed;
                }
            });
        }
        
        // Load enrollment status
        const enrolled = localStorage.getItem(`enrolled_${courseId}`);
        if (enrolled !== null) {
            courses[courseId].enrolled = enrolled === 'true';
        }
    });
}

// Function to enroll in a course
function enrollInCourse(courseId) {
    if (courses[courseId]) {
        courses[courseId].enrolled = true;
        localStorage.setItem(`enrolled_${courseId}`, 'true');
    }
}

// Function to get course statistics
function getCourseStats() {
    const allCourses = getAllCourses();
    const enrolled = getEnrolledCourses();
    const totalProgress = enrolled.reduce((sum, course) => sum + course.progress, 0);
    const averageProgress = enrolled.length > 0 ? Math.round(totalProgress / enrolled.length) : 0;
    
    return {
        totalCourses: allCourses.filter(c => !c.comingSoon).length,
        enrolledCourses: enrolled.length,
        completedCourses: enrolled.filter(c => c.progress === 100).length,
        averageProgress: averageProgress,
        totalHours: allCourses.reduce((sum, course) => {
            const hours = parseInt(course.duration) || 0;
            return sum + hours;
        }, 0)
    };
}

// Initialize saved progress on load
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', loadSavedProgress);
}