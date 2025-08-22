// Unified Course Content Management System
// All course content is stored here in a consistent structure

const courseContent = {
    'performance-analysis': {
        modules: [
            {
                id: 1,
                title: 'KPI Foundation & Analysis Framework',
                type: 'lessons',
                duration: '2.5 hours',
                content: {
                    overview: `Master the metrics that matter and build your analytical mindset. Learn the three-tier KPI hierarchy, attribution models, and practical analysis techniques.`,
                    lessons: [
                        {
                            title: 'Day 1: The KPI Hierarchy',
                            content: `
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
                                                <li>Identify the weakest KPI against benchmarks</li>
                                                <li>Project new ROAS if CTR improves to 4%</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            `
                        },
                        {
                            title: 'Day 2: KPI Relationships & Calculations',
                            content: `
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
                                        </tbody>
                                    </table>
                                </div>
                            `
                        },
                        {
                            title: 'Day 3: Attribution Models & Their Impact',
                            content: `
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
                            `
                        },
                        {
                            title: 'Day 4: Attribution in Practice',
                            content: `
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
                            `
                        },
                        {
                            title: 'Day 5: Module 1 Checkpoint',
                            content: `
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
                                </div>
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
                    overview: `Learn to diagnose performance issues like a pro. Master the 5-step audit framework, advanced segmentation, and search query analysis techniques.`,
                    lessons: [
                        {
                            title: 'Day 6: The Diagnostic Framework',
                            content: `
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
                            `
                        },
                        {
                            title: 'Day 7: Advanced Segmentation Analysis',
                            content: `
                                <h4>Segmentation Mastery</h4>
                                <p>Learn to slice and dice your data to uncover hidden performance issues and opportunities.</p>
                                
                                <h5>Multi-Dimensional Segmentation</h5>
                                <ul>
                                    <li>Device × Time of Day</li>
                                    <li>Geography × Demographics</li>
                                    <li>Campaign Type × Audience</li>
                                    <li>Keywords × Match Type × Device</li>
                                </ul>

                                <h5>Statistical Significance</h5>
                                <p>Ensure your findings are meaningful:</p>
                                <ul>
                                    <li>Minimum sample size: 100 clicks per segment</li>
                                    <li>Confidence level: 95% for major decisions</li>
                                    <li>Use control periods for comparison</li>
                                </ul>
                            `
                        },
                        {
                            title: 'Day 8: Search Query Analysis',
                            content: `
                                <h4>Mining Search Query Gold</h4>
                                <p>Search queries reveal user intent and optimization opportunities.</p>
                                
                                <h5>Query Classification System</h5>
                                <ul>
                                    <li><strong>Navigational:</strong> Looking for specific brands/sites</li>
                                    <li><strong>Informational:</strong> Research phase queries</li>
                                    <li><strong>Commercial:</strong> Comparison shopping</li>
                                    <li><strong>Transactional:</strong> Ready to buy</li>
                                </ul>

                                <h5>N-Gram Analysis</h5>
                                <p>Break down queries into components to find patterns:</p>
                                <ul>
                                    <li>1-grams: Individual words</li>
                                    <li>2-grams: Two-word combinations</li>
                                    <li>3-grams: Three-word phrases</li>
                                </ul>
                            `
                        },
                        {
                            title: 'Day 9: Quality Score Deep Dive',
                            content: `
                                <h4>Quality Score Optimization</h4>
                                <p>Master the three components of Quality Score and their impact on performance.</p>
                                
                                <h5>Component Breakdown</h5>
                                <ul>
                                    <li><strong>Expected CTR (40%):</strong> Historical performance vs competitors</li>
                                    <li><strong>Ad Relevance (30%):</strong> Keyword to ad copy alignment</li>
                                    <li><strong>Landing Page Experience (30%):</strong> Page quality and relevance</li>
                                </ul>

                                <h5>Quality Score Impact on CPC</h5>
                                <table>
                                    <tr><th>Quality Score</th><th>CPC Adjustment</th></tr>
                                    <tr><td>10</td><td>-50%</td></tr>
                                    <tr><td>8-9</td><td>-25%</td></tr>
                                    <tr><td>7</td><td>0%</td></tr>
                                    <tr><td>5-6</td><td>+25%</td></tr>
                                    <tr><td>1-4</td><td>+200%</td></tr>
                                </table>
                            `
                        },
                        {
                            title: 'Day 10: Module 2 Checkpoint',
                            content: `
                                <h4>Performance Diagnostic Mastery Test</h4>
                                
                                <div class="checkpoint-exercise">
                                    <h5>Scenario Analysis</h5>
                                    <p>You're given an account with declining ROAS. Use the diagnostic framework to identify issues:</p>
                                    <ul>
                                        <li>Account ROAS dropped 25% month-over-month</li>
                                        <li>Click volume increased 15%</li>
                                        <li>Average CPC increased 35%</li>
                                        <li>Conversion rate remained stable</li>
                                    </ul>
                                    
                                    <h5>Your Analysis Should Include:</h5>
                                    <ol>
                                        <li>Likely root causes</li>
                                        <li>Segments to investigate</li>
                                        <li>Immediate actions to take</li>
                                        <li>Long-term optimization plan</li>
                                    </ol>
                                </div>

                                <h4>Module 2 Skills Checklist</h4>
                                <div class="completion-checklist">
                                    <label><input type="checkbox"> Mastered 5-step diagnostic framework</label>
                                    <label><input type="checkbox"> Can perform multi-dimensional segmentation</label>
                                    <label><input type="checkbox"> Understand search query analysis</label>
                                    <label><input type="checkbox"> Know Quality Score optimization tactics</label>
                                    <label><input type="checkbox"> Built performance audit template</label>
                                </div>
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
                    overview: `Master competitive analysis using Auction Insights, understand market dynamics, and build strategies to outmaneuver competitors.`,
                    lessons: [
                        {
                            title: 'Day 11: Auction Insights Mastery',
                            content: `
                                <h4>Learning Objectives</h4>
                                <ul>
                                    <li>Master all Auction Insights metrics</li>
                                    <li>Identify competitive threats and opportunities</li>
                                    <li>Build competitive response strategies</li>
                                </ul>

                                <h4>Auction Insights Metrics Decoded</h4>
                                
                                <div class="metrics-breakdown">
                                    <div class="metric-card">
                                        <h5>Impression Share</h5>
                                        <p>The percentage of impressions you received out of the total you were eligible for.</p>
                                        <ul>
                                            <li><strong>&gt;60%:</strong> Dominant position</li>
                                            <li><strong>30-60%:</strong> Competitive position</li>
                                            <li><strong>&lt;30%:</strong> Opportunity to grow</li>
                                        </ul>
                                    </div>
                                    
                                    <div class="metric-card">
                                        <h5>Overlap Rate</h5>
                                        <p>How often a competitor's ad appeared alongside yours.</p>
                                        <ul>
                                            <li><strong>&gt;70%:</strong> Direct competitor</li>
                                            <li><strong>40-70%:</strong> Partial competitor</li>
                                            <li><strong>&lt;40%:</strong> Different focus</li>
                                        </ul>
                                    </div>
                                    
                                    <div class="metric-card">
                                        <h5>Position Above Rate</h5>
                                        <p>When you both showed, how often they ranked higher.</p>
                                        <ul>
                                            <li><strong>&gt;60%:</strong> They're winning auctions</li>
                                            <li><strong>40-60%:</strong> Evenly matched</li>
                                            <li><strong>&lt;40%:</strong> You're winning</li>
                                        </ul>
                                    </div>
                                    
                                    <div class="metric-card">
                                        <h5>Top of Page Rate</h5>
                                        <p>How often your ad appeared at the top of the page.</p>
                                        <ul>
                                            <li><strong>&gt;80%:</strong> Premium positioning</li>
                                            <li><strong>50-80%:</strong> Good visibility</li>
                                            <li><strong>&lt;50%:</strong> Need bid/quality improvements</li>
                                        </ul>
                                    </div>
                                    
                                    <div class="metric-card">
                                        <h5>Outranking Share</h5>
                                        <p>How often you ranked higher or they didn't show.</p>
                                        <p><strong>Formula:</strong> (Position Above + No Show) ÷ Total Eligible Impressions</p>
                                    </div>
                                </div>

                                <h4>Competitive Response Matrix</h4>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Competitor Status</th>
                                            <th>Indicators</th>
                                            <th>Response Strategy</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>New Entrant</td>
                                            <td>Sudden appearance, low share</td>
                                            <td>Monitor for 2 weeks, defend key terms</td>
                                        </tr>
                                        <tr>
                                            <td>Growing Threat</td>
                                            <td>Increasing share, overlap rising</td>
                                            <td>Increase bids on overlap keywords</td>
                                        </tr>
                                        <tr>
                                            <td>Dominant Player</td>
                                            <td>High share, position above</td>
                                            <td>Find niche opportunities, improve quality</td>
                                        </tr>
                                        <tr>
                                            <td>Declining</td>
                                            <td>Decreasing share, less overlap</td>
                                            <td>Capture their abandoned keywords</td>
                                        </tr>
                                    </tbody>
                                </table>
                            `
                        },
                        {
                            title: 'Day 12: Competitive Strategy Development',
                            content: `
                                <h4>Building Your Competitive Playbook</h4>
                                
                                <h5>The 4 Competitive Strategies</h5>
                                
                                <div class="strategy-cards">
                                    <div class="strategy-card">
                                        <h6>1. Head-to-Head Competition</h6>
                                        <p><strong>When to use:</strong> You have comparable or better resources</p>
                                        <ul>
                                            <li>Match or exceed competitor bids</li>
                                            <li>Improve ad quality and relevance</li>
                                            <li>Enhance landing page experience</li>
                                        </ul>
                                    </div>
                                    
                                    <div class="strategy-card">
                                        <h6>2. Flanking Strategy</h6>
                                        <p><strong>When to use:</strong> Competitor is stronger in main keywords</p>
                                        <ul>
                                            <li>Target long-tail variations</li>
                                            <li>Focus on different times/locations</li>
                                            <li>Target different audience segments</li>
                                        </ul>
                                    </div>
                                    
                                    <div class="strategy-card">
                                        <h6>3. Differentiation Strategy</h6>
                                        <p><strong>When to use:</strong> Need to stand out in crowded market</p>
                                        <ul>
                                            <li>Unique value propositions</li>
                                            <li>Different ad formats/extensions</li>
                                            <li>Exclusive offers or features</li>
                                        </ul>
                                    </div>
                                    
                                    <div class="strategy-card">
                                        <h6>4. Guerrilla Tactics</h6>
                                        <p><strong>When to use:</strong> Limited budget vs larger competitors</p>
                                        <ul>
                                            <li>Dayparting when they're inactive</li>
                                            <li>Competitor brand campaigns</li>
                                            <li>Rapid testing and iteration</li>
                                        </ul>
                                    </div>
                                </div>
                            `
                        },
                        {
                            title: 'Day 13: Industry Benchmarking',
                            content: `
                                <h4>Industry Performance Standards</h4>
                                
                                <h5>2024 Industry Benchmarks</h5>
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
                                            <td>E-commerce</td>
                                            <td>2.69%</td>
                                            <td>$1.16</td>
                                            <td>2.81%</td>
                                            <td>$45.27</td>
                                        </tr>
                                        <tr>
                                            <td>B2B</td>
                                            <td>2.41%</td>
                                            <td>$3.33</td>
                                            <td>3.04%</td>
                                            <td>$116.13</td>
                                        </tr>
                                        <tr>
                                            <td>Healthcare</td>
                                            <td>3.27%</td>
                                            <td>$2.62</td>
                                            <td>3.36%</td>
                                            <td>$78.09</td>
                                        </tr>
                                        <tr>
                                            <td>Finance</td>
                                            <td>3.44%</td>
                                            <td>$3.44</td>
                                            <td>5.10%</td>
                                            <td>$81.93</td>
                                        </tr>
                                        <tr>
                                            <td>Legal</td>
                                            <td>4.24%</td>
                                            <td>$6.75</td>
                                            <td>6.98%</td>
                                            <td>$96.55</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <h5>Creating Performance Scorecards</h5>
                                <div class="scorecard-formula">
                                    <h6>Relative Performance Index (RPI)</h6>
                                    <code>RPI = (Your Metric / Industry Benchmark) × 100</code>
                                    <ul>
                                        <li>&gt;120: Excellent (A)</li>
                                        <li>100-120: Good (B)</li>
                                        <li>80-100: Average (C)</li>
                                        <li>60-80: Below Average (D)</li>
                                        <li>&lt;60: Poor (F)</li>
                                    </ul>
                                </div>
                            `
                        },
                        {
                            title: 'Day 14: Market Dynamics & Seasonal Patterns',
                            content: `
                                <h4>Understanding Market Dynamics</h4>
                                
                                <h5>Seasonal Planning Framework</h5>
                                
                                <div class="seasonal-timeline">
                                    <h6>Pre-Season Preparation (T-60 days)</h6>
                                    <ul>
                                        <li><strong>8 weeks before:</strong> Analyze previous year data</li>
                                        <li><strong>6 weeks before:</strong> Launch early bird campaigns</li>
                                        <li><strong>4 weeks before:</strong> Increase budgets gradually</li>
                                        <li><strong>2 weeks before:</strong> Final bid adjustments</li>
                                    </ul>
                                </div>

                                <h5>Industry Seasonal Patterns</h5>
                                <div class="seasonal-patterns">
                                    <h6>E-commerce Monthly Index (100 = Average)</h6>
                                    <ul>
                                        <li>January: 85</li>
                                        <li>February: 80</li>
                                        <li>March-May: 95-105</li>
                                        <li>June-August: 90-95</li>
                                        <li>September-October: 100-110</li>
                                        <li>November: 140</li>
                                        <li>December: 180</li>
                                    </ul>
                                </div>
                            `
                        },
                        {
                            title: 'Day 15: Module 3 Checkpoint',
                            content: `
                                <h4>Competitive Intelligence Assessment</h4>
                                
                                <div class="quiz-section">
                                    <h5>Question: What does 70% overlap rate indicate?</h5>
                                    <ul>
                                        <li>A) They're not a real threat</li>
                                        <li>B) You're competing for the same queries ✓</li>
                                        <li>C) You should reduce budgets</li>
                                        <li>D) They have better Quality Score</li>
                                    </ul>
                                </div>

                                <h4>Module 3 Skills Checklist</h4>
                                <div class="completion-checklist">
                                    <label><input type="checkbox"> Mastered all Auction Insights metrics</label>
                                    <label><input type="checkbox"> Can calculate true market share</label>
                                    <label><input type="checkbox"> Understand competitive response strategies</label>
                                    <label><input type="checkbox"> Know industry benchmarks for your verticals</label>
                                    <label><input type="checkbox"> Can identify seasonal patterns</label>
                                    <label><input type="checkbox"> Built competitive tracking systems</label>
                                </div>

                                <h4>Key Formulas</h4>
                                <div class="formula-grid">
                                    <code>Market Share = Your IS / Total Market IS</code>
                                    <code>Competitive Threat Score = (Overlap × 0.4) + (Position Above × 0.3) + (IS Growth × 0.3)</code>
                                    <code>Seasonal Index = Period Performance / Annual Average × 100</code>
                                </div>
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
                    overview: `Transform data into actionable insights with automated reporting systems, Google Ads Scripts, and compelling data storytelling.`,
                    lessons: [
                        {
                            title: 'Day 16: Automated Reporting Systems',
                            content: `
                                <h4>Building Modern Reporting Systems</h4>
                                
                                <h5>Data Flow Architecture</h5>
                                <div class="architecture-flow">
                                    <div class="flow-layer">
                                        <h6>1. Data Sources</h6>
                                        <ul>
                                            <li>Google Ads API</li>
                                            <li>Google Analytics</li>
                                            <li>CRM Systems</li>
                                            <li>Third-party tools</li>
                                        </ul>
                                    </div>
                                    <div class="flow-layer">
                                        <h6>2. Processing Layer</h6>
                                        <ul>
                                            <li>Google Sheets</li>
                                            <li>BigQuery</li>
                                            <li>Scripts & Automation</li>
                                            <li>Data transformation</li>
                                        </ul>
                                    </div>
                                    <div class="flow-layer">
                                        <h6>3. Visualization Layer</h6>
                                        <ul>
                                            <li>Looker Studio</li>
                                            <li>Custom dashboards</li>
                                            <li>Email reports</li>
                                            <li>Real-time alerts</li>
                                        </ul>
                                    </div>
                                </div>

                                <h5>Automation Levels</h5>
                                <ul>
                                    <li><strong>Level 1 (Daily):</strong> Basic performance emails</li>
                                    <li><strong>Level 2 (Hourly):</strong> Budget pacing, bid adjustments</li>
                                    <li><strong>Level 3 (Real-time):</strong> Anomaly detection, predictive alerts</li>
                                </ul>
                            `
                        },
                        {
                            title: 'Day 17: Google Ads Scripts Mastery',
                            content: `
                                <h4>Essential Google Ads Scripts</h4>
                                
                                <h5>Script 1: Performance Alert System</h5>
                                <pre><code>
function main() {
  // Check for significant changes
  var accountPerformance = AdsApp.currentAccount().getStatsFor("YESTERDAY");
  var previousPerformance = AdsApp.currentAccount().getStatsFor("LAST_7_DAYS");
  
  var currentCPA = accountPerformance.getCost() / accountPerformance.getConversions();
  var avgCPA = previousPerformance.getCost() / previousPerformance.getConversions();
  
  if (currentCPA > avgCPA * 1.2) {
    // Send alert email
    MailApp.sendEmail("your@email.com", 
                     "CPA Alert", 
                     "CPA increased by " + ((currentCPA/avgCPA - 1) * 100).toFixed(2) + "%");
  }
}
                                </code></pre>

                                <h5>Script 2: Budget Pacing Monitor</h5>
                                <pre><code>
function checkBudgetPacing() {
  var campaigns = AdsApp.campaigns().get();
  var date = new Date();
  var dayOfMonth = date.getDate();
  var daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  var expectedSpendRatio = dayOfMonth / daysInMonth;
  
  while (campaigns.hasNext()) {
    var campaign = campaigns.next();
    var actualSpend = campaign.getStatsFor("THIS_MONTH").getCost();
    var monthlyBudget = campaign.getBudget().getAmount() * daysInMonth;
    var actualSpendRatio = actualSpend / monthlyBudget;
    
    if (Math.abs(actualSpendRatio - expectedSpendRatio) > 0.1) {
      // Flag for review
    }
  }
}
                                </code></pre>
                            `
                        },
                        {
                            title: 'Day 18: Data Visualization Best Practices',
                            content: `
                                <h4>Creating Impactful Visualizations</h4>
                                
                                <h5>Chart Selection Guide</h5>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Data Type</th>
                                            <th>Best Chart</th>
                                            <th>Use Case</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Trends over time</td>
                                            <td>Line chart</td>
                                            <td>Daily performance metrics</td>
                                        </tr>
                                        <tr>
                                            <td>Comparisons</td>
                                            <td>Bar chart</td>
                                            <td>Campaign performance</td>
                                        </tr>
                                        <tr>
                                            <td>Parts of whole</td>
                                            <td>Pie/Donut chart</td>
                                            <td>Budget allocation</td>
                                        </tr>
                                        <tr>
                                            <td>Correlation</td>
                                            <td>Scatter plot</td>
                                            <td>CPC vs Quality Score</td>
                                        </tr>
                                        <tr>
                                            <td>Multi-dimensional</td>
                                            <td>Heatmap</td>
                                            <td>Day/Hour performance</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <h5>Dashboard Design Principles</h5>
                                <ol>
                                    <li><strong>5-Second Rule:</strong> Key insights visible immediately</li>
                                    <li><strong>Progressive Disclosure:</strong> Summary → Details → Raw data</li>
                                    <li><strong>Visual Hierarchy:</strong> Size, color, position matter</li>
                                    <li><strong>Consistency:</strong> Same metrics, same colors</li>
                                    <li><strong>Context:</strong> Always show comparisons</li>
                                </ol>
                            `
                        },
                        {
                            title: 'Day 19: Executive Reporting',
                            content: `
                                <h4>Creating Executive-Level Reports</h4>
                                
                                <h5>The Executive Dashboard Framework</h5>
                                <ul>
                                    <li><strong>Business Metrics (Top):</strong> Revenue, ROI, Market Share</li>
                                    <li><strong>Performance Trends (Middle):</strong> MoM and YoY comparisons</li>
                                    <li><strong>Key Initiatives (Bottom):</strong> Project status and impact</li>
                                </ul>

                                <h5>Storytelling with Data</h5>
                                <div class="storytelling-framework">
                                    <h6>The 3-Act Structure</h6>
                                    <ol>
                                        <li><strong>Setup:</strong> Context and baseline</li>
                                        <li><strong>Conflict:</strong> Challenge or opportunity</li>
                                        <li><strong>Resolution:</strong> Actions and results</li>
                                    </ol>
                                </div>

                                <h5>Executive Summary Template</h5>
                                <div class="template-example">
                                    <h6>Monthly Performance Review</h6>
                                    <ul>
                                        <li><strong>Headline:</strong> ROAS increased 23% through quality improvements</li>
                                        <li><strong>Key Wins:</strong> 3 bullet points max</li>
                                        <li><strong>Challenges:</strong> 2 issues with solutions</li>
                                        <li><strong>Next Steps:</strong> 3 prioritized actions</li>
                                        <li><strong>Budget Request:</strong> If needed, with ROI projection</li>
                                    </ul>
                                </div>
                            `
                        },
                        {
                            title: 'Day 20: Module 4 Checkpoint',
                            content: `
                                <h4>Reporting Mastery Assessment</h4>
                                
                                <div class="practical-project">
                                    <h5>Build Your Reporting System</h5>
                                    <ol>
                                        <li>Design a KPI dashboard for your account</li>
                                        <li>Create one automated Google Ads script</li>
                                        <li>Build an executive summary template</li>
                                        <li>Set up automated email reports</li>
                                    </ol>
                                </div>

                                <h4>Module 4 Skills Checklist</h4>
                                <div class="completion-checklist">
                                    <label><input type="checkbox"> Built automated reporting workflow</label>
                                    <label><input type="checkbox"> Created custom Google Ads scripts</label>
                                    <label><input type="checkbox"> Designed effective dashboards</label>
                                    <label><input type="checkbox"> Mastered data visualization</label>
                                    <label><input type="checkbox"> Can create executive reports</label>
                                    <label><input type="checkbox"> Implemented alert systems</label>
                                </div>

                                <h4>Script Library Reference</h4>
                                <ul>
                                    <li>Performance Alerts</li>
                                    <li>Budget Pacing</li>
                                    <li>Quality Score Monitor</li>
                                    <li>Competitor Tracking</li>
                                    <li>Anomaly Detection</li>
                                    <li>Automated Bid Adjustments</li>
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
                    overview: `Master advanced optimization techniques including bid strategies, audience targeting, creative testing, and scaling strategies.`,
                    lessons: [
                        {
                            title: 'Day 21: Advanced Bid Strategies',
                            content: `
                                <h4>Mastering Smart Bidding</h4>
                                
                                <h5>Strategy Selection Matrix</h5>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Business Goal</th>
                                            <th>Bid Strategy</th>
                                            <th>Requirements</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Maximum profit</td>
                                            <td>Target ROAS</td>
                                            <td>15+ conversions/month</td>
                                        </tr>
                                        <tr>
                                            <td>Lead volume</td>
                                            <td>Target CPA</td>
                                            <td>30+ conversions/month</td>
                                        </tr>
                                        <tr>
                                            <td>Traffic growth</td>
                                            <td>Maximize Clicks</td>
                                            <td>Any volume</td>
                                        </tr>
                                        <tr>
                                            <td>Market share</td>
                                            <td>Target Impression Share</td>
                                            <td>Brand focus</td>
                                        </tr>
                                        <tr>
                                            <td>Revenue max</td>
                                            <td>Maximize Conversion Value</td>
                                            <td>Value tracking</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <h5>Portfolio Bid Strategies</h5>
                                <p>Combine multiple campaigns for better performance:</p>
                                <ul>
                                    <li>Minimum 30-50 conversions across portfolio</li>
                                    <li>Similar margins and goals</li>
                                    <li>Shared seasonality patterns</li>
                                </ul>

                                <h5>Bid Strategy Testing Framework</h5>
                                <ol>
                                    <li>Run for minimum 2-3 conversion cycles</li>
                                    <li>Don't judge first 2 weeks (learning period)</li>
                                    <li>Use campaign experiments for A/B testing</li>
                                    <li>Monitor search impression share changes</li>
                                </ol>
                            `
                        },
                        {
                            title: 'Day 22: Audience Targeting Mastery',
                            content: `
                                <h4>Advanced Audience Strategies</h4>
                                
                                <h5>Audience Layering Techniques</h5>
                                <div class="audience-layers">
                                    <h6>Layer 1: Demographics</h6>
                                    <ul>
                                        <li>Age, Gender, Parental Status</li>
                                        <li>Household Income (US only)</li>
                                    </ul>
                                    
                                    <h6>Layer 2: Intent Signals</h6>
                                    <ul>
                                        <li>In-market audiences</li>
                                        <li>Custom intent audiences</li>
                                        <li>Life events</li>
                                    </ul>
                                    
                                    <h6>Layer 3: Behavioral</h6>
                                    <ul>
                                        <li>Remarketing lists</li>
                                        <li>Similar audiences</li>
                                        <li>Customer match</li>
                                    </ul>
                                </div>

                                <h5>Audience Bid Adjustments</h5>
                                <table>
                                    <tr>
                                        <th>Audience Type</th>
                                        <th>Typical Adjustment</th>
                                    </tr>
                                    <tr>
                                        <td>Past purchasers</td>
                                        <td>+20% to +50%</td>
                                    </tr>
                                    <tr>
                                        <td>Cart abandoners</td>
                                        <td>+30% to +70%</td>
                                    </tr>
                                    <tr>
                                        <td>Site visitors (30 days)</td>
                                        <td>+10% to +30%</td>
                                    </tr>
                                    <tr>
                                        <td>Similar to customers</td>
                                        <td>0% to +20%</td>
                                    </tr>
                                    <tr>
                                        <td>In-market</td>
                                        <td>-10% to +10%</td>
                                    </tr>
                                </table>
                            `
                        },
                        {
                            title: 'Day 23: Creative Testing & Optimization',
                            content: `
                                <h4>Systematic Creative Testing</h4>
                                
                                <h5>The Creative Testing Matrix</h5>
                                <div class="testing-framework">
                                    <h6>Test Elements</h6>
                                    <ul>
                                        <li><strong>Headlines:</strong> Value props, urgency, social proof</li>
                                        <li><strong>Descriptions:</strong> Features vs benefits</li>
                                        <li><strong>CTAs:</strong> Action words, specificity</li>
                                        <li><strong>Extensions:</strong> Sitelinks, callouts, structured snippets</li>
                                    </ul>
                                </div>

                                <h5>Statistical Significance Calculator</h5>
                                <div class="formula-box">
                                    <p>Minimum sample size per variant:</p>
                                    <code>n = 16 × (σ² / δ²)</code>
                                    <ul>
                                        <li>σ = standard deviation</li>
                                        <li>δ = minimum detectable difference</li>
                                    </ul>
                                </div>

                                <h5>Responsive Search Ads Best Practices</h5>
                                <ol>
                                    <li>Use all 15 headlines and 4 descriptions</li>
                                    <li>Pin only when necessary (brand in position 1)</li>
                                    <li>Include keywords in 3-5 headlines</li>
                                    <li>Vary headline lengths (30, 60, 90 characters)</li>
                                    <li>Test different value propositions</li>
                                </ol>
                            `
                        },
                        {
                            title: 'Day 24: Scaling Strategies',
                            content: `
                                <h4>Scaling What Works</h4>
                                
                                <h5>The Scaling Pyramid</h5>
                                <div class="scaling-pyramid">
                                    <div class="scale-level">
                                        <h6>Level 1: Vertical Scaling</h6>
                                        <ul>
                                            <li>Increase budgets on winning campaigns</li>
                                            <li>Expand successful ad groups</li>
                                            <li>Raise bids on top keywords</li>
                                        </ul>
                                    </div>
                                    <div class="scale-level">
                                        <h6>Level 2: Horizontal Scaling</h6>
                                        <ul>
                                            <li>New match types</li>
                                            <li>Additional locations</li>
                                            <li>More devices/times</li>
                                        </ul>
                                    </div>
                                    <div class="scale-level">
                                        <h6>Level 3: Network Expansion</h6>
                                        <ul>
                                            <li>Search to Shopping</li>
                                            <li>Add Display remarketing</li>
                                            <li>YouTube for awareness</li>
                                        </ul>
                                    </div>
                                </div>

                                <h5>Scaling Checklist</h5>
                                <div class="checklist">
                                    <label><input type="checkbox"> Profitable at current scale for 30+ days</label>
                                    <label><input type="checkbox"> Search impression share < 80%</label>
                                    <label><input type="checkbox"> Quality Scores ≥ 7</label>
                                    <label><input type="checkbox"> Landing pages can handle 2x traffic</label>
                                    <label><input type="checkbox"> Budget available for 20-30% increase</label>
                                    <label><input type="checkbox"> Tracking and attribution properly set up</label>
                                </div>
                            `
                        },
                        {
                            title: 'Day 25: Course Final Project',
                            content: `
                                <h4>Final Certification Project</h4>
                                
                                <div class="final-project">
                                    <h5>Complete Account Audit & Optimization Plan</h5>
                                    <p>Demonstrate mastery by completing a comprehensive account analysis:</p>
                                    
                                    <h6>Part 1: Performance Audit (25%)</h6>
                                    <ul>
                                        <li>Complete KPI analysis</li>
                                        <li>Identify top 3 issues</li>
                                        <li>Benchmark against industry</li>
                                    </ul>
                                    
                                    <h6>Part 2: Competitive Analysis (25%)</h6>
                                    <ul>
                                        <li>Auction Insights interpretation</li>
                                        <li>Competitive positioning strategy</li>
                                        <li>Market opportunity identification</li>
                                    </ul>
                                    
                                    <h6>Part 3: Optimization Plan (25%)</h6>
                                    <ul>
                                        <li>30-day action plan</li>
                                        <li>Expected impact projections</li>
                                        <li>Testing roadmap</li>
                                    </ul>
                                    
                                    <h6>Part 4: Reporting System (25%)</h6>
                                    <ul>
                                        <li>Design KPI dashboard</li>
                                        <li>Create one automation script</li>
                                        <li>Build executive summary template</li>
                                    </ul>
                                </div>

                                <h4>Certification Requirements</h4>
                                <div class="certification-requirements">
                                    <ul>
                                        <li>✅ Complete all 5 modules</li>
                                        <li>✅ Pass all module checkpoints (80%+)</li>
                                        <li>✅ Submit final project</li>
                                        <li>✅ Demonstrate practical application</li>
                                    </ul>
                                </div>

                                <h4>Course Completion</h4>
                                <div class="completion-message">
                                    <h5>🎉 Congratulations!</h5>
                                    <p>You've completed the Google Ads Performance Analysis Mastery Course!</p>
                                    <p>You now have the skills to:</p>
                                    <ul>
                                        <li>Analyze any Google Ads account like a pro</li>
                                        <li>Diagnose and fix performance issues</li>
                                        <li>Outmaneuver competitors strategically</li>
                                        <li>Create compelling reports and dashboards</li>
                                        <li>Implement advanced optimization strategies</li>
                                    </ul>
                                </div>
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
                duration: '2 hours',
                content: {
                    overview: `Discover why the commonly taught "Ad Rank = Bid × Quality Score" formula is oversimplified and understand what Google actually uses.`,
                    lessons: [
                        {
                            title: 'Lesson 1: Industry Misconceptions',
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
                                            • Good for beginners<br>
                                            <br>
                                            <strong>Why it's wrong:</strong><br>
                                            • Ignores ad formats<br>
                                            • No context signals<br>
                                            • Misses thresholds<br>
                                            • Too simplistic
                                        </p>
                                    </div>
                                    
                                    <div class="formula-box" style="border-left: 4px solid #34a853;">
                                        <h3 style="color: #34a853; margin-bottom: 1rem;">✅ The Reality (Complete)</h3>
                                        <div class="formula" style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);">
                                            Ad Rank = f(Bid, QS, Context, Extensions, Format, Thresholds)
                                        </div>
                                        <p style="margin-top: 1rem;">
                                            <strong>What Google actually uses:</strong><br>
                                            • Your bid amount<br>
                                            • Quality Score components<br>
                                            • Search context & intent<br>
                                            • Ad extensions impact<br>
                                            • Ad format effects<br>
                                            • Minimum thresholds<br>
                                            • Competition dynamics
                                        </p>
                                    </div>
                                </div>

                                <h4>The 6 Real Factors That Determine Your Ad Rank</h4>
                                
                                <div class="six-factors" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-top: 2rem;">
                                    <div class="factor-item">
                                        <span class="factor-number">1</span>
                                        <div class="factor-title">Your Bid</div>
                                        <p>The maximum you're willing to pay per click. You often pay less than this maximum.</p>
                                    </div>

                                    <div class="factor-item">
                                        <span class="factor-number">2</span>
                                        <div class="factor-title">Ad & Landing Page Quality</div>
                                        <p>Relevance, usefulness, navigation ease. Summarized in your Quality Score (1-10).</p>
                                    </div>

                                    <div class="factor-item">
                                        <span class="factor-number">3</span>
                                        <div class="factor-title">Ad Rank Thresholds</div>
                                        <p>Minimum quality standards your ad must meet to show at all.</p>
                                    </div>

                                    <div class="factor-item">
                                        <span class="factor-number">4</span>
                                        <div class="factor-title">Auction Competitiveness</div>
                                        <p>How close your competitors' Ad Ranks are to yours.</p>
                                    </div>

                                    <div class="factor-item">
                                        <span class="factor-number">5</span>
                                        <div class="factor-title">Search Context</div>
                                        <p>User's location, device, time of search, search terms.</p>
                                    </div>

                                    <div class="factor-item">
                                        <span class="factor-number">6</span>
                                        <div class="factor-title">Ad Assets & Formats</div>
                                        <p>Expected impact of extensions like sitelinks, callouts.</p>
                                    </div>
                                </div>
                            `
                        },
                        {
                            title: 'Lesson 2: Understanding Ad Rank Thresholds',
                            content: `
                                <h4>Multiple Auction System</h4>
                                <p>Google runs multiple auctions with different thresholds for each ad position.</p>

                                <div class="threshold-visual" style="background: white; padding: 2rem; border-radius: 12px; margin: 2rem 0;">
                                    <h5 style="text-align: center; color: var(--primary); margin-bottom: 2rem;">Ad Position Thresholds</h5>
                                    
                                    <div style="background: linear-gradient(to top, #ffeaa7 0%, #fdcb6e 50%, #f39c12 100%); padding: 2rem; border-radius: 8px; position: relative; min-height: 400px;">
                                        <div style="position: absolute; top: 10%; left: 0; right: 0; padding: 1rem; background: rgba(66, 133, 244, 0.9); color: white;">
                                            <strong>Absolute Top Position</strong><br>
                                            Threshold: 40+ Ad Rank<br>
                                            Premium visibility above all results
                                        </div>
                                        
                                        <div style="position: absolute; top: 40%; left: 0; right: 0; padding: 1rem; background: rgba(52, 168, 83, 0.9); color: white;">
                                            <strong>Top Positions</strong><br>
                                            Threshold: 20+ Ad Rank<br>
                                            Above organic results
                                        </div>
                                        
                                        <div style="position: absolute; top: 70%; left: 0; right: 0; padding: 1rem; background: rgba(234, 67, 53, 0.9); color: white;">
                                            <strong>Other Positions</strong><br>
                                            Threshold: 0+ Ad Rank<br>
                                            Bottom or side of page
                                        </div>
                                    </div>
                                    
                                    <p style="text-align: center; margin-top: 1rem; font-style: italic;">
                                        Ads with negative Ad Rank scores are ineligible to show anywhere
                                    </p>
                                </div>

                                <h4>Key Insights</h4>
                                <ul>
                                    <li>Higher positions require exponentially higher Ad Rank</li>
                                    <li>Quality Score can help you meet thresholds with lower bids</li>
                                    <li>Some keywords have higher minimum thresholds than others</li>
                                    <li>Thresholds change based on search context and competition</li>
                                </ul>
                            `
                        },
                        {
                            title: 'Lesson 3: Auction Simulation',
                            content: `
                                <h4>Live Auction Example</h4>
                                <p>See how different advertisers compete and what they actually pay.</p>

                                <div class="auction-simulation">
                                    <table style="width: 100%; border-collapse: collapse;">
                                        <thead>
                                            <tr style="background: var(--primary); color: white;">
                                                <th style="padding: 1rem;">Advertiser</th>
                                                <th>Max Bid</th>
                                                <th>Quality Score</th>
                                                <th>Ad Rank</th>
                                                <th>Position</th>
                                                <th>Actual CPC</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td style="padding: 1rem;"><strong>Company A</strong></td>
                                                <td>$1.00</td>
                                                <td>10 ⭐</td>
                                                <td>80</td>
                                                <td><span class="position-badge" style="background: #ffd700; padding: 0.3rem 0.8rem; border-radius: 20px;">1st - Top</span></td>
                                                <td><strong>$0.51</strong></td>
                                            </tr>
                                            <tr style="background: #f8f9fa;">
                                                <td style="padding: 1rem;"><strong>Company B</strong></td>
                                                <td>$2.00</td>
                                                <td>5 ⭐</td>
                                                <td>50</td>
                                                <td><span class="position-badge" style="background: #c0c0c0; padding: 0.3rem 0.8rem; border-radius: 20px;">2nd</span></td>
                                                <td><strong>$1.01</strong></td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 1rem;"><strong>Company C</strong></td>
                                                <td>$1.50</td>
                                                <td>4 ⭐</td>
                                                <td>30</td>
                                                <td><span class="position-badge" style="background: #cd7f32; color: white; padding: 0.3rem 0.8rem; border-radius: 20px;">3rd</span></td>
                                                <td><strong>$0.61</strong></td>
                                            </tr>
                                            <tr style="background: #f8f9fa;">
                                                <td style="padding: 1rem;"><strong>Company D</strong></td>
                                                <td>$3.00</td>
                                                <td>2 ⭐</td>
                                                <td>10</td>
                                                <td><span class="position-badge" style="background: #666; color: white; padding: 0.3rem 0.8rem; border-radius: 20px;">4th</span></td>
                                                <td><strong>Min. bid</strong></td>
                                            </tr>
                                            <tr style="opacity: 0.5;">
                                                <td style="padding: 1rem;"><strong>Company E</strong></td>
                                                <td>$2.50</td>
                                                <td>1 ⭐</td>
                                                <td>-10</td>
                                                <td><span class="position-badge" style="background: #ea4335; color: white; padding: 0.3rem 0.8rem; border-radius: 20px;">Not Shown</span></td>
                                                <td>-</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div style="margin-top: 2rem; padding: 1.5rem; background: #e8f5e9; border-radius: 8px;">
                                    <strong>💡 Key Observations:</strong>
                                    <ul style="margin-top: 0.5rem;">
                                        <li>Company A pays only $0.51 despite bidding $1.00 (thanks to high quality)</li>
                                        <li>Company B pays more than Company A despite lower position (due to poor quality)</li>
                                        <li>Company E doesn't show at all - negative Ad Rank below threshold</li>
                                        <li>Higher Quality Score = Lower actual CPC for the same position</li>
                                    </ul>
                                </div>
                            `
                        }
                    ],
                    quiz: [
                        {
                            question: 'What is the real Ad Rank formula according to Google?',
                            options: [
                                'Ad Rank = Bid × Quality Score',
                                'Ad Rank = f(6 factors including bid, quality, context, etc.)',
                                'Ad Rank = CPC × CTR',
                                'Ad Rank = Quality Score × Extensions'
                            ],
                            correct: 1,
                            explanation: 'Google uses 6 factors: bid, quality, thresholds, competition, context, and extensions.'
                        },
                        {
                            question: 'If a competitor\'s Ad Rank is 50 and your Quality Score is 10, what\'s your actual CPC?',
                            options: [
                                '$5.00',
                                '$5.01',
                                '$10.00',
                                '$0.50'
                            ],
                            correct: 1,
                            explanation: 'Actual CPC = (Ad Rank to beat ÷ Your QS) + $0.01 = (50 ÷ 10) + $0.01 = $5.01'
                        },
                        {
                            question: 'Which factor is NOT one of Google\'s 6 Ad Rank factors?',
                            options: [
                                'Your bid amount',
                                'Search context',
                                'Keyword match type',
                                'Ad extensions'
                            ],
                            correct: 2,
                            explanation: 'Keyword match type affects which auctions you enter, but isn\'t a direct Ad Rank factor.'
                        }
                    ]
                }
            },
            {
                id: 2,
                title: 'Modern CPC Strategy',
                type: 'lessons',
                duration: '2.5 hours',
                content: {
                    overview: `Learn how CPC actually works in 2024 and master strategies to reduce costs while maintaining performance.`,
                    lessons: [
                        {
                            title: 'Lesson 1: The Real CPC Formula',
                            content: `
                                <h4>How Google Actually Calculates Your CPC</h4>
                                
                                <div class="formula-breakdown" style="background: white; padding: 2rem; border-radius: 12px; margin: 2rem 0;">
                                    <div class="main-formula" style="text-align: center; margin-bottom: 2rem;">
                                        <h5>The Actual CPC Formula (Confirmed by Google):</h5>
                                        <div style="font-size: 1.3rem; padding: 1.5rem; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); border-radius: 8px; margin: 1rem 0;">
                                            <code>Actual CPC = (Ad Rank to beat ÷ Your Quality Score) + $0.01</code>
                                        </div>
                                    </div>
                                    
                                    <div class="formula-components">
                                        <h5>Breaking It Down:</h5>
                                        <ul>
                                            <li><strong>Ad Rank to beat:</strong> The Ad Rank of the advertiser below you</li>
                                            <li><strong>Your Quality Score:</strong> Your keyword's Quality Score (1-10)</li>
                                            <li><strong>+$0.01:</strong> The minimum increment above the advertiser below</li>
                                        </ul>
                                    </div>
                                </div>

                                <h4>CPC by Quality Score Impact</h4>
                                <table style="width: 100%; margin: 2rem 0;">
                                    <thead>
                                        <tr style="background: var(--primary); color: white;">
                                            <th style="padding: 1rem;">Quality Score</th>
                                            <th>CPC Adjustment</th>
                                            <th>Example: $2 baseline</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style="padding: 1rem; text-align: center;">10</td>
                                            <td style="color: green;">-50%</td>
                                            <td><strong>$1.00</strong></td>
                                        </tr>
                                        <tr style="background: #f8f9fa;">
                                            <td style="padding: 1rem; text-align: center;">8-9</td>
                                            <td style="color: green;">-25%</td>
                                            <td><strong>$1.50</strong></td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 1rem; text-align: center;">7</td>
                                            <td>0%</td>
                                            <td><strong>$2.00</strong></td>
                                        </tr>
                                        <tr style="background: #f8f9fa;">
                                            <td style="padding: 1rem; text-align: center;">5-6</td>
                                            <td style="color: orange;">+25%</td>
                                            <td><strong>$2.50</strong></td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 1rem; text-align: center;">1-4</td>
                                            <td style="color: red;">+200%</td>
                                            <td><strong>$6.00</strong></td>
                                        </tr>
                                    </tbody>
                                </table>
                            `
                        },
                        {
                            title: 'Lesson 2: CPC Optimization Strategies',
                            content: `
                                <h4>Top 10 CPC Reduction Strategies</h4>
                                
                                <div class="strategy-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
                                    <div class="strategy-card" style="padding: 1.5rem; background: #f8f9fa; border-radius: 8px;">
                                        <h5>1. Improve Quality Score</h5>
                                        <p>Focus on CTR, relevance, and landing pages. Can reduce CPC by up to 50%.</p>
                                    </div>
                                    
                                    <div class="strategy-card" style="padding: 1.5rem; background: #f8f9fa; border-radius: 8px;">
                                        <h5>2. Use Negative Keywords</h5>
                                        <p>Prevent irrelevant clicks. Review search terms weekly and add negatives.</p>
                                    </div>
                                    
                                    <div class="strategy-card" style="padding: 1.5rem; background: #f8f9fa; border-radius: 8px;">
                                        <h5>3. Long-tail Keywords</h5>
                                        <p>Lower competition = lower CPCs. Target specific, intent-driven queries.</p>
                                    </div>
                                    
                                    <div class="strategy-card" style="padding: 1.5rem; background: #f8f9fa; border-radius: 8px;">
                                        <h5>4. Dayparting</h5>
                                        <p>Bid higher only during profitable hours. Reduce or pause during low-conversion times.</p>
                                    </div>
                                    
                                    <div class="strategy-card" style="padding: 1.5rem; background: #f8f9fa; border-radius: 8px;">
                                        <h5>5. Geographic Targeting</h5>
                                        <p>Focus budget on high-converting locations. Exclude poor-performing areas.</p>
                                    </div>
                                    
                                    <div class="strategy-card" style="padding: 1.5rem; background: #f8f9fa; border-radius: 8px;">
                                        <h5>6. Device Bid Adjustments</h5>
                                        <p>Optimize bids per device type based on conversion data.</p>
                                    </div>
                                    
                                    <div class="strategy-card" style="padding: 1.5rem; background: #f8f9fa; border-radius: 8px;">
                                        <h5>7. SKAGs (Single Keyword Ad Groups)</h5>
                                        <p>Maximum relevance = higher QS = lower CPCs.</p>
                                    </div>
                                    
                                    <div class="strategy-card" style="padding: 1.5rem; background: #f8f9fa; border-radius: 8px;">
                                        <h5>8. Test Different Match Types</h5>
                                        <p>Phrase and exact match often have lower CPCs than broad match.</p>
                                    </div>
                                    
                                    <div class="strategy-card" style="padding: 1.5rem; background: #f8f9fa; border-radius: 8px;">
                                        <h5>9. Improve Ad Extensions</h5>
                                        <p>Better Ad Rank without increasing bids. Use all relevant extensions.</p>
                                    </div>
                                    
                                    <div class="strategy-card" style="padding: 1.5rem; background: #f8f9fa; border-radius: 8px;">
                                        <h5>10. Smart Bidding</h5>
                                        <p>Let Google's AI optimize. Target CPA or ROAS can reduce wasteful clicks.</p>
                                    </div>
                                </div>

                                <h4>The Modern Approach: Value Over Volume</h4>
                                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin: 2rem 0;">
                                    <div style="padding: 2rem; background: #fee2e2; border-radius: 8px;">
                                        <h5 style="color: #ea4335;">❌ Old Way</h5>
                                        <ul>
                                            <li>Chase low CPCs</li>
                                            <li>Manual bid management</li>
                                            <li>Volume-focused</li>
                                            <li>Position-based goals</li>
                                        </ul>
                                    </div>
                                    
                                    <div style="padding: 2rem; background: #dcfce7; border-radius: 8px;">
                                        <h5 style="color: #34a853;">✅ New Way</h5>
                                        <ul>
                                            <li>Focus on profitable CPCs</li>
                                            <li>Smart bidding strategies</li>
                                            <li>Value-focused</li>
                                            <li>ROAS-based goals</li>
                                        </ul>
                                    </div>
                                </div>
                            `
                        },
                        {
                            title: 'Lesson 3: Search Context & Its Impact',
                            content: `
                                <h4>How Search Context Affects Your CPC</h4>
                                <p>Ad Rank is recalculated for every search based on real-time context.</p>

                                <div class="context-factors" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
                                    <div class="context-item" style="text-align: center; padding: 1.5rem; background: #f8f9fa; border-radius: 8px;">
                                        <div style="font-size: 2.5rem;">📍</div>
                                        <strong>Location</strong>
                                        <p>User's geographic location affects relevance and competition</p>
                                    </div>
                                    <div class="context-item" style="text-align: center; padding: 1.5rem; background: #f8f9fa; border-radius: 8px;">
                                        <div style="font-size: 2.5rem;">📱</div>
                                        <strong>Device</strong>
                                        <p>Mobile vs Desktop vs Tablet CPCs vary significantly</p>
                                    </div>
                                    <div class="context-item" style="text-align: center; padding: 1.5rem; background: #f8f9fa; border-radius: 8px;">
                                        <div style="font-size: 2.5rem;">⏰</div>
                                        <strong>Time</strong>
                                        <p>Time of day and day of week affect competition</p>
                                    </div>
                                    <div class="context-item" style="text-align: center; padding: 1.5rem; background: #f8f9fa; border-radius: 8px;">
                                        <div style="font-size: 2.5rem;">🔍</div>
                                        <strong>Search Terms</strong>
                                        <p>Exact query and user intent signal value</p>
                                    </div>
                                    <div class="context-item" style="text-align: center; padding: 1.5rem; background: #f8f9fa; border-radius: 8px;">
                                        <div style="font-size: 2.5rem;">👤</div>
                                        <strong>User Signals</strong>
                                        <p>Search history and past behavior influence auction</p>
                                    </div>
                                    <div class="context-item" style="text-align: center; padding: 1.5rem; background: #f8f9fa; border-radius: 8px;">
                                        <div style="font-size: 2.5rem;">📊</div>
                                        <strong>Competition</strong>
                                        <p>Other ads and organic results affect thresholds</p>
                                    </div>
                                </div>

                                <h4>Practical Application</h4>
                                <div style="padding: 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; margin: 2rem 0;">
                                    <h5 style="color: white;">💡 Pro Tips for Context Optimization</h5>
                                    <ul style="margin-top: 1rem;">
                                        <li>Use location bid adjustments for high-value areas</li>
                                        <li>Separate mobile and desktop campaigns for better control</li>
                                        <li>Implement dayparting based on conversion data</li>
                                        <li>Create RLSA campaigns for past visitors (different context)</li>
                                        <li>Use audience layering to bid differently for valuable segments</li>
                                    </ul>
                                </div>
                            `
                        }
                    ],
                    quiz: [
                        {
                            question: 'What\'s the most effective way to reduce CPC?',
                            options: [
                                'Lower your bids',
                                'Improve Quality Score',
                                'Pause campaigns',
                                'Use broad match only'
                            ],
                            correct: 1,
                            explanation: 'Improving Quality Score can reduce CPC by up to 50% while maintaining position.'
                        },
                        {
                            question: 'Which strategy focuses on the modern approach to CPC?',
                            options: [
                                'Always aim for position 1',
                                'Get the lowest CPC possible',
                                'Focus on profitable CPCs and ROAS',
                                'Only use exact match keywords'
                            ],
                            correct: 2,
                            explanation: 'Modern PPC focuses on value and profitability, not just low costs.'
                        }
                    ]
                }
            },
            {
                id: 3,
                title: 'Quality Score Revolution',
                type: 'lessons',
                duration: '2 hours',
                content: {
                    overview: `Deep dive into Quality Score components and advanced optimization techniques that top agencies use.`,
                    lessons: [
                        {
                            title: 'Lesson 1: The Three Pillars of Quality Score',
                            content: `
                                <h4>Quality Score Components Breakdown</h4>
                                
                                <div class="qs-components" style="margin: 2rem 0;">
                                    <div class="component" style="padding: 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; margin-bottom: 1.5rem;">
                                        <h5 style="color: white; font-size: 1.3rem;">1. Expected CTR (40% weight)</h5>
                                        <ul style="margin: 1rem 0;">
                                            <li>Based on historical performance of keyword</li>
                                            <li>Compared to other advertisers on same keyword</li>
                                            <li>Normalized for ad position</li>
                                            <li>Account history matters</li>
                                        </ul>
                                        <div style="padding: 1rem; background: rgba(255,255,255,0.1); border-radius: 8px; margin-top: 1rem;">
                                            <strong>Optimization Tactics:</strong>
                                            <ul style="margin-top: 0.5rem;">
                                                <li>Write compelling, emotional headlines</li>
                                                <li>Include keywords in ad copy</li>
                                                <li>Use numbers and symbols</li>
                                                <li>Test urgency and scarcity</li>
                                                <li>A/B test continuously</li>
                                            </ul>
                                        </div>
                                    </div>
                                    
                                    <div class="component" style="padding: 2rem; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px; margin-bottom: 1.5rem;">
                                        <h5 style="color: white; font-size: 1.3rem;">2. Ad Relevance (30% weight)</h5>
                                        <ul style="margin: 1rem 0;">
                                            <li>How well ad matches search intent</li>
                                            <li>Keyword to ad copy alignment</li>
                                            <li>Message consistency throughout</li>
                                            <li>Semantic understanding by Google</li>
                                        </ul>
                                        <div style="padding: 1rem; background: rgba(255,255,255,0.1); border-radius: 8px; margin-top: 1rem;">
                                            <strong>Optimization Tactics:</strong>
                                            <ul style="margin-top: 0.5rem;">
                                                <li>Use keyword in headlines (especially H1)</li>
                                                <li>Mirror search query language</li>
                                                <li>Create tightly themed ad groups</li>
                                                <li>Use dynamic keyword insertion carefully</li>
                                                <li>Write specific ads for each keyword theme</li>
                                            </ul>
                                        </div>
                                    </div>
                                    
                                    <div class="component" style="padding: 2rem; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 12px;">
                                        <h5 style="color: white; font-size: 1.3rem;">3. Landing Page Experience (30% weight)</h5>
                                        <ul style="margin: 1rem 0;">
                                            <li>Page load speed (Core Web Vitals)</li>
                                            <li>Mobile-friendliness</li>
                                            <li>Relevant, original content</li>
                                            <li>Transparency and trustworthiness</li>
                                            <li>Easy navigation</li>
                                        </ul>
                                        <div style="padding: 1rem; background: rgba(255,255,255,0.1); border-radius: 8px; margin-top: 1rem;">
                                            <strong>Optimization Tactics:</strong>
                                            <ul style="margin-top: 0.5rem;">
                                                <li>Achieve &lt;3 second load time</li>
                                                <li>Ensure message match with ads</li>
                                                <li>Place key content above fold</li>
                                                <li>Add trust signals (testimonials, badges)</li>
                                                <li>Clear CTAs and easy navigation</li>
                                                <li>Optimize for mobile first</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            `
                        },
                        {
                            title: 'Lesson 2: Quality Score Optimization Playbook',
                            content: `
                                <h4>Step-by-Step Quality Score Improvement</h4>
                                
                                <div class="playbook-steps" style="margin: 2rem 0;">
                                    <div style="padding: 1.5rem; background: #f8f9fa; border-left: 4px solid var(--primary); margin-bottom: 1rem;">
                                        <h5>Step 1: Audit Current Quality Scores</h5>
                                        <ul>
                                            <li>Export all keywords with QS data</li>
                                            <li>Identify keywords with QS &lt; 7</li>
                                            <li>Check component scores (CTR, relevance, landing page)</li>
                                            <li>Prioritize high-volume, high-value keywords</li>
                                        </ul>
                                    </div>
                                    
                                    <div style="padding: 1.5rem; background: #f8f9fa; border-left: 4px solid var(--secondary); margin-bottom: 1rem;">
                                        <h5>Step 2: Fix Landing Page Issues</h5>
                                        <ul>
                                            <li>Run PageSpeed Insights test</li>
                                            <li>Fix Core Web Vitals issues</li>
                                            <li>Ensure mobile responsiveness</li>
                                            <li>Match H1 to ad headlines</li>
                                            <li>Add relevant, valuable content</li>
                                        </ul>
                                    </div>
                                    
                                    <div style="padding: 1.5rem; background: #f8f9fa; border-left: 4px solid var(--warning); margin-bottom: 1rem;">
                                        <h5>Step 3: Improve Ad Relevance</h5>
                                        <ul>
                                            <li>Restructure campaigns into tighter themes</li>
                                            <li>Create SKAGs for important keywords</li>
                                            <li>Include keywords in headlines</li>
                                            <li>Write 10+ ads per ad group</li>
                                            <li>Use all available ad space</li>
                                        </ul>
                                    </div>
                                    
                                    <div style="padding: 1.5rem; background: #f8f9fa; border-left: 4px solid var(--danger); margin-bottom: 1rem;">
                                        <h5>Step 4: Boost Expected CTR</h5>
                                        <ul>
                                            <li>Test emotional triggers</li>
                                            <li>Add numbers and statistics</li>
                                            <li>Use power words</li>
                                            <li>Create urgency/scarcity</li>
                                            <li>Implement ad customizers</li>
                                        </ul>
                                    </div>
                                    
                                    <div style="padding: 1.5rem; background: #f8f9fa; border-left: 4px solid #9c27b0; margin-bottom: 1rem;">
                                        <h5>Step 5: Monitor and Iterate</h5>
                                        <ul>
                                            <li>Check QS weekly</li>
                                            <li>A/B test continuously</li>
                                            <li>Pause poor performers</li>
                                            <li>Scale winners</li>
                                            <li>Document what works</li>
                                        </ul>
                                    </div>
                                </div>

                                <h4>Quality Score Myths Debunked</h4>
                                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
                                    <div style="padding: 1.5rem; background: #fee2e2; border-radius: 8px;">
                                        <h5 style="color: #ea4335;">❌ Myth</h5>
                                        <p>"Quality Score is updated in real-time"</p>
                                        <strong>Reality:</strong> Display QS updates periodically, but auction-time QS is real-time
                                    </div>
                                    
                                    <div style="padding: 1.5rem; background: #fee2e2; border-radius: 8px;">
                                        <h5 style="color: #ea4335;">❌ Myth</h5>
                                        <p>"Pausing keywords hurts Quality Score"</p>
                                        <strong>Reality:</strong> No impact when paused, history remains
                                    </div>
                                    
                                    <div style="padding: 1.5rem; background: #fee2e2; border-radius: 8px;">
                                        <h5 style="color: #ea4335;">❌ Myth</h5>
                                        <p>"Higher bids improve Quality Score"</p>
                                        <strong>Reality:</strong> Bids don't affect QS directly
                                    </div>
                                    
                                    <div style="padding: 1.5rem; background: #fee2e2; border-radius: 8px;">
                                        <h5 style="color: #ea4335;">❌ Myth</h5>
                                        <p>"Display Network affects Search QS"</p>
                                        <strong>Reality:</strong> They're calculated separately
                                    </div>
                                </div>
                            `
                        },
                        {
                            title: 'Lesson 3: Advanced Quality Score Tactics',
                            content: `
                                <h4>Pro-Level Quality Score Strategies</h4>
                                
                                <div class="advanced-tactics">
                                    <h5>1. The SKAG Method (Single Keyword Ad Groups)</h5>
                                    <div style="padding: 1.5rem; background: #e8f5e9; border-radius: 8px; margin: 1rem 0;">
                                        <p><strong>Structure:</strong></p>
                                        <ul>
                                            <li>1 keyword per ad group (all 3 match types)</li>
                                            <li>3-5 highly specific ads</li>
                                            <li>Dedicated landing page</li>
                                        </ul>
                                        <p style="margin-top: 1rem;"><strong>Result:</strong> Maximum relevance = QS 9-10</p>
                                    </div>
                                    
                                    <h5>2. The Alpha/Beta Campaign Structure</h5>
                                    <div style="padding: 1.5rem; background: #e3f2fd; border-radius: 8px; margin: 1rem 0;">
                                        <p><strong>Alpha Campaigns:</strong> High QS exact match keywords only</p>
                                        <p><strong>Beta Campaigns:</strong> Modified broad for discovery</p>
                                        <p style="margin-top: 1rem;">Mine search terms from Beta → Graduate to Alpha when QS proven</p>
                                    </div>
                                    
                                    <h5>3. Landing Page Templates by Intent</h5>
                                    <div style="padding: 1.5rem; background: #fce4ec; border-radius: 8px; margin: 1rem 0;">
                                        <ul>
                                            <li><strong>Informational:</strong> Content-rich, educational</li>
                                            <li><strong>Commercial:</strong> Comparison tables, reviews</li>
                                            <li><strong>Transactional:</strong> Simple, fast conversion path</li>
                                            <li><strong>Navigational:</strong> Brand-focused, trust signals</li>
                                        </ul>
                                    </div>
                                    
                                    <h5>4. Dynamic Landing Pages</h5>
                                    <div style="padding: 1.5rem; background: #f3e5f5; border-radius: 8px; margin: 1rem 0;">
                                        <p>Use URL parameters to dynamically adjust:</p>
                                        <ul>
                                            <li>H1 headline to match search query</li>
                                            <li>Hero image based on audience</li>
                                            <li>CTA text based on keyword intent</li>
                                            <li>Testimonials relevant to segment</li>
                                        </ul>
                                    </div>
                                </div>

                                <h4>Quality Score Recovery Plan</h4>
                                <div style="padding: 2rem; background: linear-gradient(135deg, #fa8231 0%, #fd5e53 100%); color: white; border-radius: 12px; margin: 2rem 0;">
                                    <h5 style="color: white;">🚨 Emergency QS Fix (When QS &lt; 5)</h5>
                                    <ol style="margin-top: 1rem;">
                                        <li><strong>Day 1:</strong> Pause keyword temporarily</li>
                                        <li><strong>Day 2-3:</strong> Create new SKAG structure</li>
                                        <li><strong>Day 4-5:</strong> Write 10 new ads with keyword in H1</li>
                                        <li><strong>Day 6-7:</strong> Build dedicated landing page</li>
                                        <li><strong>Day 8:</strong> Relaunch with lower bid</li>
                                        <li><strong>Day 9-15:</strong> Monitor and optimize CTR</li>
                                        <li><strong>Day 16+:</strong> Gradually increase bid as QS improves</li>
                                    </ol>
                                </div>
                            `
                        }
                    ],
                    quiz: [
                        {
                            question: 'Which Quality Score component has the highest weight?',
                            options: [
                                'Landing Page Experience',
                                'Ad Relevance',
                                'Expected CTR',
                                'All are equal'
                            ],
                            correct: 2,
                            explanation: 'Expected CTR has 40% weight, while Ad Relevance and Landing Page each have 30%.'
                        },
                        {
                            question: 'What is a SKAG?',
                            options: [
                                'A type of bid strategy',
                                'Single Keyword Ad Group',
                                'Search Keyword Audit Guide',
                                'Smart Keyword Algorithm by Google'
                            ],
                            correct: 1,
                            explanation: 'SKAG stands for Single Keyword Ad Group - a structure for maximum relevance.'
                        },
                        {
                            question: 'What Quality Score should you aim for?',
                            options: [
                                '5 or above',
                                '6 or above',
                                '7 or above',
                                '10 only'
                            ],
                            correct: 2,
                            explanation: 'QS of 7+ is considered good and provides CPC benefits. Below 7 means paying premium.'
                        }
                    ]
                }
            }
        ]
    },
    
    'shopping-mastery': {
        modules: [
            {
                id: 1,
                title: 'Shopping Campaign Foundations',
                type: 'lessons',
                duration: '2 hours',
                content: {
                    overview: `Master Google Shopping campaigns from feed optimization to advanced bidding strategies.`,
                    lessons: [
                        {
                            title: 'Feed Optimization Essentials',
                            content: `
                                <h4>The Perfect Product Feed</h4>
                                
                                <h5>Required Attributes (Must Have)</h5>
                                <ul>
                                    <li><strong>ID:</strong> Unique identifier for each product</li>
                                    <li><strong>Title:</strong> 150 characters max, front-load keywords</li>
                                    <li><strong>Description:</strong> 5000 characters max, detailed and keyword-rich</li>
                                    <li><strong>Link:</strong> Direct product page URL</li>
                                    <li><strong>Image link:</strong> High-quality product image</li>
                                    <li><strong>Price:</strong> Current price with currency</li>
                                    <li><strong>Availability:</strong> in stock/out of stock/preorder</li>
                                    <li><strong>Brand:</strong> Manufacturer brand</li>
                                    <li><strong>GTIN:</strong> Global Trade Item Number</li>
                                    <li><strong>MPN:</strong> Manufacturer Part Number</li>
                                    <li><strong>Condition:</strong> new/used/refurbished</li>
                                </ul>

                                <h5>Title Optimization Formula</h5>
                                <code>
                                    [Brand] + [Product Type] + [Key Attributes] + [Model/Size] + [Color/Material]
                                </code>
                                
                                <h5>Example:</h5>
                                <p><strong>Nike Men's Running Shoes Air Max 270 Size 10 Black/White</strong></p>
                            `
                        }
                    ]
                }
            }
        ]
    },
    
    'youtube-advertising': {
        modules: [
            {
                id: 1,
                title: 'YouTube Ads Fundamentals',
                type: 'lessons',
                duration: '2.5 hours',
                content: {
                    overview: `Master YouTube advertising from creative strategies to audience targeting and measurement.`,
                    lessons: [
                        {
                            title: 'YouTube Ad Formats',
                            content: `
                                <h4>Choosing the Right Format</h4>
                                
                                <div class="format-comparison">
                                    <div class="format">
                                        <h5>Skippable In-Stream Ads</h5>
                                        <ul>
                                            <li>Length: Any (skippable after 5 seconds)</li>
                                            <li>Billing: CPV (when watched 30s or clicked)</li>
                                            <li>Best for: Consideration, conversions</li>
                                            <li>Average CPV: $0.10-$0.30</li>
                                        </ul>
                                    </div>
                                    
                                    <div class="format">
                                        <h5>Non-Skippable In-Stream</h5>
                                        <ul>
                                            <li>Length: 15 seconds max</li>
                                            <li>Billing: CPM</li>
                                            <li>Best for: Awareness, reach</li>
                                            <li>Average CPM: $10-$30</li>
                                        </ul>
                                    </div>
                                    
                                    <div class="format">
                                        <h5>Discovery Ads</h5>
                                        <ul>
                                            <li>Appears in: Search results, related videos</li>
                                            <li>Billing: CPC</li>
                                            <li>Best for: High-intent viewers</li>
                                            <li>Average CPC: $0.30-$1.00</li>
                                        </ul>
                                    </div>
                                    
                                    <div class="format">
                                        <h5>Bumper Ads</h5>
                                        <ul>
                                            <li>Length: 6 seconds max</li>
                                            <li>Billing: CPM</li>
                                            <li>Best for: Brand reinforcement</li>
                                            <li>Average CPM: $5-$15</li>
                                        </ul>
                                    </div>
                                </div>
                            `
                        }
                    ]
                }
            }
        ]
    }
};

// Helper function to get course content
function getCourseContent(courseId) {
    return courseContent[courseId] || null;
}

// Helper function to get specific module content
function getModuleContent(courseId, moduleId) {
    const course = courseContent[courseId];
    if (!course) return null;
    
    return course.modules.find(m => m.id === moduleId) || null;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { courseContent, getCourseContent, getModuleContent };
}