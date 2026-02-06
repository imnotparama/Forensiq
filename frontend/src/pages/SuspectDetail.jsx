import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const SuspectDetail = () => {
    const { id } = useParams();

    // 🔹 Core states
    const [suspect, setSuspect] = useState(null);
    const [loading, setLoading] = useState(true);

    // 🤖 AI states
    const [aiLoading, setAiLoading] = useState(false);
    const [aiSummary, setAiSummary] = useState(null);
    const [aiSource, setAiSource] = useState(null);

    // 🔗 FETCH SINGLE SUSPECT
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/suspects/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setSuspect({
                    name: data.name,
                    alias: data.alias || 'Unknown',
                    status: data.risk_level,
                    age: data.age || 'N/A',
                    gender: data.gender || 'N/A',
                    height: data.height || 'N/A',
                    location: data.location || 'N/A',
                    lastSeen: data.last_seen || 'N/A',
                    photo: 'https://via.placeholder.com/420',
                    crimes: data.crimes?.length ? data.crimes : ['No crime records available'],
                });
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    // 🤖 AI ANALYSIS
    const generateAIReport = async () => {
        setAiLoading(true);
        setAiSummary(null);

        try {
            const res = await fetch(`http://127.0.0.1:8000/api/analyze/suspect/${id}`);
            const data = await res.json();

            setAiSummary(data.summary);
            setAiSource(data.source || 'gemini');
        } catch (err) {
            setAiSummary(
                'AI analysis unavailable. Displaying fallback intelligence based on known crime patterns.'
            );
            setAiSource('fallback');
        } finally {
            setAiLoading(false);
        }
    };

    if (loading) {
        return <div style={{ padding: '40px', color: 'white' }}>Loading suspect details...</div>;
    }

    if (!suspect) {
        return (
            <div style={{ padding: '40px' }}>
                <h2>Suspect Not Found</h2>
            </div>
        );
    }

    // 🎨 STATUS STYLE
    const statusStyle = (status) => {
        switch (status) {
            case 'High':
                return { background: '#ffedd5', color: '#9a3412' };
            case 'Medium':
                return { background: '#fef9c3', color: '#854d0e' };
            case 'Low':
                return { background: '#dcfce7', color: '#166534' };
            default:
                return { background: '#e5e7eb', color: '#374151' };
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: '#23415e', padding: '40px' }}>
            <div
                style={{
                    maxWidth: '1000px',
                    margin: '0 auto',
                    background: '#ffffff',
                    borderRadius: '20px',
                    padding: '30px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                }}
            >
                {/* TOP SECTION */}
                <div style={{ display: 'flex', gap: '40px', marginBottom: '40px' }}>
                    <img
                        src={suspect.photo}
                        alt={suspect.name}
                        style={{
                            width: '420px',
                            height: '420px',
                            objectFit: 'cover',
                            borderRadius: '16px',
                            border: '3px solid #e5e7eb',
                        }}
                    />

                    <div>
                        <h1 style={{ marginBottom: '8px', color: '#020617' }}>{suspect.name}</h1>

                        <p style={{ fontSize: '18px', color: '#000000' }}>
                            Alias: <strong>{suspect.alias}</strong>
                        </p>

                        <span
                            style={{
                                ...statusStyle(suspect.status),
                                padding: '10px 18px',
                                borderRadius: '999px',
                                fontWeight: 'bold',
                                display: 'inline-block',
                                marginTop: '10px',
                            }}
                        >
                            {suspect.status}
                        </span>

                        <div style={{ marginTop: '30px', color: '#000000' }}>
                            <p>
                                <strong>Age:</strong> {suspect.age}
                            </p>
                            <p>
                                <strong>Gender:</strong> {suspect.gender}
                            </p>
                            <p>
                                <strong>Height:</strong> {suspect.height}
                            </p>
                            <p>
                                <strong>Location:</strong> {suspect.location}
                            </p>
                            <p>
                                <strong>Last Seen:</strong> {suspect.lastSeen}
                            </p>

                            {/* AI BUTTON */}
                            <button
                                onClick={generateAIReport}
                                disabled={aiLoading}
                                style={{
                                    marginTop: '20px',
                                    padding: '10px 18px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    background: aiLoading
                                        ? '#9ca3af'
                                        : 'linear-gradient(90deg, #4f46e5, #9333ea)',
                                    color: '#ffffff',
                                }}
                            >
                                {aiLoading ? 'Analyzing with AI…' : 'Generate AI Intelligence'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* CRIMES */}
                <div
                    style={{
                        background: '#23415e',
                        padding: '25px',
                        borderRadius: '14px',
                    }}
                >
                    <h2 style={{ color: '#ffffff' }}>Known Crimes</h2>
                    <ul style={{ marginTop: '15px' }}>
                        {suspect.crimes.map((crime, index) => (
                            <li key={index} style={{ marginBottom: '10px', color: '#ffffff' }}>
                                {crime}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* AI OUTPUT */}
                {aiSummary && (
                    <div
                        style={{
                            marginTop: '30px',
                            background: '#111827',
                            padding: '22px',
                            borderRadius: '14px',
                            color: '#e5e7eb',
                        }}
                    >
                        <h2 style={{ marginBottom: '12px' }}>AI Intelligence Report</h2>
                        <p style={{ lineHeight: '1.7' }}>{aiSummary}</p>
                        <p style={{ marginTop: '10px', fontSize: '13px', opacity: 0.7 }}>
                            Generated using{' '}
                            {aiSource === 'gemini' ? 'Gemini AI' : 'Fallback Engine'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SuspectDetail;
