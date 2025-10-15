import React, { useState } from 'react';

export default function SmartTaskPlanner() {
  const [showInput, setShowInput] = useState(false);
  const [goal, setGoal] = useState('');
  const [deadline, setDeadline] = useState('');
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitGoal = async () => {
    if (!goal.trim()) {
      setError('Please enter a goal.');
      return;
    }

    setLoading(true);
    setError(null);
    setPlan('');

    try {
      const response = await fetch('http://localhost:4000/plan/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ goal }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Server error');
      }

      const data = await response.json();
      // Set the plan as plain text, not JSON
      setPlan(data.plan);
    } catch (err) {
      console.error(err);
      setError('Failed to generate plan: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #c3d9ff 0%, #99c2ff 50%, #66a3ff 100%)',
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    }}>
      {!showInput && (
        <div style={{ textAlign: 'center', animation: 'fadeIn 1s' }}>
          <h1 style={{ fontSize: '4rem', color: '#ffffff', marginBottom: '50px', textShadow: '2px 2px 8px rgba(0,0,0,0.3)' }}>
            Welcome to Smart Task Planner
          </h1>
          <button
            onClick={() => setShowInput(true)}
            style={{
              padding: '20px 40px',
              fontSize: '1.5rem',
              borderRadius: '15px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: '#3366ff',
              color: '#ffffff',
              boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={e => e.target.style.backgroundColor = '#254eda'}
            onMouseLeave={e => e.target.style.backgroundColor = '#3366ff'}
          >
            Schedule Task
          </button>
        </div>
      )}

      {showInput && (
        <div style={{
          width: '100%',
          maxWidth: '700px',
          backgroundColor: 'rgba(255,255,255,0.95)',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          animation: 'slideIn 0.8s'
        }}>
          <h2 style={{ textAlign: 'center', marginBottom: '25px', fontSize: '2rem', color: '#3366ff' }}>Enter Your Goal</h2>
          <textarea
            placeholder='e.g., Launch a product in 2 weeks'
            value={goal}
            onChange={e => setGoal(e.target.value)}
            rows={5}
            style={{ width: '100%', padding: '15px', fontSize: '1.1rem', borderRadius: '12px', border: '1px solid #ccc', resize: 'none', marginBottom: '15px' }}
          />
          <input
            type="date"
            value={deadline}
            onChange={e => setDeadline(e.target.value)}
            style={{ width: '100%', padding: '12px', fontSize: '1rem', borderRadius: '12px', border: '1px solid #ccc', marginBottom: '25px' }}
          />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={submitGoal}
              disabled={loading}
              style={{
                padding: '12px 30px',
                fontSize: '1.1rem',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: '#3366ff',
                color: '#ffffff',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={e => e.target.style.backgroundColor = '#254eda'}
              onMouseLeave={e => e.target.style.backgroundColor = '#3366ff'}
            >
              {loading ? 'Generating...' : 'Generate Plan'}
            </button>
          </div>

          {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '20px', fontWeight: 'bold' }}>{error}</p>}

          {plan && (
            <div style={{ marginTop: '30px', backgroundColor: '#e6f0ff', padding: '20px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
              <h3 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '1.8rem', color: '#3366ff' }}>Generated Plan</h3>
              <pre style={{ whiteSpace: 'pre-wrap', fontSize: '1rem', lineHeight: '1.5' }}>{plan}</pre>
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
