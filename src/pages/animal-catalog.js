import React from 'react';
import Layout from '@theme/Layout';
import AnimalCatalog from '../components/AnimalCatalog';

export default function AnimalCatalogPage() {
  return (
    <Layout
      title="Animal Catalog"
      description="ข้อมูลสัตว์ทั้งหมดใน Heartopia">
      
      <main style={{ padding: '2rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 style={{ 
                fontSize: '3rem', 
                color: '#5d4037',
                textShadow: '2px 2px 0px white' 
            }}>
              🐾 Animal Catalog
            </h1>
            <p style={{ fontSize: '1.2rem' }}>
              ค้นหาตำแหน่งและของโปรดของเพื่อนรักขนฟู!
            </p>
          </div>

          {/* เรียกใช้ Component ที่เราทำ */}
          <AnimalCatalog />
          
        </div>
      </main>
    </Layout>
  );
}