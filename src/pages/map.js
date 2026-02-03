// --- File: src/pages/map.js ---
import React from 'react';
import Layout from '@theme/Layout';
import GameMap from '../components/GameMap'; // เรียกใช้ Component แผนที่ที่เราทำไว้

export default function MapPage() {
  return (
    <Layout
      title="World Map"
      description="Interactive map of Heartopia">
      <main>
        {/* ใส่ Container ให้แผนที่ดูสวยงาม มีระยะขอบ */}
        <div className="container" style={{ padding: '2rem 0' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '1rem', color: '#5d4037' }}>
                🗺️ Heartopia World Map
            </h1>
            <GameMap />
        </div>
      </main>
    </Layout>
  );
}