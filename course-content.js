// Unified Course Content Management System
// All course content is stored here in a consistent structure

const courseContent = {
    'performance-analysis': {
        modules: [
            {
                id: 1,
                title: 'KPI Foundation & Analysis Framework',
                type: 'lessons',
                duration: '2 hours',
                content: {
                    overview: `Master the metrics that matter and build your analytical mindset. Learn the three-tier KPI hierarchy, attribution models, and practical analysis techniques.`,
                    lessons: [
                        {
                            title: 'Day 1: The KPI Hierarchy',
                            content: `
                                <h4>Learning Objectives</h4>
                                <ul>
                                    <li>Understand the three-tier KPI framework</li>
                                    <li>Identify primary vs. secondary metrics</li>
                                    <li>Map KPIs to business objectives</li>
                                </ul>
                                
                                <h4>The Three-Tier Framework</h4>
                                <div class="framework-visual">
                                    <div class="tier tier-1">
                                        <h5>Tier 1: Business KPIs</h5>
                                        <p>Revenue, Profit, Market Share, Customer Lifetime Value</p>
                                    </div>
                                    <div class="tier tier-2">
                                        <h5>Tier 2: Campaign KPIs</h5>
                                        <p>ROAS, CPA, Conversion Rate, Cost per Conversion</p>
                                    </div>
                                    <div class="tier tier-3">
                                        <h5>Tier 3: Tactical KPIs</h5>
                                        <p>CTR, CPC, Quality Score, Impression Share</p>
                                    </div>
                                </div>
                            `,
                            quiz: [
                                {
                                    question: 'Which KPI tier directly impacts business revenue?',
                                    options: ['Tier 1', 'Tier 2', 'Tier 3', 'All tiers'],
                                    correct: 0
                                }
                            ]
                        },
                        {
                            title: 'Day 2: Attribution Models',
                            content: `
                                <h4>Understanding Attribution</h4>
                                <p>Attribution models determine how credit for conversions is assigned to touchpoints in conversion paths.</p>
                                
                                <h4>Common Models</h4>
                                <ul>
                                    <li><strong>Last Click:</strong> 100% credit to final touchpoint</li>
                                    <li><strong>First Click:</strong> 100% credit to first touchpoint</li>
                                    <li><strong>Linear:</strong> Equal credit to all touchpoints</li>
                                    <li><strong>Time Decay:</strong> More credit to recent touchpoints</li>
                                    <li><strong>Data-Driven:</strong> Machine learning based</li>
                                </ul>
                            `
                        }
                    ],
                    exercises: [
                        {
                            title: 'Build Your KPI Dashboard',
                            description: 'Create a custom dashboard for your business',
                            type: 'interactive'
                        }
                    ]
                }
            },
            {
                id: 2,
                title: 'Advanced Performance Diagnostics',
                type: 'lessons',
                duration: '3 hours',
                content: {
                    overview: `Deep dive into performance analysis and troubleshooting. Learn to diagnose issues, identify opportunities, and optimize campaigns.`,
                    lessons: [
                        {
                            title: 'Performance Audit Framework',
                            content: `
                                <h4>The 5-Step Audit Process</h4>
                                <ol>
                                    <li><strong>Data Collection:</strong> Gather all relevant metrics</li>
                                    <li><strong>Benchmark Analysis:</strong> Compare against standards</li>
                                    <li><strong>Issue Identification:</strong> Find problem areas</li>
                                    <li><strong>Root Cause Analysis:</strong> Understand why</li>
                                    <li><strong>Action Planning:</strong> Create optimization roadmap</li>
                                </ol>
                            `
                        }
                    ]
                }
            },
            {
                id: 3,
                title: 'Competitive Intelligence & Benchmarking',
                type: 'lessons',
                duration: '2.5 hours',
                content: {
                    overview: `Analyze competitors and establish performance benchmarks to stay ahead in your market.`,
                    lessons: [
                        {
                            title: 'Competitive Analysis Tools',
                            content: `
                                <h4>Essential Tools</h4>
                                <ul>
                                    <li>Auction Insights Report</li>
                                    <li>SEMrush / SpyFu</li>
                                    <li>Facebook Ad Library</li>
                                    <li>Google Trends</li>
                                </ul>
                            `
                        }
                    ]
                }
            },
            {
                id: 4,
                title: 'Advanced Reporting & Visualization',
                type: 'lessons',
                duration: '3 hours',
                content: {
                    overview: `Create impactful reports and data visualizations that drive decision-making.`,
                    lessons: [
                        {
                            title: 'Data Visualization Best Practices',
                            content: `
                                <h4>Choosing the Right Chart</h4>
                                <ul>
                                    <li><strong>Line Charts:</strong> Trends over time</li>
                                    <li><strong>Bar Charts:</strong> Comparisons</li>
                                    <li><strong>Pie Charts:</strong> Parts of a whole</li>
                                    <li><strong>Heatmaps:</strong> Multi-dimensional data</li>
                                </ul>
                            `
                        }
                    ]
                }
            },
            {
                id: 5,
                title: 'Advanced Optimization Strategies',
                type: 'lessons',
                duration: '4 hours',
                content: {
                    overview: `Implement advanced optimization techniques for maximum ROI.`,
                    lessons: [
                        {
                            title: 'Bid Strategy Optimization',
                            content: `
                                <h4>Smart Bidding Strategies</h4>
                                <ul>
                                    <li>Target CPA</li>
                                    <li>Target ROAS</li>
                                    <li>Maximize Conversions</li>
                                    <li>Maximize Conversion Value</li>
                                </ul>
                            `
                        }
                    ]
                }
            }
        ]
    },
    
    'cpc-adrank': {
        modules: [
            {
                id: 1,
                title: 'The Ad Rank Formula Myth',
                type: 'lessons',
                duration: '45 minutes',
                content: {
                    overview: `Discover why the commonly taught "Ad Rank = Bid × Quality Score" formula is oversimplified and understand what Google actually uses.`,
                    lessons: [
                        {
                            title: 'Industry Misconceptions',
                            content: `
                                <div class="alert-box">
                                    <div class="alert-icon">⚠️</div>
                                    <div>
                                        <strong>Industry Misconception:</strong> Many guides teach "Ad Rank = Bid × Quality Score" but this is NOT the real formula! Google uses a complex algorithm with 6 major factors.
                                    </div>
                                </div>
                                
                                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem; margin: 3rem 0;">
                                    <div class="formula-box" style="border-left: 4px solid #ea4335;">
                                        <h3 style="color: #ea4335; margin-bottom: 1rem;">❌ The Myth (Oversimplified)</h3>
                                        <div class="formula" style="background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);">
                                            Ad Rank = Max CPC Bid × Quality Score
                                        </div>
                                        <p style="margin-top: 1rem;">
                                            <strong>Why it's taught:</strong><br>
                                            • Easy to understand<br>
                                            • Partially true<br>
                                            • Good for basic concepts<br>
                                            • Historical accuracy
                                        </p>
                                    </div>
                                    
                                    <div class="formula-box" style="border-left: 4px solid #34a853;">
                                        <h3 style="color: #34a853; margin-bottom: 1rem;">✅ The Reality (Complex)</h3>
                                        <div class="formula" style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);">
                                            Ad Rank = f(bid, quality, thresholds, competition, context, extensions, ML_signals...)
                                        </div>
                                        <p style="margin-top: 1rem;">
                                            <strong>Why it's hidden:</strong><br>
                                            • Proprietary algorithm<br>
                                            • Uses machine learning<br>
                                            • Hundreds of signals<br>
                                            • Constantly evolving
                                        </p>
                                    </div>
                                </div>
                                
                                <div style="background: linear-gradient(135deg, #f6f8fb 0%, #e9ecef 100%); padding: 2rem; border-radius: 16px; margin: 2rem 0;">
                                    <h3 style="text-align: center; color: #4285f4; margin-bottom: 1.5rem;">
                                        🔍 What Google Actually Says
                                    </h3>
                                    <blockquote style="font-style: italic; border-left: 4px solid #4285f4; padding-left: 1.5rem; margin: 1rem 0;">
                                        "At a high level, Ad Rank scores are based on 6 factors..."
                                    </blockquote>
                                    <p style="text-align: center; margin-top: 1rem;">
                                        <strong>No formula provided - just factor categories!</strong>
                                    </p>
                                </div>
                            `,
                            quiz: [
                                {
                                    question: 'What is the main problem with the commonly taught Ad Rank formula?',
                                    options: [
                                        'It\'s completely false',
                                        'It\'s oversimplified and doesn\'t reflect Google\'s actual complex algorithm',
                                        'It only works for small businesses',
                                        'It\'s too complicated for beginners'
                                    ],
                                    correct: 1
                                },
                                {
                                    question: 'How many factors does Google actually use for Ad Rank calculation?',
                                    options: ['2 factors', '4 factors', '6 major factors plus hundreds of signals', '10 factors'],
                                    correct: 2
                                }
                            ]
                        }
                    ]
                }
            },
            {
                id: 2,
                title: 'The 6 Real Ad Rank Factors',
                type: 'lessons',
                duration: '30 minutes',
                content: {
                    overview: `Deep dive into the 6 actual factors that Google uses to calculate Ad Rank, and how each impacts your ad performance.`,
                    lessons: [
                        {
                            title: 'All 6 Factors Explained',
                            content: `
                                <h3 style="text-align: center; font-size: 1.8rem; margin: 3rem 0 2rem 0;">
                                    The 6 Real Factors That Determine Your Ad Rank
                                </h3>
                                
                                <div class="factors-grid">
                                    <div class="factor-card">
                                        <span class="factor-number">1</span>
                                        <div class="factor-title">Your Bid</div>
                                        <p>The maximum you're willing to pay per click. You often pay less than this maximum, and can adjust anytime.</p>
                                    </div>

                                    <div class="factor-card">
                                        <span class="factor-number">2</span>
                                        <div class="factor-title">Ad & Landing Page Quality</div>
                                        <p>Relevance, usefulness, navigation ease, and alignment between ad promise and landing page delivery. Summarized in your Quality Score (1-10).</p>
                                    </div>

                                    <div class="factor-card">
                                        <span class="factor-number">3</span>
                                        <div class="factor-title">Ad Rank Thresholds</div>
                                        <p>Minimum quality standards your ad must meet to show at all, and separate thresholds for premium positions.</p>
                                    </div>

                                    <div class="factor-card">
                                        <span class="factor-number">4</span>
                                        <div class="factor-title">Auction Competitiveness</div>
                                        <p>How close your competitors' Ad Ranks are to yours. Tighter competition can increase your CPC.</p>
                                    </div>

                                    <div class="factor-card">
                                        <span class="factor-number">5</span>
                                        <div class="factor-title">Search Context</div>
                                        <p>User's location, device, time of search, search terms, other ads on the page, and user signals.</p>
                                    </div>

                                    <div class="factor-card">
                                        <span class="factor-number">6</span>
                                        <div class="factor-title">Ad Assets & Formats</div>
                                        <p>Expected impact of extensions like sitelinks, callouts, structured snippets, and other ad enhancements.</p>
                                    </div>
                                </div>
                                
                                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 3rem; border-radius: 16px; margin: 3rem 0;">
                                    <h3 style="color: white; text-align: center; margin-bottom: 1.5rem;">💡 What This Means For You</h3>
                                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
                                        <div style="padding: 1.5rem; background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); border-radius: 12px; border: 1px solid rgba(255,255,255,0.3);">
                                            <h4 style="color: white; margin-bottom: 0.5rem; font-weight: 600;">Stop Calculating</h4>
                                            <p style="color: white; margin: 0; line-height: 1.6;">You can't reverse-engineer Ad Rank. Focus on what you can control instead.</p>
                                        </div>
                                        <div style="padding: 1.5rem; background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); border-radius: 12px; border: 1px solid rgba(255,255,255,0.3);">
                                            <h4 style="color: white; margin-bottom: 0.5rem; font-weight: 600;">Quality Still Matters</h4>
                                            <p style="color: white; margin: 0; line-height: 1.6;">Even if the formula is complex, improving Quality Score always helps.</p>
                                        </div>
                                        <div style="padding: 1.5rem; background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); border-radius: 12px; border: 1px solid rgba(255,255,255,0.3);">
                                            <h4 style="color: white; margin-bottom: 0.5rem; font-weight: 600;">Trust Smart Bidding</h4>
                                            <p style="color: white; margin: 0; line-height: 1.6;">Google's AI has access to all signals - let it optimize for you.</p>
                                        </div>
                                        <div style="padding: 1.5rem; background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); border-radius: 12px; border: 1px solid rgba(255,255,255,0.3);">
                                            <h4 style="color: white; margin-bottom: 0.5rem; font-weight: 600;">Test Everything</h4>
                                            <p style="color: white; margin: 0; line-height: 1.6;">Since you can't predict Ad Rank, test different approaches and measure results.</p>
                                        </div>
                                    </div>
                                </div>
                            `,
                            quiz: [
                                {
                                    question: 'Which Ad Rank factor includes sitelinks, callouts, and structured snippets?',
                                    options: [
                                        'Your Bid',
                                        'Ad & Landing Page Quality',
                                        'Search Context',
                                        'Ad Assets & Formats'
                                    ],
                                    correct: 3
                                },
                                {
                                    question: 'What does "Auction Competitiveness" refer to?',
                                    options: [
                                        'How much you\'re willing to bid',
                                        'How close your competitors\' Ad Ranks are to yours',
                                        'The quality of your landing page',
                                        'The number of ads in the auction'
                                    ],
                                    correct: 1
                                }
                            ]
                        }
                    ]
                }
            },
            {
                id: 3,
                title: 'Understanding Ad Rank Thresholds',
                type: 'lessons',
                duration: '20 minutes',
                content: {
                    overview: `Learn how Google runs multiple auctions with different thresholds for each ad position.`,
                    lessons: [
                        {
                            title: 'Threshold Visualization',
                            content: `
                                <p style="text-align: center; font-size: 1.2rem; margin-bottom: 2rem;">
                                    Google runs multiple auctions with different thresholds for each ad position
                                </p>

                                <div style="background: white; border-radius: 16px; padding: 2.5rem; box-shadow: 0 10px 30px rgba(0,0,0,0.1); margin: 3rem 0;">
                                    <h3 style="text-align: center; margin-bottom: 2rem; color: #4285f4;">
                                        Ad Position Thresholds Visualization
                                    </h3>
                                    <div style="position: relative; height: 300px; background: linear-gradient(to top, #ffeaa7 0%, #fdcb6e 50%, #f39c12 100%); border-radius: 12px; margin: 2rem 0; display: flex; flex-direction: column; justify-content: flex-end; padding: 1rem;">
                                        <div style="position: absolute; left: 0; right: 0; top: 20%; border-top: 2px dashed rgba(255,255,255,0.5); padding: 0.5rem; color: white; font-weight: 600; background: rgba(66, 133, 244, 0.9);">
                                            <strong>Absolute Top Position</strong><br>
                                            Threshold: 40+ Ad Rank<br>
                                            Premium visibility above all results
                                        </div>
                                        <div style="position: absolute; left: 0; right: 0; top: 50%; border-top: 2px dashed rgba(255,255,255,0.5); padding: 0.5rem; color: white; font-weight: 600; background: rgba(52, 168, 83, 0.9);">
                                            <strong>Top Positions</strong><br>
                                            Threshold: 20+ Ad Rank<br>
                                            Above organic results
                                        </div>
                                        <div style="position: absolute; left: 0; right: 0; top: 80%; border-top: 2px dashed rgba(255,255,255,0.5); padding: 0.5rem; color: white; font-weight: 600; background: rgba(234, 67, 53, 0.9);">
                                            <strong>Other Positions</strong><br>
                                            Threshold: 0+ Ad Rank<br>
                                            Bottom or side of page
                                        </div>
                                    </div>
                                    <p style="text-align: center; margin-top: 1rem; font-style: italic;">
                                        Ads with negative Ad Rank scores are ineligible to show anywhere
                                    </p>
                                </div>
                            `
                        }
                    ]
                }
            },
            {
                id: 4,
                title: 'Live Auction Simulation',
                type: 'lessons',
                duration: '25 minutes',
                content: {
                    overview: `See how different advertisers compete in real auctions and what they actually pay.`,
                    lessons: [
                        {
                            title: 'Auction Example',
                            content: `
                                <p style="text-align: center; font-size: 1.2rem; margin-bottom: 2rem;">
                                    See how different advertisers compete and what they actually pay
                                </p>

                                <div class="auction-simulation">
                                    <table class="auction-table">
                                        <thead>
                                            <tr>
                                                <th>Advertiser</th>
                                                <th>Max Bid</th>
                                                <th>Quality Score</th>
                                                <th>Ad Rank</th>
                                                <th>Position</th>
                                                <th>Actual CPC</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><strong>Company A</strong></td>
                                                <td>€1.00</td>
                                                <td>10 ⭐</td>
                                                <td>80</td>
                                                <td><span style="background: #ffd700; color: #333; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.9rem; font-weight: 600;">1st - Absolute Top</span></td>
                                                <td><strong>€0.51</strong></td>
                                            </tr>
                                            <tr>
                                                <td><strong>Company B</strong></td>
                                                <td>€2.00</td>
                                                <td>5 ⭐</td>
                                                <td>50</td>
                                                <td><span style="background: #c0c0c0; color: #333; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.9rem; font-weight: 600;">2nd - Top</span></td>
                                                <td><strong>€1.01</strong></td>
                                            </tr>
                                            <tr>
                                                <td><strong>Company C</strong></td>
                                                <td>€1.50</td>
                                                <td>4 ⭐</td>
                                                <td>30</td>
                                                <td><span style="background: #cd7f32; color: white; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.9rem; font-weight: 600;">3rd - Other</span></td>
                                                <td><strong>€0.61</strong></td>
                                            </tr>
                                            <tr>
                                                <td><strong>Company D</strong></td>
                                                <td>€3.00</td>
                                                <td>2 ⭐</td>
                                                <td>10</td>
                                                <td><span style="background: #666; color: white; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.9rem; font-weight: 600;">4th - Other</span></td>
                                                <td><strong>Min. bid</strong></td>
                                            </tr>
                                            <tr style="opacity: 0.5;">
                                                <td><strong>Company E</strong></td>
                                                <td>€2.50</td>
                                                <td>1 ⭐</td>
                                                <td>-10</td>
                                                <td><span style="background: #ea4335; color: white; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.9rem; font-weight: 600;">Not Shown</span></td>
                                                <td>-</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div style="margin-top: 2rem; padding: 1.5rem; background: #f8f9fa; border-radius: 12px;">
                                        <strong>💡 Key Observations:</strong>
                                        <ul style="margin-top: 0.5rem; margin-left: 1.5rem;">
                                            <li>Company A pays only €0.51 despite bidding €1.00 (thanks to high quality)</li>
                                            <li>Company B pays more than Company A despite lower position (due to poor quality)</li>
                                            <li>Company E doesn't show at all - negative Ad Rank below threshold</li>
                                        </ul>
                                    </div>
                                </div>
                            `,
                            quiz: [
                                {
                                    question: 'In the auction example, why does Company A pay only €0.51 despite having a €1.00 max bid?',
                                    options: [
                                        'Google is giving them a discount',
                                        'Their high Quality Score (10) allows them to pay less while staying competitive',
                                        'They negotiated a special rate with Google',
                                        'It\'s an error in the system'
                                    ],
                                    correct: 1
                                },
                                {
                                    question: 'What happened to Company E in this auction?',
                                    options: [
                                        'They got the 5th position',
                                        'They didn\'t show at all due to negative Ad Rank below threshold',
                                        'They paid the minimum bid',
                                        'They got a discount due to low competition'
                                    ],
                                    correct: 1
                                }
                            ]
                        }
                    ]
                }
            },
            {
                id: 5,
                title: 'Quality Score Deep Dive',
                type: 'lessons',
                duration: '20 minutes',
                content: {
                    overview: `Understand how Quality Score directly impacts both your ad position and costs.`,
                    lessons: [
                        {
                            title: 'Quality Score Impact',
                            content: `
                                <p style="text-align: center; font-size: 1.2rem; margin-bottom: 2rem;">
                                    Your Quality Score (1-10) directly impacts both position and cost
                                </p>

                                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-top: 2rem;">
                                    <div style="background: white; border-radius: 12px; padding: 2rem; text-align: center; box-shadow: 0 5px 20px rgba(0,0,0,0.08);">
                                        <div style="font-size: 3rem; font-weight: bold; background: linear-gradient(135deg, #4285f4 0%, #34a853 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">7+</div>
                                        <h3 style="color: #34a853; margin: 1rem 0;">Excellent</h3>
                                        <p>Lower CPCs, better positions, eligible for all ad formats</p>
                                    </div>
                                    <div style="background: white; border-radius: 12px; padding: 2rem; text-align: center; box-shadow: 0 5px 20px rgba(0,0,0,0.08);">
                                        <div style="font-size: 3rem; font-weight: bold; background: linear-gradient(135deg, #4285f4 0%, #34a853 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">4-6</div>
                                        <h3 style="color: #fbbc04; margin: 1rem 0;">Average</h3>
                                        <p>Room for improvement, moderate CPCs, limited ad formats</p>
                                    </div>
                                    <div style="background: white; border-radius: 12px; padding: 2rem; text-align: center; box-shadow: 0 5px 20px rgba(0,0,0,0.08);">
                                        <div style="font-size: 3rem; font-weight: bold; background: linear-gradient(135deg, #4285f4 0%, #34a853 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">1-3</div>
                                        <h3 style="color: #ea4335; margin: 1rem 0;">Poor</h3>
                                        <p>High CPCs, poor positions, may not show at all</p>
                                    </div>
                                </div>

                                <div style="background: white; border-radius: 16px; padding: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.1); margin: 3rem 0; border-left: 4px solid #4285f4;">
                                    <h3 style="color: #4285f4; margin-bottom: 1rem;">✅ The Formula That IS Real: Actual CPC</h3>
                                    <div class="formula">
                                        Actual CPC = (Ad Rank to beat ÷ Your Quality Score) + €0.01
                                    </div>
                                    <p style="text-align: center; margin-top: 1rem; padding: 1rem; background: #e8f5e9; border-radius: 8px;">
                                        <strong>This formula IS confirmed by Google!</strong><br>
                                        Example: If competitor's Ad Rank is 50 and your QS is 10:<br>
                                        50 ÷ 10 + €0.01 = <strong>€5.01</strong> (even if you bid €20!)
                                    </p>
                                </div>
                            `,
                            quiz: [
                                {
                                    question: 'What Quality Score range is considered "Excellent"?',
                                    options: ['1-3', '4-6', '7+', '8-10'],
                                    correct: 2
                                },
                                {
                                    question: 'Using the confirmed CPC formula, if a competitor\'s Ad Rank is 40 and your Quality Score is 8, what would your actual CPC be?',
                                    options: ['€5.00', '€5.01', '€8.01', '€40.01'],
                                    correct: 1
                                }
                            ]
                        }
                    ]
                }
            },
            {
                id: 6,
                title: 'Modern CPC Strategy',
                type: 'lessons',
                duration: '30 minutes',
                content: {
                    overview: `Learn the modern approach to CPC management and why manual bidding is obsolete.`,
                    lessons: [
                        {
                            title: 'Old vs New Approach',
                            content: `
                                <p style="text-align: center; font-size: 1.2rem; margin-bottom: 2rem;">
                                    Stop managing CPCs manually - let the machines do the math
                                </p>

                                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-top: 3rem;">
                                    <div style="background: white; border-radius: 16px; padding: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.1); margin: 2rem 0; border-left: 4px solid #ea4335;">
                                        <h3 style="color: #ea4335; margin-bottom: 1rem;">❌ Old Way</h3>
                                        <ul style="list-style: none; padding: 0;">
                                            <li>✓ Manual CPC bidding</li>
                                            <li>✓ Obsessing over costs</li>
                                            <li>✓ Position-based goals</li>
                                            <li>✓ Keyword-level management</li>
                                            <li>✓ Fighting for #1 position</li>
                                        </ul>
                                    </div>
                                    
                                    <div style="background: white; border-radius: 16px; padding: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.1); margin: 2rem 0; border-left: 4px solid #34a853;">
                                        <h3 style="color: #34a853; margin-bottom: 1rem;">✅ New Way</h3>
                                        <ul style="list-style: none; padding: 0;">
                                            <li>✓ Smart bidding strategies</li>
                                            <li>✓ ROAS/CPA targets</li>
                                            <li>✓ Conversion-based goals</li>
                                            <li>✓ Audience-level optimization</li>
                                            <li>✓ Maximizing profitable conversions</li>
                                        </ul>
                                    </div>
                                </div>

                                <div style="background: linear-gradient(135deg, #38ef7d 0%, #11998e 100%); color: white; padding: 3rem; border-radius: 16px; margin: 3rem 0;">
                                    <h3 style="font-size: 2rem;">Remember This:</h3>
                                    <p style="font-size: 1.3rem; margin-top: 1rem;">
                                        In 2025, successful advertisers don't manage bids - they manage value.<br>
                                        Feed Google your business goals and let the algorithms find your customers.
                                    </p>
                                </div>
                            `,
                            quiz: [
                                {
                                    question: 'What is the main focus of the "New Way" of CPC management in 2025?',
                                    options: [
                                        'Fighting for #1 position',
                                        'Manual keyword-level bidding',
                                        'Managing value through smart bidding and conversion goals',
                                        'Obsessing over individual click costs'
                                    ],
                                    correct: 2
                                },
                                {
                                    question: 'Which bidding approach is recommended for modern Google Ads campaigns?',
                                    options: [
                                        'Manual CPC with position-based goals',
                                        'Smart bidding strategies with ROAS/CPA targets',
                                        'Enhanced CPC with keyword-level management',
                                        'Cost-per-thousand impressions (CPM)'
                                    ],
                                    correct: 1
                                }
                            ]
                        }
                    ],
                    exercises: [
                        {
                            title: 'CPC Calculator',
                            description: 'Calculate your actual CPC using the real formula',
                            type: 'calculator'
                        },
                        {
                            title: 'Quality Score Audit',
                            description: 'Audit your current campaigns for Quality Score improvements',
                            type: 'worksheet'
                        }
                    ]
                }
            }
        ]
    },
    
    'keyword-research': {
        modules: [
            {
                id: 1,
                title: 'Keyword Research Fundamentals',
                type: 'lessons',
                duration: '2 hours',
                content: {
                    overview: `Master the art of finding profitable keywords that drive conversions.`,
                    lessons: [
                        {
                            title: 'Understanding Search Intent',
                            content: `
                                <h4>Types of Search Intent</h4>
                                <ul>
                                    <li><strong>Navigational:</strong> Looking for specific website</li>
                                    <li><strong>Informational:</strong> Seeking information</li>
                                    <li><strong>Commercial:</strong> Researching before purchase</li>
                                    <li><strong>Transactional:</strong> Ready to buy</li>
                                </ul>
                            `
                        }
                    ]
                }
            },
            {
                id: 2,
                title: 'Advanced Keyword Strategies',
                type: 'lessons',
                duration: '2 hours',
                content: {
                    overview: `Advanced techniques for keyword optimization and expansion.`,
                    lessons: [
                        {
                            title: 'Match Type Strategies',
                            content: `
                                <h4>Match Types Explained</h4>
                                <ul>
                                    <li><strong>Broad Match:</strong> Maximum reach, less control</li>
                                    <li><strong>Phrase Match:</strong> Balanced approach</li>
                                    <li><strong>Exact Match:</strong> Maximum control</li>
                                </ul>
                            `
                        }
                    ]
                }
            }
        ]
    }
};

// Helper functions for content retrieval
function getCourseContent(courseId) {
    return courseContent[courseId] || null;
}

function getModuleContent(courseId, moduleId) {
    const course = courseContent[courseId];
    if (!course) return null;
    
    return course.modules.find(m => m.id === moduleId) || null;
}

function getAllCourseContent() {
    return courseContent;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        courseContent,
        getCourseContent,
        getModuleContent,
        getAllCourseContent
    };
}