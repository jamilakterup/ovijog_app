import { Button } from '@mui/material';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';


const TrackingPage = () => {
  const { trackingId } = useParams();

  useEffect(() => {
    toast.success('আপনার অভিযোগটি সফলভাবে সম্পন্ন হয়েছে!');
  }, [])

  return (
    <>
      <Toaster />
      <div className='text-center mt-72'>
        {trackingId ? (
          <>
            <p className='text-3xl text-gray-500'>আপনার ট্র্যাকিং আইডিঃ <span className='text-gray-700'>{trackingId}</span></p>
            <br />
            <span className='text-gray-500'>পরবর্তীতে আপনার অভিযোগের অগ্রগতি জানতে আইডিটি সংরক্ষণ করুন</span>
            <br />

            <a href="/" className='mt-5 block'>
              <Button variant="contained">হোমে ফিরে যান</Button>
            </a>
          </>
        ) : (
          <p className='text-4xl text-gray-500'>No tracking ID available.</p>
        )}
      </div>
    </>
  );
};

export default TrackingPage;
