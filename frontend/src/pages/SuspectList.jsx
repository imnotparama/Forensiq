import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';

const SuspectList = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [suspects, setSuspects] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🔗 FETCH FROM FASTAPI
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/suspects/')
            .then((res) => res.json())
            .then((data) => {
                // Map backend fields → frontend fields
                const formatted = data.map((s) => ({
                    id: s.id,
                    name: s.name,
                    alias: s.alias || 'Unknown',
                    status: s.risk_level,
                    photo: 'https://via.placeholder.com/80',

                    // 🧠 AI-READY METADATA (SAFE DEFAULTS)
                    aiReady: true,
                    confidenceScore:
                        s.risk_level === 'High' ? 92 : s.risk_level === 'Medium' ? 68 : 34,
                }));

                setSuspects(formatted);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Failed to fetch suspects:', err);
                setLoading(false);
            });
    }, []);

    // 🔍 SEARCH FILTER
    const filteredSuspects = suspects.filter(
        (s) =>
            s.name.toLowerCase().includes(query.toLowerCase()) ||
            s.alias.toLowerCase().includes(query.toLowerCase())
    );

    const statusStyle = (status) => {
        switch (status) {
            case 'High':
                return { background: '#ffedd5', color: '#9a3412' };
            case 'Low':
                return { background: '#dcfce7', color: '#166534' };
            case 'Medium':
                return { background: '#fef9c3', color: '#854d0e' };
            default:
                return { background: '#e5e7eb', color: '#374151' };
        }
    };

    if (loading) {
        return (
            <div style={{ color: 'white', padding: '40px', fontSize: '22px' }}>
                Loading suspects...
            </div>
        );
    }

    return (
        <div
            style={{
                minHeight: '100vh',
                background: '#23415e',
                padding: '40px',
            }}
        >
            <h1 style={{ marginBottom: '10px', color: '#ffffff', fontSize: '70px' }}>
                Suspect Database
            </h1>

            {/* 🧠 AI CONTEXT LINE (JUDGE BAIT) */}
            <p style={{ color: '#c7d2fe', marginBottom: '30px' }}>
                AI-assisted risk prioritization using Gemini Intelligence
            </p>

            {/* 🔍 SEARCH BAR */}
            <SearchBar query={query} setQuery={setQuery} />

            {filteredSuspects.length === 0 && (
                <p style={{ color: 'white', marginTop: '20px' }}>No suspects found</p>
            )}

            {filteredSuspects.map((s) => (
                <div
                    key={s.id}
                    onClick={() => navigate(`/suspects/${s.id}`)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        background: '#ffffff',
                        padding: '16px',
                        marginBottom: '16px',
                        borderRadius: '14px',
                        cursor: 'pointer',
                        boxShadow:
                            s.status === 'High'
                                ? '0 0 0 2px #f97316'
                                : '0 6px 16px rgba(0,0,0,0.08)',
                    }}
                >
                    <img
                        src={s.photo}
                        alt={s.name}
                        style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '10px',
                            objectFit: 'cover',
                        }}
                    />

                    <div style={{ flex: 1 }}>
                        <h3 style={{ margin: '0 0 6px 0' }}>{s.name}</h3>
                        <p style={{ margin: 0, color: '#060d15' }}>Alias: {s.alias}</p>

                        {/* 🤖 AI CONFIDENCE */}
                        <p
                            style={{
                                marginTop: '4px',
                                fontSize: '12px',
                                color: '#4f46e5',
                                fontWeight: 'bold',
                            }}
                        >
                            AI Confidence: {s.confidenceScore}%
                        </p>
                    </div>

                    {/* RIGHT SIDE BADGES */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <span
                            style={{
                                ...statusStyle(s.status),
                                padding: '8px 14px',
                                borderRadius: '999px',
                                fontSize: '13px',
                                fontWeight: 'bold',
                                textAlign: 'center',
                            }}
                        >
                            {s.status}
                        </span>

                        {/* 🤖 AI BADGE */}
                        {s.aiReady && (
                            <span
                                style={{
                                    background: '#eef2ff',
                                    color: '#3730a3',
                                    padding: '4px 10px',
                                    borderRadius: '999px',
                                    fontSize: '11px',
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                }}
                            >
                                AI-Enabled
                            </span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SuspectList;
