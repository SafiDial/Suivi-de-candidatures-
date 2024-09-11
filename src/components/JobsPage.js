import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Wrapper from "../assets/wrappers/SettingWrapperStyle";
import {
  FaTags,
  FaTimes,
  FaCloudUploadAlt,
  FaMicrophone,
  FaTrashAlt,
  FaEdit,
  FaPlusCircle,
} from "react-icons/fa";
import ApplicationList from './ApplicationList'; // Assurez-vous que le chemin est correct

const localizer = momentLocalizer(moment);

function JobsPage() {
  const [events, setEvents] = useState([]);
  const predefinedColors = ["#FF5733", "#33FFA1", "#337DFF", "#FFB833", "#A833FF"];
  const [formVisible, setFormVisible] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    location: "",
    labels: "",
    client: "",
    shareWith: "Only me",
    color: predefinedColors[0],
  });
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showApplicationList, setShowApplicationList] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleColorChange = (color) => {
    setFormState({ ...formState, color });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const startDateTime = new Date(`${formState.startDate}T${formState.startTime}`);
    const endDateTime = new Date(`${formState.endDate}T${formState.endTime}`);

    if (endDateTime <= startDateTime) {
      alert("La date de fin doit être après la date de début.");
      return;
    }

    const newEvent = {
      id: isEditing ? selectedEvent.id : events.length + 1,
      title: formState.title,
      start: startDateTime,
      end: endDateTime,
      description: formState.description,
      location: formState.location,
      labels: formState.labels,
      client: formState.client,
      shareWith: formState.shareWith,
      color: formState.color,
    };

    setEvents(isEditing
      ? events.map((event) => (event.id === selectedEvent.id ? newEvent : event))
      : [...events, newEvent]
    );

    setFormState({
      title: "",
      description: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      location: "",
      labels: "",
      client: "",
      shareWith: "Only me",
      color: predefinedColors[0],
    });
    setFormVisible(false);
    setIsEditing(false);
    setSelectedSlot(null);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setDetailsVisible(true);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId));
    setDetailsVisible(false);
  };

  const handleCloseDetails = () => {
    setDetailsVisible(false);
    setSelectedEvent(null);
  };

  const handleEditEvent = () => {
    setFormState({
      title: selectedEvent.title,
      description: selectedEvent.description,
      startDate: moment(selectedEvent.start).format("YYYY-MM-DD"),
      startTime: moment(selectedEvent.start).format("HH:mm"),
      endDate: moment(selectedEvent.end).format("YYYY-MM-DD"),
      endTime: moment(selectedEvent.end).format("HH:mm"),
      location: selectedEvent.location,
      labels: selectedEvent.labels,
      client: selectedEvent.client,
      shareWith: selectedEvent.shareWith,
      color: selectedEvent.color,
    });
    setFormVisible(true);
    setIsEditing(true);
    setDetailsVisible(false);
  };

  const eventStyleGetter = (event) => {
    const backgroundColor = event.color;
    const style = {
      backgroundColor,
      opacity: 0.8,
      color: "#fff",
      display: "block",
      cursor: "pointer",
      height: 'auto',
      width: '100%',
    };
    return {
      style,
    };
  };

  const handleSlotSelect = (slotInfo) => {
    const isSlotOccupied = events.some(
      (event) => moment(slotInfo.start).isBetween(event.start, event.end, null, '[)')
    );

    if (!isSlotOccupied) {
      setFormState({
        ...formState,
        startDate: moment(slotInfo.start).format("YYYY-MM-DD"),
        startTime: moment(slotInfo.start).format("HH:mm"),
        endDate: moment(slotInfo.end).format("YYYY-MM-DD"),
        endTime: moment(slotInfo.end).format("HH:mm"),
      });
      setSelectedSlot(slotInfo);
      setFormVisible(true);
    }
  };

  const toggleApplicationList = () => {
    setShowApplicationList(!showApplicationList);
  };

  return (
    <Wrapper>
      <div className="header">
        <h1>Suivi des Candidatures</h1>
        <div className="controls">
          <button className="btn" onClick={toggleApplicationList}>
            Voir les candidatures
          </button>
          <button className="btn" onClick={() => setFormVisible(true)}>
            <FaPlusCircle /> Ajouter une candidature
          </button>
        </div>
      </div>
      <hr />
      {formVisible && (
        <form onSubmit={handleSubmit} className="event-form">
          <div className="form-header">
            <h2>{isEditing ? "Modifier une candidature" : "Ajouter une candidature"}</h2>
            <button type="button" onClick={() => setFormVisible(false)}>
              <FaTimes />
            </button>
          </div>
          <div>
            <label>Titre</label>
            <input
              type="text"
              name="title"
              value={formState.title}
              onChange={handleInputChange}
              required
              placeholder="Titre"
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              name="description"
              value={formState.description}
              onChange={handleInputChange}
              placeholder="Description"
            />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <div>
              <label>Date de début</label>
              <input
                type="date"
                name="startDate"
                value={formState.startDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Heure de début</label>
              <input
                type="time"
                name="startTime"
                value={formState.startTime}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <div>
              <label>Date de fin</label>
              <input
                type="date"
                name="endDate"
                value={formState.endDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Heure de fin</label>
              <input
                type="time"
                name="endTime"
                value={formState.endTime}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div>
            <label>Lieu</label>
            <input
              type="text"
              name="location"
              value={formState.location}
              onChange={handleInputChange}
              placeholder="Lieu"
            />
          </div>
          <div>
            <label>Étiquettes</label>
            <input
              type="text"
              name="labels"
              value={formState.labels}
              onChange={handleInputChange}
              placeholder="Étiquettes"
            />
          </div>
          <div>
            <label>Client</label>
            <input
              type="text"
              name="client"
              value={formState.client}
              onChange={handleInputChange}
              placeholder="Client"
            />
          </div>
          <div>
            <label>Partager avec</label>
            <select
              name="shareWith"
              value={formState.shareWith}
              onChange={handleInputChange}
            >
              <option value="Only me">Seulement moi</option>
              <option value="All team members">Tous les membres de l'équipe</option>
              <option value="Specific members and teams">
                Membres et équipes spécifiques
              </option>
            </select>
          </div>
          <div>
            <label>Couleur</label>
            <div className="color-palette">
              {predefinedColors.map((color) => (
                <div
                  key={color}
                  className="color-box"
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorChange(color)}
                />
              ))}
            </div>
          </div>
          <button type="submit" className="submit-btn">
            {isEditing ? "Sauvegarder" : "Ajouter"}
          </button>
        </form>
      )}
      {detailsVisible && selectedEvent && (
        <div className="event-details">
          <div className="details-header">
            <h2>Détails de la candidature</h2>
            <button type="button" onClick={handleCloseDetails}>
              <FaTimes />
            </button>
          </div>
          <div>
            <h3>{selectedEvent.title}</h3>
            <p><strong>Description:</strong> {selectedEvent.description}</p>
            <p><strong>Date de début:</strong> {moment(selectedEvent.start).format("D MMM YYYY, HH:mm")}</p>
            <p><strong>Date de fin:</strong> {moment(selectedEvent.end).format("D MMM YYYY, HH:mm")}</p>
            <p><strong>Lieu:</strong> {selectedEvent.location}</p>
            <p><strong>Étiquettes:</strong> {selectedEvent.labels}</p>
            <p><strong>Client:</strong> {selectedEvent.client}</p>
            <p><strong>Partager avec:</strong> {selectedEvent.shareWith}</p>
          </div>
          <div className="details-buttons">
            <button onClick={handleEditEvent}>
              <FaEdit /> Modifier
            </button>
            <button onClick={() => handleDeleteEvent(selectedEvent.id)}>
              <FaTrashAlt /> Supprimer
            </button>
          </div>
        </div>
      )}
      {showApplicationList && (
        <ApplicationList events={events} onClose={toggleApplicationList} />
      )}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={handleEventClick}
        selectable
        onSelectSlot={handleSlotSelect}
      />
    </Wrapper>
  );
}

export default JobsPage;
