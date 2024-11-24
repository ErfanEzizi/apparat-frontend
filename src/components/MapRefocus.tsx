import { useEffect } from "react";
import { useMap } from "react-leaflet";

const MapRefocus: React.FC<{ center: [number, number] | null }> = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.flyTo(center, map.getZoom(), {
        animate: true,
        duration: 1.5, // Duration in seconds
      });
    }
  }, [center, map]);

  return null;
};

export default MapRefocus;
