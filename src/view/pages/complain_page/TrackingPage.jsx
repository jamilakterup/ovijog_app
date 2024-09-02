import { useLocation } from 'react-router-dom';

const TrackingPage = () => {
  const location = useLocation();
  const trackingId = location.state?.tracking_id;

  return (
    <div>
      <h1>Tracking Page</h1>
      {trackingId ? (
        <p>Your tracking ID is: {trackingId}</p>
      ) : (
        <p>No tracking ID available.</p>
      )}
    </div>
  );
};

export default TrackingPage;
