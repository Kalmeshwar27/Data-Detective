import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  MessageSquare,
  Star,
  AlertTriangle,
  Search,
  Users,
  TrendingUp,
  Award
} from 'lucide-react';

const DataDetectiveGame = () => {

  const [score, setScore] = useState(0);
  const [playerLevel, setPlayerLevel] = useState('Apprentice Detective');
  const [evidence, setEvidence] = useState([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState('');
  const [findings, setFindings] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [badges, setBadges] = useState([]);
  const [currentPhase, setCurrentPhase] = useState('intro');

  // Game data
  const caseData = {
    title: "The Mystery of Declining App Engagement",
    description: "TechCorp's mobile app has seen a 40% drop in user engagement over the past 3 months. Your mission: investigate the data, identify the root cause, and recommend solutions.",
    role: "Business Analyst Detective",
    difficulty: "Intermediate",
    estimatedTime: "15-20 minutes"
  };

  const evidenceSources = [
    {
      id: 'user_analytics',
      name: 'User Analytics Dashboard',
      type: 'data',
      icon: <BarChart3 className="w-5 h-5" />,
      data: {
        dailyActiveUsers: [5200, 4800, 4200, 3800, 3200, 3100],
        sessionDuration: [4.2, 3.8, 3.1, 2.9, 2.4, 2.1],
        crashReports: [12, 15, 28, 45, 67, 89],
        newFeatureUsage: [850, 720, 420, 280, 180, 120]
      }
    },
    {
      id: 'user_feedback',
      name: 'Customer Support Tickets',
      type: 'qualitative',
      icon: <MessageSquare className="w-5 h-5" />,
      data: [
        "App keeps crashing after the latest update",
        "New interface is confusing, can't find my favorite features",
        "Loading times are much slower than before",
        "The new design looks nice but it's harder to use",
        "Please bring back the old version!"
      ]
    },
    {
      id: 'app_store',
      name: 'App Store Reviews',
      type: 'external',
      icon: <Star className="w-5 h-5" />,
      data: {
        averageRating: 2.1,
        totalReviews: 1247,
        recent: [
          "★★☆☆☆ - Crashes constantly since update",
          "★☆☆☆☆ - Where did all the features go?",
          "★★★☆☆ - Looks better but harder to use",
          "★☆☆☆☆ - Bring back the old app!"
        ]
      }
    },
    {
      id: 'technical_logs',
      name: 'Technical Performance Logs',
      type: 'technical',
      icon: <AlertTriangle className="w-5 h-5" />,
      data: {
        errorRate: "15.2% (up from 2.1%)",
        avgLoadTime: "4.2 seconds (up from 1.8s)",
        memoryUsage: "High - 87% above normal",
        crashFrequency: "Every 12 minutes of usage"
      }
    }
  ];

  const analysisOptions = [
    {
      id: 'ui_redesign',
      text: "The new UI redesign confused users and made the app harder to navigate",
      correctness: 0.7,
      reasoning: "Partially correct - UI issues are real but not the primary cause"
    },
    {
      id: 'technical_bugs',
      text: "Technical bugs and crashes introduced in the latest update are the main cause",
      correctness: 1.0,
      reasoning: "Correct! The data shows a clear correlation between the update and technical issues"
    },
    {
      id: 'market_competition',
      text: "Increased competition in the market is drawing users to competitor apps",
      correctness: 0.2,
      reasoning: "Unlikely - the sudden drop correlates with internal changes, not market shifts"
    },
    {
      id: 'seasonal_trends',
      text: "This is normal seasonal variation in user behavior",
      correctness: 0.1,
      reasoning: "Incorrect - a 40% drop is too significant to be seasonal"
    }
  ];

  // Timer effect
  useEffect(() => {
    if (currentPhase === 'investigation' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [currentPhase, timeLeft]);

  const collectEvidence = (source) => {
    if (!evidence.find(e => e.id === source.id)) {
      setEvidence([...evidence, source]);
      setScore(score + 25);
      
      // Award badges based on evidence collection
      if (evidence.length === 1) {
        setBadges([...badges, "First Evidence"]);
      }
      if (evidence.length === 3) {
        setBadges([...badges, "Thorough Investigator"]);
      }
    }
  };

  const submitAnalysis = () => {
    const selectedOption = analysisOptions.find(opt => opt.id === selectedAnalysis);
    if (selectedOption) {
      const points = Math.round(selectedOption.correctness * 100);
      setScore(score + points);
      
      if (selectedOption.correctness >= 0.8) {
        setBadges([...badges, "Sharp Analyst"]);
      }
      
      setCurrentPhase('solution');
    }
  };
const renderIntro = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-slate-900 to-gray-800 text-white px-4">
    <div className="w-full max-w-screen-sm mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-center px-4 sm:px-6 md:px-8 py-6 sm:py-8"
      >
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 tracking-tight"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          🕵️‍♂️ Welcome to Data Detective
        </motion.h1>

        <motion.p 
          className="text-base sm:text-lg md:text-xl text-slate-300 mb-8"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          A mystery awaits. Investigate. Analyze. Solve.
        </motion.p>

        <motion.button 
          onClick={() => setCurrentPhase('instructions')}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Enter Game 🎮
        </motion.button>
      </motion.div>
    </div>
  </div>
);

const renderInstructions = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 flex items-center justify-center px-6 py-12">
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
      <h2 className="text-3xl font-bold mb-4 text-blue-800">📘 How to Play</h2>
      <ol className="list-decimal list-inside text-gray-700 space-y-3 text-lg">
        <li>Read the case briefing carefully to understand the situation.</li>
        <li>Collect evidence from available sources in the investigation phase.</li>
        <li>Review the evidence board and proceed to the analysis phase.</li>
        <li>Select the hypothesis you think best explains the issue.</li>
        <li>Write detailed recommendations to address the problem.</li>
        <li>Submit your final report and check your results and badges.</li>
      </ol>

      <div className="mt-8 flex justify-end">
        <button 
          onClick={() => setCurrentPhase('briefing')}

          className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Start Game 🚀
        </button>
      </div>
    </div>
  </div>
);

  const submitSolution = () => {
    let additionalPoints = 0;
    
    // Score based on solution quality
    if (findings.length > 100) additionalPoints += 30;
    if (findings.toLowerCase().includes('technical') || findings.toLowerCase().includes('bug')) additionalPoints += 20;
    if (findings.toLowerCase().includes('recommendation') || findings.toLowerCase().includes('solution')) additionalPoints += 25;
    
    setScore(score + additionalPoints);
    
    if (additionalPoints >= 50) {
      setBadges([...badges, "Solution Master"]);
    }
    
    // Level up logic
    if (score + additionalPoints >= 200) {
      setPlayerLevel('Junior Analyst');
    }
    
    setCurrentPhase('results');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Render different phases
  const renderBriefing = () => (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center mb-6">
          <div className="bg-blue-600 p-3 rounded-full mr-4">
            <Search className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Data Detective</h1>
            <p className="text-blue-600 font-medium">{playerLevel} • Score: {score}</p>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">🔍 {caseData.title}</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">{caseData.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="flex items-center">
              <Users className="w-5 h-5 text-blue-500 mr-2" />
              <span className="text-sm"><strong>Role:</strong> {caseData.role}</span>
            </div>
            <div className="flex items-center">
              <TrendingUp className="w-5 h-5 text-green-500 mr-2" />
              <span className="text-sm"><strong>Difficulty:</strong> {caseData.difficulty}</span>
            </div>
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-orange-500 mr-2" />
              <span className="text-sm"><strong>Time:</strong> {caseData.estimatedTime}</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg mb-6">
          <h3 className="font-bold text-lg mb-3">🎯 Learning Objectives</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Analyze quantitative data to identify trends and patterns</li>
            <li>• Correlate multiple data sources to form hypotheses</li>
            <li>• Apply root cause analysis techniques</li>
            <li>• Develop data-driven recommendations</li>
          </ul>
        </div>

  <div className="p-[2px] rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600">
  <button 
    onClick={() => setCurrentPhase('investigation')}
    className="w-full py-3 px-5 font-semibold text-white rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition duration-200 shadow-md"
  >
    Start Investigation 🔍
  </button>
</div>


      </div>
    </div>
  );

  const renderInvestigation = () => (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">🕵️ Evidence Collection Phase</h2>
          <div className="flex items-center space-x-4">
            <span className="bg-blue-100 px-3 py-1 rounded-full text-sm font-medium">
              ⏱️ {formatTime(timeLeft)}
            </span>
            <span className="bg-green-100 px-3 py-1 rounded-full text-sm font-medium">
              Score: {score}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Evidence Sources */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-4">📊 Available Evidence Sources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {evidenceSources.map((source) => (
                <div key={source.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-3">
                    {source.icon}
                    <h4 className="font-semibold ml-2">{source.name}</h4>
                  </div>
                  
                  {source.type === 'data' && (
                    <div className="text-sm text-gray-600 mb-3">
                      <p>• Daily Active Users trend</p>
                      <p>• Session duration metrics</p>
                      <p>• Crash reports data</p>
                      <p>• Feature usage statistics</p>
                    </div>
                  )}
                  
                  {source.type === 'qualitative' && (
                    <div className="text-sm text-gray-600 mb-3">
                      <p>• {source.data.length} recent support tickets</p>
                      <p>• User complaints and feedback</p>
                    </div>
                  )}
                  
                  {source.type === 'external' && (
                    <div className="text-sm text-gray-600 mb-3">
                      <p>• App Store Rating: {source.data.averageRating}/5</p>
                      <p>• {source.data.totalReviews} total reviews</p>
                    </div>
                  )}
                  
                  {source.type === 'technical' && (
                    <div className="text-sm text-gray-600 mb-3">
                      <p>• Error rates and performance</p>
                      <p>• System logs and diagnostics</p>
                    </div>
                  )}
                  
                  <button 
                    onClick={() => collectEvidence(source)}
                    disabled={evidence.find(e => e.id === source.id)}
                    className={`w-full py-2 px-4 rounded font-medium ${
                      evidence.find(e => e.id === source.id)
                        ? 'bg-green-100 text-green-800 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {evidence.find(e => e.id === source.id) ? '✓ Collected' : 'Collect Evidence'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Evidence Board */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-4">🗂️ Evidence Board</h3>
            {evidence.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No evidence collected yet.<br />Start investigating!</p>
            ) : (
              <div className="space-y-3">
                {evidence.map((item) => (
                  <div key={item.id} className="bg-white p-3 rounded border-l-4 border-green-500">
                    <div className="flex items-center mb-2">
                      {item.icon}
                      <span className="font-medium ml-2 text-sm">{item.name}</span>
                    </div>
                    
                    {item.type === 'data' && (
                      <div className="text-xs text-gray-600">
                        <p>📈 DAU: {item.data.dailyActiveUsers[5]} (↓{Math.round((1-item.data.dailyActiveUsers[5]/item.data.dailyActiveUsers[0])*100)}%)</p>
                        <p>⏱️ Session: {item.data.sessionDuration[5]}min (↓{Math.round((1-item.data.sessionDuration[5]/item.data.sessionDuration[0])*100)}%)</p>
                        <p>💥 Crashes: {item.data.crashReports[5]} (↑{Math.round((item.data.crashReports[5]/item.data.crashReports[0]-1)*100)}%)</p>
                      </div>
                    )}
                    
                    {item.type === 'qualitative' && (
                      <div className="text-xs text-gray-600">
                        <p>🔍 Key themes: Crashes, UI confusion, performance</p>
                      </div>
                    )}
                    
                    {item.type === 'external' && (
                      <div className="text-xs text-gray-600">
                        <p>⭐ Rating: {item.data.averageRating}/5 (Poor)</p>
                      </div>
                    )}
                    
                    {item.type === 'technical' && (
                      <div className="text-xs text-gray-600">
                        <p>🚨 Error rate: {item.data.errorRate}</p>
                        <p>🐌 Load time: {item.data.avgLoadTime}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {evidence.length >= 3 && (
              <button 
                onClick={() => setCurrentPhase('analysis')}
                className="w-full mt-4 bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700"
              >
                Proceed to Analysis 🔬
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalysis = () => (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">🔬 Analysis Phase</h2>
        
        <div className="bg-blue-50 p-6 rounded-lg mb-6">
          <h3 className="font-bold text-lg mb-3">Evidence Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>📊 User Metrics:</strong></p>
              <p>• Daily active users dropped 40%</p>
              <p>• Session duration decreased 50%</p>
              <p>• New feature usage down 86%</p>
            </div>
            <div>
              <p><strong>🔧 Technical Issues:</strong></p>
              <p>• Error rate increased from 2.1% to 15.2%</p>
              <p>• Load time doubled to 4.2 seconds</p>
              <p>• Crash frequency: every 12 minutes</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-bold text-lg mb-4">🎯 Select Your Primary Hypothesis</h3>
          <div className="space-y-3">
            {analysisOptions.map((option) => (
              <label key={option.id} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="analysis"
                  value={option.id}
                  onChange={(e) => setSelectedAnalysis(e.target.value)}
                  className="mt-1"
                />
                <span className="text-gray-800">{option.text}</span>
              </label>
            ))}
          </div>
        </div>

        <button 
          onClick={submitAnalysis}
          disabled={!selectedAnalysis}
          className={`w-full font-bold py-3 px-6 rounded-lg ${
            selectedAnalysis 
              ? 'bg-purple-600 text-white hover:bg-purple-700' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Submit Analysis 📝
        </button>
      </div>
    </div>
  );

  const renderSolution = () => (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-green-50 to-teal-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">💡 Solution Development</h2>
        
        <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-6">
          <h3 className="font-bold text-lg mb-2">Analysis Feedback</h3>
          {selectedAnalysis && (
            <div>
              <p className="text-gray-700 mb-2">
                {analysisOptions.find(opt => opt.id === selectedAnalysis)?.reasoning}
              </p>
              <div className="flex items-center">
                <span className="mr-2">Accuracy Score:</span>
                <div className="bg-gray-200 rounded-full h-2 flex-1 max-w-xs">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{width: `${(analysisOptions.find(opt => opt.id === selectedAnalysis)?.correctness || 0) * 100}%`}}
                  ></div>
                </div>
                <span className="ml-2 font-bold">{Math.round((analysisOptions.find(opt => opt.id === selectedAnalysis)?.correctness || 0) * 100)}%</span>
              </div>
            </div>
          )}
        </div>

        <div className="mb-6">
          <h3 className="font-bold text-lg mb-4">📋 Develop Your Recommendations</h3>
          <p className="text-gray-600 mb-4">Based on your analysis, provide detailed recommendations to solve the engagement problem:</p>
          
          <textarea
            value={findings}
            onChange={(e) => setFindings(e.target.value)}
            placeholder="Write your detailed findings and recommendations here. Consider:
• Immediate actions to address technical issues
• Long-term strategies to prevent similar problems
• Metrics to track improvement
• Timeline for implementation"
            className="w-full h-48 p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          
          <div className="mt-2 text-sm text-gray-500">
            Character count: {findings.length} (minimum 100 recommended)
          </div>
        </div>

        <button 
          onClick={submitSolution}
          className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700"
        >
          Submit Final Report 🎯
        </button>
      </div>
    </div>
  );

  const renderResults = () => (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-yellow-50 to-orange-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800">Case Completed!</h2>
          <p className="text-gray-600 mt-2">Great detective work! Here's your performance summary:</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-blue-600">{score}</div>
            <div className="text-sm text-gray-600">Total Points</div>
          </div>
          <div className="bg-green-50 p-6 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">{playerLevel}</div>
            <div className="text-sm text-gray-600">Current Rank</div>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-purple-600">{badges.length}</div>
            <div className="text-sm text-gray-600">Badges Earned</div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="font-bold text-lg mb-4">🏆 Badges Earned</h3>
          <div className="flex flex-wrap gap-2">
            {badges.map((badge, index) => (
              <span key={index} className="bg-yellow-100 border border-yellow-300 px-3 py-1 rounded-full text-sm font-medium">
                🏅 {badge}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg mb-6">
          <h3 className="font-bold text-lg mb-4">📊 Skills Developed</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Data Analysis</span>
                <span className="text-sm">85%</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '85%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Critical Thinking</span>
                <span className="text-sm">78%</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{width: '78%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Problem Solving</span>
                <span className="text-sm">92%</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{width: '92%'}}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={() => {
              setCurrentPhase('briefing');
              setScore(0);
              setEvidence([]);
              setSelectedAnalysis('');
              setFindings('');
              setTimeLeft(300);
              setBadges([]);
            }}
            className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700"
          >
            Try New Case 🔍
          </button>
          <button className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700">
            Share Results 📤
          </button>
        </div>
      </div>
    </div>
  );

  // Main render logic
  switch (currentPhase) {
    case 'intro':
      return renderIntro();
    case 'instructions':
      return renderInstructions();
    case 'briefing':
      return renderBriefing();

    case 'investigation':
      return renderInvestigation();
    case 'analysis':
      return renderAnalysis();
    case 'solution':
      return renderSolution();
    case 'results':
      return renderResults();
    default:
      return renderBriefing();
  }
};

export default DataDetectiveGame;