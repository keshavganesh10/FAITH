import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default icon paths for Leaflet under Vite
const icon = L.divIcon({
  className: 'faith-pin',
  html: `<div style="
    width: 28px; height: 28px; border-radius: 50%;
    background: hsl(var(--primary));
    border: 3px solid hsl(var(--card));
    box-shadow: 0 4px 12px hsl(var(--primary) / 0.45);
    display: grid; place-items: center;
    color: hsl(var(--primary-foreground));
    font-family: 'Fraunces', serif; font-size: 14px; font-weight: 600;
  ">●</div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

export interface MapPoint {
  id: string;
  lat: number;
  lng: number;
  title: string;
  subtitle?: string;
  href?: string;
}

interface FitProps { points: MapPoint[]; }
const FitBounds = ({ points }: FitProps) => {
  const map = useMap();
  useEffect(() => {
    if (!points.length) return;
    const b = L.latLngBounds(points.map(p => [p.lat, p.lng] as [number, number]));
    map.fitBounds(b, { padding: [40, 40], maxZoom: 11 });
  }, [points, map]);
  return null;
};

export const MapView = ({ points, height = 360 }: { points: MapPoint[]; height?: number }) => {
  return (
    <div
      className="rounded-2xl overflow-hidden border border-border shadow-soft"
      style={{ height }}
    >
      <MapContainer
        center={[53.5, -2]}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds points={points} />
        {points.map(p => (
          <Marker key={p.id} position={[p.lat, p.lng]} icon={icon}>
            <Popup>
              <div style={{ minWidth: 140 }}>
                <p style={{ margin: 0, fontWeight: 600, fontSize: 13 }}>{p.title}</p>
                {p.subtitle && <p style={{ margin: '2px 0 0', fontSize: 11, color: '#666' }}>{p.subtitle}</p>}
                {p.href && (
                  <a href={p.href} style={{ display: 'inline-block', marginTop: 6, fontSize: 11, color: 'hsl(210 55% 32%)', fontWeight: 600 }}>
                    Open →
                  </a>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
