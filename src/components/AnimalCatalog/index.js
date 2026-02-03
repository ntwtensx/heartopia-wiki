// --- File: src/components/AnimalCatalog/index.js ---
import React, { useState, useEffect, useRef } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useBaseUrl from '@docusaurus/useBaseUrl';
import 'leaflet/dist/leaflet.css';
import clsx from 'clsx';

// ==========================================
// 1. 📝 ข้อมูลสัตว์
// ==========================================
const animalData = [
  {
    id: 'alpaca',
    name: 'อัลปาก้า (Alpaca)',
    img: '/img/animals/alpaca.png',
    foods: ['บลูเบอร์รี่', 'สับปะรด', 'ข้าวสาลี'],
    weather: '🌈 รุ้งกินน้ำ / ☀️ แดดออก',
    locationDesc: 'ใกล้สะพานแม่น้ำเงียบสงบ',
    coords: [576, 635]
  },
  {
    id: 'fox',
    name: 'จิ้งจอก (Fox)',
    img: '/img/animals/fox.png',
    foods: ['เนื้อ', 'ปลากะพงแม่น้ำ', 'ปลากะพงปากกว้าง'],
    weather: '🌈 รุ้งกินน้ำ',
    locationDesc: 'ทุ่งดอกไม้กังหันลม',
    coords: [861, 453]
  },
  {
    id: 'ferret',
    name: 'มิ้งค์ (Mink)', 
    img: '/img/animals/ferret.png',
    foods: ['ไข่ไก่', 'ปลากะพงทะเล', 'ปลาบู่'],
    weather: '🌈 รุ้งกินน้ำ',
    locationDesc: 'ใกล้บ้านหมายเลข 04',
    coords: [1287, 603]
  },
  {
    id: 'capybara',
    name: 'คาปิบาร่า (Capybara)',
    img: '/img/animals/capybara.png',
    foods: ['มะเขือเทศ', 'องุ่น', 'ราสเบอร์รี่'],
    weather: '🌈 รุ้งกินน้ำ',
    locationDesc: 'ซากปรักหักพัง (Old Seq)',
    coords: [1625, 655]
  },
  {
    id: 'deer',
    name: 'กวางซีกา (Sika Deer)',
    img: '/img/animals/deer.png',
    foods: ['กิ่งไม้', 'ผักกาดหอม', 'สลัดคันทรี่'],
    weather: '🌈 รุ้งกินน้ำ / ☀️ แดดออก',
    locationDesc: 'ป่าสนโอ๊กวิญญาณ',
    coords: [1069, 1587]
  },
  {
    id: 'panda',
    name: 'แพนด้า (Panda)',
    img: '/img/animals/panda.png',
    foods: ['ไม้ไผ่', 'แอปเปิ้ล', 'ข้าวโพด'],
    weather: '🌈 รุ้งกินน้ำ',
    locationDesc: 'ใกล้แท่นกระโดด',
    coords: [706, 1525] 
  },
  {
    id: 'rabbit',
    name: 'กระต่าย (Rabbit)',
    img: '/img/animals/rabbit.png',
    foods: ['วัชพืช', 'แครอท', 'สตรอเบอร์รี่'],
    weather: '🌈 รุ้งกินน้ำ / ☀️ แดดออก',
    locationDesc: 'ใกล้บ้านหมายเลข 02',
    coords: [944, 739]
  },
  {
    id: 'otter',
    name: 'นากทะเล (Sea Otter)',
    img: '/img/animals/otter.png',
    foods: ['กุ้งทะเล', 'กุ้งแม่น้ำขาว', 'หอยแมลงภู่'],
    weather: '🌈 รุ้งกินน้ำ',
    locationDesc: 'บนหินจัตุรัสหมู่บ้านชาวประมง',
    coords: [523, 1020]
  },
];

