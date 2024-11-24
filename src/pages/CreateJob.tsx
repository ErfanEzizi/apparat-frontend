import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import axiosInstance from "../services/axiosInstance";
import "leaflet/dist/leaflet.css";
import MapRefocus from "../components/MapRefocus";
import { customIcon } from "./JobMap";
import { getUserIdFromToken } from "../utils/jwt";
import { useBreadcrumb } from "../contexts/BreadcrumbContext";

const CreateJob: React.FC = () => {
  const userId = getUserIdFromToken();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    clientId: userId,
    locationName: "",
    latitude: 0,
    longitude: 0,
  });
  const [mapPosition, setMapPosition] = useState<[number, number] | null>(null);
  const { setBreadcrumb } = useBreadcrumb();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setMapPosition([latitude, longitude]);
        setFormData((prev) => ({ ...prev, latitude, longitude }));
      },
      (error) => {
        console.error("Failed to fetch geolocation:", error);
        setMapPosition([59.3311, 18.0597]); // Default to NYC if geolocation fails
      }
    );
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleMapClick = (position: [number, number]) => {
    setMapPosition(position);
    setFormData((prev) => ({ ...prev, latitude: position[0], longitude: position[1] }));
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: typeof formData) => {
      // Convert the date field to ISO format before sending to the backend
      const formattedData = {
        ...data,
        date: new Date(data.date).toISOString(),
      };
      await axiosInstance.post("/jobs", formattedData);
    },
    onSuccess: () => {
      setBreadcrumb("Job created successfully!", "success");
      setFormData({
        title: "",
        description: "",
        date: "", // Reset the date field to an empty string
        clientId: formData.clientId,
        locationName: "",
        latitude: 0,
        longitude: 0,
      });
      setMapPosition(null);
    },
    onError: () => {
      setBreadcrumb("Failed to create job. Please try again.", "error");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Create a New Job</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="w-full border px-4 py-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="w-full border px-4 py-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
            className="w-full border px-4 py-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Location Name</label>
          <input
            type="text"
            name="locationName"
            value={formData.locationName}
            onChange={handleInputChange}
            required
            className="w-full border px-4 py-2 rounded"
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Select Location</label>
          <MapContainer
            center={mapPosition || [40.7128, -74.006]} // Default to NYC until position is fetched
            zoom={13}
            style={{ height: "300px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {mapPosition && <Marker position={mapPosition} icon={customIcon} />}
            <MapClickHandler onClick={handleMapClick} />
            <MapRefocus center={mapPosition} />
          </MapContainer>
          <p className="text-sm text-gray-500 mt-2">
            {mapPosition
              ? `Selected Coordinates: ${mapPosition[0].toFixed(4)}, ${mapPosition[1].toFixed(4)}`
              : "Fetching your current location..."}
          </p>
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          {isPending ? "Creating..." : "Create Job"}
        </button>
      </form>
    </div>
  );
};

const MapClickHandler: React.FC<{ onClick: (position: [number, number]) => void }> = ({ onClick }) => {
  useMapEvents({
    click(e) {
      onClick([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
};

export default CreateJob;
