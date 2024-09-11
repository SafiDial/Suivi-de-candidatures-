import React from 'react';
import './ApplicationList.css'; // Assurez-vous que le chemin est correct

const ApplicationList = ({ events, onClose }) => {
  return (
    <div className="application-list-wrapper">
      <div className="application-list-container">
        <div className="application-list-header">
          <h2>Liste des candidatures</h2>
          <button onClick={onClose}>X</button>
        </div>
        <div className="application-list-content">
          {events.length === 0 ? (
            <p>Aucune candidature disponible.</p>
          ) : (
            events.map((event) => (
              <div key={event.id} className="application-list-item">
                <h3>{event.title}</h3>
                <p><strong>Description:</strong> {event.description}</p>
                <p><strong>Date de début:</strong> {event.start.toLocaleString()}</p>
                <p><strong>Date de fin:</strong> {event.end.toLocaleString()}</p>
                <p><strong>Lieu:</strong> {event.location}</p>
                <p><strong>Client:</strong> {event.client}</p>
                <p><strong>Partager avec:</strong> {event.shareWith}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationList;