// ==========================================
// 2. 🗺️ ส่วนแผนที่ (Map Component)
// ==========================================
function AnimalMapContent({ selectedId, onSelectAnimal }) {
  const L = require('leaflet');
  const { MapContainer, ImageOverlay, Marker, Popup, Tooltip, useMap } = require('react-leaflet');

  const mapWidth = 2004;
  const mapHeight = 2004;
  const bounds = [[0, 0], [mapHeight, mapWidth]];

  // ✅ 2. เตรียม URL สำหรับแผนที่โลก
  const worldMapUrl = useBaseUrl('/img/world-map.png');

  function MapFlyTo({ targetId }) {
    const map = useMap();
    useEffect(() => {
      if (targetId) {
        const targetAnimal = animalData.find(a => a.id === targetId);
        if (targetAnimal) {
          map.flyTo(targetAnimal.coords, 0, { animate: true, duration: 1.5 });
        }
      }
    }, [targetId, map]);
    return null;
  }

  const createAnimalIcon = (imgUrl, isSelected) => {
    return new L.Icon({
      iconUrl: imgUrl, // รับ URL ที่ผ่าน useBaseUrl มาแล้ว
      iconSize: isSelected ? [70, 70] : [50, 50],
      iconAnchor: isSelected ? [35, 35] : [25, 25],
      popupAnchor: [0, -30],
      className: isSelected ? 'animal-map-icon selected' : 'animal-map-icon'
    });
  };

  return (
    <div style={{ position: 'relative', height: '600px', width: '100%', borderRadius: '20px', overflow: 'hidden', border: '4px solid #fff', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
      <MapContainer 
        center={[mapHeight / 2, mapWidth / 2]} 
        zoom={-1} 
        minZoom={-2}
        crs={L.CRS.Simple}
        style={{ height: '100%', width: '100%', background: '#a2d2ff' }}
      >
        {/* ✅ ใช้ตัวแปร worldMapUrl ที่แก้ path แล้ว */}
        <ImageOverlay url={worldMapUrl} bounds={bounds} />
        
        <MapFlyTo targetId={selectedId} />

        {animalData.map((animal) => (
          <Marker 
            key={animal.id}
            position={animal.coords}
            // ✅ 3. ใช้ useBaseUrl กับรูป icon ในแผนที่
            icon={createAnimalIcon(useBaseUrl(animal.img), selectedId === animal.id)}
            eventHandlers={{
              click: () => onSelectAnimal(animal.id),
            }}
          >
            <Popup className="cute-popup" minWidth={220}>
              <div style={{ textAlign: 'center', fontFamily: 'var(--ifm-font-family-base)' }}>
                <div style={{ borderBottom: '2px dashed #ffb6c9', paddingBottom: '5px', marginBottom: '8px' }}>
                    <h3 style={{ margin: '0', color: '#a0466f', fontWeight: '800' }}>{animal.name}</h3>
                </div>
                <div style={{ fontSize: '0.9rem', textAlign: 'left', lineHeight: '1.6', color: '#2d3436' }}>
                    <div style={{ marginBottom: '4px' }}>
                        <strong style={{ color: '#d65db1' }}>🍲 ของโปรด:</strong> {animal.foods.join(', ')}
                    </div>
                    <div>
                        <strong style={{ color: '#d65db1' }}>🌤️ อากาศ:</strong> {animal.weather}
                    </div>
                </div>
              </div>
            </Popup>
            <Tooltip direction="top" offset={[0, -20]} opacity={1}>
                <span style={{ fontWeight: 'bold', color: '#5d4037' }}>{animal.name}</span>
            </Tooltip>
          </Marker>
        ))}

      </MapContainer>
    </div>
  );
}

// ==========================================
// 3. 📋 ส่วนการ์ดข้อมูล (Card Component)
// ==========================================
const AnimalCard = React.forwardRef(({ animal, isSelected, onClick }, ref) => {
  return (
    <div 
        ref={ref}
        className="col col--6" 
        style={{ marginBottom: '20px', cursor: 'pointer' }}
        onClick={onClick}
    >
      <div className={clsx('animal-info-card', isSelected && 'card-highlighted')}>
        <div className="animal-card-header">
          {/* ✅ 4. ใช้ useBaseUrl กับรูป avatar ในการ์ด */}
          <img src={useBaseUrl(animal.img)} alt={animal.name} className="animal-avatar" />
          <h3 className="animal-name" style={{ color: '#5d4037', fontWeight: '800' }}>{animal.name}</h3>
        </div>
        
        <div className="animal-card-body">
          <div className="info-row">
            <span className="info-icon">🍲</span>
            <div>
              <strong style={{ color: '#8d6e63' }}>ของโปรด:</strong>
              <div className="tags-container">
                {animal.foods.map((food, idx) => (
                  <span key={idx} className="tag-pill" style={{ fontWeight: '600' }}>{food}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="info-row">
            <span className="info-icon">🌤️</span>
            <div style={{ color: '#4a4e69', fontWeight: '500' }}>
                <strong style={{ color: '#8d6e63' }}>สภาพอากาศ:</strong> {animal.weather}
            </div>
          </div>
          <div className="info-row">
            <span className="info-icon">📍</span>
            <div>
              <strong style={{ color: '#8d6e63' }}>ถิ่นที่อยู่:</strong>
              <p style={{ margin: 0, fontSize: '1rem', color: '#4a4e69', fontWeight: '500' }}>
                {animal.locationDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

// ==========================================
// 4. Main Export (Parent Component)
// ==========================================
export default function AnimalCatalog() {
  const [selectedId, setSelectedId] = useState(null);
  
  const cardRefs = useRef({});

  const handleSelectAnimal = (id) => {
    setSelectedId(id); 
  };

  return (
    <div className="container">
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ textAlign: 'center', color: '#3e2723', fontWeight: '800', marginBottom: '0.5rem' }}>
            🗺️ แผนที่ถิ่นที่อยู่ (Locations)
        </h2>
        <p style={{ textAlign: 'center', fontSize: '1.1rem', color: '#5d4037', fontWeight: '600', backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: '15px', display: 'inline-block', padding: '5px 15px' }}>
            ✨ กดที่ไอคอนสัตว์เพื่อดูข้อมูล หรือกดที่การ์ดเพื่อดูตำแหน่ง ✨
        </p>
        <div style={{ marginTop: '1rem' }}>
            <BrowserOnly fallback={<div>Loading Map...</div>}>
            {() => (
                <AnimalMapContent 
                    selectedId={selectedId} 
                    onSelectAnimal={handleSelectAnimal} 
                />
            )}
            </BrowserOnly>
        </div>
      </div>

      <h2 style={{ textAlign: 'center', color: '#3e2723', fontWeight: '800', marginBottom: '2rem' }}>
          📖 รายละเอียดน้องๆ (Details)
      </h2>
      <div className="row">
        {animalData.map((animal) => (
          <AnimalCard 
            key={animal.id} 
            animal={animal} 
            isSelected={selectedId === animal.id}
            onClick={() => handleSelectAnimal(animal.id)}
            ref={(el) => (cardRefs.current[animal.id] = el)}
          />
        ))}
      </div>
    </div>
  );
}