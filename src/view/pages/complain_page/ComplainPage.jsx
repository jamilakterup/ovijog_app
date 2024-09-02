import { useEffect, useState } from "react";
import ComplainForm from "./ComplainForm";
import { loadCaptchaEnginge, validateCaptcha } from "react-simple-captcha";

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

  const getSummary = async (event) => {
    const value = event.target.value;
    setText(value);

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('paragraph ', value);

      // Replace with your API endpoint
      const response = await fetch("https://114.130.116.176/generate-subject/", {
        method: "POST",
        body: formData,
      });

      console.log('response',response)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      if (result) {
        console.log('success')
      }

    } catch (err) {
      // setError('Failed to fetch summary. Please try again.',err);
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const response = await fetch("http://10.106.15.243/api/offices/");
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
  }, []);

  useEffect(() => {
    if (hideInfo) {
      setInputValue("");
    }
  }, [hideInfo]);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const reloadCaptcha = () => {
    loadCaptchaEnginge(6);
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
  
    // Create FormData object
    const formData = new FormData();
    formData.append("title", complain_title);
    formData.append("content", complain_details);
    formData.append("file", dropzone_file); // Attach the file
    formData.append("complainer_info", complainer_info);
    formData.append("type", custom_office_name);
    formData.append(
      "selected_office",
      selectedOffice ? selectedOffice.label : ""
    );
  
    try {
      if (validateCaptcha(captchaValue)) {
        setCaptchaError(false);
      } else {
        setCaptchaError(true);
        return;
      }
      
      const response = await fetch("http://114.130.119.192/api/complaints/", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const result = await response.json();
      if (result) {
        alert(`পরবর্তী আপডেট জানতে আপনার ট্র্যাকিং আইডি সংরক্ষণ করুন: ${result.tracking_id}`);
        console.log('success', result);
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error (e.g., show an error message)
    }
  };
  

  return (
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
  );
}

export default ComplainPage;
