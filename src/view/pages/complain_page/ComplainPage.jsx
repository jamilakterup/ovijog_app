import { useEffect, useState } from "react";
import ComplainForm from "./ComplainForm";
import { loadCaptchaEnginge, validateCaptcha } from "react-simple-captcha";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function ComplainPage() {
  const [offices, setOffices] = useState([]);
  const [hideInfo, setHideInfo] = useState(false);
  const [officeName, setOfficeName] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [captchaValue, setCaptchaValue] = useState("");
  const [captchaError, setCaptchaError] = useState(false);
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const getSummary = async (event) => {
    const value = event.target.value;
    setText(value); // Assuming setText is defined to handle the input state

    setLoading(true);
    setError(''); // Clear previous errors

    try {
      // Prepare FormData with the input value
      const formData = new FormData();
      formData.append("paragraph", value);
      console.log(formData)
      // Send the POST request with FormData
      const response = await fetch("http://114.130.116.176/generate-subject/", {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json",
          'Access-Control-Allow-Origin': '*',
          'access-control-allow-origin': 'localhost:5173',
        }
      });

      // Check if the response is not OK
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Parse the response JSON
      const result = await response.json();

      // Check if result is received and handle accordingly
      if (result) {
        console.log('Summary received:', result);
        // Perform actions with the result if needed
      }

    } catch (err) {
      // Handle and display error
      setError('Failed to fetch summary. Please try again.');
      console.error('Error:', err);
    } finally {
      // Set loading to false after request completes
      setLoading(false);
    }
  };


  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const response = await fetch("http://114.130.119.192/api/offices/");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setOffices(data);
      } catch (error) {
        console.error("Error fetching offices:", error);
      }
    };

    fetchOffices();
  }, [setOffices]);

  useEffect(() => {
    if (hideInfo) {
      setInputValue("");
    }
  }, [hideInfo]);

  useEffect(() => {
    loadCaptchaEnginge(4);
  }, []);

  const reloadCaptcha = () => {
    loadCaptchaEnginge(4);
  };

  const handleCaptchaChange = (event) => {
    setCaptchaValue(event.target.value);
  };

  // submit the form on database:::::::
  const complainSubmit = async (event) => {
    event.preventDefault();

    const target = event.target;
    const complain_title = target.complain_title.value;
    const complain_details = target.complain_details.value;
    const dropzone_file = target.dropzone_file.files[0]; // File object
    const complainer_info = target.complainer_info.value;
    const custom_office_name = target.custom_office_name?.value || '';

    // Validate file extension
    const validExtensions = ["jpg", "jpeg", "png", "pdf", "mp4", "3gp"];
    if (dropzone_file) {
      const fileExtension = dropzone_file.name.split(".").pop().toLowerCase();
      if (!validExtensions.includes(fileExtension)) {
        alert(
          "Invalid file type. Please upload a jpg, jpeg, png, pdf, mp4, or 3gp file."
        );
        return;
      }

      // Optional: Validate file size (e.g., limit to 10MB)
      const maxSizeMB = 10;
      const maxSizeBytes = maxSizeMB * 1024 * 1024;
      if (dropzone_file.size > maxSizeBytes) {
        alert("File size exceeds 10MB.");
        return;
      }
    }


    try {
      if (validateCaptcha(captchaValue)) {
        setCaptchaError(false);
      } else {
        setCaptchaError(true);
        return;
      }


      const response = await fetch("http://114.130.119.192/api/complaints/", {
        method: "POST",
        body: JSON.stringify({
          "title": complain_title,
          "content": complain_details,
          "complainer_info": complainer_info,
          "file": dropzone_file,
          "office": selectedOffice ? selectedOffice.name_Bn : "",
          "type": custom_office_name,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      if (result) {
        navigate(`/tracking/${result.tracking_id}`);
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error (e.g., show an error message)
    }
  };




  return (
    <>
      <ComplainForm
        offices={offices}
        hideInfo={hideInfo}
        setHideInfo={setHideInfo}
        inputValue={inputValue}
        setInputValue={setInputValue}
        setSelectedOffice={setSelectedOffice}
        complainSubmit={complainSubmit}
        reloadCaptcha={reloadCaptcha}
        handleCaptchaChange={handleCaptchaChange}
        captchaValue={captchaValue}
        captchaError={captchaError}
        text={text}
        setText={setText}
        summary={summary}
        title={title}
        setTitle={setTitle}
        loading={loading}
        error={error}
        getSummary={getSummary}
        officeName={officeName}
        setOfficeName={setOfficeName}
      />
    </>
  );
}

export default ComplainPage;
